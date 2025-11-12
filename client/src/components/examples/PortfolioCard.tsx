import PortfolioCard from '../PortfolioCard';

export default function PortfolioCardExample() {
  return (
    <div className="p-8 bg-background">
      <div className="max-w-sm">
        <PortfolioCard
          icon="🚀"
          title="Wealth Maximizer"
          strategy="Aggressive Growth"
          allocation="100% Equities"
          returns="10-14%*"
          risk="High"
          forGoal="Long-term wealth (10+ years)"
          testId="portfolio-card-maximizer"
        />
      </div>
    </div>
  );
}
