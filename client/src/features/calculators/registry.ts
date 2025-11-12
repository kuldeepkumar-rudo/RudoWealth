import { Calculator, TrendingUp, Zap, Target, Sparkles, Coins, Globe, type LucideIcon } from 'lucide-react';

export interface CalculatorMetadata {
  slug: string;
  name: string;
  shortDescription: string;
  longDescription: string;
  icon: LucideIcon;
  iconBgClass: string;
  order: number;
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
}

export const calculatorRegistry: Record<string, CalculatorMetadata> = {
  sip: {
    slug: 'sip',
    name: 'SIP Calculator',
    shortDescription: 'Know returns from SIP or plan a future goal',
    longDescription: 'Calculate the future value of your Systematic Investment Plan (SIP) and understand how regular monthly investments can help you build wealth over time.',
    icon: Calculator,
    iconBgClass: 'bg-primary/10',
    order: 1,
    seo: {
      title: 'SIP Calculator - Calculate SIP Returns | RuDo Wealth',
      description: 'Use our SIP calculator to plan your systematic investment plan. Calculate expected returns, future value, and wealth accumulation for NRIs investing from UAE, USA, and globally.',
      keywords: ['SIP calculator', 'systematic investment plan', 'NRI SIP', 'mutual fund SIP', 'SIP returns calculator', 'monthly SIP'],
    },
  },
  lumpsum: {
    slug: 'lumpsum',
    name: 'Lumpsum Calculator',
    shortDescription: 'Know returns from Lumpsum investment or plan a future goal',
    longDescription: 'Calculate the growth of a one-time lumpsum investment and understand the power of compound interest on your bulk investments.',
    icon: TrendingUp,
    iconBgClass: 'bg-blue-500/10',
    order: 2,
    seo: {
      title: 'Lumpsum Calculator - Calculate One-Time Investment Returns | RuDo Wealth',
      description: 'Plan your lumpsum investments with our calculator. Calculate expected returns on one-time investments for NRIs. Compare lumpsum vs SIP strategies.',
      keywords: ['lumpsum calculator', 'one-time investment', 'NRI lumpsum investment', 'bulk investment calculator', 'lumpsum returns'],
    },
  },
  'step-up-sip': {
    slug: 'step-up-sip',
    name: 'Step Up SIP Calculator',
    shortDescription: 'See how increasing SIP each year accelerates returns',
    longDescription: 'Discover the power of annual SIP increments. Calculate how stepping up your monthly investments by a fixed percentage each year can dramatically boost your wealth creation.',
    icon: Zap,
    iconBgClass: 'bg-yellow-500/10',
    order: 3,
    seo: {
      title: 'Step-Up SIP Calculator - Accelerate Wealth With Annual Increments | RuDo Wealth',
      description: 'Calculate the impact of increasing your SIP amount annually. See how step-up SIPs can help NRIs build significantly larger corpus compared to regular SIPs.',
      keywords: ['step up SIP', 'SIP increment calculator', 'annual SIP increase', 'top-up SIP', 'step up SIP calculator'],
    },
  },
  'goal-planning': {
    slug: 'goal-planning',
    name: 'Goal Planning Calculator',
    shortDescription: 'Calculate required monthly SIP to achieve your financial goals',
    longDescription: 'Plan for specific financial goals like home purchase, education, or retirement. Calculate exactly how much you need to invest monthly to reach your target amount.',
    icon: Target,
    iconBgClass: 'bg-blue-500/10',
    order: 4,
    seo: {
      title: 'Goal Planning Calculator - Achieve Your Financial Goals | RuDo Wealth',
      description: 'Calculate the monthly SIP required to achieve your financial goals. Plan for education, home, retirement, and more. Goal-based investing calculator for NRIs.',
      keywords: ['goal planning calculator', 'financial goal calculator', 'goal based investing', 'SIP for goals', 'retirement planning calculator'],
    },
  },
  fire: {
    slug: 'fire',
    name: 'FIRE Calculator',
    shortDescription: 'Calculate your Financial Independence and Early Retirement number',
    longDescription: 'Discover when you can achieve Financial Independence and Retire Early (FIRE). Based on the proven 25x annual expenses rule, calculate your FIRE number and the monthly investments needed.',
    icon: Sparkles,
    iconBgClass: 'bg-purple-500/10',
    order: 5,
    seo: {
      title: 'FIRE Calculator - Financial Independence Retire Early | RuDo Wealth',
      description: 'Calculate your FIRE number and path to financial independence. Discover how much you need to save and invest to retire early. FIRE calculator for NRIs.',
      keywords: ['FIRE calculator', 'financial independence calculator', 'early retirement calculator', 'FIRE number', '25x rule calculator', 'retirement planning'],
    },
  },
  ppf: {
    slug: 'ppf',
    name: 'PPF Calculator',
    shortDescription: 'Calculate tax-free returns from Public Provident Fund',
    longDescription: 'Plan your Public Provident Fund (PPF) investments. Calculate maturity amount, interest earned, and understand the benefits of this tax-free investment option for long-term wealth creation.',
    icon: Coins,
    iconBgClass: 'bg-amber-500/10',
    order: 6,
    seo: {
      title: 'PPF Calculator - Calculate Public Provident Fund Returns | RuDo Wealth',
      description: 'Calculate PPF maturity amount and returns. Understand tax-free interest on PPF investments. Public Provident Fund calculator with current interest rates.',
      keywords: ['PPF calculator', 'public provident fund calculator', 'PPF maturity calculator', 'tax free investment', 'PPF interest calculator'],
    },
  },
  'currency-impact': {
    slug: 'currency-impact',
    name: 'Currency Impact Calculator',
    shortDescription: 'Understand how exchange rates affect your NRI investments',
    longDescription: 'Analyze the impact of currency exchange rate movements on your NRI investments. Calculate how rupee appreciation or depreciation affects your returns when converting from USD, AED, or other currencies to INR.',
    icon: Globe,
    iconBgClass: 'bg-cyan-500/10',
    order: 7,
    seo: {
      title: 'Currency Impact Calculator - FX Impact on NRI Investments | RuDo Wealth',
      description: 'Calculate how exchange rate changes affect your NRI investment returns. Understand currency risk and opportunity for USD, AED to INR conversions.',
      keywords: ['currency impact calculator', 'NRI currency calculator', 'exchange rate impact', 'forex impact calculator', 'USD to INR calculator', 'currency risk calculator'],
    },
  },
};

export const calculatorList = Object.values(calculatorRegistry).sort((a, b) => a.order - b.order);

export function getCalculatorBySlug(slug: string): CalculatorMetadata | undefined {
  return calculatorRegistry[slug];
}

export function getNextCalculator(currentSlug: string): CalculatorMetadata | null {
  const currentIndex = calculatorList.findIndex(calc => calc.slug === currentSlug);
  if (currentIndex === -1 || currentIndex === calculatorList.length - 1) {
    return null;
  }
  return calculatorList[currentIndex + 1];
}

export function getPreviousCalculator(currentSlug: string): CalculatorMetadata | null {
  const currentIndex = calculatorList.findIndex(calc => calc.slug === currentSlug);
  if (currentIndex <= 0) {
    return null;
  }
  return calculatorList[currentIndex - 1];
}
