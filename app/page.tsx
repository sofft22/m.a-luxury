import { Hero } from "@/components/Hero";
import { TrustStrip } from "@/components/TrustStrip";
import { HomeClient } from "@/components/HomeClient";
import { ServicesPreview } from "@/components/ServicesPreview"; // <-- IMPORT
import { BoxBuilderSection } from "@/components/BoxBuilderSection";
import { ProductLines } from "@/components/ProductLines";
import { OurStory } from "@/components/OurStory";
import { RecentReviews } from "@/components/RecentReviews";
import { TrustBanner } from "@/components/TrustBanner";
import { Footer } from "@/components/Footer";

export default function HomePage() {
  return (
    <main style={{ margin: 0, padding: 0, width: '100%', overflowX: 'hidden', backgroundColor: '#FAF7FE' }}>
      
      <Hero />
      <TrustStrip />

      {/* FLEX CONTAINER */}
      <div className="flex flex-col gap-12 md:gap-20 mt-12 md:mt-20">
        
        <HomeClient /> {/* <-- This is the Hair Edit */}
        
        <ServicesPreview /> {/* <-- NEW SERVICES SECTION */}
        
        <BoxBuilderSection />
        <ProductLines /> 
        <OurStory />
        <RecentReviews />
        <TrustBanner />
      </div>

      <Footer />
      
    </main>
  );
}
