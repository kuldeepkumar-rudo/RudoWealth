import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TrendingUp, Target, PiggyBank, Zap, Sparkles, Coins, Globe } from "lucide-react";
import * as calc from "@/features/calculators/utils";

type Currency = "INR" | "USD" | "AED";

export default function Calculators() {
  const [currency, setCurrency] = useState<Currency>("INR");
  
  // SIP Calculator
  const [sipAmount, setSipAmount] = useState(5000);
  const [sipRate, setSipRate] = useState(12);
  const [sipYears, setSipYears] = useState(10);
  
  // Lumpsum Calculator
  const [lumpAmount, setLumpAmount] = useState(100000);
  const [lumpRate, setLumpRate] = useState(12);
  const [lumpYears, setLumpYears] = useState(10);

  // Step-Up SIP Calculator
  const [stepUpAmount, setStepUpAmount] = useState(5000);
  const [stepUpRate, setStepUpRate] = useState(12);
  const [stepUpYears, setStepUpYears] = useState(10);
  const [stepUpIncrement, setStepUpIncrement] = useState(10);

  // Goal Planning Calculator
  const [goalAmount, setGoalAmount] = useState(5000000);
  const [goalYears, setGoalYears] = useState(10);
  const [goalRate, setGoalRate] = useState(12);
  const [currentSavings, setCurrentSavings] = useState(0);

  // FIRE Calculator
  const [currentAge, setCurrentAge] = useState(30);
  const [retirementAge, setRetirementAge] = useState(45);
  const [monthlyExpenses, setMonthlyExpenses] = useState(50000);
  const [currentCorpus, setCurrentCorpus] = useState(0);
  const [fireRate, setFireRate] = useState(12);

  // PPF Calculator
  const [ppfAmount, setPpfAmount] = useState(150000);
  const [ppfYears, setPpfYears] = useState(15);
  const [ppfRate] = useState(7.1);

  // Currency Impact Calculator
  const [currencyMonthly, setCurrencyMonthly] = useState(1000);
  const [currencyYears, setCurrencyYears] = useState(10);
  const [currencyRate, setCurrencyRate] = useState(12);
  const [exchangeRateNow, setExchangeRateNow] = useState(83);
  const [exchangeRateFuture, setExchangeRateFuture] = useState(90);

  // Calculation results
  const sipResults = calc.calculateSIP(sipAmount, sipRate, sipYears);
  const lumpResults = calc.calculateLumpsum(lumpAmount, lumpRate, lumpYears);
  const stepUpResults = calc.calculateStepUpSIP(stepUpAmount, stepUpRate, stepUpYears, stepUpIncrement);
  const goalResults = calc.calculateGoalPlanning(goalAmount, goalYears, goalRate, currentSavings);
  const fireResults = calc.calculateFIRE(currentAge, retirementAge, monthlyExpenses, currentCorpus, fireRate);
  const ppfResults = calc.calculatePPF(ppfAmount, ppfYears, ppfRate);
  const currencyResults = calc.calculateCurrencyImpact(currencyMonthly, currencyYears, currencyRate, exchangeRateNow, exchangeRateFuture);

  const formatCurrency = (amount: number) => calc.formatCurrency(amount, currency);
  const currencySymbol = calc.currencySymbols[currency];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
            <span>Home</span>
            <span>›</span>
            <span>Tools</span>
            <span>›</span>
            <span className="text-foreground">Investment Calculator</span>
          </div>
          <h1 className="text-4xl font-bold mb-3">Investment Calculator</h1>
          <p className="text-lg text-muted-foreground">Plan your wealth journey with precision</p>
        </div>

        <Tabs defaultValue="sip" className="w-full">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <ScrollArea className="w-full sm:flex-1">
              <TabsList data-testid="tabs-calculator">
                <TabsTrigger value="sip" data-testid="tab-sip">SIP</TabsTrigger>
                <TabsTrigger value="lumpsum" data-testid="tab-lumpsum">Lumpsum</TabsTrigger>
                <TabsTrigger value="stepup" data-testid="tab-stepup"><Zap className="h-3 w-3 mr-1" />Step-Up</TabsTrigger>
                <TabsTrigger value="goal" data-testid="tab-goal"><Target className="h-3 w-3 mr-1" />Goal</TabsTrigger>
                <TabsTrigger value="fire" data-testid="tab-fire"><Sparkles className="h-3 w-3 mr-1" />FIRE</TabsTrigger>
                <TabsTrigger value="ppf" data-testid="tab-ppf"><Coins className="h-3 w-3 mr-1" />PPF</TabsTrigger>
                <TabsTrigger value="currency" data-testid="tab-currency"><Globe className="h-3 w-3 mr-1" />FX Impact</TabsTrigger>
              </TabsList>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
            
            <Select value={currency} onValueChange={(value) => setCurrency(value as Currency)}>
              <SelectTrigger className="w-full sm:w-32" data-testid="select-currency">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="INR" data-testid="currency-inr">₹ INR</SelectItem>
                <SelectItem value="USD" data-testid="currency-usd">$ USD</SelectItem>
                <SelectItem value="AED" data-testid="currency-aed">د.إ AED</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <TabsContent value="sip">
            <div className="grid lg:grid-cols-2 gap-8">
              <Card className="p-8">
                <h2 className="text-xl font-semibold mb-6">Investment Details</h2>
                
                <div className="space-y-8">
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <label className="text-sm font-medium">Monthly Investment</label>
                      <div className="px-3 py-1.5 rounded-md bg-muted border border-border">
                        <span className="text-sm font-mono font-semibold text-foreground">
                          {formatCurrency(sipAmount)}
                        </span>
                      </div>
                    </div>
                    <Slider
                      value={[sipAmount]}
                      onValueChange={(val) => setSipAmount(val[0])}
                      min={1000}
                      max={100000}
                      step={500}
                      data-testid="slider-sip-amount"
                    />
                    <div className="flex flex-wrap gap-2 mt-3">
                      {[1000, 5000, 10000, 25000, 50000].map((amount) => (
                        <button
                          key={amount}
                          onClick={() => setSipAmount(amount)}
                          className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                            sipAmount === amount
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-muted text-muted-foreground hover-elevate'
                          }`}
                          data-testid={`quick-select-sip-${amount}`}
                        >
                          {formatCurrency(amount)}
                        </button>
                      ))}
                    </div>
                    <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                      <span>{currencySymbol}1K</span>
                      <span>{currencySymbol}100K</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <label className="text-sm font-medium">Expected Return (p.a.)</label>
                      <div className="px-3 py-1.5 rounded-md bg-muted border border-border">
                        <span className="text-sm font-mono font-semibold text-foreground">{sipRate}%</span>
                      </div>
                    </div>
                    <Slider
                      value={[sipRate]}
                      onValueChange={(val) => setSipRate(val[0])}
                      min={5}
                      max={30}
                      step={0.5}
                      data-testid="slider-sip-rate"
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
                        <span className="text-sm font-mono font-semibold text-foreground">{sipYears} Years</span>
                      </div>
                    </div>
                    <Slider
                      value={[sipYears]}
                      onValueChange={(val) => setSipYears(val[0])}
                      min={1}
                      max={30}
                      step={1}
                      data-testid="slider-sip-years"
                    />
                    <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                      <span>1Y</span>
                      <span>10Y</span>
                      <span>20Y</span>
                      <span>30Y</span>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-8">
                <h2 className="text-xl font-semibold mb-6">Results</h2>
                
                <div className="space-y-6">
                  <div>
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="text-3xl font-bold font-mono text-primary" data-testid="text-sip-future-value">
                        {formatCurrency(sipResults.futureValue)}
                      </span>
                      <Badge variant="secondary" className="text-xs">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        +{sipResults.totalGrowth}%
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      CAGR: {sipResults.cagr}% | Monthly growth: {formatCurrency(sipResults.monthlyGrowth)}
                    </p>
                  </div>

                  <div className="relative h-6 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="absolute inset-y-0 left-0 bg-primary/30 transition-all"
                      style={{ width: `${sipResults.investedPercent}%` }}
                    />
                    <div 
                      className="absolute inset-y-0 right-0 bg-primary transition-all"
                      style={{ width: `${sipResults.returnsPercent}%` }}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg bg-muted/50">
                      <div className="flex items-center gap-2 mb-2">
                        <PiggyBank className="h-4 w-4 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">Total Invested</span>
                      </div>
                      <p className="text-xl font-bold font-mono" data-testid="text-sip-invested">
                        {formatCurrency(sipResults.invested)}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {sipResults.investedPercent}% of total
                      </p>
                    </div>

                    <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                      <div className="flex items-center gap-2 mb-2">
                        <Target className="h-4 w-4 text-primary" />
                        <span className="text-xs text-muted-foreground">Estimated Returns</span>
                      </div>
                      <p className="text-xl font-bold font-mono text-primary" data-testid="text-sip-returns">
                        {formatCurrency(sipResults.returns)}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {sipResults.returnsPercent}% of total
                      </p>
                    </div>
                  </div>

                  <Button size="lg" className="w-full" data-testid="button-start-investing">
                    Start Investing →
                  </Button>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="lumpsum">
            <div className="grid lg:grid-cols-2 gap-8">
              <Card className="p-8">
                <h2 className="text-xl font-semibold mb-6">Investment Details</h2>
                
                <div className="space-y-8">
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <label className="text-sm font-medium">Investment Amount</label>
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
                      data-testid="slider-lump-amount"
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
                          data-testid={`quick-select-lump-${amount}`}
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
                      data-testid="slider-lump-rate"
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
                      data-testid="slider-lump-years"
                    />
                    <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                      <span>1Y</span>
                      <span>10Y</span>
                      <span>20Y</span>
                      <span>30Y</span>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-8">
                <h2 className="text-xl font-semibold mb-6">Results</h2>
                
                <div className="space-y-6">
                  <div>
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="text-3xl font-bold font-mono text-primary" data-testid="text-lump-future-value">
                        {formatCurrency(lumpResults.futureValue)}
                      </span>
                      <Badge variant="secondary" className="text-xs">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        +{lumpResults.totalGrowth}%
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      CAGR: {lumpResults.cagr}%
                    </p>
                  </div>

                  <div className="relative h-6 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="absolute inset-y-0 left-0 bg-primary/30 transition-all"
                      style={{ width: `${lumpResults.investedPercent}%` }}
                    />
                    <div 
                      className="absolute inset-y-0 right-0 bg-primary transition-all"
                      style={{ width: `${lumpResults.returnsPercent}%` }}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg bg-muted/50">
                      <div className="flex items-center gap-2 mb-2">
                        <PiggyBank className="h-4 w-4 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">Total Invested</span>
                      </div>
                      <p className="text-xl font-bold font-mono" data-testid="text-lump-invested">
                        {formatCurrency(lumpResults.invested)}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {lumpResults.investedPercent}% of total
                      </p>
                    </div>

                    <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                      <div className="flex items-center gap-2 mb-2">
                        <Target className="h-4 w-4 text-primary" />
                        <span className="text-xs text-muted-foreground">Estimated Returns</span>
                      </div>
                      <p className="text-xl font-bold font-mono text-primary" data-testid="text-lump-returns">
                        {formatCurrency(lumpResults.returns)}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {lumpResults.returnsPercent}% of total
                      </p>
                    </div>
                  </div>

                  <Button size="lg" className="w-full" data-testid="button-start-investing-lump">
                    Start Investing →
                  </Button>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="stepup">
            <div className="grid lg:grid-cols-2 gap-8">
              <Card className="p-8">
                <h2 className="text-xl font-semibold mb-6">Investment Details</h2>
                
                <div className="space-y-8">
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <label className="text-sm font-medium">Initial Monthly SIP</label>
                      <div className="px-3 py-1.5 rounded-md bg-muted border border-border">
                        <span className="text-sm font-mono font-semibold text-foreground">
                          {formatCurrency(stepUpAmount)}
                        </span>
                      </div>
                    </div>
                    <Slider
                      value={[stepUpAmount]}
                      onValueChange={(val) => setStepUpAmount(val[0])}
                      min={1000}
                      max={100000}
                      step={500}
                      data-testid="slider-stepup-amount"
                    />
                    <div className="flex flex-wrap gap-2 mt-3">
                      {[1000, 5000, 10000, 25000, 50000].map((amount) => (
                        <button
                          key={amount}
                          onClick={() => setStepUpAmount(amount)}
                          className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                            stepUpAmount === amount
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-muted text-muted-foreground hover-elevate'
                          }`}
                          data-testid={`quick-select-stepup-${amount}`}
                        >
                          {formatCurrency(amount)}
                        </button>
                      ))}
                    </div>
                    <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                      <span>{currencySymbol}1K</span>
                      <span>{currencySymbol}100K</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <label className="text-sm font-medium">Expected Return (p.a.)</label>
                      <div className="px-3 py-1.5 rounded-md bg-muted border border-border">
                        <span className="text-sm font-mono font-semibold text-foreground">{stepUpRate}%</span>
                      </div>
                    </div>
                    <Slider
                      value={[stepUpRate]}
                      onValueChange={(val) => setStepUpRate(val[0])}
                      min={5}
                      max={30}
                      step={0.5}
                      data-testid="slider-stepup-rate"
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
                        <span className="text-sm font-mono font-semibold text-foreground">{stepUpYears} Years</span>
                      </div>
                    </div>
                    <Slider
                      value={[stepUpYears]}
                      onValueChange={(val) => setStepUpYears(val[0])}
                      min={1}
                      max={30}
                      step={1}
                      data-testid="slider-stepup-years"
                    />
                    <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                      <span>1Y</span>
                      <span>10Y</span>
                      <span>20Y</span>
                      <span>30Y</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <label className="text-sm font-medium">Annual Increment %</label>
                      <div className="px-3 py-1.5 rounded-md bg-muted border border-border">
                        <span className="text-sm font-mono font-semibold text-foreground">{stepUpIncrement}%</span>
                      </div>
                    </div>
                    <Slider
                      value={[stepUpIncrement]}
                      onValueChange={(val) => setStepUpIncrement(val[0])}
                      min={5}
                      max={20}
                      step={1}
                      data-testid="slider-stepup-increment"
                    />
                    <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                      <span>5%</span>
                      <span>10%</span>
                      <span>15%</span>
                      <span>20%</span>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-8">
                <h2 className="text-xl font-semibold mb-6">Results</h2>
                
                <div className="space-y-6">
                  <div>
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="text-3xl font-bold font-mono text-primary" data-testid="text-stepup-future-value">
                        {formatCurrency(stepUpResults.futureValue)}
                      </span>
                      <Badge variant="secondary" className="text-xs">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        +{stepUpResults.totalGrowth}%
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      CAGR: {stepUpResults.cagr}%
                    </p>
                  </div>

                  <div className="relative h-6 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="absolute inset-y-0 left-0 bg-primary/30 transition-all"
                      style={{ width: `${stepUpResults.investedPercent}%` }}
                    />
                    <div 
                      className="absolute inset-y-0 right-0 bg-primary transition-all"
                      style={{ width: `${stepUpResults.returnsPercent}%` }}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg bg-muted/50">
                      <div className="flex items-center gap-2 mb-2">
                        <PiggyBank className="h-4 w-4 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">Total Invested</span>
                      </div>
                      <p className="text-xl font-bold font-mono" data-testid="text-stepup-invested">
                        {formatCurrency(stepUpResults.invested)}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {stepUpResults.investedPercent}% of total
                      </p>
                    </div>

                    <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                      <div className="flex items-center gap-2 mb-2">
                        <Target className="h-4 w-4 text-primary" />
                        <span className="text-xs text-muted-foreground">Estimated Returns</span>
                      </div>
                      <p className="text-xl font-bold font-mono text-primary" data-testid="text-stepup-returns">
                        {formatCurrency(stepUpResults.returns)}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {stepUpResults.returnsPercent}% of total
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg bg-accent/10 border border-accent/30">
                    <div className="flex items-center gap-2 mb-2">
                      <Zap className="h-4 w-4 text-accent-foreground" />
                      <span className="text-xs font-semibold">vs Normal SIP</span>
                    </div>
                    <p className="text-2xl font-bold font-mono text-accent-foreground" data-testid="text-stepup-vs-normal">
                      +{formatCurrency(stepUpResults.vsNormalSIP)}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {stepUpResults.vsNormalSIPPercent}% more than regular SIP
                    </p>
                  </div>

                  <Button size="lg" className="w-full" data-testid="button-start-investing-stepup">
                    Start Step-Up SIP →
                  </Button>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="goal">
            <div className="grid lg:grid-cols-2 gap-8">
              <Card className="p-8">
                <h2 className="text-xl font-semibold mb-6">Goal Details</h2>
                
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
                      <label className="text-sm font-medium">Time Horizon (Years)</label>
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
                      <span>1Y</span>
                      <span>10Y</span>
                      <span>20Y</span>
                      <span>30Y</span>
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
                      data-testid="slider-goal-savings"
                    />
                    <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                      <span>{currencySymbol}0</span>
                      <span>{currencySymbol}10Cr</span>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-8">
                <h2 className="text-xl font-semibold mb-6">Results</h2>
                
                <div className="space-y-6">
                  {goalResults.requiredMonthlySIP === 0 ? (
                    <div className="p-6 rounded-lg bg-primary/10 border border-primary/30">
                      <div className="flex items-center gap-3 mb-2">
                        <Target className="h-6 w-6 text-primary" />
                        <span className="text-2xl font-bold text-primary">Goal already achievable!</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Your current savings will grow to exceed your goal amount by the target date.
                      </p>
                    </div>
                  ) : (
                    <>
                      <div>
                        <div className="flex items-baseline gap-2 mb-1">
                          <span className="text-3xl font-bold font-mono text-primary" data-testid="text-goal-monthly-sip">
                            {formatCurrency(goalResults.requiredMonthlySIP)}
                          </span>
                          <span className="text-sm text-muted-foreground">/month</span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Required Monthly SIP
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 rounded-lg bg-muted/50">
                          <div className="flex items-center gap-2 mb-2">
                            <PiggyBank className="h-4 w-4 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">Total Investment</span>
                          </div>
                          <p className="text-xl font-bold font-mono" data-testid="text-goal-total-investment">
                            {formatCurrency(goalResults.totalInvestment)}
                          </p>
                        </div>

                        <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                          <div className="flex items-center gap-2 mb-2">
                            <Target className="h-4 w-4 text-primary" />
                            <span className="text-xs text-muted-foreground">Savings Growth</span>
                          </div>
                          <p className="text-xl font-bold font-mono text-primary" data-testid="text-goal-savings-value">
                            {formatCurrency(goalResults.futureValueOfSavings)}
                          </p>
                        </div>
                      </div>

                      <div className="p-4 rounded-lg bg-accent/10 border border-accent/30">
                        <div className="flex items-center gap-2 mb-2">
                          <Zap className="h-4 w-4 text-accent-foreground" />
                          <span className="text-xs font-semibold">Additional Required</span>
                        </div>
                        <p className="text-2xl font-bold font-mono text-accent-foreground" data-testid="text-goal-additional">
                          {formatCurrency(goalResults.additionalRequired)}
                        </p>
                      </div>
                    </>
                  )}

                  <Button size="lg" className="w-full" data-testid="button-start-investing-goal">
                    Start Goal Planning →
                  </Button>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="fire">
            <div className="grid lg:grid-cols-2 gap-8">
              <Card className="p-8">
                <h2 className="text-xl font-semibold mb-6">FIRE Planning</h2>
                
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
                      data-testid="slider-fire-current-age"
                    />
                    <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                      <span>20</span>
                      <span>40</span>
                      <span>60</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <label className="text-sm font-medium">Retirement Age</label>
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
                      data-testid="slider-fire-retirement-age"
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
                      data-testid="slider-fire-expenses"
                    />
                    <div className="flex flex-wrap gap-2 mt-3">
                      {[25000, 50000, 75000, 100000, 150000].map((amount) => (
                        <button
                          key={amount}
                          onClick={() => setMonthlyExpenses(amount)}
                          className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                            monthlyExpenses === amount
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-muted text-muted-foreground hover-elevate'
                          }`}
                          data-testid={`quick-select-fire-expenses-${amount}`}
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
                      data-testid="slider-fire-corpus"
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
                <h2 className="text-xl font-semibold mb-6">Results</h2>
                
                <div className="space-y-6">
                  <div className="p-6 rounded-lg bg-primary/10 border border-primary/30">
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles className="h-5 w-5 text-primary" />
                      <span className="text-xs font-semibold text-primary">FIRE Number = 25x Annual Expenses</span>
                    </div>
                    <p className="text-3xl font-bold font-mono text-primary" data-testid="text-fire-number">
                      {formatCurrency(fireResults.fireNumber)}
                    </p>
                  </div>

                  <div>
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="text-3xl font-bold font-mono text-foreground" data-testid="text-fire-monthly-sip">
                        {formatCurrency(fireResults.requiredMonthlySIP)}
                      </span>
                      <span className="text-sm text-muted-foreground">/month</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Required Monthly SIP
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg bg-muted/50">
                      <div className="flex items-center gap-2 mb-2">
                        <Target className="h-4 w-4 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">Years to FIRE</span>
                      </div>
                      <p className="text-xl font-bold font-mono" data-testid="text-fire-years">
                        {fireResults.yearsToFIRE}
                      </p>
                    </div>

                    <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                      <div className="flex items-center gap-2 mb-2">
                        <PiggyBank className="h-4 w-4 text-primary" />
                        <span className="text-xs text-muted-foreground">Total Investment</span>
                      </div>
                      <p className="text-xl font-bold font-mono text-primary" data-testid="text-fire-total-investment">
                        {formatCurrency(fireResults.totalInvestment)}
                      </p>
                    </div>
                  </div>

                  <Button size="lg" className="w-full" data-testid="button-start-investing-fire">
                    Start FIRE Journey →
                  </Button>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="ppf">
            <div className="grid lg:grid-cols-2 gap-8">
              <Card className="p-8">
                <h2 className="text-xl font-semibold mb-6">Investment Details</h2>
                
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
                      <span>{currencySymbol}150K</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <label className="text-sm font-medium">Investment Duration</label>
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
                      <span>1Y</span>
                      <span>5Y</span>
                      <span>10Y</span>
                      <span>15Y</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <label className="text-sm font-medium">Interest Rate (Fixed)</label>
                      <div className="px-3 py-1.5 rounded-md bg-muted border border-border">
                        <span className="text-sm font-mono font-semibold text-foreground">{ppfRate}%</span>
                      </div>
                    </div>
                    <div className="p-4 rounded-lg bg-muted/50">
                      <p className="text-xs text-muted-foreground">
                        PPF interest rate is fixed by the government and cannot be changed. Current rate: {ppfRate}% p.a.
                      </p>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-8">
                <h2 className="text-xl font-semibold mb-6">Results</h2>
                
                <div className="space-y-6">
                  <div>
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="text-3xl font-bold font-mono text-primary" data-testid="text-ppf-maturity">
                        {formatCurrency(ppfResults.maturityAmount)}
                      </span>
                      <Badge variant="secondary" className="text-xs">
                        <Sparkles className="h-3 w-3 mr-1" />
                        Tax-Free Returns
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Maturity Amount
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg bg-muted/50">
                      <div className="flex items-center gap-2 mb-2">
                        <PiggyBank className="h-4 w-4 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">Total Invested</span>
                      </div>
                      <p className="text-xl font-bold font-mono" data-testid="text-ppf-invested">
                        {formatCurrency(ppfResults.totalInvested)}
                      </p>
                    </div>

                    <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                      <div className="flex items-center gap-2 mb-2">
                        <Target className="h-4 w-4 text-primary" />
                        <span className="text-xs text-muted-foreground">Tax-Free Returns</span>
                      </div>
                      <p className="text-xl font-bold font-mono text-primary" data-testid="text-ppf-returns">
                        {formatCurrency(ppfResults.returns)}
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg bg-accent/10 border border-accent/30">
                    <div className="flex items-center gap-2 mb-2">
                      <Coins className="h-4 w-4 text-accent-foreground" />
                      <span className="text-xs font-semibold">Effective Rate</span>
                    </div>
                    <p className="text-2xl font-bold font-mono text-accent-foreground" data-testid="text-ppf-rate">
                      {ppfResults.effectiveRate}%
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Compounded annually
                    </p>
                  </div>

                  <Button size="lg" className="w-full" data-testid="button-start-investing-ppf">
                    Start PPF Investment →
                  </Button>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="currency">
            <div className="grid lg:grid-cols-2 gap-8">
              <Card className="p-8">
                <h2 className="text-xl font-semibold mb-6">Investment Details</h2>
                
                <div className="space-y-8">
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <label className="text-sm font-medium">Monthly Investment (USD/AED)</label>
                      <div className="px-3 py-1.5 rounded-md bg-muted border border-border">
                        <span className="text-sm font-mono font-semibold text-foreground">
                          ${currencyMonthly}
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
                          ${amount}
                        </button>
                      ))}
                    </div>
                    <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                      <span>$100</span>
                      <span>$10K</span>
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
                      <span>1Y</span>
                      <span>10Y</span>
                      <span>20Y</span>
                      <span>30Y</span>
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
                      <label className="text-sm font-medium">Exchange Rate Now (₹)</label>
                      <div className="px-3 py-1.5 rounded-md bg-muted border border-border">
                        <span className="text-sm font-mono font-semibold text-foreground">₹{exchangeRateNow}</span>
                      </div>
                    </div>
                    <Slider
                      value={[exchangeRateNow]}
                      onValueChange={(val) => setExchangeRateNow(val[0])}
                      min={50}
                      max={100}
                      step={1}
                      data-testid="slider-currency-rate-now"
                    />
                    <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                      <span>₹50</span>
                      <span>₹75</span>
                      <span>₹100</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <label className="text-sm font-medium">Exchange Rate Future (₹)</label>
                      <div className="px-3 py-1.5 rounded-md bg-muted border border-border">
                        <span className="text-sm font-mono font-semibold text-foreground">₹{exchangeRateFuture}</span>
                      </div>
                    </div>
                    <Slider
                      value={[exchangeRateFuture]}
                      onValueChange={(val) => setExchangeRateFuture(val[0])}
                      min={50}
                      max={150}
                      step={1}
                      data-testid="slider-currency-rate-future"
                    />
                    <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                      <span>₹50</span>
                      <span>₹100</span>
                      <span>₹150</span>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-8">
                <h2 className="text-xl font-semibold mb-6">Results</h2>
                
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                      <div className="flex items-center gap-2 mb-2">
                        <Globe className="h-4 w-4 text-primary" />
                        <span className="text-xs text-muted-foreground">Future Value (INR)</span>
                      </div>
                      <p className="text-xl font-bold font-mono text-primary" data-testid="text-currency-value-inr">
                        ₹{formatCurrency(currencyResults.futureValueINR)}
                      </p>
                    </div>

                    <div className="p-4 rounded-lg bg-muted/50">
                      <div className="flex items-center gap-2 mb-2">
                        <Globe className="h-4 w-4 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">Future Value (USD)</span>
                      </div>
                      <p className="text-xl font-bold font-mono" data-testid="text-currency-value-usd">
                        ${currencyResults.futureValueUSD.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg bg-accent/10 border border-accent/30">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="h-4 w-4 text-accent-foreground" />
                        <span className="text-xs text-muted-foreground">Exchange Rate Gain</span>
                      </div>
                      <p className="text-2xl font-bold font-mono text-accent-foreground" data-testid="text-currency-fx-gain">
                        {currencyResults.exchangeRateGain}%
                      </p>
                    </div>

                    <div className="p-4 rounded-lg bg-primary/10 border border-primary/30">
                      <div className="flex items-center gap-2 mb-2">
                        <Target className="h-4 w-4 text-primary" />
                        <span className="text-xs text-muted-foreground">Effective Return</span>
                      </div>
                      <p className="text-2xl font-bold font-mono text-primary" data-testid="text-currency-effective-return">
                        {currencyResults.effectiveReturn}%
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-2 mb-2">
                      <PiggyBank className="h-4 w-4 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">Total Invested (USD)</span>
                    </div>
                    <p className="text-xl font-bold font-mono" data-testid="text-currency-invested-usd">
                      ${currencyResults.totalInvestedUSD.toLocaleString()}
                    </p>
                  </div>

                  <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles className="h-4 w-4 text-primary" />
                      <span className="text-xs text-muted-foreground">Returns (USD)</span>
                    </div>
                    <p className="text-xl font-bold font-mono text-primary" data-testid="text-currency-returns-usd">
                      ${currencyResults.returnsUSD.toLocaleString()}
                    </p>
                  </div>

                  <Button size="lg" className="w-full" data-testid="button-start-investing-currency">
                    Start Investing →
                  </Button>
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
