import Link from "next/link";
import { ArrowRight, ArrowUpRight, Phone } from "lucide-react";
import { Logo, WhatsAppLogo } from "@/components/ui/primitives";
import { ChannelIcon } from "@/components/ui/SocialIcon";
import { SplitChars } from "@/components/ui/Reveal";
import { mailtoUrl, resourceLinks, serviceLinks, site, telUrl, whatsappUrl } from "@/data/site";
import { PakistanClock } from "./FooterExtras";

const quick = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Industries", href: "/industries" },
  { label: "Get a Quote", href: "/get-a-quote" },
  { label: "Contact Us", href: "/contact" },
];

export function Footer() {
  const year = new Date().getFullYear();
  const socials = (["facebook", "instagram", "linkedin"] as const).filter((k) => site.social[k]);
  return (
    <footer className="overflow-hidden bg-off text-ink">
      <div className="container-x pt-14 md:pt-16">
        {/* 1 — Big contact line + quick actions */}
        <div className="flex flex-col gap-8 border-b border-line pb-10 md:pb-12 lg:flex-row lg:items-end lg:justify-between">
          <div className="min-w-0">
            <p className="eyebrow text-blue">Have a shipment in mind?</p>
            <a
              href={mailtoUrl}
              className="group mt-3 inline-flex max-w-full items-center gap-3 font-display text-[clamp(1.375rem,2.6vw,2.375rem)] font-semibold leading-[1.05] tracking-[-0.035em] text-navy transition-colors duration-300 hover:text-blue"
            >
              <span className="link-underline [overflow-wrap:anywhere] [background-size:0%_2px] hover:[background-size:100%_2px] group-hover:[background-size:100%_2px]">
                {site.contact.email}
              </span>
              <span className="flex size-[0.9em] shrink-0 items-center justify-center rounded-full bg-navy text-white transition-all duration-500 group-hover:rotate-[-45deg] group-hover:bg-blue">
                <ArrowRight aria-hidden className="size-[0.45em]" strokeWidth={1.75} />
              </span>
            </a>
          </div>
          <ul className="flex flex-wrap gap-3 lg:shrink-0 lg:flex-nowrap">
            <li>
              <a
                href={whatsappUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex min-h-12 items-center gap-2.5 rounded-full border border-line bg-white px-5 text-[0.9375rem] font-medium text-ink transition-colors duration-300 hover:border-whatsapp hover:bg-whatsapp hover:text-white"
              >
                <WhatsAppLogo invertOnHover className="size-5 transition-transform duration-300 group-hover:scale-110" />
                WhatsApp
              </a>
            </li>
            <li>
              <a
                href={telUrl}
                className="group inline-flex min-h-12 items-center gap-2.5 rounded-full border border-line bg-white px-5 text-[0.9375rem] font-medium text-ink transition-colors duration-300 hover:border-navy hover:bg-navy hover:text-white"
              >
                <Phone aria-hidden className="size-4 transition-transform duration-300 group-hover:rotate-12" strokeWidth={1.75} />
                {site.contact.phoneDisplay}
              </a>
            </li>
            <li>
              <Link
                href="/get-a-quote"
                className="group inline-flex min-h-12 items-center gap-2.5 rounded-full bg-blue px-5 text-[0.9375rem] font-medium text-white transition-colors duration-300 hover:bg-blue-dark"
              >
                Get a Quote
                <ArrowUpRight aria-hidden className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </li>
          </ul>
        </div>

        {/* 2 — Brand, live clock and link columns */}
        <div className="grid gap-14 py-12 md:py-16 lg:grid-cols-12">
          <div className="flex flex-col gap-8 lg:col-span-4">
            <Link href="/" aria-label="Nexpedite Freight home" className="inline-block w-fit">
              <Logo className="!w-[220px]" />
            </Link>
            <p className="max-w-sm text-[0.9375rem] text-muted">
              {site.tagline} Freight forwarding and logistics from Pakistan — a new company backed by more than 30 years of founder
              experience.
            </p>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
              <PakistanClock />
              <Link
                href="/contact"
                className="group inline-flex min-h-11 items-center gap-3 rounded-full border border-line bg-white py-1.5 pl-5 pr-1.5 text-[0.875rem] font-medium text-ink transition-colors duration-300 hover:border-navy hover:bg-navy hover:text-white"
              >
                Contact Us
                <span className="flex size-8 items-center justify-center rounded-full bg-navy text-white transition-colors duration-300 group-hover:bg-white group-hover:text-navy">
                  <ArrowUpRight aria-hidden className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
              </Link>
            </div>
            {socials.length > 0 && (
              <ul className="flex gap-2">
                {socials.map((k) => (
                  <li key={k}>
                    <a
                      href={site.social[k]!}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Nexpedite Freight on ${k[0].toUpperCase() + k.slice(1)}`}
                      className="inline-flex size-11 items-center justify-center rounded-full border border-line bg-white text-navy transition-colors hover:border-navy hover:bg-navy hover:text-white"
                    >
                      <ChannelIcon name={k} />
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="grid gap-10 sm:grid-cols-3 lg:col-span-7 lg:col-start-6">
            <FooterCol title="Company" links={quick} />
            <FooterCol title="Services" links={serviceLinks.map((l) => ({ label: l.label === "Services Overview" ? "All Services" : l.label, href: l.href }))} />
            <FooterCol title="Resources" links={resourceLinks} />
          </div>
        </div>
      </div>

      {/* 3 — Oversized wordmark: letters rise in on scroll, then light up in a wave on hover */}
      <div aria-hidden className="footer-word container-x select-none">
        <SplitChars
          lines={["Nexpedite"]}
          className="block whitespace-nowrap text-center font-display text-[clamp(3rem,17.5vw,16.5rem)] font-semibold leading-[0.82] tracking-[-0.05em]"
        />
      </div>

      {/* 4 — Bottom bar */}
      <div className="container-x">
        <div
          data-whatsapp-avoid
          className="flex flex-col gap-4 border-t border-line py-8 text-[0.8125rem] text-muted lg:flex-row lg:items-center lg:justify-between"
        >
          <p>
            © {year} {site.legalName}. All rights reserved.
          </p>
          <p className="lg:order-last">
            Designed &amp; Developed by{" "}
            <a href="https://www.endpointclients.com/" target="_blank" rel="noopener" className="link-underline font-medium text-ink hover:text-blue">
              Endpoint Clients
            </a>
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            <li>
              <Link href="/privacy-policy" className="link-underline hover:text-ink">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms-and-conditions" className="link-underline hover:text-ink">
                Terms &amp; Conditions
              </Link>
            </li>
            <li>
              <Link href="/faqs" className="link-underline hover:text-ink">
                FAQs
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

/** Link column: each link slides right on hover and reveals a small arrow. */
function FooterCol({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h2 className="eyebrow text-muted">{title}</h2>
      <ul className="mt-5 space-y-3 text-[0.9375rem]">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="group inline-flex items-center gap-1.5 text-ink transition-colors duration-300 hover:text-blue">
              <span className="transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover:translate-x-1">{l.label}</span>
              <ArrowUpRight
                aria-hidden
                className="size-3.5 -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100"
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
