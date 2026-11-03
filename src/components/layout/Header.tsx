"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowRight, ChevronDown, Menu, Plus, X } from "lucide-react";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { Logo } from "@/components/ui/primitives";
import { ChannelIcon } from "@/components/ui/SocialIcon";
import { contactLinks, resourceLinks, serviceLinks, site, type NavLink } from "@/data/site";

type MenuKey = "services" | "resources" | "contact";

const ease = [0.16, 1, 0.3, 1] as const;

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState<MenuKey | null>(null);
  const [drawer, setDrawer] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);

  // Close menus whenever the route changes.
  const [prevPath, setPrevPath] = useState(pathname);
  if (prevPath !== pathname) {
    setPrevPath(pathname);
    setOpen(null);
    setDrawer(false);
  }

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 8);
      setHidden(y > 240 && y > lastY.current + 4);
      if (y < lastY.current - 4 || y < 240) setHidden(false);
      lastY.current = y;
    };
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
        className={`fixed inset-x-0 top-0 z-50 transition-[transform,background-color,box-shadow] duration-500 ${
          hidden && !open && !drawer ? "-translate-y-full" : "translate-y-0"
        } ${scrolled || open ? "bg-white/95 shadow-[0_1px_0_var(--color-line)] backdrop-blur-md" : "bg-white"}`}
      >
        <div className="container-x flex h-[72px] items-center justify-between gap-6 md:h-20">
          <Link href="/" aria-label="Nexpedite Freight home" className="shrink-0">
            <Logo priority />
          </Link>

          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              <NavItem href="/" label="Home" active={isActive("/")} />
              <NavItem href="/about" label="About Us" active={isActive("/about")} />
              <Dropdown
                id="services"
                label="Services"
                active={isActive("/services")}
                open={open === "services"}
                setOpen={setOpen}
                wide
              >
                <ServicesPanel onNavigate={() => setOpen(null)} />
              </Dropdown>
              <NavItem href="/industries" label="Industries" active={isActive("/industries")} />
              <Dropdown
                id="resources"
                label="Resources"
                active={["/faqs", "/privacy-policy", "/terms-and-conditions"].some((p) => pathname.startsWith(p))}
                open={open === "resources"}
                setOpen={setOpen}
              >
                <SimplePanel links={resourceLinks} onNavigate={() => setOpen(null)} />
              </Dropdown>
              <Dropdown id="contact" label="Contact Us" active={isActive("/contact")} open={open === "contact"} setOpen={setOpen} align="right">
                <ContactPanel onNavigate={() => setOpen(null)} />
              </Dropdown>
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/get-a-quote"
              className="group hidden min-h-11 items-center gap-2 rounded-lg bg-blue px-5 text-[0.875rem] font-medium text-white transition-colors hover:bg-blue-dark sm:inline-flex"
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
        className={`relative inline-flex h-11 items-center px-3.5 text-[0.9375rem] transition-colors hover:text-blue ${
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
  active,
  open,
  setOpen,
  children,
  wide,
  align = "left",
}: {
  id: MenuKey;
  label: string;
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
      <button
        ref={btn}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((p) => (p === id ? null : id))}
        className={`relative inline-flex h-11 items-center gap-1.5 px-3.5 text-[0.9375rem] transition-colors hover:text-blue ${
          active || open ? "text-blue" : "text-ink"
        }`}
      >
        {label}
        <ChevronDown aria-hidden className={`size-3.5 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
        {active && <span aria-hidden className="absolute inset-x-3.5 bottom-1.5 h-px bg-blue" />}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            id={panelId}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: 6 }}
            transition={{ duration: 0.28, ease }}
            className={`absolute top-full pt-3 ${align === "right" ? "right-0" : wide ? "-left-40" : "left-0"}`}
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

function ServicesPanel({ onNavigate }: { onNavigate: () => void }) {
  const [overview, ...items] = serviceLinks;
  return (
    <div className="grid w-[720px] grid-cols-[260px_1fr]">
      <Link href={overview.href} onClick={onNavigate} className="group relative flex min-h-[300px] flex-col justify-end overflow-hidden bg-navy p-6 text-white">
        <Image src="/images/containers-abstract.jpg" alt="" fill sizes="260px" className="object-cover opacity-50 transition-transform duration-700 group-hover:scale-105" />
        <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-navy via-navy/50 to-transparent" />
        <span className="relative eyebrow text-cyan">Overview</span>
        <span className="relative mt-2 font-display text-xl font-semibold leading-tight">Six freight solutions, one accountable team.</span>
        <span className="relative mt-4 inline-flex items-center gap-2 text-sm text-white/80">
          All services <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-1" />
        </span>
      </Link>
      <ul className="grid grid-cols-2 gap-1 p-3">
        {items.map((l, i) => (
          <li key={l.href}>
            <Link href={l.href} onClick={onNavigate} className="group flex h-full gap-3 rounded-lg p-3.5 transition-colors hover:bg-off">
              <span className="font-display text-xs font-semibold text-blue/70 tabular-nums">0{i + 1}</span>
              <span>
                <span className="block text-[0.9375rem] font-medium text-ink group-hover:text-blue">{l.label}</span>
                <span className="mt-0.5 block text-[0.8125rem] text-muted">{l.description}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SimplePanel({ links, onNavigate }: { links: NavLink[]; onNavigate: () => void }) {
  return (
    <ul className="w-[280px] p-2">
      {links.map((l) => (
        <li key={l.href}>
          <Link href={l.href} onClick={onNavigate} className="group block rounded-lg px-4 py-3 transition-colors hover:bg-off">
            <span className="block text-[0.9375rem] font-medium text-ink group-hover:text-blue">{l.label}</span>
            {l.description && <span className="mt-0.5 block text-[0.8125rem] text-muted">{l.description}</span>}
          </Link>
        </li>
      ))}
    </ul>
  );
}

function ContactPanel({ onNavigate }: { onNavigate: () => void }) {
  const links = contactLinks();
  return (
    <div className="w-[320px]">
      <ul className="p-2">
        {links.map((l) => {
          const inner = (
            <>
              <span className="flex size-9 shrink-0 items-center justify-center rounded-md border border-line text-blue transition-colors group-hover:border-blue/30 group-hover:bg-white">
                <ChannelIcon name={l.icon} />
              </span>
              <span className="min-w-0">
                <span className="block text-[0.9375rem] font-medium text-ink">{l.label}</span>
                {l.description && <span className="block truncate text-[0.8125rem] text-muted">{l.description}</span>}
              </span>
            </>
          );
          const cls = "group flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-off";
          return (
            <li key={l.label}>
              {l.external ? (
                <a
                  href={l.href}
                  onClick={onNavigate}
                  className={cls}
                  {...(l.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                >
                  {inner}
                </a>
              ) : (
                <Link href={l.href} onClick={onNavigate} className={cls}>
                  {inner}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
      <p className="border-t border-line bg-off px-5 py-3 text-[0.8125rem] text-muted">{site.tagline}</p>
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
    { key: "resources", label: "Resources", links: resourceLinks },
    { key: "contact", label: "Contact Us", links: contactLinks() },
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
                {[
                  { href: "/", label: "Home" },
                  { href: "/about", label: "About Us" },
                  { href: "/industries", label: "Industries" },
                ].map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      onClick={onClose}
                      aria-current={pathname === l.href ? "page" : undefined}
                      className="flex min-h-14 items-center font-display text-xl font-semibold text-ink aria-[current=page]:text-blue"
                    >
                      {l.label}
                    </Link>
                  </li>
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
