import { useState } from "react";
import { useLocation } from "wouter";
import { QuestionLayout } from "@/components/question-layout";
import { OptionCard } from "@/components/option-card";
import { useAssessment } from "@/lib/assessment-store";
import type { LiquidityNeeds } from "@shared/schema";

export default function Question14() {
  const [, setLocation] = useLocation();
  const { responses, updateResponse } = useAssessment();
  const [liquidity, setLiquidity] = useState<LiquidityNeeds | undefined>(responses.q12_liquidity);

  const liquidityOptions: { value: LiquidityNeeds; label: string; sublabel?: string }[] = [
    { 
      value: "yes_need_funds", 
      label: "Yes, I'll need significant funds",
      sublabel: "(Home, wedding, education, business, etc.)"
    },
    { 
      value: "maybe_have_savings", 
      label: "Maybe, but I have separate savings",
      sublabel: "Won't need to touch these investments"
    },
    { value: "no_expenses", label: "No major expenses planned" },
  ];

  const handleContinue = () => {
    // if (liquidity) {
      console.log("Liquidity level saved:", liquidity);
      updateResponse("q12_liquidity", liquidity);
      console.log("Calling setLocation");
      setLocation("/processing");
    // }
  };

  return (
    <QuestionLayout
      questionNumber={14}
      totalQuestions={14}
      title="Upcoming Financial Needs"
      subtitle="Last question!"
      onContinue={handleContinue}
      canContinue={true}
      continueText="Discover My Investment Profile"
    >
      <div className="space-y-3">
        <p className="text-sm font-medium text-foreground">
          Do you expect any large expenses in the next 1-2 years?
        </p>
        {liquidityOptions.map((option) => (
          <OptionCard
            key={option.value}
            label={option.label}
            sublabel={option.sublabel}
            selected={liquidity === option.value}
            onClick={() => setLiquidity(option.value)}
            testId={`option-liquidity-${option.value}`}
          />
        ))}
      </div>
    </QuestionLayout>
  );
}
