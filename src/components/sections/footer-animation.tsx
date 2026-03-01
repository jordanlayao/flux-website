"use client";

import { useEffect, useRef, useCallback } from "react";
import Link from "next/link";

const CONFIG = {
  TOTAL_FRAMES: 386,
  PRELOAD_BLOCKING: 20,
  HI_SWAP_DELAY: 350,
  HI_SWAP_RADIUS: 15,
  EASING: [0.25, 0.1, 0.35, 1.0] as const,
  ENTRY_FADE_END: 0.15,
  TEXT_FADE_IN_START: 0.28,
  TEXT_FADE_IN_END: 0.42,
  TEXT_FADE_OUT_START: 0.68,
  TEXT_FADE_OUT_END: 0.82,
  CTA_DELAY: 0.06,
  EXIT_FADE_START: 0.85,
  EXIT_FADE_END: 1.0,
};

function makeCubicBezier(p1x: number, p1y: number, p2x: number, p2y: number) {
  const SAMPLES = 11;
  const sampleValues = new Float32Array(SAMPLES);
  const A = (a1: number, a2: number) => 1.0 - 3.0 * a2 + 3.0 * a1;
  const B = (a1: number, a2: number) => 3.0 * a2 - 6.0 * a1;
  const C = (a1: number) => 3.0 * a1;
  const calcBezier = (t: number, a1: number, a2: number) =>
    ((A(a1, a2) * t + B(a1, a2)) * t + C(a1)) * t;
  const getSlope = (t: number, a1: number, a2: number) =>
    3.0 * A(a1, a2) * t * t + 2.0 * B(a1, a2) * t + C(a1);

  const step = 1.0 / (SAMPLES - 1);
  for (let i = 0; i < SAMPLES; i++)
    sampleValues[i] = calcBezier(i * step, p1x, p2x);

  function getTForX(x: number) {
    let start = 0;
    const dist = 1.0 / (SAMPLES - 1);
    for (let i = 1; i < SAMPLES - 1; i++) {
      if (sampleValues[i] > x) {
        start = i - 1;
        break;
      }
    }
    let t =
      start * dist +
      ((x - sampleValues[start]) /
        (sampleValues[start + 1] - sampleValues[start])) *
        dist;
    for (let i = 0; i < 4; i++) {
      const s = getSlope(t, p1x, p2x);
      if (s === 0) break;
      t -= (calcBezier(t, p1x, p2x) - x) / s;
    }
    return t;
  }

  return (x: number) => {
    if (x <= 0) return 0;
    if (x >= 1) return 1;
    return calcBezier(getTForX(x), p1y, p2y);
  };
}

function bspOrder(total: number) {
  const order: number[] = [];
  const queue: [number, number][] = [[0, total - 1]];
  while (queue.length > 0) {
    const [start, end] = queue.shift()!;
    if (start > end) continue;
    const mid = Math.floor((start + end) / 2);
    order.push(mid);
    queue.push([start, mid - 1]);
    queue.push([mid + 1, end]);
  }
  return order;
}

const clamp01 = (v: number) => Math.max(0, Math.min(1, v));
const lerpRange = (p: number, start: number, end: number) =>
  clamp01((p - start) / (end - start));

const footerColumns = [
  {
    title: "Product",
    links: [
      "Intake",
      "Plan",
      "Build",
      "Reviews",
      "Monitor",
      "Pricing",
      "Security",
    ],
  },
  {
    title: "Features",
    links: [
      "Asks",
      "Agents",
      "Customer Requests",
      "Insights",
      "Mobile",
      "Integrations",
      "Changelog",
    ],
  },
  {
    title: "Company",
    links: [
      "About",
      "Customers",
      "Careers",
      "Blog",
      "Method",
      "Quality",
      "Brand",
    ],
  },
  {
    title: "Resources",
    links: [
      "Switch",
      "Download",
      "Documentation",
      "Developers",
      "Status",
      "Enterprise",
      "Startups",
    ],
  },
  {
    title: "Connect",
    links: ["Contact us", "Community", "X (Twitter)", "GitHub", "YouTube"],
  },
];

