import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  ShoppingCart,
  Zap,
  Upload,
  X,
  ChevronLeft,
  ChevronRight,
  Star,
  Truck,
  Shield,
  RefreshCw,
  Palette,
  Sparkles,
  Plus,
  Minus,
  MessageCircle,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { useShop } from "@/context/ShopContext";
import BrandChatDrawer from "@/components/chat/BrandChatDrawer";

// Same product data as Discover page — later will come from DB
const allProducts = [
  { id: 1, name: "Chikankari Cushion Cover Set", price: 1499, comparePrice: 1999, image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=1000&fit=crop", images: ["https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=1000&fit=crop", "https://images.unsplash.com/photo-1615874959474-d609969a20ed?w=800&h=1000&fit=crop"], brand: "The Stitch Studio", category: "embroidery", customizable: true, description: "Exquisitely hand-embroidered Chikankari cushion covers crafted by artisans from Lucknow. Each piece features traditional motifs with delicate shadow work on fine cotton fabric.", colors: ["Ivory", "Powder Blue", "Blush Pink", "Sage Green"], rating: 4.8, reviews: 42 },
  { id: 2, name: "Lavender Soy Wax Candle", price: 799, comparePrice: null, image: "https://images.unsplash.com/photo-1602607663604-59c816e08f1a?w=800&h=1000&fit=crop", images: ["https://images.unsplash.com/photo-1602607663604-59c816e08f1a?w=800&h=1000&fit=crop", "https://images.unsplash.com/photo-1572726729207-a78d6feb18d7?w=800&h=1000&fit=crop"], brand: "Lumière Candles", category: "candles", customizable: false, description: "Hand-poured soy wax candle infused with pure French lavender essential oil. Burns for 45+ hours with a clean, toxin-free flame.", colors: [], rating: 4.6, reviews: 28 },
  { id: 3, name: "Hand-Knotted Jute Rug", price: 3999, comparePrice: 5499, image: "https://images.unsplash.com/photo-1600166898405-da9535204843?w=800&h=1000&fit=crop", images: ["https://images.unsplash.com/photo-1600166898405-da9535204843?w=800&h=1000&fit=crop", "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=1000&fit=crop"], brand: "Dharaa Rugs", category: "rugs", customizable: true, description: "Sustainably sourced jute fibers hand-knotted by skilled weavers from Rajasthan. This rug brings warmth and texture to any living space.", colors: ["Natural", "Charcoal", "Indigo"], rating: 4.9, reviews: 17 },
  { id: 4, name: "Artisan Gift Hamper", price: 2499, comparePrice: null, image: "https://images.unsplash.com/photo-1513519245088-0e12902e35a6?w=800&h=1000&fit=crop", images: ["https://images.unsplash.com/photo-1513519245088-0e12902e35a6?w=800&h=1000&fit=crop", "https://images.unsplash.com/photo-1549465220-1a8b9238f760?w=800&h=1000&fit=crop"], brand: "Wrapped with Joy", category: "handmade-gifting", customizable: true, description: "A curated hamper of artisan goodies — handmade soaps, organic teas, scented candles, and hand-painted cards. Perfect for gifting.", colors: [], rating: 4.7, reviews: 35 },
  { id: 5, name: "Zardozi Clutch Bag", price: 1899, comparePrice: 2499, image: "https://images.unsplash.com/photo-1594897030264-ab7d87efc473?w=800&h=1000&fit=crop", images: ["https://images.unsplash.com/photo-1594897030264-ab7d87efc473?w=800&h=1000&fit=crop"], brand: "Kashmiri Weaves", category: "embroidery", customizable: true, description: "Opulent Zardozi-embroidered clutch featuring gold and silver metallic threadwork on rich silk. A statement piece for weddings and special occasions.", colors: ["Midnight Blue", "Maroon", "Emerald"], rating: 4.9, reviews: 21 },
  { id: 6, name: "Cinnamon & Clove Candle Trio", price: 1299, comparePrice: null, image: "https://images.unsplash.com/photo-1603006905003-be475563bc59?w=800&h=1000&fit=crop", images: ["https://images.unsplash.com/photo-1603006905003-be475563bc59?w=800&h=1000&fit=crop"], brand: "Lumière Candles", category: "candles", customizable: false, description: "Set of three hand-poured candles blending warm cinnamon, clove, and a hint of vanilla. Perfect for creating a cosy atmosphere.", colors: [], rating: 4.5, reviews: 19 },
  { id: 7, name: "Handwoven Dhurrie Runner", price: 2799, comparePrice: 3499, image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=1000&fit=crop", images: ["https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=1000&fit=crop"], brand: "Dharaa Rugs", category: "rugs", customizable: true, description: "Flat-weave cotton dhurrie in geometric patterns, handwoven on traditional pit looms. Reversible design for twice the life.", colors: ["Blue & White", "Rust & Cream", "Grey & Mustard"], rating: 4.7, reviews: 12 },
  { id: 8, name: "Phulkari Table Runner", price: 999, comparePrice: null, image: "https://images.unsplash.com/photo-1615874959474-d609969a20ed?w=800&h=1000&fit=crop", images: ["https://images.unsplash.com/photo-1615874959474-d609969a20ed?w=800&h=1000&fit=crop"], brand: "The Stitch Studio", category: "embroidery", customizable: true, description: "Vibrant Phulkari embroidery on cotton, featuring traditional Punjabi floral motifs in silk thread. A splash of colour for your dining table.", colors: ["Multi", "Red & Gold", "Pink & Orange"], rating: 4.8, reviews: 31 },
  { id: 9, name: "Rose & Jasmine Candle", price: 599, comparePrice: null, image: "https://images.unsplash.com/photo-1572726729207-a78d6feb18d7?w=800&h=1000&fit=crop", images: ["https://images.unsplash.com/photo-1572726729207-a78d6feb18d7?w=800&h=1000&fit=crop"], brand: "Lumière Candles", category: "candles", customizable: false, description: "Delicate blend of Indian rose and night jasmine in coconut-soy wax. A romantic, long-lasting fragrance.", colors: [], rating: 4.4, reviews: 23 },
  { id: 10, name: "Macramé Wall Hanging", price: 1799, comparePrice: 2299, image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&h=1000&fit=crop", images: ["https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&h=1000&fit=crop"], brand: "Knot & Thread", category: "home-decor", customizable: true, description: "Handcrafted macramé wall hanging using 100% natural cotton cord. Each piece takes 8-10 hours to knot by hand.", colors: ["Natural", "Terracotta", "Sage"], rating: 4.8, reviews: 38 },
  { id: 11, name: "Handpainted Ceramic Vase", price: 1299, comparePrice: null, image: "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=800&h=1000&fit=crop", images: ["https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=800&h=1000&fit=crop"], brand: "Clay & Fire", category: "pottery", customizable: true, description: "Each vase is hand-thrown on a potter's wheel and painted with food-safe glazes in the traditional Jaipur Blue Pottery style.", colors: ["Classic Blue", "Turquoise", "White"], rating: 4.6, reviews: 15 },
  { id: 12, name: "Block Print Saree", price: 3499, comparePrice: 4299, image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&h=1000&fit=crop", images: ["https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&h=1000&fit=crop"], brand: "Rangrez", category: "textiles", customizable: false, description: "Hand block-printed saree using natural vegetable dyes on pure cotton mulmul. Each print is carved on teak wood blocks.", colors: ["Indigo", "Madder Red", "Turmeric Yellow"], rating: 4.9, reviews: 44 },
  { id: 13, name: "Silver Filigree Earrings", price: 1599, comparePrice: null, image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&h=1000&fit=crop", images: ["https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&h=1000&fit=crop"], brand: "Tribal Trinkets", category: "jewellery", customizable: false, description: "Intricate silver filigree earrings handcrafted by Odisha silversmiths using centuries-old techniques. Lightweight and hypoallergenic.", colors: [], rating: 4.7, reviews: 27 },
  { id: 14, name: "Personalized Gift Box", price: 1999, comparePrice: null, image: "https://images.unsplash.com/photo-1549465220-1a8b9238f760?w=800&h=1000&fit=crop", images: ["https://images.unsplash.com/photo-1549465220-1a8b9238f760?w=800&h=1000&fit=crop"], brand: "Wrapped with Joy", category: "handmade-gifting", customizable: true, description: "Fully personalized gift box — choose the contents, add a handwritten note, and we'll wrap it beautifully.", colors: [], rating: 4.8, reviews: 52 },
  { id: 15, name: "Terracotta Planter Set", price: 899, comparePrice: 1199, image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=800&h=1000&fit=crop", images: ["https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=800&h=1000&fit=crop"], brand: "Clay & Fire", category: "pottery", customizable: false, description: "Set of three hand-shaped terracotta planters in graduating sizes. Unglazed exterior with a water-resistant interior coating.", colors: [], rating: 4.5, reviews: 20 },
  { id: 16, name: "Kantha Throw Blanket", price: 2299, comparePrice: 2999, image: "https://images.unsplash.com/photo-1616627561950-9f746e330187?w=800&h=1000&fit=crop", images: ["https://images.unsplash.com/photo-1616627561950-9f746e330187?w=800&h=1000&fit=crop"], brand: "Rangrez", category: "textiles", customizable: false, description: "Vintage-inspired Kantha throw stitched from layers of recycled cotton sarees. Each piece is one-of-a-kind.", colors: ["Multi-colour"], rating: 4.8, reviews: 33 },
];

const creativityOptions = [
  { label: "Follow my reference closely", value: "strict", icon: "📐" },
  { label: "Use it as inspiration", value: "inspired", icon: "💡" },
  { label: "Full creative freedom", value: "free", icon: "🎨" },
];

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { addToCart, toggleWishlist, isWishlisted } = useShop();

  const product = allProducts.find((p) => p.id === Number(id));

  const [currentImage, setCurrentImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [referenceImages, setReferenceImages] = useState<File[]>([]);
  const [referencePreview, setReferencePreview] = useState<string[]>([]);
  const [creativityLevel, setCreativityLevel] = useState("inspired");
  const [customNotes, setCustomNotes] = useState("");
  const [chatOpen, setChatOpen] = useState(false);
  const wishlisted = product ? isWishlisted(product.id) : false;

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex flex-col items-center justify-center py-32 text-center">
          <h1 className="font-serif text-3xl font-bold text-foreground">Product Not Found</h1>
          <p className="mt-2 text-muted-foreground">The product you're looking for doesn't exist.</p>
          <Button className="mt-6 rounded-full" onClick={() => navigate("/categories")}>
            Back to Discover
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (referenceImages.length + files.length > 5) {
      toast({ title: "Maximum 5 reference images allowed", variant: "destructive" });
      return;
    }
    setReferenceImages((prev) => [...prev, ...files]);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setReferencePreview((prev) => [...prev, ev.target?.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeReferenceImage = (index: number) => {
    setReferenceImages((prev) => prev.filter((_, i) => i !== index));
    setReferencePreview((prev) => prev.filter((_, i) => i !== index));
  };

  const handleAddToCart = () => {
    addToCart(
      { id: product.id, name: product.name, price: product.price, image: product.image, brand: product.brand },
      quantity,
    );
  };

  const handleBuyNow = () => {
    addToCart(
      { id: product.id, name: product.name, price: product.price, image: product.image, brand: product.brand },
      quantity,
    );
    navigate("/cart");
  };

  const discount = product.comparePrice
    ? Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)
    : null;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8 lg:px-8">
        {/* Breadcrumb */}
        <button
          onClick={() => navigate("/categories")}
          className="mb-6 flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ChevronLeft className="h-4 w-4" /> Back to Discover
        </button>

        <div className="grid gap-10 lg:grid-cols-2">
          {/* Image Gallery */}
          <div className="space-y-4">
            <motion.div
              key={currentImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-muted"
            >
              <img
                src={product.images[currentImage]}
                alt={product.name}
                className="h-full w-full object-cover"
              />
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={() => setCurrentImage((prev) => (prev === 0 ? product.images.length - 1 : prev - 1))}
                    className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-background/80 p-2 backdrop-blur-sm transition-colors hover:bg-background"
                  >
                    <ChevronLeft className="h-5 w-5 text-foreground" />
                  </button>
                  <button
                    onClick={() => setCurrentImage((prev) => (prev === product.images.length - 1 ? 0 : prev + 1))}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-background/80 p-2 backdrop-blur-sm transition-colors hover:bg-background"
                  >
                    <ChevronRight className="h-5 w-5 text-foreground" />
                  </button>
                </>
              )}
              {discount && (
                <Badge className="absolute left-3 top-3 bg-destructive text-destructive-foreground">
                  -{discount}%
                </Badge>
              )}
            </motion.div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentImage(i)}
                    className={`h-20 w-20 overflow-hidden rounded-xl border-2 transition-all ${
                      currentImage === i ? "border-primary" : "border-transparent opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img src={img} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                {product.brand}
              </p>
              <h1 className="mt-1 font-serif text-2xl font-bold text-foreground md:text-3xl">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="mt-3 flex items-center gap-2">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(product.rating)
                          ? "fill-primary text-primary"
                          : "text-border"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm font-medium text-foreground">{product.rating}</span>
                <span className="text-sm text-muted-foreground">({product.reviews} reviews)</span>
              </div>
            </div>

            {/* Price */}
            <div className="flex flex-col gap-1">
              <span className="text-xs uppercase tracking-wider text-muted-foreground">Starting from</span>
              <div className="flex items-baseline gap-3">
                <span className="font-serif text-3xl font-bold text-foreground">
                  ₹{product.price.toLocaleString("en-IN")}
                </span>
                {product.comparePrice && (
                  <span className="text-lg text-muted-foreground line-through">
                    ₹{product.comparePrice.toLocaleString("en-IN")}
                  </span>
                )}
              </div>
            </div>

            <p className="leading-relaxed text-muted-foreground">{product.description}</p>

            <Separator />

            {/* Color Selection */}
            {product.colors.length > 0 && (
              <div>
                <h3 className="mb-3 text-sm font-semibold text-foreground">
                  <Palette className="mr-1.5 inline h-4 w-4" />
                  Colour
                  {selectedColor && (
                    <span className="ml-2 font-normal text-muted-foreground">— {selectedColor}</span>
                  )}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`rounded-full border px-4 py-2 text-sm font-medium transition-all ${
                        selectedColor === color
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Customization Section */}
            {product.customizable && (
              <div className="space-y-5 rounded-2xl border border-border bg-card p-5">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  <h3 className="font-serif text-lg font-semibold text-foreground">
                    Customise This Product
                  </h3>
                </div>

                {/* Reference Images */}
                <div>
                  <p className="mb-2 text-sm font-medium text-foreground">
                    Upload Reference Images{" "}
                    <span className="font-normal text-muted-foreground">(optional, max 5)</span>
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {referencePreview.map((src, i) => (
                      <div key={i} className="group relative h-20 w-20 overflow-hidden rounded-xl border border-border">
                        <img src={src} alt="" className="h-full w-full object-cover" />
                        <button
                          onClick={() => removeReferenceImage(i)}
                          className="absolute inset-0 flex items-center justify-center bg-foreground/50 opacity-0 transition-opacity group-hover:opacity-100"
                        >
                          <X className="h-4 w-4 text-background" />
                        </button>
                      </div>
                    ))}
                    {referenceImages.length < 5 && (
                      <label className="flex h-20 w-20 cursor-pointer flex-col items-center justify-center gap-1 rounded-xl border-2 border-dashed border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary">
                        <Upload className="h-5 w-5" />
                        <span className="text-[10px] font-medium">Add</span>
                        <input
                          type="file"
                          accept="image/*"
                          multiple
                          className="hidden"
                          onChange={handleImageUpload}
                        />
                      </label>
                    )}
                  </div>
                </div>

                {/* Creativity Freedom */}
                <div>
                  <p className="mb-2 text-sm font-medium text-foreground">Creative Freedom</p>
                  <div className="grid gap-2 sm:grid-cols-3">
                    {creativityOptions.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => setCreativityLevel(opt.value)}
                        className={`rounded-xl border px-3 py-3 text-left text-sm transition-all ${
                          creativityLevel === opt.value
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-border text-muted-foreground hover:border-foreground"
                        }`}
                      >
                        <span className="text-lg">{opt.icon}</span>
                        <p className="mt-1 font-medium leading-tight">{opt.label}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <p className="mb-2 text-sm font-medium text-foreground">
                    Special Instructions{" "}
                    <span className="font-normal text-muted-foreground">(optional)</span>
                  </p>
                  <textarea
                    value={customNotes}
                    onChange={(e) => setCustomNotes(e.target.value)}
                    placeholder="E.g., initials to embroider, preferred motif, size adjustments…"
                    rows={3}
                    className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="flex items-center gap-4">
              <span className="text-sm font-semibold text-foreground">Quantity</span>
              <div className="flex items-center gap-0 rounded-full border border-border">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="rounded-l-full px-3 py-2 text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-10 text-center text-sm font-semibold text-foreground">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="rounded-r-full px-3 py-2 text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button
                className="flex-1 gap-2 rounded-full py-6 text-base"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="h-5 w-5" /> Add to Cart
              </Button>
              <Button
                variant="outline"
                className="flex-1 gap-2 rounded-full border-primary py-6 text-base text-primary hover:bg-primary hover:text-primary-foreground"
                onClick={handleBuyNow}
              >
                <Zap className="h-5 w-5" /> Buy Now
              </Button>
              <Button
                variant="outline"
                size="icon"
                aria-label="Chat with brand"
                title="Chat with brand about customisation"
                className="h-auto rounded-full border-border px-3 py-3 text-muted-foreground hover:border-primary hover:text-primary"
                onClick={() => setChatOpen(true)}
              >
                <MessageCircle className="h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className={`h-auto rounded-full px-3 py-3 ${
                  wishlisted
                    ? "border-destructive bg-destructive/10 text-destructive"
                    : "border-border text-muted-foreground"
                }`}
                onClick={() => {
                  toggleWishlist({ id: product.id, name: product.name, price: product.price, image: product.image, brand: product.brand });
                }}
              >
                <Heart className={`h-5 w-5 ${wishlisted ? "fill-current" : ""}`} />
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-3 gap-4 rounded-2xl border border-border bg-card p-4">
              <div className="flex flex-col items-center gap-1 text-center">
                <Truck className="h-5 w-5 text-primary" />
                <p className="text-xs font-medium text-foreground">Free Shipping</p>
                <p className="text-[10px] text-muted-foreground">Above ₹999</p>
              </div>
              <div className="flex flex-col items-center gap-1 text-center">
                <Shield className="h-5 w-5 text-primary" />
                <p className="text-xs font-medium text-foreground">Authentic</p>
                <p className="text-[10px] text-muted-foreground">Handcrafted</p>
              </div>
              <div className="flex flex-col items-center gap-1 text-center">
                <RefreshCw className="h-5 w-5 text-primary" />
                <p className="text-xs font-medium text-foreground">Easy Returns</p>
                <p className="text-[10px] text-muted-foreground">7-day policy</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <BrandChatDrawer
        open={chatOpen}
        onOpenChange={setChatOpen}
        target={{
          brandName: product.brand,
          productKey: product.id,
          productName: product.name,
          productImage: product.image,
        }}
      />

      <Footer />
    </div>
  );
};

export default ProductDetail;
