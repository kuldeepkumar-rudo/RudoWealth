import { ContentSection } from './sip.content';

export const lumpsumContent: ContentSection[] = [
  {
    id: 'what-is',
    title: 'What is a Lumpsum Calculator?',
    content: `A lumpsum calculator is a financial tool that helps you estimate the future value of a one-time bulk investment. Unlike SIPs where you invest regularly, a lumpsum investment involves investing a large amount of money at once into mutual funds, stocks, or other investment vehicles.

**Why it matters:** When you receive a bonus, inheritance, or have accumulated savings, understanding how that money can grow over time is crucial for financial planning. The lumpsum calculator instantly shows you the potential returns on your one-time investment, helping you make informed decisions about where to deploy your capital.`,
  },
  {
    id: 'how-it-helps',
    title: "How Can RuDo's Lumpsum Calculator Help You?",
    content: `The lumpsum calculator provides a clear projection of how your one-time investment can grow over a specified period, accounting for compound interest. This helps you evaluate different investment opportunities and make strategic decisions about deploying your capital.

Whether you're an NRI with repatriated funds, someone who received a windfall, or a professional with accumulated savings, this calculator helps you visualize the growth potential of your investment.

**Key Benefits:**
• **Compare Investment Options:** Evaluate returns across different asset classes and time horizons
• **Timing Decisions:** Understand if waiting for the "right time" might cost you returns due to time lost in compounding
• **Goal Planning:** Calculate if your current lumpsum is sufficient to reach specific financial goals
• **Risk Assessment:** Model different return scenarios (conservative, moderate, aggressive) to understand potential outcomes
• **Multi-Currency Support:** Calculate returns in INR, USD, or AED for NRIs managing cross-border investments
• **Lumpsum vs SIP:** Compare whether a lumpsum investment or systematic approach suits your situation better`,
  },
  {
    id: 'how-it-works',
    title: 'How Does the Lumpsum Calculator Work?',
    content: `The lumpsum calculator uses the compound interest formula to calculate future value:

**Formula:**
\`\`\`
FV = P × (1 + r)ⁿ
\`\`\`

Where:
• **FV** = Future Value of the investment
• **P** = Principal amount (your initial lumpsum investment)
• **r** = Expected annual rate of return (as a decimal)
• **n** = Investment tenure in years

**Example:**
If you invest ₹10,00,000 as a lumpsum for 10 years at an expected return of 12% per annum:
• Principal (P) = ₹10,00,000
• Rate (r) = 12% = 0.12
• Tenure (n) = 10 years

Future Value = ₹10,00,000 × (1 + 0.12)¹⁰
Future Value = ₹10,00,000 × (1.12)¹⁰
Future Value = ₹10,00,000 × 3.106
Future Value ≈ ₹31,06,000

Your investment would grow by ₹21,06,000 (210% returns) over 10 years through the power of compounding.`,
  },
  {
    id: 'how-to-use',
    title: 'How to Use RuDo\'s Lumpsum Calculator?',
    content: `Our lumpsum calculator is designed for quick and accurate projections:

**Step 1: Enter Your Investment Amount**
Input the lumpsum amount you plan to invest. This could be anywhere from ₹10,000 to several crores, depending on your available capital.

**Step 2: Set Expected Returns**
Choose an expected annual return rate based on your investment type:
• Equity mutual funds: 10-15% historically
• Balanced/hybrid funds: 8-12%
• Debt funds: 6-8%
• Fixed deposits: 5-7%

**Step 3: Choose Investment Period**
Select your investment tenure. Lumpsum investments typically work best over longer periods (5+ years) as compounding accelerates over time.

**Step 4: View Instant Results**
See your projected future value, total invested amount, and estimated returns. The visual breakdown shows how your wealth compounds year over year.

**Step 5: Compare Scenarios**
Adjust the parameters to compare different investment amounts, return rates, and time periods. This helps you optimize your investment strategy.

**Pro Tip:** For NRIs, toggle the currency option to see projections in your preferred currency (USD/AED/INR) and understand the impact of exchange rate movements.`,
  },
  {
    id: 'advantages',
    title: 'Advantages of Lumpsum Investing',
    content: `**1. Full Market Exposure from Day One**
Your entire capital starts working immediately, capturing all market movements and dividends from the start date.

**2. Lower Transaction Costs**
A single investment means fewer transaction charges compared to multiple SIP installments over time.

**3. Maximum Compounding Period**
When you invest the full amount upfront, every rupee gets the maximum time to compound, potentially generating higher returns than staggered investments.

**4. Simplicity**
One-time investment decision with no need to maintain monthly liquidity or remember recurring investment dates.

**5. Ideal for Windfalls**
Perfect for deploying bonus payments, inheritance, property sale proceeds, or accumulated savings that are sitting idle.

**6. Better in Rising Markets**
When markets are trending upward, lumpsum investments can outperform SIPs as your entire capital participates in the rally from the beginning.

**7. Tax Efficiency**
For NRIs, lumpsum investments can be structured more tax-efficiently, especially when repatriating funds under specific schemes.

**8. Goal Achievement**
If you already have the full amount required for a goal and sufficient time horizon, lumpsum investing removes the uncertainty of accumulating through SIPs.

**Important Consideration:** Lumpsum investing carries higher timing risk. If markets fall immediately after investment, the entire corpus is affected. Consider your risk tolerance and market conditions before choosing lumpsum over SIP.`,
  },
  {
    id: 'related',
    title: 'Related Investment Calculators',
    content: `Optimize your complete investment strategy with our suite of calculators:

**SIP Calculator**
Compare how systematic monthly investments might perform versus your lumpsum strategy. Often, a hybrid approach combining both can reduce timing risk.

**Step-Up SIP Calculator**
If you're considering SIP as an alternative, see how increasing your monthly investment annually can help you build significant wealth.

**Goal Planning Calculator**
Work backwards from your financial goals to determine if your lumpsum investment is sufficient or if additional SIPs are needed.

**FIRE Calculator**
Planning early retirement? Calculate if your lumpsum investment, combined with other savings, can help you achieve financial independence.

**PPF Calculator**
Compare lumpsum investment returns with tax-free PPF investments to optimize your portfolio for tax efficiency.

**Currency Impact Calculator**
Essential for NRIs: Understand how currency fluctuations affect your lumpsum investment returns when converting between INR, USD, or AED.`,
  },
];
