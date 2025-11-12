import {
  type User,
  type InsertUser,
  type Assessment,
  type InsertAssessment,
  type Advisor,
  type InsertAdvisor,
  assessments,
  advisors,
} from "@shared/schema";
import { randomUUID } from "crypto";
import { db } from "./db";
import { eq } from "drizzle-orm";

/* -------------------------------------------------------------------------- */
/*                                Type Definitions                            */
/* -------------------------------------------------------------------------- */

export interface DemographicComparison {
  profileType: string;
  yourScore: number;
  averageScore: number;
  percentile: number;
  totalAssessments: number;
  profileDistribution: Record<string, number>;
}

/**
 * Unified Storage Interface
 * Handles Users, Assessments, Advisors, and Demographics
 */
export interface IStorage {
  // --- User methods ---
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // --- Assessment methods ---
  createAssessment(assessment: Omit<InsertAssessment, "createdAt">): Promise<Assessment>;
  getAssessment(id: string): Promise<Assessment | undefined>;
  updateAssessment(id: string, updates: Partial<InsertAssessment>): Promise<Assessment | undefined>;

  // --- Advisor matching ---
  getMatchedAdvisors(profileType: string, networthLevel: string): Promise<Advisor[]>;

  // --- Demographic comparison ---
  getDemographicComparison(networthLevel: string, totalScore: number): Promise<DemographicComparison>;
}

/* -------------------------------------------------------------------------- */
/*                               In-Memory Storage                            */
/* -------------------------------------------------------------------------- */

export class MemStorage implements IStorage {
  private users: Map<string, User> = new Map();

  // --- User Methods ---
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find((u) => u.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  private assessments: Map<string, Assessment> = new Map();

  // --- Assessment Methods ---
  async createAssessment(assessment: Omit<InsertAssessment, "createdAt">): Promise<Assessment> {
    const id = randomUUID();
    const now = new Date();
    
    // Create a properly typed assessment object
    const newAssessment: Assessment = {
      // Required fields with defaults
      id,
      q1_employment: assessment.q1_employment || '',
      q1_income: assessment.q1_income || '',
      q2_networth: assessment.q2_networth || '',
      q3_sources: Array.isArray(assessment.q3_sources) ? [...assessment.q3_sources] : [],
      q4_knowledge: assessment.q4_knowledge || '',
      q4_products: Array.isArray(assessment.q4_products) ? [...assessment.q4_products] : [],
      q5_horizon: assessment.q5_horizon || '',
      q6_goals: assessment.q6_goals || '',
      q7_comfort: assessment.q7_comfort || '',
      q8_volatility: assessment.q8_volatility || '',
      q9_fomo: assessment.q9_fomo || '',
      q10_dependents: assessment.q10_dependents || '',
      q11_emergency: assessment.q11_emergency || '',
      q12_liquidity: assessment.q12_liquidity || '',
      
      // Optional fields with defaults
      capacityScore: assessment.capacityScore ?? null,
      toleranceScore: assessment.toleranceScore ?? null,
      timeScore: assessment.timeScore ?? null,
      experienceScore: assessment.experienceScore ?? null,
      totalScore: assessment.totalScore ?? null,
      profileType: assessment.profileType ?? null,
      
      // Timestamps
      createdAt: now,
      completedAt: now
    };
    
    this.assessments.set(id, newAssessment);
    return newAssessment;
  }
  async getAssessment(id: string): Promise<Assessment | undefined> {
    return this.assessments.get(id);
  }
  async updateAssessment(id: string, updates: Partial<InsertAssessment>): Promise<Assessment | undefined> {
    const assessment = this.assessments.get(id);
    if (!assessment) return undefined;
    
    // Create a clean updates object with proper typing
    const cleanUpdates: Partial<Assessment> = { ...updates };
    
    // Handle array updates
    if ('q3_sources' in updates) {
      cleanUpdates.q3_sources = Array.isArray(updates.q3_sources) 
        ? [...updates.q3_sources] 
        : [];
    }
    
    if ('q4_products' in updates) {
      cleanUpdates.q4_products = Array.isArray(updates.q4_products) 
        ? [...updates.q4_products] 
        : [];
    }
    
    // Create updated assessment without modifying the original
    const updatedAssessment: Assessment = {
      ...assessment,
      ...cleanUpdates,
      // Don't include updatedAt as it's not in the schema
    };
    
    this.assessments.set(id, updatedAssessment);
    return updatedAssessment;
  }

  // --- Advisor & Demographic Methods (no-op) ---
  async getMatchedAdvisors(): Promise<Advisor[]> {
    throw new Error("getMatchedAdvisors not implemented in MemStorage");
  }
  async getDemographicComparison(): Promise<DemographicComparison> {
    throw new Error("getDemographicComparison not implemented in MemStorage");
  }
}

/* -------------------------------------------------------------------------- */
/*                               Database Storage                             */
/* -------------------------------------------------------------------------- */

export class DatabaseStorage implements IStorage {
  // --- User Methods (not yet implemented in DB) ---
  async getUser(): Promise<User | undefined> {
    throw new Error("getUser not implemented in DatabaseStorage");
  }

