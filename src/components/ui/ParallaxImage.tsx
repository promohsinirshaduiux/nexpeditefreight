import Image from "next/image";
import type { CSSProperties } from "react";

/**
 * Image that wipes open on first view and drifts with scroll inside its frame.
 * The frame's size comes from `className` (aspect ratio or height).
 */
export function ParallaxImage({
  src,
  alt,
  className = "",
  sizes = "100vw",
  priority,
  amount = 10,
  delay = 0,
  cursor,
}: {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  amount?: number;
  delay?: number;
  cursor?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden ${className}`}
      data-reveal="clip"
      data-cursor={cursor}
      style={{ "--d": `${delay}s` } as CSSProperties}
    >
      <div className="absolute inset-x-0 -inset-y-[14%]" data-parallax={amount}>
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />
      </div>
    </div>
  );
}
