import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { ReactNode } from "react";
import { Button, Eyebrow, WhatsAppIcon } from "@/components/ui/primitives";
import { LineReveal, Reveal } from "@/components/ui/Reveal";
import { ParallaxImage } from "@/components/ui/ParallaxImage";
import { site, whatsappUrl } from "@/data/site";

export type Crumb = { label: string; href?: string };

export function Breadcrumbs({ items, tone = "light" }: { items: Crumb[]; tone?: "light" | "dark" }) {
  const all: Crumb[] = [{ label: "Home", href: "/" }, ...items];
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: all.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      ...(c.href ? { item: `${site.url}${c.href}` } : {}),
    })),
  };
  const base = tone === "dark" ? "text-white/70" : "text-muted";
  const current = tone === "dark" ? "text-white" : "text-ink";
  return (
    <nav aria-label="Breadcrumb" className="text-[0.8125rem]">
      <ol className={`flex flex-wrap items-center gap-1.5 ${base}`}>
        {all.map((c, i) => (
          <li key={c.label} className="flex items-center gap-1.5">
            {i > 0 && <ChevronRight aria-hidden className="size-3.5 opacity-60" />}
            {c.href && i < all.length - 1 ? (
              <Link href={c.href} className="link-underline hover:opacity-100">
                {c.label}
              </Link>
            ) : (
              <span aria-current="page" className={current}>
                {c.label}
              </span>
            )}
          </li>
        ))}
      </ol>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </nav>
  );
}

/** Editorial inner-page hero: large type over a cinematic image band. */
export function PageHero({
  eyebrow,
  title,
  intro,
  image,
  imageAlt,
  crumbs,
  children,
}: {
  eyebrow: string;
  title: string[];
  intro: string;
  image?: string;
  imageAlt?: string;
  crumbs: Crumb[];
  children?: ReactNode;
}) {
  return (
    <section className="relative bg-white pt-28 md:pt-36">
      <div className="container-x">
        <Breadcrumbs items={crumbs} />
        <div className="mt-10 grid gap-10 md:mt-14 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <Eyebrow>{eyebrow}</Eyebrow>
            <h1 className="text-display mt-6 text-ink">
              <LineReveal lines={title} />
            </h1>
          </div>
          <Reveal delay={0.2} className="lg:col-span-4 lg:pb-3">
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
            sizes="(min-width: 1280px) 1280px, 100vw"
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
  align = "left",
  tone = "light",
  className = "",
}: {
  eyebrow: string;
  title: string[];
  intro?: string;
  align?: "left" | "split";
  tone?: "light" | "dark";
  className?: string;
}) {
  const titleColor = tone === "dark" ? "text-white" : "text-ink";
  const introColor = tone === "dark" ? "text-white/70" : "text-muted";
  if (align === "split") {
    return (
      <div className={`grid gap-8 lg:grid-cols-12 lg:items-end ${className}`}>
        <div className="lg:col-span-7">
          <Eyebrow tone={tone === "dark" ? "cyan" : "blue"}>{eyebrow}</Eyebrow>
          <h2 className={`text-h2 mt-6 ${titleColor}`}>
            <LineReveal lines={title} />
          </h2>
        </div>
        {intro && (
          <Reveal delay={0.15} className="lg:col-span-4 lg:col-start-9">
            <p className={`text-lead ${introColor}`}>{intro}</p>
          </Reveal>
        )}
      </div>
    );
  }
  return (
    <div className={`max-w-3xl ${className}`}>
      <Eyebrow tone={tone === "dark" ? "cyan" : "blue"}>{eyebrow}</Eyebrow>
      <h2 className={`text-h2 mt-6 ${titleColor}`}>
        <LineReveal lines={title} />
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
        <Image src="/images/ocean-aerial.jpg" alt="" fill sizes="100vw" className="object-cover opacity-35" />
      </div>
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-navy via-navy/90 to-navy/40" />
      <div className="container-x section-y grid gap-10 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          <Eyebrow tone="cyan">Start a shipment</Eyebrow>
          <h2 className="text-h2 mt-6">
            <LineReveal lines={title} />
          </h2>
        </div>
        <Reveal delay={0.15} className="lg:col-span-5">
          <p className="text-lead text-white/75">{text}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href={primaryHref} variant="light">
              {primaryLabel}
            </Button>
            <Button href={whatsappUrl()} variant="ghost-light" external icon={<WhatsAppIcon className="size-4" />}>
              Talk on WhatsApp
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
