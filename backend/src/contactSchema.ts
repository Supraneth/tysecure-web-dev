import { z } from "zod";

/**
 * Helper pour les champs susceptibles de finir dans des headers d’email.
 * IMPORTANT : .refine() doit être le dernier appel (sinon on perd .trim/.min/.max).
 */
const headerSafeString = (fieldName: string, min: number, max: number) =>
  z
    .string()
    .trim()
    .min(min)
    .max(max)
    .refine((v) => !/[\r\n]/.test(v), { message: `${fieldName} must not contain CR/LF` });

const headerSafeEmail = (fieldName: string) =>
  z
    .string()
    .trim()
    .max(254)
    .email()
    .refine((v) => !/[\r\n]/.test(v), { message: `${fieldName} must not contain CR/LF` });

export const contactSchema = z
  .object({
    website: z.string().max(100).optional().default(""), // honeypot

    firstName: headerSafeString("firstName", 1, 80),
    lastName: headerSafeString("lastName", 1, 80),
    email: headerSafeEmail("email"),
    phone: headerSafeString("phone", 3, 30),
    city: headerSafeString("city", 2, 80),
    subject: headerSafeString("subject", 3, 150),

    // message: newlines autorisées
    message: z.string().trim().min(10).max(4000),
    constraints: z.string().trim().max(4000).optional(),
  })
  .strict();

export type ContactPayload = z.infer<typeof contactSchema>;
