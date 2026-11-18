
import { PublicLayout } from "@/components/layout/public-layout";
import { HeroSection } from "@/components/home/hero-section";
import { FeaturedEquipment } from "@/components/home/featured-equipment";
import { EquipmentCategories } from "@/components/home/equipment-categories";
import { WhyChooseGearUp } from "@/components/home/why-choose-gearup";
import { HowItWorks } from "@/components/home/how-it-works";
import { CustomerReviews } from "@/components/home/customer-reviews";
import { FinalCTA } from "@/components/home/final-cta";

export default function HomePage() {
  return (
    <PublicLayout>
      <HeroSection />
      <FeaturedEquipment />
      <EquipmentCategories />
      <WhyChooseGearUp />
      <HowItWorks />
      <CustomerReviews />
      <FinalCTA />
    </PublicLayout>
  );
}
