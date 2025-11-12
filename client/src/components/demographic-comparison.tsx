import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, Users, BarChart3 } from "lucide-react";

interface DemographicComparisonProps {
  networthLevel: string;
  totalScore: number;
}

interface ComparisonData {
  profileType: string;
  yourScore: number;
  averageScore: number;
  percentile: number;
  totalAssessments: number;
  profileDistribution: Record<string, number>;
}

export function DemographicComparison({ networthLevel, totalScore }: DemographicComparisonProps) {
  const { data, isLoading } = useQuery<ComparisonData>({
    queryKey: ["/api/demographics/comparison", networthLevel, totalScore],
    queryFn: async () => {
      const response = await fetch(
        `/api/demographics/comparison?networthLevel=${networthLevel}&totalScore=${totalScore}`
      );
      if (!response.ok) throw new Error("Failed to fetch comparison data");
      return response.json();
    },
  });

  if (isLoading) {
    return (
      <Card className="p-6">
        <div className="flex items-center justify-center py-8">
          <div className="h-8 w-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      </Card>
    );
  }

  if (!data || data.totalAssessments === 0) {
    return (
      <Card className="p-6">
        <p className="text-sm text-muted-foreground text-center py-4">
          Not enough data yet for demographic comparison. You're among the first!
        </p>
      </Card>
    );
  }

  const profileNames: Record<string, string> = {
    conservative_guardian: "Conservative Guardian",
    steady_builder: "Steady Builder",
    balanced_grower: "Balanced Grower",
    growth_seeker: "Growth Seeker",
    bold_explorer: "Bold Explorer",
  };

  const scoreDifference = data.yourScore - data.averageScore;
  const isAboveAverage = scoreDifference > 0;

  return (
    <div className="space-y-6">
      {/* Percentile Ranking */}
      <Card className="p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
            <TrendingUp className="w-6 h-6 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-foreground mb-2">Your Percentile Ranking</h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Among similar NRI investors</span>
                  <span className="font-bold text-primary" data-testid="text-percentile">
                    {data.percentile}th percentile
                  </span>
                </div>
                <Progress value={data.percentile} className="h-2" />
              </div>
              <p className="text-sm text-muted-foreground">
                You scored higher than {data.percentile}% of NRIs with similar net worth levels. 
                {isAboveAverage 
                  ? ` Your risk tolerance is ${scoreDifference} points higher than average.`
                  : ` You have a more conservative approach than average.`}
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* Score Comparison */}
      <Card className="p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
            <BarChart3 className="w-6 h-6 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-foreground mb-4">Score Comparison</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-muted/30 rounded-lg">
                <p className="text-xs text-muted-foreground mb-1">Your Score</p>
                <p className="text-2xl font-bold text-primary" data-testid="text-your-score">{data.yourScore}</p>
                <p className="text-xs text-muted-foreground mt-1">out of 96</p>
              </div>
              <div className="p-4 bg-muted/30 rounded-lg">
                <p className="text-xs text-muted-foreground mb-1">Average Score</p>
                <p className="text-2xl font-bold text-foreground" data-testid="text-average-score">{data.averageScore}</p>
                <p className="text-xs text-muted-foreground mt-1">in your bracket</p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Profile Distribution */}
      <Card className="p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
            <Users className="w-6 h-6 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Profile Distribution
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Based on {data.totalAssessments} assessments from NRIs with similar net worth
            </p>
            <div className="space-y-3">
              {Object.entries(data.profileDistribution)
                .sort(([, a], [, b]) => b - a)
                .map(([profile, count]) => {
                  const percentage = Math.round((count / data.totalAssessments) * 100);
                  return (
                    <div key={profile}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-foreground font-medium">
                          {profileNames[profile] || profile}
                        </span>
                        <span className="text-muted-foreground">{percentage}%</span>
                      </div>
                      <Progress value={percentage} className="h-1.5" />
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
