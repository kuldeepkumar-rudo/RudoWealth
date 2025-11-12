import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, jsonb, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

/* ----------------------------- USERS TABLE ----------------------------- */
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

/* --------------------------- ASSESSMENTS TABLE -------------------------- */
export const assessments = pgTable("assessments", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),

  // Section A: Financial Foundation
  q1_employment: text("q1_employment").notNull(),
  q1_income: text("q1_income").notNull(),
  q2_networth: text("q2_networth").notNull(),
  q3_sources: jsonb("q3_sources").notNull().$type<string[]>(),
  q4_knowledge: text("q4_knowledge").notNull(),
  q4_products: jsonb("q4_products").notNull().$type<string[]>(),
  q5_horizon: text("q5_horizon").notNull(),

  // Section B: Personality & Goals
  q6_goals: text("q6_goals").notNull(),
  q7_comfort: text("q7_comfort").notNull(),
  q8_volatility: text("q8_volatility").notNull(),
  q9_fomo: text("q9_fomo").notNull(),

  // Section C: Final Details
  q10_dependents: text("q10_dependents").notNull(),
  q11_emergency: text("q11_emergency").notNull(),
  q12_liquidity: text("q12_liquidity").notNull(),

  // Calculated scores
  capacityScore: integer("capacity_score"),
  toleranceScore: integer("tolerance_score"),
  timeScore: integer("time_score"),
  experienceScore: integer("experience_score"),
  totalScore: integer("total_score"),

  // Profile result
  profileType: text("profile_type"),

  // Metadata
  createdAt: timestamp("created_at").defaultNow(),
  completedAt: timestamp("completed_at"),
});

export const insertAssessmentSchema = createInsertSchema(assessments).omit({
  id: true,
  createdAt: true,
});

export type InsertAssessment = z.infer<typeof insertAssessmentSchema>;
export type Assessment = typeof assessments.$inferSelect;

/* ----------------------------- ADVISORS TABLE ---------------------------- */
export const advisors = pgTable("advisors", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  title: text("title").notNull(),
  company: text("company").notNull(),
  location: text("location").notNull(), // e.g., "Dubai, UAE"
  photoUrl: text("photo_url"),
  bio: text("bio").notNull(),
  specializations: jsonb("specializations").notNull().$type<string[]>(),
  profileTypes: jsonb("profile_types").notNull().$type<string[]>(),
  minInvestment: integer("min_investment"),
  credentials: jsonb("credentials").notNull().$type<string[]>(),
  yearsExperience: integer("years_experience").notNull(),
  contactEmail: text("contact_email").notNull(),
  contactPhone: text("contact_phone"),
  linkedIn: text("linked_in"),
  isActive: integer("is_active").notNull().default(1),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertAdvisorSchema = createInsertSchema(advisors).omit({
  id: true,
  createdAt: true,
});

export type InsertAdvisor = z.infer<typeof insertAdvisorSchema>;
export type Advisor = typeof advisors.$inferSelect;

/* ----------------------------- ENUM TYPES ----------------------------- */
export type EmploymentStatus =
  | "salaried"
  | "self_employed"
  | "business_owner"
  | "retired"
  | "part_time"
  | "student_homemaker";

export type IncomeLevel =
  | "none"
  | "up_to_36k"
  | "36k_120k"
  | "120k_300k"
  | "300k_600k"
  | "600k_plus";

export type NetWorthLevel =
  | "less_than_36k"
  | "36k_120k"
  | "120k_300k"
  | "300k_600k"
  | "600k_plus";

export type FundSource =
  | "employment"
  | "business"
  | "investments"
  | "inheritance"
  | "savings"
  | "family";

export type KnowledgeLevel =
  | "expert"
  | "experienced"
  | "intermediate"
  | "beginner"
  | "no_knowledge";

export type InvestmentProduct =
  | "none"
  | "savings_fd"
  | "mutual_funds"
  | "etfs"
  | "stocks"
  | "crypto";

export type TimeHorizon =
  | "more_than_10y"
  | "5_10_years"
  | "3_5_years"
  | "less_than_3y";

export type InvestmentGoal =
  | "high_growth"
  | "moderate_growth"
  | "balanced_growth"
  | "conservative_growth"
  | "capital_preservation";

export type RiskComfort =
  | "comfortable_volatility"
  | "moderate_swings"
  | "prefer_guaranteed";

export type VolatilityReaction =
  | "invest_more"
  | "hold_and_wait"
  | "sell_immediately";

export type FOMOReaction =
  | "trust_diversification"
  | "research_thoroughly"
  | "different_strategies"
  | "should_take_more_risk";

export type Dependents =
  | "just_myself"
  | "1_2_dependents"
  | "3_4_dependents"
  | "5_plus_dependents";

export type EmergencyFund =
  | "12_plus_months"
  | "6_12_months"
  | "3_6_months"
  | "less_than_3m";

export type LiquidityNeeds =
  | "no_expenses"
  | "maybe_have_savings"
  | "yes_need_funds";

export type ProfileType =
  | "conservative_guardian"
  | "steady_builder"
  | "balanced_grower"
  | "growth_seeker"
  | "bold_explorer";

/* --------------------------- COMPLEX TYPES --------------------------- */
export interface PortfolioAllocation {
  equity: number;
  debt: number;
  alternatives: number;
}

export interface ProfileResult {
  type: ProfileType;
  title: string;
  tagline: string;
  color: string;
  icon: string;
  score: number;
  allocation: PortfolioAllocation;
  expectedReturn: string;
  riskLevel: string;
  volatility: string;
  traits: string[];
  warnings: string[];
  description: string;
  behavioralInsights: {
    volatility: string;
    decisionMaking: string;
  };
  bestSuitedFor: string[];
  lessSuitedFor: string[];
  nextSteps: string;
}

export interface ValidationWarning {
  warning: boolean;
  message?: string;
}
