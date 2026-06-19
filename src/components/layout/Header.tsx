import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Search,
  ShoppingBag,
  Menu,
  X,
  User,
  Heart,
} from "lucide-react";

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
  const [scrolled, setScrolled] = useState(false);

  const { totalItems, setIsOpen } = useCart();
  const { totalItems: wishlistItems } = useWishlist();

  const location = useLocation();

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "auto";
  }, [isMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const isHeroMode =
    location.pathname === "/" && !scrolled;

  const textColor = isHeroMode
    ? "text-white"
    : "text-black";

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled
            ? "bg-white/90 backdrop-blur-md border-b border-black/5 shadow-sm"
            : "bg-transparent"
        )}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between h-20">
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "md:hidden",
                textColor
              )}
              onClick={() => setIsMenuOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>

            <Link
              to="/"
              className="flex items-center"
            >
              <img
                src="/logo_dolutti_header_rm.png"
                alt="Dolutti"
                className={cn(
                  "h-8 md:h-10 w-auto transition-all duration-300 invert",
                  isHeroMode && "brightness-0 "
                ) }
              />
            </Link>

            <nav className="hidden md:flex items-center gap-10">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={cn(
                    "text-xs uppercase tracking-[0.25em] transition-all duration-300",
                    textColor,
                    "hover:opacity-60"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-1">

              <Button
                variant="ghost"
                size="icon"
                onClick={() =>
                  setIsSearchOpen(!isSearchOpen)
                }
                className={cn(
                  "hidden md:flex",
                  textColor
                )}
              >
                <Search className="h-5 w-5" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                asChild
                className={cn(
                  "relative",
                  textColor
                )}
              >
                <Link to="/favoritos">
                  <Heart className="h-5 w-5" />

                  {wishlistItems > 0 && (
                    <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-black text-white text-[10px] flex items-center justify-center">
                      {wishlistItems}
                    </span>
                  )}
                </Link>
              </Button>

              <Button
                variant="ghost"
                size="icon"
                asChild
                className={textColor}
              >
                <Link to="/conta">
                  <User className="h-5 w-5" />
                </Link>
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "relative",
                  textColor
                )}
                onClick={() => setIsOpen(true)}
              >
                <ShoppingBag className="h-5 w-5" />

                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-black text-white text-[10px] flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Button>

            </div>
          </div>

          {isSearchOpen && (
            <div className="pb-4">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />

                <input
                  type="text"
                  placeholder="Buscar bolsas..."
                  className="w-full pl-11 pr-4 py-3 bg-white border border-black/10 rounded-none focus:outline-none"
                />
              </div>
            </div>
          )}
        </div>
      </header>

      <div
        className={cn(
          "fixed top-0 left-0 h-full w-[85%] max-w-sm bg-[#111111] text-white z-[60] transform transition-transform duration-300",
          isMenuOpen
            ? "translate-x-0"
            : "-translate-x-full"
        )}
      >
        <div className="p-8">

          <div className="flex justify-end mb-12">
            <button
              onClick={() =>
                setIsMenuOpen(false)
              }
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="flex flex-col gap-8">

            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() =>
                  setIsMenuOpen(false)
                }
                className="font-display text-2xl"
              >
                {link.label}
              </Link>
            ))}

          </div>

          <div className="mt-12 pt-8 border-t border-white/10">

            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/50" />

              <input
                type="text"
                placeholder="Buscar bolsas..."
                className="w-full bg-white/5 border border-white/10 py-3 pl-11 pr-4"
              />
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

