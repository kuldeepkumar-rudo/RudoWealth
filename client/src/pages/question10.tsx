import { useState } from "react";
import { useLocation } from "wouter";
import { QuestionLayout } from "@/components/question-layout";
import { OptionCard } from "@/components/option-card";
import { useAssessment } from "@/lib/assessment-store";
import type { VolatilityReaction } from "@shared/schema";
import { Card } from "@/components/ui/card";
import { TrendingDown } from "lucide-react";

export default function Question10() {
  const [, setLocation] = useLocation();
  const { responses, updateResponse } = useAssessment();
  const [reaction, setReaction] = useState<VolatilityReaction | undefined>(responses.q8_volatility);

  const reactionOptions: { value: VolatilityReaction; label: string; sublabel: string }[] = [
    { value: "sell_immediately", label: "Sell immediately", sublabel: "Prevent further losses" },
    { value: "hold_and_wait", label: "Hold and wait", sublabel: "Markets typically recover" },
    { value: "invest_more", label: "Invest more", sublabel: "Buy at lower prices" },
  ];

  const handleContinue = () => {
    if (reaction) {
      updateResponse("q8_volatility", reaction);
      setLocation("/assessment/11");
    }
  };

  return (
    <QuestionLayout
      questionNumber={10}
      totalQuestions={14}
      title="Reality Check"
      subtitle="Let's test this with a real scenario"
      onContinue={handleContinue}
      canContinue={true}
    >
      <div className="space-y-6">
        <Card className="p-4 bg-muted/30 border-muted">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-destructive">
              <TrendingDown className="w-5 h-5" />
              <p className="text-sm font-semibold">Scenario</p>
            </div>
            <div className="space-y-2 text-sm text-foreground">
              <p>You invested <span className="font-semibold">AED 100,000</span> six months ago.</p>
              <p>Today it's worth <span className="font-semibold">AED 80,000</span></p>
              <p className="text-muted-foreground">(20% drop due to market correction)</p>
            </div>
            
            <div className="h-24 flex items-end gap-1">
              {[100, 98, 95, 90, 85, 82, 80].map((value, i) => (
                <div key={i} className="flex-1 bg-gradient-to-t from-destructive to-destructive/50 rounded-t" style={{ height: `${value}%` }} />
              ))}
            </div>
          </div>
        </Card>

        <div className="space-y-3">
          <p className="text-sm font-medium text-foreground">
            What would you most likely do?
          </p>
          {reactionOptions.map((option) => (
            <OptionCard
              key={option.value}
              label={option.label}
              sublabel={option.sublabel}
              selected={reaction === option.value}
              onClick={() => setReaction(option.value)}
              testId={`option-volatility-${option.value}`}
            />
          ))}
        </div>
      </div>
    </QuestionLayout>
  );
}
