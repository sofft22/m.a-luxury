import { Hero } from "@/components/Hero";
import { TrustStrip } from "@/components/TrustStrip";
import { HomeClient } from "@/components/HomeClient";
import { ServicesPreview } from "@/components/ServicesPreview";
import { Gallery } from "@/components/Gallery"; // <-- NEW IMPORT
import { BoxBuilderSection } from "@/components/BoxBuilderSection";
import { ProductLines } from "@/components/ProductLines";
import { OurStory } from "@/components/OurStory";
import { RecentReviews } from "@/components/RecentReviews";
import { TrustBanner } from "@/components/TrustBanner";
import { Footer } from "@/components/Footer";

export default function HomePage() {
  return (
    <main style={{ margin: 0, padding: 0, width: '100%', overflowX: 'hidden', backgroundColor: '#FAF7FE' }}>
      
      {/* 1. HERO */}
      <Hero />
      
      {/* 2. TRUST STRIP */}
      <TrustStrip />

      {/* MAIN CONTENT SECTIONS */}
      <div className="flex flex-col mt-12 md:mt-20">
        
        {/* 3. SHOP TEASER (Inside HomeClient) */}
        <HomeClient />
        
        {/* 4. SERVICES PREVIEW (The 5-category editorial menu) */}
        <ServicesPreview />
        
        {/* 5. GALLERY / LOOKBOOK */}
        <Gallery />

        {/* 6. ABOUT STORY */}
        <OurStory />

        {/* 7. REVIEWS */}
        <RecentReviews />
        
        {/* 8. OLD TRUST BANNER (Delivery/Policy stuff) */}
        <TrustBanner />
        
      </div>

      {/* 9. FOOTER */}
      <Footer />
      
    </main>
  );
}
