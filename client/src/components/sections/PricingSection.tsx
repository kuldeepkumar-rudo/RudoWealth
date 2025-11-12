import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";

export default function PricingSection() {
  const features = [
    "All portfolios",
    "Auto-rebalancing",
    "Real-time tracking",
    "No hidden fees"
  ];

  return (
    <section className="py-20 lg:py-32 bg-card">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-center">
            Professional wealth management.{" "}
            <span className="text-primary">Radically affordable.</span>
          </h2>

          <Card className="p-8 lg:p-12 mb-8">
            <div className="text-center mb-8">
              <Badge variant="secondary" className="mb-4">
                🎉 90 days free
              </Badge>
              <div className="flex items-baseline justify-center gap-2 mb-2">
                <span className="text-5xl font-bold font-mono text-primary">AED 365</span>
                <span className="text-2xl text-muted-foreground">/year</span>
              </div>
              <p className="text-muted-foreground">Flat. Simple. Transparent.</p>
            </div>

            <div className="grid sm:grid-cols-2 gap-3 mb-8 max-w-md mx-auto">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <Check className="h-3 w-3 text-primary" />
                  </div>
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>

            {/* <div className="text-center">
              <Button size="lg" className="w-full sm:w-auto px-12" data-testid="button-pricing-start">
                Start Your Plan →
              </Button>
            </div> */}
          </Card>

          <div className="bg-muted/50 rounded-lg p-6 border border-border">
            <div className="flex items-center justify-between text-sm">
              <div>
                <div className="text-muted-foreground mb-1">Traditional advisors</div>
                <div className="font-semibold">AED 1,500-20,000/year</div>
              </div>
              <div className="text-4xl text-muted-foreground/50">→</div>
              <div>
                <div className="text-muted-foreground mb-1">RuDo</div>
                <div className="font-semibold text-primary font-mono">AED 365/year</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
