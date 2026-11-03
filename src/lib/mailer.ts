import "server-only";
import nodemailer from "nodemailer";

/**
 * Email delivery via SMTP. Configure in the environment (see .env.example):
 * SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, MAIL_FROM, MAIL_TO.
 */
export function mailConfigured() {
  return Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS && process.env.MAIL_TO);
}

export async function sendMail(opts: { subject: string; text: string; html: string; replyTo?: string }) {
  const port = Number(process.env.SMTP_PORT ?? 587);
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure: port === 465,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });
  await transporter.sendMail({
    from: process.env.MAIL_FROM ?? process.env.SMTP_USER,
    to: process.env.MAIL_TO,
    replyTo: opts.replyTo,
    subject: opts.subject,
    text: opts.text,
    html: opts.html,
  });
}

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

/** Renders label/value rows as plain text and a simple HTML table. */
export function renderRows(title: string, rows: [string, string | undefined | null][]) {
  const filled = rows.filter(([, v]) => v && String(v).trim());
  const text = `${title}\n\n${filled.map(([k, v]) => `${k}: ${v}`).join("\n")}`;
  const html = `<h2 style="font-family:Arial,sans-serif;color:#0c2041">${esc(title)}</h2><table style="font-family:Arial,sans-serif;font-size:14px;border-collapse:collapse">${filled
    .map(
      ([k, v]) =>
        `<tr><td style="padding:6px 16px 6px 0;color:#5d6676;vertical-align:top;white-space:nowrap">${esc(k)}</td><td style="padding:6px 0;color:#101c30;white-space:pre-wrap">${esc(String(v))}</td></tr>`,
    )
    .join("")}</table>`;
  return { text, html };
}
