import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const categories = [
  {
    name: "Embroidery",
    slug: "embroidery",
    image: "https://images.unsplash.com/photo-1617634643784-5745ec0e54dc?w=300&h=300&fit=crop",
  },
  {
    name: "Candles",
    slug: "candles",
    image: "https://images.unsplash.com/photo-1602607663604-59c816e08f1a?w=300&h=300&fit=crop",
  },
  {
    name: "Rugs",
    slug: "rugs",
    image: "https://images.unsplash.com/photo-1600166898405-da9535204843?w=300&h=300&fit=crop",
  },
  {
    name: "Handmade Gifting",
    slug: "handmade-gifting",
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e35a6?w=300&h=300&fit=crop",
  },
];

const CategoryBubbles = () => {
  return (
    <section className="bg-background py-10">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex justify-center gap-8 md:gap-14 overflow-x-auto scrollbar-hide pb-2">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.slug}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="flex flex-col items-center gap-2 flex-shrink-0"
            >
              <Link
                to={`/categories/${cat.slug}`}
                className="group flex flex-col items-center gap-2"
              >
                <div className="h-20 w-20 md:h-24 md:w-24 rounded-full overflow-hidden ring-2 ring-border transition-all duration-300 group-hover:ring-primary group-hover:ring-offset-2 group-hover:ring-offset-background group-hover:scale-105">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <span className="font-sans text-xs md:text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors text-center whitespace-nowrap">
                  {cat.name}
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryBubbles;
