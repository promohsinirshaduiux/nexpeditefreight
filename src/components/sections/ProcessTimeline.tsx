"use client";

import { CalendarCheck, Calculator, FileCheck, MessageSquareText, PackageCheck, Ship, type LucideIcon } from "lucide-react";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { processSteps } from "@/data/site";

const icons: LucideIcon[] = [MessageSquareText, Calculator, CalendarCheck, FileCheck, Ship, PackageCheck];

/** How long each step stays active while the bar glides to the next one. */
const STEP_MS = 5000;

/**
 * Six-stage shipment process. The active step advances on its own: a bar glides
 * slowly along the rail and the next step lights up as the bar reaches it.
 * Steps can also be picked directly. Autoplay pauses off-screen, on hover and
 * for reduced motion.
 */
export function ProcessTimeline({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const dark = tone === "dark";
  const total = processSteps.length;
  const [active, setActive] = useState(0);
  const [resetting, setResetting] = useState(false);
  const [running, setRunning] = useState(false);
  const [hovered, setHovered] = useState(false);
  const root = useRef<HTMLDivElement>(null);

  // Only play while the timeline is on screen and motion is allowed.
  useEffect(() => {
    const el = root.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(([e]) => setRunning(e.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!running || hovered) return;
    const t = window.setTimeout(() => {
      if (active < total - 1) {
        setActive(active + 1);
      } else {
        // Snap the bar back to the start without animating, then carry on.
        setResetting(true);
        setActive(0);
        window.setTimeout(() => setResetting(false), 60);
      }
    }, STEP_MS);
    return () => window.clearTimeout(t);
  }, [active, running, hovered, total]);

  // The bar travels from the active step's pill to the next one while it is active.
  const reached = resetting ? 0 : running ? active + 1 : active;
  const barStyle = {
    "--n": reached,
    transitionDuration: resetting || !running ? "0ms" : `${STEP_MS}ms`,
  } as CSSProperties;

  const select = (i: number) => {
    setResetting(true);
    setActive(i);
    window.setTimeout(() => setResetting(false), 60);
  };

  return (
    <div ref={root} className="relative" onPointerEnter={() => setHovered(true)} onPointerLeave={() => setHovered(false)}>
      {/* Rail and travelling bar (vertical on phones, horizontal from lg) */}
      <div aria-hidden className={`process-rail absolute left-[11px] top-3 bottom-3 w-px lg:left-0 lg:top-[13px] lg:bottom-auto lg:h-px ${dark ? "bg-white/20" : "bg-line"}`}>
        <span
          className={`process-bar absolute left-0 top-0 w-px ease-linear lg:h-px ${dark ? "bg-white" : "bg-blue"}`}
          style={barStyle}
        />
      </div>

      <ol className="grid gap-10 lg:grid-cols-6 lg:gap-6">
        {processSteps.map((s, i) => {
          const Icon = icons[i];
          const isActive = i === active;
          const done = i < active;
          return (
            // The <li> keeps a static className: the reveal observer adds `.in` to it,
            // and React would wipe that class if this element's className changed.
            <li key={s.n} data-reveal="up" style={{ "--d": `${0.15 + i * 0.12}s` } as CSSProperties} className="relative pl-12 lg:pl-0">
              {/* Phone: a dot on the vertical rail marks each step */}
              <span
                aria-hidden
                className={`absolute left-[5px] top-[7px] size-[13px] rounded-full border-2 transition-colors duration-500 lg:hidden ${
                  isActive || done ? (dark ? "border-white bg-white" : "border-blue bg-blue") : dark ? "border-white/40 bg-navy" : "border-line bg-white"
                }`}
              />
              <button
                type="button"
                onClick={() => select(i)}
                aria-current={isActive ? "step" : undefined}
                className={`relative whitespace-nowrap rounded-full border px-3 py-1 font-display text-xs font-semibold transition-colors duration-500 ${
                  isActive
                    ? dark
                      ? "border-white bg-white text-navy"
                      : "border-blue bg-blue text-white"
                    : done
                      ? dark
                        ? "pill-glass pill-glass-done text-white"
                        : "border-blue/40 bg-white text-blue"
                      : dark
                        ? "pill-glass text-white/65 hover:text-white"
                        : "border-line bg-white text-muted hover:border-blue/50"
                }`}
              >
                Step {i + 1}
              </button>

              {/* Every step shows at full strength; only the pill and icon mark progress */}
              <div className="mt-5 lg:mt-8">
                <span
                  className={`relative flex size-11 items-center justify-center rounded-full border transition-[background,border-color,box-shadow] duration-500 ${
                    dark
                      ? `icon-glass ${isActive ? "icon-glass-active text-white" : "text-cyan"}`
                      : isActive
                        ? "border-blue bg-blue/10 text-blue"
                        : "border-line text-blue"
                  }`}
                >
                  <Icon aria-hidden className="size-5" strokeWidth={1.6} />
                </span>
                <h3 className={`mt-5 font-display text-xl font-normal ${dark ? "text-white" : "text-ink"}`}>{s.title}</h3>
                <p className={`mt-3 line-clamp-2 text-[0.9375rem] font-normal leading-relaxed lg:text-[0.8125rem] xl:text-[0.9375rem] ${dark ? "text-white/70" : "text-muted"}`}>{s.text}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
