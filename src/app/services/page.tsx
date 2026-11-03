import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { Eyebrow } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/Reveal";
import { CtaBand, PageHero, SectionHeading } from "@/components/sections/common";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";
import { services } from "@/data/services";

export const metadata: Metadata = {
  title: "Freight Forwarding Services — Ocean, Air, Road, Customs & More",
  description:
    "Ocean freight, air freight, road transportation, customs clearance, warehousing and distribution, and project cargo from Pakistan — managed by one experienced team.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Services" }]}
        eyebrow="Our services"
        title={["Six services.", "One accountable team."]}
        intro="From a single LCL consignment to oversized project cargo, every service is planned around your shipment and managed by people with decades of freight forwarding experience."
        image="/images/containers-abstract.jpg"
        imageAlt="Close-up of stacked shipping container doors"
      />

      <section className="section-y bg-white">
        <div className="container-x">
          <SectionHeading
            align="split"
            eyebrow="Overview"
            title={["Choose a service,", "or combine them."]}
            intro="Most shipments use more than one service. We connect them — booking, documentation, clearance, storage and delivery — so nothing falls between providers."
          />
          <ul className="mt-16 grid gap-x-6 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <Reveal as="li" key={s.slug} delay={(i % 3) * 0.08}>
                <Link href={`/services/${s.slug}`} className="group block">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-xl">
                    <Image
                      src={s.image}
                      alt={s.imageAlt}
                      fill
                      sizes="(min-width: 1024px) 420px, (min-width: 768px) 50vw, 100vw"
                      className="object-cover transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-105"
                    />
                    <span className="absolute left-5 top-5 rounded-full bg-white/90 px-3 py-1 font-display text-xs font-semibold text-navy tabular-nums backdrop-blur">
                      {s.n}
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
          <SectionHeading eyebrow="Service highlights" title={["What each service covers."]} />
          <div className="mt-14 border-t border-line">
            {services.map((s) => (
              <Reveal key={s.slug} className="grid gap-6 border-b border-line py-10 lg:grid-cols-12">
                <div className="lg:col-span-4">
                  <span className="font-display text-sm font-semibold text-blue tabular-nums">{s.n}</span>
                  <h3 className="text-h3 mt-2">
                    <Link href={`/services/${s.slug}`} className="link-underline hover:text-blue">
                      {s.title}
                    </Link>
                  </h3>
                </div>
                <ul className="grid gap-x-8 gap-y-3 text-[0.9375rem] text-muted sm:grid-cols-2 lg:col-span-8">
                  {s.capabilities.map((c) => (
                    <li key={c.title} className="flex gap-3">
                      <span aria-hidden className="mt-2.5 h-px w-4 shrink-0 bg-blue" />
                      {c.title}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y bg-white">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:items-center">
          <Reveal y={40} className="relative aspect-[4/5] overflow-hidden rounded-xl lg:col-span-5">
            <Image src="/images/port-dawn.jpg" alt="Port cranes and a docked container ship at dawn" fill sizes="(min-width: 1024px) 520px, 100vw" className="object-cover" />
          </Reveal>
          <div className="lg:col-span-6 lg:col-start-7">
            <Eyebrow>Integrated approach</Eyebrow>
            <h2 className="text-h2 mt-6">Door to door, without the gaps.</h2>
            <Reveal delay={0.1}>
              <p className="text-lead mt-8 text-ink">
                A typical export might start with road pickup, move through customs, sail as ocean freight and finish with storage and
                delivery at destination.
              </p>
              <p className="mt-5 text-muted">
                Instead of you coordinating separate providers, we plan the full journey together — choosing routes and carriers that balance
                cost with reliability, and keeping you informed at each handover.
              </p>
              <dl className="mt-10 grid grid-cols-2 gap-6 border-t border-line pt-8">
                <div>
                  <dt className="font-display text-3xl font-semibold text-navy">1</dt>
                  <dd className="mt-1 text-[0.9375rem] text-muted">Point of contact for the whole shipment</dd>
                </div>
                <div>
                  <dt className="font-display text-3xl font-semibold text-navy">30+</dt>
                  <dd className="mt-1 text-[0.9375rem] text-muted">Years of founder experience behind each plan</dd>
                </div>
              </dl>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section-y border-t border-line bg-white">
        <div className="container-x">
          <SectionHeading align="split" eyebrow="Our process" title={["How a shipment", "moves with us."]} />
          <div className="mt-16 md:mt-24">
            <ProcessTimeline tone="light" />
          </div>
        </div>
      </section>

      <CtaBand title={["Not sure which", "service you need?"]} text="Tell us about your cargo and destination. We'll recommend the most practical combination of services." />
    </>
  );
}
