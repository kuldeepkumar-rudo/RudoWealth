import { useState } from "react";
import { useLocation } from "wouter";
import { QuestionLayout } from "@/components/question-layout";
import { OptionCard } from "@/components/option-card";
import { useAssessment } from "@/lib/assessment-store";
import type { FOMOReaction } from "@shared/schema";
import { Card } from "@/components/ui/card";

export default function Question11() {
  const [, setLocation] = useLocation();
  const { responses, updateResponse } = useAssessment();
  const [fomo, setFomo] = useState<FOMOReaction | undefined>(responses.q9_fomo);

  const fomoOptions: { value: FOMOReaction; label: string; sublabel: string }[] = [
    { value: "should_take_more_risk", label: "I should take more risk", sublabel: "I'm missing opportunities" },
    { value: "different_strategies", label: "Different strategies work", sublabel: "I'll stick to my approach" },
    { value: "research_thoroughly", label: "I'd research thoroughly", sublabel: "Before changing anything" },
    { value: "trust_diversification", label: "Good for them", sublabel: "I trust diversification" },
  ];

  const handleContinue = () => {
    if (fomo) {
      updateResponse("q9_fomo", fomo);
      setLocation("/transition-bc");
    }
  };

  return (
    <QuestionLayout
      questionNumber={11}
      totalQuestions={14}
      title="Decision-Making Style"
      subtitle="One more scenario to understand you better"
      onContinue={handleContinue}
      canContinue={true}
    >
      <div className="space-y-6">
        <Card className="p-4 bg-muted/30 border-muted">
          <div className="space-y-3">
            <p className="text-sm font-semibold text-foreground">Scenario</p>
            <div className="space-y-2 text-sm text-foreground">
              <p>Your friend made <span className="font-semibold">40% returns</span> in a single tech stock</p>
              <p>Your diversified portfolio gained <span className="font-semibold">12%</span> in the same period</p>
            </div>
            
            <div className="space-y-2 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-24 text-xs text-muted-foreground">Friend</div>
                <div className="flex-1 h-6 bg-accent rounded-md flex items-center px-2" style={{ width: '100%' }}>
                  <span className="text-xs font-semibold text-accent-foreground">40%</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-24 text-xs text-muted-foreground">You</div>
                <div className="flex-1 h-6 bg-primary rounded-md flex items-center px-2" style={{ width: '30%' }}>
                  <span className="text-xs font-semibold text-primary-foreground">12%</span>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <div className="space-y-3">
          <p className="text-sm font-medium text-foreground">
            Your honest reaction?
          </p>
          {fomoOptions.map((option) => (
            <OptionCard
              key={option.value}
              label={option.label}
              sublabel={option.sublabel}
              selected={fomo === option.value}
              onClick={() => setFomo(option.value)}
              testId={`option-fomo-${option.value}`}
            />
          ))}
        </div>
      </div>
    </QuestionLayout>
  );
}
