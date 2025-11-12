import { useState } from "react";
import { useLocation } from "wouter";
import { QuestionLayout } from "@/components/question-layout";
import { OptionCard } from "@/components/option-card";
import { useAssessment } from "@/lib/assessment-store";
import type { FundSource } from "@shared/schema";

export default function Question4() {
  const [, setLocation] = useLocation();
  const { responses, updateResponse } = useAssessment();
  const [sources, setSources] = useState<FundSource[]>(responses.q3_sources || []);

  const sourceOptions: { value: FundSource; label: string }[] = [
    { value: "employment", label: "Employment salary" },
    { value: "business", label: "Business income" },
    { value: "investments", label: "Investment returns" },
    { value: "inheritance", label: "Inheritance" },
    { value: "savings", label: "Personal savings" },
    { value: "family", label: "Family support" },
  ];

  const toggleSource = (source: FundSource) => {
    setSources(prev => 
      prev.includes(source) 
        ? prev.filter(s => s !== source)
        : [...prev, source]
    );
  };

  const handleContinue = () => {
    if (sources.length > 0) {
      updateResponse("q3_sources", sources);
      setLocation("/assessment/5");
    }
  };

  return (
    <QuestionLayout
      questionNumber={4}
      totalQuestions={14}
      title="Source of Investment Funds"
      subtitle="Where does your investment money come from?"
      onContinue={handleContinue}
      canContinue={true}
      showContinue={true}
    >
      <div className="space-y-3">
        <p className="text-sm font-medium text-muted-foreground">
          Select all that apply
        </p>
        <div className="space-y-3">
          {sourceOptions.map((option) => (
            <OptionCard
              key={option.value}
              label={option.label}
              selected={sources.includes(option.value)}
              onClick={() => toggleSource(option.value)}
              testId={`option-source-${option.value}`}
              multiSelect
            />
          ))}
        </div>
      </div>
    </QuestionLayout>
  );
}
