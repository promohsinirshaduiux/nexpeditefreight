"use client";

import { ArrowUp } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { WhatsAppIcon } from "@/components/ui/primitives";
import { whatsappUrl } from "@/data/site";

/**
 * Floating click-to-chat button with a back-to-top button stacked beneath it
 * (shown once the page has been scrolled). Both step aside while any element
 * marked `data-whatsapp-avoid` (form submit rows, cookie banners) is on screen.
 */
export function WhatsAppButton() {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const visible = new Set<Element>();
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) visible.add(e.target);
        else visible.delete(e.target);
      }
      setHidden(visible.size > 0);
    });
    const observe = () => document.querySelectorAll("[data-whatsapp-avoid]").forEach((el) => io.observe(el));
    observe();
    const mo = new MutationObserver(observe);
    mo.observe(document.body, { childList: true, subtree: true });
    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const showTop = scrolled && !hidden;

  return (
    <div
      className={`fixed z-40 flex flex-col items-center transition-[opacity,transform] duration-300 right-[max(1rem,env(safe-area-inset-right))] bottom-[max(1rem,env(safe-area-inset-bottom))] md:right-7 md:bottom-7 ${
        hidden ? "pointer-events-none translate-y-4 opacity-0" : "opacity-100"
      }`}
    >
      <a
        href={whatsappUrl()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with our freight team on WhatsApp (opens in a new tab)"
        tabIndex={hidden ? -1 : 0}
        aria-hidden={hidden || undefined}
        className="group relative flex size-14 items-center justify-center rounded-full bg-whatsapp text-white shadow-[0_8px_24px_-8px_rgba(16,28,48,0.45)] transition-[filter] duration-300 hover:brightness-95"
      >
        <WhatsAppIcon className="size-7" />
        <Tooltip>Chat with our freight team</Tooltip>
      </a>

      {/* Collapses to zero height until the page is scrolled, so WhatsApp glides down into the corner. */}
      <div
        className={`grid transition-[grid-template-rows,opacity,margin] duration-500 ease-[var(--ease-out-expo)] ${
          showTop ? "mt-3 grid-rows-[1fr] opacity-100" : "pointer-events-none mt-0 grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="min-h-0">
          <button
            type="button"
            aria-label="Back to top"
            tabIndex={showTop ? 0 : -1}
            onClick={() => (window.__lenis ? window.__lenis.scrollTo(0, { duration: 1.6 }) : window.scrollTo({ top: 0, behavior: "smooth" }))}
            className="group relative flex size-14 items-center justify-center rounded-full bg-navy text-white shadow-[0_8px_24px_-8px_rgba(16,28,48,0.45)] transition-colors duration-300 hover:bg-blue"
          >
            <ArrowUp aria-hidden className="size-5 transition-transform duration-300 group-hover:-translate-y-0.5" />
            <Tooltip>Back to top</Tooltip>
          </button>
        </div>
      </div>
    </div>
  );
}

function Tooltip({ children }: { children: ReactNode }) {
  return (
    <span
      role="tooltip"
      className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-md bg-ink px-3 py-2 text-[0.8125rem] font-medium text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100 md:block"
    >
      {children}
    </span>
  );
}
