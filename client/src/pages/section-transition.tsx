import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Check } from "lucide-react";

interface SectionTransitionProps {
  completedSection: "A" | "B";
  progress: number;
  completedTitle: string;
  nextSectionTitle: string;
  nextSectionDescription: string;
  nextRoute: string;
}

export default function SectionTransition({
  completedSection,
  progress,
  completedTitle,
  nextSectionTitle,
  nextSectionDescription,
  nextRoute,
}: SectionTransitionProps) {
  const [, navigate] = useLocation();

  const handleContinue = () => {
    navigate(nextRoute);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="space-y-10">
          {/* Progress Bar */}
          <div className="space-y-3">
            <Progress 
              value={progress} 
              className="h-2"
              data-testid="progress-bar"
            />
            <p className="text-center text-sm text-muted-foreground font-medium">
              {progress}% Complete
            </p>
          </div>

          {/* Completion Message */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-2 animate-in zoom-in duration-500 delay-200">
              <Check className="w-8 h-8 text-primary" />
            </div>
            
            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-foreground">
                {completedTitle}
              </h1>
              <p className="text-lg font-semibold text-primary">
                Complete
              </p>
            </div>
          </div>

          {/* Next Section Preview */}
          <div className="text-center space-y-3 py-6">
            <p className="text-base text-muted-foreground">
              Now let's understand
            </p>
            <h2 className="text-xl font-semibold text-foreground">
              {nextSectionTitle}
            </h2>
            <p className="text-sm text-muted-foreground max-w-sm mx-auto">
              {nextSectionDescription}
            </p>
          </div>

          {/* Continue Button */}
          <Button
            onClick={handleContinue}
            size="lg"
            className="w-full"
            data-testid="button-continue-transition"
          >
            Continue
          </Button>

          {/* Section Indicator */}
          <div className="flex items-center justify-center gap-2 pt-4">
            <div className={`h-2 w-2 rounded-full ${completedSection === "A" ? "bg-primary" : "bg-muted"}`} />
            <div className={`h-2 w-2 rounded-full ${completedSection === "B" ? "bg-primary" : completedSection === "A" ? "bg-primary/50" : "bg-muted"}`} />
            <div className="h-2 w-2 rounded-full bg-muted" />
          </div>
        </div>
      </div>
    </div>
  );
}
