"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

declare global {
  interface Window {
    __lenis?: Lenis;
    __nxReady?: boolean;
    __nxEffects?: boolean;
  }
}

const reduce = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Site-wide motion engine:
 * - Lenis smooth scrolling, synced with GSAP ScrollTrigger
 * - IntersectionObserver reveals for [data-reveal] (CSS does the animating)
 * - Scrubbed parallax [data-parallax], word reveals [data-scrub-words],
 *   count-ups [data-count], hero scroll-out [data-hero-media]/[data-hero-fade]
 *   and pinned horizontal galleries [data-hscroll]
 */
export function Effects() {
  const pathname = usePathname();

  // Smooth scroll, created once.
  useEffect(() => {
    window.__nxEffects = true;
    gsap.registerPlugin(ScrollTrigger);
    if (reduce()) return;
    const lenis = new Lenis({ duration: 1.15, easing: (t) => 1 - Math.pow(1 - t, 4), anchors: { offset: -96 } });
    window.__lenis = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      window.__lenis = undefined;
    };
  }, []);

  // Per-page effects, rebuilt on every route change.
  useEffect(() => {
    window.__lenis?.scrollTo(0, { immediate: true });
    const root = document.documentElement;
    const motion = root.classList.contains("motion-ready");

    // Reveals
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const el = e.target as HTMLElement;
          if (el.hasAttribute("data-hero") && !window.__nxReady) continue;
          el.classList.add("in");
          io.unobserve(el);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.01 },
    );
    const targets = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]:not(.in)"));
    targets.forEach((el) => io.observe(el));

    const revealHero = () => {
      document.querySelectorAll<HTMLElement>("[data-reveal][data-hero]:not(.in)").forEach((el) => el.classList.add("in"));
    };
    if (window.__nxReady) revealHero();
    window.addEventListener("nx:ready", revealHero);

    // Belt and braces: never leave anything hidden if observers misbehave.
    const failsafe = window.setTimeout(() => {
      document.querySelectorAll<HTMLElement>("[data-reveal]:not(.in)").forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top < window.innerHeight && r.bottom > 0) el.classList.add("in");
      });
    }, 4500);

    if (!motion) {
      targets.forEach((el) => el.classList.add("in"));
      return () => {
        io.disconnect();
        window.removeEventListener("nx:ready", revealHero);
        window.clearTimeout(failsafe);
      };
    }

    const ctx = gsap.context(() => {
      // Image parallax (the image is taller than its frame)
      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
        const amount = parseFloat(el.dataset.parallax || "12");
        gsap.fromTo(
          el,
          { yPercent: -amount },
          { yPercent: amount, ease: "none", scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: true } },
        );
      });

      // Words light up as the paragraph scrolls past
      gsap.utils.toArray<HTMLElement>("[data-scrub-words]").forEach((el) => {
        gsap.fromTo(
          el.querySelectorAll(".sw"),
          { opacity: 0.14 },
          { opacity: 1, stagger: 0.08, ease: "none", scrollTrigger: { trigger: el, start: "top 82%", end: "bottom 40%", scrub: 0.6 } },
        );
      });

      // Count-ups
      gsap.utils.toArray<HTMLElement>("[data-count]").forEach((el) => {
        const target = parseFloat(el.dataset.count || "0");
        const suffix = el.dataset.suffix || "";
        const state = { v: 0 };
        el.textContent = `0${suffix}`;
        ScrollTrigger.create({
          trigger: el,
          start: "top 90%",
          once: true,
          onEnter: () =>
            gsap.to(state, {
              v: target,
              duration: 2,
              ease: "power3.out",
              onUpdate: () => (el.textContent = `${Math.round(state.v)}${suffix}`),
            }),
        });
      });

      // Hero: image drifts and scales, copy lifts away as you scroll
      gsap.utils.toArray<HTMLElement>("[data-hero-media]").forEach((el) => {
        gsap.to(el, { yPercent: 14, scale: 1.08, ease: "none", scrollTrigger: { trigger: el.parentElement, start: "top top", end: "bottom top", scrub: true } });
      });
      gsap.utils.toArray<HTMLElement>("[data-hero-fade]").forEach((el) => {
        gsap.to(el, {
          y: -100,
          opacity: 0,
          ease: "power1.in",
          scrollTrigger: { trigger: el.closest("section") ?? el, start: "top top", end: "bottom top", scrub: true },
        });
      });

      // Pinned horizontal gallery (desktop only)
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        gsap.utils.toArray<HTMLElement>("[data-hscroll]").forEach((section) => {
          const track = section.querySelector<HTMLElement>("[data-hscroll-track]");
          if (!track) return;
          const distance = () => Math.max(0, track.scrollWidth - document.documentElement.clientWidth);
          gsap.to(track, {
            x: () => -distance(),
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: () => `+=${distance()}`,
              pin: true,
              scrub: 0.8,
              invalidateOnRefresh: true,
              anticipatePin: 1,
            },
          });
          const bar = section.querySelector<HTMLElement>("[data-hscroll-progress]");
          if (bar) {
            gsap.fromTo(bar, { scaleX: 0 }, { scaleX: 1, ease: "none", scrollTrigger: { trigger: section, start: "top top", end: () => `+=${distance()}`, scrub: true } });
          }
        });
      });
    });

    // Images and fonts change layout; re-measure once they settle.
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    const t = window.setTimeout(refresh, 600);

    return () => {
      ctx.revert();
      io.disconnect();
      window.removeEventListener("nx:ready", revealHero);
      window.removeEventListener("load", refresh);
      window.clearTimeout(t);
      window.clearTimeout(failsafe);
    };
  }, [pathname]);

  return null;
}
