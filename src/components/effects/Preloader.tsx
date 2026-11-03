"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

/**
 * Short counter intro (first visit per session only). Hidden by CSS when
 * motion is reduced or it has already played, so it never blocks content.
 */
export function Preloader() {
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);
  const [gone, setGone] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = document.documentElement;
    const finish = () => {
      window.__nxReady = true;
      root.classList.add("nx-ready");
      window.dispatchEvent(new Event("nx:ready"));
    };
    const active = root.classList.contains("motion-ready") && !root.classList.contains("nx-seen");
    if (!active) {
      // CSS already hides the overlay in this case.
      finish();
      return;
    }
    window.__lenis?.stop();
    const duration = 1500;
    const start = performance.now();
    const timer = window.setInterval(() => {
      const p = Math.min(1, (performance.now() - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.round(eased * 100));
      if (p >= 1) {
        window.clearInterval(timer);
        try {
          sessionStorage.setItem("nx-seen", "1");
        } catch {}
        setDone(true);
        window.setTimeout(finish, 350);
        window.setTimeout(() => {
          window.__lenis?.start();
          setGone(true);
        }, 1100);
      }
    }, 16);
    return () => window.clearInterval(timer);
  }, []);

  if (gone) return null;

  return (
    <div ref={ref} aria-hidden className={`preloader fixed inset-0 z-[100] flex flex-col justify-between bg-navy p-6 text-white md:p-10 ${done ? "done" : ""}`}>
      <div className="flex items-center justify-between">
        <span className="eyebrow text-white/60">Nexpedite Freight</span>
        <span className="eyebrow text-white/60">Est. 2025</span>
      </div>
      <div className="flex items-center justify-center">
        <div className="relative size-20 overflow-hidden rounded-full bg-white p-2 md:size-24">
          <Image src="/brand/icon.png" alt="" width={96} height={96} priority className="size-full object-contain" />
        </div>
      </div>
      <div>
        <div className="flex items-end justify-between gap-6">
          <p className="max-w-xs font-display text-lg font-medium leading-snug text-white/80">Your Cargo. Our Commitment. Delivered.</p>
          <span className="font-display text-[clamp(4.5rem,14vw,11rem)] font-semibold leading-[0.8] tracking-[-0.05em] tabular-nums">{count}</span>
        </div>
        <div className="mt-6 h-px w-full bg-white/15">
          <div className="h-px origin-left bg-cyan" style={{ transform: `scaleX(${count / 100})` }} />
        </div>
      </div>
    </div>
  );
}
