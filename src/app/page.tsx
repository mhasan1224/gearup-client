
import Navbar from "@/components/shared/navbar";
import Footer from "@/components/shared/footer";

import HeroSection from "@/components/home/hero-section";
import FeaturedEquipment from "@/components/home/featured-equipment";
import CategorySection from "@/components/home/category-section";
import WhyChooseUs from "@/components/home/why-choose-us";
import HowItWorks from "@/components/home/how-it-works";
import CustomerReviews from "@/components/home/customer-reviews";
import CtaSection from "@/components/home/cta-section";

export default function Home() {
  return (
    <>
      <Navbar />

      <main className="flex-1">
        <HeroSection />
        <FeaturedEquipment />
        <CategorySection />
        <WhyChooseUs />
        <HowItWorks />
        <CustomerReviews />
        <CtaSection />
      </main>

      <Footer />
    </>
  );
}
