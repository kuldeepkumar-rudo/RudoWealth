import { Card } from "@/components/ui/card";

interface TeamCardProps {
  name: string;
  role: string;
  bio: string;
  imageSrc?: string;
  testId?: string;
}

export default function TeamCard({ name, role, bio, imageSrc, testId }: TeamCardProps) {
  return (
    <Card className="p-6 hover-elevate transition-all duration-300" data-testid={testId}>
      <div className="aspect-square rounded-lg bg-muted/50 mb-4 overflow-hidden">
        {imageSrc ? (
          <div className="relative w-full h-full flex items-center">
            <img 
              src={imageSrc} 
              alt={name} 
              className="w-[150%] h-auto object-cover"
              style={{ objectPosition: 'center 30%' }}
            />
          </div>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-4xl font-bold text-muted-foreground">
            {name.split(' ').map(n => n[0]).join('')}
          </div>
        )}
      </div>
      <h3 className="font-semibold text-lg mb-1">{name}</h3>
      <p className="text-sm text-primary mb-3">{role}</p>
      <p className="text-sm text-muted-foreground leading-relaxed">{bio}</p>
    </Card>
  );
}
