import type { Metadata } from "next";
import {
  Anchor,
  Award,
  Headset,
  Coins,
  UserCheck,
  ClipboardCheck,
  Eye,
  Gauge,
  HeartHandshake,
  Hourglass,
  Lightbulb,
  Rocket,
  ShieldCheck,
  Target,
  Telescope,
  UserRound,
  type LucideIcon,
} from "lucide-react";
import { Button, Eyebrow } from "@/components/ui/primitives";
import { CountUp, LineReveal, Reveal, ScrubWords } from "@/components/ui/Reveal";
import { ParallaxImage } from "@/components/ui/ParallaxImage";
import { CtaBand, SectionHeading } from "@/components/sections/common";
import { coreValues, differentiators, site } from "@/data/site";
import { srcSetFor } from "@/lib/images";

export const metadata: Metadata = {
  title: "About Us — New Company, Established Experience",
  description:
    "Founded in 2025, Nexpedite Freight is a Pakistan-based freight forwarder led by a founder with more than 30 years of hands-on industry experience.",
  alternates: { canonical: "/about" },
};

// Icon and hover photo for each "Why choose" card, in the order of site.ts differentiators.
const differenceCards: { icon: LucideIcon; image: string }[] = [
  { icon: Award, image: "/images/port-dawn.jpg" },
  { icon: UserCheck, image: "/images/office-port.jpg" },
  { icon: Coins, image: "/images/containers-abstract.jpg" },
  { icon: Headset, image: "/images/customs-clearance.jpg" },
];

// Icons for the six core values, in the order they appear in site.ts.
const valueIcons: LucideIcon[] = [ShieldCheck, Anchor, HeartHandshake, Eye, Gauge, ClipboardCheck];

const story: { n: string; icon: LucideIcon; anim: string; title: string; text: string }[] = [
  { n: "01", icon: Hourglass, anim: "icon-anim-hourglass", title: "Decades in the field", text: "Our founder spent 30+ years working across the freight forwarding industry, learning it from the ground up." },
  { n: "02", icon: Lightbulb, anim: "icon-anim-bulb", title: "A clear idea", text: "That experience shaped a clear vision: a freight forwarder that treats every client's cargo like its own." },
  { n: "03", icon: Rocket, anim: "icon-anim-rocket", title: "Nexpedite Freight is born", text: "In 2025, Nexpedite Freight was established to put that vision into practice." },
];

