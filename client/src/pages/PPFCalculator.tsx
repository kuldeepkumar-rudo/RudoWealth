import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalculatorLayout } from "@/components/calculators/CalculatorLayout";
import { getCalculatorBySlug, getNextCalculator, getPreviousCalculator } from "@/features/calculators/registry";
import { ppfContent } from "@/content/calculators/ppf.content";
import * as calc from "@/features/calculators/utils";
import { Shield } from "lucide-react";

type Currency = 'INR' | 'USD' | 'AED';

export default function PPFCalculator() {
  const calculator = getCalculatorBySlug('ppf')!;
  const prevCalc = getPreviousCalculator('ppf');
  const nextCalc = getNextCalculator('ppf');

  const [currency, setCurrency] = useState<Currency>('INR');
  const [ppfAmount, setPpfAmount] = useState(100000);
  const [ppfYears, setPpfYears] = useState(15);
  const ppfRate = 7.1;

  const currencySymbol = calc.currencySymbols[currency];

  const formatCurrency = (amount: number) => {
    return calc.formatCurrency(amount, currency);
  };

  const ppfResults = calc.calculatePPF(ppfAmount, ppfYears, ppfRate);
  const returnsPercent = ((ppfResults.returns / ppfResults.maturityAmount) * 100).toFixed(1);
  const investedPercent = ((ppfResults.totalInvested / ppfResults.maturityAmount) * 100).toFixed(1);

  return (
    <CalculatorLayout
      calculator={calculator}
      content={ppfContent}
      prevCalculator={prevCalc}
      nextCalculator={nextCalc}
    >
      <div className="grid lg:grid-cols-2 gap-8">
        <Card className="p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">PPF Investment Details</h2>
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
                <label className="text-sm font-medium">Annual Contribution</label>
                <div className="px-3 py-1.5 rounded-md bg-muted border border-border">
                  <span className="text-sm font-mono font-semibold text-foreground">
                    {formatCurrency(ppfAmount)}
                  </span>
                </div>
              </div>
              <Slider
                value={[ppfAmount]}
                onValueChange={(val) => setPpfAmount(val[0])}
                min={500}
                max={150000}
                step={500}
                data-testid="slider-ppf-amount"
              />
              <div className="flex flex-wrap gap-2 mt-3">
                {[50000, 100000, 150000].map((amount) => (
                  <button
                    key={amount}
                    onClick={() => setPpfAmount(amount)}
                    className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                      ppfAmount === amount
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground hover-elevate'
                    }`}
                    data-testid={`quick-select-ppf-${amount}`}
                  >
                    {formatCurrency(amount)}
                  </button>
                ))}
              </div>
              <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                <span>{currencySymbol}500</span>
                <span>{currencySymbol}150K (Max)</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="text-sm font-medium">Interest Rate (p.a.)</label>
                <div className="px-3 py-1.5 rounded-md bg-info/10 border border-info/20">
                  <span className="text-sm font-mono font-semibold text-info">
                    {ppfRate}%
                  </span>
                </div>
              </div>
              <div className="p-4 rounded-lg bg-info/10 border border-info/20">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="w-4 h-4 text-info" />
                  <p className="text-sm font-medium text-info">
                    Current PPF Rate
                  </p>
                </div>
                <p className="text-xs text-muted-foreground">
                  The PPF interest rate is set by the Government of India and is reviewed quarterly. The current rate is {ppfRate}% p.a. (FY 2024-25).
                </p>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="text-sm font-medium">Investment Period</label>
                <div className="px-3 py-1.5 rounded-md bg-muted border border-border">
                  <span className="text-sm font-mono font-semibold text-foreground">{ppfYears} Years</span>
                </div>
              </div>
              <Slider
                value={[ppfYears]}
                onValueChange={(val) => setPpfYears(val[0])}
                min={1}
                max={15}
                step={1}
                data-testid="slider-ppf-years"
              />
              <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                <span>1 Yr</span>
                <span>15 Yrs (Lock-in)</span>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Your Returns</h2>
            <Badge variant="outline" className="bg-success/10 text-success">
              <Shield className="w-3 h-3 mr-1" />
              Tax-Free Returns
            </Badge>
          </div>
          
          <div className="space-y-6">
            <div className="text-center py-6 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground mb-2">Maturity Amount</p>
              <p className="text-3xl font-bold font-['Space_Grotesk'] text-primary" data-testid="text-maturity-amount">
                {formatCurrency(ppfResults.maturityAmount)}
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Total Invested</span>
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
                  {formatCurrency(ppfResults.totalInvested)}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {investedPercent}% of total
                </p>
              </div>
              <div className="p-4 rounded-lg bg-primary/10">
                <p className="text-xs text-muted-foreground mb-1">Tax-Free Returns</p>
                <p className="text-lg font-semibold font-['Space_Grotesk'] text-primary" data-testid="text-returns">
                  {formatCurrency(ppfResults.returns)}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {returnsPercent}% of total
                </p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-success/10 border border-success/20">
              <div className="flex items-center gap-2 mb-3">
                <Shield className="w-4 h-4 text-success" />
                <p className="text-sm font-medium text-success">
                  Tax-Free Returns
                </p>
              </div>
              <p className="text-xs text-muted-foreground">
                PPF offers EEE (Exempt-Exempt-Exempt) status: contributions eligible for Section 80C deduction, interest earned is tax-free, and maturity amount is completely tax-free.
              </p>
            </div>

            <Button 
              size="lg" 
              className="w-full bg-success text-success-foreground hover-elevate active-elevate-2" 
              data-testid="button-start-investing"
            >
              Start Investing →
            </Button>
          </div>
        </Card>
      </div>
    </CalculatorLayout>
  );
}
