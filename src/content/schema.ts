import { z } from "zod";

function isSafeUrl(value: string): boolean {
  const v = value.trim();

  // Allow same-origin relative URLs
  if (v.startsWith("/")) return true;

  const lower = v.toLowerCase();
  if (lower.startsWith("javascript:") || lower.startsWith("data:") || lower.startsWith("vbscript:")) {
    return false;
  }

  try {
    const url = new URL(v);
    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
}

const safeUrlSchema = z.string().min(1).refine((v) => isSafeUrl(v), {
  message: "URL non autorisée",
});

export const infoCtaSchema = z.object({
  label: z.string().min(1),
  href: safeUrlSchema,
});

export const infoOptionSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
});

export const infoMediaCreditSchema = z
  .object({
    text: z.string().min(1).optional(),
    author: z.string().min(1).optional(),
    license: z.string().min(1).optional(),
    sourceUrl: safeUrlSchema.optional(),
  })
  .optional();

export const infoMediaSchema = z
  .object({
    type: z.enum(["image", "video"]),
    src: safeUrlSchema,
    alt: z.string().min(1).optional(),
    caption: z.string().min(1).optional(),
    poster: safeUrlSchema.optional(),
    credit: infoMediaCreditSchema,
  })
  .superRefine((val, ctx) => {
    if (val.type === "image" && !val.alt) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Une image doit avoir un texte alternatif (alt).",
        path: ["alt"],
      });
    }
  });

export const infoSectionSchema = z.object({
  title: z.string().min(1),
  body: z.string().min(1).optional(),
  bullets: z.array(z.string().min(1)).optional(),
  media: z.array(infoMediaSchema).optional(),
});

export const infoDetailSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  subtitle: z.string().optional(),
  longDescription: z.string().min(1),
  useCase: z.string().min(1).optional(),
  goodFor: z.array(z.string().min(1)).optional(),
  media: z.array(infoMediaSchema).optional(),
  sections: z.array(infoSectionSchema).optional(),
  highlights: z.array(z.string().min(1)).default([]),
  benefits: z.array(z.string().min(1)).default([]),
  prerequisites: z.array(z.string().min(1)).optional(),
  options: z.array(infoOptionSchema).optional(),
  duration: z.string().optional(),
  price: z.string().optional(),
  cta: infoCtaSchema.optional(),
  notes: z.string().optional(),
});

export type InfoDetail = z.infer<typeof infoDetailSchema>;
