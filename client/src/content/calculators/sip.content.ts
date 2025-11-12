export interface ContentSection {
  id: string;
  title: string;
  content: string;
}

export const sipContent: ContentSection[] = [
  {
    id: 'what-is',
    title: 'What is an SIP Calculator?',
    content: `An SIP calculator is an online tool that calculates the future value on your mutual fund investments through made through a Systematic Investment Plan (SIP). It considers your investment amount, investment period, and expected rate of return to show how your money could grow over time.

**Why it matters:** The manual calculation of SIP returns can be time-consuming as SIPs involve a monthly contributions. Since the holding period for each contribution would be different at any given point in time, the returns for each of these payments will differ as well. The SIP calculator gives you quick results and helps you plan your financial goals.`,
  },
  {
    id: 'how-it-helps',
    title: "How Can RuDo's SIP Calculator Help You?",
    content: `The Systematic Investment Plan calculator gives you a bifurcation of the future value of the SIP investment with two figures: the estimated return they can expect to make on the investment and the principal.

This gives you a clearer picture of how your small, regular SIPs can grow into big wealth over time.

**Key Benefits:**
• **Plan Your Goals:** See exactly how much you need to invest monthly to reach your financial goals
• **Compare Scenarios:** Try different investment amounts and time periods to find what works for you
• **Factor Inflation:** Understand the real value of your returns by accounting for inflation
• **Make Informed Decisions:** Use actual data to decide your investment strategy
• **Track Progress:** Visualize how your wealth will grow over time`,
  },
  {
    id: 'how-it-works',
    title: 'How Does the SIP Calculator Work?',
    content: `The working of a SIP calculator is based on the compound interest formula for annuity-due (payments at the beginning of each period):

**Formula:**
\`\`\`
FV = P × [(1 + r)ⁿ - 1] / r × (1 + r)
\`\`\`

Where:
• **FV** = Future Value of the investment
• **P** = Amount you invest each month
• **r** = Expected rate of return per month (annual rate ÷ 12)
• **n** = Total number of monthly payments (years × 12)

**Example:**
If you invest ₹10,000 per month for 10 years at an expected return of 12% per annum:
• Monthly investment (P) = ₹10,000
• Rate per month (r) = 12% ÷ 12 = 1% or 0.01
• Number of months (n) = 10 × 12 = 120

Future Value = ₹10,000 × [(1.01)¹²⁰ - 1] / 0.01 × 1.01 ≈ ₹23.23 Lakhs

Your total investment would be ₹12 Lakhs (₹10,000 × 120 months), and you'd earn approximately ₹11.23 Lakhs as returns.`,
  },
  {
    id: 'how-to-use',
    title: 'How to Use RuDo\'s SIP Calculator?',
    content: `Using our SIP calculator is simple and intuitive:

**Step 1: Enter Your Monthly Investment**
Use the slider or quick-select buttons to choose how much you want to invest each month. We support investments from ₹500 to ₹1 Crore.

**Step 2: Set Expected Returns**
Adjust the expected annual return rate. Equity funds typically range from 10-15%, while debt funds range from 6-8%. Be realistic based on your risk appetite and asset class.

**Step 3: Choose Investment Period**
Select how many years you plan to invest. SIPs work best over longer periods (5+ years) due to the power of compounding.

**Step 4: View Results**
Instantly see your future value, total invested amount, and expected returns. The visual breakdown helps you understand the growth trajectory.

**Step 5: Adjust and Compare**
Try different scenarios to find the perfect investment plan for your goals. Switch currencies if you're investing from abroad.`,
  },
  {
    id: 'advantages',
    title: 'Advantages of SIP Calculator',
    content: `**1. Instant Results**
Get accurate projections in seconds without complex manual calculations.

**2. Plan Better**
Visualize different scenarios to make informed investment decisions aligned with your goals.

**3. Multi-Currency Support**
Calculate returns in INR, USD, or AED - perfect for NRIs investing from UAE, USA, or anywhere globally.

**4. Realistic Projections**
Our calculator uses proven financial formulas to give you accurate future value estimates.

**5. Compare Investment Strategies**
Easily compare different SIP amounts and tenures to optimize your wealth creation strategy.

**6. Goal-Based Planning**
Work backwards from your financial goals to determine the right monthly investment amount.

**7. No Cost**
Use our professional-grade calculator completely free, as many times as you want.

**8. Visual Breakdown**
Clear charts and graphs help you understand where your money goes and how it grows.`,
  },
  {
    id: 'related',
    title: 'Related Investment Calculators',
    content: `Explore our other calculators to optimize your complete investment strategy:

**Step-Up SIP Calculator**
See how increasing your SIP amount annually can dramatically accelerate wealth creation.

**Lumpsum Calculator**
Calculate returns on one-time bulk investments and compare with SIP strategies.

**Goal Planning Calculator**
Calculate the exact monthly SIP needed to achieve specific financial goals.

**FIRE Calculator**
Discover your path to Financial Independence and Early Retirement.

**PPF Calculator**
Plan your tax-free Public Provident Fund investments for long-term wealth.

**Currency Impact Calculator**
Understand how exchange rate movements affect your NRI investment returns.`,
  },
];
