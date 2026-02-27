import { ScrollReveal } from "@/components/animations/scroll-reveal";

const logos = [
  { name: "Company 1", width: 91 },
  { name: "Company 2", width: 120 },
  { name: "Company 3", width: 101 },
  { name: "Company 4", width: 133 },
  { name: "Company 5", width: 90 },
  { name: "Company 6", width: 58 },
  { name: "Company 7", width: 77 },
];

export function TrustBar() {
  return (
    <section className="py-36">
      <div className="mx-auto max-w-[1216px] px-6">
        <ScrollReveal>
          <div className="flex flex-col gap-8">
            <p className="text-center font-mono text-xs uppercase tracking-[0.72px] text-white leading-[1.9]">
              Flux manages over $2.5B+ in daily cash flow and services 20,000
              product teams.
            </p>

            <div className="flex items-center justify-between">
              {logos.map((logo) => (
                <div
                  key={logo.name}
                  className="h-6 rounded bg-text-dim/20"
                  style={{ width: logo.width }}
                />
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
