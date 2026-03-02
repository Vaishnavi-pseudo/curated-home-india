import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const reviews = [
  {
    name: "Priya M.",
    initials: "PM",
    quote:
      "The embroidered cushion covers I ordered are absolutely stunning. You can feel the craft and love in every stitch.",
  },
  {
    name: "Arjun S.",
    initials: "AS",
    quote:
      "As a seller, this platform gave my candle brand the visibility it deserved. Orders tripled in the first month!",
  },
  {
    name: "Meera K.",
    initials: "MK",
    quote:
      "Finally a marketplace that celebrates Indian artisans. The curation is impeccable and delivery was smooth.",
  },
];

const Stars = () => (
  <div className="flex gap-0.5 mb-3">
    {Array.from({ length: 5 }).map((_, i) => (
      <Star key={i} className="h-4 w-4 fill-primary text-primary" />
    ))}
  </div>
);

const CommunityReviews = () => {
  return (
    <section className="py-20 lg:py-28 bg-card border-t border-border">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground">
            What Our Community Says
          </h2>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto">
          {reviews.map((review, i) => (
            <motion.div
              key={review.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="rounded-xl border border-border bg-background p-6 shadow-sm"
            >
              <Stars />
              <p className="text-sm leading-relaxed text-foreground/85 mb-5">
                "{review.quote}"
              </p>
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="text-xs bg-primary/10 text-primary font-medium">
                    {review.initials}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium text-foreground">
                  {review.name}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CommunityReviews;
