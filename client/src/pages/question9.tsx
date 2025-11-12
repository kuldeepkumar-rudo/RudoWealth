import { useState } from "react";
import { useLocation } from "wouter";
import { QuestionLayout } from "@/components/question-layout";
import { OptionCard } from "@/components/option-card";
import { useAssessment } from "@/lib/assessment-store";
import type { RiskComfort } from "@shared/schema";

export default function Question9() {
  const [, setLocation] = useLocation();
  const { responses, updateResponse } = useAssessment();
  const [comfort, setComfort] = useState<RiskComfort | undefined>(responses.q7_comfort);

  const comfortOptions: { value: RiskComfort; label: string; sublabel: string }[] = [
    { 
      value: "prefer_guaranteed", 
      label: "I prefer guaranteed returns", 
      sublabel: "Safety over growth" 
    },
    { 
      value: "moderate_swings", 
      label: "I can handle moderate swings", 
      sublabel: "Some volatility is acceptable" 
    },
    { 
      value: "comfortable_volatility", 
      label: "I'm comfortable with volatility", 
      sublabel: "Higher risk for potentially higher returns" 
    },
  ];

  const handleContinue = () => {
    if (comfort) {
      updateResponse("q7_comfort", comfort);
      setLocation("/assessment/10");
    }
  };

  return (
    <QuestionLayout
      questionNumber={9}
      totalQuestions={14}
      title="Your Risk Comfort Level"
      subtitle="How do you feel about market ups and downs?"
      onContinue={handleContinue}
      canContinue={true}
    >
      <div className="space-y-3">
        {comfortOptions.map((option) => (
          <OptionCard
            key={option.value}
            label={option.label}
            sublabel={option.sublabel}
            selected={comfort === option.value}
            onClick={() => setComfort(option.value)}
            testId={`option-comfort-${option.value}`}
          />
        ))}
      </div>
    </QuestionLayout>
  );
}
