import { Hero } from "@/components/Hero";
import { IntroStory } from "@/components/IntroStory";
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
      
      {/* MAIN CONTENT SECTIONS */}
      <div className="flex flex-col">
        
        {/* 2. INTRO STORY */}
        <IntroStory />

        {/* 3. SHOP TEASER (Inside HomeClient) */}
        <HomeClient />
        
        {/* 4. SERVICES PREVIEW */}
        <ServicesPreview />
        
        {/* 5. GALLERY / LOOKBOOK */}
        <Gallery />

        {/* 6. REVIEWS */}
        <RecentReviews />
        
        {/* 7. FAQ SECTION */}
        <FAQ />
        
      </div>

      {/* 8. FOOTER */}
      <Footer />
      
    </main>
  );
}
