import "server-only";
import type { z } from "zod";
import { clientIp, looksLikeSpam, rateLimited } from "./form-guard";
import { mailConfigured, renderRows, sendMail } from "./mailer";
import type { FormResponse } from "./schemas";

const json = (body: FormResponse, status: number) => Response.json(body, { status });

/** Validates, filters spam, rate-limits and emails a form submission. */
export async function handleForm<S extends z.ZodType>(
  req: Request,
  schema: S,
  build: (data: z.output<S>) => { subject: string; title: string; rows: [string, string | undefined | null][]; replyTo?: string },
) {
  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return json({ ok: false, code: "validation", message: "We couldn't read your submission. Please try again." }, 400);
  }

  const parsed = schema.safeParse(raw);
  if (!parsed.success) {
    return json({ ok: false, code: "validation", message: "Some fields need attention. Please check the form and try again." }, 422);
  }
  const data = parsed.data as z.output<S> & { company_website?: string; startedAt?: number };

  if (looksLikeSpam(data)) {
    return json({ ok: false, code: "spam", message: "Your submission could not be accepted. Please contact us by email or WhatsApp." }, 400);
  }
  if (rateLimited(clientIp(req))) {
    return json({ ok: false, code: "rate_limited", message: "Too many submissions from your connection. Please wait a few minutes and try again." }, 429);
  }
  if (!mailConfigured()) {
    console.error("[forms] Email delivery is not configured. Set SMTP_HOST, SMTP_USER, SMTP_PASS and MAIL_TO.");
    return json(
      { ok: false, code: "not_configured", message: "Online submissions are temporarily unavailable. Please email or WhatsApp us directly." },
      503,
    );
  }

  const { subject, title, rows, replyTo } = build(data);
  try {
    const { text, html } = renderRows(title, rows);
    await sendMail({ subject, text, html, replyTo });
  } catch (err) {
    console.error("[forms] Failed to send email", err);
    return json({ ok: false, code: "send_failed", message: "We couldn't send your message just now. Please try again or contact us directly." }, 502);
  }
  return json({ ok: true }, 200);
}
