"use client";

import Image from "next/image";
import { ScrollReveal } from "@/components/animations/scroll-reveal";

const testimonials = [
  {
    quote:
      "Flux is by far my favorite solution for our system. It's been a game changer for our team.",
    name: "Sam Sipe",
    role: "Head of Engineering, Scale",
    image: "/card-deck/frame-20.webp",
  },
  {
    quote:
      "Flux has truly transformed our system. It's easily my top choice and has made a significant impact on our team.",
    name: "Victor Howe",
    role: "Head of Engineering, Scale",
    image: "/card-deck/frame-21.webp",
  },
  {
    quote:
      "Flux has truly transformed our system. It's my top choice and has made a significant impact on our team.",
    name: "Jason Knoll",
    role: "Head of Design, Tesla",
    image: "/card-deck/frame-22.webp",
  },
  {
    quote:
      "Flux has revolutionized our system. It's my go-to solution and has greatly benefited our team.",
    name: "Bronson Washington",
    role: "Head of Design, Linear",
    image: "/card-deck/frame-23.webp",
  },
];

export function Testimonials() {
  return (
    <section className="bg-surface-elevated py-36">
      <div className="flex flex-col gap-20">
        <div className="flex gap-6 overflow-hidden pl-[max(24px,calc((100vw-1216px)/2+24px))]">
          {testimonials.map((t, i) => (
            <ScrollReveal key={t.name} delay={i * 0.1} className="shrink-0">
              <div className="relative h-[512px] w-[360px] overflow-hidden rounded-lg">
                <Image
                  src={t.image}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="360px"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/50" />
                <div className="relative z-[1] flex h-full flex-col justify-between p-6">
                  <p className="text-[22px] font-medium leading-[1.3] tracking-[-0.44px] text-white">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10">
                      <span className="text-[10px] font-medium text-white/70">
                        {t.name.split(" ").map(n => n[0]).join("")}
                      </span>
                    </div>
                    <div className="h-8 w-px bg-white/20" />
                    <div className="flex flex-col">
                      <span className="text-[14px] font-semibold leading-[1.6] text-white">
                        {t.name}
                      </span>
                      <span className="text-[12px] leading-[1.6] text-white/70">
                        {t.role}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <div className="mx-auto max-w-[1216px] px-6">
          <p className="font-mono text-xs uppercase leading-[1.9] tracking-[0.72px] text-white/50">
            Flux manages over $2.5B+ in daily cash flow and services 20,000
            product teams.
          </p>
        </div>
      </div>
    </section>
  );
}
