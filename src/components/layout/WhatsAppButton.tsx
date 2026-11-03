"use client";

import { useEffect, useState } from "react";
import { WhatsAppIcon } from "@/components/ui/primitives";
import { whatsappUrl } from "@/data/site";

/**
 * Floating click-to-chat button. It steps aside while any element marked
 * `data-whatsapp-avoid` (form submit rows, cookie banners) is on screen.
 */
export function WhatsAppButton() {
  const [hidden, setHidden] = useState(false);

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

  return (
    <a
      href={whatsappUrl()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with our freight team on WhatsApp (opens in a new tab)"
      tabIndex={hidden ? -1 : 0}
      aria-hidden={hidden || undefined}
      className={`group fixed z-40 flex size-14 items-center justify-center rounded-full bg-whatsapp text-white shadow-[0_8px_24px_-8px_rgba(16,28,48,0.45)] transition-[opacity,transform,filter] duration-300 hover:brightness-95 right-[max(1rem,env(safe-area-inset-right))] bottom-[max(1rem,env(safe-area-inset-bottom))] md:right-7 md:bottom-7 ${
        hidden ? "pointer-events-none translate-y-4 opacity-0" : "opacity-100"
      }`}
    >
      <WhatsAppIcon className="size-7" />
      <span
        role="tooltip"
        className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-md bg-ink px-3 py-2 text-[0.8125rem] font-medium text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100 md:block"
      >
        Chat with our freight team
      </span>
    </a>
  );
}
