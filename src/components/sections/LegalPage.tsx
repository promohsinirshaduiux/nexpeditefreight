import type { ReactNode } from "react";
import { Eyebrow } from "@/components/ui/primitives";
import { SectionNav } from "@/components/sections/SectionNav";

export type LegalSection = { id: string; title: string; body: ReactNode };

/** Narrow, readable layout for draft legal content awaiting client/legal review. */
export function LegalPage({ title, label, sections }: { title: string; label: string; sections: LegalSection[] }) {
  return (
    <>
      <section className="bg-white pt-28 md:pt-36">
        <div className="container-x">
          <div className="rounded-[1.75rem] bg-gray-100 px-6 py-10 md:px-12 md:py-14">
            <Eyebrow>{label}</Eyebrow>
            <h1 className="mt-3 font-display text-[clamp(2.25rem,5.6vw,5rem)] font-semibold leading-[1.04] tracking-[-0.04em] text-ink">{title}</h1>
            <p role="note" className="mt-8 rounded-lg border border-[#e8c96b] bg-[#fdf8e7] px-5 py-4 text-[0.9375rem] text-[#5c4708]">
              <strong className="font-semibold">Draft for review.</strong> This document is a structured draft prepared for Nexpedite Freight and
              has not been approved by a legal professional. Items in [square brackets] require confirmation before publication.
            </p>
          </div>
        </div>
      </section>
      <section className="section-y bg-white pt-14 md:pt-16">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <SectionNav items={sections.map(({ id, title }) => ({ id, title }))} label="On this page" heading="On this page" />
          <div className="max-w-[68ch] space-y-14 lg:col-span-8 lg:col-start-5">
            {sections.map((s, i) => (
              <section key={s.id} id={s.id} className="scroll-mt-28">
                <h2 className="border-b border-line pb-5 font-display text-2xl font-semibold tracking-tight">
                  <span className="mr-3 text-blue tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                  {s.title}
                </h2>
                <div className="mt-5 space-y-4 text-[1.0625rem] leading-relaxed text-muted [&_li]:pl-1 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5 [&_strong]:text-ink [&_a]:text-blue [&_a]:underline">
                  {s.body}
                </div>
              </section>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
