import Link from "next/link";
import type { Metadata } from "next";
import { ArrowUpRight, Check } from "lucide-react";
import { Button, Eyebrow } from "@/components/ui/primitives";
import { LineReveal, Reveal } from "@/components/ui/Reveal";
import { Breadcrumbs, CtaBand, SectionHeading } from "@/components/sections/common";
import { getService, services, type Service } from "@/data/services";

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
      <ServiceHero s={s} variant={variant} />
      <Introduction s={s} variant={variant} />
      <Capabilities s={s} variant={variant} />
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

function ServiceHero({ s, variant }: { s: Service; variant: Variant }) {
  const crumbs = [{ label: "Services", href: "/services" }, { label: s.title }];
  if (variant === "fullbleed") {
    return (
      <section className="relative bg-white px-3 pt-[72px] md:px-5 md:pt-20">
        <div className="relative isolate flex min-h-[78svh] flex-col justify-between overflow-hidden rounded-2xl bg-navy text-white">
          <img src={s.image} alt={s.imageAlt} className="absolute inset-0 size-full hero-zoom -z-10 object-cover" fetchPriority="high" decoding="async" />
          <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-navy-deep/90 via-navy/30 to-navy-deep/50" />
          <div className="container-x pt-10">
            <Breadcrumbs items={crumbs} tone="dark" />
          </div>
          <div className="container-x pb-12 md:pb-16">
            <p className="eyebrow text-cyan">
              Service {s.n} — {s.eyebrow}
            </p>
            <h1 className="text-display mt-6 max-w-4xl">
              <LineReveal lines={[s.title]} />
            </h1>
            <Reveal delay={0.2} className="mt-8 flex flex-col gap-8 border-t border-white/20 pt-8 md:flex-row md:items-end md:justify-between">
              <p className="text-lead max-w-xl text-white/80">{s.headline}</p>
              <Button href={`/get-a-quote?service=${s.slug}`} variant="light">
                {s.quoteLabel}
              </Button>
            </Reveal>
          </div>
        </div>
      </section>
    );
  }
  if (variant === "stacked") {
    return (
      <section className="bg-white pt-28 md:pt-36">
        <div className="container-x">
          <Breadcrumbs items={crumbs} />
          <div className="mt-12 flex items-baseline gap-6">
            <span className="font-display text-sm font-semibold text-blue tabular-nums">{s.n}</span>
            <Eyebrow tone="muted">{s.eyebrow}</Eyebrow>
          </div>
          <h1 className="mt-6 font-display text-[clamp(3rem,9vw,8rem)] font-semibold leading-[0.92] tracking-[-0.045em] text-ink">
            <LineReveal lines={[s.title]} />
          </h1>
          <Reveal delay={0.2} className="mt-10 grid gap-8 md:grid-cols-12">
            <p className="text-lead text-muted md:col-span-6">{s.headline}</p>
            <div className="md:col-span-5 md:col-start-8 md:justify-self-end">
              <Button href={`/get-a-quote?service=${s.slug}`}>{s.quoteLabel}</Button>
            </div>
          </Reveal>
        </div>
        <Reveal y={40} className="mt-14 px-3 md:mt-20 md:px-5">
          <div className="relative aspect-[16/10] overflow-hidden rounded-2xl md:aspect-[24/9]">
            <img src={s.image} alt={s.imageAlt} className="absolute inset-0 size-full object-cover" fetchPriority="high" decoding="async" />
          </div>
        </Reveal>
      </section>
    );
  }
  // split
  return (
    <section className="bg-white pt-28 md:pt-36">
      <div className="container-x grid gap-12 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-6">
          <Breadcrumbs items={crumbs} />
          <p className="eyebrow mt-12 text-blue">
            Service {s.n} — {s.eyebrow}
          </p>
          <h1 className="text-display mt-6 text-ink">
            <LineReveal lines={s.title.split(" ").length > 1 ? [s.title.split(" ")[0], s.title.split(" ").slice(1).join(" ")] : [s.title]} />
          </h1>
          <Reveal delay={0.2}>
            <p className="text-lead mt-8 max-w-lg text-muted">{s.headline}</p>
            <div className="mt-10">
              <Button href={`/get-a-quote?service=${s.slug}`}>{s.quoteLabel}</Button>
            </div>
          </Reveal>
        </div>
        <Reveal y={40} className="lg:col-span-6">
          <div className="relative aspect-[4/5] overflow-hidden rounded-xl md:aspect-[5/4] lg:aspect-[4/5]">
            <img src={s.image} alt={s.imageAlt} className="absolute inset-0 size-full object-cover" fetchPriority="high" decoding="async" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Introduction({ s, variant }: { s: Service; variant: Variant }) {
  return (
    <section className="section-y bg-white">
      <div className="container-x grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Eyebrow>Overview</Eyebrow>
        </div>
        <Reveal className="lg:col-span-8">
          <p className="font-display text-[clamp(1.5rem,2.6vw,2.375rem)] font-medium leading-[1.25] tracking-[-0.02em] text-ink">{s.intro}</p>
          <div className="mt-10 flex flex-wrap gap-2">
            {s.suitedFor.map((t) => (
              <span key={t} className="rounded-full border border-line px-4 py-2 text-[0.875rem] text-muted">
                {t}
              </span>
            ))}
          </div>
          {variant !== "split" && (
            <p className="mt-10 max-w-2xl text-muted">
              Every {s.title.toLowerCase()} shipment is handled by a small team led by more than 30 years of founder experience — so the
              person you speak to is the person managing your cargo.
            </p>
          )}
        </Reveal>
      </div>
    </section>
  );
}

function Capabilities({ s, variant }: { s: Service; variant: Variant }) {
  return (
    <section className="section-y bg-off">
      <div className="container-x">
        <SectionHeading align="split" eyebrow="Capabilities" title={["What's included."]} intro={`The core of our ${s.title.toLowerCase()} service, as set out in our company profile.`} />
        {variant === "stacked" ? (
          <ol className="mt-16 border-t border-line">
            {s.capabilities.map((c, i) => (
              <Reveal as="li" key={c.title} delay={i * 0.05} className="grid gap-3 border-b border-line py-8 md:grid-cols-12 md:items-baseline md:py-10">
                <span className="font-display text-sm font-semibold text-blue tabular-nums md:col-span-1">0{i + 1}</span>
                <h3 className="text-h3 md:col-span-5">{c.title}</h3>
                <p className="text-muted md:col-span-6">{c.text}</p>
              </Reveal>
            ))}
          </ol>
        ) : (
          <div className="mt-16 grid gap-px overflow-hidden rounded-xl border border-line bg-line md:grid-cols-2">
            {s.capabilities.map((c, i) => (
              <Reveal key={c.title} delay={i * 0.06} className="flex flex-col bg-white p-8 md:p-10">
                <span className="font-display text-sm font-semibold text-blue tabular-nums">0{i + 1}</span>
                <h3 className="text-h3 mt-10">{c.title}</h3>
                <p className="mt-3 text-muted">{c.text}</p>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function HowItWorks({ s }: { s: Service }) {
  return (
    <section className="section-y bg-navy text-white">
      <div className="container-x">
        <SectionHeading tone="dark" align="split" eyebrow="How it works" title={["Four steps,", "clearly managed."]} intro="You'll know at each stage what is happening with your shipment and what comes next." />
        <ol className="mt-16 grid gap-px overflow-hidden rounded-xl bg-line-dark md:grid-cols-2 lg:grid-cols-4">
          {s.steps.map((st, i) => (
            <Reveal as="li" key={st.title} delay={i * 0.08} className="bg-navy p-8 md:min-h-[280px]">
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
    <section className="section-y bg-white">
      <div className="container-x grid gap-12 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-5">
          <SectionHeading eyebrow="Why Nexpedite Freight" title={["Experience,", "applied directly."]} />
        </div>
        <ul className="space-y-5 lg:col-span-6 lg:col-start-7">
          {s.why.map((w, i) => (
            <Reveal as="li" key={w} delay={i * 0.08} className="flex items-start gap-4 border-b border-line pb-5">
              <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full bg-blue/10 text-blue">
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
    <section className="section-y border-t border-line bg-white pt-0 md:pt-0">
      <div className="container-x pt-16 md:pt-24">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading eyebrow="Related services" title={["Often paired with."]} />
          <Link href="/services" className="link-underline font-medium text-blue">
            All services
          </Link>
        </div>
        <ul className="mt-12 grid gap-5 md:grid-cols-3">
          {related.map((r, i) => (
            <Reveal as="li" key={r.slug} delay={i * 0.08}>
              <Link href={`/services/${r.slug}`} className="group block">
                <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
                  <img src={r.image} alt={r.imageAlt} className="absolute inset-0 size-full object-cover transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-105" loading="lazy" decoding="async" />
                </div>
                <div className="mt-5 flex items-start justify-between gap-4">
                  <div>
                    <span className="font-display text-xs font-semibold text-blue tabular-nums">{r.n}</span>
                    <h3 className="mt-1 font-display text-xl font-semibold text-ink group-hover:text-blue">{r.title}</h3>
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
