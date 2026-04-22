import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Heart, ShoppingBag, Search, Menu, X, User, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { motion, AnimatePresence } from "framer-motion";
import { useShop } from "@/context/ShopContext";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { cartCount, wishlistCount } = useShop();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    setSearchOpen(false);
    setQuery("");
    navigate(q ? `/categories?q=${encodeURIComponent(q)}` : "/categories");
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 lg:px-8">
        {/* Logo */}
        <Link to="/" className="font-serif text-2xl font-bold tracking-tight text-foreground">
          Kalakriti
        </Link>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-8 md:flex">
          <Link to="/categories" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            Discover
          </Link>
          <Link to="/sell" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            Collaborate
          </Link>
          <Link to="/about" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            About Us
          </Link>
        </div>

        {/* Right icons */}
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="hidden md:flex" onClick={() => setSearchOpen(true)} aria-label="Search">
            <Search className="h-5 w-5" />
          </Button>
          <Dialog open={searchOpen} onOpenChange={setSearchOpen}>
            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle className="font-serif">Search Kalakriti</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSearch} className="flex gap-2">
                <Input
                  autoFocus
                  placeholder="Search products, brands, categories…"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <Button type="submit">Search</Button>
              </form>
              <div className="flex flex-wrap gap-2 pt-2">
                {["Embroidery", "Candles", "Rugs", "Jewellery", "Pottery"].map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => {
                      setSearchOpen(false);
                      navigate(`/categories?category=${t.toLowerCase()}`);
                    }}
                    className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground hover:bg-muted hover:text-foreground"
                  >
                    {t}
                  </button>
                ))}
              </div>
            </DialogContent>
          </Dialog>
          <Link to="/messages" aria-label="Messages" className="hidden md:inline-flex">
            <Button variant="ghost" size="icon">
              <MessageCircle className="h-5 w-5" />
            </Button>
          </Link>
          <Link to="/wishlist" aria-label="Wishlist">
            <Button variant="ghost" size="icon" className="relative">
              <Heart className="h-5 w-5" />
              {wishlistCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-semibold text-primary-foreground">
                  {wishlistCount}
                </span>
              )}
            </Button>
          </Link>
          <Link to="/cart" aria-label="Cart">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingBag className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-semibold text-primary-foreground">
                  {cartCount}
                </span>
              )}
            </Button>
          </Link>
          <Link to="/auth">
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
          </Link>
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-border md:hidden"
          >
            <div className="flex flex-col gap-2 px-4 py-4">
              {[
                { label: "Discover", to: "/categories" },
                { label: "Collaborate", to: "/sell" },
                { label: "About Us", to: "/about" },
              ].map((item) => (
                <Link
                  key={item.label}
                  to={item.to}
                  className="rounded-md px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
