import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface OptionCardProps {
  label: string;
  sublabel?: string;
  selected: boolean;
  onClick: () => void;
  testId?: string;
  icon?: React.ReactNode;
  multiSelect?: boolean;
}

export function OptionCard({
  label,
  sublabel,
  selected,
  onClick,
  testId,
  icon,
  multiSelect = false
}: OptionCardProps) {
  return (
    <button
      onClick={onClick}
      data-testid={testId}
      className={cn(
        "w-full min-h-[56px] px-4 py-3 rounded-lg border-2 text-left transition-all duration-300",
        "hover-elevate active-elevate-2",
        selected
          ? "border-primary bg-primary/5"
          : "border-border bg-card"
      )}
    >
      <div className="flex items-center gap-3 justify-between">
        {/* Left side: icon + labels */}
        <div className="flex items-center gap-3 flex-1 min-w-0">
          {icon && <div className="flex-shrink-0">{icon}</div>}

          <div className="min-w-0">
            <div
              className={cn(
                "text-base font-medium",
                selected ? "text-foreground" : "text-foreground"
              )}
            >
              {label}
            </div>
            {sublabel && (
              <div className="text-sm text-muted-foreground mt-0.5">
                {sublabel}
              </div>
            )}
          </div>
        </div>

        {/* Right side: check icon */}
        {multiSelect ? (
          <div
            className={cn(
              "w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors",
              selected ? "bg-primary border-primary" : "border-border"
            )}
          >
            {selected && <Check className="w-3 h-3 text-primary-foreground" />}
          </div>
        ) : (
          selected && <Check className="w-5 h-5 text-primary flex-shrink-0" />
        )}
      </div>
    </button>
  );
}
