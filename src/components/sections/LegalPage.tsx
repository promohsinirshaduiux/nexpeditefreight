import type { ReactNode } from "react";
import { Eyebrow } from "@/components/ui/primitives";
import { Breadcrumbs } from "@/components/sections/common";

export type LegalSection = { id: string; title: string; body: ReactNode };

/** Narrow, readable layout for draft legal content awaiting client/legal review. */
export function LegalPage({ title, label, sections }: { title: string; label: string; sections: LegalSection[] }) {
  return (
    <>
      <section className="bg-white pt-28 md:pt-36">
        <div className="container-x">
          <Breadcrumbs items={[{ label: "Resources" }, { label: title }]} />
          <Eyebrow className="mt-12">{label}</Eyebrow>
          <h1 className="text-h2 mt-3 max-w-3xl">{title}</h1>
          <p role="note" className="mt-8 max-w-3xl rounded-lg border border-[#e8c96b] bg-[#fdf8e7] px-5 py-4 text-[0.9375rem] text-[#5c4708]">
            <strong className="font-semibold">Draft for review.</strong> This document is a structured draft prepared for Nexpedite Freight and
            has not been approved by a legal professional. Items in [square brackets] require confirmation before publication.
          </p>
        </div>
      </section>
      <section className="section-y bg-white pt-14 md:pt-16">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <nav aria-label="On this page" className="lg:col-span-3">
            <div className="lg:sticky lg:top-32">
              <p className="eyebrow text-muted">On this page</p>
              <ol className="mt-4 space-y-2 text-[0.9375rem]">
                {sections.map((s, i) => (
                  <li key={s.id}>
                    <a href={`#${s.id}`} className="flex gap-3 text-muted hover:text-blue">
                      <span className="tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                      {s.title}
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </nav>
          <div className="max-w-[68ch] space-y-14 lg:col-span-8 lg:col-start-5">
            {sections.map((s, i) => (
              <section key={s.id} id={s.id} className="scroll-mt-28">
                <h2 className="font-display text-2xl font-semibold tracking-tight">
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
