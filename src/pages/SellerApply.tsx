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
import { motion } from "framer-motion";
import { Upload, X, CheckCircle2, ArrowLeft } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import type { Tables } from "@/integrations/supabase/types";

type Category = Tables<"categories">;

const SellerApply = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [form, setForm] = useState({
    brandName: "",
    instagramHandle: "",
    brandStory: "",
    categoryId: "",
    businessArea: "",
    productDescription: "",
    priceRange: "",
  });

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/sell");
        return;
      }
      // Check if already applied
      const { data: existing } = await supabase
        .from("seller_applications")
        .select("id, status")
        .eq("user_id", session.user.id)
        .maybeSingle();
      if (existing) {
        setSubmitted(true);
      }
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

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (imageFiles.length + files.length > 5) {
      toast.error("Maximum 5 images allowed");
      return;
    }
    const newFiles = [...imageFiles, ...files];
    setImageFiles(newFiles);
    const previews = files.map((f) => URL.createObjectURL(f));
    setImagePreviews((prev) => [...prev, ...previews]);
  };

  const removeImage = (index: number) => {
    URL.revokeObjectURL(imagePreviews[index]);
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error("Not authenticated");

      // Upload sample images if any
      const sampleImageUrls: string[] = [];
      for (const file of imageFiles) {
        const ext = file.name.split(".").pop();
        const path = `${session.user.id}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
        // Store as base64 data URLs for now (no storage bucket configured)
        const reader = new FileReader();
        const url = await new Promise<string>((resolve) => {
          reader.onload = () => resolve(reader.result as string);
          reader.readAsDataURL(file);
        });
        sampleImageUrls.push(url);
      }

      const { error } = await supabase.from("seller_applications").insert({
        user_id: session.user.id,
        brand_name: form.brandName,
        instagram_handle: form.instagramHandle,
        brand_story: `${form.brandStory}\n\nBusiness Area: ${form.businessArea}\nProduct Description: ${form.productDescription}\nPrice Range: ${form.priceRange}`,
        category_id: form.categoryId || null,
        sample_images: sampleImageUrls.length > 0 ? sampleImageUrls : null,
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
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md text-center"
          >
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <CheckCircle2 className="h-8 w-8 text-primary" />
            </div>
            <h2 className="font-serif text-2xl font-bold text-foreground">Application Submitted!</h2>
            <p className="mt-3 text-muted-foreground">
              Thank you for applying to sell on Kalakriti. Our team will review your application
              and get back to you within 3–5 business days.
            </p>
            <Button onClick={() => navigate("/")} className="mt-8 rounded-full px-8 font-sans">
              Back to Home
            </Button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl"
        >
          <button
            onClick={() => navigate(-1)}
            className="mb-6 flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>

          <div className="mb-8">
            <h1 className="font-serif text-3xl font-bold text-foreground">Seller Application</h1>
            <p className="mt-2 text-muted-foreground">
              Tell us about your brand and products. We carefully curate every seller on Kalakriti.
            </p>
          </div>

          <Card className="border-border bg-card shadow-lg">
            <CardHeader>
              <CardTitle className="font-serif text-xl">Brand Details</CardTitle>
              <CardDescription>Share your story and what makes your products special.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Brand Name */}
                <div className="space-y-2">
                  <Label htmlFor="brandName">Brand Name *</Label>
                  <Input
                    id="brandName"
                    placeholder="Your brand name"
                    value={form.brandName}
                    onChange={(e) => setForm({ ...form, brandName: e.target.value })}
                    required
                  />
                </div>

                {/* Instagram Handle */}
                <div className="space-y-2">
                  <Label htmlFor="instagram">Instagram Handle *</Label>
                  <Input
                    id="instagram"
                    placeholder="@yourbrand"
                    value={form.instagramHandle}
                    onChange={(e) => setForm({ ...form, instagramHandle: e.target.value })}
                    required
                  />
                </div>

                {/* Category */}
                <div className="space-y-2">
                  <Label>Product Category</Label>
                  <Select
                    value={form.categoryId}
                    onValueChange={(val) => setForm({ ...form, categoryId: val })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat.id} value={cat.id}>
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Business Area */}
                <div className="space-y-2">
                  <Label htmlFor="businessArea">Area of Business *</Label>
                  <Input
                    id="businessArea"
                    placeholder="e.g., Jaipur, Rajasthan"
                    value={form.businessArea}
                    onChange={(e) => setForm({ ...form, businessArea: e.target.value })}
                    required
                  />
                </div>

                {/* Brand Story */}
                <div className="space-y-2">
                  <Label htmlFor="brandStory">Brand Story</Label>
                  <Textarea
                    id="brandStory"
                    placeholder="Tell us about your journey, inspiration, and craft..."
                    value={form.brandStory}
                    onChange={(e) => setForm({ ...form, brandStory: e.target.value })}
                    rows={4}
                  />
                </div>

                {/* Product Description */}
                <div className="space-y-2">
                  <Label htmlFor="productDescription">Product Description *</Label>
                  <Textarea
                    id="productDescription"
                    placeholder="Describe the products you want to sell — materials, techniques, uniqueness..."
                    value={form.productDescription}
                    onChange={(e) => setForm({ ...form, productDescription: e.target.value })}
                    rows={3}
                    required
                  />
                </div>

                {/* Price Range */}
                <div className="space-y-2">
                  <Label htmlFor="priceRange">Price Range *</Label>
                  <Input
                    id="priceRange"
                    placeholder="e.g., ₹500 – ₹5,000"
                    value={form.priceRange}
                    onChange={(e) => setForm({ ...form, priceRange: e.target.value })}
                    required
                  />
                </div>

                {/* Product Images */}
                <div className="space-y-3">
                  <Label>Sample Product Images (up to 5)</Label>
                  <div className="flex flex-wrap gap-3">
                    {imagePreviews.map((src, i) => (
                      <div
                        key={i}
                        className="relative h-24 w-24 overflow-hidden rounded-xl border border-border"
                      >
                        <img src={src} alt={`Sample ${i + 1}`} className="h-full w-full object-cover" />
                        <button
                          type="button"
                          onClick={() => removeImage(i)}
                          className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-foreground/70 text-background"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                    {imageFiles.length < 5 && (
                      <label className="flex h-24 w-24 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary">
                        <Upload className="mb-1 h-5 w-5" />
                        <span className="text-[10px] font-medium">Upload</span>
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

                <Button
                  type="submit"
                  className="w-full rounded-full font-sans text-sm"
                  size="lg"
                  disabled={loading}
                >
                  {loading ? "Submitting..." : "Submit Application"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default SellerApply;
