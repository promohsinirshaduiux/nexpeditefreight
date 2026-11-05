"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowRight, Boxes, ChevronDown, Menu, Plane, Plus, Ship, ShieldCheck, Truck, Warehouse, Weight, X, type LucideIcon } from "lucide-react";
import { createElement, useCallback, useEffect, useId, useRef, useState } from "react";
import { Logo } from "@/components/ui/primitives";
import { ChannelIcon } from "@/components/ui/SocialIcon";
import { serviceLinks, site, type NavLink } from "@/data/site";

type MenuKey = "services";

const ease = [0.16, 1, 0.3, 1] as const;

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState<MenuKey | null>(null);
  const [drawer, setDrawer] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Close menus whenever the route changes.
  const [prevPath, setPrevPath] = useState(pathname);
  if (prevPath !== pathname) {
    setPrevPath(pathname);
    setOpen(null);
    setDrawer(false);
  }

  useEffect(() => {
    // The header stays pinned; scrolling only adds a hairline shadow.
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 bg-white transition-shadow duration-300 ${
          scrolled || open ? "shadow-[0_1px_0_var(--color-line),0_8px_24px_-16px_rgba(12,32,65,0.18)]" : ""
        }`}
      >
        <div className="container-x flex h-[72px] items-center justify-between gap-6 md:h-20">
          <Link href="/" aria-label="Nexpedite Freight home" className="shrink-0">
            <Logo priority className="lg:h-12 lg:w-auto" />
          </Link>

          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              <NavItem href="/" label="Home" active={isActive("/")} />
              <NavItem href="/about" label="About Us" active={isActive("/about")} />
              <Dropdown
                id="services"
                href="/services"
                label="Services"
                active={isActive("/services")}
                open={open === "services"}
                setOpen={setOpen}
                wide
              >
                <ServicesPanel onNavigate={() => setOpen(null)} />
              </Dropdown>
              <NavItem href="/industries" label="Industries" active={isActive("/industries")} />
              <NavItem href="/faqs" label="FAQs" active={isActive("/faqs")} />
              <NavItem href="/contact" label="Contact Us" active={isActive("/contact")} />
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/get-a-quote"
              className="group hidden min-h-11 items-center gap-2 whitespace-nowrap rounded-lg bg-blue px-5 text-[0.875rem] font-medium text-white transition-colors hover:bg-blue-dark sm:inline-flex"
            >
              Get a Quote
              <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <button
              type="button"
              onClick={() => setDrawer(true)}
              className="inline-flex size-11 items-center justify-center rounded-lg border border-line text-ink lg:hidden"
              aria-label="Open menu"
              aria-expanded={drawer}
              aria-controls="mobile-drawer"
            >
              <Menu aria-hidden className="size-5" />
            </button>
          </div>
        </div>
      </header>
      <MobileDrawer open={drawer} onClose={() => setDrawer(false)} pathname={pathname} />
    </>
  );
}

function NavItem({ href, label, active }: { href: string; label: string; active: boolean }) {
  return (
    <li>
      <Link
        href={href}
        aria-current={active ? "page" : undefined}
        className={`relative inline-flex h-11 items-center whitespace-nowrap px-3 text-[0.9375rem] xl:px-3.5 transition-colors hover:text-blue ${
          active ? "text-blue" : "text-ink"
        }`}
      >
        {label}
        {active && <span aria-hidden className="absolute inset-x-3.5 bottom-1.5 h-px bg-blue" />}
      </Link>
    </li>
  );
}

function Dropdown({
  id,
  label,
  href,
  active,
  open,
  setOpen,
  children,
  wide,
  align = "left",
}: {
  id: MenuKey;
  label: string;
  href: string;
  active: boolean;
  open: boolean;
  setOpen: (k: MenuKey | null | ((p: MenuKey | null) => MenuKey | null)) => void;
  children: React.ReactNode;
  wide?: boolean;
  align?: "left" | "right";
}) {
  const reduce = useReducedMotion();
  const panelId = useId();
  const ref = useRef<HTMLLIElement>(null);
  const btn = useRef<HTMLButtonElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clear = () => timer.current && clearTimeout(timer.current);
  const onEnter = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    clear();
    setOpen(id);
  };
  const onLeave = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    clear();
    timer.current = setTimeout(() => setOpen((p) => (p === id ? null : p)), 160);
  };

  // Close when clicking outside or when focus leaves the item.
  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(null);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") btn.current?.focus();
    };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, setOpen]);

  return (
    <li
      ref={ref}
      className="relative"
      onPointerEnter={onEnter}
      onPointerLeave={onLeave}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpen((p) => (p === id ? null : p));
      }}
    >
      {/* The label goes straight to its page; hovering (or the chevron, for keyboard and touch) opens the panel. */}
      <div className={`relative inline-flex h-11 items-center whitespace-nowrap pl-3 xl:pl-3.5 ${active || open ? "text-blue" : "text-ink"}`}>
        <Link
          href={href}
          onClick={() => setOpen(null)}
          aria-current={active ? "page" : undefined}
          className="text-[0.9375rem] transition-colors hover:text-blue"
        >
          {label}
        </Link>
        <button
          ref={btn}
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          aria-label={`Show ${label} menu`}
          onClick={() => setOpen((p) => (p === id ? null : id))}
          className="inline-flex h-11 items-center pl-1.5 pr-3 transition-colors hover:text-blue xl:pr-3.5"
        >
          <ChevronDown aria-hidden className={`size-3.5 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
        </button>
        {active && <span aria-hidden className="absolute inset-x-3.5 bottom-1.5 h-px bg-blue" />}
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            id={panelId}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: 6 }}
            transition={{ duration: 0.28, ease }}
            className={`absolute top-full pt-3 ${align === "right" ? "right-0" : wide ? "-left-72" : "left-0"}`}
          >
            <div className="overflow-hidden rounded-xl border border-line bg-white shadow-[0_24px_48px_-24px_rgba(12,32,65,0.25)]">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}

