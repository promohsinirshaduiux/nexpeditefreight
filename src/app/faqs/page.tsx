import type { Metadata } from "next";
import { createElement } from "react";
import { Accordion } from "@/components/ui/Accordion";
import { Button, Eyebrow, WhatsAppIcon } from "@/components/ui/primitives";
import { Breadcrumbs } from "@/components/sections/common";
import { SectionNav } from "@/components/sections/SectionNav";
import { faqIcon } from "@/components/sections/faqIcons";
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
          <div className="mt-8 grid gap-6 rounded-[1.75rem] bg-gray-100 px-6 py-10 md:px-12 md:py-14 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-12">
              <Eyebrow>Help centre</Eyebrow>
              <h1 className="mt-3 font-display text-[clamp(2.25rem,5.6vw,5rem)] font-semibold leading-[0.98] tracking-[-0.04em] text-ink">
                <LineReveal lines={["Frequently Asked Questions?"]} />
              </h1>
            </div>
            <p className="text-lead text-muted lg:col-span-12">
              Straightforward answers about how freight forwarding works with us. Can&apos;t find yours? Ask our team directly.
            </p>
          </div>
        </div>
      </section>

      <section className="section-y bg-white">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <SectionNav items={faqGroups.map(({ id, title }) => ({ id, title }))} label="FAQ categories" badge="icon" />
          <div className="space-y-20 lg:col-span-8 lg:col-start-5">
            {faqGroups.map((g) => (
              <section key={g.id} id={g.id} aria-labelledby={`${g.id}-h`} className="scroll-mt-28">
                <div className="mb-6 flex items-center gap-4">
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-blue/[0.07] text-blue">
                    <FaqIcon id={g.id} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <h2 id={`${g.id}-h`} className="font-display text-[clamp(1.375rem,2.2vw,1.75rem)] font-semibold leading-tight tracking-[-0.02em] text-ink">
                      {g.title}
                    </h2>
                  </div>
                  <span className="hidden shrink-0 rounded-full border border-line px-3 py-1 text-[0.8125rem] text-muted sm:inline-block">
                    {g.items.length} {g.items.length === 1 ? "question" : "questions"}
                  </span>
                </div>
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

function FaqIcon({ id }: { id: string }) {
  return createElement(faqIcon(id), { "aria-hidden": true, className: "size-5", strokeWidth: 1.75 });
}
