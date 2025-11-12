import { useState } from "react";
import { useLocation } from "wouter";
import { QuestionLayout } from "@/components/question-layout";
import { OptionCard } from "@/components/option-card";
import { useAssessment } from "@/lib/assessment-store";
import { useCurrency, formatRange } from "@/lib/currency-context";
import type { IncomeLevel } from "@shared/schema";
import type { AssessmentResponses } from "@/lib/assessment-store";

export default function Question2() {
  const [, setLocation] = useLocation();
  const { responses, updateResponse } = useAssessment();
  const { currency } = useCurrency();
  const [income, setIncome] = useState<IncomeLevel | null>(
    responses.q1_income ? (responses.q1_income as IncomeLevel) : null
  );

  const incomeOptions = [
    { value: "none", label: "No regular income" },
    { value: "up_to_36k", label: `Up to ${formatRange(0, 10000, currency).split(' - ')[1]}` },
    { value: "36k_120k", label: formatRange(10000, 35000, currency) },
    { value: "120k_300k", label: formatRange(35000, 85000, currency) },
    { value: "300k_600k", label: formatRange(85000, 165000, currency) },
    { value: "600k_plus", label: formatRange(165000, null, currency) },
  ];

  const handleContinue = () => {
    if (income) {
      updateResponse("q1_income" as keyof AssessmentResponses, income);
      setLocation("/assessment/3");
    }
  };

  return (
    <QuestionLayout
      questionNumber={2}
      totalQuestions={14}
      title="Your Annual Income"
      subtitle="This helps us understand your financial capacity"
      onContinue={handleContinue}
      canContinue={!!income}
      showContinue={!!income}
    >
      <div className="space-y-6">
        <div className="space-y-3">
          <p className="text-sm font-medium text-foreground">
            Your total annual income
          </p>
          <p className="text-xs text-muted-foreground -mt-1">
            (Salary, bonus, commission, etc.)
          </p>
          <div className="space-y-3">
            {incomeOptions.map((option) => (
              <OptionCard
                key={option.value}
                label={option.label}
                selected={income === option.value}
                onClick={() => setIncome(option.value as IncomeLevel)}
                testId={`option-income-${option.value}`}
              />
            ))}
          </div>
        </div>
      </div>
    </QuestionLayout>
  );
}
