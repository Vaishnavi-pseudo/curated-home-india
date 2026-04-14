import { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, Instagram, Star, ArrowLeft, ExternalLink } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

/* ── mock brand data (will come from seller_profiles table later) ── */
const brands: Record<string, {
  name: string; story: string; location: string; instagram: string;
  logo: string; banner: string; verified: boolean; since: string;
  values: string[];
}> = {
  "the-stitch-studio": {
    name: "The Stitch Studio",
    story: "Born from a love of needle and thread, The Stitch Studio brings centuries-old Indian embroidery traditions — Chikankari, Phulkari, Zardozi — into contemporary living. Every stitch is placed by hand in small ateliers across Lucknow and Amritsar.",
    location: "Lucknow, India",
    instagram: "@thestitchstudio",
    logo: "https://images.unsplash.com/photo-1615874959474-d609969a20ed?w=120&h=120&fit=crop",
    banner: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1400&h=400&fit=crop",
    verified: true,
    since: "2021",
    values: ["Handcrafted", "Slow Fashion", "Women-led"],
  },
  "lumiere-candles": {
    name: "Lumière Candles",
    story: "Small-batch, hand-poured candles using 100% natural soy and coconut wax. We source essential oils directly from farmers in Grasse and Kerala, blending tradition with modern fragrance design.",
    location: "Pondicherry, India",
    instagram: "@lumierecandles",
    logo: "https://images.unsplash.com/photo-1602607663604-59c816e08f1a?w=120&h=120&fit=crop",
    banner: "https://images.unsplash.com/photo-1603006905003-be475563bc59?w=1400&h=400&fit=crop",
    verified: true,
    since: "2022",
    values: ["Eco-friendly", "Cruelty-free", "Vegan"],
  },
  "dharaa-rugs": {
    name: "Dharaa Rugs",
    story: "Dharaa partners with weaving communities in Rajasthan to create hand-knotted and flat-weave rugs that honour age-old techniques while fitting modern interiors. Fair wages, zero exploitation.",
    location: "Jaipur, India",
    instagram: "@dharaarugs",
    logo: "https://images.unsplash.com/photo-1600166898405-da9535204843?w=120&h=120&fit=crop",
    banner: "https://images.unsplash.com/photo-1600166898405-da9535204843?w=1400&h=400&fit=crop",
    verified: true,
    since: "2020",
    values: ["Fair Trade", "Sustainable", "Artisan-made"],
  },
  "clay-fire": {
    name: "Clay & Fire",
    story: "Ceramic studio rooted in the Jaipur Blue Pottery tradition. Every piece is hand-thrown, bisque-fired, and hand-painted with food-safe glazes. No two pieces are ever identical.",
    location: "Jaipur, India",
    instagram: "@clayandfire",
    logo: "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=120&h=120&fit=crop",
    banner: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=1400&h=400&fit=crop",
    verified: true,
    since: "2019",
    values: ["Handmade", "Heritage Craft", "Lead-free Glazes"],
  },
  "rangrez": {
    name: "Rangrez",
    story: "Block printing and natural dyeing from the heart of Bagru, Rajasthan. We use vegetable dyes — indigo, madder, turmeric — and hand-carved teak-wood blocks passed down through generations.",
    location: "Bagru, Rajasthan",
    instagram: "@rangrez_textiles",
    logo: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=120&h=120&fit=crop",
    banner: "https://images.unsplash.com/photo-1616627561950-9f746e330187?w=1400&h=400&fit=crop",
    verified: true,
    since: "2018",
    values: ["Natural Dyes", "Zero Waste", "Heritage"],
  },
  "knot-thread": {
    name: "Knot & Thread",
    story: "Modern macramé for modern spaces. We hand-knot every wall hanging, plant hanger, and table runner using organic cotton cord sourced from Tamil Nadu.",
    location: "Bangalore, India",
    instagram: "@knotandthread",
    logo: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=120&h=120&fit=crop",
    banner: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=1400&h=400&fit=crop",
    verified: false,
    since: "2023",
    values: ["Organic", "Minimalist", "Handmade"],
  },
};

/* slug helper */
const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

