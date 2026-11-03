import type { CSSProperties, ReactNode } from "react";

/**
 * Scroll reveals are driven by CSS + one IntersectionObserver (see Effects.tsx).
 * Markup is fully visible without JavaScript; `html.motion-ready` opts it into
 * the hidden-until-in-view state, so content can never get stuck invisible.
 */

type RevealProps = {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "li" | "section" | "article";
  /** "up" fades and lifts; "clip" wipes an image open from the bottom. */
  variant?: "up" | "clip";
  /** Wait for the preloader before revealing (hero content). */
  hero?: boolean;
};

export function Reveal({ children, delay = 0, y, className, as = "div", variant = "up", hero }: RevealProps) {
  const Comp = as;
  const style = { "--d": `${delay}s`, ...(y !== undefined ? { "--ry": `${y}px` } : {}) } as CSSProperties;
  return (
    <Comp className={className} data-reveal={variant} data-hero={hero ? "" : undefined} style={style}>
      {children}
    </Comp>
  );
}

/** Masked line-by-line heading reveal. */
export function LineReveal({ lines, className, delay = 0, hero }: { lines: string[]; className?: string; delay?: number; hero?: boolean }) {
  return (
    <span className={className} data-reveal="lines" data-hero={hero ? "" : undefined} style={{ "--d": `${delay}s` } as CSSProperties}>
      {lines.map((line, i) => (
        <span key={i} className="line-mask">
          <span className="line-inner" style={{ "--i": i } as CSSProperties}>
            {line}
          </span>
        </span>
      ))}
    </span>
  );
}

/** Character-staggered display headline (hero use). Screen readers get the plain text. */
export function SplitChars({ lines, className, delay = 0, hero }: { lines: string[]; className?: string; delay?: number; hero?: boolean }) {
  let n = 0;
  return (
    <span className={className} data-reveal="chars" data-hero={hero ? "" : undefined} style={{ "--d": `${delay}s` } as CSSProperties}>
      <span className="sr-only">{lines.join(" ")}</span>
      {lines.map((line, li) => (
        <span key={li} aria-hidden className="line-mask">
          {line.split(" ").map((word, wi, arr) => (
            <span key={wi} className="inline-block whitespace-nowrap">
              {[...word].map((ch, ci) => (
                <span key={ci} className="char" style={{ "--i": n++ } as CSSProperties}>
                  {ch}
                </span>
              ))}
              {wi < arr.length - 1 && " "}
            </span>
          ))}
        </span>
      ))}
    </span>
  );
}

/** Paragraph whose words light up as it scrolls through the viewport. */
export function ScrubWords({ text, className }: { text: string; className?: string }) {
  const words = text.split(" ");
  return (
    <p className={className} data-scrub-words>
      <span className="sr-only">{text}</span>
      <span aria-hidden>
        {words.map((w, i) => (
          <span key={i} className="sw">
            {w}
            {i < words.length - 1 ? " " : ""}
          </span>
        ))}
      </span>
    </p>
  );
}

/** Number that counts up when scrolled into view. Server HTML shows the final value. */
export function CountUp({ value, suffix = "", className }: { value: number; suffix?: string; className?: string }) {
  return (
    <span className={className} data-count={value} data-suffix={suffix}>
      {value}
      {suffix}
    </span>
  );
}

/** Infinite horizontal ticker. */
export function Marquee({ items, className = "", speed = 40 }: { items: string[]; className?: string; speed?: number }) {
  const row = (
    <ul className="marquee-row" aria-hidden>
      {items.map((t, i) => (
        <li key={i} className="flex items-center gap-[0.6em]">
          <span>{t}</span>
          <span className="marquee-dot" />
        </li>
      ))}
    </ul>
  );
  return (
    <div className={`marquee ${className}`} style={{ "--speed": `${speed}s` } as CSSProperties}>
      <span className="sr-only">{items.join(", ")}</span>
      <div className="marquee-track">
        {row}
        {row}
      </div>
    </div>
  );
}
