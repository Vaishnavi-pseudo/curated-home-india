import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { useState } from "react";
import { toast } from "sonner";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast.success("Thanks for subscribing! We'll keep you updated.");
      setEmail("");
    }
  };

  return (
    <section className="bg-primary py-20 text-primary-foreground">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="font-serif text-3xl font-bold md:text-4xl">
            Stay in the Loop
          </h2>
          <p className="mt-4 text-primary-foreground/80">
            Get early access to new brands, exclusive drops, and curated picks delivered to your inbox.
          </p>
          <form onSubmit={handleSubmit} className="mx-auto mt-8 flex max-w-md gap-3">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-full border-primary-foreground/20 bg-primary-foreground/10 text-primary-foreground placeholder:text-primary-foreground/50 focus-visible:ring-primary-foreground/30"
              required
            />
            <Button
              type="submit"
              variant="secondary"
              className="rounded-full px-6 font-sans text-sm font-semibold"
            >
              Subscribe
            </Button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default NewsletterSection;
