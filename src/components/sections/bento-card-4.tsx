"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";

const ELLIPSE_CX = 348;
const ELLIPSE_CY = 240;
const ELLIPSE_RX = 280;
const ELLIPSE_RY = 110;
const ELLIPSE_ROTATION_DEG = -20;
const ELLIPSE_ROTATION = (ELLIPSE_ROTATION_DEG * Math.PI) / 180;

function getEllipsePoint(angle: number) {
  const x = ELLIPSE_RX * Math.cos(angle);
  const y = ELLIPSE_RY * Math.sin(angle);
  const cos = Math.cos(ELLIPSE_ROTATION);
  const sin = Math.sin(ELLIPSE_ROTATION);
  return {
    x: ELLIPSE_CX + x * cos - y * sin,
    y: ELLIPSE_CY + x * sin + y * cos,
  };
}

const tickers = [
  { name: "NVIDIA", logo: "/bento/NVIDIA.svg", startAngle: 0 },
  { name: "ADBE", logo: "/bento/ADBE.svg", startAngle: Math.PI * 0.5 },
  { name: "TSLA", logo: "/bento/Tesla.svg", startAngle: Math.PI },
  { name: "J&J", logo: "/bento/J&J.svg", startAngle: Math.PI * 1.5 },
];

export function BentoCard4() {
  const pillRefs = useRef<(HTMLDivElement | null)[]>([]);
  const { ref: inViewRef, inView } = useInView({ threshold: 0.1 });

  useEffect(() => {
    if (!inView) return;

    let animationId: number;
    let startTime: number | null = null;
    const speed = 0.0002;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;

      tickers.forEach((ticker, i) => {
        const el = pillRefs.current[i];
        if (!el) return;
        const angle = ticker.startAngle + elapsed * speed;
        const { x, y } = getEllipsePoint(angle);
        el.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px)`;
      });

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [inView]);

  return (
    <div ref={inViewRef} className="relative flex h-[557px] flex-col justify-end overflow-hidden rounded border border-border-card bg-[#1d1d1d] p-6">
      {/* Gradient background */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, #131212 30%, #3d3830 65%, #867c69 100%)",
        }}
      />
      {/* Grain overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.25] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.2' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
        }}
      />

      {/* Orbital ellipse ring — gradient stroke */}
      <div
        className="pointer-events-none absolute"
        style={{
          width: ELLIPSE_RX * 2,
          height: ELLIPSE_RY * 2,
          left: ELLIPSE_CX - ELLIPSE_RX,
          top: ELLIPSE_CY - ELLIPSE_RY,
          borderRadius: "50%",
          transform: `rotate(${ELLIPSE_ROTATION_DEG}deg)`,
          background: "linear-gradient(135deg, rgba(255,255,255,0.02), rgba(255,255,255,0.15))",
          padding: 1,
          WebkitMask: "radial-gradient(farthest-side, rgba(0,0,0,0.20) calc(100% - 1px), #000 calc(100% - 1px))",
          mask: "radial-gradient(farthest-side, rgba(0,0,0,0.05) calc(100% - 1px), #000 calc(100% - 1px))",
        }}
      />

      {/* Orbiting ticker pills */}
      {tickers.map((ticker, i) => (
        <div
          key={ticker.name}
          ref={(el) => { pillRefs.current[i] = el; }}
          className="absolute left-0 top-0 z-10 flex items-center gap-2 rounded border-[0.5px] border-[#3f3f3f] bg-[#161616] py-[2px] pl-[2px] pr-2"
        >
          <div className="flex size-[25px] shrink-0 items-center justify-center rounded bg-[#353535] p-1">
            <img
              src={ticker.logo}
              alt={ticker.name}
              className="max-h-[17px] max-w-[17px] brightness-0 invert"
            />
          </div>
          <span className="text-[21.88px] font-medium leading-[1.4] tracking-[-0.22px] text-white">
            {ticker.name}
          </span>
        </div>
      ))}

      {/* Bottom text */}
      <div className="relative z-10 flex flex-col gap-4">
        <h3 className="text-[27.34px] font-medium leading-[1.3] tracking-[-0.82px] text-[#f6f5f5]">
          Avoid blind spots
        </h3>
        <p className="text-[14px] font-normal leading-[1.8] tracking-[-0.14px] text-[#f6f5f5]">
          Identify changes in messaging, KPIs, and strategic focus over time.
        </p>
      </div>
    </div>
  );
}
