import { Badge } from "@/components/ui/badge";
import TimelineVisualizer from "@/components/goal-based/TimelineVisualizer";
import { TrendingUp, Target, Shield } from "lucide-react";

export default function GoalBasedInvestingSection() {

  return (
    <section className="py-20 lg:py-32 bg-card relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-16 items-center max-w-6xl mx-auto">
          <div>
            <Badge variant="secondary" className="mb-4" data-testid="badge-goal-based">
              <Target className="w-3 h-3 mr-1.5" />
              Goal-Based Investing
            </Badge>
            
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 leading-tight">
              Your goals have deadlines.{" "}
              <span className="text-primary">Your portfolio should too.</span>
            </h2>
            
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              Most platforms adjust risk by age. We adjust by goal proximity protecting near-term goals while maximizing long-term growth.
            </p>

            {/* Key features */}
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Adaptive Glidepath</h4>
                  <p className="text-sm text-muted-foreground">Automatically shifts from growth to preservation as goals approach</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Shield className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Protected Near-Term Goals</h4>
                  <p className="text-sm text-muted-foreground">Short-term Goals shift to larger allocation in bonds for capital safety</p>
                </div>
              </div>
            </div>

          </div>

          <div className="relative">
            <TimelineVisualizer />
          </div>
        </div>

        {/* Bottom stat badges */}
        <div className="flex flex-wrap items-center justify-center gap-6 mt-16 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-primary" />
            <span>Reviewed Quarterly</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-primary" />
            <span>Rebalanced Automatically</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-primary" />
            <span>Tax-Optimized</span>
          </div>
        </div>
      </div>
    </section>
  );
}
