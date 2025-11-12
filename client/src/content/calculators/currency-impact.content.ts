import { ContentSection } from './sip.content';

export const currencyImpactContent: ContentSection[] = [
  {
    id: 'what-is',
    title: 'What is a Currency Impact Calculator?',
    content: `A Currency Impact Calculator helps NRIs understand how exchange rate fluctuations affect their investment returns when investing in Indian assets (INR) while earning in foreign currencies (USD, AED, GBP, SGD, etc.). It calculates your actual returns in your earning currency after accounting for rupee appreciation or depreciation.

**Why it matters:** An NRI might see impressive 12% returns on Indian mutual funds in INR terms, but if the rupee depreciates 5% against the dollar during the same period, the real return in USD terms is only around 6.8%. Conversely, if the rupee strengthens, returns get amplified. This calculator removes the guesswork and shows true cross-border investment performance.`,
  },
  {
    id: 'how-it-helps',
    title: "How Can RuDo's Currency Impact Calculator Help You?",
    content: `The Currency Impact Calculator is essential for NRIs making informed investment decisions. It reveals the complete picture of returns by factoring in both investment performance and currency movements—the two variables that determine actual wealth creation for cross-border investors.

Whether you're an NRI in UAE earning in AED, in USA earning in USD, or anywhere globally, this calculator helps you make apple-to-apple comparisons between investing in India versus keeping money in local currency investments.

**Key Benefits:**
• **True Return Visibility:** See actual returns in your earning currency, not just INR returns
• **Investment Comparison:** Compare India investments vs local currency options on equal footing
• **Rupee Trend Analysis:** Model different rupee appreciation/depreciation scenarios for sensitivity analysis
• **Repatriation Planning:** Calculate exact foreign currency amount you'll receive when repatriating funds
• **Risk Assessment:** Understand currency risk exposure in your India-focused portfolio
• **Strategic Timing:** Make informed decisions about when to invest or repatriate based on exchange rates
• **Multi-Currency Support:** Calculate for USD/INR, AED/INR, GBP/INR, SGD/INR, and more currency pairs
• **Historical Context:** Understand how past currency movements have affected NRI returns`,
  },
  {
    id: 'how-it-works',
    title: 'How Does the Currency Impact Calculator Work?',
    content: `The calculator accounts for both investment returns and currency movements to derive final returns in your foreign currency:

**Formula:**
\`\`\`
Final Return in FC = [(1 + Investment Return in INR) × (1 + Currency Change)] - 1
\`\`\`

Where:
• **Investment Return in INR** = Returns on your India investment (in rupee terms)
• **Currency Change** = (Ending Exchange Rate - Starting Exchange Rate) / Starting Exchange Rate
• **FC** = Foreign Currency (USD, AED, etc.)

**Example 1: Rupee Depreciation (Favorable for NRI)**
Investment: $10,000 converted to INR
Starting rate: 1 USD = ₹82
INR invested: ₹8,20,000
Investment period: 3 years
INR return: 12% per annum = 40.5% total (compounded)
INR value after 3 years: ₹11,52,100

Ending exchange rate: 1 USD = ₹88 (rupee depreciated 7.3%)

USD value on redemption: ₹11,52,100 ÷ 88 = $13,092

Total USD return: $3,092 on $10,000 = 30.92% over 3 years
Annualized USD return: ~9.4% p.a.

**Breakdown:**
• INR investment return: 12% p.a.
• Currency benefit: Rupee depreciation added ~5% to total returns
• Net USD return: ~9.4% p.a. (12% - 2.6% currency adjustment)

**Example 2: Rupee Appreciation (Unfavorable for NRI)**
Same investment: $10,000 at 1 USD = ₹82
INR invested: ₹8,20,000
Investment period: 3 years
INR return: 12% per annum = 40.5% total
INR value after 3 years: ₹11,52,100

Ending exchange rate: 1 USD = ₹76 (rupee appreciated 7.3%)

USD value on redemption: ₹11,52,100 ÷ 76 = $15,159

Total USD return: $5,159 on $10,000 = 51.59% over 3 years
Annualized USD return: ~14.8% p.a.

**Breakdown:**
• INR investment return: 12% p.a.
• Currency benefit: Rupee appreciation added ~7% to total returns
• Net USD return: ~14.8% p.a. (12% + 2.8% currency boost)

**Key Insight:**
A depreciating rupee reduces NRI returns (unfavorable), while an appreciating rupee enhances NRI returns (favorable). This is opposite to how exporters/importers view currency movements.`,
  },
  {
    id: 'how-to-use',
    title: 'How to Use RuDo\'s Currency Impact Calculator?',
    content: `Our Currency Impact Calculator helps you make currency-aware investment decisions:

**Step 1: Select Your Currency Pair**
Choose the conversion pair that applies to you:
• USD/INR (for NRIs in USA, Middle East with USD income)
• AED/INR (for NRIs in UAE)
• GBP/INR (for NRIs in UK)
• SGD/INR (for NRIs in Singapore)
• EUR/INR (for NRIs in Europe)

**Step 2: Enter Investment Amount**
Input the amount in your earning currency (e.g., $50,000 or AED 200,000) that you're considering investing in India.

**Step 3: Set Current Exchange Rate**
Enter today's exchange rate. The calculator pre-fills current market rates but you can adjust based on the rate you're actually getting.

**Step 4: Input Expected INR Returns**
Enter expected annual returns on your India investment in INR terms:
• Conservative debt funds: 6-8%
• Balanced funds: 8-10%
• Equity funds: 10-15%
• Real estate: 8-12%

**Step 5: Set Investment Tenure**
Choose your investment period. Longer tenures allow more time for currency movements to average out.

**Step 6: Model Currency Scenarios**
Input expected future exchange rate or annual currency change percentage:
• **Historical average:** USD/INR depreciates ~3-4% annually (rupee weakens)
• **Conservative:** Assume 2% annual depreciation
• **Optimistic:** Assume stable rates or 1% appreciation
• **Pessimistic:** Assume 5%+ annual depreciation

**Step 7: Review Three Scenarios**
The calculator typically shows:
• **Best Case:** Strong INR returns + favorable currency movement
• **Base Case:** Expected INR returns + moderate currency impact
• **Worst Case:** Lower returns + unfavorable currency movement

**Step 8: Compare with Local Alternatives**
Compare your net foreign currency returns with alternatives:
• US/UAE stock markets
• Local real estate
• Dollar-denominated bonds
• International mutual funds

**Decision Framework:**
• If net foreign currency returns from India > local alternatives + 2-3% (to account for complexity) → India investment makes sense
• If net returns are comparable → Consider diversification across both
• If net returns are lower → Reconsider or wait for better exchange rate

**Advanced Usage:**
• **Dollar-Cost Averaging:** Model monthly investments to see how regular conversions at different rates average out currency risk
• **Repatriation Timing:** If sitting on INR gains, model when to convert back based on currency forecasts
• **Hedging Decisions:** Calculate if the currency risk warrants hedging costs (typically 2-4% annually)`,
  },
  {
    id: 'advantages',
    title: 'Advantages of Currency-Aware Investing',
    content: `**1. Complete Return Picture**
Avoid the trap of seeing impressive INR returns while actually making mediocre foreign currency returns. Know your true wealth creation.

**2. Informed Decision Making**
Make investment decisions based on expected returns in the currency you actually spend, not headline INR figures.

**3. Risk Awareness**
Understand that NRI investments in India carry dual risk: market risk + currency risk. Plan accordingly.

**4. Strategic Timing**
When rupee is strong (favorable exchange rate), it's a good time to invest more in India. When weak, consider pausing or repatriating previous gains.

**5. Portfolio Diversification**
Understanding currency impact helps you balance India investments with local currency assets for optimal diversification.

**6. Repatriation Planning**
Plan optimal windows for bringing money back based on currency trends and your return expectations.

**7. Tax Optimization**
Factor in currency impact when calculating if NRI tax arbitrage (lower India capital gains tax) is worth the currency risk.

**8. Goal Alignment**
If your goals are in India (children's education, retirement home), currency risk is lower. If goals are in foreign country, currency risk is higher. Plan accordingly.

**9. Competitive Analysis**
Compare India investments with global alternatives on level playing field, both in same currency terms.

**10. Historical Perspective**
Understand that over 20+ year periods, INR has depreciated ~3-4% annually against USD. This long-term trend favors keeping substantial money in dollar-based assets.

**Real-World Scenarios:**

**Favorable Scenario (2014-2020):**
USD/INR moved from 60 to 75 (25% depreciation over 6 years)
An NRI with 10% INR returns effectively got ~14% USD returns
India investments significantly outperformed US markets after currency benefit

**Unfavorable Scenario (2007-2011):**
USD/INR moved from 40 to 45 (12.5% depreciation over 4 years)
But during 2011-2013, it jumped to 68 (51% depreciation in 2 years)
NRIs who didn't repatriate during strong rupee period missed opportunity

**Neutral Scenario (2020-2024):**
USD/INR relatively stable around 74-83 range (12% move over 4 years)
Currency impact minimal, investment returns dominated final outcome

**Strategic Takeaways:**
• Diversify across geographies and currencies
• Don't put all eggs in India basket purely based on INR returns
• Conversely, don't avoid India if fundamentals are strong just due to currency fear
• Use rupee strength periods (low exchange rate) to increase India allocation
• Use rupee weakness periods (high exchange rate) to repatriate gains
• Long-term investors (15+ years) can largely ignore short-term currency volatility`,
  },
  {
    id: 'related',
    title: 'Related Investment Calculators',
    content: `Enhance your NRI investment strategy with these calculators:

**SIP Calculator**
Calculate SIP returns in INR, then use Currency Impact Calculator to convert to your earning currency. Helps decide if rupee-cost averaging through SIPs makes sense for NRIs.

**Lumpsum Calculator**
Calculate lumpsum investment returns in INR, then apply currency impact. Often, timing a lumpsum investment during favorable exchange rates can add 5-10% to overall returns.

**Goal Planning Calculator**
For goals in India (property, children's education), calculate required SIP in INR terms. For goals in your current country, calculate in foreign currency and understand currency risk.

**FIRE Calculator**
NRIs planning to retire in India should calculate FIRE number in INR. Those retiring in current country should use foreign currency. Currency calculator helps convert between scenarios.

**PPF Calculator**
PPF returns are guaranteed in INR but carry full currency risk for NRIs. Use currency calculator to see real foreign currency returns on PPF versus local currency fixed income.

**Step-Up SIP Calculator**
Combine step-up SIPs with currency awareness. As NRI income grows (often in foreign currency), stepping up India investments during favorable exchange periods maximizes wealth creation.`,
  },
];
