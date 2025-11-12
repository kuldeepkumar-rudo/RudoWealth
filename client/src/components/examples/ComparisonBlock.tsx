import ComparisonBlock from '../ComparisonBlock';

export default function ComparisonBlockExample() {
  return (
    <div className="p-8 bg-background">
      <div className="max-w-4xl">
        <ComparisonBlock
          oldWay="Market drops trigger panic. You sell low, buy high, lose money."
          newWay="We rebalance automatically. You stay on track, stress-free."
          testId="comparison-rebalancing"
        />
      </div>
    </div>
  );
}
