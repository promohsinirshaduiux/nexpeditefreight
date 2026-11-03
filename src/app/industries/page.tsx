import type { Metadata } from "next";
import { Button, Eyebrow } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/Reveal";
import { CtaBand, PageHero, SectionHeading } from "@/components/sections/common";
import { industries } from "@/data/industries";
import { CalendarClock, CircleCheck, FileCheck2, Route, type LucideIcon } from "lucide-react";

const whyCards: { icon: LucideIcon; image: string; title: string; text: string }[] = [
  { icon: Route, image: "/images/why-right-mode.jpg", title: "Right mode, first time", text: "Knowing how a sector ships helps choose between ocean, air and road from the start." },
  { icon: FileCheck2, image: "/images/why-documents.jpg", title: "Fewer document surprises", text: "Sector-specific paperwork is anticipated rather than discovered at the border." },
  { icon: CalendarClock, image: "/images/why-deadlines.jpg", title: "Plans that fit deadlines", text: "Seasonal and production timelines are built into routing and booking." },
];

export const metadata: Metadata = {
  title: "Industries We Serve — Textile, Apparel, Leather, Surgical & More",
  description:
    "Freight forwarding for Pakistan's textile, apparel, leather, sports goods, surgical, chemicals, machinery and FMCG sectors.",
  alternates: { canonical: "/industries" },
};

const slug = (n: string) => n.toLowerCase().replace(/\s+/g, "-");

