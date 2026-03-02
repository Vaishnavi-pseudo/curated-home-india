import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import MarqueeBar from "@/components/home/MarqueeBar";
import CategoryBubbles from "@/components/home/CategoryBubbles";
import FeaturedCategories from "@/components/home/FeaturedCategories";
import TrendingBrands from "@/components/home/TrendingBrands";
import NewArrivals from "@/components/home/NewArrivals";
import TrustIndicators from "@/components/home/TrustIndicators";
import WeeklyMaker from "@/components/home/WeeklyMaker";
import CommunityReviews from "@/components/home/CommunityReviews";
import NewsletterSection from "@/components/home/NewsletterSection";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <HeroSection />
        <MarqueeBar />
        <CategoryBubbles />
        <FeaturedCategories />
        <TrendingBrands />
        <NewArrivals />
        <WeeklyMaker />
        <CommunityReviews />
        <TrustIndicators />
        <NewsletterSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
