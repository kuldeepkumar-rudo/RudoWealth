import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  testId?: string;
}

export default function FeatureCard({ icon: Icon, title, description, testId }: FeatureCardProps) {
  return (
    <Card className="p-6 hover-elevate transition-all duration-300" data-testid={testId}>
      <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
        <Icon className="h-6 w-6 text-primary" />
      </div>
      <h3 className="font-semibold mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
    </Card>
  );
}
