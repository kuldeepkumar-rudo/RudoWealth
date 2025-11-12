import { useState } from "react";
import { useLocation } from "wouter";
import { QuestionLayout } from "@/components/question-layout";
import { OptionCard } from "@/components/option-card";
import { useAssessment } from "@/lib/assessment-store";
import type { TimeHorizon } from "@shared/schema";

export default function Question7() {
  const [, setLocation] = useLocation();
  const { responses, updateResponse } = useAssessment();
  const [horizon, setHorizon] = useState<TimeHorizon | undefined>(responses.q5_horizon);

  const horizonOptions: { value: TimeHorizon; label: string; sublabel: string }[] = [
    { value: "more_than_10y", label: "More than 10 years", sublabel: "Long-term wealth building" },
    { value: "5_10_years", label: "5-10 years", sublabel: "Medium to long term" },
    { value: "3_5_years", label: "3-5 years", sublabel: "Medium term goals" },
    { value: "less_than_3y", label: "Less than 3 years", sublabel: "Short term needs" },
  ];

  const handleContinue = () => {
    if (horizon) {
      updateResponse("q5_horizon", horizon);
      setLocation("/transition-ab");
    }
  };

  return (
    <QuestionLayout
      questionNumber={7}
      totalQuestions={14}
      title="Your Investment Timeline"
      subtitle="When do you expect to need a significant portion of this money?"
      onContinue={handleContinue}
      canContinue={true}
    >
      <div className="space-y-3">
        {horizonOptions.map((option) => (
          <OptionCard
            key={option.value}
            label={option.label}
            sublabel={option.sublabel}
            selected={horizon === option.value}
            onClick={() => setHorizon(option.value)}
            testId={`option-horizon-${option.value}`}
          />
        ))}
      </div>
    </QuestionLayout>
  );
}
