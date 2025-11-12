import { Card } from "@/components/ui/card";
import { X, Check } from "lucide-react";

interface ComparisonBlockProps {
  oldWay: string;
  newWay: string;
  testId?: string;
}

export default function ComparisonBlock({ oldWay, newWay, testId }: ComparisonBlockProps) {
  return (
    <div className="grid md:grid-cols-2 gap-4" data-testid={testId}>
      <Card className="p-6 bg-destructive/5 border-destructive/20">
        <div className="flex gap-3">
          <div className="h-6 w-6 rounded-full bg-destructive/20 flex items-center justify-center flex-shrink-0 mt-0.5">
            <X className="h-4 w-4 text-destructive" />
          </div>
          <p className="text-sm text-foreground/90 leading-relaxed">{oldWay}</p>
        </div>
      </Card>
      
      <Card className="p-6 bg-primary/5 border-primary/20">
        <div className="flex gap-3">
          <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
            <Check className="h-4 w-4 text-primary" />
          </div>
          <p className="text-sm text-foreground/90 leading-relaxed">{newWay}</p>
        </div>
      </Card>
    </div>
  );
}
