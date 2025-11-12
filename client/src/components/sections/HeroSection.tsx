import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import TrustBadge from "../TrustBadge";
import { Shield, Lock, ArrowRight, ArrowDown } from "lucide-react";
import heroImage from "@assets/generated_images/Hero_wealth_visualization_abstract_343b855d.png";
import { useCallback } from 'react';
import { useLocation } from 'wouter';

export default function HeroSection() {
  const [_, navigate] = useLocation();
  const [, setLocation] = useLocation();

  const scrollToHowItWorks = useCallback(() => {
    // First, navigate to the home page in case we're not there
    navigate('/');
    
    // Then scroll to the how-it-works section after a small delay to ensure the page is loaded
    setTimeout(() => {
      const element = document.getElementById('how-it-works');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  }, [navigate]);
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background via-background to-card min-h-[95vh] flex items-center">
      <div className="absolute inset-0 opacity-20">
        <img src={heroImage} alt="" className="w-full h-full object-cover" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/90 to-background/70" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <Badge 
            variant="secondary" 
            className="mb-6 text-sm px-4 py-2"
            data-testid="badge-launch-offer"
          >
            🎉 First 90 days free
          </Badge>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Invest in the life{" "}
            <span className="bg-gradient-to-r from-primary via-chart-2 to-chart-3 bg-clip-text text-transparent">
              you're building
            </span>
          </h1>
          
          <p className="text-lg sm:text-xl text-muted-foreground mb-4 leading-relaxed max-w-3xl mx-auto">
            Smart, multi-asset portfolios for ambitious wealth builders. Sophisticated strategies once exclusive are now automated, transparent, and built for you.
          </p>
          
          <p className="text-sm text-muted-foreground mb-8">
            Start with AED 500. Transparent pricing.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
            <TrustBadge icon={Shield} text="FSRA-regulated" testId="hero-trust-fsra" />
            <TrustBadge icon={Lock} text="SIPC-protected" testId="hero-trust-sipc" />
            <TrustBadge icon={ArrowRight} text="Withdraw anytime" testId="hero-trust-withdraw" />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" onClick={()=>{setLocation("/quiz")}} className="text-base px-8" data-testid="button-hero-primary">
              Build Your Wealth Plan →
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-base px-8"
              onClick={scrollToHowItWorks}
              data-testid="button-hero-secondary"
            >
              See How It Works <ArrowDown className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
