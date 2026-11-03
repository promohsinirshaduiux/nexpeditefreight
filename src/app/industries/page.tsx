import type { Metadata } from "next";
import { Eyebrow } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/Reveal";
import { CtaBand, PageHero, SectionHeading } from "@/components/sections/common";
import { industries } from "@/data/industries";

export const metadata: Metadata = {
  title: "Industries We Serve — Textile, Apparel, Leather, Surgical & More",
  description:
    "Freight forwarding for Pakistan's textile, apparel, leather, sports goods, surgical, chemicals, machinery and FMCG sectors.",
  alternates: { canonical: "/industries" },
};

const slug = (n: string) => n.toLowerCase().replace(/\s+/g, "-");

const showcaseImages: Record<string, { src: string; alt: string }> = {
  Textile: { src: "/images/textile.jpg", alt: "Export-ready textile bales and fabric rolls on pallets" },
  Machinery: { src: "/images/machinery-crates.jpg", alt: "Crated industrial machinery parts loaded in a container" },
  FMCG: { src: "/images/warehousing.jpg", alt: "Warehouse racking with palletised consumer goods" },
};

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Industries" }]}
        eyebrow="Sectors we support"
        title={["Industries", "we serve."]}
        intro="We support exporters and importers across Pakistan's key trading sectors — with freight plans that reflect how each industry actually ships."
        image="/images/machinery-crates.jpg"
        imageAlt="Export crates and machinery strapped inside a shipping container"
      />

      <section className="section-y bg-white">
        <div className="container-x grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Eyebrow>Introduction</Eyebrow>
          </div>
          <Reveal className="lg:col-span-8">
            <p className="font-display text-[clamp(1.5rem,2.6vw,2.375rem)] font-medium leading-[1.25] tracking-[-0.02em] text-ink">
              Every sector moves differently. Garments run to retail seasons, surgical instruments need care and speed, machinery needs
              planning, and FMCG needs a steady flow.
            </p>
            <p className="mt-8 max-w-2xl text-muted">
              Below are the sectors we support and the freight considerations that typically matter to them. Don&apos;t see yours? Reach
              out — we&apos;re happy to discuss your sector&apos;s specific freight needs.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Showcase */}
      <section className="bg-white pb-[clamp(4rem,9vw,9rem)]">
        <div className="container-x grid gap-5 md:h-[540px] md:grid-cols-3 md:grid-rows-2">
          {Object.entries(showcaseImages).map(([name, img], i) => (
            <Reveal key={name} delay={i * 0.08} className={`relative overflow-hidden rounded-xl ${i === 0 ? "aspect-[4/3] md:col-span-2 md:row-span-2 md:aspect-auto" : "aspect-[4/3] md:aspect-auto"}`}>
              <img src={img.src} alt={img.alt} className="absolute inset-0 size-full object-cover" loading="lazy" decoding="async" />
              <span className="absolute bottom-5 left-5 rounded-full bg-white/90 px-4 py-2 font-display text-sm font-semibold text-navy backdrop-blur">{name}</span>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Requirements by industry */}
      <section className="section-y bg-off">
        <div className="container-x">
          <SectionHeading
            align="split"
            eyebrow="Freight requirements by industry"
            title={["What each sector", "needs from freight."]}
            intro="Typical considerations we plan for in each sector, and the services most often involved."
          />
          <ul className="mt-16 border-t border-line">
            {industries.map((ind, i) => (
              <Reveal as="li" key={ind.name} className="scroll-mt-28 border-b border-line" y={20}>
                <article id={slug(ind.name)} className="grid gap-6 py-10 md:py-12 lg:grid-cols-12">
                  <div className="lg:col-span-4">
                    <span className="font-display text-sm font-semibold text-blue tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                    <h2 className="mt-2 font-display text-[clamp(1.75rem,3vw,2.5rem)] font-semibold tracking-tight text-ink">{ind.name}</h2>
                    <p className="mt-3 text-muted">{ind.summary}</p>
                  </div>
                  <ul className="space-y-3 lg:col-span-5 lg:col-start-6">
                    {ind.needs.map((n) => (
                      <li key={n} className="flex gap-3 text-ink">
                        <span aria-hidden className="mt-3 h-px w-5 shrink-0 bg-blue" />
                        {n}
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap content-start gap-2 lg:col-span-2 lg:col-start-11 lg:justify-end">
                    {ind.modes.map((m) => (
                      <span key={m} className="rounded-full border border-line bg-white px-3 py-1.5 text-[0.8125rem] text-muted">
                        {m}
                      </span>
                    ))}
                  </div>
                </article>
              </Reveal>
            ))}
          </ul>
          <p className="mt-10 text-muted">And more — reach out to discuss your sector&apos;s specific freight needs.</p>
        </div>
      </section>

      {/* Why industry knowledge matters */}
      <section className="section-y bg-white">
        <div className="container-x grid gap-14 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5">
            <SectionHeading eyebrow="Why it matters" title={["Industry knowledge", "prevents delays."]} />
          </div>
          <ol className="grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-3 lg:col-span-7">
            {[
              ["Right mode, first time", "Knowing how a sector ships helps choose between ocean, air and road from the start."],
              ["Fewer document surprises", "Sector-specific paperwork is anticipated rather than discovered at the border."],
              ["Plans that fit deadlines", "Seasonal and production timelines are built into routing and booking."],
            ].map(([t, d], i) => (
              <Reveal as="li" key={t} delay={i * 0.08} className="bg-white p-7">
                <span className="font-display text-sm font-semibold text-blue">0{i + 1}</span>
                <h3 className="mt-8 font-display text-lg font-semibold">{t}</h3>
                <p className="mt-3 text-[0.9375rem] text-muted">{d}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <CtaBand title={["Request a tailored", "quotation."]} text="Tell us your sector, cargo and destination. We'll shape a freight plan around how your industry ships." />
    </>
  );
}
