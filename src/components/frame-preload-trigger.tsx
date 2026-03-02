"use client";

import { useEffect } from "react";
import { startFramePreload } from "@/lib/frame-preloader";

export function FramePreloadTrigger() {
  useEffect(() => {
    startFramePreload();
  }, []);
  return null;
}
