import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Users, Trophy, Sparkles, Shield } from "lucide-react";

export default function PrivateWealth() {
  const features = [
    {
      icon: Users,
      title: "Dedicated Advisor",
      description: "Your personal wealth advisor with deep expertise in cross-border wealth management."
    },
    {
      icon: Trophy,
      title: "Premium Strategies",
      description: "Access to exclusive investment opportunities and sophisticated portfolio construction."
    },
    {
      icon: Sparkles,
      title: "Bespoke Solutions",
      description: "Custom-tailored strategies designed around your unique financial situation and goals."
    },
    {
      icon: Shield,
      title: "Concierge Service",
      description: "White-glove service with priority support and comprehensive wealth planning."
    }
  ];

  return (
    <div>
      <section className="py-20 lg:py-32 bg-gradient-to-b from-background to-card">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Sparkles className="h-4 w-4" />
              Premium Advisory
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Private Wealth Management for{" "}
              <span className="bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent">
                Sophisticated Investors
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl text-muted-foreground mb-8 leading-relaxed">
              Personalized wealth advisory combining institutional-grade strategies with dedicated human expertise. For portfolios above AED 500,000.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-base px-8" data-testid="button-private-contact">
                Schedule a Consultation →
              </Button>
              <Button size="lg" variant="outline" className="text-base px-8" data-testid="button-private-learn">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-32 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-center">
              Elevated Wealth Management
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <Card key={index} className="p-8 hover-elevate transition-all duration-300" data-testid={`private-feature-${index}`}>
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-32 bg-card">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Coming Soon</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Our private wealth management service is launching soon. Join the waitlist to be among the first to access premium, personalized advisory.
            </p>
            <Button size="lg" data-testid="button-private-waitlist">
              Join Waitlist →
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
