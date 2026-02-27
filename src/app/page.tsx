import { Navigation } from "@/components/sections/navigation";
import { Hero } from "@/components/sections/hero";
import { QuoteBlock } from "@/components/sections/quote-block";
import { TrustBar } from "@/components/sections/trust-bar";
import { BentoGrid } from "@/components/sections/bento-grid";
import { SwitchbackScroll } from "@/components/sections/switchback-scroll";
import { CardDeck } from "@/components/sections/card-deck";
import { SwitchbackCircle } from "@/components/sections/switchback-circle";
import { Testimonials } from "@/components/sections/testimonials";
import { FooterAnimation } from "@/components/sections/footer-animation";
import { GsapProvider } from "@/components/animations/gsap-provider";

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
