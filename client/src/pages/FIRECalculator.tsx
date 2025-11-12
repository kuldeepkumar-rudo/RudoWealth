import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalculatorLayout } from "@/components/calculators/CalculatorLayout";
import { getCalculatorBySlug, getNextCalculator, getPreviousCalculator } from "@/features/calculators/registry";
import { fireContent } from "@/content/calculators/fire.content";
import * as calc from "@/features/calculators/utils";
import { Sparkles } from "lucide-react";

type Currency = 'INR' | 'USD' | 'AED';

export default function FIRECalculator() {
  const calculator = getCalculatorBySlug('fire')!;
  const prevCalc = getPreviousCalculator('fire');
  const nextCalc = getNextCalculator('fire');

  const [currency, setCurrency] = useState<Currency>('INR');
  const [currentAge, setCurrentAge] = useState(30);
  const [retirementAge, setRetirementAge] = useState(50);
  const [monthlyExpenses, setMonthlyExpenses] = useState(50000);
  const [currentCorpus, setCurrentCorpus] = useState(0);
  const [fireRate, setFireRate] = useState(12);

  const currencySymbol = calc.currencySymbols[currency];

  const formatCurrency = (amount: number) => {
    return calc.formatCurrency(amount, currency);
  };

  const fireResults = calc.calculateFIRE(currentAge, retirementAge, monthlyExpenses, currentCorpus, fireRate);
  const yearsToFIRE = retirementAge - currentAge;

  return (
    <CalculatorLayout
      calculator={calculator}
      content={fireContent}
      prevCalculator={prevCalc}
      nextCalculator={nextCalc}
    >
      <div className="grid lg:grid-cols-2 gap-8">
        <Card className="p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">FIRE Planning</h2>
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
                <label className="text-sm font-medium">Current Age</label>
                <div className="px-3 py-1.5 rounded-md bg-muted border border-border">
                  <span className="text-sm font-mono font-semibold text-foreground">{currentAge} years</span>
                </div>
              </div>
              <Slider
                value={[currentAge]}
                onValueChange={(val) => setCurrentAge(val[0])}
                min={20}
                max={60}
                step={1}
                data-testid="slider-current-age"
              />
              <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                <span>20</span>
                <span>40</span>
                <span>60</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="text-sm font-medium">Target FIRE Age</label>
                <div className="px-3 py-1.5 rounded-md bg-muted border border-border">
                  <span className="text-sm font-mono font-semibold text-foreground">{retirementAge} years</span>
                </div>
              </div>
              <Slider
                value={[retirementAge]}
                onValueChange={(val) => setRetirementAge(val[0])}
                min={30}
                max={70}
                step={1}
                data-testid="slider-retirement-age"
              />
              <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                <span>30</span>
                <span>50</span>
                <span>70</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="text-sm font-medium">Monthly Expenses</label>
                <div className="px-3 py-1.5 rounded-md bg-muted border border-border">
                  <span className="text-sm font-mono font-semibold text-foreground">
                    {formatCurrency(monthlyExpenses)}
                  </span>
                </div>
              </div>
              <Slider
                value={[monthlyExpenses]}
                onValueChange={(val) => setMonthlyExpenses(val[0])}
                min={10000}
                max={500000}
                step={5000}
                data-testid="slider-monthly-expenses"
              />
              <div className="flex flex-wrap gap-2 mt-3">
                {[25000, 50000, 100000, 150000, 200000].map((amount) => (
                  <button
                    key={amount}
                    onClick={() => setMonthlyExpenses(amount)}
                    className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                      monthlyExpenses === amount
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground hover-elevate'
                    }`}
                    data-testid={`quick-select-expenses-${amount}`}
                  >
                    {formatCurrency(amount)}
                  </button>
                ))}
              </div>
              <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                <span>{currencySymbol}10K</span>
                <span>{currencySymbol}500K</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="text-sm font-medium">Current Corpus</label>
                <div className="px-3 py-1.5 rounded-md bg-muted border border-border">
                  <span className="text-sm font-mono font-semibold text-foreground">
                    {formatCurrency(currentCorpus)}
                  </span>
                </div>
              </div>
              <Slider
                value={[currentCorpus]}
                onValueChange={(val) => setCurrentCorpus(val[0])}
                min={0}
                max={100000000}
                step={100000}
                data-testid="slider-current-corpus"
              />
              <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                <span>{currencySymbol}0</span>
                <span>{currencySymbol}10Cr</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="text-sm font-medium">Expected Return (p.a.)</label>
                <div className="px-3 py-1.5 rounded-md bg-muted border border-border">
                  <span className="text-sm font-mono font-semibold text-foreground">{fireRate}%</span>
                </div>
              </div>
              <Slider
                value={[fireRate]}
                onValueChange={(val) => setFireRate(val[0])}
                min={5}
                max={30}
                step={0.5}
                data-testid="slider-fire-rate"
              />
              <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                <span>5%</span>
                <span>12%</span>
                <span>20%</span>
                <span>30%</span>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Your FIRE Plan</h2>
            <Badge variant="outline" className="bg-info/10 text-info">
              <Sparkles className="w-3 h-3 mr-1" />
              25x Rule
            </Badge>
          </div>
          
          <div className="space-y-6">
            <div className="text-center py-6 bg-info/10 rounded-lg border border-info/20">
              <p className="text-sm text-muted-foreground mb-2">Your FIRE Number</p>
              <p className="text-3xl font-bold font-['Space_Grotesk'] text-info" data-testid="text-fire-number">
                {formatCurrency(fireResults.fireNumber)}
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                25x Annual Expenses
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-muted">
                <p className="text-xs text-muted-foreground mb-1">Required Monthly SIP</p>
                <p className="text-lg font-semibold font-['Space_Grotesk']" data-testid="text-required-sip">
                  {formatCurrency(fireResults.requiredMonthlySIP)}
                </p>
              </div>
              <div className="p-4 rounded-lg bg-muted">
                <p className="text-xs text-muted-foreground mb-1">Years to FIRE</p>
                <p className="text-lg font-semibold font-['Space_Grotesk']" data-testid="text-years-to-fire">
                  {yearsToFIRE} years
                </p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-primary/10">
              <p className="text-xs text-muted-foreground mb-1">Total Investment Needed</p>
              <p className="text-lg font-semibold font-['Space_Grotesk'] text-primary" data-testid="text-total-investment">
                {formatCurrency(fireResults.totalInvestment)}
              </p>
            </div>

            <div className="p-4 rounded-lg bg-info/10 border border-info/20">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-4 h-4 text-info" />
                <p className="text-sm font-medium text-info">
                  FIRE Number = 25x Annual Expenses
                </p>
              </div>
              <p className="text-xs text-muted-foreground">
                Based on the 4% safe withdrawal rule. Once you reach your FIRE number, you can withdraw 4% annually (adjusted for inflation) and your corpus will last indefinitely.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-muted">
                <p className="text-xs text-muted-foreground mb-1">Monthly Expenses</p>
                <p className="text-base font-semibold font-['Space_Grotesk']">
                  {formatCurrency(monthlyExpenses)}
                </p>
              </div>
              <div className="p-4 rounded-lg bg-muted">
                <p className="text-xs text-muted-foreground mb-1">Annual Expenses</p>
                <p className="text-base font-semibold font-['Space_Grotesk']">
                  {formatCurrency(monthlyExpenses * 12)}
                </p>
              </div>
            </div>

            <Button size="lg" className="w-full bg-success text-success-foreground hover-elevate active-elevate-2" data-testid="button-start-investing">
              Start Your FIRE Journey →
            </Button>
          </div>
        </Card>
      </div>
    </CalculatorLayout>
  );
}
