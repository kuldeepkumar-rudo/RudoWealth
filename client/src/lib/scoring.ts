import type {
  AssessmentResponses,
  ProfileType,
  ProfileResult,
  PortfolioAllocation,
  ValidationWarning
} from "@shared/schema";

// Scoring constants
const INCOME_SCORE = {
  none: 0,
  up_to_36k: 1.5,
  "36k_120k": 3,
  "120k_300k": 4.5,
  "300k_600k": 6,
  "600k_plus": 7.5,
};

const NETWORTH_SCORE = {
  less_than_36k: 0,
  "36k_120k": 1.5,
  "120k_300k": 3,
  "300k_600k": 4.5,
  "600k_plus": 7.5,
};

const DEPENDENTS_SCORE = {
  just_myself: 6,
  "1_2_dependents": 4,
  "3_4_dependents": 2,
  "5_plus_dependents": 0,
};

const EMERGENCY_SCORE = {
  less_than_3m: 0,
  "3_6_months": 2,
  "6_12_months": 4,
  "12_plus_months": 6,
};

const LIQUIDITY_SCORE = {
  yes_need_funds: 0,
  maybe_have_savings: 1.5,
  no_expenses: 3,
};

const GOAL_SCORE = {
  high_growth: 10,
  moderate_growth: 7.5,
  balanced_growth: 5,
  conservative_growth: 2.5,
  capital_preservation: 0,
};

const COMFORT_SCORE = {
  prefer_guaranteed: 0,
  moderate_swings: 5,
  comfortable_volatility: 10,
};

const VOLATILITY_SCORE = {
  sell_immediately: 0,
  hold_and_wait: 6,
  invest_more: 12,
};

const FOMO_SCORE = {
  should_take_more_risk: 0,
  different_strategies: 4,
  research_thoroughly: 6,
  trust_diversification: 8,
};

const HORIZON_SCORE = {
  less_than_3y: 0,
  "3_5_years": 7,
  "5_10_years": 13,
  more_than_10y: 20,
};

const KNOWLEDGE_SCORE = {
  no_knowledge: 0,
  beginner: 1.5,
  intermediate: 3,
  experienced: 4,
  expert: 5,
};

// Product complexity scoring
function calculateProductScore(products: string[]): number {
  if (products.includes("none")) return 0;
  if (products.includes("crypto")) return 5;
  if (products.includes("stocks")) return 4;
  if (products.includes("etfs")) return 3;
  if (products.includes("mutual_funds")) return 2;
  if (products.includes("savings_fd")) return 1;
  return 0;
}

// Profile allocations
const ALLOCATIONS: Record<ProfileType, PortfolioAllocation> = {
  conservative_guardian: { equity: 20, debt: 70, alternatives: 10 },
  steady_builder: { equity: 40, debt: 50, alternatives: 10 },
  balanced_grower: { equity: 55, debt: 35, alternatives: 10 },
  growth_seeker: { equity: 70, debt: 20, alternatives: 10 },
  bold_explorer: { equity: 80, debt: 10, alternatives: 10 },
};

// Calculate scores
export function calculateScores(responses: AssessmentResponses) {
  const capacityScore = 
    (INCOME_SCORE[responses.q1_income!] || 0) +
    (NETWORTH_SCORE[responses.q2_networth!] || 0) +
    (DEPENDENTS_SCORE[responses.q10_dependents!] || 0) +
    (EMERGENCY_SCORE[responses.q11_emergency!] || 0) +
    (LIQUIDITY_SCORE[responses.q12_liquidity!] || 0);

  const toleranceScore =
    (GOAL_SCORE[responses.q6_goals!] || 0) +
    (COMFORT_SCORE[responses.q7_comfort!] || 0) +
    (VOLATILITY_SCORE[responses.q8_volatility!] || 0) +
    (FOMO_SCORE[responses.q9_fomo!] || 0);

  const timeScore = HORIZON_SCORE[responses.q5_horizon!] || 0;

  const experienceScore =
    (KNOWLEDGE_SCORE[responses.q4_knowledge!] || 0) +
    calculateProductScore(responses.q4_products || []);

  const totalScore = capacityScore + toleranceScore + timeScore + experienceScore;

  return {
    capacityScore: Math.round(capacityScore * 10) / 10,
    toleranceScore: Math.round(toleranceScore * 10) / 10,
    timeScore: Math.round(timeScore * 10) / 10,
    experienceScore: Math.round(experienceScore * 10) / 10,
    totalScore: Math.round(totalScore),
  };
}

// Determine profile type
export function getProfileType(score: number): ProfileType {
  if (score >= 86) return "bold_explorer";
  if (score >= 66) return "growth_seeker";
  if (score >= 46) return "balanced_grower";
  if (score >= 26) return "steady_builder";
  return "conservative_guardian";
}

