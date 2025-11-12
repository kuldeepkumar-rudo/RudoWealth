import { Button } from "@/components/ui/button";

export default function WhyNowSection() {
  return (
    <section className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Be among the first.
          </h2>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            Early members get 90 days free and lifetime pricing. Join ambitious wealth builders shaping smarter investing.
          </p>
          <Button size="lg" data-testid="button-why-now-start">
            Start Building Wealth →
          </Button>
        </div>
      </div>
    </section>
  );
}
