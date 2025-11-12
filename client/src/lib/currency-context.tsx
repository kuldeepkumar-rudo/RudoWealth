import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type Currency = "AED" | "USD" | "INR";

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
}

const STORAGE_KEY = "rudo_currency";

const CurrencyContext = createContext<CurrencyContextType | null>(null);

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrencyState] = useState<Currency>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored && (stored === "AED" || stored === "USD" || stored === "INR")) {
        return stored as Currency;
      }
    } catch (error) {
      console.error("Failed to load currency from localStorage:", error);
    }
    return "AED";
  });

  const setCurrency = (newCurrency: Currency) => {
    setCurrencyState(newCurrency);
    try {
      localStorage.setItem(STORAGE_KEY, newCurrency);
    } catch (error) {
      console.error("Failed to save currency to localStorage:", error);
    }
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error("useCurrency must be used within CurrencyProvider");
  }
  return context;
}

export const currencySymbols: Record<Currency, string> = {
  AED: "د.إ",
  USD: "$",
  INR: "₹",
};

// Conversion rates from USD (base currency)
const conversionRates: Record<Currency, number> = {
  USD: 1,
  AED: 3.67,  // 1 USD = 3.67 AED
  INR: 83.5,  // 1 USD = 83.5 INR
};

export function convertAmount(amountUSD: number, currency: Currency): number {
  return Math.round(amountUSD * conversionRates[currency]);
}

export function formatCurrency(amount: number, currency: Currency): string {
  const symbol = currencySymbols[currency];
  
  // Format based on currency-specific conventions
  if (currency === "INR") {
    if (amount >= 10000000) {
      return `${symbol}${(amount / 10000000).toFixed(1)}Cr`;
    } else if (amount >= 100000) {
      return `${symbol}${(amount / 100000).toFixed(1)}L`;
    }
  }
  
  // Standard formatting for AED and USD
  if (amount >= 1000000) {
    return `${symbol}${(amount / 1000000).toFixed(1)}M`;
  } else if (amount >= 1000) {
    return `${symbol}${(amount / 1000).toFixed(0)}K`;
  }
  
  return `${symbol}${amount.toLocaleString()}`;
}

export function formatRange(minUSD: number, maxUSD: number | null, currency: Currency): string {
  const min = convertAmount(minUSD, currency);
  const minFormatted = formatCurrency(min, currency);
  
  if (maxUSD === null) {
    return `${minFormatted}+`;
  }
  
  const max = convertAmount(maxUSD, currency);
  const maxFormatted = formatCurrency(max, currency);
  
  return `${minFormatted} - ${maxFormatted}`;
}
