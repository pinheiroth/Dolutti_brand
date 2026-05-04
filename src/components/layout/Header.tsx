import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Search, ShoppingBag, Menu, X, User, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Início" },
  { href: "/produtos", label: "Bolsas" },
  { href: "/produtos?categoria=novidades", label: "Novidades" },
  { href: "/sobre", label: "Sobre" },
  { href: "/contato", label: "Contato" },
];

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { totalItems, setIsOpen } = useCart();
  const { totalItems: wishlistItems } = useWishlist();
  const location = useLocation();

  // trava scroll (leve)
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "auto";
  }, [isMenuOpen]);

  return (
    <>
      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-background border-b border-border">
        <div className="container-custom">

          <div className="flex items-center justify-between h-16 md:h-20">

            {/* MENU BUTTON */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>

            {/* LOGO */}
            <Link
              to="/"
              className="flex items-center"
            >
              <img
                src="/logo_dolutti_header_rm.png"
                alt="Dolutti"
                className="h-7 sm:h-8 md:h-10 w-auto invert"
              />
            </Link>

            {/* DESKTOP NAV */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={cn(
                    "text-sm tracking-wide uppercase transition-colors hover:text-accent",
                    location.pathname === link.href
                      ? "text-foreground"
                      : "text-muted-foreground"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* ACTIONS */}
            <div className="flex items-center gap-2">

              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="hidden md:flex"
              >
                <Search className="h-5 w-5" />
              </Button>

              <Button variant="ghost" size="icon" asChild className="relative">
                <Link to="/favoritos">
                  <Heart className="h-5 w-5" />
                  {wishlistItems > 0 && (
                    <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-accent text-white text-xs flex items-center justify-center">
                      {wishlistItems}
                    </span>
                  )}
                </Link>
              </Button>

              <Button variant="ghost" size="icon" asChild>
                <Link to="/conta">
                  <User className="h-5 w-5" />
                </Link>
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="relative"
                onClick={() => setIsOpen(true)}
              >
                <ShoppingBag className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-white text-xs flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Button>
            </div>
          </div>

          {/* SEARCH */}
          {isSearchOpen && (
            <div className="py-4 border-t border-border">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Buscar bolsas..."
                  className="w-full pl-10 pr-4 py-3 bg-secondary rounded-sm text-sm focus:outline-none"
                />
              </div>
            </div>
          )}

        </div>
      </header>

      {/* MOBILE MENU (slide lateral leve) */}
      <div
        className={cn(
          "md:hidden fixed top-0 left-0 h-full w-[80%] max-w-xs bg-background z-50 transform transition-transform duration-200 ease-out",
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="p-6 flex flex-col gap-6">

          {/* CLOSE */}
          <button onClick={() => setIsMenuOpen(false)}>
            <X className="h-5 w-5" />
          </button>

          {/* LINKS */}
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className="text-lg font-display"
              onClick={() => setIsMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}

          {/* SEARCH */}
          <div className="pt-6 border-t border-border">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Buscar bolsas..."
                className="w-full pl-10 pr-4 py-3 bg-secondary rounded-sm text-sm focus:outline-none"
              />
            </div>
          </div>

        </div>
      </div>
    </>
  );
};