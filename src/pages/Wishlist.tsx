import { Link } from "react-router-dom";
import { Heart, ShoppingCart, X, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { useShop } from "@/context/ShopContext";
import { slugify } from "@/lib/slug";

const Wishlist = () => {
  const { wishlist, toggleWishlist, addToCart } = useShop();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-10 lg:px-8">
        <Link
          to="/categories"
          className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> Continue browsing
        </Link>

        <div className="mb-8 flex items-end justify-between">
          <div>
            <h1 className="font-serif text-3xl font-bold text-foreground md:text-4xl">
              Your Wishlist
            </h1>
            <p className="mt-2 text-muted-foreground">
              {wishlist.length} {wishlist.length === 1 ? "saved piece" : "saved pieces"}
            </p>
          </div>
        </div>

        {wishlist.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card/50 py-24 text-center">
            <Heart className="mb-4 h-12 w-12 text-muted-foreground" />
            <h2 className="font-serif text-xl font-semibold text-foreground">
              Your wishlist is empty
            </h2>
            <p className="mt-2 max-w-sm text-sm text-muted-foreground">
              Tap the heart on any product to save it here for later.
            </p>
            <Link to="/categories">
              <Button className="mt-6 rounded-full">Discover products</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
            {wishlist.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.04 }}
                className="group"
              >
                <div className="relative overflow-hidden rounded-2xl">
                  <Link to={`/product/${item.id}`}>
                    <div className="aspect-[4/5] overflow-hidden bg-muted">
                      <img
                        src={item.image}
                        alt={item.name}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                  </Link>
                  <button
                    onClick={() => toggleWishlist(item)}
                    aria-label="Remove from wishlist"
                    className="absolute right-3 top-3 rounded-full bg-background/90 p-2 backdrop-blur-sm transition-colors hover:bg-background"
                  >
                    <X className="h-4 w-4 text-foreground" />
                  </button>
                </div>
                <div className="mt-3 space-y-1">
                  <Link
                    to={`/brand/${slugify(item.brand)}`}
                    className="text-xs font-medium uppercase tracking-wider text-muted-foreground transition-colors hover:text-primary"
                  >
                    {item.brand}
                  </Link>
                  <Link to={`/product/${item.id}`}>
                    <h3 className="font-sans text-sm font-medium text-foreground line-clamp-1">
                      {item.name}
                    </h3>
                  </Link>
                  <p className="font-sans text-sm font-semibold text-primary">
                    ₹{item.price.toLocaleString("en-IN")}
                  </p>
                  <Button
                    size="sm"
                    variant="outline"
                    className="mt-2 w-full gap-1.5 rounded-full text-xs"
                    onClick={() => addToCart(item, 1)}
                  >
                    <ShoppingCart className="h-3.5 w-3.5" /> Add to cart
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Wishlist;
