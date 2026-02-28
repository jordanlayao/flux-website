"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, SplitText);

const MUTED_TEXT =
  "Finance teams waste hours every day logging into dozens of banking portals and wrestling with spreadsheets just to answer one question: where's our cash?";

const HIGHLIGHT_TEXT =
  "By the time you've aggregated the data and updated your forecast, the numbers are already stale.";

export function QuoteBlock() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      if (!textRef.current) return;

      const split = SplitText.create(textRef.current, {
        type: "words, chars",
      });

      gsap.fromTo(
        split.chars,
        { color: "#3a3a3a" },
        {
          color: "#f6f5f5",
          stagger: 0.1,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            scrub: true,
            start: "top 80%",
            end: "center 35%",
          },
        }
      );

      return () => {
        split.revert();
      };
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="flex min-h-screen items-center py-36">
      <div className="mx-auto max-w-[1216px] px-6">
        <p
          ref={textRef}
          className="max-w-[1112px] text-[42.72px] font-medium leading-[1.1] tracking-[-1.28px] text-pretty"
          style={{ textWrap: "pretty" }}
        >
          {MUTED_TEXT} {HIGHLIGHT_TEXT}
        </p>
      </div>
    </section>
  );
}
