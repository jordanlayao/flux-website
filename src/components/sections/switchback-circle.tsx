"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MoveRight } from "lucide-react";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

export function SwitchbackCircle() {
  const sectionRef = useRef<HTMLElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current || !circleRef.current) return;

      gsap.fromTo(
        circleRef.current,
        { rotation: 0 },
        {
          rotation: 360,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="py-36">
      <div className="mx-auto max-w-[1216px] px-6">
        <div className="relative flex h-[811px] items-center overflow-hidden">
          <div
            ref={circleRef}
            className="absolute left-[493px] top-[44px] h-[721px] w-[723px] rounded-sm bg-surface-card"
          />

          <div className="relative z-10 flex w-[488px] flex-col gap-6">
            <p className="font-mono text-xs uppercase tracking-[0.72px] leading-[1.9]">
              Integrations
            </p>
            <h2 className="text-[34.18px] font-medium leading-[1.2] tracking-[-1.03px]">
              Connect Your Stack
            </h2>
            <p className="text-sm leading-[1.8] tracking-[-0.14px] text-text-muted">
              Flux doesn&apos;t replace your ERP or accounting system — it makes
              them better. Two-way sync keeps your data consistent across every
              platform.
            </p>
            <Link
              href="#"
              className="flex w-fit items-center gap-2 rounded border border-[#adadad]/50 bg-accent-surface px-3 py-1 text-sm text-accent-text transition-opacity hover:opacity-90"
            >
              Get Started
              <MoveRight size={24} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
