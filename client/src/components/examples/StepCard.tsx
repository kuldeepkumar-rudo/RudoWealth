import StepCard from '../StepCard';

export default function StepCardExample() {
  return (
    <div className="p-8 bg-background">
      <div className="max-w-md">
        <StepCard
          number={1}
          title="Share your goals"
          description="Answer 8 questions. We recommend your portfolio."
          testId="step-card-1"
        />
      </div>
    </div>
  );
}
