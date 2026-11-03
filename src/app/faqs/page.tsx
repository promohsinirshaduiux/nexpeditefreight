import type { Metadata } from "next";
import { Accordion } from "@/components/ui/Accordion";
import { Button, Eyebrow, WhatsAppIcon } from "@/components/ui/primitives";
import { Breadcrumbs } from "@/components/sections/common";
import { LineReveal } from "@/components/ui/Reveal";
import { faqGroups } from "@/data/faqs";
import { mailtoUrl, site, whatsappUrl } from "@/data/site";

export const metadata: Metadata = {
  title: "FAQs — Freight Forwarding Questions Answered",
  description: "Answers to common questions about ocean, air and road freight, customs clearance, quotations and shipment documentation.",
  alternates: { canonical: "/faqs" },
};

export default function FaqsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqGroups.flatMap((g) =>
      g.items.map((it) => ({ "@type": "Question", name: it.q, acceptedAnswer: { "@type": "Answer", text: it.a } })),
    ),
  };
  return (
    <>
      <section className="bg-white pt-28 md:pt-36">
        <div className="container-x">
          <Breadcrumbs items={[{ label: "Resources" }, { label: "FAQs" }]} />
          <div className="mt-12 grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <Eyebrow>Help centre</Eyebrow>
              <h1 className="text-display mt-3">
                <LineReveal lines={["Questions,", "answered."]} />
              </h1>
            </div>
            <p className="text-lead text-muted lg:col-span-4">
              Straightforward answers about how freight forwarding works with us. Can&apos;t find yours? Ask our team directly.
            </p>
          </div>
        </div>
      </section>

      <section className="section-y bg-white">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <nav aria-label="FAQ categories" className="lg:col-span-3">
            <ul className="flex gap-2 overflow-x-auto pb-2 lg:sticky lg:top-32 lg:flex-col lg:gap-1 lg:overflow-visible">
              {faqGroups.map((g) => (
                <li key={g.id} className="shrink-0">
                  <a href={`#${g.id}`} className="block whitespace-nowrap rounded-lg border border-line px-4 py-2.5 text-[0.9375rem] text-ink transition-colors hover:border-blue hover:text-blue lg:border-transparent lg:px-3">
                    {g.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="space-y-20 lg:col-span-8 lg:col-start-5">
            {faqGroups.map((g) => (
              <section key={g.id} id={g.id} aria-labelledby={`${g.id}-h`} className="scroll-mt-28">
                <h2 id={`${g.id}-h`} className="eyebrow mb-6 text-blue">
                  {g.title}
                </h2>
                <Accordion items={g.items} />
              </section>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white pb-[clamp(4rem,9vw,9rem)]">
        <div className="container-x">
          <div className="grid gap-8 rounded-2xl bg-off p-8 md:grid-cols-12 md:items-center md:p-14">
            <div className="md:col-span-7">
              <h2 className="text-h2">Still have a question?</h2>
              <p className="mt-4 text-muted">
                Speak directly with the team that will handle your shipment — by email at {site.contact.email} or on WhatsApp.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 md:col-span-5 md:justify-end">
              <Button href={whatsappUrl()} variant="whatsapp" external icon={<WhatsAppIcon className="size-4" />}>
                WhatsApp us
              </Button>
              <Button href={mailtoUrl} variant="outline" external icon="none">
                Email us
              </Button>
            </div>
          </div>
        </div>
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
