"use client";

import { useEffect, useRef } from "react";

/**
 * Soft follower cursor for mouse users. Grows over links and shows a label over
 * elements marked `data-cursor="View"`. The native cursor is left untouched.
 */
export function Cursor() {
  const ref = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;
    const el = ref.current;
    if (!el) return;
    el.style.display = "";
    let x = -100, y = -100, cx = -100, cy = -100, raf = 0;

    const move = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      const t = e.target as HTMLElement | null;
      const view = t?.closest<HTMLElement>("[data-cursor]");
      const link = t?.closest("a, button, [role=button], input, select, textarea, label");
      el.classList.toggle("is-view", !!view);
      el.classList.toggle("is-link", !view && !!link);
      el.classList.toggle("is-hidden", !!t?.closest("input, textarea, select"));
      if (labelRef.current) labelRef.current.textContent = view?.dataset.cursor ?? "";
    };
    const leave = () => el.classList.add("is-hidden");
    const enter = () => el.classList.remove("is-hidden");
    const loop = () => {
      cx += (x - cx) * 0.2;
      cy += (y - cy) * 0.2;
      el.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", leave);
    document.addEventListener("pointerenter", enter);
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", leave);
      document.removeEventListener("pointerenter", enter);
    };
  }, []);

  return (
    <div ref={ref} aria-hidden className="nx-cursor" style={{ display: "none" }}>
      <div className="nx-cursor-dot">
        <span ref={labelRef} />
      </div>
    </div>
  );
}
