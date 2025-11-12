var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// server/index.ts
import express2 from "express";

// server/routes.ts
import { createServer } from "http";

// shared/schema.ts
var schema_exports = {};
__export(schema_exports, {
  advisors: () => advisors,
  assessments: () => assessments,
  insertAdvisorSchema: () => insertAdvisorSchema,
  insertAssessmentSchema: () => insertAssessmentSchema,
  insertUserSchema: () => insertUserSchema,
  users: () => users
});
import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, jsonb, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
var users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull()
});
var insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true
});
var assessments = pgTable("assessments", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  // Section A: Financial Foundation
  q1_employment: text("q1_employment").notNull(),
  q1_income: text("q1_income").notNull(),
  q2_networth: text("q2_networth").notNull(),
  q3_sources: jsonb("q3_sources").notNull().$type(),
  q4_knowledge: text("q4_knowledge").notNull(),
  q4_products: jsonb("q4_products").notNull().$type(),
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
  completedAt: timestamp("completed_at")
});
var insertAssessmentSchema = createInsertSchema(assessments).omit({
  id: true,
  createdAt: true
});
var advisors = pgTable("advisors", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  title: text("title").notNull(),
  company: text("company").notNull(),
  location: text("location").notNull(),
  // e.g., "Dubai, UAE"
  photoUrl: text("photo_url"),
  bio: text("bio").notNull(),
  specializations: jsonb("specializations").notNull().$type(),
  profileTypes: jsonb("profile_types").notNull().$type(),
  minInvestment: integer("min_investment"),
  credentials: jsonb("credentials").notNull().$type(),
  yearsExperience: integer("years_experience").notNull(),
  contactEmail: text("contact_email").notNull(),
  contactPhone: text("contact_phone"),
  linkedIn: text("linked_in"),
  isActive: integer("is_active").notNull().default(1),
  createdAt: timestamp("created_at").defaultNow()
});
var insertAdvisorSchema = createInsertSchema(advisors).omit({
  id: true,
  createdAt: true
});

// server/storage.ts
import { randomUUID } from "crypto";

