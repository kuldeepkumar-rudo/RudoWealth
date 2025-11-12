// import { createContext, useContext, useState, useEffect, ReactNode } from "react";
// import type {
//   EmploymentStatus,
//   IncomeLevel,
//   NetWorthLevel,
//   FundSource,
//   KnowledgeLevel,
//   InvestmentProduct,
//   TimeHorizon,
//   InvestmentGoal,
//   RiskComfort,
//   VolatilityReaction,
//   FOMOReaction,
//   Dependents,
//   EmergencyFund,
//   LiquidityNeeds,
// } from "@shared/schema";

// export interface AssessmentResponses {
//   q1_employment?: EmploymentStatus;
//   q1_income?: IncomeLevel;
//   q2_networth?: NetWorthLevel;
//   q3_sources?: FundSource[];
//   q4_knowledge?: KnowledgeLevel;
//   q4_products?: InvestmentProduct[];
//   q5_horizon?: TimeHorizon;
//   q6_goals?: InvestmentGoal;
//   q7_comfort?: RiskComfort;
//   q8_volatility?: VolatilityReaction;
//   q9_fomo?: FOMOReaction;
//   q10_dependents?: Dependents;
//   q11_emergency?: EmergencyFund;
//   q12_liquidity?: LiquidityNeeds;
// }

// interface AssessmentState {
//   responses: AssessmentResponses;
//   assessmentId?: string;
// }

// interface AssessmentContextType {
//   responses: AssessmentResponses;
//   assessmentId?: string;
//   updateResponse: <K extends keyof AssessmentResponses>(
//     key: K,
//     value: AssessmentResponses[K]
//   ) => void;
//   setAssessmentId: (id: string) => void;
//   resetAssessment: () => void;
// }

// const STORAGE_KEY = "rudo_assessment";

// const AssessmentContext = createContext<AssessmentContextType | null>(null);

// function loadFromStorage(): AssessmentState {
//   try {
//     const stored = localStorage.getItem(STORAGE_KEY);
//     if (stored) {
//       return JSON.parse(stored);
//     }
//   } catch (error) {
//     console.error("Failed to load assessment from localStorage:", error);
//   }
//   return { responses: {} };
// }

// function saveToStorage(state: AssessmentState) {
//   try {
//     localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
//   } catch (error) {
//     console.error("Failed to save assessment to localStorage:", error);
//   }
// }

// export function AssessmentProvider({ children }: { children: ReactNode }) {
//   const [state, setState] = useState<AssessmentState>(() => loadFromStorage());

//   useEffect(() => {
//     saveToStorage(state);
//   }, [state]);

//   const updateResponse = <K extends keyof AssessmentResponses>(
//     key: K,
//     value: AssessmentResponses[K]
//   ) => {
//     setState((prev) => ({
//       ...prev,
//       responses: { ...prev.responses, [key]: value }
//     }));
//   };

//   const setAssessmentId = (id: string) => {
//     setState((prev) => ({ ...prev, assessmentId: id }));
//   };

//   const resetAssessment = () => {
//     setState({ responses: {} });
//     localStorage.removeItem(STORAGE_KEY);
//   };

//   return (
//     <AssessmentContext.Provider value={{ 
//       responses: state.responses, 
//       assessmentId: state.assessmentId,
//       updateResponse, 
//       setAssessmentId,
//       resetAssessment 
//     }}>
//       {children}
//     </AssessmentContext.Provider>
//   );
// }

// export function useAssessment() {
//   const context = useContext(AssessmentContext);
//   if (!context) {
//     throw new Error("useAssessment must be used within AssessmentProvider");
//   }
//   return context;
// }

import { createContext, useContext, useState, useEffect, useRef, ReactNode } from "react";
import type {
  EmploymentStatus,
  IncomeLevel,
  NetWorthLevel,
  FundSource,
  KnowledgeLevel,
  InvestmentProduct,
  TimeHorizon,
  InvestmentGoal,
  RiskComfort,
  VolatilityReaction,
  FOMOReaction,
  Dependents,
  EmergencyFund,
  LiquidityNeeds,
} from "@shared/schema";

export interface AssessmentResponses {
  q1_employment?: EmploymentStatus;
  q1_income?: IncomeLevel;
  q2_networth?: NetWorthLevel;
  q3_sources?: FundSource[];
  q4_knowledge?: KnowledgeLevel;
  q4_products?: InvestmentProduct[];
  q5_horizon?: TimeHorizon;
  q6_goals?: InvestmentGoal;
  q7_comfort?: RiskComfort;
  q8_volatility?: VolatilityReaction;
  q9_fomo?: FOMOReaction;
  q10_dependents?: Dependents;
  q11_emergency?: EmergencyFund;
  q12_liquidity?: LiquidityNeeds;
}

interface AssessmentState {
  responses: AssessmentResponses;
  assessmentId?: string;
}

interface AssessmentContextType {
  responses: AssessmentResponses;
  assessmentId?: string;
  updateResponse: <K extends keyof AssessmentResponses>(
    key: K,
    value: AssessmentResponses[K]
  ) => void;
  setAssessmentId: (id: string) => void;
  resetAssessment: () => void;
}

const STORAGE_KEY = "rudo_assessment";

const AssessmentContext = createContext<AssessmentContextType | null>(null);

function loadFromStorage(): AssessmentState {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error("Failed to load assessment from localStorage:", error);
  }
  return { responses: {} };
}

function saveToStorage(state: AssessmentState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.error("Failed to save assessment to localStorage:", error);
  }
}

export function AssessmentProvider({ children }: { children: ReactNode }) {
  // 🧠 1️⃣ Safe initialization (no SSR access)
  const [state, setState] = useState<AssessmentState>({ responses: {} });

  // 🧠 2️⃣ Load from localStorage only when in browser
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const stored = loadFromStorage();
      if (stored && Object.keys(stored.responses || {}).length > 0) {
        setState(stored);
      }
    } catch (error) {
      console.error("Failed to load assessment from localStorage on client:", error);
    }
  }, []);

  // 🧠 3️⃣ Save to storage but skip first render (to avoid wiping old data)
  const didHydrateRef = useRef(false);
  useEffect(() => {
    if (!didHydrateRef.current) {
      didHydrateRef.current = true;
      return;
    }
    saveToStorage(state);
  }, [state]);

  // Update response helper
  const updateResponse = <K extends keyof AssessmentResponses>(
    key: K,
    value: AssessmentResponses[K]
  ) => {
    setState((prev) => ({
      ...prev,
      responses: { ...prev.responses, [key]: value },
    }));
  };

  const setAssessmentId = (id: string) => {
    setState((prev) => ({ ...prev, assessmentId: id }));
  };

  const resetAssessment = () => {
    setState({ responses: {} });
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <AssessmentContext.Provider
      value={{
        responses: state.responses,
        assessmentId: state.assessmentId,
        updateResponse,
        setAssessmentId,
        resetAssessment,
      }}
    >
      {children}
    </AssessmentContext.Provider>
  );
}

export function useAssessment() {
  const context = useContext(AssessmentContext);
  if (!context) {
    throw new Error("useAssessment must be used within AssessmentProvider");
  }
  return context;
}

