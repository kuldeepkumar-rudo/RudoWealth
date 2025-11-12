import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X, Moon, Sun } from "lucide-react";
import { useState } from "react";
import { useTheme } from "./ThemeProvider";
import logoImage from "../../../attached_assets/generated_images/logo.00c1d42c.svg"

export default function Header() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const [, setLocation] = useLocation();

  const navLinks = [
    { href: "/", label: "Digital Advisory" },
    { href: "/private-wealth", label: "Private Wealth" },
    { href: "/learn", label: "Learn" },
    { href: "/calculators", label: "Calculators" },
    { href: "/about", label: "About Us" },
  ];

  return (
    <header className="fixed top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/70">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between">
          <Link href="/" data-testid="link-home">
            <div className="flex items-center gap-2 cursor-pointer">
              <div className="text-2xl font-bold bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent">
                <img src={logoImage} alt="RuDo Logo" className="h-8 w-auto" />
              </div>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <Button
                  variant={location === link.href ? "secondary" : "ghost"}
                  size="sm"
                  data-testid={`link-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  {link.label}
                </Button>
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              data-testid="button-theme-toggle"
              className="hidden sm:flex"
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>

            <Button
              size="sm"
              className="hidden md:flex"
              onClick={()=>setLocation("/quiz")}
              data-testid="button-start-plan"
            >
              Build Your Wealth Plan →
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              data-testid="button-mobile-menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-background">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <Button
                  variant={location === link.href ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setMobileMenuOpen(false)}
                  data-testid={`mobile-link-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  {link.label}
                </Button>
              </Link>
            ))}
            <Button className="w-full mt-2" onClick={()=>setLocation("/quiz")} data-testid="button-mobile-start-plan">
              Build Your Wealth Plan →
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
