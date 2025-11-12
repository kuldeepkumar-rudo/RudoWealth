import { Link } from "wouter";
import { Shield, Lock, Building2 } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-card border-t border-card-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="text-2xl font-bold bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent mb-4">
              RuDo
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Next-gen wealth platform for emerging and affluent NRIs.
            </p>
            <div className="flex gap-4 text-muted-foreground">
              <Shield className="h-5 w-5" />
              <Lock className="h-5 w-5" />
              <Building2 className="h-5 w-5" />
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Products</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/" className="hover:text-foreground transition-colors" data-testid="footer-link-digital-advisory">Digital Advisory</Link></li>
              <li><Link href="/private-wealth" className="hover:text-foreground transition-colors" data-testid="footer-link-private-wealth">Private Wealth</Link></li>
              <li><Link href="/calculators" className="hover:text-foreground transition-colors" data-testid="footer-link-calculators">Calculators</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/about" className="hover:text-foreground transition-colors" data-testid="footer-link-about">About Us</Link></li>
              <li><Link href="/learn" className="hover:text-foreground transition-colors" data-testid="footer-link-learn">Learn</Link></li>
              <li><a href="#" className="hover:text-foreground transition-colors" data-testid="footer-link-careers">Careers</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors" data-testid="footer-link-contact">Contact</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors" data-testid="footer-link-privacy">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors" data-testid="footer-link-terms">Terms of Service</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors" data-testid="footer-link-disclaimer">Disclaimer</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8">
          <div className="text-xs text-muted-foreground space-y-2">
            <p className="font-medium">
              Regulatory: RuDo Digital Wealth Private Limited is FSRA-regulated in ADGM. Client funds segregated. SIPC-protected up to USD 500K.
            </p>
            <p>
              Disclaimer: Investing involves risk. Past performance doesn't guarantee future results.
            </p>
            <p className="mt-4">
              © {new Date().getFullYear()} RuDo Wealth. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
