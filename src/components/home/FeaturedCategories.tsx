import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const categories = [
  {
    name: "Embroidery",
    slug: "embroidery",
    image: "https://images.unsplash.com/photo-1617634643784-5745ec0e54dc?w=600&h=700&fit=crop",
    description: "Hand-stitched artistry",
  },
  {
    name: "Candles",
    slug: "candles",
    image: "https://images.unsplash.com/photo-1602607663604-59c816e08f1a?w=600&h=700&fit=crop",
    description: "Artisanal fragrances",
  },
  {
    name: "Rugs",
    slug: "rugs",
    image: "https://images.unsplash.com/photo-1600166898405-da9535204843?w=600&h=700&fit=crop",
    description: "Handwoven traditions",
  },
  {
    name: "Handmade Gifting",
    slug: "handmade-gifting",
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e35a6?w=600&h=700&fit=crop",
    description: "Curated with love",
  },
];

const FeaturedCategories = () => {
  return (
    <section className="bg-background py-20">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="font-serif text-3xl font-bold text-foreground md:text-4xl">
            Shop by Category
          </h2>
          <p className="mt-3 text-muted-foreground">
            Explore handpicked collections from India's finest artisan brands
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Link
                to={`/categories/${cat.slug}`}
                className="group relative block overflow-hidden rounded-2xl"
              >
                <div className="aspect-[3/4] overflow-hidden">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 p-5">
                  <h3 className="font-serif text-lg font-semibold text-white md:text-xl">
                    {cat.name}
                  </h3>
                  <p className="text-sm text-white/80">{cat.description}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories;
