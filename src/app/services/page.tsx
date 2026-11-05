import Link from "next/link";
import type { Metadata } from "next";
import { ArrowUpRight, Boxes, CircleCheck, Plane, ShieldCheck, Ship, Truck, Warehouse, Weight, type LucideIcon } from "lucide-react";
import { createElement } from "react";
import { Button, Eyebrow } from "@/components/ui/primitives";
import { CountUp, LineReveal, Reveal } from "@/components/ui/Reveal";
import { CtaBand, SectionHeading } from "@/components/sections/common";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";
import { services } from "@/data/services";
import { srcSetFor } from "@/lib/images";

export const metadata: Metadata = {
  title: "Freight Forwarding Services — Ocean, Air, Road, Customs & More",
  description:
    "Ocean freight, air freight, road transportation, customs clearance, warehousing and distribution, and project cargo from Pakistan — managed by one experienced team.",
  alternates: { canonical: "/services" },
};

const serviceIcons: Record<string, LucideIcon> = {
  "ocean-freight": Ship,
  "air-freight": Plane,
  "road-transportation": Truck,
  "customs-clearance": ShieldCheck,
  "warehousing-distribution": Warehouse,
  "project-cargo": Weight,
};

export default function ServicesPage() {
  return (
    <>
      {/* Hero — full-width title over a wide photo */}
      <section className="bg-white pt-28 md:pt-36">
        <div className="container-x">
          <Eyebrow>Our services</Eyebrow>
          <h1 className="mt-3 font-display text-[clamp(2.5rem,6.6vw,6.25rem)] font-semibold leading-[1.02] tracking-[-0.045em] text-ink">
            <LineReveal hero lines={["Six services.", "One accountable team."]} />
          </h1>
        </div>
        <div className="container-x mt-14 md:mt-20">
          <Reveal hero y={40} className="relative aspect-[4/3] overflow-hidden rounded-xl md:aspect-[24/10]">
            <img src="/images/containers-abstract.jpg" srcSet={srcSetFor("/images/containers-abstract.jpg")} sizes="100vw" alt="Close-up of stacked shipping container doors" className="absolute inset-0 size-full object-cover" fetchPriority="high" decoding="async" />
          </Reveal>
        </div>
      </section>

      <section className="section-y bg-white">
        <div className="container-x">
          <SectionHeading
            align="split"
            eyebrow="Overview"
            title={["Choose a service,", "or combine them."]}
            hero
            introWide
            intro="Most shipments use more than one service. We connect them — booking, documentation, clearance, storage and delivery — so nothing falls between providers."
          />
          <ul className="mt-16 grid gap-x-6 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <Reveal as="li" key={s.slug} delay={(i % 3) * 0.08}>
                <Link href={`/services/${s.slug}`} className="group block">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-xl sm:aspect-[4/5]">
                    <img
                      src={s.image}
                      srcSet={srcSetFor(s.image)}
                      sizes="(max-width: 767px) 100vw, 33vw"
                      alt={s.imageAlt}
                      className="absolute inset-0 size-full object-cover transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-105" loading="lazy" decoding="async" />
                    <span className="absolute left-5 top-5 flex size-12 items-center justify-center rounded-full border border-white/60 bg-white/90 text-blue backdrop-blur transition-colors duration-300 group-hover:border-blue group-hover:bg-blue group-hover:text-white">
                      {createElement(serviceIcons[s.slug] ?? Boxes, { "aria-hidden": true, className: "size-[22px]", strokeWidth: 1.5 })}
                    </span>
                  </div>
                  <div className="mt-6 flex items-start justify-between gap-4">
                    <div>
                      <h2 className="font-display text-2xl font-semibold tracking-tight text-ink group-hover:text-blue">{s.title}</h2>
                      <p className="mt-2 text-muted">{s.short}</p>
                    </div>
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-full border border-line transition-colors group-hover:border-blue group-hover:bg-blue group-hover:text-white">
                      <ArrowUpRight aria-hidden className="size-4" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-y bg-off">
        <div className="container-x">
          <SectionHeading
            align="split"
            eyebrow="Service highlights"
            title={["What each service", "covers."]}
            intro="The core of each service at a glance. Open any service for the full detail."
            action={<Button href="/contact">Contact Us</Button>}
          />
          <ul className="mt-16 border-t border-line">
            {services.map((s) => (
              <Reveal as="li" key={s.slug} className="border-b border-line" y={20}>
                <Link href={`/services/${s.slug}`} className="group grid gap-6 py-10 md:py-12 lg:grid-cols-12">
                  <div className="lg:col-span-4">
                    <h3 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-semibold tracking-tight text-ink transition-colors duration-300 group-hover:text-blue">
                      {s.title}
                    </h3>
                    <p className="mt-3 text-muted">{s.short}</p>
                  </div>
                  <ul className="space-y-3 lg:col-span-5 lg:col-start-6">
                    {s.capabilities.map((c) => (
                      <li key={c.title} className="flex items-start gap-3 text-ink">
                        <CircleCheck aria-hidden className="mt-[0.2rem] size-[18px] shrink-0 text-emerald-600" strokeWidth={2} />
                        {c.title}
                      </li>
                    ))}
                  </ul>
                  {/* Hover: the service photo floats up into the right-hand column */}
                  <div aria-hidden className="relative hidden lg:col-span-2 lg:col-start-11 lg:block">
                    <span className="pointer-events-none absolute right-0 top-1/2 -mt-[75px] block h-[150px] w-[210px] translate-y-4 rotate-3 scale-90 overflow-hidden rounded-xl opacity-0 shadow-[0_24px_48px_-20px_rgba(12,32,65,0.45)] transition-[opacity,transform] duration-500 ease-[var(--ease-out-expo)] group-hover:translate-y-0 group-hover:-rotate-2 group-hover:scale-100 group-hover:opacity-100">
                      <img src={`/images/svc-row-${s.slug}.jpg`} alt="" loading="lazy" decoding="async" className="size-full object-cover" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-noise section-y bg-navy text-white">
        <div className="container-x">
          <SectionHeading
            tone="dark"
            align="split"
            eyebrow="Our process"
            title={["How a shipment", "moves with us."]}
            action={
              <Button href="/get-a-quote" variant="light">
                Get a Quotation
              </Button>
            }
          />
          <div className="mt-16 md:mt-24">
            <ProcessTimeline tone="dark" />
          </div>
        </div>
      </section>

      <section className="section-y bg-white">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:items-center">
          <Reveal y={40} className="relative aspect-[4/3] overflow-hidden rounded-xl lg:col-span-5 lg:aspect-[4/5]">
            <img src="/images/port-dawn.jpg" alt="Port cranes and a docked container ship at dawn" className="absolute inset-0 size-full object-cover" loading="lazy" decoding="async" />
          </Reveal>
          <div className="lg:col-span-6 lg:col-start-7">
            <Eyebrow>Integrated approach</Eyebrow>
            <h2 className="text-h2 mt-3">Door to door, without the gaps.</h2>
            <Reveal delay={0.1}>
              <p className="text-lead mt-8 text-ink">
                A typical export might start with road pickup, move through customs, sail as ocean freight and finish with storage and
                delivery at destination.
              </p>
              <p className="mt-5 text-muted">
                Instead of you coordinating separate providers, we plan the full journey together — choosing routes and carriers that balance
                cost with reliability, and keeping you informed at each handover.
              </p>
              {/* Two bordered cells, styled like the homepage "Reach" grid */}
              <dl className="mt-10 grid grid-cols-2 border-l border-t border-line">
                {[
                  ["01", "Point of contact for the whole shipment"],
                  ["30+", "Years of founder experience"],
                ].map(([k, v]) => (
                  <div key={k} className="flex min-h-[170px] flex-col justify-between gap-8 border-b border-r border-line bg-white p-6 md:p-8">
                    <dt className={`font-display text-[3.5rem] font-bold leading-none tracking-[-0.04em] tabular-nums ${k === "30+" ? "text-navy" : "text-blue"}`}>
                      {k === "30+" ? <CountUp value={30} suffix="+" /> : k}
                    </dt>
                    <dd className="max-w-xs font-display text-xl leading-snug text-ink">{v}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>
      </section>

      <CtaBand title={["Not sure which", "service you need?"]} text="Tell us about your cargo and destination. We'll recommend the most practical combination of services." />
    </>
  );
}
