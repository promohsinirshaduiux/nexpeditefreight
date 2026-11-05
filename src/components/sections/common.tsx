import type { ReactNode } from "react";
import { Button, Eyebrow, WhatsAppLogo } from "@/components/ui/primitives";
import { LineReveal, Reveal } from "@/components/ui/Reveal";
import { ParallaxImage } from "@/components/ui/ParallaxImage";
import { whatsappUrl } from "@/data/site";

/** Editorial inner-page hero: large type over a cinematic image band. */
export function PageHero({
  eyebrow,
  title,
  intro,
  image,
  imageAlt,
  children,
  introWide,
}: {
  eyebrow: string;
  title: string[];
  intro: string;
  image?: string;
  imageAlt?: string;
  children?: ReactNode;
  /** Give the intro the right half of the row (shorter, wider lines) instead of the last third. */
  introWide?: boolean;
}) {
  return (
    <section className="relative bg-white pt-28 md:pt-36">
      <div className="container-x">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className={introWide ? "lg:col-span-6" : "lg:col-span-8"}>
            <Eyebrow>{eyebrow}</Eyebrow>
            <h1 className="text-display mt-3 text-ink">
              <LineReveal hero lines={title} />
            </h1>
          </div>
          <Reveal hero delay={0.2} className={`lg:pb-3 ${introWide ? "lg:col-span-6 lg:col-start-7" : "lg:col-span-4"}`}>
            <p className="text-lead text-muted">{intro}</p>
            {children && <div className="mt-8 flex flex-wrap gap-3">{children}</div>}
          </Reveal>
        </div>
      </div>
      {image && (
        <div className="container-x mt-14 md:mt-20">
          <ParallaxImage
            src={image}
            alt={imageAlt ?? ""}
            priority
            delay={0.3}
            amount={12}
            className="aspect-[16/9] rounded-xl md:aspect-[21/9]"
          />
        </div>
      )}
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  action,
  introWide,
  hero,
  align = "left",
  tone = "light",
  className = "",
}: {
  eyebrow: string;
  title: string[];
  intro?: string;
  /** Optional call to action shown under the intro (split layout). */
  action?: ReactNode;
  /** Split layout: give the intro the right half of the row instead of the last third. */
  introWide?: boolean;
  /** Sits on or just below the first screen: animate in on load instead of waiting for scripts. */
  hero?: boolean;
  align?: "left" | "split";
  tone?: "light" | "dark";
  className?: string;
}) {
  const titleColor = tone === "dark" ? "text-white" : "text-ink";
  const introColor = tone === "dark" ? "text-white/70" : "text-muted";
  if (align === "split") {
    return (
      <div className={`grid gap-8 lg:grid-cols-12 lg:items-end ${className}`}>
        <div className={introWide ? "lg:col-span-6" : "lg:col-span-7"}>
          <Eyebrow tone={tone === "dark" ? "cyan" : "blue"}>{eyebrow}</Eyebrow>
          <h2 className={`text-h2 mt-3 ${titleColor}`}>
            <LineReveal hero={hero} lines={title} />
          </h2>
        </div>
        {(intro || action) && (
          <Reveal hero={hero} delay={0.15} className={`${introWide ? "lg:col-span-6 lg:col-start-7" : "lg:col-span-4 lg:col-start-9"} ${intro ? "" : "lg:justify-self-end"}`}>
            {intro && <p className={`text-lead ${introColor}`}>{intro}</p>}
            {action && <div className={intro ? "mt-6" : ""}>{action}</div>}
          </Reveal>
        )}
      </div>
    );
  }
  return (
    <div className={`max-w-3xl ${className}`}>
      <Eyebrow tone={tone === "dark" ? "cyan" : "blue"}>{eyebrow}</Eyebrow>
      <h2 className={`text-h2 mt-3 ${titleColor}`}>
        <LineReveal hero={hero} lines={title} />
      </h2>
      {intro && (
        <Reveal delay={0.15}>
          <p className={`text-lead mt-6 ${introColor}`}>{intro}</p>
        </Reveal>
      )}
    </div>
  );
}

/** Navy conversion band used at the end of most pages. */
export function CtaBand({
  title = ["Ready to move", "your cargo?"],
  text = "Tell us what you're shipping. We'll help you find a practical freight solution.",
  primaryLabel = "Get a Quotation",
  primaryHref = "/get-a-quote",
}: {
  title?: string[];
  text?: string;
  primaryLabel?: string;
  primaryHref?: string;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-navy text-white">
      <div className="absolute inset-x-0 -inset-y-[20%] -z-10" data-parallax="10">
        <img src="/images/ocean-aerial.jpg" alt="" className="absolute inset-0 size-full object-cover opacity-35" loading="lazy" decoding="async" />
      </div>
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-navy via-navy/90 to-navy/40" />
      <div className="container-x section-y grid gap-10 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          <Eyebrow tone="cyan">Start a shipment</Eyebrow>
          <h2 className="text-h2 mt-3">
            <LineReveal lines={title} />
          </h2>
        </div>
        <Reveal delay={0.15} className="lg:col-span-5">
          <p className="text-lead text-white/75">{text}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href={primaryHref} variant="light">
              {primaryLabel}
            </Button>
            <Button href={whatsappUrl()} variant="ghost-light" external icon={<WhatsAppLogo className="size-5" />}>
              Talk on WhatsApp
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
