import { useEffect, useState } from "react";
import { useAssessment } from "@/lib/assessment-store";
import { getProfileResult, validateProfile, calculateScores } from "@/lib/scoring";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Layers, Scale, Target, Rocket, Check, AlertTriangle, TrendingUp, PieChart, Users } from "lucide-react";
import { useLocation } from "wouter";
import { Progress } from "@/components/ui/progress";
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import type { Assessment } from "@shared/schema";
import { PDFReportDownload } from "@/components/pdf-report";
import { AdvisorMatch } from "@/components/advisor-match";
import { DemographicComparison } from "@/components/demographic-comparison";
import { DonutChart } from "@/components/donut-chart";

const iconMap = {
  shield: Shield,
  layers: Layers,
  scale: Scale,
  target: Target,
  rocket: Rocket,
};

export default function Results() {
  const { responses, setAssessmentId, assessmentId } = useAssessment();
  const [, setLocation] = useLocation();
  const [showDetails, setShowDetails] = useState(false);

  // Fetch saved assessment if we have an ID
  const { data: savedAssessment, isLoading: isFetching } = useQuery<Assessment>({
    queryKey: ["/api/assessments", assessmentId],
    enabled: !!assessmentId,
  });

  const saveAssessmentMutation = useMutation({
    mutationFn: async () => {
      const result = await apiRequest("POST", "/api/assessments", responses);
      return result;
    },
    onSuccess: (data: any) => {
      if (data && data.id) {
        setAssessmentId(data.id);
      }
    },
  });

  useEffect(() => {
    if (!responses.q12_liquidity) {
      setLocation("/");
      return;
    }

    // Only save if we haven't saved already
    if (!assessmentId && !saveAssessmentMutation.isPending) {
      saveAssessmentMutation.mutate();
    }
  }, [responses, setLocation, assessmentId]);

  if (!responses.q12_liquidity) {
    return null;
  }

  // Show loading state while fetching saved assessment
  if (assessmentId && isFetching) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="max-w-md w-full p-8">
          <div className="flex flex-col items-center gap-4">
            <div className="h-8 w-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            <p className="text-sm text-muted-foreground">Loading your results...</p>
          </div>
        </Card>
      </div>
    );
  }

  // Use saved assessment data if available, otherwise calculate from responses
  const scores = savedAssessment ? {
    capacityScore: savedAssessment.capacityScore ?? 0,
    toleranceScore: savedAssessment.toleranceScore ?? 0,
    timeScore: savedAssessment.timeScore ?? 0,
    experienceScore: savedAssessment.experienceScore ?? 0,
    totalScore: savedAssessment.totalScore ?? 0,
  } : calculateScores(responses);
  
  const profileResult = getProfileResult(responses);
  const validation = validateProfile(
    scores.capacityScore,
    scores.toleranceScore,
    scores.timeScore
  );
  
  const IconComponent = iconMap[profileResult.icon as keyof typeof iconMap] || Shield;

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto p-4 py-8 space-y-8">
        {/* Profile Hero Card - Premium Design */}
        <Card className="p-8 md:p-12 text-center space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div 
            className="w-20 h-20 mx-auto rounded-full flex items-center justify-center"
            style={{ backgroundColor: `${profileResult.color}20`, color: profileResult.color }}
          >
            <IconComponent className="w-10 h-10" />
          </div>
          
          <div className="space-y-3">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight">
              {profileResult.title}
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {profileResult.tagline}
            </p>
          </div>

          <div className="space-y-3 py-6">
            <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Your Investment Profile Score</p>
            <p className="text-6xl md:text-7xl font-bold" style={{ color: profileResult.color }}>
              {profileResult.score}
            </p>
            <p className="text-sm text-muted-foreground">out of 100</p>
          </div>

          <div className="flex gap-3 justify-center flex-wrap">
            <Button 
              onClick={() => setShowDetails(!showDetails)}
              className="gap-2"
              data-testid="button-view-full-report"
            >
              <PieChart className="w-4 h-4" />
              {showDetails ? "Hide Details" : "View Full Report"}
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setLocation("/")}
              data-testid="button-start-over"
            >
              Start New Assessment
            </Button>
          </div>

          <div className="mt-4 max-w-md mx-auto">
            <PDFReportDownload 
              profileResult={profileResult} 
              scores={scores as any}
            />
          </div>
        </Card>

        {/* Validation Warning */}
        {validation.warning && (
          <Card className="p-4 bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800">
            <div className="flex gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-amber-900 dark:text-amber-100">
                  Important Notice
                </p>
                <p className="text-sm text-amber-700 dark:text-amber-300 mt-1">
                  {validation.message}
                </p>
              </div>
            </div>
          </Card>
        )}

        {showDetails && (
          <div className="space-y-6 animate-in fade-in slide-in-from-top-4 duration-300">
            {/* Profile Description */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-foreground mb-4">Your Profile</h2>
              <p className="text-base text-foreground leading-relaxed">
                {profileResult.description}
              </p>
            </Card>

            {/* Profile Traits */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-foreground mb-4">Your Profile Traits</h2>
              <div className="space-y-3">
                {profileResult.traits.map((trait, i) => (
                  <div key={i} className="flex gap-3">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <p className="text-base text-foreground">{trait}</p>
                  </div>
                ))}
                {profileResult.warnings.map((warning, i) => (
                  <div key={i} className="flex gap-3">
                    <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <p className="text-base text-foreground">{warning}</p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Portfolio Allocation */}
            <Card className="p-6">
              <h2 className="text-2xl font-bold text-foreground mb-6">Recommended Portfolio</h2>
              
              <DonutChart 
                data={[
                  { name: "Equity", value: profileResult.allocation.equity, color: "#4CD9B0" },
                  { name: "Debt", value: profileResult.allocation.debt, color: "#FFC857" },
                  { name: "Alternatives", value: profileResult.allocation.alternatives, color: "#A78BFA" },
                ]}
                size={240}
              />

              <div className="mt-6 space-y-4 pt-6 border-t border-border">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Expected Annual Return</span>
                  <span className="text-base font-bold text-primary">{profileResult.expectedReturn}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Risk Level</span>
                  <span className="text-base font-bold text-foreground">{profileResult.riskLevel}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Volatility</span>
                  <span className="text-base font-bold text-foreground">{profileResult.volatility}</span>
                </div>
              </div>
            </Card>

            {/* Score Breakdown */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-foreground mb-4">Score Breakdown</h2>
              <div className="space-y-4">
                {[
                  { label: "Financial Capacity", score: scores.capacityScore, max: 30 },
                  { label: "Risk Tolerance", score: scores.toleranceScore, max: 40 },
                  { label: "Time Horizon", score: scores.timeScore, max: 20 },
                  { label: "Experience", score: scores.experienceScore, max: 10 },
                ].map((item) => (
                  <div key={item.label} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{item.label}</span>
                      <span className="font-semibold text-foreground">
                        {item.score}/{item.max}
                      </span>
                    </div>
                    <Progress value={((item.score ?? 0) / item.max) * 100} className="h-2" />
                  </div>
                ))}
              </div>
            </Card>

            {/* Behavioral Insights */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-foreground mb-4">Behavioral Insights</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-base font-semibold text-foreground mb-2">During Market Volatility</h3>
                  <p className="text-base text-muted-foreground leading-relaxed">
                    {profileResult.behavioralInsights.volatility}
                  </p>
                </div>
                <div>
                  <h3 className="text-base font-semibold text-foreground mb-2">Decision-Making Style</h3>
                  <p className="text-base text-muted-foreground leading-relaxed">
                    {profileResult.behavioralInsights.decisionMaking}
                  </p>
                </div>
              </div>
            </Card>

            {/* Investment Approach */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6">
                <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Check className="w-5 h-5 text-green-600" />
                  Best Suited For
                </h2>
                <ul className="space-y-2">
                  {profileResult.bestSuitedFor.map((item, i) => (
                    <li key={i} className="text-sm text-foreground flex gap-2">
                      <span className="text-primary">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>

              <Card className="p-6">
                <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-amber-600" />
                  Less Suitable For
                </h2>
                <ul className="space-y-2">
                  {profileResult.lessSuitedFor.map((item, i) => (
                    <li key={i} className="text-sm text-muted-foreground flex gap-2">
                      <span>•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>

            {/* Next Steps */}
            <Card className="p-6 bg-primary/5 border-primary/20">
              <div className="flex gap-3">
                <TrendingUp className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <h2 className="text-lg font-semibold text-foreground mb-2">Next Steps</h2>
                  <p className="text-base text-foreground leading-relaxed">
                    {profileResult.nextSteps}
                  </p>
                </div>
              </div>
            </Card>

            {/* Demographic Comparison */}
            <Card className="p-6">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-foreground mb-2">How You Compare</h2>
                <p className="text-sm text-muted-foreground">
                  See how your investment profile compares to other NRI investors with similar financial profiles.
                </p>
              </div>
              <DemographicComparison 
                networthLevel={responses.q2_networth || ""} 
                totalScore={scores.totalScore} 
              />
            </Card>

            {/* Matched Advisors */}
            <Card className="p-6">
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="w-6 h-6 text-primary" />
                  <h2 className="text-xl font-semibold text-foreground">Connect with Expert Advisors</h2>
                </div>
                <p className="text-sm text-muted-foreground">
                  Based on your {profileResult.title} profile, here are wealth advisors who specialize in serving clients like you.
                </p>
              </div>
              <AdvisorMatch 
                profileType={profileResult.type} 
                networthLevel={responses.q2_networth || ""} 
              />
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