const serviceIcons: Record<string, LucideIcon> = {
  "/services/ocean-freight": Ship,
  "/services/air-freight": Plane,
  "/services/road-transportation": Truck,
  "/services/customs-clearance": ShieldCheck,
  "/services/warehousing-distribution": Warehouse,
  "/services/project-cargo": Weight,
};

function ServicesPanel({ onNavigate }: { onNavigate: () => void }) {
  const [overview, ...items] = serviceLinks;
  return (
    <div className="grid w-[860px] grid-cols-[240px_1fr]">
      <Link href={overview.href} onClick={onNavigate} className="group relative flex min-h-[300px] flex-col justify-end overflow-hidden bg-navy p-6 text-white">
        <img src="/images/containers-abstract.jpg" alt="" className="absolute inset-0 size-full object-cover opacity-50 transition-transform duration-700 group-hover:scale-105" loading="lazy" decoding="async" />
        <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-navy via-navy/50 to-transparent" />
        <span className="relative eyebrow text-cyan">Overview</span>
        <span className="relative mt-2 font-display text-xl font-semibold leading-tight">Six freight solutions, one accountable team.</span>
        <span className="relative mt-4 inline-flex items-center gap-2 text-sm text-white/80">
          All services <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-1" />
        </span>
      </Link>
      <ul className="grid grid-cols-2 gap-1 p-3">
        {items.map((l) => (
          <li key={l.href}>
            <Link href={l.href} onClick={onNavigate} className="group flex h-full items-center gap-3 rounded-lg p-3.5 transition-colors hover:bg-off">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-blue/[0.07] text-blue transition-colors group-hover:bg-blue group-hover:text-white">
                {createElement(serviceIcons[l.href] ?? Boxes, { "aria-hidden": true, className: "size-[18px]", strokeWidth: 1.75 })}
              </span>
              <span>
                <span className="block whitespace-nowrap text-[0.9375rem] font-medium text-ink group-hover:text-blue">{l.label}</span>
                <span className="mt-0.5 block whitespace-nowrap text-[0.8125rem] text-muted">{l.description}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function MobileDrawer({ open, onClose, pathname }: { open: boolean; onClose: () => void; pathname: string }) {
  const reduce = useReducedMotion();
  const panel = useRef<HTMLDivElement>(null);
  const [group, setGroup] = useState<MenuKey | null>(null);

  const trap = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key !== "Tab" || !panel.current) return;
      const f = panel.current.querySelectorAll<HTMLElement>("a[href],button:not([disabled])");
      if (!f.length) return;
      const first = f[0];
      const last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    },
    [onClose],
  );

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.__lenis?.stop();
    document.addEventListener("keydown", trap);
    const t = setTimeout(() => panel.current?.querySelector<HTMLElement>("button")?.focus(), 50);
    return () => {
      document.body.style.overflow = prev;
      window.__lenis?.start();
      document.removeEventListener("keydown", trap);
      clearTimeout(t);
    };
  }, [open, trap]);

  const groups: { key: MenuKey; label: string; links: (NavLink & { icon?: Parameters<typeof ChannelIcon>[0]["name"] })[] }[] = [
    { key: "services", label: "Services", links: serviceLinks },
  ];

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[60] lg:hidden" id="mobile-drawer">
          <motion.div
            className="absolute inset-0 bg-navy/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            ref={panel}
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            initial={reduce ? { opacity: 0 } : { x: "100%" }}
            animate={reduce ? { opacity: 1 } : { x: 0 }}
            exit={reduce ? { opacity: 0 } : { x: "100%" }}
            transition={{ duration: 0.5, ease }}
            className="absolute inset-y-0 right-0 flex w-full max-w-[420px] flex-col bg-white pb-[env(safe-area-inset-bottom)]"
          >
            <div className="flex h-[72px] items-center justify-between border-b border-line px-5">
              <Logo className="!w-[150px]" />
              <button type="button" onClick={onClose} aria-label="Close menu" className="inline-flex size-11 items-center justify-center rounded-lg border border-line">
                <X aria-hidden className="size-5" />
              </button>
            </div>
            <nav aria-label="Mobile" data-lenis-prevent className="flex-1 overflow-y-auto px-5 py-4">
              <ul className="divide-y divide-line">
                {/* Same order as the desktop menu: Home, About Us, Services, Industries, FAQs, Contact Us. */}
                {[
                  { href: "/", label: "Home" },
                  { href: "/about", label: "About Us" },
                ].map((l) => (
                  <DrawerLink key={l.href} {...l} active={pathname === l.href} onClose={onClose} />
                ))}
                {groups.map((g) => {
                  const expanded = group === g.key;
                  return (
                    <li key={g.key}>
                      <button
                        type="button"
                        aria-expanded={expanded}
                        onClick={() => setGroup(expanded ? null : g.key)}
                        className="flex min-h-14 w-full items-center justify-between font-display text-xl font-semibold text-ink"
                      >
                        {g.label}
                        <Plus aria-hidden className={`size-5 text-blue transition-transform duration-300 ${expanded ? "rotate-45" : ""}`} />
                      </button>
                      <AnimatePresence initial={false}>
                        {expanded && (
                          <motion.ul
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.35, ease }}
                            className="overflow-hidden"
                          >
                            {g.links.map((l) => (
                              <li key={l.label}>
                                {l.external ? (
                                  <a
                                    href={l.href}
                                    onClick={onClose}
                                    className="flex min-h-11 items-center gap-3 pb-1 text-[0.9375rem] text-muted hover:text-blue"
                                    {...(l.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                                  >
                                    {l.icon && <ChannelIcon name={l.icon} className="size-4 text-blue" />}
                                    {l.label}
                                  </a>
                                ) : (
                                  <Link href={l.href} onClick={onClose} className="flex min-h-11 items-center gap-3 pb-1 text-[0.9375rem] text-muted hover:text-blue">
                                    {l.icon && <ChannelIcon name={l.icon} className="size-4 text-blue" />}
                                    {l.label}
                                  </Link>
                                )}
                              </li>
                            ))}
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </li>
                  );
                })}
                {[
                  { href: "/industries", label: "Industries" },
                  { href: "/faqs", label: "FAQs" },
                  { href: "/contact", label: "Contact Us" },
                ].map((l) => (
                  <DrawerLink key={l.href} {...l} active={pathname === l.href} onClose={onClose} />
                ))}
              </ul>
            </nav>
            <div className="border-t border-line p-5">
              <Link href="/get-a-quote" onClick={onClose} className="flex min-h-12 items-center justify-center gap-2 rounded-lg bg-blue font-medium text-white">
                Get a Quote <ArrowRight aria-hidden className="size-4" />
              </Link>
              <p className="mt-4 text-center text-[0.8125rem] text-muted">{site.tagline}</p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

function DrawerLink({ href, label, active, onClose }: { href: string; label: string; active: boolean; onClose: () => void }) {
  return (
    <li>
      <Link
        href={href}
        onClick={onClose}
        aria-current={active ? "page" : undefined}
        className="flex min-h-14 items-center font-display text-xl font-semibold text-ink aria-[current=page]:text-blue"
      >
        {label}
      </Link>
    </li>
  );
}
