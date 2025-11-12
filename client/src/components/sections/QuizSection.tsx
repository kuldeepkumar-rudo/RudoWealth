import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

export default function QuizSection() {
  const [, setLocation] = useLocation();
  return (
    <section className="py-20 lg:py-32 bg-card">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <Card className="p-8 lg:p-12 bg-gradient-to-br from-primary/5 to-chart-2/5 border-primary/20">
            <div className="text-center">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Which portfolio matches your ambitions?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Answer few questions. Get your personalized recommendation.
              </p>
              <Button size="lg" onClick={() => setLocation("/quiz")} data-testid="button-quiz-start">
                Get My Portfolio →
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
