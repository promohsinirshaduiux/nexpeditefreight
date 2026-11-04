import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Eyebrow } from "@/components/ui/primitives";
import { LineReveal, Reveal } from "@/components/ui/Reveal";
import { services } from "@/data/services";

/**
 * Pinned horizontal gallery of all six services. On desktop the section pins
 * and vertical scroll drives the track sideways; on touch screens it swipes.
 */
export function ServicesGallery() {
  return (
    <section data-hscroll className="relative overflow-hidden bg-navy text-white lg:h-screen">
      <div className="flex h-full flex-col justify-center py-20 lg:py-0">
        <div data-hscroll-track className="flex snap-x snap-mandatory items-stretch gap-5 overflow-x-auto px-5 pb-4 [scrollbar-width:none] md:px-10 lg:snap-none lg:gap-6 lg:overflow-visible lg:pb-0 lg:pl-[max(2.5rem,calc((100vw-1280px)/2))] lg:pr-[10vw]">
          <div className="flex w-[82vw] shrink-0 snap-start flex-col justify-between sm:w-[420px] lg:w-[460px] lg:pr-10">
            <div>
              <Eyebrow tone="cyan">What we do</Eyebrow>
              <h2 className="text-h2 mt-3">
                <LineReveal lines={["Logistics", "solutions for", "every journey."]} />
              </h2>
            </div>
            <Reveal delay={0.2} className="mt-10">
              <p className="text-lead text-white/70">
                Six core services, planned together and managed by the same team — so your cargo moves without gaps between providers.
              </p>
              <p className="mt-10 hidden text-sm text-white/50 lg:block">
                Scroll to explore
              </p>
            </Reveal>
          </div>
          {services.map((s) => (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              data-cursor="View"
              className="group relative isolate flex h-[64vh] min-h-[440px] w-[78vw] shrink-0 snap-start flex-col justify-end overflow-hidden rounded-xl p-7 sm:w-[400px] md:p-9 lg:h-[72vh] lg:w-[min(34vw,500px)]"
            >
              <img
                src={s.image}
                alt={s.imageAlt}
                className="absolute inset-0 size-full -z-10 object-cover transition-transform duration-[1.4s] ease-[var(--ease-out-expo)] group-hover:scale-[1.07]" loading="lazy" decoding="async" />
              <span aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-navy-deep via-navy-deep/40 to-transparent transition-opacity duration-700 group-hover:opacity-90" />
              <span className="absolute right-7 top-7 flex size-11 items-center justify-center rounded-full border border-white/40 transition-all duration-500 group-hover:rotate-45 group-hover:border-white group-hover:bg-white group-hover:text-navy md:right-9 md:top-9">
                <ArrowUpRight aria-hidden className="size-4" />
              </span>
              <h3 className="font-display text-[clamp(1.75rem,2.4vw,2.5rem)] font-semibold leading-tight tracking-tight">{s.title}</h3>
              <p className="mt-3 max-w-sm text-[0.9375rem] text-white/75">{s.short}</p>
              <span className="mt-6 grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 group-hover:grid-rows-[1fr]">
                <span className="overflow-hidden text-sm text-white/70">{s.capabilities.map((c) => c.title).join(" · ")}</span>
              </span>
            </Link>
          ))}
        </div>
        <div className="container-x mt-10 hidden lg:block">
          <div className="h-px w-full bg-white/15">
            <div data-hscroll-progress className="h-px origin-left bg-cyan" />
          </div>
        </div>
      </div>
    </section>
  );
}
