import { Link } from "wouter";
import { ChevronRight, Home, ArrowLeft, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { type CalculatorMetadata } from "@/features/calculators/registry";
import { type ContentSection } from "@/content/calculators/sip.content";
import { CalculatorSEO } from "./CalculatorSEO";

interface CalculatorLayoutProps {
  calculator: CalculatorMetadata;
  children: React.ReactNode;
  content: ContentSection[];
  prevCalculator?: CalculatorMetadata | null;
  nextCalculator?: CalculatorMetadata | null;
}

export function CalculatorLayout({
  calculator,
  children,
  content,
  prevCalculator,
  nextCalculator,
}: CalculatorLayoutProps) {
  return (
    <div className="min-h-screen">
      <CalculatorSEO calculator={calculator} />
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6" data-testid="breadcrumbs">
            <Link href="/">
              <span className="hover-elevate active-elevate-2 px-2 py-1 rounded-md inline-flex items-center gap-1">
                <Home className="h-3 w-3" />
                Home
              </span>
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link href="/calculators">
              <span className="hover-elevate active-elevate-2 px-2 py-1 rounded-md">
                Tools
              </span>
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground font-medium">{calculator.name}</span>
          </nav>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-lg ${calculator.iconBgClass}`}>
                <calculator.icon className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-3xl font-bold mb-2">{calculator.name}</h1>
                <p className="text-lg text-muted-foreground">{calculator.longDescription}</p>
              </div>
            </div>
            
            <Link href="/calculators">
              <Button variant="outline" size="sm" data-testid="button-back-to-calculators">
                <ArrowLeft className="h-4 w-4 mr-2" />
                All Calculators
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid lg:grid-cols-[1fr,380px] gap-8">
          <div className="space-y-8">
            <div data-testid="calculator-form">{children}</div>

            <div className="lg:hidden space-y-6">
              <h2 className="text-2xl font-bold">All You Need to Know</h2>
              {content.map((section) => (
                <Card key={section.id} className="p-6" data-testid={`content-section-${section.id}`}>
                  <h3 className="text-xl font-semibold mb-3">{section.title}</h3>
                  <div className="text-muted-foreground whitespace-pre-line leading-relaxed">
                    {section.content}
                  </div>
                </Card>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t">
              {prevCalculator && (
                <Link href={`/calculators/${prevCalculator.slug}`} className="flex-1">
                  <Button variant="outline" className="w-full justify-start" data-testid="button-prev-calculator">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    <div className="text-left">
                      <div className="text-xs text-muted-foreground">Previous</div>
                      <div className="font-medium">{prevCalculator.name}</div>
                    </div>
                  </Button>
                </Link>
              )}
              {nextCalculator && (
                <Link href={`/calculators/${nextCalculator.slug}`} className="flex-1">
                  <Button variant="outline" className="w-full justify-end" data-testid="button-next-calculator">
                    <div className="text-right">
                      <div className="text-xs text-muted-foreground">Next</div>
                      <div className="font-medium">{nextCalculator.name}</div>
                    </div>
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
              )}
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="sticky top-8">
              <Card className="p-6">
                <h2 className="text-xl font-bold mb-4">All You Need to Know</h2>
                <ScrollArea className="h-[calc(100vh-200px)]">
                  <nav className="space-y-1 pr-4">
                    {content.map((section) => (
                      <a
                        key={section.id}
                        href={`#${section.id}`}
                        className="block px-3 py-2 text-sm text-muted-foreground hover-elevate active-elevate-2 rounded-md"
                        data-testid={`nav-link-${section.id}`}
                      >
                        {section.title}
                      </a>
                    ))}
                  </nav>

                  <div className="mt-8 space-y-6">
                    {content.map((section) => (
                      <div key={section.id} id={section.id} data-testid={`content-section-${section.id}`}>
                        <h3 className="text-lg font-semibold mb-3">{section.title}</h3>
                        <div className="text-sm text-muted-foreground whitespace-pre-line leading-relaxed">
                          {section.content}
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
