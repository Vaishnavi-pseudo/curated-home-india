import { motion } from "framer-motion";

const words = ["Customised", "Artisan", "Handmade", "Loved"];

const MarqueeContent = () => (
  <div className="flex items-center gap-0 whitespace-nowrap">
    {Array.from({ length: 2 }).map((_, groupIdx) =>
      words.map((word, i) => (
        <span key={`${groupIdx}-${i}`} className="flex items-center">
          <span className="font-serif text-lg md:text-xl tracking-wide text-foreground px-6 md:px-10">
            {word}
          </span>
          <span className="text-xs text-muted-foreground">•</span>
        </span>
      ))
    )}
  </div>
);

const MarqueeBar = () => {
  return (
    <section className="overflow-hidden border-y border-border bg-secondary/50 py-4">
      <div className="flex">
        <motion.div
          className="flex"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 20,
              ease: "linear",
            },
          }}
        >
          <MarqueeContent />
          <MarqueeContent />
        </motion.div>
      </div>
    </section>
  );
};

export default MarqueeBar;
