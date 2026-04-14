import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import SellerAuth from "./pages/SellerAuth";
import SellerApply from "./pages/SellerApply";
import NotFound from "./pages/NotFound";
import Discover from "./pages/Discover";
import About from "./pages/About";
import ProductDetail from "./pages/ProductDetail";
import BrandProfile from "./pages/BrandProfile";
import CustomCursor from "./components/CustomCursor";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CustomCursor />
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/sell" element={<SellerAuth />} />
          <Route path="/sell/apply" element={<SellerApply />} />
          <Route path="/categories" element={<Discover />} />
          <Route path="/about" element={<About />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
