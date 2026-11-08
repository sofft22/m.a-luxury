import { Hero } from "@/components/Hero";
import { TrustStrip } from "@/components/TrustStrip"; // <-- ADDED IMPORT
import { HomeClient } from "@/components/HomeClient";
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
      
      {/* TRUST STRIP ADDED HERE */}
      <TrustStrip />

      {/* FLEX CONTAINER FOR BREATHING ROOM */}
      <div className="flex flex-col gap-12 md:gap-20 mt-12 md:mt-20">
        <HomeClient />
        
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
