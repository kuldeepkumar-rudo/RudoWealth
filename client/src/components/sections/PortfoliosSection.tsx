import PortfolioCard from "../PortfolioCard";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

export default function PortfoliosSection() {
  const portfolios = [
    {
      icon: "🔒",
      title: "Capital Guardian",
      strategy: "Preservation Strategy",
      allocation: "100% Bonds",
      returns: "3-5%*",
      risk: "Low",
      forGoal: "Capital safety"
    },
    {
      icon: "🛡️",
      title: "Wealth Protector",
      strategy: "Conservative Strategy",
      allocation: "40/60",
      returns: "4-6%*",
      risk: "Low-Moderate",
      forGoal: "Steady income"
    },
    {
      icon: "🎯",
      title: "Steady Builder",
      strategy: "Balanced Strategy",
      allocation: "60/40",
      returns: "6-8%*",
      risk: "Moderate",
      forGoal: "First home, education"
    },
    {
      icon: "⚡",
      title: "Wealth Accelerator",
      strategy: "Growth Strategy",
      allocation: "80/20",
      returns: "8-12%*",
      risk: "Moderate-High",
      forGoal: "Financial independence"
    },
    {
      icon: "🚀",
      title: "Wealth Maximizer",
      strategy: "Aggressive Growth",
      allocation: "100% Equities",
      returns: "10-14%*",
      risk: "High",
      forGoal: "Long-term wealth (10+ years)"
    }
  ];

  const [location, setLocation] = useLocation();

  return (
    <section className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Five portfolios. Every ambition.
          </h2>
        </div>

        <div className="overflow-x-auto mb-8 pb-4">
          <div className="flex gap-6 snap-x snap-mandatory">
            {portfolios.map((portfolio, index) => (
              <div key={index} className="snap-start min-w-[280px] md:min-w-[320px] flex-shrink-0">
                <PortfolioCard
                  {...portfolio}
                  testId={`portfolio-${index}`}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-6">
            *Based on historical market data. Past performance doesn't guarantee future results.
          </p>
          <Button size="lg" onClick={()=>setLocation("/quiz")} data-testid="button-find-portfolio">
            Find Your Portfolio →
          </Button>
        </div>
      </div>
    </section>
  );
}
