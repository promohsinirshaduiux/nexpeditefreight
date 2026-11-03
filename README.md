# Nexpedite Freight — Website

Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · Motion · React Hook Form + Zod · Lucide

```bash
npm install
cp .env.example .env.local   # fill in values
npm run dev                  # http://localhost:3000
npm run build && npm start
```

## Routes (15 + 404)

| Section | Routes |
| --- | --- |
| Main | `/` · `/about` · `/industries` · `/get-a-quote` · `/contact` |
| Services | `/services` · `/services/ocean-freight` · `/services/air-freight` · `/services/road-transportation` · `/services/customs-clearance` · `/services/warehousing-distribution` · `/services/project-cargo` |
| Resources & legal | `/faqs` · `/privacy-policy` · `/terms-and-conditions` |
| Other | custom 404 (`src/app/not-found.tsx`), `/sitemap.xml`, `/robots.txt` |

## Where content lives

- `src/data/site.ts` — company details, contact numbers, WhatsApp, social links, navigation, values, process
- `src/data/services.ts` — all six service pages (copy, capabilities, steps, SEO)
- `src/data/industries.ts`, `src/data/faqs.ts`
- `src/app/globals.css` — design tokens (colours, fonts, type scale, spacing utilities)

All business content comes from the client's company profile. No statistics, testimonials, certifications or client logos have been invented.

## Forms

`/get-a-quote` and `/contact` post to `src/app/api/quote` and `src/app/api/contact`. Both:
validate with the same Zod schema on client and server, reject a filled honeypot or submissions made within 2.5 s, rate-limit to 5 per IP per 10 minutes (in memory), and email the team via SMTP.

**Email delivery is not configured yet.** Until `SMTP_HOST`, `SMTP_USER`, `SMTP_PASS` and `MAIL_TO` are set, the API returns
`503 not_configured` and the form shows an honest error pointing visitors to email/WhatsApp. No fake success state is ever shown.
For multi-instance or serverless hosting, replace the in-memory rate limiter in `src/lib/form-guard.ts` with a shared store.

## Needs client confirmation before launch

| Item | Where | Status |
| --- | --- | --- |
| WhatsApp is enabled on 0300-8496494 | `NEXT_PUBLIC_WHATSAPP_NUMBER` | Unverified — currently `923008496494` |
| Office city (profile lists both Karachi and Lahore) | `NEXT_PUBLIC_OFFICE_CITY` | Unset — site shows "Pakistan" |
| Facebook / Instagram / LinkedIn URLs | `NEXT_PUBLIC_*_URL` | None supplied — links hidden everywhere |
| Production domain | `NEXT_PUBLIC_SITE_URL` | Assumed `https://www.nexpeditefreight.com` |
| SMTP credentials | `SMTP_*`, `MAIL_TO` | Required for forms |
| Privacy Policy & Terms | `src/app/privacy-policy`, `src/app/terms-and-conditions` | Drafts with [bracketed] placeholders — need legal review |

## Imagery

Photography was generated for this project with Higgsfield (GPT Image 2.5) and contains no third-party logos or people.
Web versions live in `public/images`; originals in `design/source-images` (git-ignored). Re-export with `node scripts/optimize-images.mjs`.
The logo in `public/brand/logo.png` is the client's supplied artwork, cropped of its frame only.
