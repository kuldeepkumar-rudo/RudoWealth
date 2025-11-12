import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft } from "lucide-react";
import { useLocation } from "wouter";
import { ReactNode } from "react";

interface QuestionLayoutProps {
  questionNumber: number;
  totalQuestions: number;
  title: string;
  subtitle?: string;
  children: ReactNode;
  onContinue?: () => void;
  canContinue?: boolean;
  showContinue?: boolean;
  continueText?: string;
}

export function QuestionLayout({
  questionNumber,
  totalQuestions,
  title,
  subtitle,
  children,
  onContinue,
  canContinue = true,
  showContinue = true,
  continueText = "Continue"
}: QuestionLayoutProps) {
  const [, setLocation] = useLocation();
  const progress = (questionNumber / totalQuestions) * 100;

  const handleBack = () => {
    if (questionNumber > 1) {
      setLocation(`/assessment/${questionNumber - 1}`);
    } else {
      setLocation("/");
    }
  };

  return (
    <div className="h-screen bg-background flex flex-col overflow-hidden">
      <div className="max-w-md mx-auto w-full flex flex-col h-full">
        {/* Header - Minimal */}
        <div className="flex-shrink-0 bg-background/95 backdrop-blur-sm z-10">
          <div className="flex items-center justify-between px-3 py-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBack}
              className="gap-1 -ml-2"
              data-testid="button-back"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-xs">Back</span>
            </Button>
            <span className="text-xs text-muted-foreground font-medium" data-testid="text-question-counter">
              {questionNumber}/{totalQuestions}
            </span>
          </div>
          
          <div className="px-3 pb-2">
            <Progress value={progress} className="h-1" />
          </div>
        </div>

        {/* Content - Scrollable within viewport */}
        <div className="flex-1 overflow-y-auto px-3 pt-4 pb-6">
          <div className="space-y-5">
            <div className="space-y-1">
              <h2 className="text-lg font-semibold text-foreground leading-tight">{title}</h2>
              {subtitle && (
                <p className="text-xs text-muted-foreground">{subtitle}</p>
              )}
            </div>

            {children}

            {/* {showContinue && ( */}
              <div className="pt-2 pb-4">
                <Button
                  className="w-full h-12 text-base font-semibold"
                  onClick={onContinue}
                  disabled={!canContinue}
                  data-testid="button-continue"
                >
                  {continueText}
                </Button>
              </div>
            {/* )} */}
          </div>
        </div>
      </div>
    </div>
  );
}
