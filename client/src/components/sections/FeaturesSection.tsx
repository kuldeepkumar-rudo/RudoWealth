import FeatureCard from "../FeatureCard";
import { Globe, Building2, Shield, Scale } from "lucide-react";

export default function FeaturesSection() {
  const features = [
    {
      icon: Globe,
      title: "Globally Diversified",
      description: "Five portfolios. 1,000+ companies. Low-cost ETFs."
    },
    {
      icon: Building2,
      title: "FSRA Regulated",
      description: "Licensed in ADGM. Institutional-grade oversight."
    },
    {
      icon: Shield,
      title: "SIPC Protected",
      description: "US government-backed security up to USD 500K."
    },
    {
      icon: Scale,
      title: "Transparent Pricing",
      description: "One flat annual fee. No commissions. No hidden costs."
    }
  ];

  return (
    <section className="py-20 lg:py-32 bg-card">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              testId={`feature-${index}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
