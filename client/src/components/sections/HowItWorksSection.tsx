import StepCard from "../StepCard";
import { Button } from "@/components/ui/button";

export default function HowItWorksSection() {
  const steps = [
    {
      number: 1,
      title: "Share your goals",
      description: "Answer 8 questions. We recommend your portfolio."
    },
    {
      number: 2,
      title: "Get your portfolio",
      description: "Choose from 5 globally diversified strategies."
    },
    {
      number: 3,
      title: "Watch it grow",
      description: "Fund and automate. We handle the rest."
    }
  ];

  return (
    <section className="py-20 lg:py-32 bg-card">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-center">
            Your wealth journey, simplified.
          </h2>
          
          <div className="space-y-12 mb-12">
            {steps.map((step) => (
              <StepCard
                key={step.number}
                number={step.number}
                title={step.title}
                description={step.description}
                testId={`step-${step.number}`}
              />
            ))}
          </div>

          {/* <div className="text-center">
            <p className="text-sm text-muted-foreground mb-6">
              Switch or withdraw anytime. No penalties.
            </p>
            <Button size="lg" data-testid="button-start-plan-how">
              Start Your Plan →
            </Button>
          </div> */}
        </div>
      </div>
    </section>
  );
}
