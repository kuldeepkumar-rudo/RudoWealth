import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalculatorLayout } from "@/components/calculators/CalculatorLayout";
import { getCalculatorBySlug, getNextCalculator, getPreviousCalculator } from "@/features/calculators/registry";
import { goalPlanningContent } from "@/content/calculators/goal-planning.content";
import * as calc from "@/features/calculators/utils";
import { CheckCircle2 } from "lucide-react";

type Currency = 'INR' | 'USD' | 'AED';

export default function GoalPlanningCalculator() {
  const calculator = getCalculatorBySlug('goal-planning')!;
  const prevCalc = getPreviousCalculator('goal-planning');
  const nextCalc = getNextCalculator('goal-planning');

  const [currency, setCurrency] = useState<Currency>('INR');
  const [goalAmount, setGoalAmount] = useState(5000000);
  const [goalYears, setGoalYears] = useState(10);
  const [goalRate, setGoalRate] = useState(12);
  const [currentSavings, setCurrentSavings] = useState(0);

  const currencySymbol = calc.currencySymbols[currency];

  const formatCurrency = (amount: number) => {
    return calc.formatCurrency(amount, currency);
  };

  const goalResults = calc.calculateGoalPlanning(goalAmount, goalYears, goalRate, currentSavings);
  const isGoalAchievable = goalResults.requiredMonthlySIP <= 0;

  return (
    <CalculatorLayout
      calculator={calculator}
      content={goalPlanningContent}
      prevCalculator={prevCalc}
      nextCalculator={nextCalc}
    >
      <div className="grid lg:grid-cols-2 gap-8">
        <Card className="p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Goal Details</h2>
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
                <label className="text-sm font-medium">Goal Amount</label>
                <div className="px-3 py-1.5 rounded-md bg-muted border border-border">
                  <span className="text-sm font-mono font-semibold text-foreground">
                    {formatCurrency(goalAmount)}
                  </span>
                </div>
              </div>
              <Slider
                value={[goalAmount]}
                onValueChange={(val) => setGoalAmount(val[0])}
                min={100000}
                max={100000000}
                step={100000}
                data-testid="slider-goal-amount"
              />
              <div className="flex flex-wrap gap-2 mt-3">
                {[500000, 1000000, 2500000, 5000000, 10000000].map((amount) => (
                  <button
                    key={amount}
                    onClick={() => setGoalAmount(amount)}
                    className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                      goalAmount === amount
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground hover-elevate'
                    }`}
                    data-testid={`quick-select-goal-${amount}`}
                  >
                    {formatCurrency(amount)}
                  </button>
                ))}
              </div>
              <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                <span>{currencySymbol}100K</span>
                <span>{currencySymbol}10Cr</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="text-sm font-medium">Time to Goal</label>
                <div className="px-3 py-1.5 rounded-md bg-muted border border-border">
                  <span className="text-sm font-mono font-semibold text-foreground">{goalYears} Years</span>
                </div>
              </div>
              <Slider
                value={[goalYears]}
                onValueChange={(val) => setGoalYears(val[0])}
                min={1}
                max={30}
                step={1}
                data-testid="slider-goal-years"
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
                  <span className="text-sm font-mono font-semibold text-foreground">{goalRate}%</span>
                </div>
              </div>
              <Slider
                value={[goalRate]}
                onValueChange={(val) => setGoalRate(val[0])}
                min={5}
                max={30}
                step={0.5}
                data-testid="slider-goal-rate"
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
                <label className="text-sm font-medium">Current Savings</label>
                <div className="px-3 py-1.5 rounded-md bg-muted border border-border">
                  <span className="text-sm font-mono font-semibold text-foreground">
                    {formatCurrency(currentSavings)}
                  </span>
                </div>
              </div>
              <Slider
                value={[currentSavings]}
                onValueChange={(val) => setCurrentSavings(val[0])}
                min={0}
                max={100000000}
                step={100000}
                data-testid="slider-current-savings"
              />
              <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                <span>{currencySymbol}0</span>
                <span>{currencySymbol}10Cr</span>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-8">
          <h2 className="text-xl font-semibold mb-6">Required Investment</h2>
          
          <div className="space-y-6">
            {isGoalAchievable ? (
              <div className="text-center py-8 bg-primary/10 rounded-lg border border-primary/20">
                <CheckCircle2 className="w-12 h-12 mx-auto mb-4 text-primary" />
                <p className="text-xl font-semibold text-primary mb-2">
                  Goal Already Achievable!
                </p>
                <p className="text-sm text-muted-foreground">
                  Your current savings will grow to exceed your goal amount
                </p>
              </div>
            ) : (
              <div className="text-center py-6 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground mb-2">Required Monthly SIP</p>
                <p className="text-3xl font-bold font-['Space_Grotesk'] text-primary" data-testid="text-required-sip">
                  {formatCurrency(goalResults.requiredMonthlySIP)}
                </p>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-muted">
                <p className="text-xs text-muted-foreground mb-1">Goal Amount</p>
                <p className="text-lg font-semibold font-['Space_Grotesk']" data-testid="text-goal-amount">
                  {formatCurrency(goalAmount)}
                </p>
              </div>
              <div className="p-4 rounded-lg bg-muted">
                <p className="text-xs text-muted-foreground mb-1">Total Investment</p>
                <p className="text-lg font-semibold font-['Space_Grotesk']" data-testid="text-total-investment">
                  {formatCurrency(goalResults.totalInvestment)}
                </p>
              </div>
            </div>

            {currentSavings > 0 && (
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-primary/10">
                  <p className="text-xs text-muted-foreground mb-1">Future Value of Savings</p>
                  <p className="text-lg font-semibold font-['Space_Grotesk'] text-primary" data-testid="text-future-savings">
                    {formatCurrency(goalResults.futureValueOfSavings)}
                  </p>
                </div>
                {!isGoalAchievable && (
                  <div className="p-4 rounded-lg bg-muted">
                    <p className="text-xs text-muted-foreground mb-1">Additional Required</p>
                    <p className="text-lg font-semibold font-['Space_Grotesk']" data-testid="text-additional-required">
                      {formatCurrency(goalResults.additionalRequired)}
                    </p>
                  </div>
                )}
              </div>
            )}

            <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
              <p className="text-sm text-muted-foreground mb-2">Timeline</p>
              <div className="flex items-center justify-between">
                <p className="text-lg font-semibold">{goalYears} years</p>
                <Badge variant="outline" className="bg-blue-500/10 text-blue-700 dark:text-blue-300">
                  {goalYears * 12} months
                </Badge>
              </div>
            </div>

            <Button size="lg" className="w-full bg-success text-success-foreground hover-elevate active-elevate-2" data-testid="button-start-investing">
              Start Planning →
            </Button>
          </div>
        </Card>
      </div>
    </CalculatorLayout>
  );
}
