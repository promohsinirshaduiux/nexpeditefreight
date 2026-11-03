"use client";

import { AnimatePresence, motion } from "motion/react";
import { Plus } from "lucide-react";
import { useId, useState } from "react";

export function Accordion({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const base = useId();
  return (
    <ul className="border-t border-line">
      {items.map((it, i) => {
        const expanded = open === i;
        const btn = `${base}-b${i}`;
        const panel = `${base}-p${i}`;
        return (
          <li key={it.q} className="border-b border-line">
            <h3>
              <button
                id={btn}
                type="button"
                aria-expanded={expanded}
                aria-controls={panel}
                onClick={() => setOpen(expanded ? null : i)}
                className="group flex w-full items-start justify-between gap-6 py-6 text-left"
              >
                <span className="font-display text-lg font-semibold tracking-tight text-ink transition-colors group-hover:text-blue md:text-xl">{it.q}</span>
                <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full border border-line text-blue transition-colors group-hover:border-blue">
                  <Plus aria-hidden className={`size-4 transition-transform duration-300 ${expanded ? "rotate-45" : ""}`} />
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {expanded && (
                <motion.div
                  id={panel}
                  role="region"
                  aria-labelledby={btn}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <p className="max-w-3xl pb-7 pr-12 text-muted">{it.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );
}