/* product data shared with Discover / ProductDetail */
const allProducts = [
  { id: 1, name: "Chikankari Cushion Cover Set", price: 1499, image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=500&fit=crop", brand: "The Stitch Studio", category: "Embroidery", rating: 4.8 },
  { id: 5, name: "Zardozi Clutch Bag", price: 1899, image: "https://images.unsplash.com/photo-1594897030264-ab7d87efc473?w=400&h=500&fit=crop", brand: "The Stitch Studio", category: "Embroidery", rating: 4.9 },
  { id: 8, name: "Phulkari Table Runner", price: 999, image: "https://images.unsplash.com/photo-1615874959474-d609969a20ed?w=400&h=500&fit=crop", brand: "The Stitch Studio", category: "Embroidery", rating: 4.8 },
  { id: 2, name: "Lavender Soy Wax Candle", price: 799, image: "https://images.unsplash.com/photo-1602607663604-59c816e08f1a?w=400&h=500&fit=crop", brand: "Lumière Candles", category: "Candles", rating: 4.6 },
  { id: 6, name: "Cinnamon & Clove Candle Trio", price: 1299, image: "https://images.unsplash.com/photo-1603006905003-be475563bc59?w=400&h=500&fit=crop", brand: "Lumière Candles", category: "Candles", rating: 4.5 },
  { id: 9, name: "Rose & Jasmine Candle", price: 599, image: "https://images.unsplash.com/photo-1572726729207-a78d6feb18d7?w=400&h=500&fit=crop", brand: "Lumière Candles", category: "Candles", rating: 4.4 },
  { id: 3, name: "Hand-Knotted Jute Rug", price: 3999, image: "https://images.unsplash.com/photo-1600166898405-da9535204843?w=400&h=500&fit=crop", brand: "Dharaa Rugs", category: "Rugs", rating: 4.9 },
  { id: 7, name: "Handwoven Dhurrie Runner", price: 2799, image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=500&fit=crop", brand: "Dharaa Rugs", category: "Rugs", rating: 4.7 },
  { id: 10, name: "Macramé Wall Hanging", price: 1799, image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=400&h=500&fit=crop", brand: "Knot & Thread", category: "Home Décor", rating: 4.8 },
  { id: 11, name: "Handpainted Ceramic Vase", price: 1299, image: "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=400&h=500&fit=crop", brand: "Clay & Fire", category: "Pottery", rating: 4.6 },
  { id: 15, name: "Terracotta Planter Set", price: 899, image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400&h=500&fit=crop", brand: "Clay & Fire", category: "Pottery", rating: 4.5 },
  { id: 12, name: "Block Print Saree", price: 3499, image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&h=500&fit=crop", brand: "Rangrez", category: "Textiles", rating: 4.9 },
  { id: 16, name: "Kantha Throw Blanket", price: 2299, image: "https://images.unsplash.com/photo-1616627561950-9f746e330187?w=400&h=500&fit=crop", brand: "Rangrez", category: "Textiles", rating: 4.8 },
];

const BrandProfile = () => {
  const { slug } = useParams();
  const brand = slug ? brands[slug] : undefined;

  const brandProducts = useMemo(
    () => (brand ? allProducts.filter((p) => p.brand === brand.name) : []),
    [brand],
  );

  const categoryGroups = useMemo(() => {
    const map: Record<string, typeof allProducts> = {};
    brandProducts.forEach((p) => {
      if (!map[p.category]) map[p.category] = [];
      map[p.category].push(p);
    });
    return map;
  }, [brandProducts]);

  if (!brand) {
    return (
      <div className="flex min-h-screen flex-col bg-background">
        <Navbar />
        <div className="flex flex-1 items-center justify-center">
          <div className="text-center">
            <h1 className="font-serif text-3xl font-bold text-foreground">Brand not found</h1>
            <Link to="/categories">
              <Button variant="outline" className="mt-4"><ArrowLeft className="mr-2 h-4 w-4" />Back to Discover</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const totalReviews = brandProducts.reduce((s, p) => s + (p.rating > 0 ? 1 : 0), 0);
  const avgRating = brandProducts.length
    ? (brandProducts.reduce((s, p) => s + p.rating, 0) / brandProducts.length).toFixed(1)
    : "0";

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />

      {/* ── Banner ── */}
      <div className="relative h-48 w-full overflow-hidden sm:h-64 lg:h-72">
        <img src={brand.banner} alt="" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent" />
      </div>

      {/* ── Brand Header ── */}
      <div className="container mx-auto -mt-16 px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-start gap-5 sm:flex-row sm:items-end"
        >
          <div className="h-28 w-28 shrink-0 overflow-hidden rounded-2xl border-4 border-background shadow-lg">
            <img src={brand.logo} alt={brand.name} className="h-full w-full object-cover" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h1 className="font-serif text-3xl font-bold text-foreground lg:text-4xl">{brand.name}</h1>
              {brand.verified && (
                <Badge className="bg-primary/10 text-primary border-primary/20">Verified</Badge>
              )}
            </div>
            <div className="mt-1 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{brand.location}</span>
              <span>Since {brand.since}</span>
              <span className="flex items-center gap-1"><Star className="h-3.5 w-3.5 fill-primary text-primary" />{avgRating} avg</span>
              <span>{brandProducts.length} products</span>
            </div>
          </div>
          <a href={`https://instagram.com/${brand.instagram.replace("@", "")}`} target="_blank" rel="noopener noreferrer">
            <Button variant="outline" size="sm" className="gap-2">
              <Instagram className="h-4 w-4" />{brand.instagram}<ExternalLink className="h-3 w-3" />
            </Button>
          </a>
        </motion.div>

        {/* ── Story + Values ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="mt-8 max-w-3xl"
        >
          <h2 className="font-serif text-xl font-semibold text-foreground">Our Story</h2>
          <p className="mt-2 leading-relaxed text-muted-foreground">{brand.story}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {brand.values.map((v) => (
              <Badge key={v} variant="secondary" className="text-xs">{v}</Badge>
            ))}
          </div>
        </motion.div>

        <Separator className="my-10" />

        {/* ── Products by category ── */}
        <div className="pb-16">
          {Object.entries(categoryGroups).map(([cat, products], idx) => (
            <motion.section
              key={cat}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + idx * 0.1 }}
              className="mb-12"
            >
              <h3 className="font-serif text-2xl font-semibold text-foreground">{cat}</h3>
              <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                {products.map((product) => (
                  <Link key={product.id} to={`/product/${product.id}`} className="group">
                    <div className="overflow-hidden rounded-xl border border-border bg-card transition-shadow hover:shadow-md">
                      <div className="aspect-[4/5] overflow-hidden">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <div className="p-3">
                        <p className="text-sm font-medium text-foreground line-clamp-1">{product.name}</p>
                        <div className="mt-1 flex items-center justify-between">
                          <span className="font-semibold text-foreground">₹{product.price.toLocaleString("en-IN")}</span>
                          <span className="flex items-center gap-0.5 text-xs text-muted-foreground">
                            <Star className="h-3 w-3 fill-primary text-primary" />{product.rating}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </motion.section>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default BrandProfile;
