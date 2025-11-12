import { db } from "./db";
import { advisors } from "@shared/schema";

const sampleAdvisors = [
  {
    name: "Rajesh Kumar",
    title: "Senior Wealth Advisor",
    company: "Emirates Financial Group",
    location: "Dubai, UAE",
    photoUrl: null,
    bio: "Specializing in NRI wealth management with 15+ years of experience helping Indian expatriates navigate cross-border investments, tax optimization, and retirement planning.",
    specializations: ["NRI Taxation", "Wealth Management", "Retirement Planning", "Cross-Border Investing"],
    profileTypes: ["conservative_guardian", "steady_builder", "balanced_grower"],
    minInvestment: 50000,
    credentials: ["CFP", "CFA Level II"],
    yearsExperience: 15,
    contactEmail: "rajesh.kumar@emiratesfinancial.ae",
    contactPhone: "+971-50-123-4567",
    linkedIn: "linkedin.com/in/rajeshkumar-wealth",
    isActive: 1,
  },
  {
    name: "Priya Sharma",
    title: "Investment Strategist",
    company: "Gulf Wealth Advisors",
    location: "Abu Dhabi, UAE",
    photoUrl: null,
    bio: "Expert in growth-focused portfolio strategies for high-net-worth NRIs. Specialized in equity markets, alternative investments, and long-term wealth creation.",
    specializations: ["Equity Strategies", "Alternative Investments", "Portfolio Management", "NRI Services"],
    profileTypes: ["balanced_grower", "growth_seeker", "bold_explorer"],
    minInvestment: 100000,
    credentials: ["CFA", "FRM"],
    yearsExperience: 12,
    contactEmail: "priya.sharma@gulfwealth.ae",
    contactPhone: "+971-50-987-6543",
    linkedIn: "linkedin.com/in/priyasharma-investments",
    isActive: 1,
  },
  {
    name: "Amit Patel",
    title: "Financial Planner",
    company: "Dubai Investment Solutions",
    location: "Dubai, UAE",
    photoUrl: null,
    bio: "Helping NRI families achieve financial security through balanced investment strategies, education planning, and comprehensive wealth management.",
    specializations: ["Financial Planning", "Education Planning", "Insurance", "NRI Banking"],
    profileTypes: ["conservative_guardian", "steady_builder"],
    minInvestment: 25000,
    credentials: ["CFP", "ChFC"],
    yearsExperience: 10,
    contactEmail: "amit.patel@dubanis.ae",
    contactPhone: "+971-4-567-8901",
    linkedIn: "linkedin.com/in/amitpatel-cfp",
    isActive: 1,
  },
  {
    name: "Neha Desai",
    title: "Portfolio Manager",
    company: "Prestige Wealth Management",
    location: "Dubai, UAE",
    photoUrl: null,
    bio: "Boutique wealth management for ambitious NRI investors seeking aggressive growth. Expertise in direct equities, startup investments, and emerging market opportunities.",
    specializations: ["Direct Equity", "Startup Investing", "Emerging Markets", "Risk Management"],
    profileTypes: ["growth_seeker", "bold_explorer"],
    minInvestment: 150000,
    credentials: ["CFA", "MBA Finance"],
    yearsExperience: 8,
    contactEmail: "neha.desai@prestigewealth.ae",
    contactPhone: "+971-50-234-5678",
    linkedIn: "linkedin.com/in/nehadesai-portfolio",
    isActive: 1,
  },
  {
    name: "Suresh Reddy",
    title: "Retirement Planning Specialist",
    company: "SecureLife Advisors",
    location: "Sharjah, UAE",
    photoUrl: null,
    bio: "Dedicated to helping NRIs build secure retirement portfolios with conservative strategies, fixed income products, and capital preservation focus.",
    specializations: ["Retirement Planning", "Fixed Income", "Capital Preservation", "Pension Planning"],
    profileTypes: ["conservative_guardian", "steady_builder"],
    minInvestment: 30000,
    credentials: ["CFP", "RMA"],
    yearsExperience: 18,
    contactEmail: "suresh.reddy@securelife.ae",
    contactPhone: "+971-6-345-6789",
    linkedIn: "linkedin.com/in/sureshreddy-retirement",
    isActive: 1,
  },
];

async function seedAdvisors() {
  try {
    console.log("Seeding advisors...");
    
    for (const advisor of sampleAdvisors) {
      await db.insert(advisors).values(advisor);
      console.log(`✓ Added advisor: ${advisor.name}`);
    }
    
    console.log("\n✅ Successfully seeded all advisors!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding advisors:", error);
    process.exit(1);
  }
}

seedAdvisors();
