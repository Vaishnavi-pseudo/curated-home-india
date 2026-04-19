import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const WeeklyMaker = () => {
  return (
    <section className="py-20 lg:py-28">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground">
            This Week's Maker
          </h2>
          <p className="mt-3 text-muted-foreground max-w-lg mx-auto">
            Hand-poured soy candles inspired by the colours and scents of rural India.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="relative rounded-2xl overflow-hidden bg-card border border-border max-w-4xl mx-auto"
        >
          {/* Banner image */}
          <div className="aspect-[16/7] w-full bg-gradient-to-br from-primary/20 via-accent/40 to-secondary flex items-end justify-center relative">
            <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />
            <div className="relative z-10 pb-8 text-center">
              <span className="inline-block font-serif text-4xl md:text-5xl font-bold text-foreground tracking-tight">
                Mitti & Wax
              </span>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-5">
            <p className="text-sm text-muted-foreground text-center sm:text-left">
              Jaipur-based studio crafting eco-friendly candles with indigenous fragrances.
            </p>
            <Link to="/brand/lumiere-candles">
              <Button className="gap-2 shrink-0">
                Explore Brand <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WeeklyMaker;
