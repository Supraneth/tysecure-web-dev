import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ClipboardList, Menu, Shield } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useComposition } from "@/hooks/useComposition";

const navLinks = [
  { href: "/", label: "Accueil" },
  { href: "/process", label: "Déroulement" },
  { href: "/prestations", label: "Prestations" },
  { href: "/modules", label: "Modules" },
  { href: "/accompagnement", label: "Accompagnement" },
  { href: "/composition", label: "Composition" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const { getTotalItems } = useComposition();
  const totalItems = getTotalItems();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close the sheet on route change.
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled || isOpen
            ? "bg-background/95 backdrop-blur-lg border-b border-border shadow-elevated"
            : "bg-transparent",
        )}
      >
        <nav className="section-container relative">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center group-hover:shadow-glow transition-shadow duration-300">
                <Shield className="w-5 h-5 text-primary" />
              </div>
              <span className="font-display font-bold text-xl text-foreground">TySecure</span>
            </Link>

            {/* Desktop navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200",
                    location.pathname === link.href
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary",
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <Link to="/composition" className="relative">
                <Button variant="ghost" size="icon" className="relative">
                  <ClipboardList className="w-5 h-5" />
                  {totalItems > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">
                      {totalItems}
                    </span>
                  )}
                </Button>
              </Link>
            </div>

            {/* Mobile buttons */}
            <div className="flex items-center gap-2 lg:hidden">
              <Link to="/composition" className="relative">
                <Button variant="ghost" size="icon" className="relative h-11 w-11">
                  <ClipboardList className="w-5 h-5" />
                  {totalItems > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">
                      {totalItems}
                    </span>
                  )}
                </Button>
              </Link>

              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="h-11 w-11" aria-label="Ouvrir le menu">
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile navigation sheet */}
      <SheetContent
        side="right"
        className="w-[86vw] max-w-sm p-0 flex flex-col"
      >
        <div className="px-6 pt-[calc(1.5rem+env(safe-area-inset-top))] pb-4 border-b border-border">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center">
              <Shield className="w-5 h-5 text-primary" />
            </div>
            <div className="min-w-0">
              <p className="font-display font-bold text-lg leading-none">TySecure</p>
              <p className="text-xs text-muted-foreground mt-1">Domotique local-first & cybersécurisée</p>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto overscroll-contain px-3 py-4">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <SheetClose key={link.href} asChild>
                <Link
                  to={link.href}
                  className={cn(
                    "min-h-[44px] px-4 py-3 rounded-xl text-base font-medium transition-colors",
                    location.pathname === link.href
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary",
                  )}
                >
                  {link.label}
                </Link>
              </SheetClose>
            ))}
          </div>
        </div>

        <div className="px-6 pt-4 pb-[calc(1.5rem+env(safe-area-inset-bottom))] border-t border-border">
          <SheetClose asChild>
            <Link to="/contact">
              <Button variant="hero" className="w-full">
                Réserver un Audit
              </Button>
            </Link>
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  );
}
