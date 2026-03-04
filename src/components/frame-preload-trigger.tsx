"use client";

import { useEffect } from "react";
import { startFramePreload } from "@/lib/frame-preloader";

export function FramePreloadTrigger() {
  useEffect(() => {
    // Cache scrollHeight once — avoids forced reflow on every scroll event
    let scrollableHeight = document.body.scrollHeight - window.innerHeight;

    const onScroll = () => {
      if (window.scrollY / scrollableHeight > 0.1) {
        startFramePreload();
        window.removeEventListener("scroll", onScroll);
        clearTimeout(timer);
      }
    };

    // Fallback: start preloading 3s after mount regardless of scroll position
    const timer = window.setTimeout(() => {
      startFramePreload();
      window.removeEventListener("scroll", onScroll);
    }, 3000);

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      clearTimeout(timer);
    };
  }, []);
  return null;
}
