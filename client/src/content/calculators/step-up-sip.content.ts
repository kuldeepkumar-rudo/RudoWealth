import { ContentSection } from './sip.content';

export const stepUpSipContent: ContentSection[] = [
  {
    id: 'what-is',
    title: 'What is a Step-Up SIP Calculator?',
    content: `A Step-Up SIP (also called Top-Up SIP) calculator helps you project the future value of systematic investments that increase by a fixed percentage each year. Instead of investing the same amount monthly throughout the tenure, you increase your SIP amount annually to match your growing income.

**Why it matters:** As your career progresses and income grows, your savings potential also increases. A step-up SIP leverages this natural income growth to dramatically accelerate wealth creation. Studies show that stepping up your SIP by just 10% annually can increase your final corpus by 30-40% compared to a regular SIP with the same starting amount.`,
  },
  {
    id: 'how-it-helps',
    title: "How Can RuDo's Step-Up SIP Calculator Help You?",
    content: `The Step-Up SIP calculator reveals the powerful wealth multiplication effect of increasing your investments in sync with your income growth. It shows you side-by-side comparison of regular SIP versus step-up SIP outcomes, helping you make strategic decisions about your investment journey.

For NRIs whose income often grows significantly in markets like UAE and USA, this calculator demonstrates how modest annual increments can lead to substantial wealth creation over time.

**Key Benefits:**
• **Visualize Growth Impact:** See exactly how much more wealth you can create by increasing investments annually
• **Match Salary Increments:** Align your SIP increases with annual raises, making wealth-building effortless
• **Beat Inflation:** Ensure your investment growth outpaces inflation by increasing contributions over time
• **Goal Acceleration:** Reach your financial goals years earlier than with regular SIPs
• **Flexible Planning:** Test different step-up percentages (5%, 10%, 15%) to find what fits your budget
• **Compare Strategies:** Understand the trade-off between starting amount and annual increment percentage
• **Multi-Currency Support:** Perfect for NRIs to calculate returns in INR, USD, or AED`,
  },
  {
    id: 'how-it-works',
    title: 'How Does the Step-Up SIP Calculator Work?',
    content: `The step-up SIP calculation is more complex than regular SIP as each year's increased amount has a different holding period. The calculator compounds each year's total contribution separately:

**Formula Approach:**
For each year, calculate:
\`\`\`
FV_year = P_year × [(1 + r)ⁿ - 1] / r × (1 + r)
\`\`\`

Where:
• **P_year** = Monthly SIP amount for that particular year
• **P_year** = P_initial × (1 + step-up%)^(year-1)
• **r** = Expected monthly return rate
• **n** = Remaining months from that year to end of tenure

**Example:**
Starting SIP: ₹10,000/month for 10 years at 12% p.a. with 10% annual step-up

Year 1: ₹10,000/month (12 months)
Year 2: ₹11,000/month (10% increase)
Year 3: ₹12,100/month (10% increase)
...
Year 10: ₹23,579/month

**Regular SIP Result:**
₹10,000 × 120 months = ₹23.23 Lakhs

**Step-Up SIP Result:**
Total investment ≈ ₹19.97 Lakhs
Future value ≈ ₹36.90 Lakhs
Returns ≈ ₹16.93 Lakhs

The step-up approach creates ₹13.67 Lakhs MORE wealth (59% higher corpus) with only ₹7.97 Lakhs additional investment over 10 years.`,
  },
  {
    id: 'how-to-use',
    title: 'How to Use RuDo\'s Step-Up SIP Calculator?',
    content: `Using our step-up SIP calculator helps you plan a smart, progressive investment strategy:

**Step 1: Set Starting Monthly Investment**
Begin with an amount you're comfortable investing today. Even starting small (₹5,000-₹10,000) works brilliantly with step-up approach.

**Step 2: Choose Annual Step-Up Percentage**
Select how much you'll increase your SIP each year:
• Conservative: 5% (suitable for stable income growth)
• Moderate: 10% (recommended for most salaried professionals)
• Aggressive: 15% (ideal for fast-growing careers or NRI incomes)

**Step 3: Set Expected Returns**
Input expected annual returns based on your chosen asset class. Equity funds averaging 10-15% historically work well for long-term step-up strategies.

**Step 4: Select Investment Period**
Choose your time horizon. Step-up SIPs work best over 10+ years, allowing multiple increment cycles to compound.

**Step 5: Review Comparison**
See side-by-side results: Regular SIP vs Step-Up SIP. Notice the dramatic difference in final corpus, especially in later years when compounding accelerates.

**Step 6: Adjust and Optimize**
Try different combinations of starting amount and step-up percentage. Sometimes a lower start with higher step-up outperforms a higher start with lower step-up.

**Pro Tip for NRIs:** Align your step-up percentage with your expected salary increments in your current market. UAE and USA often see 8-12% annual salary growth, making 10% step-up very achievable.`,
  },
  {
    id: 'advantages',
    title: 'Advantages of Step-Up SIP Strategy',
    content: `**1. Exponentially Higher Wealth Creation**
Step-up SIPs can generate 40-60% more corpus than regular SIPs over 15-20 year periods, without feeling burdensome.

**2. Matches Income Growth**
As your salary increases 8-12% annually, increasing your SIP by 10% feels natural and doesn't strain your budget.

**3. Inflation Protection**
Regular SIPs lose purchasing power over time due to inflation. Step-up SIPs ensure your real investment value keeps growing.

**4. Disciplined Wealth Building**
Automates the process of increasing savings as you earn more, preventing lifestyle inflation from consuming all increments.

**5. Faster Goal Achievement**
Reach major financial goals (home purchase, retirement corpus) 3-5 years earlier than with regular SIPs.

**6. Flexible Implementation**
Start conservative and increase the step-up percentage later if your income growth accelerates.

**7. Tax Efficiency Over Time**
Spreading larger investments across multiple years can help manage tax liability better than lumpsum investments.

**8. Perfect for Career Growth Phase**
Ideal for professionals aged 25-45 whose income is in growth phase. NRIs in UAE/USA often see rapid salary progression, making step-up SIPs particularly powerful.

**9. Psychological Advantage**
Small annual increases feel manageable, whereas the cumulative impact is transformational. You won't even notice the difference month-to-month.

**10. Compound Impact**
Each year's increment gets progressively more time to compound, creating a snowball effect of wealth multiplication.

**Best Practice:** Set up annual step-up automatic increases with your fund house. Many providers now support automatic annual escalation, removing the need for manual intervention.`,
  },
  {
    id: 'related',
    title: 'Related Investment Calculators',
    content: `Complement your step-up SIP strategy with these calculators:

**SIP Calculator**
Compare standard SIP results with your step-up strategy to see the exact wealth multiplication benefit.

**Goal Planning Calculator**
Calculate if your step-up SIP strategy will reach specific goals, or determine the required step-up percentage for target achievement.

**Lumpsum Calculator**
If you receive a bonus or windfall, calculate whether to invest it as lumpsum or add it to your step-up SIP strategy.

**FIRE Calculator**
See how step-up SIPs accelerate your journey to financial independence. The compounding effect makes early retirement significantly more achievable.

**PPF Calculator**
Compare step-up SIP returns with PPF's guaranteed but lower returns to optimize your portfolio for growth and stability.

**Currency Impact Calculator**
For NRIs: Understand how rupee movements affect your step-up SIP returns when you eventually repatriate funds to your current currency.`,
  },
];
