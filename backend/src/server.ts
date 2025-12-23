import dotenv from "dotenv";
import fs from "node:fs";
import fsp from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { fileURLToPath } from "node:url";

import Fastify from "fastify";
import helmet from "@fastify/helmet";
import rateLimit from "@fastify/rate-limit";
import fastifyStatic from "@fastify/static";
import { z } from "zod";

import { contactSchema } from "./contactSchema.js";
import { createMailer } from "./email.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// charge backend/.env explicitement (indépendant du cwd PM2)
dotenv.config({ path: path.resolve(__dirname, "../.env") });

// ---- Environment (strict allowlist) ----
const envSchema = z
  .object({
    NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
    PORT: z.coerce.number().int().min(1).max(65535).default(3000),

    // Email (Postmark)
    POSTMARK_SERVER_TOKEN: z.string().min(10),
    CONTACT_TO_EMAIL: z.string().email(),
    CONTACT_FROM_EMAIL: z.string().email(),
    CONTACT_SUBJECT_PREFIX: z.string().max(50).optional(),

    // Optional: allow checking Origin header (reduces cross-site abuse)
    ALLOWED_ORIGIN: z.string().url().optional(),

    // Logging
    LOG_LEVEL: z.enum(["fatal", "error", "warn", "info", "debug", "trace", "silent"]).optional(),
  })
  // process.env contient plein de variables OS/npm : on valide nos clés et on ignore le reste
  .passthrough();

const env = envSchema.parse(process.env);

const app = Fastify({
  logger: {
    level: env.LOG_LEVEL ?? (env.NODE_ENV === "production" ? "info" : "debug"),
    redact: {
      paths: [
        "req.headers.authorization",
        "req.headers.cookie",
        "req.body.email",
        "req.body.message",
        "req.body.constraints",
        "req.body.phone",
      ],
      remove: true,
    },
  },
  trustProxy: true, // behind Nginx: ensures req.ip is correct
  bodyLimit: 32 * 1024, // 32 KB
  exposeHeadRoutes: false,
  ignoreTrailingSlash: true,
  requestIdHeader: "x-request-id",
  genReqId: () => randomUUID(),
});

// Attach request id for correlation (traceability)
app.addHook("onRequest", async (req, reply) => {
  reply.header("x-request-id", req.id);
});

// Security headers
await app.register(helmet, {
  // CSP potentiellement à gérer côté Nginx selon ton build.
  contentSecurityPolicy: false,
});

// Rate limiting
await app.register(rateLimit, {
  max: 5,
  timeWindow: "15 minutes",
  ban: 0,
  allowList: [],
  addHeaders: {
    "x-ratelimit-limit": true,
    "x-ratelimit-remaining": true,
    "x-ratelimit-reset": true,
  },
});

// Health endpoint
app.get("/healthz", async () => ({ ok: true }));

const sendContactEmail = createMailer({
  postmarkToken: env.POSTMARK_SERVER_TOKEN,
  toEmail: env.CONTACT_TO_EMAIL,
  fromEmail: env.CONTACT_FROM_EMAIL,
  subjectPrefix: env.CONTACT_SUBJECT_PREFIX ?? "",
});

// ---- API: POST /api/contact ----
app.post("/api/contact", async (req, reply) => {
  // Optional origin check to reduce third-party abuse.
  const origin = req.headers.origin;
  if (env.NODE_ENV === "production" && env.ALLOWED_ORIGIN && origin && origin !== env.ALLOWED_ORIGIN) {
    req.log.warn({ origin }, "Rejected request due to Origin mismatch");
    return reply.code(403).send({ ok: false, error: "Forbidden" });
  }

  // Only accept JSON to reduce CSRF risk (cross-site <form> posts can't send application/json).
  const contentType = req.headers["content-type"] ?? "";
  if (!contentType.includes("application/json")) {
    return reply.code(415).send({ ok: false, error: "Unsupported media type" });
  }

  const parsed = contactSchema.safeParse(req.body);
  if (!parsed.success) {
    return reply.code(400).send({
      ok: false,
      error: "Invalid payload",
      issues: parsed.error.issues.map((i) => ({ path: i.path.join("."), message: i.message })),
    });
  }

  const payload = parsed.data;

  // Honeypot (anti-bot): if filled, pretend success but do nothing.
  if (payload.website && payload.website.trim() !== "") {
    req.log.info({ event: "contact_honeypot", ip: req.ip }, "Honeypot triggered; email not sent");
    return reply.code(200).send({ ok: true });
  }

  // Minimal structured log (no sensitive content)
  const emailDomain = payload.email.split("@")[1] ?? "unknown";
  req.log.info(
    {
      event: "contact_submit",
      ip: req.ip,
      emailDomain,
      hasConstraints: Boolean(payload.constraints?.trim()),
      ua: req.headers["user-agent"],
    },
    "Contact submission received"
  );

  try {
    await sendContactEmail(payload, { ip: req.ip, userAgent: req.headers["user-agent"], requestId: req.id });

    req.log.info({ event: "contact_sent", ip: req.ip, emailDomain }, "Contact email sent");
    return reply.code(200).send({ ok: true });
  } catch (err) {
    req.log.error({ err, event: "contact_send_failed" }, "Failed to send contact email");
    return reply.code(502).send({ ok: false, error: "Email delivery failed" });
  }
});

// ---- Serve frontend build (Vite / React) ----
// On sert uniquement /assets/* via fastify-static pour éviter le doublon avec notre fallback SPA "/*".
const frontendDist = path.resolve(__dirname, "../../dist");
const assetsDir = path.join(frontendDist, "assets");
const indexHtmlPath = path.join(frontendDist, "index.html");

const hasFrontendDist = fs.existsSync(frontendDist);
const hasIndexHtml = fs.existsSync(indexHtmlPath);
const hasAssets = fs.existsSync(assetsDir);

if (env.NODE_ENV === "production" && (!hasFrontendDist || !hasIndexHtml)) {
  app.log.fatal({ frontendDist }, "Missing frontend build. Run `npm run build` at repo root.");
  process.exit(1);
}

// En dev, tu peux ne pas avoir dist/: on ne bloque pas.
if (hasAssets) {
  await app.register(fastifyStatic, {
    root: assetsDir,
    prefix: "/assets/", // IMPORTANT: pas "/" => pas de route catch-all "/*"
    decorateReply: false,
    maxAge: "1y",
    immutable: true,
  });
}

async function sendIndexHtml(reply: any) {
  const html = await fsp.readFile(indexHtmlPath, "utf8");
  reply.type("text/html; charset=utf-8").send(html);
}

if (hasIndexHtml) {
  // Page d’accueil
  app.get("/", async (_req, reply) => {
    return sendIndexHtml(reply);
  });

  // SPA fallback (deep links): return index.html, except /api/*
  app.get("/*", async (req, reply) => {
    if (req.url.startsWith("/api/")) return reply.code(404).send({ ok: false, error: "Not found" });
    return sendIndexHtml(reply);
  });
}

// Centralized error handler: never leak stack traces to clients
app.setErrorHandler((err, req, reply) => {
  req.log.error({ err }, "Unhandled error");
  reply.code(500).send({ ok: false, error: "Internal server error" });
});

app.listen({ port: env.PORT, host: "127.0.0.1" }).then((address) => {
  app.log.info({ address }, "Server listening");
});
