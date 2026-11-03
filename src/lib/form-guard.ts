import "server-only";

/**
 * Basic in-memory rate limiting per IP. Suitable for a single server instance;
 * on serverless or multi-instance hosting, swap for a shared store (e.g. Redis).
 */
const hits = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;

export function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  return false;
}

export function clientIp(req: Request) {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";
}

/** True when the honeypot is filled or the form was submitted implausibly fast. */
export function looksLikeSpam(body: { company_website?: string; startedAt?: number }) {
  if (body.company_website) return true;
  if (typeof body.startedAt === "number" && Date.now() - body.startedAt < 2500) return true;
  return false;
}
