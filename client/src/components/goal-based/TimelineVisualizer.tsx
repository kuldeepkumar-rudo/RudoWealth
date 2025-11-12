import { useEffect, useRef, useState } from "react";
import { Home, GraduationCap, Plane, Heart } from "lucide-react";

interface Milestone {
  icon: React.ElementType;
  label: string;
  year: string;
  position: number;
}

const milestones: Milestone[] = [
  { icon: Home, label: "Dream Home", year: "2028", position: 15 },
  { icon: Heart, label: "Wedding", year: "2030", position: 38 },
  { icon: GraduationCap, label: "Education", year: "2035", position: 62 },
  { icon: Plane, label: "Retirement", year: "2050", position: 85 }
];

export default function TimelineVisualizer() {
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

  return (
    <div ref={ref} className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden bg-gradient-to-br from-card via-card to-muted/20 border border-border/50 backdrop-blur-xl p-8">
      {/* Ambient glow */}
      <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-primary/10 pointer-events-none" />
      
      <svg viewBox="0 0 800 500" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
        {/* Gradient definitions */}
        <defs>
          <linearGradient id="waveGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="hsl(160, 84%, 39%)" stopOpacity="0.4" />
            <stop offset="50%" stopColor="hsl(165, 75%, 45%)" stopOpacity="0.2" />
            <stop offset="100%" stopColor="hsl(170, 70%, 42%)" stopOpacity="0.05" />
          </linearGradient>
          
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(160, 84%, 39%)" stopOpacity="0.3" />
            <stop offset="50%" stopColor="hsl(165, 75%, 45%)" stopOpacity="0.6" />
            <stop offset="100%" stopColor="hsl(160, 84%, 39%)" stopOpacity="0.3" />
          </linearGradient>
        </defs>

        {/* Timeline base line */}
        <line 
          x1="50" 
          y1="380" 
          x2="750" 
          y2="380" 
          stroke="hsl(0, 0%, 25%)" 
          strokeWidth="2"
        />

        {/* Wave path - animated */}
        <path
          d="M 50 350 Q 100 280, 160 320 T 280 300 T 400 250 T 520 280 T 640 240 T 750 200"
          fill="none"
          stroke="url(#lineGradient)"
          strokeWidth="3"
          className={`transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
          style={{
            strokeDasharray: 1000,
            strokeDashoffset: isVisible ? 0 : 1000,
            transition: 'stroke-dashoffset 2s ease-out'
          }}
        />

        {/* Wave area fill */}
        <path
          d="M 50 350 Q 100 280, 160 320 T 280 300 T 400 250 T 520 280 T 640 240 T 750 200 L 750 500 L 50 500 Z"
          fill="url(#waveGradient)"
          className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        />

        {/* Milestones */}
        {milestones.map((milestone, index) => {
          const x = 50 + (700 * milestone.position / 100);
          const y = 380;
          
          return (
            <g key={index} className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: `${600 + index * 150}ms` }}>
              {/* Milestone marker */}
              <circle
                cx={x}
                cy={y}
                r="6"
                fill="hsl(160, 84%, 39%)"
                stroke="hsl(0, 0%, 4%)"
                strokeWidth="3"
              />
              
              {/* Connecting line to icon */}
              <line
                x1={x}
                y1={y}
                x2={x}
                y2={y - 80}
                stroke="hsl(0, 0%, 20%)"
                strokeWidth="1.5"
                strokeDasharray="4,4"
                opacity="0.5"
              />
              
              {/* Icon background circle */}
              {/* <circle
                cx={x}
                cy={y - 100}
                r="24"
                fill="hsl(160, 84%, 39%)"
                fillOpacity="0.15"
                stroke="hsl(160, 84%, 39%)"
                strokeWidth="2"
              /> */}
            </g>
          );
        })}
      </svg>

      {/* Milestone labels (outside SVG for better text rendering) */}
      <div className="absolute inset-0 pointer-events-none px-8">
        {milestones.map((milestone, index) => {
          const x = 50 + (700 * milestone.position / 100);
          // Clamp position to prevent overflow
          const clampedPercent = Math.min(92, Math.max(8, (x / 800) * 100));
          const Icon = milestone.icon;
          
          return (
            <div
              key={index}
              className={`absolute transition-all duration-700 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}
              style={{
                left: `${clampedPercent}%`,
                top: '46%',
                transform: 'translate(-50%, -50%)',
                transitionDelay: `${700 + index * 150}ms`
              }}
            >
              <div className="flex flex-col items-center gap-1">
                <div className="w-12 h-12 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <div className="text-xs font-semibold text-foreground whitespace-nowrap mt-1">
                  {milestone.label}
                </div>
                <div className="text-xs text-muted-foreground">
                  {milestone.year}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
