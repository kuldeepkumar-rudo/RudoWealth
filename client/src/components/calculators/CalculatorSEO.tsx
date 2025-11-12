import { Helmet } from "react-helmet-async";
import { type CalculatorMetadata } from "@/features/calculators/registry";

interface CalculatorSEOProps {
  calculator: CalculatorMetadata;
}

export function CalculatorSEO({ calculator }: CalculatorSEOProps) {
  const { seo } = calculator;

  return (
    <Helmet>
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <meta name="keywords" content={seo.keywords.join(", ")} />
      
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:type" content="website" />
      
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
    </Helmet>
  );
}
