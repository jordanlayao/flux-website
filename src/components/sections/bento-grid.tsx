import { ScrollReveal } from "@/components/animations/scroll-reveal";

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
              <div className="h-[557px] rounded border border-border-card bg-surface-card shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]" />
            </ScrollReveal>
            <ScrollReveal className="flex-1" delay={0.2}>
              <div className="h-[557px] rounded border border-border-card bg-surface-card" />
            </ScrollReveal>
          </div>
          <div className="flex gap-8">
            <ScrollReveal className="flex-1" delay={0.1}>
              <div className="h-[557px] rounded border border-border-card bg-surface-card" />
            </ScrollReveal>
            <ScrollReveal className="flex-[1.43]" delay={0.2}>
              <div className="h-[557px] rounded border border-border-card bg-surface-card" />
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