const summaryOf = (name: string) => industries.find((ind) => ind.name === name)?.summary ?? "";

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
        introWide
        eyebrow="Sectors we support"
        title={["Industries", "we serve."]}
        intro="We support exporters and importers across Pakistan's key trading sectors — with freight plans that reflect how each industry actually ships."
        image="/images/industries-hero.jpg"
        imageAlt="Textile bales, garment cartons, consumer goods, crated machinery and chemical drums staged for export beside a container port"
      />

      <section className="bg-white pt-[clamp(4rem,9vw,9rem)] pb-10 md:pb-12">
        <div className="container-x">
          <Eyebrow>Introduction</Eyebrow>
          <Reveal className="mt-5">
            <p className="font-display text-[clamp(1.5rem,2.6vw,2.375rem)] font-medium leading-[1.25] tracking-[-0.02em] text-ink">
              Every sector moves differently: garments run to seasons, machinery needs planning, FMCG needs steady flow.
            </p>
            <p className="mt-4 text-muted">
              Below are the sectors we support and what matters to each. Don&apos;t see yours? Reach out to our team.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Showcase */}
      <section className="bg-white pb-[clamp(4rem,9vw,9rem)]">
        <div className="container-x grid gap-5 md:h-[540px] md:grid-cols-3 md:grid-rows-2">
          {Object.entries(showcaseImages).map(([name, img], i) => (
            <Reveal
              key={name}
              delay={i * 0.08}
              className={`group relative overflow-hidden rounded-xl ${i === 0 ? "aspect-[4/3] md:col-span-2 md:row-span-2 md:aspect-auto" : "aspect-[4/3] md:aspect-auto"}`}
            >
              {/* Hover: the photo softens and blurs, a navy wash rises, and the sector's details slide up */}
              <img
                src={img.src}
                alt={img.alt}
                className="absolute inset-0 size-full object-cover transition-[filter,transform] duration-700 ease-[var(--ease-out-expo)] group-hover:scale-105 group-hover:blur-[3px]"
                loading="lazy"
                decoding="async"
              />
              <span
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-navy-deep/90 via-navy/55 to-navy/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              />
              <span className="absolute bottom-5 left-5 rounded-full bg-white/90 px-4 py-2 font-display text-sm font-semibold text-navy backdrop-blur transition-[opacity,transform] duration-300 group-hover:-translate-y-2 group-hover:opacity-0">
                {name}
              </span>
              <div className="absolute inset-x-0 bottom-0 translate-y-4 p-6 text-white opacity-0 transition-[opacity,transform] duration-500 ease-[var(--ease-out-expo)] group-hover:translate-y-0 group-hover:opacity-100 md:p-8">
                <h3 className={`font-display font-semibold tracking-tight ${i === 0 ? "text-[clamp(1.5rem,2.4vw,2.25rem)]" : "text-xl"}`}>{name}</h3>
                <p className={`mt-2 max-w-md text-white/80 ${i === 0 ? "text-[1.0625rem]" : "text-[0.9375rem]"}`}>{summaryOf(name)}</p>
              </div>
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
            action={<Button href="/contact">Contact Us</Button>}
          />
          <ul className="mt-16 border-t border-line">
            {industries.map((ind) => (
              <Reveal as="li" key={ind.name} className="scroll-mt-28 border-b border-line" y={20}>
                <article id={slug(ind.name)} className="group grid gap-6 py-10 md:py-12 lg:grid-cols-12">
                  <div className="lg:col-span-4">
                    <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-semibold tracking-tight text-ink transition-colors duration-300 group-hover:text-blue">{ind.name}</h2>
                    <p className="mt-3 text-muted">{ind.summary}</p>
                  </div>
                  <ul className="space-y-3 lg:col-span-5 lg:col-start-6">
                    {ind.needs.map((n) => (
                      <li key={n} className="flex items-start gap-3 text-ink">
                        <CircleCheck aria-hidden className="mt-[0.2rem] size-[18px] shrink-0 text-emerald-600" strokeWidth={2} />
                        {n}
                      </li>
                    ))}
                  </ul>
                  {/* Hover: the industry photo floats up into the right-hand column */}
                  <div aria-hidden className="relative hidden lg:col-span-2 lg:col-start-11 lg:block">
                    <span className="pointer-events-none absolute right-0 top-1/2 -mt-[75px] block h-[150px] w-[210px] translate-y-4 rotate-3 scale-90 overflow-hidden rounded-xl opacity-0 shadow-[0_24px_48px_-20px_rgba(12,32,65,0.45)] transition-[opacity,transform] duration-500 ease-[var(--ease-out-expo)] group-hover:translate-y-0 group-hover:-rotate-2 group-hover:scale-100 group-hover:opacity-100">
                      <img src={ind.image} alt="" loading="lazy" decoding="async" className="size-full object-cover" />
                    </span>
                  </div>
                </article>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Why industry knowledge matters */}
      <section className="section-y bg-white">
        <div className="container-x grid gap-14 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5">
            <SectionHeading eyebrow="Why it matters" title={["Industry knowledge", "prevents delays."]} />
          </div>
          <ol className="grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-3 lg:col-span-7">
            {whyCards.map((c, i) => (
              <Reveal
                as="li"
                key={c.title}
                delay={i * 0.08}
                className={`group relative overflow-hidden p-7 ${i === 1 ? "bg-white" : "bg-gray-100"}`}
              >
                {/* Hover: a photo fades in under a navy wash, text turns white, icon turns to glass */}
                <span aria-hidden className="absolute inset-0 overflow-hidden opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <img
                    src={c.image}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 size-full scale-110 object-cover transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-100"
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-navy-deep/95 via-navy/75 to-navy/45" />
                </span>
                <div className="relative">
                  <span className="icon-glass-hover flex size-12 items-center justify-center rounded-full border border-line bg-white text-blue">
                    <c.icon aria-hidden className="size-[22px]" strokeWidth={1.5} />
                  </span>
                  <h3 className="mt-8 font-display text-lg font-semibold transition-colors duration-500 group-hover:text-white">{c.title}</h3>
                  <p className="mt-3 text-[0.9375rem] text-muted transition-colors duration-500 group-hover:text-white/75">{c.text}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <CtaBand title={["Request a tailored", "quotation."]} text="Tell us your sector, cargo and destination. We'll shape a freight plan around how your industry ships." />
    </>
  );
}
