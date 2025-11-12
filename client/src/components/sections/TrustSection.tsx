import { Card } from "@/components/ui/card";
import { Shield, Lock } from "lucide-react";

export default function TrustSection() {
  return (
    <section className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Card className="p-8 lg:p-12 bg-card border-card-border">
            <div className="text-center max-w-3xl mx-auto">
              <div className="flex justify-center gap-4 mb-6">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <Lock className="h-8 w-8 text-primary" />
                </div>
              </div>
              
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                Built on regulation. Powered by transparency.
              </h2>
              
              <p className="text-lg text-muted-foreground leading-relaxed">
                FSRA-regulated in ADGM. SIPC-protected up to USD 500K. Your money stays segregated, secure, and in your name. Always.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
