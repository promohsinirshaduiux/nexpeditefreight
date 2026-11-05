import type { CSSProperties } from "react";
import { srcSetFor } from "@/lib/images";

/**
 * Image that wipes open on first view and drifts with scroll inside its frame.
 * The frame's size comes from `className` (aspect ratio or height).
 */
export function ParallaxImage({
  src,
  alt,
  className = "",
  priority,
  amount = 10,
  delay = 0,
  cursor,
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  amount?: number;
  delay?: number;
  cursor?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden ${className}`}
      data-reveal="clip"
      data-hero={priority ? "" : undefined}
      data-cursor={cursor}
      style={{ "--d": `${delay}s` } as CSSProperties}
    >
      <div className="absolute inset-x-0 -inset-y-[14%]" data-parallax={amount}>
        <img src={src} srcSet={srcSetFor(src)} sizes="(max-width: 1023px) 100vw, 50vw" alt={alt} className="absolute inset-0 size-full object-cover" fetchPriority={priority ? "high" : "auto"} loading={priority ? "eager" : "lazy"} decoding="async" />
      </div>
    </div>
  );
}
