import { useState } from "react";
import { useLocation } from "wouter";
import { QuestionLayout } from "@/components/question-layout";
import { OptionCard } from "@/components/option-card";
import { useAssessment } from "@/lib/assessment-store";
import { useCurrency, formatRange } from "@/lib/currency-context";
import type { EmploymentStatus, IncomeLevel } from "@shared/schema";

export default function Question1() {
  const [, setLocation] = useLocation();
  const { responses, updateResponse } = useAssessment();
  const { currency } = useCurrency();
  const [employment, setEmployment] = useState<EmploymentStatus | undefined>(responses.q1_employment);
  const [income, setIncome] = useState<IncomeLevel | undefined>(responses.q1_income);

  const employmentOptions: { value: EmploymentStatus; label: string }[] = [
    { value: "salaried", label: "Salaried Professional" },
    { value: "self_employed", label: "Self-Employed / Freelancer" },
    { value: "business_owner", label: "Business Owner" },
    { value: "retired", label: "Retired" },
    { value: "part_time", label: "Part-Time Worker" },
    { value: "student_homemaker", label: "Student / Homemaker" },
  ];

  const incomeOptions: { value: IncomeLevel; label: string }[] = [
    { value: "none", label: "No regular income" },
    { value: "up_to_36k", label: `Up to ${formatRange(0, 10000, currency).split(' - ')[1]}` },
    { value: "36k_120k", label: formatRange(10000, 35000, currency) },
    { value: "120k_300k", label: formatRange(35000, 85000, currency) },
    { value: "300k_600k", label: formatRange(85000, 165000, currency) },
    { value: "600k_plus", label: formatRange(165000, null, currency) },
  ];

  const handleContinue = () => {
    if (employment) {
      updateResponse("q1_employment", employment);
      setLocation("/assessment/2");
    }
  };

  return (
    <QuestionLayout
      questionNumber={1}
      totalQuestions={14}
      title="Your Work & Income"
      subtitle="This helps us understand your financial capacity"
      onContinue={handleContinue}
      canContinue={!!employment}
      showContinue={!!employment}
    >
      <div className="space-y-6">
        <div className="space-y-3">
          <p className="text-sm font-medium text-foreground">
            What describes your work status?
          </p>
          <div className="space-y-3">
            {employmentOptions.map((option) => (
              <OptionCard
                key={option.value}
                label={option.label}
                selected={employment === option.value}
                onClick={() => setEmployment(option.value)}
                testId={`option-employment-${option.value}`}
              />
            ))}
          </div>
        </div>
      </div>
    </QuestionLayout>
  );
}
