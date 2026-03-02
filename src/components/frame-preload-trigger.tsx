"use client";

import { useEffect } from "react";
import { startFramePreload } from "@/lib/frame-preloader";

export function FramePreloadTrigger() {
  useEffect(() => {
    const onScroll = () => {
      const scrollRatio = window.scrollY / (document.body.scrollHeight - window.innerHeight);
      if (scrollRatio > 0.3) {
        startFramePreload();
        window.removeEventListener("scroll", onScroll);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return null;
}
