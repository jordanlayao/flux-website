"use client";

import { ScrollReveal } from "@/components/animations/scroll-reveal";

const testimonials = [
  {
    quote:
      '"Flux is by far my favorite solution for our system. It\'s been a game changer for our team."',
    name: "Sam Sipe",
    role: "Head of Engineering, Scale",
  },
  {
    quote:
      '"Flux has truly transformed our system. It\'s easily my top choice and has made a significant impact on our team."',
    name: "Victor Howe",
    role: "Head of Engineering, Scale",
  },
  {
    quote:
      '"Flux has truly transformed our system. It\'s my top choice and has made a significant impact on our team."',
    name: "Jason Knoll",
    role: "Head of Design, Tesla",
  },
  {
    quote:
      '"Flux has revolutionized our system. It\'s my go-to solution and has greatly benefited our team."',
    name: "Bronson Washington",
    role: "Head of Design, Linear",
  },
];

export function Testimonials() {
  return (
    <section className="bg-surface-elevated py-36">
      <div className="mx-auto max-w-[1216px] px-6">
        <div className="flex flex-col gap-20">
          <div className="flex gap-8 overflow-x-auto pb-4">
            {testimonials.map((t, i) => (
              <ScrollReveal key={t.name} delay={i * 0.1} className="shrink-0">
                <div className="flex h-[512px] w-[520px] flex-col justify-between overflow-hidden rounded border border-[#3c3c3c] bg-surface-card p-6">
                  <p className="text-[34.18px] font-medium leading-[1.2] tracking-[-1.03px] text-[#d9d9d9]">
                    {t.quote}
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="h-11 w-11 rounded-full bg-text-dim/30" />
                    <div className="h-11 w-px bg-border-feature" />
                    <div className="flex flex-col gap-1">
                      <span className="text-[17.5px] font-semibold leading-[1.6] tracking-[-0.18px] text-white">
                        {t.name}
                      </span>
                      <span className="text-sm leading-[1.8] tracking-[-0.14px] text-[#c9c8c8]">
                        {t.role}
                      </span>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <p className="text-center font-mono text-xs uppercase tracking-[0.72px] text-white leading-[1.9]">
            Flux manages over $2.5B+ in daily cash flow and services 20,000
            product teams.
          </p>
        </div>
      </div>
    </section>
  );
}
