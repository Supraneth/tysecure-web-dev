import postmark from "postmark";
import type { ContactPayload } from "./contactSchema.js";

export type MailerConfig = {
  postmarkToken: string;
  toEmail: string;
  fromEmail: string; // fixed sender (must be verified in your mail provider)
  subjectPrefix?: string;
};

export function createMailer(cfg: MailerConfig) {
  const client = new postmark.ServerClient(cfg.postmarkToken);

  return async function sendContactEmail(payload: ContactPayload, meta: { ip: string; userAgent?: string; requestId: string }) {
    const subject = `${cfg.subjectPrefix ?? ""}${payload.subject}`.trim();

    // Text-only email avoids HTML injection concerns and is easier to audit.
    const textBody = [
      "Nouveau message depuis le formulaire de contact",
      "",
      `Nom: ${payload.lastName}`,
      `Prénom: ${payload.firstName}`,
      `Email: ${payload.email}`,
      `Téléphone: ${payload.phone}`,
      `Ville: ${payload.city}`,
      "",
      "Message:",
      payload.message,
      "",
      payload.constraints ? "Contraintes / commentaires:" : "",
      payload.constraints ?? "",
      "",
      "---",
      `IP: ${meta.ip}`,
      meta.userAgent ? `UA: ${meta.userAgent}` : "",
      `Request-Id: ${meta.requestId}`,
    ]
      .filter(Boolean)
      .join("\n");

    // IMPORTANT:
    // - From is fixed to prevent spoofing and to pass DMARC/SPF reliably.
    // - Reply-To uses the user email, after strict validation and CR/LF rejection.
    await client.sendEmail({
      From: cfg.fromEmail,
      To: cfg.toEmail,
      Subject: subject,
      TextBody: textBody,
      ReplyTo: payload.email,
      MessageStream: "outbound",
    });
  };
}
