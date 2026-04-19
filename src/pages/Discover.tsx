import { useState, useMemo, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Heart, SlidersHorizontal, X, ChevronDown } from "lucide-react";
import { slugify } from "@/lib/slug";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { useShop } from "@/context/ShopContext";

const categories = [
  { name: "All", slug: "all" },
  { name: "Embroidery", slug: "embroidery" },
  { name: "Candles", slug: "candles" },
  { name: "Rugs", slug: "rugs" },
  { name: "Handmade Gifting", slug: "handmade-gifting" },
  { name: "Home Décor", slug: "home-decor" },
  { name: "Jewellery", slug: "jewellery" },
  { name: "Pottery", slug: "pottery" },
  { name: "Textiles", slug: "textiles" },
];

const priceRanges = [
  { label: "All Prices", min: 0, max: Infinity },
  { label: "Under ₹500", min: 0, max: 500 },
  { label: "₹500 – ₹1,500", min: 500, max: 1500 },
  { label: "₹1,500 – ₹3,000", min: 1500, max: 3000 },
  { label: "Above ₹3,000", min: 3000, max: Infinity },
];

const sortOptions = [
  { label: "Newest First", value: "newest" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Popular", value: "popular" },
];

const allProducts = [
  { id: 1, name: "Chikankari Cushion Cover Set", price: 1499, image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=500&fit=crop", brand: "The Stitch Studio", category: "embroidery" },
  { id: 2, name: "Lavender Soy Wax Candle", price: 799, image: "https://images.unsplash.com/photo-1602607663604-59c816e08f1a?w=400&h=500&fit=crop", brand: "Lumière Candles", category: "candles" },
  { id: 3, name: "Hand-Knotted Jute Rug", price: 3999, image: "https://images.unsplash.com/photo-1600166898405-da9535204843?w=400&h=500&fit=crop", brand: "Dharaa Rugs", category: "rugs" },
  { id: 4, name: "Artisan Gift Hamper", price: 2499, image: "https://images.unsplash.com/photo-1513519245088-0e12902e35a6?w=400&h=500&fit=crop", brand: "Wrapped with Joy", category: "handmade-gifting" },
  { id: 5, name: "Zardozi Clutch Bag", price: 1899, image: "https://images.unsplash.com/photo-1594897030264-ab7d87efc473?w=400&h=500&fit=crop", brand: "Kashmiri Weaves", category: "embroidery" },
  { id: 6, name: "Cinnamon & Clove Candle Trio", price: 1299, image: "https://images.unsplash.com/photo-1603006905003-be475563bc59?w=400&h=500&fit=crop", brand: "Lumière Candles", category: "candles" },
  { id: 7, name: "Handwoven Dhurrie Runner", price: 2799, image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=500&fit=crop", brand: "Dharaa Rugs", category: "rugs" },
  { id: 8, name: "Phulkari Table Runner", price: 999, image: "https://images.unsplash.com/photo-1615874959474-d609969a20ed?w=400&h=500&fit=crop", brand: "The Stitch Studio", category: "embroidery" },
  { id: 9, name: "Rose & Jasmine Candle", price: 599, image: "https://images.unsplash.com/photo-1572726729207-a78d6feb18d7?w=400&h=500&fit=crop", brand: "Lumière Candles", category: "candles" },
  { id: 10, name: "Macramé Wall Hanging", price: 1799, image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=400&h=500&fit=crop", brand: "Knot & Thread", category: "home-decor" },
  { id: 11, name: "Handpainted Ceramic Vase", price: 1299, image: "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=400&h=500&fit=crop", brand: "Clay & Fire", category: "pottery" },
  { id: 12, name: "Block Print Saree", price: 3499, image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&h=500&fit=crop", brand: "Rangrez", category: "textiles" },
  { id: 13, name: "Silver Filigree Earrings", price: 1599, image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=500&fit=crop", brand: "Tribal Trinkets", category: "jewellery" },
  { id: 14, name: "Personalized Gift Box", price: 1999, image: "https://images.unsplash.com/photo-1549465220-1a8b9238f760?w=400&h=500&fit=crop", brand: "Wrapped with Joy", category: "handmade-gifting" },
  { id: 15, name: "Terracotta Planter Set", price: 899, image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400&h=500&fit=crop", brand: "Clay & Fire", category: "pottery" },
  { id: 16, name: "Kantha Throw Blanket", price: 2299, image: "https://images.unsplash.com/photo-1616627561950-9f746e330187?w=400&h=500&fit=crop", brand: "Rangrez", category: "textiles" },
];

const Discover = () => {
  const isMobile = useIsMobile();
  const { toggleWishlist, isWishlisted } = useShop();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get("category") ?? "all";
  const [activeCategory, setActiveCategory] = useState(
    categories.some((c) => c.slug === initialCategory) ? initialCategory : "all",
  );
  const [activePriceRange, setActivePriceRange] = useState(0);
  const [activeSort, setActiveSort] = useState("newest");
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Keep URL in sync so deep links / back-button work
  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    if (activeCategory === "all") params.delete("category");
    else params.set("category", activeCategory);
    setSearchParams(params, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeCategory]);

  // React to URL changes (e.g. clicking a category link from elsewhere)
  useEffect(() => {
    const cat = searchParams.get("category") ?? "all";
    if (cat !== activeCategory && categories.some((c) => c.slug === cat)) {
      setActiveCategory(cat);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const filtered = useMemo(() => {
    let items = allProducts;
    if (activeCategory !== "all") {
      items = items.filter((p) => p.category === activeCategory);
    }
    const range = priceRanges[activePriceRange];
    items = items.filter((p) => p.price >= range.min && p.price <= range.max);
    if (activeSort === "price-asc") items = [...items].sort((a, b) => a.price - b.price);
    else if (activeSort === "price-desc") items = [...items].sort((a, b) => b.price - a.price);
    return items;
  }, [activeCategory, activePriceRange, activeSort]);

  const activeCategoryName = categories.find((c) => c.slug === activeCategory)?.name ?? "All";

  const Sidebar = () => (
    <div className="space-y-8">
      {/* Categories */}
      <div>
        <h3 className="mb-4 font-serif text-lg font-semibold text-foreground">Categories</h3>
        <ul className="space-y-1">
          {categories.map((cat) => (
            <li key={cat.slug}>
              <button
                onClick={() => setActiveCategory(cat.slug)}
                className={`w-full rounded-lg px-3 py-2 text-left text-sm font-medium transition-all ${
                  activeCategory === cat.slug
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                {cat.name}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Price */}
      <div>
        <h3 className="mb-4 font-serif text-lg font-semibold text-foreground">Price Range</h3>
        <ul className="space-y-1">
          {priceRanges.map((range, i) => (
            <li key={range.label}>
              <button
                onClick={() => setActivePriceRange(i)}
                className={`w-full rounded-lg px-3 py-2 text-left text-sm font-medium transition-all ${
                  activePriceRange === i
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                {range.label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Sort */}
      <div>
        <h3 className="mb-4 font-serif text-lg font-semibold text-foreground">Sort By</h3>
        <ul className="space-y-1">
          {sortOptions.map((opt) => (
            <li key={opt.value}>
              <button
                onClick={() => setActiveSort(opt.value)}
                className={`w-full rounded-lg px-3 py-2 text-left text-sm font-medium transition-all ${
                  activeSort === opt.value
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                {opt.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Header */}
      <section className="border-b border-border bg-card/50 py-10">
        <div className="container mx-auto px-4 lg:px-8">
          <h1 className="font-serif text-3xl font-bold text-foreground md:text-4xl">
            Discover
          </h1>
          <p className="mt-2 max-w-lg text-muted-foreground">
            Explore handcrafted treasures from India's finest artisan brands
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8 lg:px-8">
        {/* Mobile filter toggle */}
        {isMobile && (
          <div className="mb-6 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              {filtered.length} product{filtered.length !== 1 ? "s" : ""} in{" "}
              <span className="font-medium text-foreground">{activeCategoryName}</span>
            </p>
            <Button
              variant="outline"
              size="sm"
              className="gap-2 rounded-full"
              onClick={() => setMobileFilterOpen(true)}
            >
              <SlidersHorizontal className="h-4 w-4" /> Filters
            </Button>
          </div>
        )}

        {/* Mobile filter drawer */}
        <AnimatePresence>
          {isMobile && mobileFilterOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 bg-foreground/30 backdrop-blur-sm"
                onClick={() => setMobileFilterOpen(false)}
              />
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 250 }}
                className="fixed inset-y-0 left-0 z-50 w-72 overflow-y-auto bg-background p-6 shadow-xl"
              >
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="font-serif text-xl font-bold text-foreground">Filters</h2>
                  <Button variant="ghost" size="icon" onClick={() => setMobileFilterOpen(false)}>
                    <X className="h-5 w-5" />
                  </Button>
                </div>
                <Sidebar />
              </motion.div>
            </>
          )}
        </AnimatePresence>

        <div className="flex gap-10">
          {/* Desktop sidebar */}
          {!isMobile && (
            <aside className="w-56 shrink-0">
              <div className="sticky top-24">
                <Sidebar />
              </div>
            </aside>
          )}

          {/* Product grid */}
          <div className="flex-1">
            {!isMobile && (
              <div className="mb-6 flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  Showing <span className="font-medium text-foreground">{filtered.length}</span>{" "}
                  product{filtered.length !== 1 ? "s" : ""}
                </p>
              </div>
            )}

            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <p className="font-serif text-xl text-muted-foreground">No products found</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Try adjusting your filters
                </p>
                <Button
                  variant="outline"
                  className="mt-4 rounded-full"
                  onClick={() => {
                    setActiveCategory("all");
                    setActivePriceRange(0);
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
                {filtered.map((product, i) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.04 }}
                    className="group cursor-pointer"
                  >
                    <Link to={`/product/${product.id}`}>
                      <div className="relative overflow-hidden rounded-2xl">
                        <div className="aspect-[4/5] overflow-hidden bg-muted">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                            loading="lazy"
                          />
                        </div>
                        <button
                          className="absolute right-3 top-3 rounded-full bg-background/80 p-2 backdrop-blur-sm transition-colors hover:bg-background"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            toggleWishlist({ id: product.id, name: product.name, price: product.price, image: product.image, brand: product.brand });
                          }}
                          aria-label="Toggle wishlist"
                        >
                          <Heart className={`h-4 w-4 ${isWishlisted(product.id) ? "fill-destructive text-destructive" : "text-foreground"}`} />
                        </button>
                      </div>
                      <div className="mt-3 space-y-1">
                        <Link
                          to={`/brand/${slugify(product.brand)}`}
                          className="text-xs font-medium uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {product.brand}
                        </Link>
                        <h3 className="font-sans text-sm font-medium text-foreground line-clamp-1">
                          {product.name}
                        </h3>
                        <p className="font-sans text-sm font-semibold text-primary">
                          ₹{product.price.toLocaleString("en-IN")}
                        </p>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Discover;
