import { Button } from "@/components/ui/button";

export default function ClosingSection() {
  return (
    <section className="py-20 lg:py-32 bg-gradient-to-b from-card to-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 leading-tight">
            The wealth platform ambitious builders deserve.
          </h2>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            Institutional-grade portfolios. FSRA-regulated. SIPC-protected. Transparent pricing. Your wealth journey starts with one decision.
          </p>
          <Button size="lg" className="px-12" data-testid="button-closing-start">
            Build Your Wealth Plan →
          </Button>
        </div>
      </div>
    </section>
  );
}