  async getUserByUsername(): Promise<User | undefined> {
    throw new Error("getUserByUsername not implemented in DatabaseStorage");
  }

  async createUser(): Promise<User> {
    throw new Error("createUser not implemented in DatabaseStorage");
  }

  // --- Assessment CRUD ---
  async createAssessment(insertAssessment: Omit<InsertAssessment, "createdAt">): Promise<Assessment> {
    const [assessment] = await db.insert(assessments).values(insertAssessment).returning();
    return assessment;
  }

  async getAssessment(id: string): Promise<Assessment | undefined> {
    const [assessment] = await db.select().from(assessments).where(eq(assessments.id, id));
    return assessment || undefined;
  }

  async updateAssessment(id: string, updates: Partial<InsertAssessment>): Promise<Assessment | undefined> {
    const [assessment] = await db.update(assessments).set(updates).where(eq(assessments.id, id)).returning();
    return assessment || undefined;
  }

  // --- Advisor Matching ---
  async getMatchedAdvisors(profileType: string, networthLevel: string): Promise<Advisor[]> {
    const allAdvisors = await db.select().from(advisors).where(eq(advisors.isActive, 1));
    const networthUSD = this.convertNetworthToUSD(networthLevel);

    return allAdvisors.filter((advisor) => {
      const profiles = advisor.profileTypes as string[];
      const matchesProfile = profiles.includes(profileType);
      const meetsMinimum = !advisor.minInvestment || networthUSD >= advisor.minInvestment;
      return matchesProfile && meetsMinimum;
    });
  }

  private convertNetworthToUSD(networthLevel: string): number {
    const conversionMap: Record<string, number> = {
      less_than_36k: 10000,
      "36k_120k": 35000,
      "120k_300k": 85000,
      "300k_600k": 165000,
      "600k_plus": 200000,
    };
    return conversionMap[networthLevel] || 0;
  }

  // --- Demographic Comparison ---
  async getDemographicComparison(networthLevel: string, totalScore: number): Promise<DemographicComparison> {
    const similarAssessments = await db.select().from(assessments).where(eq(assessments.q2_networth, networthLevel));
    const totalAssessments = similarAssessments.length;
    const scores = similarAssessments.map((a) => a.totalScore || 0);

    const averageScore =
      scores.length > 0 ? Math.round(scores.reduce((sum, s) => sum + s, 0) / scores.length) : 0;

    const scoresBelow = scores.filter((s) => s < totalScore).length;
    const percentile = totalAssessments > 0 ? Math.round((scoresBelow / totalAssessments) * 100) : 50;

    const profileCounts: Record<string, number> = {};
    similarAssessments.forEach((a) => {
      const profile = a.profileType || "unknown";
      profileCounts[profile] = (profileCounts[profile] || 0) + 1;
    });

    const profileType =
      totalScore >= 86
        ? "bold_explorer"
        : totalScore >= 66
        ? "growth_seeker"
        : totalScore >= 46
        ? "balanced_grower"
        : totalScore >= 26
        ? "steady_builder"
        : "conservative_guardian";

    return {
      profileType,
      yourScore: totalScore,
      averageScore,
      percentile,
      totalAssessments,
      profileDistribution: profileCounts,
    };
  }
}

/* -------------------------------------------------------------------------- */
/*                              Export Active Storage                         */
/* -------------------------------------------------------------------------- */

// Switch between in-memory and database depending on environment
export const storage =
  process.env.NODE_ENV === "development"
    ? new MemStorage()
    : new DatabaseStorage();