// Validate profile
export function validateProfile(
  capacityScore: number,
  toleranceScore: number,
  timeScore: number
): ValidationWarning {
  if (capacityScore < 15 && toleranceScore > 25) {
    return {
      warning: true,
      message: "Your risk appetite exceeds your financial capacity. Consider building emergency fund first.",
    };
  }

  if (timeScore < 7 && toleranceScore > 25) {
    return {
      warning: true,
      message: "Your short time horizon may not support high-risk investments.",
    };
  }

  return { warning: false };
}

// Get full profile result
export function getProfileResult(
  responses: AssessmentResponses
): ProfileResult {
  const scores = calculateScores(responses);
  const profileType = getProfileType(scores.totalScore);
  const allocation = ALLOCATIONS[profileType];

  const profiles: Record<ProfileType, Omit<ProfileResult, "score" | "allocation">> = {
    conservative_guardian: {
      type: "conservative_guardian",
      title: "Conservative Guardian",
      tagline: "Safety-focused, capital preservation",
      color: "hsl(210, 20%, 55%)",
      icon: "shield",
      expectedReturn: "5-7%",
      riskLevel: "Very Low",
      volatility: "Minimal",
      traits: [
        "Risk-averse approach to investing",
        "Prefer guaranteed or near-guaranteed returns",
        "Short time horizon or immediate liquidity needs",
        "Limited investment experience",
      ],
      warnings: [
        "May miss long-term growth opportunities",
        "Returns may not outpace inflation significantly",
      ],
      description:
        "You prioritize the security of your capital above all else. Market volatility causes you stress, and you prefer the peace of mind that comes with stable, predictable returns. Your approach is cautious and defensive.",
      behavioralInsights: {
        volatility:
          "You prefer to avoid risk entirely and would likely move to safety at the first sign of market stress. This protects your capital but may limit long-term wealth building.",
        decisionMaking:
          "You value security over growth and are comfortable sacrificing returns for peace of mind. You're unlikely to be swayed by market trends or peer performance.",
      },
      bestSuitedFor: [
        "Fixed deposits and bonds",
        "Conservative debt mutual funds",
        "Capital protection funds",
        "Regular income generation",
      ],
      lessSuitedFor: [
        "Direct equity investing",
        "High-growth funds",
        "Volatile market segments",
        "Long-term wealth creation strategies",
      ],
      nextSteps:
        "While your conservative approach protects capital, consider gradually building comfort with moderate-risk investments as your financial security grows.",
    },
    steady_builder: {
      type: "steady_builder",
      title: "Steady Builder",
      tagline: "Consistent progress, patient approach",
      color: "hsl(150, 28%, 50%)",
      icon: "layers",
      expectedReturn: "7-10%",
      riskLevel: "Low to Moderate",
      volatility: "Manageable fluctuations",
      traits: [
        "Balanced risk tolerance",
        "Moderate financial capacity",
        "Medium-term investment horizon (3-7 years)",
        "Growing investment knowledge",
        "Patient and disciplined approach",
      ],
      warnings: ["May be tempted to chase returns during bull markets"],
      description:
        "You take a measured, patient approach to wealth building. You're willing to accept some market fluctuations for better returns than pure fixed income, but you want clear limits on downside risk. You value consistency over excitement.",
      behavioralInsights: {
        volatility:
          "You may feel concerned during market drops but are likely to hold steady rather than make emotional decisions. Your patience is your advantage.",
        decisionMaking:
          "You're thoughtful and avoid impulsive moves. You may occasionally question your strategy when others outperform, but you ultimately trust your plan.",
      },
      bestSuitedFor: [
        "Balanced mutual funds",
        "Conservative hybrid funds",
        "Systematic investment plans (SIPs)",
        "Goal-based investing",
      ],
      lessSuitedFor: [
        "Aggressive growth funds",
        "Sector-specific bets",
        "Speculative investments",
        "Short-term trading",
      ],
      nextSteps:
        "Your steady approach is well-suited for long-term success. Consider gradually increasing equity allocation as your confidence and financial capacity grow.",
    },
    balanced_grower: {
      type: "balanced_grower",
      title: "Balanced Grower",
      tagline: "Strategic growth with guardrails",
      color: "hsl(186, 51%, 38%)",
      icon: "scale",
      expectedReturn: "10-12%",
      riskLevel: "Moderate",
      volatility: "Expected and manageable",
      traits: [
        "Strong financial runway (6-12 month emergency fund)",
        "Long-term investment horizon (5-10 years)",
        "Emotionally steady during volatility",
        "Disciplined decision-maker",
        "Balanced risk-reward perspective",
      ],
      warnings: ["Watch for occasional peer comparison tendencies"],
      description:
        "You're strategic and opportunity-seeking, with the financial stability to pursue meaningful growth. You understand that markets fluctuate but stay focused on long-term goals. You want growth but with appropriate risk management.",
      behavioralInsights: {
        volatility:
          "You demonstrated calm and rational thinking. When markets fell 20%, you chose to hold steady rather than panic-sell. This emotional stability is a key strength for long-term investing.",
        decisionMaking:
          "You're disciplined but aware of peer performance. While you value your strategy, you may occasionally question it when others outperform. Remember: Diversification may underperform in short bursts but reduces long-term risk.",
      },
      bestSuitedFor: [
        "Diversified equity funds",
        "Balanced advantage funds",
        "Index funds and ETFs",
        "Long-term systematic investing",
        "Tax-efficient strategies",
      ],
      lessSuitedFor: [
        "Concentrated stock picking",
        "Market timing strategies",
        "High-frequency trading",
        "Speculative investments",
      ],
      nextSteps:
        "You're well-positioned for wealth building. Focus on staying disciplined during market cycles and avoid the temptation to chase short-term performance.",
    },
    growth_seeker: {
      type: "growth_seeker",
      title: "Growth Seeker",
      tagline: "Calculated risks for meaningful returns",
      color: "hsl(210, 40%, 48%)",
      icon: "target",
      expectedReturn: "12-16%",
      riskLevel: "Moderate to High",
      volatility: "Significant short-term swings expected",
      traits: [
        "High financial capacity and stability",
        "Very long investment horizon (10+ years)",
        "Strong emotional resilience during downturns",
        "Experienced investor with good knowledge",
        "Growth-oriented mindset",
        "Comfortable with calculated risks",
      ],
      warnings: ["Ensure adequate emergency funds remain liquid"],
      description:
        "You're confident and opportunity-focused with a long investment horizon. You understand that building substantial wealth requires accepting market volatility. You're willing to endure short-term fluctuations for long-term gains.",
      behavioralInsights: {
        volatility:
          "You view market corrections as opportunities rather than threats. When markets dropped 20%, you considered investing more. This long-term perspective is crucial for wealth creation but requires discipline to execute.",
        decisionMaking:
          "You're confident and proactive. You research opportunities and aren't swayed by short-term noise. Your challenge is maintaining diversification while pursuing growth.",
      },
      bestSuitedFor: [
        "Growth-oriented equity funds",
        "Mid and small cap funds",
        "International equity exposure",
        "Thematic and sector funds (selective)",
        "Direct equity (with research)",
      ],
      lessSuitedFor: [
        "Conservative debt funds",
        "Capital protection strategies",
        "Short-term investments",
        "Overly defensive positioning",
      ],
      nextSteps:
        "Your growth focus is appropriate for your profile. Ensure you maintain disciplined rebalancing and don't become overconfident during bull markets. Regular portfolio reviews are essential.",
    },
    bold_explorer: {
      type: "bold_explorer",
      title: "The Bold Explorer",
      tagline: "Maximum growth, full commitment",
      color: "hsl(270, 35%, 55%)",
      icon: "rocket",
      expectedReturn: "15-20%+",
      riskLevel: "High",
      volatility: "Substantial swings expected and accepted",
      traits: [
        "Exceptional financial capacity (12+ months runway)",
        "Very long investment horizon (10+ years)",
        "Emotionally resilient during major downturns",
        "Sophisticated investment knowledge",
        "High conviction in your strategy",
        "Comfortable with significant volatility",
      ],
      warnings: [
        "Ensure you're not overconfident",
        "Maintain appropriate diversification",
      ],
      description:
        "You're highly experienced, financially secure, and focused on maximum wealth creation. You have the knowledge, capacity, and temperament to pursue aggressive growth strategies. You view volatility as opportunity and have a very long investment horizon.",
      behavioralInsights: {
        volatility:
          "You actively seek opportunities during market downturns. When markets fell 20%, you increased investments to capitalize on lower prices. This requires both financial capacity and emotional strength—which you demonstrate.",
        decisionMaking:
          "You're highly confident and evidence-based. You trust your research and aren't influenced by peer performance or market sentiment. Your challenge is ensuring this confidence doesn't become overconfidence.",
      },
      bestSuitedFor: [
        "Aggressive growth equity funds",
        "Mid and small cap focused strategies",
        "International and emerging markets",
        "Thematic and sector opportunities",
        "Direct equity portfolio management",
        "Alternative investments (REITs, commodities)",
      ],
      lessSuitedFor: [
        "Conservative strategies",
        "Capital preservation funds",
        "Low-risk debt instruments",
        "Short investment horizons",
      ],
      nextSteps:
        "Your aggressive positioning is appropriate given your profile. Focus on maintaining discipline, proper diversification, and regular portfolio reviews. Consider working with an advisor for sophisticated strategies.",
    },
  };

  return {
    ...profiles[profileType],
    score: scores.totalScore,
    allocation,
  };
}
