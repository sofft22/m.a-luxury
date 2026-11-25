import { Hero } from "@/components/Hero";
import { IntroStory } from "@/components/IntroStory";
import { HomeClient } from "@/components/HomeClient";
import { ServicesPreview } from "@/components/ServicesPreview";
import { Gallery } from "@/components/Gallery";
import { RecentReviews } from "@/components/RecentReviews";
import { FAQ } from "@/components/FAQ";

async function getFeaturedProducts() {
  try {
    const url = `${process.env.NEXT_PUBLIC_SITE_URL || "https://maluxury.co.uk"}/api/products?admin=true`;
    console.log("[getFeaturedProducts] fetching:", url);

    const res = await fetch(url, { next: { revalidate: 3600 } });

    console.log("[getFeaturedProducts] status:", res.status, "ok:", res.ok);

    if (!res.ok) return [];

    const data = await res.json();
    console.log("[getFeaturedProducts] total products:", Array.isArray(data) ? data.length : "NOT AN ARRAY");
    console.log("[getFeaturedProducts] featured values:", Array.isArray(data) ? data.map((p: any) => p.featured) : data);

    const filtered = data
      .filter((p: any) => p.featured === 1 || p.featured === true || p.featured === "1")
      .slice(0, 4)
      .map((p: any) => ({
        ...p,
        sizes: typeof p.sizes === "string" ? JSON.parse(p.sizes || "[]") : p.sizes,
      }));

    console.log("[getFeaturedProducts] filtered featured count:", filtered.length);
    return filtered;
  } catch (error) {
    console.error("[getFeaturedProducts] FAILED:", error);
    return [];
  }
}

export default async function HomePage() {
  const featuredProducts = await getFeaturedProducts();
  console.log("[HomePage] passing featuredProducts to HomeClient:", featuredProducts.length);

  return (
    <main style={{ margin: 0, padding: 0, width: "100%", overflowX: "hidden", backgroundColor: "#FAF7FE" }}>
      <Hero />
      <div className="flex flex-col">
        <IntroStory />
        <HomeClient featuredProducts={featuredProducts} />
        <ServicesPreview />
        <Gallery />
        <RecentReviews />
        <FAQ />
      </div>
    </main>
  );
}
