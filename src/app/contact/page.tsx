import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";
import { ContactForm } from "@/components/forms/ContactForm";
import { Breadcrumbs } from "@/components/sections/common";
import { Eyebrow } from "@/components/ui/primitives";
import { LineReveal } from "@/components/ui/Reveal";
import { ChannelIcon } from "@/components/ui/SocialIcon";
import { mailtoUrl, mapsUrl, site, telUrl, whatsappUrl } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Contact Nexpedite Freight by email, phone or WhatsApp to discuss your freight forwarding needs.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const channels = [
    { icon: "mail" as const, label: "Email", value: site.contact.email, href: mailtoUrl },
    { icon: "phone" as const, label: "Phone", value: site.contact.phoneDisplay, href: telUrl },
    { icon: "whatsapp" as const, label: "WhatsApp", value: "Chat with our freight team", href: whatsappUrl(), external: true },
  ];
  const socials = (["facebook", "instagram", "linkedin"] as const).filter((k) => site.social[k]);

  return (
    <section className="bg-white pt-28 pb-[clamp(4rem,9vw,9rem)] md:pt-36">
      <div className="container-x">
        <Breadcrumbs items={[{ label: "Contact Us" }]} />
        <div className="mt-6 grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Eyebrow>Get in touch</Eyebrow>
            <h1 className="text-display mt-3">
              <LineReveal lines={["Let's talk", "freight."]} />
            </h1>
            <p className="text-lead mt-8 max-w-md text-muted">
              We&apos;d welcome the chance to discuss your freight forwarding needs. You&apos;ll hear back from the people who will handle
              your shipment.
            </p>

            <ul className="mt-12 border-t border-line">
              {channels.map((c) => (
                <li key={c.label} className="border-b border-line">
                  <a
                    href={c.href}
                    {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="group flex items-center gap-5 py-6"
                  >
                    <span
                      className={`flex size-12 shrink-0 items-center justify-center rounded-full border border-line transition-colors group-hover:text-white ${
                        c.icon === "whatsapp" ? "text-whatsapp group-hover:border-[#075e54] group-hover:bg-[#075e54]" : "text-blue group-hover:border-blue group-hover:bg-blue"
                      }`}
                    >
                      <ChannelIcon name={c.icon} className="size-5" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="eyebrow block text-muted">{c.label}</span>
                      <span className="mt-1 block truncate font-display text-lg font-semibold text-ink md:text-xl">{c.value}</span>
                    </span>
                    <ArrowUpRight aria-hidden className="size-5 shrink-0 text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-blue" />
                  </a>
                </li>
              ))}
              <li className="border-b border-line">
                <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-5 py-6" aria-label={`Office: ${site.contact.officeAddress} (opens Google Maps in a new tab)`}>
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-full border border-line text-blue transition-colors group-hover:border-blue group-hover:bg-blue group-hover:text-white">
                    <MapPin aria-hidden className="size-5" strokeWidth={1.6} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="eyebrow block text-muted">Office</span>
                    <span title={site.contact.officeAddress} className="mt-1 block truncate font-display text-lg font-semibold text-ink md:text-xl">{site.contact.officeAddress}</span>
                  </span>
                  <ArrowUpRight aria-hidden className="size-5 shrink-0 text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-blue" />
                </a>
              </li>
            </ul>

            {socials.length > 0 && (
              <ul className="mt-8 flex gap-2">
                {socials.map((k) => (
                  <li key={k}>
                    <a
                      href={site.social[k]!}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Nexpedite Freight on ${k}`}
                      className="inline-flex size-11 items-center justify-center rounded-lg border border-line text-navy hover:border-blue hover:text-blue"
                    >
                      <ChannelIcon name={k} />
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="lg:col-span-7 lg:col-start-6">
            <div className="rounded-[1.75rem] bg-gray-100 p-6 md:p-10 lg:ml-auto lg:max-w-[620px]">
              <h2 className="font-display text-2xl font-semibold tracking-tight">Send us a message</h2>
              <p className="mt-2 mb-8 text-[0.9375rem] text-muted">
                <span className="text-blue">*</span> Required. Need a price?{" "}
                <Link href="/get-a-quote" className="text-blue underline">
                  Get a quote
                </Link>
              </p>
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
