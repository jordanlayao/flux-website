import dynamic from "next/dynamic";
import { Navigation } from "@/components/sections/navigation";
import { Hero } from "@/components/sections/hero";
import { GsapProvider } from "@/components/animations/gsap-provider";

const QuoteBlock = dynamic(() =>
  import("@/components/sections/quote-block").then((m) => m.QuoteBlock)
);
const TrustBar = dynamic(() =>
  import("@/components/sections/trust-bar").then((m) => m.TrustBar)
);
const BentoGrid = dynamic(() =>
  import("@/components/sections/bento-grid").then((m) => m.BentoGrid)
);
const SwitchbackScroll = dynamic(() =>
  import("@/components/sections/switchback-scroll").then(
    (m) => m.SwitchbackScroll
  )
);
const CardDeck = dynamic(() =>
  import("@/components/sections/card-deck").then((m) => m.CardDeck)
);
const SwitchbackCircle = dynamic(() =>
  import("@/components/sections/switchback-circle").then(
    (m) => m.SwitchbackCircle
  )
);
const Testimonials = dynamic(() =>
  import("@/components/sections/testimonials").then((m) => m.Testimonials)
);
const FooterAnimation = dynamic(() =>
  import("@/components/sections/footer-animation").then(
    (m) => m.FooterAnimation
  )
);

const onboardingCards = [
  {
    title: "Connect your accounts",
    description:
      "Link your bank accounts, credit cards, and payment processors. Flux handles the secure API connections—you never share credentials.",
  },
  {
    title: "Map your entities",
    description:
      "Tell Flux about your org structure. Which accounts belong to which entities? What are your approval thresholds? Set it once, forget it forever.",
  },
  {
    title: "Start predicting",
    description:
      "Flux begins learning your cash patterns immediately. Within 48 hours, you'll have your first AI-generated forecast. The longer it runs, the smarter it gets.",
  },
];

export default function Home() {
  return (
    <GsapProvider>
      <Navigation />
      <Hero />
      <QuoteBlock />
      <TrustBar />
      <BentoGrid />
      <SwitchbackScroll />
      <CardDeck cards={onboardingCards} />
      <SwitchbackCircle />
      <Testimonials />
      <FooterAnimation />
    </GsapProvider>
  );
}