export default function AboutPage() {
  return (
    <>
      {/* 01 — Editorial hero */}
      <section className="bg-white pt-28 md:pt-36">
        <div className="container-x">
          <Eyebrow>About Nexpedite Freight</Eyebrow>
          <h1 className="mt-3 font-display text-[clamp(2.5rem,6.6vw,6.25rem)] font-semibold leading-[0.92] tracking-[-0.045em] text-ink">
            <LineReveal hero lines={["New company.", "Established experience."]} />
          </h1>
        </div>
        <div className="container-x mt-14 grid gap-5 md:mt-20 md:grid-cols-12">
          <Reveal hero y={40} className="relative aspect-[4/3] overflow-hidden rounded-xl md:col-span-8 md:aspect-auto md:min-h-[520px]">
            <img src="/images/port-dawn.jpg" srcSet={srcSetFor("/images/port-dawn.jpg")} sizes="(max-width: 767px) 100vw, 66vw" alt="Gantry cranes and a container ship at a port at dawn" className="absolute inset-0 size-full object-cover" fetchPriority="high" decoding="async" />
          </Reveal>
          <Reveal hero y={40} delay={0.1} className="flex flex-col justify-between gap-10 rounded-xl bg-navy p-8 text-white md:col-span-4 md:p-10">
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
        <div className="container-x">
          <Eyebrow>Who we are</Eyebrow>
          {/* The statement sits under its label and runs the full content width */}
          <Reveal className="mt-3">
            <p className="font-display text-[clamp(1.75rem,3.4vw,3rem)] font-medium leading-[1.2] tracking-[-0.025em] text-ink">
              Nexpedite Freight is a freight forwarding company offering ocean, air and road freight, customs clearance, warehousing and
              project cargo solutions.
            </p>
            <div className="mt-10 grid gap-6 text-muted md:grid-cols-2 md:gap-10">
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
          {/* Wide photo under the intro: same width as the homepage Reach video, a little taller */}
          <ParallaxImage
            src="/images/about-office.jpg"
            alt="Freight documents being reviewed at a desk overlooking a container port at sunset"
            className="mt-14 aspect-[4/3] rounded-xl md:mt-20 md:aspect-[2/1]"
            amount={10}
          />
        </div>
      </section>

      {/* 03 — Story */}
      <section className="section-y bg-off">
        <div className="container-x">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <SectionHeading eyebrow="Our story" title={["Built on experience,", "started fresh."]} />
            <Reveal delay={0.15} className="shrink-0">
              <Button href="/get-a-quote">Get a Quotation</Button>
            </Reveal>
          </div>
          <ol className="mt-16 grid gap-px overflow-hidden rounded-xl border border-line bg-line md:grid-cols-3">
            {story.map((s, i) => (
              <Reveal as="li" key={s.n} delay={i * 0.1} className="flex min-h-[300px] flex-col gap-10 bg-white p-8 md:p-10">
                <span className="flex size-12 items-center justify-center rounded-full border border-line text-blue">
                  <s.icon aria-hidden className={`size-[22px] ${s.anim}`} strokeWidth={1.5} />
                </span>
                <div>
                  <h3 className="text-h3">{s.title}</h3>
                  <p className="mt-3 text-muted">
                    {/* "30+" is picked out in bold brand blue wherever it appears */}
                    {s.text.split(/(30\+)/).map((part, j) =>
                      part === "30+" ? (
                        <strong key={j} className="font-semibold text-blue">
                          {part}
                        </strong>
                      ) : (
                        part
                      ),
                    )}
                  </p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* 04 — Founder */}
      <section className="bg-noise section-y bg-navy text-white">
        <div className="container-x grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <Eyebrow tone="cyan">A message from our founder</Eyebrow>
            <Reveal delay={0.1} className="mt-10 hidden lg:block">
              <p className="font-display text-[clamp(5rem,9vw,8rem)] font-semibold leading-none tracking-[-0.05em] text-cyan tabular-nums">
                <CountUp value={30} suffix="+" />
              </p>
              <p className="mt-3 text-[0.9375rem] text-white/70">Years of industry experience, applied directly to every client relationship, quotation and shipment.</p>
            </Reveal>
          </div>
          <figure className="lg:col-span-8 lg:col-start-5">
            <svg aria-hidden viewBox="0 0 32 24" className="h-7 w-auto text-cyan" fill="currentColor">
              <path d="M0 24V14.4C0 6.5 4.3 1.7 11.6 0l1.6 3.6C9 5 6.9 7.7 6.6 11.2H12V24H0Zm19 0V14.4C19 6.5 23.3 1.7 30.6 0l1.6 3.6C28 5 25.9 7.7 25.6 11.2H31V24H19Z" />
            </svg>
            <Reveal>
              <blockquote className="mt-4">
                {/* Words light up as the quote scrolls through view, like the homepage statement */}
                <ScrubWords
                  className="font-display text-[clamp(1.5rem,2.8vw,2.5rem)] font-medium leading-[1.3] tracking-[-0.02em]"
                  text="I have spent more than thirty years in the freight forwarding industry, and Nexpedite Freight is where I bring that experience together into a company built the right way from day one. We are new as a company, but not new to logistics. Every shipment we handle gets the same care, judgment and attention I would give my own cargo."
                />
              </blockquote>
            </Reveal>
            <figcaption className="mt-10 flex items-center gap-4 border-t border-white/15 pt-6">
              {/* No founder photo has been supplied, so a neutral person icon stands in */}
              <span className="icon-glass relative flex size-16 shrink-0 items-center justify-center rounded-full border text-white">
                <UserRound aria-hidden className="size-7" strokeWidth={1.5} />
              </span>
              <span>
                <span className="block font-display text-lg font-semibold">Founder</span>
                <span className="text-white/60">Nexpedite Freight</span>
              </span>
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
                icon: Target,
                v: "To deliver reliable, cost-effective freight forwarding solutions that move our clients' cargo safely and on time — backed by direct, hands-on attention at every step.",
              },
              {
                k: "Our vision",
                icon: Telescope,
                v: "To grow into a trusted freight forwarding partner known across Pakistan and its trading partners for integrity, reliability and genuinely personal service.",
              },
            ].map((x, i) => (
              <Reveal
                key={x.k}
                delay={i * 0.1}
                className="noise-hover group rounded-[1.75rem] border border-blue/15 bg-blue/[0.06] px-6 py-8 transition-colors duration-500 hover:border-navy hover:bg-navy md:px-8 md:py-12"
              >
                {/* Light brand tint at rest; on hover the card turns navy and the text flips to white */}
                <div className="flex items-center gap-3">
                  <span className="icon-glass-hover flex size-14 shrink-0 items-center justify-center rounded-full border border-blue/20 bg-white text-blue">
                    <x.icon aria-hidden className="size-6" strokeWidth={1.5} />
                  </span>
                  <p className="eyebrow text-[1.375rem] tracking-[0.01em] text-blue transition-colors duration-500 group-hover:text-cyan">{x.k}</p>
                </div>
                <p className="mt-8 font-display text-[clamp(1.25rem,2vw,1.75rem)] font-medium leading-snug tracking-[-0.015em] text-ink transition-colors duration-500 group-hover:text-white">
                  {x.v}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 06 — Values */}
      <section className="section-y bg-off">
        <div className="container-x">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <SectionHeading eyebrow="What we stand for" title={["Six values behind", "every shipment."]} />
            <Reveal delay={0.15} className="shrink-0">
              <Button href="/contact">Talk to Our Team</Button>
            </Reveal>
          </div>
          <ul className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {coreValues.map((v, i) => (
              <Reveal as="li" key={v.title} delay={(i % 3) * 0.08} className="rounded-[1.75rem] bg-white p-8 shadow-[0_1px_2px_rgba(12,32,65,0.04),0_12px_32px_-16px_rgba(12,32,65,0.14)] md:p-9">
                {/* Large outline icon at left; the step number sits faded at right */}
                {(() => {
                  const Icon = valueIcons[i];
                  return (
                    <div className="flex items-start justify-between gap-4">
                      <Icon aria-hidden className="size-11 text-blue" strokeWidth={1.25} />
                      <span aria-hidden className="font-display text-5xl font-semibold leading-none tracking-[-0.04em] text-black/10 tabular-nums">
                        0{i + 1}
                      </span>
                    </div>
                  );
                })()}
                <h3 className="text-h3 mt-6">{v.title}</h3>
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
              <Reveal
                as="li"
                key={d.title}
                delay={i * 0.06}
                className={`group relative overflow-hidden p-8 ${i === 1 || i === 2 ? "bg-gray-100" : "bg-white"}`}
              >
                {/* Hover: a photo fades in under a navy wash, text turns white, icon turns to glass */}
                <span
                  aria-hidden
                  className="absolute inset-0 overflow-hidden opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                >
                  <img
                    src={differenceCards[i].image}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 size-full scale-110 object-cover transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-100"
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-navy-deep/95 via-navy/75 to-navy/45" />
                </span>
                <div className="relative">
                  {(() => {
                    const Icon = differenceCards[i].icon;
                    return (
                      <span className="icon-glass-hover flex size-12 items-center justify-center rounded-full border border-line bg-white text-blue">
                        <Icon aria-hidden className="size-[22px]" strokeWidth={1.5} />
                      </span>
                    );
                  })()}
                  <h3 className="mt-8 font-display text-xl font-semibold transition-colors duration-500 group-hover:text-white">{d.title}</h3>
                  <p className="mt-3 text-[0.9375rem] text-muted transition-colors duration-500 group-hover:text-white/75">{d.text}</p>
                </div>
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
            <h2 className="text-h2 mt-3">
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
                    <span aria-hidden className="mt-[0.6em] size-1.5 shrink-0 rounded-full bg-cyan" />
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
