import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { BentoCard1 } from "@/components/sections/bento-card-1";
import { BentoCard2 } from "@/components/sections/bento-card-2";
import { BentoCard3 } from "@/components/sections/bento-card-3";
import { BentoCard4 } from "@/components/sections/bento-card-4";

export function BentoGrid() {
  return (
    <section className="bg-surface-elevated py-16">
      <div className="mx-auto max-w-[1216px] px-6">
        <ScrollReveal>
          <div className="flex flex-col items-center gap-4 text-center">
            <h2 className="max-w-[592px] text-[34.18px] font-medium leading-[1.2] tracking-[-1.03px]">
              For startups, global enterprises, and everyone in between.
            </h2>
            <p className="max-w-[384px] text-sm leading-[1.8] tracking-[-0.14px] text-text-muted">
              Simple defaults, direct integrations, and advanced customization
              means Ramp will scale with you.
            </p>
          </div>
        </ScrollReveal>

        <div className="mt-20 flex flex-col gap-8">
          <div className="flex gap-8">
            <ScrollReveal className="flex-[1.43]" delay={0.1}>
              <BentoCard1 />
            </ScrollReveal>
            <ScrollReveal className="flex-1" delay={0.2}>
              <BentoCard2 />
            </ScrollReveal>
          </div>
          <div className="flex gap-8">
            <ScrollReveal className="flex-1" delay={0.1}>
              <BentoCard3 />
            </ScrollReveal>
            <ScrollReveal className="flex-[1.43]" delay={0.2}>
              <BentoCard4 />
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
