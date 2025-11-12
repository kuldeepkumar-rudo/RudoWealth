import { useState } from "react";
import { useLocation } from "wouter";
import { QuestionLayout } from "@/components/question-layout";
import { OptionCard } from "@/components/option-card";
import { useAssessment } from "@/lib/assessment-store";
import { useCurrency, formatRange } from "@/lib/currency-context";
import type { NetWorthLevel } from "@shared/schema";

export default function Question3() {
  const [, setLocation] = useLocation();
  const { responses, updateResponse } = useAssessment();
  const { currency } = useCurrency();
  const [networth, setNetworth] = useState<NetWorthLevel | undefined>(responses.q2_networth);

  const networthOptions: { value: NetWorthLevel; label: string }[] = [
    { value: "less_than_36k", label: `Less than ${formatRange(0, 10000, currency).split(' - ')[1]}` },
    { value: "36k_120k", label: formatRange(10000, 35000, currency) },
    { value: "120k_300k", label: formatRange(35000, 85000, currency) },
    { value: "300k_600k", label: formatRange(85000, 165000, currency) },
    { value: "600k_plus", label: formatRange(165000, null, currency) },
  ];

  const handleContinue = () => {
    if (networth) {
      updateResponse("q2_networth", networth);
      setLocation("/assessment/4");
    }
  };

  return (
    <QuestionLayout
      questionNumber={3}
      totalQuestions={14}
      title="Your Financial Safety Net"
      subtitle="This helps us assess your investment capacity"
      onContinue={handleContinue}
      canContinue={true}
    >
      <div className="space-y-3">
        <p className="text-sm font-medium text-foreground">
          Your net worth
        </p>
        <p className="text-xs text-muted-foreground -mt-1">
          (Total assets minus debts)
        </p>
        <div className="space-y-3">
          {networthOptions.map((option) => (
            <OptionCard
              key={option.value}
              label={option.label}
              selected={networth === option.value}
              onClick={() => setNetworth(option.value)}
              testId={`option-networth-${option.value}`}
            />
          ))}
        </div>
      </div>
    </QuestionLayout>
  );
}
