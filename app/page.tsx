import { Hero } from "@/components/Hero";
import { IntroStory } from "@/components/IntroStory";
import { HomeClient } from "@/components/HomeClient";
import { ServicesPreview } from "@/components/ServicesPreview";
import { Gallery } from "@/components/Gallery"; 
import { RecentReviews } from "@/components/RecentReviews";
import { FAQ } from "@/components/FAQ";

export default async function HomePage() {
  // We are bypassing the server fetch completely to avoid Cloudflare memory limits.
  // The HomeClient will fetch the data as soon as it loads in the browser.
  const featuredProducts: any[] = []; 

  return (
    <main style={{ margin: 0, padding: 0, width: '100%', overflowX: 'hidden', backgroundColor: '#FAF7FE' }}>
      <Hero />
      <div className="flex flex-col">
        <IntroStory />
        
        {/* Client handles the fetch */}
        <HomeClient featuredProducts={featuredProducts} />
        
        <ServicesPreview />
        <Gallery />
        <RecentReviews />
        <FAQ />
      </div>
    </main>
  );
}
