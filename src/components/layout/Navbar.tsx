import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, ShoppingBag, Search, Menu, X, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

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
          <Link to="/categories/embroidery" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            Embroidery
          </Link>
          <Link to="/categories/candles" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            Candles
          </Link>
          <Link to="/categories/rugs" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            Rugs
          </Link>
          <Link to="/categories/handmade-gifting" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            Gifting
          </Link>
        </div>

        {/* Right icons */}
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="hidden md:flex">
            <Search className="h-5 w-5" />
          </Button>
          <Link to="/wishlist">
            <Button variant="ghost" size="icon">
              <Heart className="h-5 w-5" />
            </Button>
          </Link>
          <Link to="/cart">
            <Button variant="ghost" size="icon">
              <ShoppingBag className="h-5 w-5" />
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
              {["Discover", "Embroidery", "Candles", "Rugs", "Gifting"].map((item) => (
                <Link
                  key={item}
                  to={item === "Discover" ? "/categories" : `/categories/${item.toLowerCase()}`}
                  className="rounded-md px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                  onClick={() => setMobileOpen(false)}
                >
                  {item}
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
