interface StepCardProps {
  number: number;
  title: string;
  description: string;
  testId?: string;
}

export default function StepCard({ number, title, description, testId }: StepCardProps) {
  return (
    <div className="relative" data-testid={testId}>
      <div className="flex gap-4">
        <div className="flex-shrink-0">
          <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center font-mono font-bold text-primary-foreground">
            {number}
          </div>
        </div>
        <div>
          <h3 className="font-semibold text-lg mb-2">{title}</h3>
          <p className="text-muted-foreground leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  );
}
