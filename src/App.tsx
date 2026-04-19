import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import SellerAuth from "./pages/SellerAuth";
import SellerApply from "./pages/SellerApply";
import SellerDashboard from "./pages/SellerDashboard";
import NotFound from "./pages/NotFound";
import Discover from "./pages/Discover";
import About from "./pages/About";
import ProductDetail from "./pages/ProductDetail";
import BrandProfile from "./pages/BrandProfile";
import Wishlist from "./pages/Wishlist";
import Cart from "./pages/Cart";
import CustomCursor from "./components/CustomCursor";
import { ShopProvider } from "./context/ShopContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ShopProvider>
        <CustomCursor />
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/sell" element={<SellerAuth />} />
            <Route path="/sell/apply" element={<SellerApply />} />
            <Route path="/sell/dashboard" element={<SellerDashboard />} />
            <Route path="/categories" element={<Discover />} />
            <Route path="/about" element={<About />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/brand/:slug" element={<BrandProfile />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/cart" element={<Cart />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </ShopProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
