import { z } from "zod";

/** Shared between client (React Hook Form) and server (route handlers). */

export const serviceOptions = [
  { value: "ocean-freight", label: "Ocean Freight" },
  { value: "air-freight", label: "Air Freight" },
  { value: "road-transportation", label: "Road Transportation" },
  { value: "customs-clearance", label: "Customs Clearance" },
  { value: "warehousing-distribution", label: "Warehousing & Distribution" },
  { value: "project-cargo", label: "Project Cargo" },
  { value: "not-sure", label: "Not Sure / Need Advice" },
] as const;

export const cargoTypeOptions = ["General cargo", "Palletised", "Containerised", "Perishable", "Hazardous / dangerous goods", "Oversized / heavy-lift", "Other"] as const;

export const referralOptions = [
  "Google Search",
  "Website",
  "Facebook",
  "Instagram",
  "LinkedIn",
  "WhatsApp",
  "Email",
  "Phone Call",
  "Client Referral",
  "Other",
] as const;

export const contactMethodOptions = ["Email", "Phone Call", "WhatsApp"] as const;

const required = (label: string, max = 200) => z.string().trim().min(1, `Please enter ${label}.`).max(max, `Please keep this under ${max} characters.`);
const optional = (max = 200) => z.string().trim().max(max, `Please keep this under ${max} characters.`).optional();
const email = z.string().trim().min(1, "Please enter your email address.").email("Please enter a valid email address.").max(200);
const phone = (label: string) =>
  z
    .string()
    .trim()
    .min(1, `Please enter ${label}.`)
    .regex(/^[+()\d\s-]{7,20}$/, "Please enter a valid phone number, e.g. 0300-1234567 or +92 300 1234567.");

// Spam protection fields: `company_website` must stay empty (honeypot) and
// `startedAt` records when the form was rendered.
const antiSpam = {
  company_website: z.string().max(0).optional(),
  startedAt: z.number().optional(),
};

export const quoteSchema = z.object({
  fullName: required("your full name", 120),
  companyName: optional(160),
  email,
  phone: phone("a phone or WhatsApp number"),
  service: z.enum(serviceOptions.map((s) => s.value) as [string, ...string[]], { error: "Please choose a service." }),
  origin: required("the origin country or city", 160),
  destination: required("the destination country or city", 160),
  cargoType: optional(80),
  cargoDescription: required("a short cargo description", 2000),
  weight: optional(60),
  volume: optional(60),
  readyDate: optional(40),
  additional: optional(2000),
  consent: z.boolean().refine((v) => v, "Please confirm you agree to the Privacy Policy."),
  ...antiSpam,
});

export const contactSchema = z
  .object({
    fullName: required("your full name", 120),
    email,
    phone: z
      .string()
      .trim()
      .max(20)
      .refine((v) => v === "" || /^[+()\d\s-]{7,20}$/.test(v), "Please enter a valid phone number.")
      .optional(),
    companyName: optional(160),
    subject: required("a subject", 160),
    message: required("your message", 4000),
    referral: z.enum(referralOptions).optional().or(z.literal("")),
    referralOther: optional(160),
    contactMethod: z.enum(contactMethodOptions).optional().or(z.literal("")),
    consent: z.boolean().refine((v) => v, "Please confirm you agree to the Privacy Policy."),
    ...antiSpam,
  })
  .refine((d) => d.contactMethod !== "Phone Call" && d.contactMethod !== "WhatsApp" ? true : !!d.phone, {
    path: ["phone"],
    message: "Please add a phone number so we can reach you the way you prefer.",
  });

export type QuoteInput = z.input<typeof quoteSchema>;
export type QuoteData = z.output<typeof quoteSchema>;
export type ContactInput = z.input<typeof contactSchema>;
export type ContactData = z.output<typeof contactSchema>;

export type FormResponse = { ok: true } | { ok: false; code: "validation" | "rate_limited" | "spam" | "not_configured" | "send_failed"; message: string };
