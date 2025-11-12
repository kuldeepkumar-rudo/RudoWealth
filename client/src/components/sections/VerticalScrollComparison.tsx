import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { X, Check } from "lucide-react";

interface ComparisonItem {
  number: string;
  title: string;
  oldWay: {
    title: string;
    description: string;
  };
  newWay: {
    title: string;
    description: string;
  };
}

const comparisons: ComparisonItem[] = [
  {
    number: "01",
    title: "Market Panic",
    oldWay: {
      title: "Fear-Driven Reactions",
      description: "Market drops trigger panic. You sell low, buy high, lose money."
    },
    newWay: {
      title: "Expert-Led Decisions",
      description: "We rebalance automatically. You stay on track, stress-free."
    }
  },
  {
    number: "02",
    title: "DIY Complexity",
    oldWay: {
      title: "Endless Research",
      description: "DIY means endless research, platform juggling, constant doubt."
    },
    newWay: {
      title: "Professional Management",
      description: "We handle everything. Professional management, transparent pricing."
    }
  },
  {
    number: "03",
    title: "Hidden Costs",
    oldWay: {
      title: "High Fees",
      description: "Traditional advisors charge 1.5-2% annually. Hidden fees eat returns."
    },
    newWay: {
      title: "Transparent Pricing",
      description: "Flat annual fee. No surprises. Ever."
    }
  },
  {
    number: "04",
    title: "Social Media Noise",
    oldWay: {
      title: "FOMO & Hot Tips",
      description: "Social media creates FOMO. Hot tips lead to mistakes."
    },
    newWay: {
      title: "Data-Driven Strategy",
      description: "Data-driven portfolios built on decades of research."
    }
  }
];

export default function VerticalScrollComparison() {
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sectionRefs.current.forEach((section, index) => {
      if (!section) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveIndex(index);
            }
          });
        },
        {
          threshold: 0.5,
          rootMargin: "-20% 0px -20% 0px"
        }
      );

      observer.observe(section);
      observers.push(observer);
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  return (
    <section className="relative py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              How RuDo does things{" "}
              <span className="text-primary">
                differently
              </span>
            </h2>
          </div>

          <div className="relative space-y-20">
            {/* Connecting line */}
            <div className="absolute left-7 top-0 bottom-0 w-0.5 bg-border/30" 
                 style={{ transform: 'translateX(-50%)' }} />
            
            {comparisons.map((comparison, index) => (
              <div
                key={index}
                ref={(el) => (sectionRefs.current[index] = el)}
                className="relative py-12"
                data-testid={`vertical-comparison-${index}`}
              >
                <div className="w-full">
                  <div className="flex items-center gap-6 mb-8">
                    <div className="flex-shrink-0 relative z-10">
                      <div className={`
                        h-14 w-14 rounded-full flex items-center justify-center
                        font-mono font-bold text-xl transition-all duration-700
                        border-4 border-background
                        ${activeIndex !== null && activeIndex >= index 
                          ? 'bg-primary text-primary-foreground scale-110 shadow-lg shadow-primary/20' 
                          : 'bg-muted text-muted-foreground scale-100'
                        }
                      `}>
                        {comparison.number}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className={`
                        text-2xl font-bold transition-all duration-700
                        ${activeIndex !== null && activeIndex >= index ? 'text-primary opacity-100 translate-x-0' : 'opacity-60 translate-x-4'}
                      `}>
                        {comparison.title}
                      </h3>
                    </div>
                  </div>

                  <div className="grid lg:grid-cols-2 gap-6 items-start pl-20">
                    <Card className={`
                      p-6 bg-card/50 backdrop-blur-sm border
                      transition-all duration-700 transform
                      ${activeIndex !== null && activeIndex >= index 
                        ? 'opacity-100 translate-y-0 translate-x-0 border-destructive/30 bg-destructive/5' 
                        : 'opacity-50 translate-y-4 -translate-x-2 border-border'
                      }
                    `}>
                      <div className="flex items-start gap-3">
                        <div className="h-10 w-10 rounded-full bg-destructive/20 flex items-center justify-center flex-shrink-0">
                          <X className="h-5 w-5 text-destructive" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-base mb-1.5 text-foreground">{comparison.oldWay.title}</h4>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {comparison.oldWay.description}
                          </p>
                        </div>
                      </div>
                    </Card>

                    <div className="relative">
                      <div className={`
                        absolute left-1/2 -translate-x-1/2 -top-4 z-10
                        transition-all duration-700
                        ${activeIndex !== null && activeIndex >= index ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-50 rotate-45'}
                      `}>
                        <div className="bg-background border border-border rounded-full px-5 py-1.5 font-bold text-xs shadow-lg">
                          VS
                        </div>
                      </div>

                      <Card className={`
                        p-6 bg-card/50 backdrop-blur-sm border
                        transition-all duration-700 transform
                        ${activeIndex !== null && activeIndex >= index 
                          ? 'opacity-100 translate-y-0 translate-x-0 border-primary/30 bg-primary/5 shadow-lg shadow-primary/5' 
                          : 'opacity-50 translate-y-4 translate-x-2 border-border'
                        }
                      `}>
                        <div className="flex items-start gap-3">
                          <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                            <Check className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-base mb-1.5 text-foreground">{comparison.newWay.title}</h4>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                              {comparison.newWay.description}
                            </p>
                          </div>
                        </div>
                      </Card>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
