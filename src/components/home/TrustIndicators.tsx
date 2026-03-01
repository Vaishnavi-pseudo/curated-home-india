import { BadgeCheck, ShieldCheck, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const indicators = [
  { icon: BadgeCheck, title: "Verified Sellers", desc: "Every brand is vetted and approved by our curation team" },
  { icon: ShieldCheck, title: "Secure Payments", desc: "Bank-grade encryption for every transaction" },
  { icon: Sparkles, title: "Curated Platform", desc: "Only the finest homegrown brands, handpicked for you" },
];

const TrustIndicators = () => {
  return (
    <section className="border-y border-border bg-card py-16">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          {indicators.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="flex flex-col items-center text-center"
            >
              <div className="mb-4 rounded-full bg-primary/10 p-4">
                <item.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-serif text-lg font-semibold text-foreground">{item.title}</h3>
              <p className="mt-2 max-w-xs text-sm text-muted-foreground">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustIndicators;
