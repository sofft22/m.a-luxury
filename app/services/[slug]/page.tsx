"use client";

import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const CATEGORY_INFO: Record<string, { title: string, dbCategory: string, image: string }> = {
  "braids": { title: "Braids & Twists", dbCategory: "braids", image: "/hero-1.jpg" },
  "locs-twists": { title: "Locs & Maintenance", dbCategory: "locs", image: "/hero-2.jpg" },
  "installs": { title: "Installs & Styling", dbCategory: "installs", image: "/hero-3.jpg" },
  "beauty": { title: "Beauty", dbCategory: "beauty", image: "/hero-4.jpg" },
};

export default function ServiceCategoryPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const categoryInfo = CATEGORY_INFO[slug];

  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // STATE FOR THE ZOOM LIGHTBOX
  const [zoomImage, setZoomImage] = useState<string | null>(null);

  useEffect(() => {
    if (!categoryInfo) return;

    const fetchServices = async () => {
      try {
        const res = await fetch(`/api/services?t=${Date.now()}`);
        const data = await res.json();
        
        if (Array.isArray(data)) {
          const filtered = data.filter((s: any) => s.category === categoryInfo.dbCategory && s.inStock === 1);
          setServices(filtered);
        }
      } catch (error) {
        console.error("Failed to fetch services", error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, [categoryInfo]);

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    if (zoomImage) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [zoomImage]);

  if (!categoryInfo) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF7FE]">
        <h1 className="text-2xl text-ink" style={{ fontFamily: "var(--font-cormorant), serif" }}>Category not found</h1>
      </div>
    );
  }

  return (
    <>
      <main className="min-h-screen bg-[#FAF7FE] pt-[80px] md:pt-[100px] pb-24">
        
        {/* HERO SECTION */}
        <section className="relative h-[40vh] md:h-[50vh] flex items-center justify-center overflow-hidden">
          <Image 
            src={categoryInfo.image} 
            alt={categoryInfo.title} 
            fill 
            className="object-cover object-top" 
            priority 
          />
          <div className="absolute inset-0 bg-black/60" />
          
          <div className="relative z-10 text-center px-6">
            <Link 
              href="/services" 
              className="text-[10px] font-bold uppercase tracking-widest text-white/60 hover:text-white mb-6 inline-block transition-colors"
              style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
            >
              ← Back to all services
            </Link>
            <h1 
              className="text-[48px] md:text-[72px] text-white leading-tight" 
              style={{ fontFamily: 'var(--font-cormorant), serif' }}
            >
              {categoryInfo.title}
            </h1>
          </div>
        </section>

        {/* SERVICES LIST */}
        <section className="mx-auto max-w-3xl px-4 md:px-8 py-12 md:py-20">
          {loading ? (
            <div className="flex justify-center py-20"><div className="h-6 w-6 animate-spin rounded-full border-2 border-brand-200 border-t-brand-700" /></div>
          ) : services.length === 0 ? (
            <div className="text-center py-20 text-muted">No services available in this category right now.</div>
          ) : (
            <div className="flex flex-col gap-4">
              {services.map((service, idx) => (
                <div 
                  key={idx}
                  className="group flex flex-row items-center gap-4 sm:gap-6 p-4 md:p-8 bg-white rounded-2xl border border-brand-100 shadow-sm hover:border-brand-700 hover:shadow-md transition-all"
                >
                  {/* CLICKABLE IMAGE (Opens Zoom Lightbox) */}
                  {service.image && (
                    <div 
                      onClick={() => setZoomImage(service.image)}
                      className="relative h-20 w-20 md:h-24 md:w-24 shrink-0 overflow-hidden rounded-lg bg-brand-50 cursor-zoom-in group/img"
                    >
                      <Image 
                        src={service.image} 
                        alt={service.title} 
                        fill 
                        className="object-cover transition-transform duration-500 group-hover/img:scale-110" 
                      />
                    </div>
                  )}

                  {/* CLICKABLE TEXT (Goes to Booking) */}
                  <Link 
                    href={`/book?service=${encodeURIComponent(service.title)}&id=${service.id}`}
                    className="flex-1 w-full block"
                  >
                    <div className="flex items-center justify-between mb-1 md:mb-2">
                      <h3 
                        className="text-[22px] md:text-[28px] text-ink group-hover:text-brand-700 transition-colors" 
                        style={{ fontFamily: 'var(--font-cormorant), serif' }}
                      >
                        {service.title}
                      </h3>
                      <div className="h-8 w-8 shrink-0 rounded-full bg-brand-50 flex items-center justify-center text-brand-700 opacity-0 group-hover:opacity-100 transition-all transform group-hover:-translate-x-2 hidden md:flex">
                        →
                      </div>
                    </div>
                    
                    {service.description && (
                      <p className="text-[12px] md:text-[13px] text-muted max-w-xl line-clamp-2 md:line-clamp-none" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>
                        {service.description}
                      </p>
                    )}
                  </Link>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      {/* FULL SCREEN ZOOM LIGHTBOX */}
      {zoomImage && (
        <div 
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 backdrop-blur-md cursor-zoom-out p-4 md:p-12 animate-in fade-in duration-200"
          onClick={() => setZoomImage(null)}
        >
          <div className="relative w-full h-full max-w-5xl max-h-[90vh]">
            <Image 
              src={zoomImage} 
              alt="Zoomed Service" 
              fill 
              className="object-contain" 
              unoptimized
            />
          </div>
          <button 
            onClick={() => setZoomImage(null)}
            className="absolute top-6 right-6 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md hover:bg-white/20 transition-all"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-6 w-6"><path d="M6 6l12 12M18 6L6 18" /></svg>
          </button>
        </div>
      )}
    </>
  );
}