// server/db.ts
import { Pool, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";
import ws from "ws";
neonConfig.webSocketConstructor = ws;
var pool = new Pool({ connectionString: process.env.DATABASE_URL });
var db = drizzle({ client: pool, schema: schema_exports });

// server/storage.ts
import { eq } from "drizzle-orm";
var MemStorage = class {
  users = /* @__PURE__ */ new Map();
  // --- User Methods ---
  async getUser(id) {
    return this.users.get(id);
  }
  async getUserByUsername(username) {
    return Array.from(this.users.values()).find((u) => u.username === username);
  }
  async createUser(insertUser) {
    const id = randomUUID();
    const user = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  assessments = /* @__PURE__ */ new Map();
  // --- Assessment Methods ---
  async createAssessment(assessment) {
    const id = randomUUID();
    const now = /* @__PURE__ */ new Date();
    const newAssessment = {
      // Required fields with defaults
      id,
      q1_employment: assessment.q1_employment || "",
      q1_income: assessment.q1_income || "",
      q2_networth: assessment.q2_networth || "",
      q3_sources: Array.isArray(assessment.q3_sources) ? [...assessment.q3_sources] : [],
      q4_knowledge: assessment.q4_knowledge || "",
      q4_products: Array.isArray(assessment.q4_products) ? [...assessment.q4_products] : [],
      q5_horizon: assessment.q5_horizon || "",
      q6_goals: assessment.q6_goals || "",
      q7_comfort: assessment.q7_comfort || "",
      q8_volatility: assessment.q8_volatility || "",
      q9_fomo: assessment.q9_fomo || "",
      q10_dependents: assessment.q10_dependents || "",
      q11_emergency: assessment.q11_emergency || "",
      q12_liquidity: assessment.q12_liquidity || "",
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
  async getAssessment(id) {
    return this.assessments.get(id);
  }
  async updateAssessment(id, updates) {
    const assessment = this.assessments.get(id);
    if (!assessment) return void 0;
    const cleanUpdates = { ...updates };
    if ("q3_sources" in updates) {
      cleanUpdates.q3_sources = Array.isArray(updates.q3_sources) ? [...updates.q3_sources] : [];
    }
    if ("q4_products" in updates) {
      cleanUpdates.q4_products = Array.isArray(updates.q4_products) ? [...updates.q4_products] : [];
    }
    const updatedAssessment = {
      ...assessment,
      ...cleanUpdates
      // Don't include updatedAt as it's not in the schema
    };
    this.assessments.set(id, updatedAssessment);
    return updatedAssessment;
  }
  // --- Advisor & Demographic Methods (no-op) ---
  async getMatchedAdvisors() {
    throw new Error("getMatchedAdvisors not implemented in MemStorage");
  }
  async getDemographicComparison() {
    throw new Error("getDemographicComparison not implemented in MemStorage");
  }
};
var DatabaseStorage = class {
  // --- User Methods (not yet implemented in DB) ---
  async getUser() {
    throw new Error("getUser not implemented in DatabaseStorage");
  }
  async getUserByUsername() {
    throw new Error("getUserByUsername not implemented in DatabaseStorage");
  }
  async createUser() {
    throw new Error("createUser not implemented in DatabaseStorage");
  }
  // --- Assessment CRUD ---
  async createAssessment(insertAssessment) {
    const [assessment] = await db.insert(assessments).values(insertAssessment).returning();
    return assessment;
  }
  async getAssessment(id) {
    const [assessment] = await db.select().from(assessments).where(eq(assessments.id, id));
    return assessment || void 0;
  }
  async updateAssessment(id, updates) {
    const [assessment] = await db.update(assessments).set(updates).where(eq(assessments.id, id)).returning();
    return assessment || void 0;
  }
  // --- Advisor Matching ---
  async getMatchedAdvisors(profileType, networthLevel) {
    const allAdvisors = await db.select().from(advisors).where(eq(advisors.isActive, 1));
    const networthUSD = this.convertNetworthToUSD(networthLevel);
    return allAdvisors.filter((advisor) => {
      const profiles = advisor.profileTypes;
      const matchesProfile = profiles.includes(profileType);
      const meetsMinimum = !advisor.minInvestment || networthUSD >= advisor.minInvestment;
      return matchesProfile && meetsMinimum;
    });
  }
  convertNetworthToUSD(networthLevel) {
    const conversionMap = {
      less_than_36k: 1e4,
      "36k_120k": 35e3,
      "120k_300k": 85e3,
      "300k_600k": 165e3,
      "600k_plus": 2e5
    };
    return conversionMap[networthLevel] || 0;
  }
  // --- Demographic Comparison ---
  async getDemographicComparison(networthLevel, totalScore) {
    const similarAssessments = await db.select().from(assessments).where(eq(assessments.q2_networth, networthLevel));
    const totalAssessments = similarAssessments.length;
    const scores = similarAssessments.map((a) => a.totalScore || 0);
    const averageScore = scores.length > 0 ? Math.round(scores.reduce((sum, s) => sum + s, 0) / scores.length) : 0;
    const scoresBelow = scores.filter((s) => s < totalScore).length;
    const percentile = totalAssessments > 0 ? Math.round(scoresBelow / totalAssessments * 100) : 50;
    const profileCounts = {};
    similarAssessments.forEach((a) => {
      const profile = a.profileType || "unknown";
      profileCounts[profile] = (profileCounts[profile] || 0) + 1;
    });
    const profileType = totalScore >= 86 ? "bold_explorer" : totalScore >= 66 ? "growth_seeker" : totalScore >= 46 ? "balanced_grower" : totalScore >= 26 ? "steady_builder" : "conservative_guardian";
    return {
      profileType,
      yourScore: totalScore,
      averageScore,
      percentile,
      totalAssessments,
      profileDistribution: profileCounts
    };
  }
};
var storage = process.env.NODE_ENV === "development" ? new MemStorage() : new DatabaseStorage();

// client/src/lib/scoring.ts
var INCOME_SCORE = {
  none: 0,
  up_to_36k: 1.5,
  "36k_120k": 3,
  "120k_300k": 4.5,
  "300k_600k": 6,
  "600k_plus": 7.5
};
var NETWORTH_SCORE = {
  less_than_36k: 0,
  "36k_120k": 1.5,
  "120k_300k": 3,
  "300k_600k": 4.5,
  "600k_plus": 7.5
};
var DEPENDENTS_SCORE = {
  just_myself: 6,
  "1_2_dependents": 4,
  "3_4_dependents": 2,
  "5_plus_dependents": 0
};
var EMERGENCY_SCORE = {
  less_than_3m: 0,
  "3_6_months": 2,
  "6_12_months": 4,
  "12_plus_months": 6
};
var LIQUIDITY_SCORE = {
  yes_need_funds: 0,
  maybe_have_savings: 1.5,
  no_expenses: 3
};
var GOAL_SCORE = {
  high_growth: 10,
  moderate_growth: 7.5,
  balanced_growth: 5,
  conservative_growth: 2.5,
  capital_preservation: 0
};
var COMFORT_SCORE = {
  prefer_guaranteed: 0,
  moderate_swings: 5,
  comfortable_volatility: 10
};
var VOLATILITY_SCORE = {
  sell_immediately: 0,
  hold_and_wait: 6,
  invest_more: 12
};
var FOMO_SCORE = {
  should_take_more_risk: 0,
  different_strategies: 4,
  research_thoroughly: 6,
  trust_diversification: 8
};
var HORIZON_SCORE = {
  less_than_3y: 0,
  "3_5_years": 7,
  "5_10_years": 13,
  more_than_10y: 20
};
var KNOWLEDGE_SCORE = {
  no_knowledge: 0,
  beginner: 1.5,
  intermediate: 3,
  experienced: 4,
  expert: 5
};
function calculateProductScore(products) {
  if (products.includes("none")) return 0;
  if (products.includes("crypto")) return 5;
  if (products.includes("stocks")) return 4;
  if (products.includes("etfs")) return 3;
  if (products.includes("mutual_funds")) return 2;
  if (products.includes("savings_fd")) return 1;
  return 0;
}
function calculateScores(responses) {
  const capacityScore = (INCOME_SCORE[responses.q1_income] || 0) + (NETWORTH_SCORE[responses.q2_networth] || 0) + (DEPENDENTS_SCORE[responses.q10_dependents] || 0) + (EMERGENCY_SCORE[responses.q11_emergency] || 0) + (LIQUIDITY_SCORE[responses.q12_liquidity] || 0);
  const toleranceScore = (GOAL_SCORE[responses.q6_goals] || 0) + (COMFORT_SCORE[responses.q7_comfort] || 0) + (VOLATILITY_SCORE[responses.q8_volatility] || 0) + (FOMO_SCORE[responses.q9_fomo] || 0);
  const timeScore = HORIZON_SCORE[responses.q5_horizon] || 0;
  const experienceScore = (KNOWLEDGE_SCORE[responses.q4_knowledge] || 0) + calculateProductScore(responses.q4_products || []);
  const totalScore = capacityScore + toleranceScore + timeScore + experienceScore;
  return {
    capacityScore: Math.round(capacityScore * 10) / 10,
    toleranceScore: Math.round(toleranceScore * 10) / 10,
    timeScore: Math.round(timeScore * 10) / 10,
    experienceScore: Math.round(experienceScore * 10) / 10,
    totalScore: Math.round(totalScore)
  };
}
function getProfileType(score) {
  if (score >= 86) return "bold_explorer";
  if (score >= 66) return "growth_seeker";
  if (score >= 46) return "balanced_grower";
  if (score >= 26) return "steady_builder";
  return "conservative_guardian";
}

// server/routes.ts
import { z } from "zod";
var createAssessmentSchema = z.object({
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
  q12_liquidity: z.string()
});
async function registerRoutes(app2) {
  app2.post("/api/assessments", async (req, res) => {
    try {
      const validated = createAssessmentSchema.parse(req.body);
      const scores = calculateScores({
        q1_employment: validated.q1_employment,
        q1_income: validated.q1_income,
        q2_networth: validated.q2_networth,
        q3_sources: validated.q3_sources,
        q4_knowledge: validated.q4_knowledge,
        q4_products: validated.q4_products,
        q5_horizon: validated.q5_horizon,
        q6_goals: validated.q6_goals,
        q7_comfort: validated.q7_comfort,
        q8_volatility: validated.q8_volatility,
        q9_fomo: validated.q9_fomo,
        q10_dependents: validated.q10_dependents,
        q11_emergency: validated.q11_emergency,
        q12_liquidity: validated.q12_liquidity
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
        completedAt: /* @__PURE__ */ new Date()
      });
      res.json(assessment);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid request data", details: error.errors });
      } else {
        console.error("Error creating assessment:", error);
        res.status(500).json({ error: "Failed to create assessment" });
      }
    }
  });
  app2.get("/api/assessments/:id", async (req, res) => {
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
  app2.get("/api/advisors/matched", async (req, res) => {
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
      const advisors2 = await storage.getMatchedAdvisors(
        profileType,
        networthLevel || ""
      );
      res.json(advisors2);
    } catch (error) {
      console.error("Error fetching matched advisors:", error);
      res.status(500).json({ error: "Failed to fetch advisors" });
    }
  });
  app2.get("/api/demographics/comparison", async (req, res) => {
    try {
      const { networthLevel, totalScore } = req.query;
      if (!networthLevel || !totalScore) {
        res.status(400).json({ error: "networthLevel and totalScore are required" });
        return;
      }
      if (!storage.getDemographicComparison) {
        res.status(500).json({ error: "Demographic comparison not implemented" });
        return;
      }
      const comparison = await storage.getDemographicComparison(
        networthLevel,
        parseInt(totalScore)
      );
      res.json(comparison);
    } catch (error) {
      console.error("Error fetching demographic comparison:", error);
      res.status(500).json({ error: "Failed to fetch comparison data" });
    }
  });
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs from "fs";
import path2 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      ),
      await import("@replit/vite-plugin-dev-banner").then(
        (m) => m.devBanner()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets")
    }
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"]
    }
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/index.ts
var app = express2();
app.use(express2.json({
  verify: (req, _res, buf) => {
    req.rawBody = buf;
  }
}));
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path3 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path3.startsWith("/api")) {
      let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = parseInt(process.env.PORT || "8080", 10);
  server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
})();
