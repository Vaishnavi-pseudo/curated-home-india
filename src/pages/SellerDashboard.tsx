import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import {
  Package, TrendingDown, Tag, Eye, EyeOff, LogOut, Store,
  Search, Filter, MoreVertical, IndianRupee, AlertTriangle,
  CheckCircle2, XCircle, Edit2, Save, X
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import type { Tables } from "@/integrations/supabase/types";

type Product = Tables<"products">;
type SellerProfile = Tables<"seller_profiles">;

interface EditingState {
  productId: string;
  field: "price" | "compare_at_price" | "stock_quantity";
  value: string;
}

const SellerDashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [sellerProfile, setSellerProfile] = useState<SellerProfile | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "active" | "inactive" | "out-of-stock">("all");
  const [editing, setEditing] = useState<EditingState | null>(null);
  const [savingId, setSavingId] = useState<string | null>(null);

  useEffect(() => {
    checkSellerAccess();
  }, []);

  const checkSellerAccess = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate("/sell");
      return;
    }

    const { data: profile, error } = await supabase
      .from("seller_profiles")
      .select("*")
      .eq("user_id", session.user.id)
      .maybeSingle();

    if (error || !profile) {
      toast.error("You don't have a seller profile yet.");
      navigate("/sell/apply");
      return;
    }

    setSellerProfile(profile);
    await fetchProducts(profile.id);
    setLoading(false);
  };

  const fetchProducts = async (sellerId: string) => {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("seller_id", sellerId)
      .order("created_at", { ascending: false });

    if (!error && data) {
      setProducts(data);
    }
  };

  const toggleProductActive = async (product: Product) => {
    setSavingId(product.id);
    const { error } = await supabase
      .from("products")
      .update({ is_active: !product.is_active })
      .eq("id", product.id);

    if (error) {
      toast.error("Failed to update product status");
    } else {
      setProducts(prev =>
        prev.map(p => p.id === product.id ? { ...p, is_active: !p.is_active } : p)
      );
      toast.success(product.is_active ? "Product delisted" : "Product relisted");
    }
    setSavingId(null);
  };

  const markOutOfStock = async (product: Product) => {
    setSavingId(product.id);
    const { error } = await supabase
      .from("products")
      .update({ stock_quantity: 0 })
      .eq("id", product.id);

    if (error) {
      toast.error("Failed to update stock");
    } else {
      setProducts(prev =>
        prev.map(p => p.id === product.id ? { ...p, stock_quantity: 0 } : p)
      );
      toast.success("Marked as out of stock");
    }
    setSavingId(null);
  };

  const saveFieldEdit = async (productId: string) => {
    if (!editing) return;
    setSavingId(productId);

    const numValue = parseFloat(editing.value);
    if (isNaN(numValue) || numValue < 0) {
      toast.error("Please enter a valid number");
      setSavingId(null);
      return;
    }

    const updateData: Partial<Product> = {};
    if (editing.field === "price") updateData.price = numValue;
    if (editing.field === "compare_at_price") updateData.compare_at_price = numValue > 0 ? numValue : null;
    if (editing.field === "stock_quantity") updateData.stock_quantity = Math.floor(numValue);

    const { error } = await supabase
      .from("products")
      .update(updateData)
      .eq("id", productId);

    if (error) {
      toast.error("Failed to update");
    } else {
      setProducts(prev =>
        prev.map(p => p.id === productId ? { ...p, ...updateData } : p)
      );
      toast.success("Updated successfully");
    }
    setEditing(null);
    setSavingId(null);
  };

  const putOnSale = async (product: Product) => {
    if (!product.compare_at_price) {
      // Set compare_at_price to current price, reduce price by 20%
      const salePrice = Math.round(product.price * 0.8);
      setSavingId(product.id);
      const { error } = await supabase
        .from("products")
        .update({ compare_at_price: product.price, price: salePrice })
        .eq("id", product.id);

      if (error) {
        toast.error("Failed to put on sale");
      } else {
        setProducts(prev =>
          prev.map(p => p.id === product.id
            ? { ...p, compare_at_price: product.price, price: salePrice }
            : p
          )
        );
        toast.success("Product is now on sale (20% off)");
      }
      setSavingId(null);
    } else {
      // Remove sale
      setSavingId(product.id);
      const { error } = await supabase
        .from("products")
        .update({ price: product.compare_at_price, compare_at_price: null })
        .eq("id", product.id);

      if (error) {
        toast.error("Failed to remove sale");
      } else {
        setProducts(prev =>
          prev.map(p => p.id === product.id
            ? { ...p, price: product.compare_at_price!, compare_at_price: null }
            : p
          )
        );
        toast.success("Sale removed");
      }
      setSavingId(null);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    if (filterStatus === "active") return matchesSearch && p.is_active && p.stock_quantity > 0;
    if (filterStatus === "inactive") return matchesSearch && !p.is_active;
    if (filterStatus === "out-of-stock") return matchesSearch && p.stock_quantity === 0;
    return matchesSearch;
  });

  const stats = {
    total: products.length,
    active: products.filter(p => p.is_active && p.stock_quantity > 0).length,
    outOfStock: products.filter(p => p.stock_quantity === 0).length,
    onSale: products.filter(p => p.compare_at_price !== null).length,
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex items-center justify-center py-32">
          <div className="animate-pulse text-muted-foreground font-sans">Loading your store...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Store className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h1 className="font-serif text-2xl font-bold text-foreground">
                  {sellerProfile?.brand_name}
                </h1>
                <p className="text-sm text-muted-foreground font-sans">Seller Dashboard</p>
              </div>
              {sellerProfile?.is_verified && (
                <Badge className="bg-primary/10 text-primary border-primary/20 font-sans">
                  <CheckCircle2 className="mr-1 h-3 w-3" /> Verified
                </Badge>
              )}
            </div>
          </div>
          <Button variant="outline" onClick={handleLogout} className="font-sans gap-2">
            <LogOut className="h-4 w-4" /> Sign Out
          </Button>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4"
        >
          {[
            { label: "Total Products", value: stats.total, icon: Package, color: "text-foreground" },
            { label: "Active Listings", value: stats.active, icon: CheckCircle2, color: "text-green-600" },
            { label: "Out of Stock", value: stats.outOfStock, icon: AlertTriangle, color: "text-destructive" },
            { label: "On Sale", value: stats.onSale, icon: Tag, color: "text-primary" },
          ].map((stat) => (
            <Card key={stat.label} className="border-border bg-card">
              <CardContent className="flex items-center gap-3 p-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted">
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-xs text-muted-foreground font-sans">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* Search & Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6 flex flex-col gap-3 sm:flex-row"
        >
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search your products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 font-sans"
            />
          </div>
          <div className="flex gap-2">
            {(["all", "active", "inactive", "out-of-stock"] as const).map((status) => (
              <Button
                key={status}
                variant={filterStatus === status ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterStatus(status)}
                className="font-sans capitalize text-xs"
              >
                {status === "out-of-stock" ? "Out of Stock" : status}
              </Button>
            ))}
          </div>
        </motion.div>

        {/* Products List */}
        {filteredProducts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-20 text-center"
          >
            <Package className="mx-auto mb-4 h-12 w-12 text-muted-foreground/50" />
            <p className="text-lg text-muted-foreground font-sans">
              {products.length === 0
                ? "No products yet. Your listings will appear here once approved."
                : "No products match your filters."}
            </p>
          </motion.div>
        ) : (
          <div className="space-y-4">
            <AnimatePresence>
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className={`border-border bg-card overflow-hidden transition-all ${
                    !product.is_active ? "opacity-60" : ""
                  } ${product.stock_quantity === 0 ? "border-destructive/30" : ""}`}>
                    <CardContent className="p-0">
                      <div className="flex flex-col sm:flex-row">
                        {/* Product Image */}
                        <div className="relative h-40 w-full shrink-0 sm:h-auto sm:w-36">
                          {product.images && product.images.length > 0 ? (
                            <img
                              src={product.images[0]}
                              alt={product.name}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center bg-muted">
                              <Package className="h-8 w-8 text-muted-foreground" />
                            </div>
                          )}
                          {!product.is_active && (
                            <div className="absolute inset-0 flex items-center justify-center bg-background/70">
                              <Badge variant="secondary" className="font-sans">Delisted</Badge>
                            </div>
                          )}
                          {product.is_active && product.stock_quantity === 0 && (
                            <div className="absolute inset-0 flex items-center justify-center bg-background/70">
                              <Badge variant="destructive" className="font-sans">Out of Stock</Badge>
                            </div>
                          )}
                          {product.compare_at_price && (
                            <div className="absolute top-2 left-2">
                              <Badge className="bg-destructive text-destructive-foreground font-sans text-xs">
                                SALE
                              </Badge>
                            </div>
                          )}
                        </div>

                        {/* Product Details */}
                        <div className="flex flex-1 flex-col justify-between p-4">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <h3 className="font-serif text-lg font-semibold text-foreground">
                                {product.name}
                              </h3>
                              {product.description && (
                                <p className="mt-1 text-sm text-muted-foreground font-sans line-clamp-1">
                                  {product.description}
                                </p>
                              )}
                            </div>

                            {/* Price Display/Edit */}
                            <div className="text-right">
                              {editing?.productId === product.id && editing.field === "price" ? (
                                <div className="flex items-center gap-1">
                                  <span className="text-sm text-muted-foreground">₹</span>
                                  <Input
                                    value={editing.value}
                                    onChange={(e) => setEditing({ ...editing, value: e.target.value })}
                                    className="h-8 w-24 text-right font-sans text-sm"
                                    autoFocus
                                    onKeyDown={(e) => {
                                      if (e.key === "Enter") saveFieldEdit(product.id);
                                      if (e.key === "Escape") setEditing(null);
                                    }}
                                  />
                                  <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => saveFieldEdit(product.id)}>
                                    <Save className="h-3 w-3" />
                                  </Button>
                                  <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => setEditing(null)}>
                                    <X className="h-3 w-3" />
                                  </Button>
                                </div>
                              ) : (
                                <div
                                  className="cursor-pointer group"
                                  onClick={() => setEditing({ productId: product.id, field: "price", value: String(product.price) })}
                                >
                                  <div className="flex items-center gap-1">
                                    <span className="text-lg font-bold text-foreground">₹{product.price.toLocaleString()}</span>
                                    <Edit2 className="h-3 w-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                                  </div>
                                  {product.compare_at_price && (
                                    <span className="text-sm text-muted-foreground line-through">
                                      ₹{product.compare_at_price.toLocaleString()}
                                    </span>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Stock & Actions Row */}
                          <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-border pt-3">
                            {/* Stock Quantity */}
                            <div className="flex items-center gap-2 mr-auto">
                              <span className="text-xs text-muted-foreground font-sans">Stock:</span>
                              {editing?.productId === product.id && editing.field === "stock_quantity" ? (
                                <div className="flex items-center gap-1">
                                  <Input
                                    value={editing.value}
                                    onChange={(e) => setEditing({ ...editing, value: e.target.value })}
                                    className="h-7 w-16 text-center font-sans text-xs"
                                    autoFocus
                                    type="number"
                                    onKeyDown={(e) => {
                                      if (e.key === "Enter") saveFieldEdit(product.id);
                                      if (e.key === "Escape") setEditing(null);
                                    }}
                                  />
                                  <Button size="icon" variant="ghost" className="h-6 w-6" onClick={() => saveFieldEdit(product.id)}>
                                    <Save className="h-3 w-3" />
                                  </Button>
                                </div>
                              ) : (
                                <button
                                  onClick={() => setEditing({ productId: product.id, field: "stock_quantity", value: String(product.stock_quantity) })}
                                  className={`text-sm font-medium font-sans hover:underline ${
                                    product.stock_quantity === 0 ? "text-destructive" : "text-foreground"
                                  }`}
                                >
                                  {product.stock_quantity} units
                                </button>
                              )}
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-wrap gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                className="font-sans text-xs gap-1 h-8"
                                onClick={() => putOnSale(product)}
                                disabled={savingId === product.id}
                              >
                                <Tag className="h-3 w-3" />
                                {product.compare_at_price ? "Remove Sale" : "Put on Sale"}
                              </Button>

                              {product.stock_quantity > 0 && (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="font-sans text-xs gap-1 h-8 text-destructive hover:text-destructive"
                                  onClick={() => markOutOfStock(product)}
                                  disabled={savingId === product.id}
                                >
                                  <XCircle className="h-3 w-3" />
                                  Out of Stock
                                </Button>
                              )}

                              <div className="flex items-center gap-2 rounded-md border border-border px-2 py-1">
                                <span className="text-xs text-muted-foreground font-sans">
                                  {product.is_active ? "Listed" : "Delisted"}
                                </span>
                                <Switch
                                  checked={product.is_active}
                                  onCheckedChange={() => toggleProductActive(product)}
                                  disabled={savingId === product.id}
                                  className="scale-75"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
};

export default SellerDashboard;
