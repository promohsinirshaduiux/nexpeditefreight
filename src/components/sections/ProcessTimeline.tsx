import type { CSSProperties } from "react";
import { processSteps } from "@/data/site";

/** Six-stage shipment process; the rail draws itself, steps follow in sequence. */
export function ProcessTimeline({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const dark = tone === "dark";
  return (
    <div className="relative">
      <div data-reveal="rail" aria-hidden className="absolute left-[7px] top-2 bottom-2 w-px lg:left-0 lg:right-0 lg:top-[7px] lg:bottom-auto lg:h-px lg:w-auto">
        <span className={`rail block h-full w-full ${dark ? "bg-white/25" : "bg-line"}`} />
      </div>
      <ol className="grid gap-10 lg:grid-cols-6 lg:gap-6">
        {processSteps.map((s, i) => (
          <li key={s.n} data-reveal="up" style={{ "--d": `${0.15 + i * 0.12}s` } as CSSProperties} className="relative pl-10 lg:pl-0 lg:pt-12">
            <span aria-hidden className={`absolute left-0 top-1 size-[15px] rounded-full border-2 lg:top-0 ${dark ? "border-cyan bg-navy" : "border-blue bg-white"}`} />
            <span className={`font-display text-sm font-semibold tabular-nums ${dark ? "text-cyan" : "text-blue"}`}>{s.n}</span>
            <h3 className={`mt-2 font-display text-xl font-semibold ${dark ? "text-white" : "text-ink"}`}>{s.title}</h3>
            <p className={`mt-3 text-[0.9375rem] leading-relaxed ${dark ? "text-white/70" : "text-muted"}`}>{s.text}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
