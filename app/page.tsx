import { Hero } from "@/components/Hero";
import { TrustStrip } from "@/components/TrustStrip";
import { IntroStory } from "@/components/IntroStory"; // <-- NEW IMPORT
import { HomeClient } from "@/components/HomeClient";
import { ServicesPreview } from "@/components/ServicesPreview";
import { Gallery } from "@/components/Gallery"; 
import { RecentReviews } from "@/components/RecentReviews";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";

export default function HomePage() {
  return (
    <main style={{ margin: 0, padding: 0, width: '100%', overflowX: 'hidden', backgroundColor: '#FAF7FE' }}>
      
      {/* 1. HERO */}
      <Hero />
      
      {/* 2. TRUST STRIP */}
      <TrustStrip />

      {/* MAIN CONTENT SECTIONS */}
      <div className="flex flex-col">
        
        {/* 3. INTRO STORY */}
        <IntroStory />

        {/* 4. SHOP TEASER (Inside HomeClient) */}
        <HomeClient />
        
        {/* 5. SERVICES PREVIEW */}
        <ServicesPreview />
        
        {/* 6. GALLERY / LOOKBOOK */}
        <Gallery />

        {/* 7. REVIEWS */}
        <RecentReviews />
        
        {/* 8. FAQ SECTION */}
        <FAQ />
        
      </div>

      {/* 9. FOOTER */}
      <Footer />
      
    </main>
  );
}
