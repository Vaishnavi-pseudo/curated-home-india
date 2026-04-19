import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { toast } from "@/hooks/use-toast";

export type ShopItem = {
  id: number;
  name: string;
  price: number;
  image: string;
  brand: string;
};

export type CartItem = ShopItem & { quantity: number };

type ShopContextType = {
  wishlist: ShopItem[];
  cart: CartItem[];
  toggleWishlist: (item: ShopItem) => void;
  isWishlisted: (id: number) => boolean;
  addToCart: (item: ShopItem, qty?: number) => void;
  removeFromCart: (id: number) => void;
  updateCartQty: (id: number, qty: number) => void;
  clearCart: () => void;
  cartCount: number;
  wishlistCount: number;
  cartTotal: number;
};

const ShopContext = createContext<ShopContextType | undefined>(undefined);

const WISHLIST_KEY = "kalakriti_wishlist";
const CART_KEY = "kalakriti_cart";

export const ShopProvider = ({ children }: { children: ReactNode }) => {
  const [wishlist, setWishlist] = useState<ShopItem[]>(() => {
    try {
      const raw = localStorage.getItem(WISHLIST_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const raw = localStorage.getItem(CART_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart]);

  const toggleWishlist = (item: ShopItem) => {
    setWishlist((prev) => {
      const exists = prev.find((p) => p.id === item.id);
      if (exists) {
        toast({ title: "Removed from wishlist", description: item.name });
        return prev.filter((p) => p.id !== item.id);
      }
      toast({ title: "Saved to wishlist", description: item.name });
      return [...prev, item];
    });
  };

  const isWishlisted = (id: number) => wishlist.some((p) => p.id === id);

  const addToCart = (item: ShopItem, qty = 1) => {
    setCart((prev) => {
      const existing = prev.find((p) => p.id === item.id);
      if (existing) {
        return prev.map((p) =>
          p.id === item.id ? { ...p, quantity: p.quantity + qty } : p,
        );
      }
      return [...prev, { ...item, quantity: qty }];
    });
    toast({ title: "Added to cart", description: `${item.name} × ${qty}` });
  };

  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((p) => p.id !== id));
  };

  const updateCartQty = (id: number, qty: number) => {
    if (qty <= 0) return removeFromCart(id);
    setCart((prev) => prev.map((p) => (p.id === id ? { ...p, quantity: qty } : p)));
  };

  const clearCart = () => setCart([]);

  const cartCount = cart.reduce((s, i) => s + i.quantity, 0);
  const wishlistCount = wishlist.length;
  const cartTotal = cart.reduce((s, i) => s + i.price * i.quantity, 0);

  return (
    <ShopContext.Provider
      value={{
        wishlist,
        cart,
        toggleWishlist,
        isWishlisted,
        addToCart,
        removeFromCart,
        updateCartQty,
        clearCart,
        cartCount,
        wishlistCount,
        cartTotal,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const ctx = useContext(ShopContext);
  if (!ctx) throw new Error("useShop must be used within ShopProvider");
  return ctx;
};
