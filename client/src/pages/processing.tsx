import { useEffect } from "react";
import { useLocation } from "wouter";
import { Loader2 } from "lucide-react";

export default function Processing() {
  const [, setLocation] = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLocation("/results");
    }, 2500);

    return () => clearTimeout(timer);
  }, [setLocation]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="text-center space-y-8">
        <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto" />
        
        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-foreground">
            Analyzing Your Profile
          </h2>
          
          <div className="flex items-center justify-center gap-1">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-2 h-2 rounded-full bg-primary animate-pulse"
                style={{ animationDelay: `${i * 200}ms` }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
