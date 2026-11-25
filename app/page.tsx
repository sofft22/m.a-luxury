import { Hero } from "@/components/Hero";
import { IntroStory } from "@/components/IntroStory";
import { HomeClient } from "@/components/HomeClient";
import { ServicesPreview } from "@/components/ServicesPreview";
import { Gallery } from "@/components/Gallery"; 
import { RecentReviews } from "@/components/RecentReviews";
import { FAQ } from "@/components/FAQ";

async function getFeaturedProducts() {
  try {
    // Use the absolute URL directly to avoid routing issues
    const url = "https://maluxury.co.uk/api/products?admin=true";
    
    // cache: 'no-store' forces Next.js to fetch fresh data every time, 
    // preventing it from caching an empty failed request.
    const res = await fetch(url, { cache: 'no-store' });
    
    if (!res.ok) {
      console.error(`[Server] API failed with status: ${res.status}`);
      return [];
    }
    
    const data = await res.json();
    
    if (!Array.isArray(data)) {
      console.error("[Server] API did not return an array");
      return [];
    }

    console.log(`[Server] Fetched ${data.length} total products`);

    // Filter safely (handles 1, true, or "1")
    const featured = data
      .filter((p: any) => p.featured === 1 || p.featured === true || p.featured === "1")
      .slice(0, 4)
      .map((p: any) => ({
        ...p,
        sizes: typeof p.sizes === 'string' ? JSON.parse(p.sizes || "[]") : p.sizes
      }));

    console.log(`[Server] Filtered down to ${featured.length} featured products`);
    
    return featured;
  } catch (error) {
    console.error("[Server] Failed to fetch featured products", error);
    return [];
  }
}

export default async function HomePage() {
  const featuredProducts = await getFeaturedProducts();

  return (
    <main style={{ margin: 0, padding: 0, width: '100%', overflowX: 'hidden', backgroundColor: '#FAF7FE' }}>
      
      <Hero />
      
      <div className="flex flex-col">
        <IntroStory />
        
        {/* 
          The HomeClient now handles the fallback. 
          If the server sends 0 items, HomeClient will try to fetch them on the client-side.
        */}
        <HomeClient featuredProducts={featuredProducts} />
        
        <ServicesPreview />
        <Gallery />
        <RecentReviews />
        <FAQ />
      </div>

    </main>
  );
}
