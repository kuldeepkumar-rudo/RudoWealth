import { useState } from "react";
import { useLocation } from "wouter";
import { QuestionLayout } from "@/components/question-layout";
import { OptionCard } from "@/components/option-card";
import { useAssessment } from "@/lib/assessment-store";
import type { InvestmentProduct } from "@shared/schema";

export default function Question6() {
  const [, setLocation] = useLocation();
  const { responses, updateResponse } = useAssessment();
  const [products, setProducts] = useState<InvestmentProduct[]>(responses.q4_products || []);

  const productOptions: { value: InvestmentProduct; label: string }[] = [
    { value: "none", label: "None - Never invested" },
    { value: "savings_fd", label: "Savings / Fixed Deposits" },
    { value: "mutual_funds", label: "Mutual Funds" },
    { value: "etfs", label: "ETFs" },
    { value: "stocks", label: "Individual Stocks" },
    { value: "crypto", label: "Cryptocurrency" },
  ];

  const toggleProduct = (product: InvestmentProduct) => {
    setProducts(prev => 
      prev.includes(product) 
        ? prev.filter(p => p !== product)
        : [...prev, product]
    );
  };

  const handleContinue = () => {
    if (products.length > 0) {
      updateResponse("q4_products", products);
      // setLocation("/transition-ab");
      setLocation("/assessment/7");
    }
  };

  return (
    <QuestionLayout
      questionNumber={6}
      totalQuestions={14}
      title="Your Investment Experience"
      subtitle="Which investments are you familiar with?"
      onContinue={handleContinue}
      canContinue={true}
      showContinue={true}
    >
      <div className="space-y-3">
        <p className="text-sm font-medium text-muted-foreground -mt-1">
          Select all that apply
        </p>
        <div className="space-y-3">
          {productOptions.map((option) => (
            <OptionCard
              key={option.value}
              label={option.label}
              selected={products.includes(option.value)}
              onClick={() => toggleProduct(option.value)}
              testId={`option-product-${option.value}`}
              multiSelect
            />
          ))}
        </div>
      </div>
    </QuestionLayout>
  );
}