import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalculatorLayout } from "@/components/calculators/CalculatorLayout";
import { getCalculatorBySlug, getNextCalculator, getPreviousCalculator } from "@/features/calculators/registry";
import { currencyImpactContent } from "@/content/calculators/currency-impact.content";
import * as calc from "@/features/calculators/utils";
import { TrendingUp, TrendingDown } from "lucide-react";

type Currency = 'INR' | 'USD' | 'AED';

export default function CurrencyImpactCalculator() {
  const calculator = getCalculatorBySlug('currency-impact')!;
  const prevCalc = getPreviousCalculator('currency-impact');
  const nextCalc = getNextCalculator('currency-impact');

  const [currency, setCurrency] = useState<Currency>('USD');
  const [currencyMonthly, setCurrencyMonthly] = useState(1000);
  const [currencyYears, setCurrencyYears] = useState(10);
  const [currencyRate, setCurrencyRate] = useState(12);
  const [exchangeRateNow, setExchangeRateNow] = useState(83);
  const [exchangeRateFuture, setExchangeRateFuture] = useState(90);

  const currencySymbol = calc.currencySymbols[currency];

  const formatCurrency = (amount: number) => {
    return calc.formatCurrency(amount, currency);
  };

  const formatINR = (amount: number) => {
    return calc.formatCurrency(amount, 'INR');
  };

  const currencyResults = calc.calculateCurrencyImpact(currencyMonthly, currencyYears, currencyRate, exchangeRateNow, exchangeRateFuture);
  const exchangeRateGain = Number(currencyResults.exchangeRateGain);
  const isPositiveImpact = exchangeRateGain > 0;

  return (
    <CalculatorLayout
      calculator={calculator}
      content={currencyImpactContent}
      prevCalculator={prevCalc}
      nextCalculator={nextCalc}
    >
      <div className="grid lg:grid-cols-2 gap-8">
        <Card className="p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Investment Details</h2>
            <Select value={currency} onValueChange={(value) => setCurrency(value as Currency)}>
              <SelectTrigger className="w-32" data-testid="select-currency">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="USD" data-testid="currency-usd">$ USD</SelectItem>
                <SelectItem value="AED" data-testid="currency-aed">د.إ AED</SelectItem>
                <SelectItem value="INR" data-testid="currency-inr">₹ INR</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-8">
            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="text-sm font-medium">Monthly Investment ({currency})</label>
                <div className="px-3 py-1.5 rounded-md bg-muted border border-border">
                  <span className="text-sm font-mono font-semibold text-foreground">
                    {formatCurrency(currencyMonthly)}
                  </span>
                </div>
              </div>
              <Slider
                value={[currencyMonthly]}
                onValueChange={(val) => setCurrencyMonthly(val[0])}
                min={100}
                max={10000}
                step={100}
                data-testid="slider-currency-monthly"
              />
              <div className="flex flex-wrap gap-2 mt-3">
                {[500, 1000, 2500, 5000, 10000].map((amount) => (
                  <button
                    key={amount}
                    onClick={() => setCurrencyMonthly(amount)}
                    className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                      currencyMonthly === amount
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground hover-elevate'
                    }`}
                    data-testid={`quick-select-currency-${amount}`}
                  >
                    {formatCurrency(amount)}
                  </button>
                ))}
              </div>
              <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                <span>{currencySymbol}100</span>
                <span>{currencySymbol}10K</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="text-sm font-medium">Investment Duration</label>
                <div className="px-3 py-1.5 rounded-md bg-muted border border-border">
                  <span className="text-sm font-mono font-semibold text-foreground">{currencyYears} Years</span>
                </div>
              </div>
              <Slider
                value={[currencyYears]}
                onValueChange={(val) => setCurrencyYears(val[0])}
                min={1}
                max={30}
                step={1}
                data-testid="slider-currency-years"
              />
              <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                <span>1 Yr</span>
                <span>10 Yrs</span>
                <span>20 Yrs</span>
                <span>30 Yrs</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="text-sm font-medium">Expected Return (p.a.)</label>
                <div className="px-3 py-1.5 rounded-md bg-muted border border-border">
                  <span className="text-sm font-mono font-semibold text-foreground">{currencyRate}%</span>
                </div>
              </div>
              <Slider
                value={[currencyRate]}
                onValueChange={(val) => setCurrencyRate(val[0])}
                min={5}
                max={30}
                step={0.5}
                data-testid="slider-currency-rate"
              />
              <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                <span>5%</span>
                <span>12%</span>
                <span>20%</span>
                <span>30%</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="text-sm font-medium">Exchange Rate Now (1 {currency} = ₹)</label>
                <div className="px-3 py-1.5 rounded-md bg-muted border border-border">
                  <span className="text-sm font-mono font-semibold text-foreground">₹{exchangeRateNow}</span>
                </div>
              </div>
              <Slider
                value={[exchangeRateNow]}
                onValueChange={(val) => setExchangeRateNow(val[0])}
                min={50}
                max={100}
                step={0.5}
                data-testid="slider-exchange-now"
              />
              <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                <span>₹50</span>
                <span>₹100</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="text-sm font-medium">Exchange Rate After {currencyYears}Y (1 {currency} = ₹)</label>
                <div className="px-3 py-1.5 rounded-md bg-muted border border-border">
                  <span className="text-sm font-mono font-semibold text-foreground">₹{exchangeRateFuture}</span>
                </div>
              </div>
              <Slider
                value={[exchangeRateFuture]}
                onValueChange={(val) => setExchangeRateFuture(val[0])}
                min={50}
                max={150}
                step={0.5}
                data-testid="slider-exchange-future"
              />
              <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                <span>₹50</span>
                <span>₹150</span>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-8">
          <h2 className="text-xl font-semibold mb-6">Currency Impact Analysis</h2>
          
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center py-6 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground mb-2">Future Value (INR)</p>
                <p className="text-2xl font-bold font-['Space_Grotesk'] text-primary" data-testid="text-future-value-inr">
                  {formatINR(currencyResults.futureValueINR)}
                </p>
              </div>
              <div className="text-center py-6 bg-primary/10 rounded-lg border border-primary/20">
                <p className="text-sm text-muted-foreground mb-2">Future Value ({currency})</p>
                <p className="text-2xl font-bold font-['Space_Grotesk'] text-primary" data-testid="text-future-value-usd">
                  {formatCurrency(currencyResults.futureValueUSD)}
                </p>
              </div>
            </div>

            <div className={`p-4 rounded-lg border ${
              isPositiveImpact 
                ? 'bg-blue-500/10 border-blue-500/20' 
                : 'bg-red-500/10 border-red-500/20'
            }`}>
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-muted-foreground">Exchange Rate Impact</p>
                <Badge variant="outline" className={
                  isPositiveImpact
                    ? 'bg-blue-500/10 text-blue-700 dark:text-blue-300'
                    : 'bg-red-500/10 text-red-700 dark:text-red-300'
                }>
                  {isPositiveImpact ? (
                    <TrendingUp className="w-3 h-3 mr-1" />
                  ) : (
                    <TrendingDown className="w-3 h-3 mr-1" />
                  )}
                  {isPositiveImpact ? '+' : ''}{currencyResults.exchangeRateGain}%
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                {isPositiveImpact 
                  ? 'INR depreciation works in your favor as an NRI' 
                  : 'INR appreciation reduces your foreign currency returns'}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-muted">
                <p className="text-xs text-muted-foreground mb-1">Total Invested ({currency})</p>
                <p className="text-lg font-semibold font-['Space_Grotesk']" data-testid="text-invested-usd">
                  {formatCurrency(currencyResults.totalInvestedUSD)}
                </p>
              </div>
              <div className="p-4 rounded-lg bg-primary/10">
                <p className="text-xs text-muted-foreground mb-1">Returns ({currency})</p>
                <p className="text-lg font-semibold font-['Space_Grotesk'] text-primary" data-testid="text-returns-usd">
                  {formatCurrency(currencyResults.returnsUSD)}
                </p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium text-blue-700 dark:text-blue-300">
                  Effective Return in {currency}
                </p>
                <Badge variant="outline" className="bg-blue-500/10 text-blue-700 dark:text-blue-300">
                  {currencyResults.effectiveReturn}% p.a.
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                After accounting for {currencyRate}% investment returns and {currencyResults.exchangeRateGain}% currency impact
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-muted">
                <p className="text-xs text-muted-foreground mb-1">Exchange Rate Now</p>
                <p className="text-base font-semibold font-['Space_Grotesk']">
                  1 {currency} = ₹{exchangeRateNow}
                </p>
              </div>
              <div className="p-4 rounded-lg bg-muted">
                <p className="text-xs text-muted-foreground mb-1">Exchange Rate Future</p>
                <p className="text-base font-semibold font-['Space_Grotesk']">
                  1 {currency} = ₹{exchangeRateFuture}
                </p>
              </div>
            </div>

            <Button size="lg" className="w-full bg-success text-success-foreground hover-elevate active-elevate-2" data-testid="button-start-investing">
              Start Investing →
            </Button>
          </div>
        </Card>
      </div>
    </CalculatorLayout>
  );
}
