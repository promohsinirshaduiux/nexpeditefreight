"use client";

import { useEffect, useRef } from "react";

/**
 * Muted background video that simply plays on a loop — no wipe-in, parallax or
 * other effects. It only loads and plays near the viewport, pauses off-screen,
 * and shows the poster image alone for reduced-motion visitors.
 */
export function LoopVideo({
  src,
  poster,
  label,
  className = "",
}: {
  src: string;
  poster: string;
  /** Describes the footage for screen readers. */
  label: string;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!video.src) video.src = src;
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { rootMargin: "200px 0px" },
    );
    io.observe(video);
    return () => io.disconnect();
  }, [src]);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <video
        ref={ref}
        poster={poster}
        muted
        loop
        playsInline
        preload="none"
        aria-label={label}
        className="absolute inset-0 size-full object-cover"
      />
    </div>
  );
}
