"use client";

import { ScrollReveal } from "@/components/animations/scroll-reveal";

const logos = [
  { name: "Logo 1", src: "/trustbar logos/Vector.svg" },
  { name: "Logo 2", src: "/trustbar logos/Vector-1.svg" },
  { name: "Logo 3", src: "/trustbar logos/Vector-2.svg" },
  { name: "Logo 4", src: "/trustbar logos/Vector-3.svg" },
  { name: "Logo 5", src: "/trustbar logos/Vector-4.svg" },
  { name: "Logo 6", src: "/trustbar logos/Vector-5.svg" },
  { name: "Logo 7", src: "/trustbar logos/Vector-6.svg" },
];

export function TrustBar() {
  return (
    <section className="py-36 pb-60">
      <div className="mx-auto max-w-[1216px] px-6">
        <ScrollReveal>
          <div className="flex flex-col gap-8">
            <p className="text-center font-mono text-xs uppercase tracking-[0.72px] text-white leading-[1.9]">
              Flux manages over $2.5B+ in daily cash flow and services 20,000
              product teams.
            </p>

            <div className="relative overflow-hidden">
              {/* Left fade */}
              <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-[#171616] to-transparent" />
              {/* Right fade */}
              <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-[#171616] to-transparent" />

              <div className="flex w-max animate-scroll">
                {[...logos, ...logos].map((logo, i) => (
                  <div
                    key={`${logo.name}-${i}`}
                    className="flex shrink-0 items-center justify-center px-10"
                  >
                    <img
                      src={logo.src}
                      alt={logo.name}
                      className="h-6 w-auto opacity-50 brightness-0 invert transition-opacity hover:opacity-80"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
