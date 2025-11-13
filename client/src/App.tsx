import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";
import { HelmetProvider } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DigitalAdvisory from "@/pages/DigitalAdvisory";
import AboutUs from "@/pages/AboutUs";
import Learn from "@/pages/Learn";
import CalculatorsIndex from "@/pages/CalculatorsIndex";
import SIPCalculator from "@/pages/SIPCalculator";
import LumpsumCalculator from "@/pages/LumpsumCalculator";
import StepUpSIPCalculator from "@/pages/StepUpSIPCalculator";
import GoalPlanningCalculator from "@/pages/GoalPlanningCalculator";
import FIRECalculator from "@/pages/FIRECalculator";
import PPFCalculator from "@/pages/PPFCalculator";
import CurrencyImpactCalculator from "@/pages/CurrencyImpactCalculator";
import PrivateWealth from "@/pages/PrivateWealth";
import NotFound from "@/pages/not-found";
import Landing from "../src/components/quiz/Landing";
import { CurrencyProvider } from "@/lib/currency-context";
import Question1 from "./pages/question1";
import Question2 from "./pages/question2";
import Question3 from "./pages/question3";
import Question4 from "./pages/question4";
import Question5 from "./pages/question5";
import Question6 from "./pages/question6";
import Question7 from "./pages/question7";
import Question8 from "./pages/question8";
import Question9 from "./pages/question9";
import Question10 from "./pages/question10";
import Question11 from "./pages/question11";
import Question12 from "./pages/question12";
import Question13 from "./pages/question13";
import Question14 from "./pages/question14";
import Processing from "./pages/processing";
import Results from "./pages/results"; 
import { AssessmentProvider } from "@/lib/assessment-store";
import TransitionAB from "./pages/transition-ab";
import TransitionBC from "./pages/transition-bc";
import Disclaimer from "./pages/Disclaimer";

function Router() {
  return (
    <Switch>
      <Route path="/" component={DigitalAdvisory} />
      <Route path="/about" component={AboutUs} />
      <Route path="/learn" component={Learn} />
      <Route path="/calculators" component={CalculatorsIndex} />
      <Route path="/calculators/sip" component={SIPCalculator} />
      <Route path="/calculators/lumpsum" component={LumpsumCalculator} />
      <Route path="/calculators/step-up-sip" component={StepUpSIPCalculator} />
      <Route path="/calculators/goal-planning" component={GoalPlanningCalculator} />
      <Route path="/calculators/fire" component={FIRECalculator} />
      <Route path="/calculators/ppf" component={PPFCalculator} />
      <Route path="/calculators/currency-impact" component={CurrencyImpactCalculator} />
      <Route path="/private-wealth" component={PrivateWealth} />
      <Route path="/disclaimer" component={Disclaimer} />
      <Route path="/quiz" component={Landing} />
      <Route path="/assessment/1" component={Question1} />
      <Route path="/assessment/2" component={Question2} />
      <Route path="/assessment/3" component={Question3} />
      <Route path="/assessment/4" component={Question4} />
      <Route path="/assessment/5" component={Question5} />
      <Route path="/assessment/6" component={Question6} />
      <Route path="/assessment/7" component={Question7} />
      <Route path="/transition-ab" component={TransitionAB} />
      <Route path="/assessment/8" component={Question8} />
      <Route path="/assessment/9" component={Question9} />
      <Route path="/assessment/10" component={Question10} />
      <Route path="/assessment/11" component={Question11} />
      <Route path="/assessment/12" component={Question12} />
      <Route path="/assessment/13" component={Question13} />
      <Route path="/transition-bc" component={TransitionBC} />
      <Route path="/assessment/14" component={Question14} />
      <Route path="/processing" component={Processing} />
      <Route path="/results" component={Results} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <ThemeProvider>
          <CurrencyProvider>
          <AssessmentProvider>
          <TooltipProvider>
            <div className="min-h-screen flex flex-col bg-background">
              <Header />
              <main className="flex-1 pt-14">
                <Router />
              </main>
              <Footer />
            </div>
            <Toaster />
          </TooltipProvider>
          </AssessmentProvider>
          </CurrencyProvider>
        </ThemeProvider>
      </HelmetProvider>
    </QueryClientProvider>
  );
}

export default App;
