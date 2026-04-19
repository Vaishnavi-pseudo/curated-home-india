import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { slugify } from "@/lib/slug";
import { useShop } from "@/context/ShopContext";

const products = [
  { id: 1, name: "Chikankari Cushion Cover Set", price: 1499, image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=500&fit=crop", brand: "The Stitch Studio", category: "Embroidery" },
  { id: 2, name: "Lavender Soy Wax Candle", price: 799, image: "https://images.unsplash.com/photo-1602607663604-59c816e08f1a?w=400&h=500&fit=crop", brand: "Lumière Candles", category: "Candles" },
  { id: 3, name: "Hand-Knotted Jute Rug", price: 3999, image: "https://images.unsplash.com/photo-1600166898405-da9535204843?w=400&h=500&fit=crop", brand: "Dharaa Rugs", category: "Rugs" },
  { id: 4, name: "Artisan Gift Hamper", price: 2499, image: "https://images.unsplash.com/photo-1513519245088-0e12902e35a6?w=400&h=500&fit=crop", brand: "Wrapped with Joy", category: "Gifting" },
  { id: 5, name: "Zardozi Clutch Bag", price: 1899, image: "https://images.unsplash.com/photo-1594897030264-ab7d87efc473?w=400&h=500&fit=crop", brand: "Kashmiri Weaves", category: "Embroidery" },
  { id: 6, name: "Cinnamon & Clove Candle Trio", price: 1299, image: "https://images.unsplash.com/photo-1603006905003-be475563bc59?w=400&h=500&fit=crop", brand: "Lumière Candles", category: "Candles" },
];

const NewArrivals = () => {
  const { toggleWishlist, isWishlisted } = useShop();
  return (
    <section className="bg-background py-20">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="mb-12 flex items-end justify-between">
          <div>
            <h2 className="font-serif text-3xl font-bold text-foreground md:text-4xl">
              New Arrivals
            </h2>
            <p className="mt-3 text-muted-foreground">
              Fresh finds from our artisan community
            </p>
          </div>
          <Link to="/categories">
            <Button variant="outline" className="hidden rounded-full font-sans text-sm md:inline-flex">
              View All
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
          {products.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group cursor-pointer"
            >
              <Link to={`/product/${product.id}`} className="block">
                <div className="relative overflow-hidden rounded-2xl">
                  <div className="aspect-[4/5] overflow-hidden bg-sand">
                    <img
                      src={product.image}
                      alt={product.name}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      toggleWishlist({ id: product.id, name: product.name, price: product.price, image: product.image, brand: product.brand });
                    }}
                    aria-label="Toggle wishlist"
                    className="absolute right-3 top-3 rounded-full bg-background/80 p-2 backdrop-blur-sm transition-colors hover:bg-background"
                  >
                    <Heart className={`h-4 w-4 ${isWishlisted(product.id) ? "fill-destructive text-destructive" : "text-foreground"}`} />
                  </button>
                </div>
                <div className="mt-3 space-y-1">
                  <Link
                    to={`/brand/${slugify(product.brand)}`}
                    onClick={(e) => e.stopPropagation()}
                    className="text-xs font-medium uppercase tracking-wider text-muted-foreground transition-colors hover:text-primary"
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
      </div>
    </section>
  );
};

export default NewArrivals;
