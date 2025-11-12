import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalculatorLayout } from "@/components/calculators/CalculatorLayout";
import { getCalculatorBySlug, getNextCalculator, getPreviousCalculator } from "@/features/calculators/registry";
import { lumpsumContent } from "@/content/calculators/lumpsum.content";
import * as calc from "@/features/calculators/utils";

type Currency = 'INR' | 'USD' | 'AED';

export default function LumpsumCalculator() {
  const calculator = getCalculatorBySlug('lumpsum')!;
  const prevCalc = getPreviousCalculator('lumpsum');
  const nextCalc = getNextCalculator('lumpsum');

  const [currency, setCurrency] = useState<Currency>('INR');
  const [lumpAmount, setLumpAmount] = useState(500000);
  const [lumpRate, setLumpRate] = useState(12);
  const [lumpYears, setLumpYears] = useState(10);

  const currencySymbol = calc.currencySymbols[currency];

  const formatCurrency = (amount: number) => {
    return calc.formatCurrency(amount, currency);
  };

  const lumpsumResults = calc.calculateLumpsum(lumpAmount, lumpRate, lumpYears);
  const returnsPercent = ((lumpsumResults.returns / lumpsumResults.futureValue) * 100).toFixed(1);
  const investedPercent = ((lumpsumResults.invested / lumpsumResults.futureValue) * 100).toFixed(1);

  return (
    <CalculatorLayout
      calculator={calculator}
      content={lumpsumContent}
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
                <SelectItem value="INR" data-testid="currency-inr">₹ INR</SelectItem>
                <SelectItem value="USD" data-testid="currency-usd">$ USD</SelectItem>
                <SelectItem value="AED" data-testid="currency-aed">د.إ AED</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-8">
            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="text-sm font-medium">Lumpsum Investment</label>
                <div className="px-3 py-1.5 rounded-md bg-muted border border-border">
                  <span className="text-sm font-mono font-semibold text-foreground">
                    {formatCurrency(lumpAmount)}
                  </span>
                </div>
              </div>
              <Slider
                value={[lumpAmount]}
                onValueChange={(val) => setLumpAmount(val[0])}
                min={10000}
                max={10000000}
                step={10000}
                data-testid="slider-lumpsum-amount"
              />
              <div className="flex flex-wrap gap-2 mt-3">
                {[50000, 100000, 500000, 1000000, 2500000].map((amount) => (
                  <button
                    key={amount}
                    onClick={() => setLumpAmount(amount)}
                    className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                      lumpAmount === amount
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground hover-elevate'
                    }`}
                    data-testid={`quick-select-lumpsum-${amount}`}
                  >
                    {formatCurrency(amount)}
                  </button>
                ))}
              </div>
              <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                <span>{currencySymbol}10K</span>
                <span>{currencySymbol}10M</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="text-sm font-medium">Expected Return (p.a.)</label>
                <div className="px-3 py-1.5 rounded-md bg-muted border border-border">
                  <span className="text-sm font-mono font-semibold text-foreground">{lumpRate}%</span>
                </div>
              </div>
              <Slider
                value={[lumpRate]}
                onValueChange={(val) => setLumpRate(val[0])}
                min={5}
                max={30}
                step={0.5}
                data-testid="slider-lumpsum-rate"
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
                <label className="text-sm font-medium">Investment Duration</label>
                <div className="px-3 py-1.5 rounded-md bg-muted border border-border">
                  <span className="text-sm font-mono font-semibold text-foreground">{lumpYears} Years</span>
                </div>
              </div>
              <Slider
                value={[lumpYears]}
                onValueChange={(val) => setLumpYears(val[0])}
                min={1}
                max={30}
                step={1}
                data-testid="slider-lumpsum-years"
              />
              <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                <span>1 Yr</span>
                <span>10 Yrs</span>
                <span>20 Yrs</span>
                <span>30 Yrs</span>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-8">
          <h2 className="text-xl font-semibold mb-6">Your Returns</h2>
          
          <div className="space-y-6">
            <div className="text-center py-6 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground mb-2">Future Value</p>
              <p className="text-3xl font-bold font-['Space_Grotesk'] text-primary" data-testid="text-future-value">
                {formatCurrency(lumpsumResults.futureValue)}
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Invested Amount</span>
                <span className="font-medium">{investedPercent}%</span>
              </div>
              <Progress value={Number(investedPercent)} className="h-2" />
              
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Returns</span>
                <span className="font-medium">{returnsPercent}%</span>
              </div>
              <Progress value={Number(returnsPercent)} className="h-2 [&>div]:bg-primary" />
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="p-4 rounded-lg bg-muted">
                <p className="text-xs text-muted-foreground mb-1">Total Invested</p>
                <p className="text-lg font-semibold font-['Space_Grotesk']" data-testid="text-invested">
                  {formatCurrency(lumpsumResults.invested)}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {investedPercent}% of total
                </p>
              </div>
              <div className="p-4 rounded-lg bg-primary/10">
                <p className="text-xs text-muted-foreground mb-1">Returns</p>
                <p className="text-lg font-semibold font-['Space_Grotesk'] text-primary" data-testid="text-returns">
                  {formatCurrency(lumpsumResults.returns)}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {returnsPercent}% of total
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
