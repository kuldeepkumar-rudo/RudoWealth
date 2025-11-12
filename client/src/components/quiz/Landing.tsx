import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import { useLocation } from "wouter";
import { CurrencySelector } from "@/components/currency-selector";

export default function Landing() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-semibold text-foreground tracking-tight">
            RuDo Wealth
          </h1>
          
          <div className="flex flex-col items-center gap-2">
            <p className="text-sm text-muted-foreground">Select your currency:</p>
            <CurrencySelector />
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground text-center">
            Discover Your Investment Profile
          </h2>
          
          <p className="text-base text-muted-foreground text-center leading-relaxed">
            Understanding your financial DNA helps us recommend the right portfolio for your goals
          </p>
        </div>

        <div className="space-y-3">
          {[
            "Takes 4-5 minutes",
            "Completely confidential",
            "Personalized recommendations"
          ].map((benefit) => (
            <div key={benefit} className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
              <span className="text-base text-foreground">{benefit}</span>
            </div>
          ))}
        </div>

        <Button
          className="w-full h-12 text-base font-semibold"
          onClick={() => setLocation("/assessment/1")}
          data-testid="button-get-started"
        >
          Get Started
        </Button>

        <p className="text-xs text-muted-foreground text-center leading-relaxed">
          Regulatory: This assessment helps us ensure investment suitability
        </p>
      </Card>
    </div>
  );
}
