import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-accent to-warm-beige">
      <div className="container mx-auto px-4 py-24 lg:px-8 lg:py-36">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8"
          >
            <div className="inline-block rounded-full bg-primary/10 px-4 py-1.5">
              <span className="text-xs font-semibold uppercase tracking-widest text-primary">
                Curated • Handmade • Authentic
              </span>
            </div>
            <h1 className="font-serif text-4xl font-bold leading-tight tracking-tight text-foreground md:text-5xl lg:text-6xl">
              Discover India's Finest{" "}
              <span className="text-primary">Homegrown</span> Brands
            </h1>
            <p className="max-w-lg text-lg leading-relaxed text-muted-foreground">
              A curated marketplace connecting you with handpicked Instagram artisans — 
              from hand-embroidered textiles to artisanal candles and handwoven rugs.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/categories">
                <Button size="lg" className="gap-2 rounded-full px-8 font-sans text-sm font-semibold">
                  Explore Collections
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/sell">
                <Button variant="outline" size="lg" className="rounded-full px-8 font-sans text-sm font-semibold">
                  Sell on Kalakriti
                </Button>
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="relative hidden lg:block"
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <Link to="/categories?category=embroidery" className="block aspect-[3/4] overflow-hidden rounded-2xl bg-sand">
                  <img
                    src="https://images.unsplash.com/photo-1617634643784-5745ec0e54dc?w=400&h=530&fit=crop"
                    alt="Handmade embroidery"
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </Link>
                <Link to="/categories?category=candles" className="block aspect-square overflow-hidden rounded-2xl bg-sand">
                  <img
                    src="https://images.unsplash.com/photo-1602607663604-59c816e08f1a?w=400&h=400&fit=crop"
                    alt="Artisanal candles"
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </Link>
              </div>
              <div className="mt-8 space-y-4">
                <Link to="/categories?category=rugs" className="block aspect-square overflow-hidden rounded-2xl bg-sand">
                  <img
                    src="https://images.unsplash.com/photo-1600166898405-da9535204843?w=400&h=400&fit=crop"
                    alt="Handwoven rug"
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </Link>
                <Link to="/categories?category=handmade-gifting" className="block aspect-[3/4] overflow-hidden rounded-2xl bg-sand">
                  <img
                    src="https://images.unsplash.com/photo-1513519245088-0e12902e35a6?w=400&h=530&fit=crop"
                    alt="Handmade gifts"
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
