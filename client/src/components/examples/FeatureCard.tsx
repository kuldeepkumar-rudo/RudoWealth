import FeatureCard from '../FeatureCard';
import { Globe } from 'lucide-react';

export default function FeatureCardExample() {
  return (
    <div className="p-8 bg-background">
      <div className="max-w-sm">
        <FeatureCard
          icon={Globe}
          title="Globally Diversified"
          description="Five portfolios. 1,000+ companies. Low-cost ETFs."
          testId="feature-card-global"
        />
      </div>
    </div>
  );
}
