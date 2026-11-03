import type { Metadata } from "next";
import { Eyebrow } from "@/components/ui/primitives";
import { LineReveal, Reveal } from "@/components/ui/Reveal";
import { Breadcrumbs, CtaBand, SectionHeading } from "@/components/sections/common";
import { coreValues, differentiators, site } from "@/data/site";

export const metadata: Metadata = {
  title: "About Us — New Company, Established Experience",
  description:
    "Founded in 2025, Nexpedite Freight is a Pakistan-based freight forwarder led by a founder with more than 30 years of hands-on industry experience.",
  alternates: { canonical: "/about" },
};

const story = [
  { n: "01", title: "Decades in the field", text: "Our founder spent 30+ years working across the freight forwarding industry, learning it from the ground up." },
  { n: "02", title: "A clear idea", text: "That experience shaped a clear vision: a freight forwarder that treats every client's cargo like its own." },
  { n: "03", title: "Nexpedite Freight is born", text: "In 2025, Nexpedite Freight was established to put that vision into practice." },
];

export default function AboutPage() {
  return (
    <>
      {/* 01 — Editorial hero */}
      <section className="bg-white pt-28 md:pt-36">
        <div className="container-x">
          <Breadcrumbs items={[{ label: "About Us" }]} />
          <Eyebrow className="mt-12">About Nexpedite Freight</Eyebrow>
          <h1 className="mt-6 font-display text-[clamp(3rem,8.4vw,7.5rem)] font-semibold leading-[0.92] tracking-[-0.045em] text-ink">
            <LineReveal lines={["New company.", "Established", "experience."]} />
          </h1>
        </div>
        <div className="container-x mt-14 grid gap-5 md:mt-20 md:grid-cols-12">
          <Reveal y={40} className="relative aspect-[4/3] overflow-hidden rounded-xl md:col-span-8 md:aspect-auto md:min-h-[520px]">
            <img src="/images/port-dawn.jpg" alt="Gantry cranes and a container ship at a port at dawn" className="absolute inset-0 size-full object-cover" fetchPriority="high" decoding="async" />
          </Reveal>
          <Reveal y={40} delay={0.1} className="flex flex-col justify-between gap-10 rounded-xl bg-navy p-8 text-white md:col-span-4 md:p-10">
            <p className="eyebrow text-cyan">Quick facts</p>
            <dl className="space-y-6">
              {[
                ["30+ years", "Industry experience behind our leadership"],
                [`Founded ${site.founded}`, "Newly established in Pakistan"],
                ["6 core services", "Ocean, air, road, customs, warehousing, project cargo"],
                ["Direct attention", "A small, dedicated team on every shipment"],
              ].map(([k, v]) => (
                <div key={k} className="border-t border-white/15 pt-4">
                  <dt className="font-display text-xl font-semibold">{k}</dt>
                  <dd className="mt-1 text-[0.9375rem] text-white/70">{v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      {/* 02 — Who we are */}
      <section className="section-y bg-white">
        <div className="container-x grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Eyebrow>Who we are</Eyebrow>
          </div>
          <Reveal className="lg:col-span-8">
            <p className="font-display text-[clamp(1.5rem,2.6vw,2.375rem)] font-medium leading-[1.25] tracking-[-0.02em] text-ink">
              Nexpedite Freight is a freight forwarding company offering ocean, air and road freight, customs clearance, warehousing and
              project cargo solutions.
            </p>
            <div className="mt-10 grid gap-6 text-muted md:grid-cols-2">
              <p>
                While the company itself is newly established, it is built on more than three decades of hands-on experience in the freight
                forwarding industry, brought directly by its founder.
              </p>
              <p>
                That combination — a fresh, agile company led by decades of industry know-how — means clients get modern, responsive service
                without sacrificing the judgment that only real experience provides.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 03 — Story */}
      <section className="section-y bg-off">
        <div className="container-x">
          <SectionHeading align="split" eyebrow="Our story" title={["Built on experience,", "started fresh."]} />
          <ol className="mt-16 grid gap-px overflow-hidden rounded-xl border border-line bg-line md:grid-cols-3">
            {story.map((s, i) => (
              <Reveal as="li" key={s.n} delay={i * 0.1} className="flex min-h-[300px] flex-col justify-between bg-white p-8 md:p-10">
                <span className="font-display text-[4rem] font-semibold leading-none tracking-[-0.05em] text-blue/15">{s.n}</span>
                <div>
                  <h3 className="text-h3">{s.title}</h3>
                  <p className="mt-3 text-muted">{s.text}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* 04 — Founder */}
      <section className="section-y bg-navy text-white">
        <div className="container-x grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <Eyebrow tone="cyan">A message from our founder</Eyebrow>
            <Reveal delay={0.1} className="mt-10 hidden lg:block">
              <p className="font-display text-[5rem] font-semibold leading-none tracking-[-0.05em] text-cyan">30+</p>
              <p className="mt-3 text-[0.9375rem] text-white/70">Years of industry experience, applied directly to every client relationship, quotation and shipment.</p>
            </Reveal>
          </div>
          <figure className="lg:col-span-8 lg:col-start-5">
            <span aria-hidden className="block font-display text-[6rem] leading-[0.5] text-cyan">“</span>
            <Reveal>
              <blockquote className="mt-4 font-display text-[clamp(1.5rem,2.8vw,2.5rem)] font-medium leading-[1.3] tracking-[-0.02em]">
                I have spent more than thirty years in the freight forwarding industry, and Nexpedite Freight is where I bring that experience
                together into a company built the right way from day one. We are new as a company, but not new to logistics. Every shipment we
                handle gets the same care, judgment and attention I would give my own cargo.
              </blockquote>
            </Reveal>
            <figcaption className="mt-10 border-t border-white/15 pt-6">
              <span className="block font-display text-lg font-semibold">Founder</span>
              <span className="text-white/60">Nexpedite Freight</span>
            </figcaption>
          </figure>
        </div>
      </section>

      {/* 05 — Mission & vision */}
      <section className="section-y bg-white">
        <div className="container-x">
          <SectionHeading eyebrow="What drives us" title={["Mission & vision."]} />
          <div className="mt-14 grid gap-5 md:grid-cols-2">
            {[
              {
                k: "Our mission",
                v: "To deliver reliable, cost-effective freight forwarding solutions that move our clients' cargo safely and on time — backed by direct, hands-on attention at every step.",
              },
              {
                k: "Our vision",
                v: "To grow into a trusted freight forwarding partner known across Pakistan and its trading partners for integrity, reliability and genuinely personal service.",
              },
            ].map((x, i) => (
              <Reveal key={x.k} delay={i * 0.1} className="rounded-xl border border-line p-8 md:p-12">
                <p className="eyebrow text-blue">{x.k}</p>
                <p className="mt-8 font-display text-[clamp(1.25rem,2vw,1.75rem)] font-medium leading-snug tracking-[-0.015em] text-ink">{x.v}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 06 — Values */}
      <section className="section-y bg-off">
        <div className="container-x">
          <SectionHeading align="split" eyebrow="What we stand for" title={["Six values behind", "every shipment."]} />
          <ul className="mt-16 grid border-t border-line sm:grid-cols-2 lg:grid-cols-3">
            {coreValues.map((v, i) => (
              <Reveal as="li" key={v.title} delay={(i % 3) * 0.08} className="border-b border-line py-10 sm:pr-10">
                <span className="font-display text-sm font-semibold text-blue tabular-nums">0{i + 1}</span>
                <h3 className="text-h3 mt-4">{v.title}</h3>
                <p className="mt-3 text-muted">{v.text}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* 07 — Why choose */}
      <section className="section-y bg-white">
        <div className="container-x grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading eyebrow="Our difference" title={["Why choose", "Nexpedite Freight."]} />
          </div>
          <ol className="grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:col-span-8">
            {differentiators.map((d, i) => (
              <Reveal as="li" key={d.title} delay={i * 0.06} className="bg-white p-8">
                <span className="font-display text-sm font-semibold text-blue tabular-nums">0{i + 1}</span>
                <h3 className="mt-8 font-display text-xl font-semibold">{d.title}</h3>
                <p className="mt-3 text-[0.9375rem] text-muted">{d.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* 08 — Network */}
      <section className="relative isolate overflow-hidden bg-navy text-white">
        <img src="/images/terminal-aerial.jpg" alt="" className="absolute inset-0 size-full -z-10 object-cover opacity-50" loading="lazy" decoding="async" />
        <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-navy via-navy/80 to-navy/20" />
        <div className="container-x section-y grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <Eyebrow tone="cyan">Reach</Eyebrow>
            <h2 className="text-h2 mt-6">
              <LineReveal lines={["Building a global", "partner network."]} />
            </h2>
            <Reveal delay={0.15}>
              <p className="text-lead mt-8 text-white/80">
                Our founder&apos;s 30+ years in the industry bring established relationships with carriers, agents and partners across major
                trade routes — a network Nexpedite Freight is actively building on as it grows.
              </p>
              <ul className="mt-10 space-y-4 border-t border-white/15 pt-8">
                {["Carrier & agent relationships built over decades", "Coordination across major international trade lanes", "Reliable routing for ocean, air and road shipments"].map((t) => (
                  <li key={t} className="flex gap-4">
                    <span aria-hidden className="mt-3 h-px w-6 shrink-0 bg-cyan" />
                    {t}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      <div className="h-px bg-white" />
      <CtaBand title={["Let's talk about", "your next shipment."]} />
    </>
  );
}
