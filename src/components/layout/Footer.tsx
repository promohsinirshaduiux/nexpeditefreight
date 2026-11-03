import Link from "next/link";
import { Logo } from "@/components/ui/primitives";
import { ChannelIcon } from "@/components/ui/SocialIcon";
import { mailtoUrl, resourceLinks, serviceLinks, site, telUrl, whatsappUrl } from "@/data/site";

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
    <footer className="bg-off text-ink">
      <div className="container-x pt-20 pb-10 md:pt-28">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Link href="/" aria-label="Nexpedite Freight home" className="inline-block">
              <Logo className="!w-[220px]" />
            </Link>
            <p className="mt-8 font-display text-2xl font-semibold leading-snug tracking-tight text-navy">{site.tagline}</p>
            <p className="mt-4 max-w-sm text-[0.9375rem] text-muted">
              Freight forwarding and logistics from Pakistan — a new company backed by more than 30 years of founder experience.
            </p>
            {socials.length > 0 && (
              <ul className="mt-6 flex gap-2">
                {socials.map((k) => (
                  <li key={k}>
                    <a
                      href={site.social[k]!}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Nexpedite Freight on ${k[0].toUpperCase() + k.slice(1)}`}
                      className="inline-flex size-11 items-center justify-center rounded-lg border border-line bg-white text-navy transition-colors hover:border-blue hover:text-blue"
                    >
                      <ChannelIcon name={k} />
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="grid gap-10 sm:grid-cols-2 lg:col-span-8 lg:grid-cols-[1fr_1.25fr_1fr_1.5fr]">
            <FooterCol title="Company" links={quick} />
            <FooterCol title="Services" links={serviceLinks.map((l) => ({ label: l.label === "Services Overview" ? "All Services" : l.label, href: l.href }))} />
            <FooterCol title="Resources" links={resourceLinks} />
            <div>
              <h2 className="eyebrow text-muted">Contact</h2>
              <ul className="mt-5 space-y-3 text-[0.9375rem]">
                <li>
                  <a href={mailtoUrl} className="link-underline text-ink [overflow-wrap:anywhere] hover:text-blue">
                    {site.contact.email}
                  </a>
                </li>
                <li>
                  <a href={telUrl} className="link-underline text-ink hover:text-blue">
                    {site.contact.phoneDisplay}
                  </a>
                </li>
                <li>
                  <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="link-underline text-ink hover:text-blue">
                    WhatsApp us
                  </a>
                </li>
                <li className="text-muted">{site.contact.officeCity === "Pakistan" ? "Pakistan" : `${site.contact.officeCity}, Pakistan`}</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-4 border-t border-line pt-8 text-[0.8125rem] text-muted md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {site.legalName}. All rights reserved.
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

function FooterCol({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h2 className="eyebrow text-muted">{title}</h2>
      <ul className="mt-5 space-y-3 text-[0.9375rem]">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="link-underline text-ink hover:text-blue">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
