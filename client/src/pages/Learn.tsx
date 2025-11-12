import { Card } from "@/components/ui/card";
import { BookOpen, TrendingUp, Globe, Shield } from "lucide-react";

export default function Learn() {
  const topics = [
    {
      icon: BookOpen,
      title: "Investment Basics",
      description: "Understanding asset classes, risk, and diversification fundamentals for building wealth."
    },
    {
      icon: TrendingUp,
      title: "Portfolio Strategies",
      description: "Learn about different investment strategies and how to choose the right one for your goals."
    },
    {
      icon: Globe,
      title: "Cross-Border Investing",
      description: "Navigate the complexities of managing wealth across India and UAE markets."
    },
    {
      icon: Shield,
      title: "Risk Management",
      description: "Understand how to protect your wealth while pursuing growth opportunities."
    }
  ];

  return (
    <div>
      <section className="py-20 lg:py-32 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              Learn About{" "}
              <span className="bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent">
                Smart Investing
              </span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Build your financial knowledge with our comprehensive guides on wealth management and cross-border investing.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {topics.map((topic, index) => (
              <Card 
                key={index} 
                className="p-8 hover-elevate transition-all duration-300 cursor-pointer"
                data-testid={`learn-topic-${index}`}
              >
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <topic.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{topic.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{topic.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-32 bg-card">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Coming Soon</h2>
            <p className="text-muted-foreground">
              We're building a comprehensive learning center with articles, guides, and tools to help you make informed investment decisions.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
