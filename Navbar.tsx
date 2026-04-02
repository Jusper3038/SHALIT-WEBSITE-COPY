import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";

const NAV_LINKS = [
  { label: "Home", path: "/" },
  { label: "Services", path: "/services" },
  { label: "Products", path: "/products" },
  { label: "About", path: "/about" },
  { label: "Blog", path: "/blog" },
  { label: "Contact", path: "/contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
      <div className="container flex items-center justify-between h-16 md:h-20">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Shalit Group" className="h-10 md:h-12 w-auto" />
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.path}
              to={l.path}
              className={`text-sm font-medium transition-colors hover:text-accent ${
                pathname === l.path ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Button variant="ghost" size="sm" asChild>
            <a href="tel:+254700000000" className="flex items-center gap-1.5">
              <Phone size={14} /> Call Us
            </a>
          </Button>
          <Button variant="hero" size="sm" asChild>
            <Link to="/contact">Get a Quote</Link>
          </Button>
        </div>

        <button
          className="md:hidden p-2 text-foreground"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-background border-b border-border animate-fade-in">
          <nav className="container flex flex-col py-4 gap-1">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.path}
                to={l.path}
                onClick={() => setOpen(false)}
                className={`py-3 px-4 rounded-lg text-sm font-medium transition-colors ${
                  pathname === l.path
                    ? "bg-secondary text-foreground"
                    : "text-muted-foreground hover:bg-secondary"
                }`}
              >
                {l.label}
              </Link>
            ))}
            <div className="flex gap-3 mt-4 px-4">
              <Button variant="outline" size="sm" className="flex-1" asChild>
                <a href="tel:+254700000000">
                  <Phone size={14} /> Call Now
                </a>
              </Button>
              <Button variant="hero" size="sm" className="flex-1" asChild>
                <Link to="/contact" onClick={() => setOpen(false)}>Get a Quote</Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;