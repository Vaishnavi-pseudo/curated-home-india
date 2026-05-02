import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { Heart, Palette, Package, Users, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-accent to-warm-beige">
        <div className="container mx-auto px-4 py-20 text-center lg:py-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
              Our Story
            </span>
            <h1 className="mt-6 font-serif text-4xl font-bold text-foreground md:text-5xl lg:text-6xl">
              Where Craft Meets <span className="text-primary">Community</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              sol.finds exists at the intersection of passion and purpose — bridging the gap 
              between India's most talented makers and the people who value what they create.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Section A: The Sellers / Makers */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mx-auto max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5">
                <Palette className="h-4 w-4 text-primary" />
                <span className="text-xs font-semibold uppercase tracking-widest text-primary">The Makers</span>
              </div>
              <h2 className="font-serif text-3xl font-bold text-foreground md:text-4xl">
                Artisans Who Pour Their Soul Into Every Piece
              </h2>
              <p className="text-lg leading-relaxed text-muted-foreground">
                Behind every product on sol.finds is a maker with calloused hands and a restless imagination. 
                They aren't factories — they're dreamers who turned their kitchen tables into workshops, 
                their balconies into dyeing stations, their spare rooms into studios.
              </p>
              <p className="text-lg leading-relaxed text-muted-foreground">
                From hand-embroidered textiles passed down through generations to contemporary candle 
                artisans experimenting with indigenous scents — our sellers represent the beautiful 
                spectrum of India's creative spirit.
              </p>
              <div className="grid grid-cols-2 gap-6 pt-4">
                <div className="rounded-2xl border border-border bg-card p-5">
                  <Heart className="mb-3 h-6 w-6 text-primary" />
                  <h4 className="font-serif font-semibold text-foreground">Handcrafted</h4>
                  <p className="mt-1 text-sm text-muted-foreground">Every product is made with intention, not mass-produced</p>
                </div>
                <div className="rounded-2xl border border-border bg-card p-5">
                  <Package className="mb-3 h-6 w-6 text-primary" />
                  <h4 className="font-serif font-semibold text-foreground">Authentic</h4>
                  <p className="mt-1 text-sm text-muted-foreground">Real stories, real people, real craft traditions</p>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Divider Quote */}
      <section className="bg-gradient-to-r from-primary/5 via-accent to-primary/5 py-16">
        <div className="container mx-auto px-4 text-center">
          <motion.blockquote
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mx-auto max-w-3xl font-serif text-2xl italic leading-relaxed text-foreground md:text-3xl"
          >
            "You make things. That's the job. Hand us the chaos, keep the craft."
          </motion.blockquote>
        </div>
      </section>

      {/* Section B: We, The Brand — sol.finds */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="order-2 lg:order-1"
            >
              <div className="relative mx-auto max-w-md">
                <div className="aspect-square overflow-hidden rounded-3xl bg-gradient-to-br from-primary/10 to-accent">
                  <div className="flex h-full flex-col items-center justify-center p-10 text-center">
                    <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
                      <Users className="h-10 w-10 text-primary" />
                    </div>
                    <h3 className="font-serif text-2xl font-bold text-foreground">sol.finds</h3>
                    <p className="mt-2 text-sm text-muted-foreground">कला + कृति — Art + Creation</p>
                    <div className="mt-6 grid grid-cols-3 gap-4 text-center">
                      <div>
                        <p className="font-serif text-2xl font-bold text-primary">50+</p>
                        <p className="text-xs text-muted-foreground">Makers</p>
                      </div>
                      <div>
                        <p className="font-serif text-2xl font-bold text-primary">500+</p>
                        <p className="text-xs text-muted-foreground">Products</p>
                      </div>
                      <div>
                        <p className="font-serif text-2xl font-bold text-primary">10+</p>
                        <p className="text-xs text-muted-foreground">Categories</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="order-1 space-y-6 lg:order-2"
            >
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5">
                <Users className="h-4 w-4 text-primary" />
                <span className="text-xs font-semibold uppercase tracking-widest text-primary">The Brand</span>
              </div>
              <h2 className="font-serif text-3xl font-bold text-foreground md:text-4xl">
                We're the Conduit, Not the Creator
              </h2>
              <p className="text-lg leading-relaxed text-muted-foreground">
                sol.finds is not another e-commerce platform. We are a curated bridge — connecting 
                India's most talented homegrown artisans with people who believe in buying with meaning.
              </p>
              <p className="text-lg leading-relaxed text-muted-foreground">
                We handle the logistics, the storefront, the discovery — so makers can focus on what 
                they do best: creating. We vet every seller, photograph every story, and ensure every 
                purchase supports a real human being and their craft.
              </p>
              <p className="text-lg leading-relaxed text-muted-foreground">
                Our role is simple: amplify the maker, simplify the buying, and make sure beautiful 
                things find the homes they deserve.
              </p>
              <div className="pt-4">
                <Link to="/sell">
                  <Button size="lg" className="gap-2 rounded-full px-8 font-sans text-sm font-semibold">
                    Join as a Maker
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
