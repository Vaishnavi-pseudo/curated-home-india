import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import FeaturedCategories from "@/components/home/FeaturedCategories";
import TrendingBrands from "@/components/home/TrendingBrands";
import NewArrivals from "@/components/home/NewArrivals";
import TrustIndicators from "@/components/home/TrustIndicators";
import NewsletterSection from "@/components/home/NewsletterSection";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <HeroSection />
        <FeaturedCategories />
        <TrendingBrands />
        <NewArrivals />
        <TrustIndicators />
        <NewsletterSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
