"use client";

import { createElement, useEffect, useRef, useState } from "react";
import { faqIcon } from "./faqIcons";

/** Clear of the fixed header: where a clicked section lands, and the minimum line a heading must pass to count as current. */
const OFFSET = 140;

/**
 * Sticky "on this page" list (FAQ categories, legal sections). Highlights the
 * section in view as the page scrolls, and scrolls smoothly to a section when
 * one is clicked. On small screens it becomes a sticky, sideways-scrolling bar.
 */
export function SectionNav({
  items,
  label,
  heading,
  badge = "number",
}: {
  items: { id: string; title: string }[];
  label: string;
  heading?: string;
  /** "icon" uses the FAQ category icons; "number" shows 01, 02… */
  badge?: "icon" | "number";
}) {
  const [active, setActive] = useState(items[0]?.id);
  const list = useRef<HTMLUListElement>(null);

  // After a click, hold the clicked item until the smooth scroll settles.
  const lockUntil = useRef(0);

  useEffect(() => {
    const update = () => {
      if (performance.now() < lockUntil.current) return;
      const last = document.getElementById(items[items.length - 1]?.id ?? "");
      if (!last) return;
      // A heading counts as current once it passes a line just under the header. Short final
      // sections can never scroll that high, so over the last stretch of scrolling the line
      // slides down to meet them, reaching the last heading exactly at the bottom of the page.
      const toEnd = document.documentElement.scrollHeight - window.innerHeight - window.scrollY;
      const shortfall = last.getBoundingClientRect().top - toEnd - OFFSET;
      const line = OFFSET + Math.max(0, shortfall - toEnd);
      let current = items[0]?.id;
      for (const it of items) {
        const el = document.getElementById(it.id);
        if (el && el.getBoundingClientRect().top <= line) current = it.id;
      }
      setActive(current);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [items]);

  // On small screens the list scrolls sideways; keep the current item in view without moving the page.
  useEffect(() => {
    const ul = list.current;
    const item = ul?.querySelector<HTMLElement>(`[data-id="${active}"]`);
    if (!ul || !item || ul.scrollWidth <= ul.clientWidth) return;
    ul.scrollTo({ left: item.offsetLeft - ul.clientWidth / 2 + item.offsetWidth / 2, behavior: "smooth" });
  }, [active]);

  const go = (e: React.MouseEvent, id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    e.preventDefault();
    setActive(id);
    lockUntil.current = e.timeStamp + 1400;
    const offset = -(OFFSET - 24);
    if (window.__lenis) window.__lenis.scrollTo(el, { offset, duration: 1.2 });
    else window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY + offset, behavior: "smooth" });
    history.replaceState(null, "", `#${id}`);
  };

  return (
    <nav
      aria-label={label}
      className="sticky top-[72px] z-10 -mx-5 min-w-0 bg-white px-5 py-3 md:top-20 lg:static lg:col-span-3 lg:mx-0 lg:bg-transparent lg:p-0"
    >
      <div className="lg:sticky lg:top-32">
        {heading && <p className="eyebrow mb-4 hidden text-muted lg:block">{heading}</p>}
        <ul ref={list} className="flex gap-2 overflow-x-auto [scrollbar-width:none] lg:flex-col lg:gap-1.5 lg:overflow-visible">
          {items.map((it, i) => {
            const on = it.id === active;
            return (
              <li key={it.id} data-id={it.id} className="shrink-0">
                <a
                  href={`#${it.id}`}
                  onClick={(e) => go(e, it.id)}
                  aria-current={on ? "true" : undefined}
                  className={`group flex items-center gap-3 whitespace-nowrap rounded-full border py-1.5 pl-1.5 pr-4 text-[0.9375rem] leading-snug transition-colors duration-300 lg:whitespace-normal ${
                    on ? "border-blue/15 bg-blue/[0.06] font-medium text-blue" : "border-line text-ink hover:text-blue lg:border-transparent lg:hover:bg-gray-100"
                  }`}
                >
                  <span
                    className={`flex size-9 shrink-0 items-center justify-center rounded-full transition-colors duration-300 ${
                      on ? "bg-blue text-white" : "bg-gray-100 text-muted group-hover:text-blue"
                    }`}
                  >
                    {badge === "icon" ? (
                      createElement(faqIcon(it.id), { "aria-hidden": true, className: "size-[1.125rem]", strokeWidth: 1.75 })
                    ) : (
                      <span className="font-display text-[0.8125rem] font-semibold tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                    )}
                  </span>
                  {it.title}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
