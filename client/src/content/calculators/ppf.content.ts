import { ContentSection } from './sip.content';

export const ppfContent: ContentSection[] = [
  {
    id: 'what-is',
    title: 'What is a PPF Calculator?',
    content: `A PPF (Public Provident Fund) calculator helps you calculate the maturity amount and interest earned on your PPF investments. PPF is a government-backed, tax-free, long-term savings scheme in India with a 15-year lock-in period, offering guaranteed returns and triple tax benefits (EEE status—Exempt, Exempt, Exempt).

**Why it matters:** PPF is one of India's safest investment options with sovereign guarantee, making it ideal for risk-averse investors who want guaranteed, tax-free returns. The PPF calculator helps you plan contributions and visualize how your wealth will grow over the 15-year tenure, making long-term financial planning more concrete and actionable.`,
  },
  {
    id: 'how-it-helps',
    title: "How Can RuDo's PPF Calculator Help You?",
    content: `The PPF calculator provides complete visibility into your PPF investment journey—showing year-by-year growth, total interest earned, and final maturity amount. It helps you optimize contribution timing and amounts to maximize returns within PPF rules and limits.

For NRIs, it's important to note that new PPF accounts cannot be opened, but existing accounts from pre-NRI days can be continued. For Resident Indians and OCIs (Overseas Citizens of India), PPF remains an excellent tax-free wealth building tool that deserves a place in every balanced portfolio.

**Key Benefits:**
• **Guaranteed Returns:** Know exact maturity amount based on current 7.1% interest rate (as of FY 2024-25)
• **Tax Planning:** Calculate total tax savings from contributions, interest, and maturity (EEE benefit)
• **Contribution Optimization:** Determine ideal monthly or annual contribution pattern to maximize interest
• **Year-by-Year Breakdown:** See detailed growth trajectory across all 15 years
• **Extension Planning:** Model scenarios for 5-year block extensions beyond initial 15 years
• **Compare with Taxable Options:** Understand the true value of tax-free compounding versus taxable investments
• **Retirement Planning:** Use PPF as stable, guaranteed component of retirement corpus
• **Debt Portfolio Allocation:** Calculate what portion of debt allocation should go to PPF versus other instruments`,
  },
  {
    id: 'how-it-works',
    title: 'How Does the PPF Calculator Work?',
    content: `PPF calculation is unique because interest is calculated monthly but compounded annually. The interest is calculated on the lowest balance between the 5th and the last day of each month.

**Formula:**
\`\`\`
A = P × [({(1 + r)ⁿ - 1} / r)]
\`\`\`

Where:
• **A** = Maturity amount
• **P** = Annual contribution
• **r** = Annual interest rate (currently 7.1% in FY 2024-25)
• **n** = Tenure in years (minimum 15 years)

**Important PPF Rules:**
• Minimum contribution: ₹500 per year
• Maximum contribution: ₹1,50,000 per year
• Interest rate: 7.1% p.a. (reviewed quarterly by government)
• Lock-in period: 15 years
• Extensions: Available in 5-year blocks after maturity
• Partial withdrawal: Allowed from 7th year onwards
• Loan facility: Available from 3rd to 6th year

**Example Calculation:**

**Scenario 1: Maximum Annual Contribution**
Annual contribution: ₹1,50,000 (contributed on April 5th each year)
Interest rate: 7.1% p.a.
Tenure: 15 years

Year 1: ₹1,50,000
Year 15: Total contributions = ₹22,50,000

Maturity Amount ≈ ₹40,68,209
Total Interest Earned ≈ ₹18,18,209
Effective return: Tax-free 7.1% compounded annually

**Scenario 2: Monthly Contribution**
Monthly contribution: ₹12,500 on 5th of each month
Annual total: ₹1,50,000
Tenure: 15 years

Due to monthly compounding advantage (interest calculated on 5th), monthly contributions yield slightly higher returns than lumpsum annual contributions made late in the year.

Maturity Amount ≈ ₹41,50,000 (approximately)
Additional benefit ≈ ₹81,791 compared to year-end lumpsum

**Pro Tip:** Always deposit before the 5th of the month to ensure that month's contribution earns interest for the full month.`,
  },
  {
    id: 'how-to-use',
    title: 'How to Use RuDo\'s PPF Calculator?',
    content: `Our PPF calculator helps you plan contributions and understand long-term growth:

**Step 1: Choose Contribution Pattern**
Decide between:
• **Monthly:** ₹12,500 on 5th of every month (maximizes interest)
• **Quarterly:** ₹37,500 every quarter
• **Annually:** ₹1,50,000 once per year (ideally before April 5th)

**Step 2: Enter Annual Contribution Amount**
Input how much you plan to invest annually (between ₹500 and ₹1,50,000). The calculator shows results for your chosen amount.

**Step 3: Set Current Interest Rate**
Pre-filled with current rate (7.1%), but you can adjust for sensitivity analysis. Remember, PPF rates are reviewed quarterly by the government.

**Step 4: Select Tenure**
Default is 15 years (minimum lock-in). You can model extensions in 5-year blocks (15, 20, 25, 30 years) to see extended compounding benefits.

**Step 5: View Detailed Projections**
The calculator shows:
• Year-by-year account balance
• Annual interest earned
• Cumulative interest
• Total maturity amount
• Effective returns

**Step 6: Optimize Contribution Timing**
Compare scenarios:
• Lumpsum on April 5th vs December 31st (April is better)
• Monthly vs annual contributions (monthly is better)
• Maximum ₹1.5L vs smaller amounts

**Step 7: Plan Tax Benefits**
Your annual contribution (up to ₹1,50,000) qualifies for Section 80C deduction. If you're in the 30% tax bracket, this saves ₹46,500 in taxes annually.

**Strategic Timing Tips:**
• Contribute in early April (before 5th) to maximize interest for the year
• Make monthly contributions on 1st-5th to get full month's interest
• Avoid contributing after 5th of month—you lose that month's interest
• Plan to maximize ₹1.5L limit each year for full tax benefit

**For Existing NRIs:**
If you opened PPF before becoming NRI, you can:
• Continue contributions until maturity
• Cannot extend beyond original 15-year term
• Interest remains tax-free
• On maturity, must close account or convert to non-interest bearing account`,
  },
  {
    id: 'advantages',
    title: 'Advantages of PPF Investment',
    content: `**1. Triple Tax Benefit (EEE Status)**
• **E1:** Contributions deductible under Section 80C (up to ₹1.5L)
• **E2:** Interest earned completely tax-free
• **E3:** Maturity amount fully tax-free

In 30% tax bracket with ₹1.5L annual contribution:
• Immediate tax saving: ₹46,500/year
• Over 15 years: ₹6,97,500 in tax savings
• Interest earned (₹18L+): All tax-free
• Maturity amount (₹40L+): All tax-free

**2. Sovereign Guarantee**
Backed by Government of India. Zero default risk. Safest investment in India alongside government bonds.

**3. Guaranteed Returns**
No market volatility. You know exact returns (currently 7.1%). Rates don't fall below certain floor, providing downside protection.

**4. Compounding Power**
15-year compounding on tax-free returns creates significant wealth. A 7.1% tax-free return is equivalent to 10.1% taxable return for someone in 30% tax bracket.

**5. Forced Discipline**
15-year lock-in ensures you don't withdraw prematurely, allowing full compounding benefit. Acts as forced long-term savings.

**6. Partial Withdrawal Facility**
From 7th year, you can withdraw up to 50% of balance for genuine needs (medical emergencies, education, home purchase).

**7. Loan Facility**
Can take loan against PPF balance from 3rd to 6th year at just 2% above PPF rate (currently ~9.1%). Useful for emergency liquidity.

**8. Nomination Facility**
Can nominate beneficiaries. Ensures smooth transfer of funds without succession complications.

**9. Transferable**
PPF account can be transferred from any bank/post office to another across India. Convenient for people relocating.

**10. Ideal for Conservative Investors**
Perfect for risk-averse individuals, retirees, or as debt component in balanced portfolios. No market risk, guaranteed growth.

**11. Beats Inflation**
7.1% tax-free returns typically stay ahead of inflation (averaging 5-6%), preserving real purchasing power.

**12. Extension Benefits**
After 15 years, you can extend in 5-year blocks. Can continue contributions or let existing corpus grow. Flexibility for long-term planning.

**13. Women and Children**
Can open accounts for minor children (guardian managed). Excellent tool for children's education corpus building over 15+ years.

**Comparison with Taxable Alternatives:**
For someone in 30% tax bracket:
• PPF: 7.1% tax-free = **10.1% pre-tax equivalent**
• FD: 7% taxable = **4.9% post-tax**
• Debt funds: 7% with LTCG tax = **5.9% post-tax**

PPF's tax-free status makes it highly competitive despite seemingly modest headline rate.`,
  },
  {
    id: 'related',
    title: 'Related Investment Calculators',
    content: `Optimize your complete investment strategy with these calculators:

**SIP Calculator**
Compare PPF's guaranteed 7.1% with equity mutual fund SIPs averaging 12% but with market risk. Many investors use both—PPF for stability, SIPs for growth.

**Lumpsum Calculator**
Calculate if lumpsum investments in equity can outperform PPF's guaranteed returns. Helps decide asset allocation between guaranteed and market-linked instruments.

**Goal Planning Calculator**
Use PPF as part of multi-goal planning. Ideal for goals 15+ years away (retirement, children's education) where guaranteed component is desired.

**FIRE Calculator**
PPF can form the conservative, guaranteed portion of your FIRE corpus. While PPF alone won't achieve aggressive FIRE timelines, it provides stability in retirement portfolio.

**Step-Up SIP Calculator**
Compare PPF's fixed contribution (₹1.5L limit) with step-up SIPs that have no upper limit. Often, a combination strategy works best—max out PPF for tax benefit + debt allocation, use SIPs for aggressive growth.

**Currency Impact Calculator**
For resident Indians who might become NRIs later: Understand that PPF returns are in INR. If you relocate and eventually repatriate, currency movements affect real returns in your foreign currency.`,
  },
];
