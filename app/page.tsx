import { Hero } from "@/components/Hero";
import { IntroStory } from "@/components/IntroStory";
import { HomeClient } from "@/components/HomeClient";
import { ServicesPreview } from "@/components/ServicesPreview";
import { Gallery } from "@/components/Gallery"; 
import { RecentReviews } from "@/components/RecentReviews";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";

// 1. Fetch and cache the featured products on the server
async function getFeaturedProducts() {
  try {
    // CHANGED: Added ?admin=true so it skips the massive base64 images and avoids the 27MB cache error
    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || 'https://maluxury.co.uk'}/api/products?admin=true`, {
      next: { revalidate: 3600 } // Caches the data for 1 hour
    });
    
    if (!res.ok) return [];
    
    const data = await res.json();
    
    // Filter featured items and parse the sizes before sending to the client
    return data
      .filter((p: any) => p.featured === 1)
      .slice(0, 4)
      .map((p: any) => ({
        ...p,
        sizes: typeof p.sizes === 'string' ? JSON.parse(p.sizes || "[]") : p.sizes
      }));
  } catch (error) {
    console.error("Failed to fetch featured products", error);
    return [];
  }
}

// 2. Make the Page async to await the data
export default async function HomePage() {
  const featuredProducts = await getFeaturedProducts();

  return (
    <main style={{ margin: 0, padding: 0, width: '100%', overflowX: 'hidden', backgroundColor: '#FAF7FE' }}>
      
      {/* 1. HERO */}
      <Hero />
      
      {/* MAIN CONTENT SECTIONS */}
      <div className="flex flex-col">
        
        {/* 2. INTRO STORY */}
        <IntroStory />

        {/* 3. SHOP TEASER (Passes the cached products to HomeClient) */}
        <HomeClient featuredProducts={featuredProducts} />
        
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
