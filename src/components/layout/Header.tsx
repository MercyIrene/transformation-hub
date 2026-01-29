import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { name: "DBP", path: "/dbp" },
  { name: "4D Model", path: "/4d-model" },
  { name: "Streams", path: "/execution-streams" },
  { name: "TO", path: "/transformation-office" },
  { name: "Assets", path: "/assets" },
  { name: "User Groups", path: "/user-groups" },
];

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-primary border-b border-primary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-blue-accent flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">D</span>
            </div>
            <span className="text-xl lg:text-2xl font-bold text-primary-foreground">
              DTMP
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors ${
                  isActive(link.path)
                    ? "text-primary-foreground"
                    : "text-primary-foreground/70 hover:text-primary-foreground"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Right Side - Desktop */}
          <div className="hidden lg:flex items-center gap-4">
            <span className="text-xs text-primary-foreground/50">
              Internal Platform
            </span>
            <Link to="/marketplaces">
              <Button
                variant="default"
                className="bg-accent hover:bg-orange-hover text-accent-foreground px-6 py-2.5 rounded-lg font-semibold"
              >
                Access Platform +
              </Button>
            </Link>
            <button
              className="text-primary-foreground/50 hover:text-primary-foreground transition-colors"
              aria-label="Exit Platform"
            >
              <X size={20} />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-3">
            <Link to="/marketplaces">
              <Button
                variant="default"
                size="sm"
                className="bg-accent hover:bg-orange-hover text-accent-foreground rounded-lg font-semibold"
              >
                Access
              </Button>
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-primary-foreground p-2"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-primary/95 backdrop-blur-sm animate-slide-in-left">
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between px-4 h-16 border-b border-primary/20">
              <Link
                to="/"
                className="flex items-center gap-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <div className="w-9 h-9 rounded-full bg-blue-accent flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-lg">D</span>
                </div>
                <span className="text-xl font-bold text-primary-foreground">
                  DTMP
                </span>
              </Link>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-primary-foreground p-2"
                aria-label="Close menu"
              >
                <X size={24} />
              </button>
            </div>

            <nav className="flex-1 px-4 py-8 overflow-y-auto">
              <div className="space-y-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block px-4 py-3 rounded-lg text-lg font-medium transition-colors ${
                      isActive(link.path)
                        ? "bg-accent text-accent-foreground"
                        : "text-primary-foreground/80 hover:bg-primary-foreground/10"
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </nav>

            <div className="px-4 pb-8">
              <Link
                to="/marketplaces"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Button className="w-full bg-accent hover:bg-orange-hover text-accent-foreground py-4 rounded-lg font-semibold text-lg">
                  Access Platform +
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
