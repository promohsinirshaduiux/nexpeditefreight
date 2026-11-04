import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";

/** Official logo artwork — rendered as supplied, never redrawn. */
export function Logo({ className = "", priority = false }: { className?: string; priority?: boolean }) {
  return (
    <img
      src="/brand/logo.png"
      alt="Nexpedite Freight — Your Freight Partner"
      width={1859}
      height={362}
      fetchPriority={priority ? "high" : "auto"}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      className={`h-auto w-[168px] md:w-[196px] ${className}`}
    />
  );
}

type ButtonVariant = "primary" | "outline" | "outline-blue" | "light" | "ghost-light" | "whatsapp";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-blue text-white hover:bg-blue-dark",
  outline: "border border-ink/20 text-ink hover:border-ink hover:bg-ink hover:text-white",
  "outline-blue": "border border-blue bg-white text-blue hover:bg-blue hover:text-white",
  light: "bg-white text-navy hover:bg-off",
  "ghost-light": "border border-white/35 text-white hover:border-white hover:bg-white hover:text-navy",
  whatsapp: "bg-whatsapp text-white hover:brightness-95",
};

type ButtonProps = {
  href: string;
  variant?: ButtonVariant;
  children: ReactNode;
  icon?: "arrow" | "external" | "none" | ReactNode;
  external?: boolean;
  className?: string;
};

export function Button({ href, variant = "primary", children, icon = "arrow", external, className = "" }: ButtonProps) {
  const cls = `group inline-flex min-h-12 items-center justify-center gap-3 rounded-lg px-6 text-[0.9375rem] font-medium tracking-[-0.005em] transition-[background-color,color,border-color,filter] duration-300 ${variants[variant]} ${className}`;
  const iconNode =
    icon === "arrow" ? (
      <ArrowRight aria-hidden className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
    ) : icon === "external" ? (
      <ArrowUpRight aria-hidden className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
    ) : icon === "none" ? null : (
      icon
    );
  if (external) {
    return (
      <a href={href} className={cls} target="_blank" rel="noopener noreferrer">
        {children}
        {iconNode}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
      {iconNode}
    </Link>
  );
}

export function TextLink({ href, children, className = "", ...rest }: ComponentProps<typeof Link>) {
  return (
    <Link href={href} className={`group inline-flex items-center gap-2 font-medium ${className}`} {...rest}>
      <span className="link-underline pb-0.5">{children}</span>
      <ArrowRight aria-hidden className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
    </Link>
  );
}

export function Eyebrow({ children, tone = "blue", className = "" }: { children: ReactNode; tone?: "blue" | "cyan" | "muted"; className?: string }) {
  const color = tone === "cyan" ? "text-cyan" : tone === "muted" ? "text-muted" : "text-blue";
  return (
    <p className={`eyebrow ${color} ${className}`}>
      {children}
    </p>
  );
}

export function WhatsAppIcon({ className = "size-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className} fill="currentColor">
      <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.79-1.47-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.75-.72 2-1.41.25-.69.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35zM12.05 21.5h-.01a9.4 9.4 0 0 1-4.8-1.32l-.34-.2-3.57.94.95-3.48-.22-.36A9.43 9.43 0 1 1 12.05 21.5zm8.03-17.46A11.3 11.3 0 0 0 12.05.72C5.8.72.7 5.8.7 12.05c0 2 .52 3.95 1.52 5.67L.6 23.6l6.02-1.58a11.3 11.3 0 0 0 5.42 1.38h.01c6.25 0 11.34-5.09 11.34-11.34 0-3.03-1.18-5.88-3.31-8.02z" />
    </svg>
  );
}

/** Full-colour WhatsApp logo (green bubble, white handset) for use on dark or neutral backgrounds. */
export function WhatsAppLogo({ className = "size-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden className={className}>
      <path
        fill="#25D366"
        d="M16 2.67C8.64 2.67 2.67 8.64 2.67 16c0 2.35.62 4.64 1.79 6.66L2.67 29.33l6.85-1.76A13.28 13.28 0 0 0 16 29.33c7.36 0 13.33-5.97 13.33-13.33S23.36 2.67 16 2.67z"
      />
      <path
        fill="#fff"
        d="M22.73 19.29c-.37-.18-2.17-1.07-2.5-1.19-.34-.12-.58-.18-.83.18-.24.37-.95 1.19-1.17 1.44-.21.24-.43.27-.8.09-.37-.18-1.55-.57-2.96-1.83-1.09-.98-1.83-2.18-2.04-2.55-.21-.37-.02-.57.16-.75.17-.16.37-.43.55-.64.18-.21.24-.37.37-.61.12-.25.06-.46-.03-.64-.09-.18-.83-2-1.13-2.74-.3-.72-.6-.62-.83-.63h-.71c-.24 0-.64.09-.98.46-.33.37-1.28 1.25-1.28 3.05s1.31 3.54 1.5 3.79c.18.24 2.58 3.94 6.25 5.52.87.38 1.55.6 2.08.77.88.28 1.67.24 2.3.15.7-.11 2.17-.89 2.47-1.74.31-.86.31-1.59.21-1.74-.09-.15-.33-.24-.7-.43z"
      />
    </svg>
  );
}

/** Pakistan flag (twemoji artwork), used beside the PKT clock and the office location. */
export function PakistanFlag({ className = "size-6" }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 36 36" className={`shrink-0 ${className}`}>
      <path fill="#004600" d="M32 5H9v26h23a4 4 0 0 0 4-4V9a4 4 0 0 0-4-4zm-9.5 20.472a7.5 7.5 0 0 1-7.5-7.5c0-3.72 2.711-6.799 6.263-7.39A6.496 6.496 0 0 0 24 22.972a6.496 6.496 0 0 0 5.89-3.763c-.591 3.553-3.67 6.263-7.39 6.263zm5.11-10.424l-1.213 2.022l-.208-2.349l-2.298-.528l2.17-.924l-.207-2.349l1.548 1.779l2.17-.924l-1.212 2.023l1.548 1.779l-2.298-.529z" />
      <path fill="#EEE" d="M4 5a4 4 0 0 0-4 4v18a4 4 0 0 0 4 4h5V5H4z" />
      <path fill="#FFF" d="M29.572 11.775l-2.17.924l-1.548-1.779l.207 2.349l-2.17.924l2.298.528l.208 2.349l1.213-2.022l2.298.529l-1.548-1.779z" />
      <path fill="#FFF" d="M24 22.972a6.496 6.496 0 0 1-2.737-12.39c-3.552.592-6.263 3.671-6.263 7.39a7.5 7.5 0 0 0 7.5 7.5c3.72 0 6.799-2.711 7.39-6.263A6.494 6.494 0 0 1 24 22.972z" />
    </svg>
  );
}
