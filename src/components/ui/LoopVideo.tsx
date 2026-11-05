"use client";

import { useEffect, useRef } from "react";

/**
 * Muted background video that simply plays on a loop — no wipe-in, parallax or
 * other effects. It only loads and plays near the viewport, pauses off-screen,
 * and shows the poster image alone for reduced-motion visitors. The poster is also
 * set on approach, so it never competes with the first screen's downloads.
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
    if (!video) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!video.poster) video.poster = poster;
          if (reduced) return;
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
  }, [src, poster]);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <video
        ref={ref}
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
