import ComparisonBlock from "../ComparisonBlock";

export default function ComparisonSection() {
  const comparisons = [
    {
      oldWay: "Market drops trigger panic. You sell low, buy high, lose money.",
      newWay: "We rebalance automatically. You stay on track, stress-free."
    },
    {
      oldWay: "DIY means endless research, platform juggling, constant doubt.",
      newWay: "We handle everything. Professional management, transparent pricing."
    },
    {
      oldWay: "Traditional advisors charge 1.5-2% annually. Hidden fees eat returns.",
      newWay: "Flat annual fee. No surprises. Ever."
    },
    {
      oldWay: "Social media creates FOMO. Hot tips lead to mistakes.",
      newWay: "Data-driven portfolios built on decades of research."
    }
  ];

  return (
    <section className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto space-y-8">
          {comparisons.map((comparison, index) => (
            <ComparisonBlock
              key={index}
              oldWay={comparison.oldWay}
              newWay={comparison.newWay}
              testId={`comparison-${index}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
