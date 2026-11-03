"use client";

import { useEffect, useState } from "react";
import { PakistanFlag } from "@/components/ui/primitives";

/** Live clock for Pakistan Standard Time (UTC+5), ticking every second. */
export function PakistanClock() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    const tick = () => setNow(new Date());
    const first = window.setTimeout(tick, 0);
    const id = window.setInterval(tick, 1000);
    return () => {
      window.clearTimeout(first);
      window.clearInterval(id);
    };
  }, []);

  const time = now
    ? new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Karachi", hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false }).format(now)
    : "--:--:--";

  return (
    <p className="flex items-center gap-2.5 text-[0.875rem] text-muted">
      <PakistanFlag />
      <span>
        Pakistan <span className="font-display font-semibold tabular-nums text-ink">{time}</span> PKT
      </span>
    </p>
  );
}
