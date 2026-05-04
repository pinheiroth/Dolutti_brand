import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/home/HeroSection";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { CategoriesSection } from "@/components/home/CategoriesSection";
import { BannerSection } from "@/components/home/BannerSection";
import { FeaturesSection } from "@/components/home/FeaturesSection";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <FeaturesSection />
      <FeaturedProducts />
      <CategoriesSection />
      <BannerSection />
    </Layout>
  );
};

export default Index;
