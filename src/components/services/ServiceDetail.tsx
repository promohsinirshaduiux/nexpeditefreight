import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowUpRight,
  Boxes,
  CalendarClock,
  Check,
  ClipboardCheck,
  Container,
  FileText,
  Forklift,
  Gem,
  Globe2,
  Handshake,
  Landmark,
  Lock,
  MapPinned,
  PackageCheck,
  Plane,
  Radar,
  Route,
  Scale,
  ShieldCheck,
  Timer,
  Truck,
  Warehouse,
  Weight,
  type LucideIcon,
} from "lucide-react";
import { createElement } from "react";
import { Button, Eyebrow } from "@/components/ui/primitives";
import { LineReveal, Reveal } from "@/components/ui/Reveal";
import { CtaBand, SectionHeading } from "@/components/sections/common";
import { getService, services, type Service } from "@/data/services";
import { srcSetFor } from "@/lib/images";

export function serviceMetadata(slug: string): Metadata {
  const s = getService(slug);
  return {
    title: s.metaTitle,
    description: s.metaDescription,
    alternates: { canonical: `/services/${s.slug}` },
    openGraph: { title: `${s.title} | Nexpedite Freight`, description: s.metaDescription, url: `/services/${s.slug}`, images: [s.image] },
  };
}

type Variant = "split" | "fullbleed" | "stacked";

/**
 * Shared service page. Layout varies by `variant` so the six pages read as a
 * family without being identical.
 */
export function ServiceDetail({ slug, variant }: { slug: string; variant: Variant }) {
  const s = getService(slug);
  return (
    <>
      <ServiceHero s={s} />
      <Introduction s={s} variant={variant} />
      <Capabilities s={s} />
      <HowItWorks s={s} />
      <Why s={s} />
      <Related s={s} />
      <CtaBand
        title={[`${s.quoteLabel}.`]}
        text={`Share your cargo details and we'll come back with a practical ${s.title.toLowerCase()} solution.`}
        primaryLabel="Get a Quotation"
        primaryHref={`/get-a-quote?service=${s.slug}`}
      />
    </>
  );
}

/** Same hero on every service page: label, two-line headline, then a full-width photo. */
function ServiceHero({ s }: { s: Service }) {
  return (
    <section className="bg-white pt-28 md:pt-36">
      <div className="container-x">
        <p className="eyebrow text-blue">{s.title}</p>
        <h1 className="mt-3 font-display text-[clamp(2.25rem,5.4vw,5rem)] font-semibold leading-[0.92] tracking-[-0.045em] text-ink">
          <LineReveal hero lines={headlineLines(s.headline)} />
        </h1>
      </div>
      <div className="container-x mt-14 md:mt-20">
        <Reveal hero y={40} className="relative aspect-[4/3] overflow-hidden rounded-xl md:aspect-[24/10]">
          <img src={s.image} srcSet={srcSetFor(s.image)} sizes="100vw" alt={s.imageAlt} className="absolute inset-0 size-full object-cover" fetchPriority="high" decoding="async" />
        </Reveal>
      </div>
    </section>
  );
}

