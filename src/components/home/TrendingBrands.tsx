import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { BadgeCheck, Instagram } from "lucide-react";
import { slugify } from "@/lib/slug";

const brands = [
  { name: "The Stitch Studio", category: "Embroidery", handle: "@thestitchstudio", image: "https://images.unsplash.com/photo-1594897030264-ab7d87efc473?w=300&h=300&fit=crop", verified: true },
  { name: "Lumière Candles", category: "Candles", handle: "@lumierecandles", image: "https://images.unsplash.com/photo-1603006905003-be475563bc59?w=300&h=300&fit=crop", verified: true },
  { name: "Dharaa Rugs", category: "Rugs", handle: "@dharaarugs", image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=300&fit=crop", verified: true },
  { name: "Clay & Fire", category: "Pottery", handle: "@clayandfire", image: "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=300&h=300&fit=crop", verified: true },
  { name: "Rangrez", category: "Textiles", handle: "@rangrez_textiles", image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=300&h=300&fit=crop", verified: true },
  { name: "Knot & Thread", category: "Home Décor", handle: "@knotandthread", image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=300&h=300&fit=crop", verified: false },
];

const TrendingBrands = () => {
  return (
    <section className="bg-card py-20">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="font-serif text-3xl font-bold text-foreground md:text-4xl">
            Trending Brands
          </h2>
          <p className="mt-3 text-muted-foreground">
            The artisans everyone is talking about
          </p>
        </div>

        <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
          {brands.map((brand, i) => (
            <motion.div
              key={brand.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="min-w-[220px] flex-shrink-0"
            >
              <Link
                to={`/brand/${slugify(brand.name)}`}
                className="group block rounded-2xl border border-border bg-background p-5 text-center transition-shadow duration-300 hover:shadow-lg"
              >
                <div className="mx-auto mb-4 h-24 w-24 overflow-hidden rounded-full border-2 border-sand">
                  <img
                    src={brand.image}
                    alt={brand.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <div className="flex items-center justify-center gap-1">
                  <h3 className="font-serif text-base font-semibold text-foreground">
                    {brand.name}
                  </h3>
                  {brand.verified && (
                    <BadgeCheck className="h-4 w-4 text-primary" />
                  )}
                </div>
                <p className="mt-1 text-xs text-muted-foreground">{brand.category}</p>
                <div className="mt-2 flex items-center justify-center gap-1 text-xs text-muted-foreground">
                  <Instagram className="h-3 w-3" />
                  {brand.handle}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingBrands;
