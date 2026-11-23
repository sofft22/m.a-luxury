import { Hero } from "@/components/Hero";
import { IntroStory } from "@/components/IntroStory";
import { HomeClient } from "@/components/HomeClient";
import { ServicesPreview } from "@/components/ServicesPreview";
import { Gallery } from "@/components/Gallery"; 
import { RecentReviews } from "@/components/RecentReviews";
import { FAQ } from "@/components/FAQ";
// ❌ Removed Footer import

async function getFeaturedProducts() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || 'https://maluxury.co.uk'}/api/products?admin=true`, {
      next: { revalidate: 3600 }
    });
    
    if (!res.ok) return [];
    
    const data = await res.json();
    
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

export default async function HomePage() {
  const featuredProducts = await getFeaturedProducts();

  return (
    <main style={{ margin: 0, padding: 0, width: '100%', overflowX: 'hidden', backgroundColor: '#FAF7FE' }}>
      
      <Hero />
      
      <div className="flex flex-col">
        <IntroStory />
        <HomeClient featuredProducts={featuredProducts} />
        <ServicesPreview />
        <Gallery />
        <RecentReviews />
        <FAQ />
      </div>

      {/* ❌ Removed <Footer /> from here since layout.tsx handles it now */}
      
    </main>
  );
}
