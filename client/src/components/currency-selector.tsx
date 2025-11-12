import { useCurrency, Currency, currencySymbols } from "@/lib/currency-context";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

export function CurrencySelector() {
  const { currency, setCurrency } = useCurrency();
  const currencies: Currency[] = ["AED", "USD", "INR"];

  return (
    <div className="flex gap-2" data-testid="currency-selector">
      {currencies.map((curr) => (
        <Button
          key={curr}
          variant={currency === curr ? "default" : "outline"}
          size="sm"
          onClick={() => setCurrency(curr)}
          className={`min-w-[64px] ${
            currency === curr
              ? "bg-accent text-accent-foreground hover:bg-accent/90"
              : ""
          }`}
          data-testid={`button-currency-${curr.toLowerCase()}`}
        >
          
          {currencySymbols[curr]} {curr}
          {currency === curr && <Check className="w-3 h-3 mr-1" />}
        </Button>
      ))}
    </div>
  );
}
