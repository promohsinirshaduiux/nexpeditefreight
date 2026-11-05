import Link from "next/link";
import { ArrowUpRight, Flag } from "lucide-react";
import { Button, Eyebrow, TextLink } from "@/components/ui/primitives";
import { CountUp, LineReveal, Marquee, Reveal, ScrubWords, SplitChars } from "@/components/ui/Reveal";
import { ParallaxImage } from "@/components/ui/ParallaxImage";
import { LoopVideo } from "@/components/ui/LoopVideo";
import { IndustryIcon } from "@/components/ui/IndustryIcon";
import { CtaBand, SectionHeading } from "@/components/sections/common";
import { ServicesGallery } from "@/components/sections/ServicesGallery";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";
import { industries } from "@/data/industries";
import { differentiators, site } from "@/data/site";

export default function HomePage() {
  return (
    <>
      {/* 01 — Hero */}
      <section className="relative bg-white px-3 pt-[72px] md:px-5 md:pt-20">
        <div className="relative isolate flex min-h-[calc(100svh-84px)] flex-col overflow-hidden rounded-2xl bg-navy text-white md:min-h-[max(680px,calc(100svh-100px))]">
          <div data-hero-media className="absolute inset-0 -z-10 origin-bottom">
            {/* Phones get a light portrait crop; larger screens pick 1280 or 2200 wide. */}
            <picture>
              <source media="(max-width: 767px)" srcSet="/images/hero-port-mobile.jpg" />
              <img
                src="/images/hero-port.jpg"
                srcSet="/images/hero-port-1280.jpg 1280w, /images/hero-port.jpg 2200w"
                sizes="100vw"
                alt="Container ship leaving a commercial port at blue hour"
                className="absolute inset-0 size-full hero-zoom object-cover object-[70%_center] max-md:object-center"
                fetchPriority="high"
                decoding="async"
              />
            </picture>
          </div>
          <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-navy-deep/90 via-transparent to-navy-deep/40" />
          <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-navy-deep/70 via-transparent to-transparent" />

          <div data-hero-fade className="container-x flex flex-1 flex-col justify-between gap-16 pt-16 pb-10 md:pt-24 md:pb-16">
            <div>
              <Reveal hero y={16} delay={0.1}>
                <p className="eyebrow flex flex-wrap items-center gap-x-2 gap-y-1 text-white">
                  {["Your Cargo", "Our Commitment", "Delivered"].map((part, i) => (
                    <span key={part} className="flex items-center gap-x-2">
                      {i > 0 && <span aria-hidden className="size-1 rounded-full bg-white" />}
                      {part}
                      <span className="sr-only">.</span>
                    </span>
                  ))}
                </p>
              </Reveal>
              <h1 className="mt-3 max-w-5xl font-display text-[clamp(3rem,8vw,6.75rem)] font-semibold leading-[1.02] tracking-[-0.04em]">
                <SplitChars hero lines={["Your freight,", "our commitment."]} delay={0.15} />
              </h1>
            </div>
            <div className="grid gap-8 border-t border-white/20 pt-8 md:grid-cols-12 md:items-end">
              <Reveal hero delay={0.7} className="md:col-span-6">
                <p className="text-lead max-w-xl text-white/80">
                  Backed by more than 30 years of industry experience, Nexpedite Freight brings reliable logistics solutions and direct
                  attention to every shipment.
                </p>
              </Reveal>
              <Reveal hero delay={0.85} className="flex flex-wrap gap-3 md:col-span-6 md:justify-end">
                <Button href="/get-a-quote" variant="light">
                  Get a Quotation
                </Button>
                <Button href="/services" variant="sky">
                  Explore Our Services
                </Button>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* 02 — Trust strip */}
      <section aria-label="Company at a glance" className="bg-white">
        <div className="container-x">
          <dl className="grid divide-y divide-line md:grid-cols-3 md:divide-x md:divide-y-0">
            {[
              { k: <CountUp value={30} suffix="+" />, unit: "Years", v: "Industry experience behind our leadership" },
              { k: <CountUp value={6} />, unit: "Core services", v: "Ocean, air, road, customs, warehousing & project cargo" },
              { k: "1:1", unit: "Attention", v: "Personal client attention on every shipment" },
            ].map((f, i) => (
              <Reveal key={f.unit} delay={i * 0.1} className="py-10 md:px-10 md:py-14 md:first:pl-0 md:last:pr-0">
                <dt className="flex items-baseline gap-3">
                  <span className="font-display text-[clamp(3rem,5vw,4.5rem)] font-semibold leading-none tracking-[-0.04em] text-navy tabular-nums">{f.k}</span>
                  <span className="font-display text-lg font-semibold text-blue">{f.unit}</span>
                </dt>
                <dd className="mt-3 max-w-[18rem] text-[0.9375rem] text-muted">{f.v}</dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </section>

      {/* Marquee */}
      <section aria-label="Our services" className="border-y border-line bg-white py-4 md:py-5">
        <Marquee
          className="font-display text-[clamp(0.9375rem,1.25vw,1.125rem)] font-medium leading-[1.3] tracking-normal text-navy"
          repeat={3}
          speed={55}
          items={["Ocean Freight", "Air Freight", "Road Transportation", "Customs Clearance", "Warehousing & Distribution", "Project Cargo"]}
        />
      </section>

      {/* 03 — Introduction */}
      <section className="section-y bg-white">
        <div className="container-x grid gap-14 lg:grid-cols-12 lg:items-center">
          <div className="relative lg:col-span-6">
            <ParallaxImage
              src="/images/terminal-aerial.jpg"
              alt="Aerial view of an organised container terminal yard"
              className="aspect-[4/5] rounded-xl"
            />
            <Reveal delay={0.5} className="glass-light absolute -bottom-6 right-4 max-w-[19rem] rounded-[1.25rem] p-4 md:-right-8 md:p-5">
              <div className="flex items-center gap-4">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-full border border-white/80 bg-white/50 text-blue shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]">
                  <Flag aria-hidden className="size-[18px]" strokeWidth={1.6} />
                </span>
                <div>
                  <p className="font-display text-sm font-semibold text-blue">Founded {site.founded}</p>
                  <p className="mt-0.5 text-[0.9375rem] leading-snug text-ink">New company. Established experience.</p>
                </div>
              </div>
            </Reveal>
          </div>
          <div className="lg:col-span-6 lg:col-start-7 lg:pl-6">
            <Eyebrow>About Nexpedite</Eyebrow>
            <h2 className="text-h2 mt-3 lg:whitespace-nowrap">
              <LineReveal lines={["Built on experience.", "Driven by", "commitment."]} />
            </h2>
            <Reveal delay={0.15}>
              <p className="text-lead mt-8 text-ink">
                Nexpedite Freight is a Pakistan-based freight forwarding company offering ocean, air and road freight, customs clearance,
                warehousing and project cargo solutions.
              </p>
              <p className="mt-5 text-muted">
                The company itself is newly established, but it is built on more than three decades of hands-on experience in freight
                forwarding, brought directly by its founder — modern, responsive service without sacrificing the judgment only experience
                provides.
              </p>
              <div className="mt-10">
                <TextLink href="/about" className="text-blue">
                  More about us
                </TextLink>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Statement — words light up on scroll */}
      <section className="bg-off">
        <div className="container-x section-y">
          <Eyebrow>Our approach</Eyebrow>
          <ScrubWords
            className="mt-4 max-w-6xl font-display text-[clamp(1.875rem,4.4vw,4rem)] font-semibold leading-[1.12] tracking-[-0.03em] text-navy"
            text="New as a company, not new to logistics. Every quotation, routing decision and customs clearance is guided by three decades of real judgment — applied directly to your cargo, as if it were our own."
          />
        </div>
      </section>

      {/* 04 — Services (pinned horizontal gallery) */}
      <ServicesGallery />

      {/* 05 — Why Nexpedite */}
      <section className="section-y bg-white">
        <div className="container-x grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <Eyebrow>Why Nexpedite Freight</Eyebrow>
              <h2 className="text-h2 mt-3 lg:whitespace-nowrap">
                <LineReveal lines={["Experience that", "makes the", "difference."]} />
              </h2>
              <Reveal delay={0.15}>
                <p className="mt-6 text-muted">
                  We are a young company by name, but our approach is anything but untested — decisions are made by people with decades in
                  the industry, without layers of bureaucracy in between.
                </p>
              </Reveal>
            </div>
          </div>
          <ol className="border-t border-line lg:col-span-6 lg:col-start-7">
            {differentiators.map((d, i) => (
              <Reveal as="li" key={d.title} delay={i * 0.05} className="group grid gap-4 border-b border-line py-10 md:grid-cols-[7rem_1fr] md:py-14">
                <span className="font-display text-[clamp(3rem,5vw,4.5rem)] font-semibold leading-none tracking-[-0.05em] text-transparent transition-colors duration-500 [-webkit-text-stroke:1px_var(--color-blue)] group-hover:text-blue">
                  0{i + 1}
                </span>
                <div>
                  <h3 className="text-h3 text-ink transition-transform duration-500 group-hover:translate-x-2">{d.title}</h3>
                  <p className="mt-3 max-w-lg text-muted">{d.text}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* 06 — Industries */}
      <section className="section-y bg-off">
        <div className="container-x">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <SectionHeading
                eyebrow="Industries we serve"
                title={["Sectors that", "keep Pakistan", "trading."]}
                intro="We support exporters and importers across the sectors below — and we're happy to discuss the freight needs of yours."
              />
              <Reveal delay={0.2} className="mt-10">
                <Button href="/industries" variant="outline">
                  Explore Industries
                </Button>
              </Reveal>
              <ParallaxImage
                src="/images/textile.jpg"
                alt="Export-ready textile bales stacked on pallets"
                className="mt-14 hidden aspect-[4/3] rounded-xl lg:block"
                delay={0.1}
              />
            </div>
            <ul className="grid grid-cols-2 self-end border-l border-t border-line bg-white lg:col-span-6 lg:col-start-7">
              {industries.map((ind, i) => (
                <Reveal as="li" key={ind.slug} delay={(i % 2) * 0.08 + Math.floor(i / 2) * 0.06} className="border-b border-r border-line">
                  <Link
                    href={`/industries#${ind.slug}`}
                    className="group relative flex h-full min-h-[150px] flex-col justify-between overflow-hidden p-5 md:min-h-[190px] md:p-7"
                  >
                    {/* Hover: the industry photo fades in under a navy wash so the text stays readable */}
                    <span
                      aria-hidden
                      className="absolute inset-0 overflow-hidden opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100"
                    >
                      <img
                        src={ind.image}
                        alt=""
                        loading="lazy"
                        decoding="async"
                        className="absolute inset-0 size-full scale-110 object-cover transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-100"
                      />
                      <span className="absolute inset-0 bg-gradient-to-t from-navy-deep/95 via-navy/75 to-navy/45" />
                    </span>
                    <span className="relative flex items-start justify-between">
                      {/* On hover the icon sits on frosted glass: blur, translucent fill, light rim and top highlight */}
                      <span className="flex size-12 items-center justify-center rounded-full border border-line text-blue transition-[background-color,border-color,color,box-shadow] duration-500 group-hover:border-white/35 group-hover:bg-white/15 group-hover:text-white group-hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.45),0_8px_24px_-8px_rgba(8,22,49,0.6)] group-hover:backdrop-blur-md group-hover:backdrop-saturate-150">
                        <IndustryIcon slug={ind.slug} className="size-[22px]" />
                      </span>
                      <ArrowUpRight
                        aria-hidden
                        className="size-4 -translate-x-2 text-white opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100"
                      />
                    </span>
                    <span className="relative">
                      <span className="block font-display text-xl font-semibold tracking-tight text-ink transition-colors group-hover:text-white md:text-2xl">{ind.name}</span>
                      <span className="mt-3 flex flex-wrap gap-1.5">
                        {ind.modes.map((m) => (
                          <span
                            key={m}
                            className="rounded-full border border-line px-2.5 py-0.5 text-[0.75rem] leading-5 text-muted transition-colors duration-500 group-hover:border-white/30 group-hover:bg-white/10 group-hover:text-white group-hover:backdrop-blur-sm"
                          >
                            {m}
                          </span>
                        ))}
                      </span>
                    </span>
                  </Link>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 07 — How we work */}
      <section className="bg-noise section-y bg-navy text-white">
        <div className="container-x">
          <SectionHeading
            tone="dark"
            align="split"
            eyebrow="How we work"
            title={["Six clear stages,", "one point of contact."]}
            intro="From your first message to final delivery, you always know what happens next — and who is handling it."
          />
          <div className="mt-16 md:mt-24">
            <ProcessTimeline />
          </div>
        </div>
      </section>

      {/* 08 — Global reach */}
      <section className="section-y bg-white">
        <div className="container-x">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <Eyebrow>Reach</Eyebrow>
              <h2 className="text-h2 mt-3">
                <LineReveal lines={["Global reach,", "local attention."]} />
              </h2>
            </div>
            <Reveal delay={0.15} className="lg:col-span-5">
              <p className="text-muted">
                Freight forwarding depends on trusted relationships at every stage of a shipment&apos;s journey. Our founder&apos;s decades in
                the industry bring established relationships with carriers, agents and partners across major trade routes — a network
                Nexpedite Freight is actively building on as it grows.
              </p>
            </Reveal>
          </div>
          <div className="relative mt-14 md:mt-20">
            <LoopVideo
              src="/videos/ocean-reach.mp4"
              poster="/images/ocean-aerial-1280.jpg"
              label="Aerial footage of a container ship crossing open ocean"
              className="aspect-[4/3] rounded-xl md:aspect-[21/9]"
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 rounded-b-xl bg-gradient-to-t from-navy-deep/85 to-transparent p-6 pt-24 md:p-10 md:pt-40">
              <Reveal delay={0.4}>
                <p className="max-w-xl font-display text-xl font-semibold leading-snug text-white md:text-2xl">
                  Every shipment, wherever it travels, is managed personally by our team in Pakistan.
                </p>
              </Reveal>
            </div>
          </div>
          {/* Three bordered cells, styled like the industry tiles */}
          <ul className="mt-12 grid border-l border-t border-line md:grid-cols-3">
            {["Carrier and agent relationships built over decades", "Coordination across major international trade lanes", "Reliable routing for ocean, air and road shipments"].map(
              (t, i) => (
                <Reveal as="li" key={t} delay={i * 0.08} className="flex min-h-[170px] flex-col justify-between gap-8 border-b border-r border-line bg-white p-6 md:min-h-[200px] md:p-8">
                  <span aria-hidden className="font-display text-[3.5rem] font-bold leading-none tracking-[-0.04em] text-navy/10 tabular-nums">
                    0{i + 1}
                  </span>
                  <span className="max-w-xs font-display text-xl leading-snug text-ink">{t}</span>
                </Reveal>
              ),
            )}
          </ul>
        </div>
      </section>

      {/* 09 — Final CTA */}
      <CtaBand />
    </>
  );
}
