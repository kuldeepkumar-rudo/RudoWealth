import { LucideIcon } from "lucide-react";

interface TrustBadgeProps {
  icon: LucideIcon;
  text: string;
  testId?: string;
}

export default function TrustBadge({ icon: Icon, text, testId }: TrustBadgeProps) {
  return (
    <div className="flex items-center gap-2 text-sm" data-testid={testId}>
      <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
        <Icon className="h-3 w-3 text-primary" />
      </div>
      <span className="text-muted-foreground">{text}</span>
    </div>
  );
}
