"use client";

import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { GrainGradient } from "@paper-design/shaders-react";

export function Hero() {
  return (
    <section className="relative border-b border-border-default pb-36 pt-24 overflow-hidden">
      <GrainGradient
        speed={1}
        scale={1}
        rotation={-24}
        offsetX={0.1}
        offsetY={0}
        softness={0.32}
        intensity={0.5}
        noise={0.42}
        shape="corners"
        colors={["#4D4D4D", "#191919"]}
        colorBack="#00000000"
        className="!absolute inset-0 !w-full !h-full"
      />
      <div className="relative mx-auto max-w-[1216px] px-6">
        <ScrollReveal>
          <div className="flex flex-col gap-6">
            <div className="flex max-w-[796px] flex-col gap-4">
              <p className="font-mono text-xs uppercase tracking-[0.72px] text-text-primary leading-[1.9]">
                managing $2.5B+ in daily cash flow
              </p>
              <h1 className="text-[53.41px] font-medium leading-[1.1] tracking-[-1.6px]">
                Treasury intelligence that moves at the speed of your business
              </h1>
            </div>

            <p className="max-w-[696px] text-sm leading-[1.8] tracking-[-0.14px] text-text-secondary">
              Flux gives finance teams real-time visibility into cash across
              every entity, account, and currency. Stop reacting to
              yesterday&apos;s data. Start predicting tomorrow&apos;s cash
              position.
            </p>

            <div className="flex w-fit items-center gap-12 rounded-md border border-border-input/50 bg-[#1a1a1a] py-1 pl-3 pr-1">
              <span className="text-sm text-[#bdbdbd]">
                Whats your work email?
              </span>
              <button className="rounded bg-accent px-3 py-2 text-sm text-accent-text transition-opacity hover:opacity-90">
                Sign Up
              </button>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="mt-20 aspect-[1216/819] w-full rounded-lg border border-border-subtle/50 bg-[#1a1a1a]" />
        </ScrollReveal>
      </div>
    </section>
  );
}