export function FooterAnimation() {
  const tunnelRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const entryRef = useRef<HTMLDivElement>(null);
  const exitRef = useRef<HTMLDivElement>(null);
  const textWrapRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const loaderRef = useRef<HTMLDivElement>(null);

  const stateRef = useRef({
    loFrames: new Array<ImageBitmap | HTMLImageElement | null>(
      CONFIG.TOTAL_FRAMES
    ).fill(null),
    loLoaded: new Array<boolean>(CONFIG.TOTAL_FRAMES).fill(false),
    hiFrames: new Array<ImageBitmap | HTMLImageElement | null>(
      CONFIG.TOTAL_FRAMES
    ).fill(null),
    hiLoaded: new Array<boolean>(CONFIG.TOTAL_FRAMES).fill(false),
    rawScrollProgress: 0,
    targetFrameF: 0,
    currentFrameF: 0,
    lastScrollY: 0,
    scrollDir: 1,
    isScrolling: false,
    rafId: 0,
    initialLoadDone: false,
    lastDrawnFrame: -1,
    hiSwapTimer: 0,
    isMobile: false,
    tunnelTop: 0,
    tunnelH: 1,
  });

  const ease = useRef(makeCubicBezier(...CONFIG.EASING)).current;

  const framePath = useCallback((n: number, quality: string) => {
    const prefix = stateRef.current.isMobile ? "mobile" : "desktop";
    return `/frames/${prefix}-${quality}/frame_${String(n).padStart(4, "0")}.jpg`;
  }, []);

  const drawImage = useCallback(
    (img: ImageBitmap | HTMLImageElement) => {
      const ctx = ctxRef.current;
      const canvas = canvasRef.current;
      if (!ctx || !canvas) return;

      const cw = canvas.width;
      const ch = canvas.height;
      const iw = "naturalWidth" in img ? img.naturalWidth : img.width;
      const ih = "naturalHeight" in img ? img.naturalHeight : img.height;
      if (!iw || !ih) return;

      const scale = Math.max(cw / iw, ch / ih);
      const dw = iw * scale;
      const dh = ih * scale;
      const dx = (cw - dw) / 2;
      const dy = (ch - dh) / 2;
      ctx.drawImage(img, dx, dy, dw, dh);
    },
    []
  );

  const drawFrame = useCallback(
    (index: number) => {
      const s = stateRef.current;
      const f = Math.max(
        0,
        Math.min(CONFIG.TOTAL_FRAMES - 1, Math.round(index))
      );

      let img = s.hiLoaded[f]
        ? s.hiFrames[f]
        : s.loLoaded[f]
          ? s.loFrames[f]
          : null;

      if (!img) {
        for (let delta = 1; delta < 30; delta++) {
          for (const dir of [s.scrollDir, -s.scrollDir]) {
            const ri = f + delta * dir;
            if (ri >= 0 && ri < CONFIG.TOTAL_FRAMES && s.loLoaded[ri]) {
              img = s.hiLoaded[ri] ? s.hiFrames[ri] : s.loFrames[ri];
              break;
            }
          }
          if (img) break;
        }
        if (!img) return;
      }

      drawImage(img);
    },
    [drawImage]
  );

  const updateOverlays = useCallback(() => {
    const p = stateRef.current.rawScrollProgress;

    if (entryRef.current) {
      entryRef.current.style.opacity = String(
        1 - lerpRange(p, 0, CONFIG.ENTRY_FADE_END)
      );
    }

    const textIn = lerpRange(
      p,
      CONFIG.TEXT_FADE_IN_START,
      CONFIG.TEXT_FADE_IN_END
    );
    const textOut = lerpRange(
      p,
      CONFIG.TEXT_FADE_OUT_START,
      CONFIG.TEXT_FADE_OUT_END
    );
    const textAlpha = textIn * (1 - textOut);

    if (headlineRef.current) {
      const clipPct = Math.round((1 - textIn) * 100);
      headlineRef.current.style.clipPath = `inset(0 0 ${clipPct}% 0)`;
      headlineRef.current.style.opacity = String(1 - textOut);
    }

    if (ctaRef.current) {
      const ctaIn = lerpRange(
        p,
        CONFIG.TEXT_FADE_IN_START + CONFIG.CTA_DELAY,
        CONFIG.TEXT_FADE_IN_END + CONFIG.CTA_DELAY
      );
      ctaRef.current.style.opacity = String(ctaIn * (1 - textOut));
      ctaRef.current.style.transform = `translateY(${(1 - ctaIn) * 8}px)`;
    }

    if (textWrapRef.current) {
      textWrapRef.current.style.opacity = textAlpha > 0.01 ? "1" : "0";
    }

    if (exitRef.current) {
      exitRef.current.style.opacity = String(
        lerpRange(p, CONFIG.EXIT_FADE_START, CONFIG.EXIT_FADE_END)
      );
    }
  }, []);

  useEffect(() => {
    const s = stateRef.current;
    s.isMobile = window.innerWidth <= 768;

    const canvas = canvasRef.current;
    if (!canvas) return;
    ctxRef.current = canvas.getContext("2d", { alpha: false });

    const cacheTunnelRect = () => {
      const tunnel = tunnelRef.current;
      if (!tunnel) return;
      s.tunnelTop = tunnel.offsetTop;
      s.tunnelH = tunnel.offsetHeight - window.innerHeight;
    };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      ctxRef.current = canvas.getContext("2d", { alpha: false });
      s.isMobile = window.innerWidth <= 768;
      s.lastDrawnFrame = -1;
      cacheTunnelRect();
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const tick = () => {
      const delta = s.targetFrameF - s.currentFrameF;
      const lerpFactor = s.isScrolling ? 0.3 : 0.15;
      if (Math.abs(delta) < 0.01) {
        s.currentFrameF = s.targetFrameF;
      } else {
        s.currentFrameF += delta * lerpFactor;
      }

      const frameIdx = Math.round(s.currentFrameF);
      if (frameIdx !== s.lastDrawnFrame) {
        drawFrame(s.currentFrameF);
        s.lastDrawnFrame = frameIdx;
      }

      updateOverlays();
      s.rafId = requestAnimationFrame(tick);
    };

    const swapToHiRes = () => {
      if (s.isScrolling) return;
      const center = Math.round(s.currentFrameF);
      const start = Math.max(0, center - CONFIG.HI_SWAP_RADIUS);
      const end = Math.min(
        CONFIG.TOTAL_FRAMES - 1,
        center + CONFIG.HI_SWAP_RADIUS
      );

      for (let i = start; i <= end; i++) {
        if (s.hiLoaded[i]) continue;
        loadBitmap(framePath(i + 1, "hi"))
          .then((bitmap) => {
            s.hiFrames[i] = bitmap;
            s.hiLoaded[i] = true;
            s.lastDrawnFrame = -1;
          })
          .catch(() => {});
      }
    };

    let scrollEndTimer = 0;

    const onScroll = () => {
      const scrolled = window.scrollY - s.tunnelTop;
      s.rawScrollProgress = clamp01(scrolled / s.tunnelH);

      s.scrollDir = window.scrollY > s.lastScrollY ? 1 : -1;
      s.lastScrollY = window.scrollY;

      const easedP = ease(s.rawScrollProgress);
      s.targetFrameF = easedP * (CONFIG.TOTAL_FRAMES - 1);
      s.isScrolling = true;

      clearTimeout(scrollEndTimer);
      scrollEndTimer = window.setTimeout(() => {
        s.isScrolling = false;
      }, 100);

      clearTimeout(s.hiSwapTimer);
      s.hiSwapTimer = window.setTimeout(swapToHiRes, CONFIG.HI_SWAP_DELAY);
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    async function loadBitmap(
      url: string
    ): Promise<ImageBitmap | HTMLImageElement> {
      try {
        const resp = await fetch(url);
        const blob = await resp.blob();
        return await createImageBitmap(blob);
      } catch {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = () => resolve(img);
          img.onerror = reject;
          img.src = url;
        });
      }
    }

    const CONCURRENCY = 8;
    let activeLoads = 0;
    const pending = new Set<number>();
    for (let i = 0; i < CONFIG.TOTAL_FRAMES; i++) pending.add(i);
    let readyCount = 0;

    function pickNext(): number | null {
      if (pending.size === 0) return null;
      const center = Math.round(s.targetFrameF);
      let best: number | null = null;
      let bestDist = Infinity;
      for (const idx of pending) {
        const dist = Math.abs(idx - center);
        if (dist < bestDist) {
          bestDist = dist;
          best = idx;
        }
      }
      return best;
    }

    function loadNext() {
      while (activeLoads < CONCURRENCY) {
        const idx = pickNext();
        if (idx === null) return;
        pending.delete(idx);
        activeLoads++;

        loadBitmap(framePath(idx + 1, "lo"))
          .then((bitmap) => {
            s.loFrames[idx] = bitmap;
            s.loLoaded[idx] = true;
            readyCount++;

            if (readyCount === CONFIG.PRELOAD_BLOCKING && !s.initialLoadDone) {
              s.initialLoadDone = true;
              if (loaderRef.current) {
                loaderRef.current.style.opacity = "0";
                loaderRef.current.style.pointerEvents = "none";
              }
              cacheTunnelRect();
              drawFrame(0);
              s.rafId = requestAnimationFrame(tick);
              onScroll();
            }
          })
          .catch(() => {})
          .finally(() => {
            activeLoads--;
            loadNext();
          });
      }
    }

    loadNext();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(s.rafId);
      clearTimeout(scrollEndTimer);
      clearTimeout(s.hiSwapTimer);
      pending.clear();
    };
  }, [drawFrame, updateOverlays, ease, framePath]);

  return (
    <section>
      {/* Scroll tunnel — tall container that drives the animation */}
      <div
        ref={tunnelRef}
        className="relative"
        style={{ height: "1200vh" }}
      >
        <div className="sticky top-0 h-screen w-full overflow-hidden bg-black">
          {/* Canvas */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 block h-full w-full"
            style={{ willChange: "transform" }}
          />

          {/* Entry black fade-in */}
          <div
            ref={entryRef}
            className="pointer-events-none absolute inset-0 z-[2] bg-[#171616]"
          />

          {/* Text overlay */}
          <div className="pointer-events-none absolute inset-0 z-[3] flex flex-col items-center justify-center gap-7 px-6">
            <div
              ref={textWrapRef}
              className="flex flex-col items-center gap-7 opacity-0"
              style={{ transform: "translateY(12px)" }}
            >
              <h2
                ref={headlineRef}
                className="text-center text-[42.72px] font-medium leading-[1.1] tracking-[-1.28px] text-[#f6f5f5]"
                style={{
                  clipPath: "inset(0 0 100% 0)",
                }}
              >
                <span className="block">Built for the future.</span>
                <span className="block">Available today.</span>
              </h2>
              <div
                ref={ctaRef}
                className="flex gap-2.5 opacity-0"
                style={{ transform: "translateY(8px)" }}
              >
                <Link
                  href="#"
                  className="inline-flex items-center rounded border-[0.5px] border-[#adadad] bg-[#f9fefa] px-3 py-1 text-[14px] font-normal leading-[1.8] tracking-[-0.14px] text-[#042708] transition-all hover:-translate-y-px hover:opacity-90"
                >
                  Get Started
                </Link>
                <Link
                  href="#"
                  className="inline-flex items-center rounded border-[0.5px] border-[#363636] bg-[#262626] px-3 py-1 text-[14px] font-normal leading-[1.8] tracking-[-0.14px] text-[#f9fefa] transition-all hover:-translate-y-px hover:opacity-90"
                >
                  Contact Sales
                </Link>
              </div>
            </div>
          </div>

          {/* Exit fade into footer */}
          <div
            ref={exitRef}
            className="pointer-events-none absolute inset-0 z-[4] bg-[#0f0f0f] opacity-0"
          />

          {/* Loader */}
          <div
            ref={loaderRef}
            className="absolute inset-0 z-10 flex items-center justify-center bg-black transition-opacity duration-600"
          >
            <div className="relative h-px w-[120px] overflow-hidden bg-white/10">
              <div className="absolute left-[-100%] top-0 h-full w-full animate-[loaderSlide_1.2s_ease_infinite] bg-white/60" />
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-[1] bg-[#0f0f0f] px-12 pb-12 pt-[72px]">
        <div className="mx-auto max-w-[1200px]">
          <div className="grid grid-cols-[180px_repeat(5,1fr)] gap-6 border-b border-white/7 pb-14">
            <div className="flex items-start pt-0.5">
              <Link href="/" className="flex items-center">
                <img src="/logo/flux-logo.svg" alt="Flux" className="h-6 w-auto brightness-0 invert" />
              </Link>
            </div>

            {footerColumns.map((col) => (
              <div key={col.title}>
                <p className="mb-[18px] text-xs font-medium uppercase tracking-[0.06em] text-white/50">
                  {col.title}
                </p>
                <ul className="flex flex-col gap-2.5">
                  {col.links.map((link) => (
                    <li key={link}>
                      <Link
                        href="#"
                        className="text-[13px] font-light leading-[1.4] text-[#9a9a9a] transition-colors hover:text-white/80"
                      >
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-6 pt-7">
            <div className="flex items-center">
              <Link
                href="#"
                className="text-xs text-[#6b6b6b] transition-colors hover:text-white/50"
              >
                Privacy
              </Link>
              <span className="mx-2 text-white/7">·</span>
              <Link
                href="#"
                className="text-xs text-[#6b6b6b] transition-colors hover:text-white/50"
              >
                Terms
              </Link>
              <span className="mx-2 text-white/7">·</span>
              <Link
                href="#"
                className="text-xs text-[#6b6b6b] transition-colors hover:text-white/50"
              >
                DPA
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </section>
  );
}
