import { Link } from "wouter";
import { Helmet } from "react-helmet-async";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { calculatorList } from "@/features/calculators/registry";

export default function CalculatorsIndex() {
  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Financial Calculators - Investment Tools for NRIs | RuDo Wealth</title>
        <meta name="description" content="Free investment calculators for NRIs. Calculate SIP returns, lumpsum investments, FIRE number, PPF maturity, and more. Multi-currency support for USD, AED, and INR." />
        <meta name="keywords" content="investment calculator, SIP calculator, FIRE calculator, NRI calculator, financial planning tools, wealth calculator" />
        <meta property="og:title" content="Financial Calculators - Investment Tools for NRIs | RuDo Wealth" />
        <meta property="og:description" content="Free investment calculators for NRIs. Calculate SIP returns, lumpsum investments, FIRE number, PPF maturity, and more." />
        <meta property="og:type" content="website" />
      </Helmet>
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <Badge className="mb-4" variant="outline" data-testid="badge-tools">
            Investment Tools
          </Badge>
          <h1 className="text-4xl font-bold mb-4">Financial Calculators</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Plan your wealth journey with precision. Choose from our suite of calculators designed specifically for NRIs and savvy investors.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {calculatorList.map((calc) => (
            <Card
              key={calc.slug}
              className="p-6 hover-elevate active-elevate-2 transition-all"
              data-testid={`card-calculator-${calc.slug}`}
            >
              <div className={`inline-flex p-3 rounded-lg ${calc.iconBgClass} mb-4`}>
                <calc.icon className="h-6 w-6" />
              </div>
              
              <h2 className="text-xl font-bold mb-2">{calc.name}</h2>
              <p className="text-sm text-muted-foreground mb-6 min-h-[3rem]">
                {calc.shortDescription}
              </p>
              
              <Link href={`/calculators/${calc.slug}`}>
                <Button
                  className="w-full bg-success text-success-foreground hover-elevate active-elevate-2"
                  data-testid={`button-calculate-${calc.slug}`}
                >
                  Calculate Now →
                </Button>
              </Link>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Card className="p-8 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Why Use Our Calculators?</h2>
            <div className="grid sm:grid-cols-2 gap-6 text-left">
              <div>
                <h3 className="font-semibold mb-2">🎯 NRI-Focused</h3>
                <p className="text-sm text-muted-foreground">
                  Multi-currency support (INR, USD, AED) with currency impact analysis for global investors
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">📊 Accurate Projections</h3>
                <p className="text-sm text-muted-foreground">
                  Based on proven financial formulas and real-world investment scenarios
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">⚡ Instant Results</h3>
                <p className="text-sm text-muted-foreground">
                  Get comprehensive calculations in seconds with visual breakdowns
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">🔒 Completely Free</h3>
                <p className="text-sm text-muted-foreground">
                  Professional-grade calculators with no hidden costs or registration required
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
