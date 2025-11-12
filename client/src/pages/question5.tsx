// import { useState } from "react";
// import { useLocation } from "wouter";
// import { QuestionLayout } from "@/components/question-layout";
// import { OptionCard } from "@/components/option-card";
// import { useAssessment } from "@/lib/assessment-store";
// import type { KnowledgeLevel, InvestmentProduct } from "@shared/schema";

// export default function Question5() {
//   const [, setLocation] = useLocation();
//   const { responses, updateResponse } = useAssessment();
//   const [knowledge, setKnowledge] = useState<KnowledgeLevel | undefined>(responses.q4_knowledge);
//   const [products, setProducts] = useState<InvestmentProduct[]>(responses.q4_products || []);

//   const knowledgeOptions: { value: KnowledgeLevel; label: string; sublabel: string }[] = [
//     { value: "expert", label: "Expert", sublabel: "Years of active investing" },
//     { value: "experienced", label: "Experienced", sublabel: "Investing for few years" },
//     { value: "intermediate", label: "Intermediate", sublabel: "Some knowledge and experience" },
//     { value: "beginner", label: "Beginner", sublabel: "Learning about investing" },
//     { value: "no_knowledge", label: "No Knowledge", sublabel: "New to investing" },
//   ];

//   const productOptions: { value: InvestmentProduct; label: string }[] = [
//     { value: "none", label: "None - Never invested" },
//     { value: "savings_fd", label: "Savings / Fixed Deposits" },
//     { value: "mutual_funds", label: "Mutual Funds" },
//     { value: "etfs", label: "ETFs" },
//     { value: "stocks", label: "Individual Stocks" },
//     { value: "crypto", label: "Cryptocurrency" },
//   ];

//   const toggleProduct = (product: InvestmentProduct) => {
//     setProducts(prev => 
//       prev.includes(product) 
//         ? prev.filter(p => p !== product)
//         : [...prev, product]
//     );
//   };

//   const handleContinue = () => {
//     if (knowledge && products.length > 0) {
//       updateResponse("q4_knowledge", knowledge);
//       updateResponse("q4_products", products);
//       setLocation("/assessment/6");
//     }
//   };

//   return (
//     <QuestionLayout
//       questionNumber={5}
//       totalQuestions={14}
//       title="Your Investment Experience"
//       subtitle="This helps us recommend appropriate investment strategies"
//       onContinue={handleContinue}
//       canContinue={!!knowledge}
//       showContinue={true}
//     >
//       <div className="space-y-6">
//         <div className="space-y-3">
//           <p className="text-sm font-medium text-foreground">
//             How would you describe your investment knowledge?
//           </p>
//           <div className="space-y-3">
//             {knowledgeOptions.map((option) => (
//               <OptionCard
//                 key={option.value}
//                 label={option.label}
//                 sublabel={option.sublabel}
//                 selected={knowledge === option.value}
//                 onClick={() => setKnowledge(option.value)}
//                 testId={`option-knowledge-${option.value}`}
//               />
//             ))}
//           </div>
//         </div>

//         {/* {knowledge && (
//           <div className="space-y-3 animate-in fade-in slide-in-from-top-4 duration-300">
//             <div className="border-t border-border" />
//             <p className="text-sm font-medium text-foreground">
//               Which investments are you familiar with?
//             </p>
//             <p className="text-sm font-medium text-muted-foreground -mt-1">
//               Select all that apply
//             </p>
//             <div className="space-y-3">
//               {productOptions.map((option) => (
//                 <OptionCard
//                   key={option.value}
//                   label={option.label}
//                   selected={products.includes(option.value)}
//                   onClick={() => toggleProduct(option.value)}
//                   testId={`option-product-${option.value}`}
//                   multiSelect
//                 />
//               ))}
//             </div>
//           </div>
//         )} */}
//       </div>
//     </QuestionLayout>
//   );
// }


import { useState } from "react";
import { useLocation } from "wouter";
import { QuestionLayout } from "@/components/question-layout";
import { OptionCard } from "@/components/option-card";
import { useAssessment } from "@/lib/assessment-store";
import type { KnowledgeLevel, InvestmentProduct } from "@shared/schema";

export default function Question5() {
  const [, setLocation] = useLocation();
  const { responses, updateResponse } = useAssessment();

  // Load previous responses if available
  const [knowledge, setKnowledge] = useState<KnowledgeLevel | undefined>(responses.q4_knowledge);
  const [products, setProducts] = useState<InvestmentProduct[]>(responses.q4_products || []);

  // Options
  const knowledgeOptions: { value: KnowledgeLevel; label: string; sublabel: string }[] = [
    { value: "expert", label: "Expert", sublabel: "Years of active investing" },
    { value: "experienced", label: "Experienced", sublabel: "Investing for few years" },
    { value: "intermediate", label: "Intermediate", sublabel: "Some knowledge and experience" },
    { value: "beginner", label: "Beginner", sublabel: "Learning about investing" },
    { value: "no_knowledge", label: "No Knowledge", sublabel: "New to investing" },
  ];

  const productOptions: { value: InvestmentProduct; label: string }[] = [
    { value: "none", label: "None - Never invested" },
    { value: "savings_fd", label: "Savings / Fixed Deposits" },
    { value: "mutual_funds", label: "Mutual Funds" },
    { value: "etfs", label: "ETFs" },
    { value: "stocks", label: "Individual Stocks" },
    { value: "crypto", label: "Cryptocurrency" },
  ];

  const toggleProduct = (product: InvestmentProduct) => {
    setProducts((prev) =>
      prev.includes(product)
        ? prev.filter((p) => p !== product)
        : [...prev, product]
    );
  };

  // ✅ Fixed: only require knowledge (not products)
  const handleContinue = () => {
    if (knowledge) {
      updateResponse("q4_knowledge", knowledge);
      updateResponse("q4_products", products); // still saved, even if empty
      console.log("Knowledge level saved:", knowledge);
      console.log("Products saved:", products);
      console.log("Knowledge level saved:", knowledge);
      setLocation("/assessment/6");
    }
  };

  return (
    <QuestionLayout
      questionNumber={5}
      totalQuestions={14}
      title="Your Investment Experience"
      subtitle="This helps us recommend appropriate investment strategies"
      onContinue={handleContinue}
      canContinue={!!knowledge}  // ✅ Button enables after user picks a level
      showContinue={true}
    >
      <div className="space-y-6">
        {/* Question: Knowledge level */}
        <div className="space-y-3">
          <p className="text-sm font-medium text-foreground">
            How would you describe your investment knowledge?
          </p>
          <div className="space-y-3">
            {knowledgeOptions.map((option) => (
              <OptionCard
                key={option.value}
                label={option.label}
                sublabel={option.sublabel}
                selected={knowledge === option.value}
                // ✅ Fix: Type-safe cast to KnowledgeLevel
                onClick={() => setKnowledge(option.value as KnowledgeLevel)}
                testId={`option-knowledge-${option.value}`}
              />
            ))}
          </div>
        </div>

        {/* Optional (commented for now): show product selection after knowledge */}
        {/* {knowledge && (
          <div className="space-y-3 animate-in fade-in slide-in-from-top-4 duration-300">
            <div className="border-t border-border" />
            <p className="text-sm font-medium text-foreground">
              Which investments are you familiar with?
            </p>
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
        )} */}
      </div>
    </QuestionLayout>
  );
}
