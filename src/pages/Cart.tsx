import { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingBag, Trash2, Plus, Minus, ArrowLeft, Lock } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useShop } from "@/context/ShopContext";
import { useToast } from "@/hooks/use-toast";

const Cart = () => {
  const { cart, updateCartQty, removeFromCart, cartTotal, clearCart } = useShop();
  const { toast } = useToast();
  const [processing, setProcessing] = useState(false);

  const shipping = cartTotal >= 999 || cartTotal === 0 ? 0 : 90;
  const gst = Math.round(cartTotal * 0.18);
  const total = cartTotal + shipping + gst;

  const handleCheckout = () => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      toast({
        title: "Order placed!",
        description: `${cart.length} item(s) — ₹${total.toLocaleString("en-IN")}. (Demo checkout)`,
      });
      clearCart();
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-10 lg:px-8">
        <Link
          to="/categories"
          className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> Continue shopping
        </Link>

        <h1 className="font-serif text-3xl font-bold text-foreground md:text-4xl">
          Your Cart
        </h1>
        <p className="mt-2 text-muted-foreground">
          {cart.length} {cart.length === 1 ? "item" : "items"} ready for checkout
        </p>

        {cart.length === 0 ? (
          <div className="mt-10 flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card/50 py-24 text-center">
            <ShoppingBag className="mb-4 h-12 w-12 text-muted-foreground" />
            <h2 className="font-serif text-xl font-semibold text-foreground">
              Your cart is empty
            </h2>
            <p className="mt-2 max-w-sm text-sm text-muted-foreground">
              Browse our handcrafted treasures and add a few favourites.
            </p>
            <Link to="/categories">
              <Button className="mt-6 rounded-full">Explore products</Button>
            </Link>
          </div>
        ) : (
          <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_380px]">
            {/* Items list */}
            <div className="space-y-4">
              {cart.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className="flex gap-4 rounded-2xl border border-border bg-card p-4"
                >
                  <Link to={`/product/${item.id}`} className="shrink-0">
                    <div className="h-28 w-24 overflow-hidden rounded-xl bg-muted">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </Link>
                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        {item.brand}
                      </p>
                      <Link to={`/product/${item.id}`}>
                        <h3 className="font-sans text-sm font-semibold text-foreground line-clamp-2 hover:text-primary">
                          {item.name}
                        </h3>
                      </Link>
                      <p className="mt-1 font-serif text-base font-bold text-foreground">
                        ₹{item.price.toLocaleString("en-IN")}
                      </p>
                    </div>
                    <div className="mt-2 flex items-center justify-between">
                      <div className="flex items-center gap-0 rounded-full border border-border">
                        <button
                          onClick={() => updateCartQty(item.id, item.quantity - 1)}
                          className="rounded-l-full px-2.5 py-1.5 text-muted-foreground transition-colors hover:text-foreground"
                          aria-label="Decrease"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="w-8 text-center text-sm font-semibold text-foreground">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQty(item.id, item.quantity + 1)}
                          className="rounded-r-full px-2.5 py-1.5 text-muted-foreground transition-colors hover:text-foreground"
                          aria-label="Increase"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-destructive"
                      >
                        <Trash2 className="h-3.5 w-3.5" /> Remove
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Summary */}
            <aside className="h-fit rounded-2xl border border-border bg-card p-6 lg:sticky lg:top-24">
              <h2 className="font-serif text-lg font-semibold text-foreground">
                Order Summary
              </h2>
              <Separator className="my-4" />
              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span className="font-medium text-foreground">
                    ₹{cartTotal.toLocaleString("en-IN")}
                  </span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Shipping</span>
                  <span className="font-medium text-foreground">
                    {shipping === 0 ? "Free" : `₹${shipping}`}
                  </span>
                </div>
                {shipping > 0 && (
                  <p className="text-xs text-muted-foreground">
                    Add ₹{(999 - cartTotal).toLocaleString("en-IN")} more for free shipping
                  </p>
                )}
              </div>
              <Separator className="my-4" />
              <div className="flex items-baseline justify-between">
                <span className="text-sm font-semibold text-foreground">Total</span>
                <span className="font-serif text-2xl font-bold text-foreground">
                  ₹{total.toLocaleString("en-IN")}
                </span>
              </div>
              <Button
                className="mt-6 w-full gap-2 rounded-full py-6 text-base"
                onClick={handleCheckout}
                disabled={processing}
              >
                <Lock className="h-4 w-4" />
                {processing ? "Processing…" : "Proceed to Checkout"}
              </Button>
              <p className="mt-3 text-center text-[11px] text-muted-foreground">
                Secure checkout · Easy 7-day returns
              </p>
            </aside>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
