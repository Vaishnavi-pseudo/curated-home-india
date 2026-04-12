import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, X, CheckCircle2, ArrowLeft, Plus, Trash2 } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import type { Tables } from "@/integrations/supabase/types";

type Category = Tables<"categories">;

interface ProductEntry {
  id: string;
  name: string;
  price: string;
  imageFiles: File[];
  imagePreviews: string[];
}

const createEmptyProduct = (): ProductEntry => ({
  id: crypto.randomUUID(),
  name: "",
  price: "",
  imageFiles: [],
  imagePreviews: [],
});

const SellerApply = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<ProductEntry[]>([createEmptyProduct()]);
  const [form, setForm] = useState({
    brandName: "",
    instagramHandle: "",
    brandStory: "",
    categoryId: "",
    customCategory: "",
    businessArea: "",
    productDescription: "",
  });

  const isOtherCategory = form.categoryId === "__other__";

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { navigate("/sell"); return; }
      const { data: existing } = await supabase
        .from("seller_applications")
        .select("id, status")
        .eq("user_id", session.user.id)
        .maybeSingle();
      if (existing) setSubmitted(true);
    };
    const fetchCategories = async () => {
      const { data } = await supabase.from("categories").select("*");
      if (data) setCategories(data);
    };
    checkAuth();
    fetchCategories();
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) navigate("/sell");
    });
    return () => subscription.unsubscribe();
  }, [navigate]);

  // Product management
  const addProduct = () => {
    if (products.length >= 10) { toast.error("Maximum 10 products allowed"); return; }
    setProducts((prev) => [...prev, createEmptyProduct()]);
  };

  const removeProduct = (id: string) => {
    if (products.length <= 1) return;
    setProducts((prev) => {
      const p = prev.find((x) => x.id === id);
      p?.imagePreviews.forEach((url) => URL.revokeObjectURL(url));
      return prev.filter((x) => x.id !== id);
    });
  };

  const updateProduct = (id: string, field: keyof ProductEntry, value: string) => {
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, [field]: value } : p)));
  };

  const handleProductImage = (productId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id !== productId) return p;
        if (p.imageFiles.length + files.length > 3) {
          toast.error("Maximum 3 images per product");
          return p;
        }
        const newPreviews = files.map((f) => URL.createObjectURL(f));
        return {
          ...p,
          imageFiles: [...p.imageFiles, ...files],
          imagePreviews: [...p.imagePreviews, ...newPreviews],
        };
      })
    );
  };

  const removeProductImage = (productId: string, index: number) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id !== productId) return p;
        URL.revokeObjectURL(p.imagePreviews[index]);
        return {
          ...p,
          imageFiles: p.imageFiles.filter((_, i) => i !== index),
          imagePreviews: p.imagePreviews.filter((_, i) => i !== index),
        };
      })
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (products.some((p) => !p.name.trim() || !p.price.trim())) {
      toast.error("Please fill in name and price for all products");
      return;
    }
    setLoading(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error("Not authenticated");

      // Collect all images as data URLs
      const allImageUrls: string[] = [];
      for (const product of products) {
        for (const file of product.imageFiles) {
          const url = await new Promise<string>((resolve) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.readAsDataURL(file);
          });
          allImageUrls.push(url);
        }
      }

      // Build product details text
      const productLines = products
        .map((p, i) => `Product ${i + 1}: ${p.name} — ₹${p.price}`)
        .join("\n");

      const categoryLabel = isOtherCategory ? form.customCategory : "";
      const brandStoryFull = [
        form.brandStory,
        `\nBusiness Area: ${form.businessArea}`,
        `Product Description: ${form.productDescription}`,
        `\n--- Product Listings ---\n${productLines}`,
        categoryLabel ? `Custom Category: ${categoryLabel}` : "",
      ].filter(Boolean).join("\n");

      const { error } = await supabase.from("seller_applications").insert({
        user_id: session.user.id,
        brand_name: form.brandName,
        instagram_handle: form.instagramHandle,
        brand_story: brandStoryFull,
        category_id: isOtherCategory ? null : form.categoryId || null,
        sample_images: allImageUrls.length > 0 ? allImageUrls : null,
      });

      if (error) throw error;
      setSubmitted(true);
      toast.success("Application submitted successfully!");
    } catch (error: any) {
      toast.error(error.message || "Failed to submit application");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto flex items-center justify-center px-4 py-20">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-md text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <CheckCircle2 className="h-8 w-8 text-primary" />
            </div>
            <h2 className="font-serif text-2xl font-bold text-foreground">Application Submitted!</h2>
            <p className="mt-3 text-muted-foreground">
              Thank you for applying to sell on Kalakriti. Our team will review your application and get back to you within 3–5 business days.
            </p>
            <Button onClick={() => navigate("/")} className="mt-8 rounded-full px-8 font-sans">Back to Home</Button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mx-auto max-w-2xl">
          <button onClick={() => navigate(-1)} className="mb-6 flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          <div className="mb-8">
            <h1 className="font-serif text-3xl font-bold text-foreground">Seller Application</h1>
            <p className="mt-3 max-w-xl font-serif text-base italic leading-relaxed text-muted-foreground">
              You make things. That's the job. Not scheduling posts, not responding to "is this still available?", not chasing payments. Hand us the chaos, keep the craft.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Brand Details Card */}
            <Card className="border-border bg-card shadow-lg">
              <CardHeader>
                <CardTitle className="font-serif text-xl">Brand Details</CardTitle>
                <CardDescription>Share your story and what makes your brand special.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="brandName">Brand Name *</Label>
                    <Input id="brandName" placeholder="Your brand name" value={form.brandName} onChange={(e) => setForm({ ...form, brandName: e.target.value })} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="instagram">Instagram Handle *</Label>
                    <Input id="instagram" placeholder="@yourbrand" value={form.instagramHandle} onChange={(e) => setForm({ ...form, instagramHandle: e.target.value })} required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Product Category</Label>
                  <Select value={form.categoryId} onValueChange={(val) => setForm({ ...form, categoryId: val, customCategory: val === "__other__" ? form.customCategory : "" })}>
                    <SelectTrigger><SelectValue placeholder="Select a category" /></SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                      ))}
                      <SelectItem value="__other__">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <AnimatePresence>
                    {isOtherCategory && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }}>
                        <Input className="mt-2" placeholder="Enter your product category" value={form.customCategory} onChange={(e) => setForm({ ...form, customCategory: e.target.value })} required />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="businessArea">Area of Business *</Label>
                  <Input id="businessArea" placeholder="e.g., Jaipur, Rajasthan" value={form.businessArea} onChange={(e) => setForm({ ...form, businessArea: e.target.value })} required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="brandStory">Brand Story</Label>
                  <Textarea id="brandStory" placeholder="Tell us about your journey, inspiration, and craft..." value={form.brandStory} onChange={(e) => setForm({ ...form, brandStory: e.target.value })} rows={3} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="productDescription">Overall Product Description *</Label>
                  <Textarea id="productDescription" placeholder="Describe the kinds of products you make — materials, techniques, uniqueness..." value={form.productDescription} onChange={(e) => setForm({ ...form, productDescription: e.target.value })} rows={3} required />
                </div>
              </CardContent>
            </Card>

            {/* Products Card */}
            <Card className="border-border bg-card shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="font-serif text-xl">Your Products</CardTitle>
                    <CardDescription>Add individual products with photos and pricing.</CardDescription>
                  </div>
                  <Button type="button" variant="outline" size="sm" onClick={addProduct} className="gap-1.5 rounded-full text-xs">
                    <Plus className="h-3.5 w-3.5" /> Add Product
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <AnimatePresence initial={false}>
                  {products.map((product, idx) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                      transition={{ duration: 0.25 }}
                      className="relative rounded-xl border border-border bg-muted/30 p-4"
                    >
                      {products.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeProduct(product.id)}
                          className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}

                      <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Product {idx + 1}
                      </p>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label>Product Name *</Label>
                          <Input placeholder="e.g., Hand-embroidered Cushion Cover" value={product.name} onChange={(e) => updateProduct(product.id, "name", e.target.value)} required />
                        </div>
                        <div className="space-y-2">
                          <Label>Price (₹) *</Label>
                          <Input placeholder="e.g., 1200" type="number" min="0" value={product.price} onChange={(e) => updateProduct(product.id, "price", e.target.value)} required />
                        </div>
                      </div>

                      <div className="mt-4 space-y-2">
                        <Label>Product Images (up to 3)</Label>
                        <div className="flex flex-wrap gap-2">
                          {product.imagePreviews.map((src, i) => (
                            <div key={i} className="relative h-20 w-20 overflow-hidden rounded-lg border border-border">
                              <img src={src} alt={`Product ${idx + 1} image ${i + 1}`} className="h-full w-full object-cover" />
                              <button type="button" onClick={() => removeProductImage(product.id, i)} className="absolute right-0.5 top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-foreground/70 text-background">
                                <X className="h-3 w-3" />
                              </button>
                            </div>
                          ))}
                          {product.imageFiles.length < 3 && (
                            <label className="flex h-20 w-20 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary">
                              <Upload className="mb-0.5 h-4 w-4" />
                              <span className="text-[9px] font-medium">Upload</span>
                              <input type="file" accept="image/*" multiple className="hidden" onChange={(e) => handleProductImage(product.id, e)} />
                            </label>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </CardContent>
            </Card>

            <Button type="submit" className="w-full rounded-full font-sans text-sm" size="lg" disabled={loading}>
              {loading ? "Submitting..." : "Submit Application"}
            </Button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default SellerApply;
