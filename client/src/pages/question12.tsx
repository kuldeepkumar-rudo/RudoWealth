import { useState } from "react";
import { useLocation } from "wouter";
import { QuestionLayout } from "@/components/question-layout";
import { OptionCard } from "@/components/option-card";
import { useAssessment } from "@/lib/assessment-store";
import type { Dependents } from "@shared/schema";

export default function Question12() {
  const [, setLocation] = useLocation();
  const { responses, updateResponse } = useAssessment();
  const [dependents, setDependents] = useState<Dependents | undefined>(responses.q10_dependents);

  const dependentsOptions: { value: Dependents; label: string; sublabel?: string }[] = [
    { value: "just_myself", label: "Just myself" },
    { value: "1_2_dependents", label: "1-2 dependents", sublabel: "(Spouse, children, parents)" },
    { value: "3_4_dependents", label: "3-4 dependents" },
    { value: "5_plus_dependents", label: "5+ dependents" },
  ];

  const handleContinue = () => {
    if (dependents) {
      updateResponse("q10_dependents", dependents);
      setLocation("/assessment/13");
    }
  };

  return (
    <QuestionLayout
      questionNumber={12}
      totalQuestions={14}
      title="Financial Responsibilities"
      subtitle="Almost done! Just a few more details"
      onContinue={handleContinue}
      canContinue={!!dependents}
    >
      <div className="space-y-3">
        <p className="text-sm font-medium text-foreground">
          How many people depend on your income?
        </p>
        {dependentsOptions.map((option) => (
          <OptionCard
            key={option.value}
            label={option.label}
            sublabel={option.sublabel}
            selected={dependents === option.value}
            onClick={() => setDependents(option.value)}
            testId={`option-dependents-${option.value}`}
          />
        ))}
      </div>
    </QuestionLayout>
  );
}
