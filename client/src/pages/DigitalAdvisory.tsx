import HeroSection from "@/components/sections/HeroSection";
import ValuePropositionSection from "@/components/sections/ValuePropositionSection";
import GoalBasedInvestingSection from "@/components/sections/GoalBasedInvestingSection";
import QuizSection from "@/components/sections/QuizSection";
import VerticalScrollComparison from "@/components/sections/VerticalScrollComparison";
import HowItWorksSection from "@/components/sections/HowItWorksSection";
import TrustSection from "@/components/sections/TrustSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import PortfoliosSection from "@/components/sections/PortfoliosSection";
import PricingSection from "@/components/sections/PricingSection";
import WhyNowSection from "@/components/sections/WhyNowSection";
import ClosingSection from "@/components/sections/ClosingSection";

export default function DigitalAdvisory() {
  return (
    <div>
      <HeroSection />
      <ValuePropositionSection />
      <GoalBasedInvestingSection />
      <QuizSection />
      <VerticalScrollComparison />
      <div id="how-it-works">
        <HowItWorksSection />
      </div>
      <TrustSection />
      <FeaturesSection />
      <PortfoliosSection />
      <PricingSection />
      <WhyNowSection />
      <ClosingSection />
    </div>
  );
}
