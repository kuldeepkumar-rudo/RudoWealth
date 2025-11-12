import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { calculateScores, getProfileType } from "../client/src/lib/scoring";
import { z } from "zod";

/* -------------------------------------------------------------------------- */
/*                          Request Validation Schemas                        */
/* -------------------------------------------------------------------------- */
const createAssessmentSchema = z.object({
  q1_employment: z.string(),
  q1_income: z.string(),
  q2_networth: z.string(),
  q3_sources: z.array(z.string()),
  q4_knowledge: z.string(),
  q4_products: z.array(z.string()),
  q5_horizon: z.string(),
  q6_goals: z.string(),
  q7_comfort: z.string(),
  q8_volatility: z.string(),
  q9_fomo: z.string(),
  q10_dependents: z.string(),
  q11_emergency: z.string(),
  q12_liquidity: z.string(),
});

/* -------------------------------------------------------------------------- */
/*                             Register API Routes                            */
/* -------------------------------------------------------------------------- */
export async function registerRoutes(app: Express): Promise<Server> {
  // ✅ All routes are prefixed with /api
  // ✅ Use the `storage` interface for CRUD operations
  // Example: storage.createUser(user) or storage.getUserByUsername(username)

  /* ------------------------------ Create Assessment ------------------------------ */
  app.post("/api/assessments", async (req, res) => {
    try {
      const validated = createAssessmentSchema.parse(req.body);

      // Calculate scores
      const scores = calculateScores({
        q1_employment: validated.q1_employment as any,
        q1_income: validated.q1_income as any,
        q2_networth: validated.q2_networth as any,
        q3_sources: validated.q3_sources as any,
        q4_knowledge: validated.q4_knowledge as any,
        q4_products: validated.q4_products as any,
        q5_horizon: validated.q5_horizon as any,
        q6_goals: validated.q6_goals as any,
        q7_comfort: validated.q7_comfort as any,
        q8_volatility: validated.q8_volatility as any,
        q9_fomo: validated.q9_fomo as any,
        q10_dependents: validated.q10_dependents as any,
        q11_emergency: validated.q11_emergency as any,
        q12_liquidity: validated.q12_liquidity as any,
      });

      const profileType = getProfileType(scores.totalScore);

      const assessment = await storage.createAssessment({
        ...validated,
        capacityScore: Math.round(scores.capacityScore),
        toleranceScore: Math.round(scores.toleranceScore),
        timeScore: Math.round(scores.timeScore),
        experienceScore: Math.round(scores.experienceScore),
        totalScore: scores.totalScore,
        profileType,
        completedAt: new Date(),
      });

      res.json(assessment);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res
          .status(400)
          .json({ error: "Invalid request data", details: error.errors });
      } else {
        console.error("Error creating assessment:", error);
        res.status(500).json({ error: "Failed to create assessment" });
      }
    }
  });

  /* ------------------------------ Get Assessment by ID ------------------------------ */
  app.get("/api/assessments/:id", async (req, res) => {
    try {
      const assessment = await storage.getAssessment(req.params.id);

      if (!assessment) {
        res.status(404).json({ error: "Assessment not found" });
        return;
      }

      res.json(assessment);
    } catch (error) {
      console.error("Error fetching assessment:", error);
      res.status(500).json({ error: "Failed to fetch assessment" });
    }
  });

  /* -------------------------- Get Matched Advisors -------------------------- */
  app.get("/api/advisors/matched", async (req, res) => {
    try {
      const { profileType, networthLevel } = req.query;

      if (!profileType || typeof profileType !== "string") {
        res.status(400).json({ error: "profileType is required" });
        return;
      }

      if (!storage.getMatchedAdvisors) {
        res.status(500).json({ error: "Advisor matching not implemented" });
        return;
      }

      const advisors = await storage.getMatchedAdvisors(
        profileType,
        (networthLevel as string) || ""
      );

      res.json(advisors);
    } catch (error) {
      console.error("Error fetching matched advisors:", error);
      res.status(500).json({ error: "Failed to fetch advisors" });
    }
  });

  /* --------------------- Get Demographic Comparison Data --------------------- */
  app.get("/api/demographics/comparison", async (req, res) => {
    try {
      const { networthLevel, totalScore } = req.query;

      if (!networthLevel || !totalScore) {
        res
          .status(400)
          .json({ error: "networthLevel and totalScore are required" });
        return;
      }

      if (!storage.getDemographicComparison) {
        res
          .status(500)
          .json({ error: "Demographic comparison not implemented" });
        return;
      }

      const comparison = await storage.getDemographicComparison(
        networthLevel as string,
        parseInt(totalScore as string)
      );

      res.json(comparison);
    } catch (error) {
      console.error("Error fetching demographic comparison:", error);
      res.status(500).json({ error: "Failed to fetch comparison data" });
    }
  });

  /* ------------------------------ Create HTTP Server ------------------------------ */
  const httpServer = createServer(app);
  return httpServer;
}
