"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function PageViewTracker() {
  const pathname = usePathname();

  useEffect(() => {
    const payload = JSON.stringify({ path: pathname, referrer: document.referrer });

    if (navigator.sendBeacon) {
      const blob = new Blob([payload], { type: "application/json" });
      navigator.sendBeacon("/api/track", blob);
    } else {
      fetch("/api/track", { method: "POST", body: payload, keepalive: true }).catch(() => {});
    }
  }, [pathname]);

  return null;
}
