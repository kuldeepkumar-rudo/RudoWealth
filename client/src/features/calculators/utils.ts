type Currency = "INR" | "USD" | "AED";

export const currencySymbols: Record<Currency, string> = {
  INR: "₹",
  USD: "$",
  AED: "د.إ"
};

export const formatCurrency = (amount: number, currency: Currency): string => {
  const symbol = currencySymbols[currency];
  
  if (currency === "INR") {
    if (amount >= 10000000) return `${symbol}${(amount / 10000000).toFixed(2)} Cr`;
    if (amount >= 100000) return `${symbol}${(amount / 100000).toFixed(2)} Lacs`;
    if (amount >= 1000) return `${symbol}${(amount / 1000).toFixed(1)}K`;
    return `${symbol}${Math.round(amount)}`;
  } else {
    if (amount >= 1000000) return `${symbol}${(amount / 1000000).toFixed(2)}M`;
    if (amount >= 1000) return `${symbol}${(amount / 1000).toFixed(1)}K`;
    return `${symbol}${Math.round(amount).toLocaleString()}`;
  }
};

export const calculateSIP = (amount: number, rate: number, years: number) => {
  const monthlyRate = rate / 12 / 100;
  const months = years * 12;
  const futureValue = amount * (((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate));
  const invested = amount * months;
  const returns = futureValue - invested;
  
  return {
    futureValue: Math.round(futureValue),
    invested: Math.round(invested),
    returns: Math.round(returns),
    cagr: rate.toFixed(2),
    monthlyGrowth: Math.round(returns / months),
    investedPercent: ((invested / futureValue) * 100).toFixed(1),
    returnsPercent: ((returns / futureValue) * 100).toFixed(1),
    totalGrowth: (((futureValue - invested) / invested) * 100).toFixed(0)
  };
};

export const calculateLumpsum = (amount: number, rate: number, years: number) => {
  const futureValue = amount * Math.pow(1 + rate / 100, years);
  const returns = futureValue - amount;
  
  return {
    futureValue: Math.round(futureValue),
    invested: amount,
    returns: Math.round(returns),
    cagr: rate.toFixed(2),
    investedPercent: ((amount / futureValue) * 100).toFixed(1),
    returnsPercent: ((returns / futureValue) * 100).toFixed(1),
    totalGrowth: (((futureValue - amount) / amount) * 100).toFixed(0)
  };
};

export const calculateStepUpSIP = (initialAmount: number, rate: number, years: number, incrementPercent: number) => {
  const monthlyRate = rate / 12 / 100;
  let totalInvested = 0;
  let futureValue = 0;
  let currentSIP = initialAmount;
  
  for (let year = 0; year < years; year++) {
    const monthsInYear = 12;
    for (let month = 0; month < monthsInYear; month++) {
      totalInvested += currentSIP;
      const monthsRemaining = (years * 12) - (year * 12 + month);
      futureValue += currentSIP * Math.pow(1 + monthlyRate, monthsRemaining);
    }
    currentSIP = currentSIP * (1 + incrementPercent / 100);
  }
  
  const returns = futureValue - totalInvested;
  const normalSIP = calculateSIP(initialAmount, rate, years);
  
  return {
    futureValue: Math.round(futureValue),
    invested: Math.round(totalInvested),
    returns: Math.round(returns),
    cagr: rate.toFixed(2),
    investedPercent: ((totalInvested / futureValue) * 100).toFixed(1),
    returnsPercent: ((returns / futureValue) * 100).toFixed(1),
    totalGrowth: (((futureValue - totalInvested) / totalInvested) * 100).toFixed(0),
    vsNormalSIP: Math.round(futureValue - normalSIP.futureValue),
    vsNormalSIPPercent: (((futureValue - normalSIP.futureValue) / normalSIP.futureValue) * 100).toFixed(1)
  };
};

export const calculateGoalPlanning = (goalAmount: number, years: number, rate: number, currentSavings: number) => {
  const futureValueOfSavings = currentSavings * Math.pow(1 + rate / 100, years);
  const remainingAmount = goalAmount - futureValueOfSavings;
  
  if (remainingAmount <= 0) {
    return {
      requiredMonthlySIP: 0,
      totalInvestment: currentSavings,
      futureValueOfSavings: Math.round(futureValueOfSavings),
      additionalRequired: 0,
      goalAchievable: true
    };
  }
  
  const monthlyRate = rate / 12 / 100;
  const months = years * 12;
  const requiredMonthlySIP = remainingAmount / (((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate));
  
  return {
    requiredMonthlySIP: Math.round(requiredMonthlySIP),
    totalInvestment: Math.round(requiredMonthlySIP * months + currentSavings),
    futureValueOfSavings: Math.round(futureValueOfSavings),
    additionalRequired: Math.round(remainingAmount),
    goalAchievable: true
  };
};

export const calculateFIRE = (currentAge: number, retirementAge: number, monthlyExpenses: number, currentCorpus: number, rate: number) => {
  const years = retirementAge - currentAge;
  const annualExpenses = monthlyExpenses * 12;
  const fireNumber = annualExpenses * 25;
  const futureValueOfCorpus = currentCorpus * Math.pow(1 + rate / 100, years);
  const additionalRequired = fireNumber - futureValueOfCorpus;
  
  if (additionalRequired <= 0) {
    return {
      fireNumber: Math.round(fireNumber),
      requiredMonthlySIP: 0,
      totalInvestment: currentCorpus,
      futureValueOfCorpus: Math.round(futureValueOfCorpus),
      yearsToFIRE: years,
      fireAchievable: true
    };
  }
  
  const monthlyRate = rate / 12 / 100;
  const months = years * 12;
  const requiredMonthlySIP = additionalRequired / (((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate));
  
  return {
    fireNumber: Math.round(fireNumber),
    requiredMonthlySIP: Math.round(requiredMonthlySIP),
    totalInvestment: Math.round(requiredMonthlySIP * months + currentCorpus),
    futureValueOfCorpus: Math.round(futureValueOfCorpus),
    yearsToFIRE: years,
    fireAchievable: true
  };
};

export const calculatePPF = (annualContribution: number, years: number, rate: number) => {
  let balance = 0;
  for (let year = 1; year <= years; year++) {
    balance = (balance + annualContribution) * (1 + rate / 100);
  }
  
  const totalInvested = annualContribution * years;
  const returns = balance - totalInvested;
  
  return {
    maturityAmount: Math.round(balance),
    totalInvested: Math.round(totalInvested),
    returns: Math.round(returns),
    effectiveRate: rate.toFixed(2),
    taxFree: true
  };
};

export const calculateCurrencyImpact = (monthlyUSD: number, years: number, rate: number, exchangeRateNow: number, exchangeRateFuture: number) => {
  const monthlyINR = monthlyUSD * exchangeRateNow;
  const sipResult = calculateSIP(monthlyINR, rate, years);
  
  const futureINRValue = sipResult.futureValue;
  const futureUSDValue = futureINRValue / exchangeRateFuture;
  
  const totalInvestedUSD = monthlyUSD * years * 12;
  const returnsUSD = futureUSDValue - totalInvestedUSD;
  
  const exchangeRateGain = ((exchangeRateFuture - exchangeRateNow) / exchangeRateNow) * 100;
  
  return {
    futureValueINR: Math.round(futureINRValue),
    futureValueUSD: Math.round(futureUSDValue),
    totalInvestedUSD: Math.round(totalInvestedUSD),
    returnsUSD: Math.round(returnsUSD),
    exchangeRateGain: exchangeRateGain.toFixed(2),
    effectiveReturn: (((futureUSDValue / totalInvestedUSD) ** (1 / years) - 1) * 100).toFixed(2)
  };
};