function Introduction({ s, variant }: { s: Service; variant: Variant }) {
  return (
    <section className="section-y bg-white">
      <div className="container-x">
        <Eyebrow>Overview</Eyebrow>
        <Reveal hero className="mt-5">
          <p className="font-display text-[clamp(1.5rem,2.6vw,2.375rem)] font-medium leading-[1.25] tracking-[-0.02em] text-ink">{s.intro}</p>
          <div className="mt-8 flex flex-wrap gap-2">
            {s.suitedFor.map((t) => (
              <span key={t} className="rounded-full border border-line bg-gray-50 px-4 py-2 text-[0.875rem] text-muted">
                {t}
              </span>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button href={`/get-a-quote?service=${s.slug}`}>
              Get {/^[aeiou]/i.test(s.title) ? "an" : "a"} {s.title} Quote
            </Button>
            <Button href="/contact" variant="outline-blue">
              Contact Us
            </Button>
          </div>
          {variant !== "split" && (
            <p className="mt-8 text-muted">
              Every {s.title.toLowerCase()} shipment is handled by a small team led by more than 30 years of founder experience — so the
              person you speak to is the person managing your cargo.
            </p>
          )}
        </Reveal>
      </div>
    </section>
  );
}

function Capabilities({ s }: { s: Service }) {
  return (
    <section className="section-y bg-off">
      <div className="container-x">
        <SectionHeading align="split" eyebrow="Capabilities" title={["What's included."]} intro={`The core of our ${s.title.toLowerCase()} service, as set out in our company profile.`} />
          <div className="mt-16 grid gap-px overflow-hidden rounded-xl border border-line bg-line md:grid-cols-2">
            {s.capabilities.map((c, i) => (
              <Reveal
                key={c.title}
                delay={i * 0.06}
                className={`group relative flex flex-col overflow-hidden p-8 md:p-10 ${i === 1 || i === 2 ? "bg-gray-100" : "bg-white"}`}
              >
                {/* Hover: a photo fades in under a navy wash and the text turns white */}
                {capabilityImage(s, c, i) && (
                  <span aria-hidden className="absolute inset-0 overflow-hidden opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    <img
                      src={capabilityImage(s, c, i)}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 size-full scale-110 object-cover transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-100"
                    />
                    <span className="absolute inset-0 bg-gradient-to-t from-navy-deep/95 via-navy/75 to-navy/45" />
                  </span>
                )}
                <div className="relative">
                  <span
                    className={`flex size-12 items-center justify-center rounded-full border border-line bg-white text-blue transition-colors duration-500 ${
                      capabilityImage(s, c, i) ? "icon-glass-hover" : "group-hover:border-blue group-hover:bg-blue group-hover:text-white"
                    }`}
                  >
                    <CapabilityIcon title={c.title} />
                  </span>
                  <h3 className={`mt-8 font-display text-xl font-semibold transition-colors duration-500 ${capabilityImage(s, c, i) ? "group-hover:text-white" : ""}`}>{c.title}</h3>
                  <p className={`mt-3 text-[0.9375rem] text-muted transition-colors duration-500 ${capabilityImage(s, c, i) ? "group-hover:text-white/75" : ""}`}>{c.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
      </div>
    </section>
  );
}

function HowItWorks({ s }: { s: Service }) {
  return (
    <section className="section-y bg-navy text-white">
      <div className="container-x">
        <SectionHeading tone="dark" align="split" eyebrow="How it works" title={["Four steps,", "clearly managed."]} intro="You'll know at each stage what is happening with your shipment and what comes next." />
        <ol className="mt-16 grid gap-10 border-y border-white/10 py-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-0">
          {s.steps.map((st, i) => (
            <Reveal as="li" key={st.title} delay={i * 0.08} className="relative lg:px-8 lg:first:pl-0 lg:last:pr-0 lg:not-first:before:absolute lg:not-first:before:top-1/2 lg:not-first:before:left-0 lg:not-first:before:h-[70%] lg:not-first:before:w-px lg:not-first:before:-translate-y-1/2 lg:not-first:before:bg-white/10">
              <span className="font-display text-[3.5rem] font-semibold leading-none tracking-[-0.04em] text-white/15">0{i + 1}</span>
              <h3 className="mt-8 font-display text-xl font-semibold">{st.title}</h3>
              <p className="mt-3 text-[0.9375rem] text-white/70">{st.text}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Why({ s }: { s: Service }) {
  return (
    <section className="section-y bg-gray-100">
      <div className="container-x grid gap-12 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-5">
          <SectionHeading eyebrow="Why Nexpedite Freight" title={["Experience,", "applied directly."]} />
        </div>
        <ul className="space-y-5 lg:col-span-6 lg:col-start-7">
          {s.why.map((w, i) => (
            <Reveal as="li" key={w} delay={i * 0.08} className="flex items-start gap-4 border-b border-line pb-5">
              <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full bg-white text-blue shadow-[0_2px_8px_-2px_rgba(12,32,65,0.18)]">
                <Check aria-hidden className="size-4" />
              </span>
              <span className="text-lg text-ink">{w}</span>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Related({ s }: { s: Service }) {
  const related = s.related.map((r) => services.find((x) => x.slug === r)!).filter(Boolean);
  return (
    <section className="section-y bg-white">
      <div className="container-x pt-16 md:pt-24">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading eyebrow="Related services" title={["Often paired with."]} />
          <Button href="/services" variant="outline-blue">
            All services
          </Button>
        </div>
        <ul className="mt-12 grid gap-5 md:grid-cols-3">
          {related.map((r, i) => (
            <Reveal as="li" key={r.slug} delay={i * 0.08}>
              <Link href={`/services/${r.slug}`} className="group block">
                <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
                  <img src={r.image} srcSet={srcSetFor(r.image)} sizes="(max-width: 767px) 100vw, 33vw" alt={r.imageAlt} className="absolute inset-0 size-full object-cover transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-105" loading="lazy" decoding="async" />
                </div>
                <div className="mt-5 flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-display text-xl font-semibold text-ink group-hover:text-blue">{r.title}</h3>
                    <p className="mt-1 text-[0.9375rem] text-muted">{r.short}</p>
                  </div>
                  <ArrowUpRight aria-hidden className="mt-6 size-5 shrink-0 text-ink transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </div>
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** Break a headline after its first comma ("Ocean freight," / "planned around your cargo."). */
function headlineLines(h: string) {
  const i = h.indexOf(",");
  return i > 0 ? [h.slice(0, i + 1), h.slice(i + 1).trim()] : [h];
}

// Icons for the "What's included" cards, matched by capability title.
const capabilityIcons: Record<string, LucideIcon> = {
  "FCL and LCL": Container,
  "Port-to-port and door-to-door": Truck,
  "Carrier and routing selection": Route,
  "Shipment tracking and coordination": Radar,
  "Express and standard options": Plane,
  "Time-critical cargo": Timer,
  "High-value cargo": Gem,
  "Airline and ground handling coordination": Handshake,
  "Import and export documentation": FileText,
  "Duty, tax and tariff advisory": Scale,
  "Regulatory compliance": ShieldCheck,
  "Customs coordination": Landmark,
  "Oversized and heavy-lift cargo": Weight,
  "Route survey and feasibility": MapPinned,
  "Specialised equipment": Forklift,
  "Hands-on project management": ClipboardCheck,
  "FTL and LTL": Truck,
  "Cross-border trucking": Globe2,
  "Local pickup and delivery": PackageCheck,
  "Scheduling and distribution": CalendarClock,
  "Short and long-term storage": Warehouse,
  "Inventory handling": Boxes,
  "Distribution planning": Route,
  "Secure facilities": Lock,
};

function CapabilityIcon({ title }: { title: string }) {
  return createElement(capabilityIcons[title] ?? Boxes, { "aria-hidden": true, className: "size-[22px]", strokeWidth: 1.5 });
}

// Hover photo for a "What's included" card: an explicit one from the data, else the
// service's numbered photo (public/images/cap-<slug>-<n>.jpg) when it has been made.
const capabilityPhotos = new Set(["air-freight", "road-transportation", "customs-clearance", "warehousing-distribution", "project-cargo"]);
function capabilityImage(s: Service, c: Service["capabilities"][number], i: number) {
  return c.image ?? (capabilityPhotos.has(s.slug) ? `/images/cap-${s.slug}-${i + 1}.jpg` : undefined);
}
