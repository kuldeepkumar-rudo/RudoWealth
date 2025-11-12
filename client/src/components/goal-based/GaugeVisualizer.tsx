import { useEffect, useRef, useState } from "react";

export default function GaugeVisualizer() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  const equityPercent = 80;
  const bondsPercent = 20;
  
  // Calculate arc paths
  const radius = 120;
  const centerX = 150;
  const centerY = 150;
  const startAngle = 180;
  const endAngle = 0;
  
  const equityAngle = startAngle - (equityPercent / 100) * 180;
  
  const polarToCartesian = (angle: number) => {
    const rad = (angle * Math.PI) / 180;
    return {
      x: centerX + radius * Math.cos(rad),
      y: centerY - radius * Math.sin(rad)
    };
  };

  const equityStart = polarToCartesian(startAngle);
  const equityEnd = polarToCartesian(equityAngle);
  const bondsEnd = polarToCartesian(endAngle);

  return (
    <div ref={ref} className="relative w-full aspect-square max-w-md mx-auto rounded-2xl overflow-hidden bg-gradient-to-br from-card via-card to-muted/20 border border-border/50 backdrop-blur-xl p-8">
      {/* Ambient glow */}
      <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-primary/10 pointer-events-none" />
      
      <div className="relative flex flex-col items-center justify-center h-full">
        <h3 className="text-sm font-semibold text-muted-foreground mb-2">Goals That Adapt</h3>
        <p className="text-xs text-muted-foreground/70 mb-8 text-center max-w-xs">
          Your portfolio grows with you—aggressive when young, protective near goals
        </p>
        
        <svg viewBox="0 0 300 200" className="w-full max-w-sm">
          <defs>
            <linearGradient id="equityGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(160, 84%, 39%)" />
              <stop offset="100%" stopColor="hsl(165, 75%, 45%)" />
            </linearGradient>
            
            <linearGradient id="bondsGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(170, 70%, 42%)" />
              <stop offset="100%" stopColor="hsl(175, 65%, 40%)" />
            </linearGradient>
          </defs>

          {/* Background arc */}
          <path
            d={`M ${equityStart.x} ${equityStart.y} A ${radius} ${radius} 0 0 1 ${bondsEnd.x} ${bondsEnd.y}`}
            fill="none"
            stroke="hsl(0, 0%, 15%)"
            strokeWidth="28"
            strokeLinecap="round"
          />

          {/* Equity arc - animated */}
          <path
            d={`M ${equityStart.x} ${equityStart.y} A ${radius} ${radius} 0 0 1 ${equityEnd.x} ${equityEnd.y}`}
            fill="none"
            stroke="url(#equityGradient)"
            strokeWidth="26"
            strokeLinecap="round"
            className={`transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
            style={{
              strokeDasharray: 377,
              strokeDashoffset: isVisible ? 0 : 377,
              transition: 'stroke-dashoffset 1.5s ease-out'
            }}
          />

          {/* Bonds arc - animated */}
          <path
            d={`M ${equityEnd.x} ${equityEnd.y} A ${radius} ${radius} 0 0 1 ${bondsEnd.x} ${bondsEnd.y}`}
            fill="none"
            stroke="url(#bondsGradient)"
            strokeWidth="26"
            strokeLinecap="round"
            className={`transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
            style={{
              strokeDasharray: 94,
              strokeDashoffset: isVisible ? 0 : 94,
              transition: 'stroke-dashoffset 1s ease-out 0.7s'
            }}
          />

          {/* Center pointer/needle */}
          <g className={`transition-all duration-1000 delay-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            <circle cx={centerX} cy={centerY} r="8" fill="hsl(0, 0%, 20%)" />
            <circle cx={centerX} cy={centerY} r="4" fill="hsl(160, 84%, 39%)" />
          </g>
        </svg>

        {/* Metrics */}
        <div className={`grid grid-cols-2 gap-8 mt-8 transition-all duration-700 delay-1200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="text-center">
            <div className="text-xs text-muted-foreground mb-1">Higher Growth</div>
            <div className="text-3xl font-bold font-mono text-primary">{equityPercent}%</div>
            <div className="text-xs text-muted-foreground mt-1">Equity</div>
          </div>
          <div className="text-center">
            <div className="text-xs text-muted-foreground mb-1">Protect Gains</div>
            <div className="text-3xl font-bold font-mono text-chart-3">{bondsPercent}%</div>
            <div className="text-xs text-muted-foreground mt-1">Bonds</div>
          </div>
        </div>

        <p className="text-xs text-muted-foreground/70 mt-6 text-center">
          Portfolio adjusts as you near your target
        </p>
      </div>
    </div>
  );
}
