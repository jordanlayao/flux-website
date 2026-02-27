import { ScrollReveal } from "@/components/animations/scroll-reveal";

export function QuoteBlock() {
  return (
    <section className="py-36">
      <div className="mx-auto max-w-[1216px] px-6">
        <ScrollReveal>
          <p className="max-w-[1112px] text-[42.72px] font-medium leading-[1.1] tracking-[-1.28px]">
            <span className="text-text-muted">
              Finance teams waste hours every day logging into dozens of banking
              portals and wrestling with spreadsheets just to answer one
              question: where&apos;s our cash?
            </span>
            <span className="text-text-primary">
              {" "}
              By the time you&apos;ve aggregated the data and updated your
              forecast, the numbers are already stale.
            </span>
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
