import type { Metadata } from "next";
import { Mail, Phone } from "lucide-react";
import { QuoteForm } from "@/components/forms/QuoteForm";
import { Button, Eyebrow, WhatsAppIcon } from "@/components/ui/primitives";
import { LineReveal } from "@/components/ui/Reveal";
import { mailtoUrl, site, telUrl, whatsappUrl } from "@/data/site";

export const metadata: Metadata = {
  title: "Get a Quote — Freight Forwarding Quotation",
  description: "Request a freight forwarding quotation for ocean, air or road freight, customs clearance, warehousing or project cargo from Pakistan.",
  alternates: { canonical: "/get-a-quote" },
};

export default async function QuotePage({ searchParams }: { searchParams: Promise<{ service?: string | string[] }> }) {
  const { service } = await searchParams;
  const defaultService = Array.isArray(service) ? service[0] : service;

  return (
    <section className="bg-white pt-28 pb-[clamp(4rem,9vw,9rem)] md:pt-36">
      <div className="container-x">
        <div className="grid gap-14 lg:grid-cols-12">
          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <Eyebrow>Get a quotation</Eyebrow>
              <h1 className="mt-3 font-display text-[clamp(2.5rem,5vw,4.25rem)] font-semibold leading-[1] tracking-[-0.035em]">
                <LineReveal hero lines={["Tell us what", "you're shipping."]} />
              </h1>
              <p className="text-lead mt-6 text-muted">
                Share your shipment details and we&apos;ll prepare a clear, cost-effective quotation — reviewed by people with decades of
                freight forwarding experience.
              </p>

              <div className="mt-8 space-y-3 text-[0.9375rem]">
                <a href={mailtoUrl} className="flex items-center gap-3 text-ink hover:text-blue">
                  <Mail aria-hidden className="size-4 text-blue" /> {site.contact.email}
                </a>
                <a href={telUrl} className="flex items-center gap-3 text-ink hover:text-blue">
                  <Phone aria-hidden className="size-4 text-blue" /> {site.contact.phoneDisplay}
                </a>
              </div>
              <div className="mt-8 border-t border-line pt-8">
                <p className="text-[0.9375rem] text-muted">Prefer to chat? Send your details on WhatsApp instead.</p>
                <Button
                  href={whatsappUrl("Hello Nexpedite Freight, I would like a quotation for a shipment.")}
                  variant="whatsapp"
                  external
                  icon={<WhatsAppIcon className="size-4" />}
                  className="mt-4"
                >
                  Quote via WhatsApp
                </Button>
              </div>
            </div>

          </aside>
          <div className="lg:col-span-7 lg:col-start-6">
            <div className="rounded-[1.75rem] bg-gray-100 p-6 md:p-10">
              <QuoteForm defaultService={defaultService} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
