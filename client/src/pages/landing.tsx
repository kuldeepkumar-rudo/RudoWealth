import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import { useLocation } from "wouter";
import { CurrencySelector } from "@/components/currency-selector";

export default function Landing() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-10 space-y-10">
        <div className="text-center space-y-6">
          <h1 className="text-3xl font-bold text-foreground tracking-tight">
            RuDo Wealth
          </h1>
          
          <div className="flex flex-col items-center gap-3">
            <p className="text-sm text-muted-foreground uppercase tracking-wider font-medium">Select your currency:</p>
            <CurrencySelector />
          </div>
        </div>

        <div className="space-y-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground leading-tight">
            Discover Your Investment Profile
          </h2>
          
          <p className="text-lg text-muted-foreground leading-relaxed max-w-sm mx-auto">
            Understanding your financial DNA helps us recommend the right portfolio for your goals
          </p>
        </div>

        <div className="space-y-4">
          {[
            "Takes 4-5 minutes",
            "Completely confidential",
            "Personalized recommendations"
          ].map((benefit) => (
            <div key={benefit} className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <CheckCircle2 className="w-4 h-4 text-primary" />
              </div>
              <span className="text-base text-foreground font-medium">{benefit}</span>
            </div>
          ))}
        </div>

        <Button
          className="w-full h-14 text-base font-bold"
          onClick={() => setLocation("/assessment/1")}
          data-testid="button-get-started"
        >
          Get Started
        </Button>

        <p className="text-xs text-muted-foreground text-center leading-relaxed">
          This assessment helps us ensure investment suitability
        </p>
      </Card>
    </div>
  );
}
