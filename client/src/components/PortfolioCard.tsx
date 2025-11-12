import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface PortfolioCardProps {
  icon: string;
  title: string;
  strategy: string;
  allocation: string;
  returns: string;
  risk: string;
  forGoal: string;
  testId?: string;
}

export default function PortfolioCard({
  icon,
  title,
  strategy,
  allocation,
  returns,
  risk,
  forGoal,
  testId
}: PortfolioCardProps) {
  return (
    <Card 
      className="p-8 hover-elevate transition-all duration-300 group cursor-pointer" 
      data-testid={testId}
    >
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
        {title}
      </h3>
      <p className="text-sm text-muted-foreground mb-4">
        {strategy} | {allocation}
      </p>
      
      <div className="space-y-3 mb-6">
        <div>
          <div className="text-xs text-muted-foreground mb-1">Expected Returns</div>
          <div className="font-mono font-semibold text-lg text-primary">{returns}</div>
        </div>
        <div>
          <div className="text-xs text-muted-foreground mb-1">Risk Level</div>
          <Badge variant="secondary" className="text-xs">{risk}</Badge>
        </div>
      </div>

      <div className="pt-4 border-t border-border">
        <div className="text-xs text-muted-foreground mb-1">Best For</div>
        <p className="text-sm">{forGoal}</p>
      </div>
    </Card>
  );
}
