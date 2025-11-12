import { useState } from "react";
import { useLocation } from "wouter";
import { QuestionLayout } from "@/components/question-layout";
import { OptionCard } from "@/components/option-card";
import { useAssessment } from "@/lib/assessment-store";
import type { InvestmentGoal } from "@shared/schema";

export default function Question8() {
  const [, setLocation] = useLocation();
  const { responses, updateResponse } = useAssessment();
  const [goal, setGoal] = useState<InvestmentGoal | undefined>(responses.q6_goals);

  const goalOptions: { value: InvestmentGoal; label: string; sublabel: string }[] = [
    { value: "high_growth", label: "Maximize growth", sublabel: "Aggressive wealth building" },
    { value: "moderate_growth", label: "Strong growth", sublabel: "Build wealth over time" },
    { value: "balanced_growth", label: "Balanced growth", sublabel: "Growth with stability" },
    { value: "conservative_growth", label: "Steady growth", sublabel: "Preserve and grow modestly" },
    { value: "capital_preservation", label: "Preserve capital", sublabel: "Protect what I have" },
  ];

  const handleContinue = () => {
    if (goal) {
      updateResponse("q6_goals", goal);
      setLocation("/assessment/9");
    }
  };

  return (
    <QuestionLayout
      questionNumber={8}
      totalQuestions={14}
      title="Your Investment Goals"
      subtitle="What's most important to you with this investment?"
      onContinue={handleContinue}
      canContinue={true}
    >
      <div className="space-y-3">
        {goalOptions.map((option) => (
          <OptionCard
            key={option.value}
            label={option.label}
            sublabel={option.sublabel}
            selected={goal === option.value}
            onClick={() => setGoal(option.value)}
            testId={`option-goal-${option.value}`}
          />
        ))}
      </div>
    </QuestionLayout>
  );
}
