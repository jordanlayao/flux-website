import { ScrollReveal } from "@/components/animations/scroll-reveal";

interface CardDeckProps {
  cards: {
    title: string;
    description: string;
    illustration?: string;
  }[];
}

export function CardDeck({ cards }: CardDeckProps) {
  return (
    <section className="py-36">
      <div className="mx-auto max-w-[1216px] px-6">
        <div className="flex gap-8">
          {cards.map((card, i) => (
            <ScrollReveal
              key={card.title}
              className="flex flex-1 flex-col gap-8 overflow-hidden"
              delay={i * 0.15}
            >
              <div className="flex h-[288px] w-full items-center justify-center rounded">
                {card.illustration && (
                  <img
                    src={card.illustration}
                    alt=""
                    className="h-full w-full object-contain"
                  />
                )}
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-[21.88px] font-medium leading-[1.4] tracking-[-0.22px]">
                  {card.title}
                </h3>
                <p className="text-sm leading-[1.8] tracking-[-0.14px] text-text-muted">
                  {card.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
