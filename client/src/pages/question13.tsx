import { useState } from "react";
import { useLocation } from "wouter";
import { QuestionLayout } from "@/components/question-layout";
import { OptionCard } from "@/components/option-card";
import { useAssessment } from "@/lib/assessment-store";
import type { EmergencyFund } from "@shared/schema";
import { cn } from "@/lib/utils";

export default function Question13() {
  const [, setLocation] = useLocation();
  const { responses, updateResponse } = useAssessment();
  const [emergency, setEmergency] = useState<EmergencyFund | undefined>(responses.q11_emergency);

  const emergencyOptions: { 
    value: EmergencyFund; 
    label: string; 
    barWidth: string;
    barColor: string;
  }[] = [
    { 
      value: "less_than_3m", 
      label: "Less than 3 months",
      barWidth: "20%",
      barColor: "bg-destructive"
    },
    { 
      value: "3_6_months", 
      label: "3-6 months",
      barWidth: "50%",
      barColor: "bg-amber-500"
    },
    { 
      value: "6_12_months", 
      label: "6-12 months",
      barWidth: "80%",
      barColor: "bg-primary"
    },
    { 
      value: "12_plus_months", 
      label: "12+ months",
      barWidth: "100%",
      barColor: "bg-green-600"
    },
  ];

  const handleContinue = () => {
    if (emergency) {
      updateResponse("q11_emergency", emergency);
      setLocation("/assessment/14");
    }
  };

  return (
    <QuestionLayout
      questionNumber={13}
      totalQuestions={14}
      title="Emergency Preparedness"
      subtitle="Your financial safety buffer"
      onContinue={handleContinue}
      canContinue={true}
    >
      <div className="space-y-3">
        <p className="text-sm font-medium text-foreground">
          If your income stopped today, how long could you cover expenses?
        </p>
        <p className="text-xs text-muted-foreground -mt-1">
          (Without touching investments)
        </p>
        <div className="space-y-3">
          {emergencyOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setEmergency(option.value)}
              data-testid={`option-emergency-${option.value}`}
              className={cn(
                "w-full px-4 py-4 rounded-lg border-2 text-left transition-all duration-300",
                "hover-elevate active-elevate-2",
                emergency === option.value
                  ? "border-primary bg-primary/5"
                  : "border-border bg-card"
              )}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-base font-medium text-foreground">
                    {option.label}
                  </span>
                  {emergency === option.value && (
                    <span className="text-primary">✓</span>
                  )}
                </div>
                <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                  <div 
                    className={cn("h-full rounded-full transition-all", option.barColor)}
                    style={{ width: option.barWidth }}
                  />
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </QuestionLayout>
  );
}
