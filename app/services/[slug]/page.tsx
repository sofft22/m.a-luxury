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

  useEffect(() => {
    if (!categoryInfo) return;

    const fetchServices = async () => {
      try {
        const res = await fetch(`/api/services?t=${Date.now()}`); // Cache buster
        const data = await res.json();
        
        if (Array.isArray(data)) {
          // Filter only the services that match this category
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

  if (!categoryInfo) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF7FE]">
        <h1 className="text-2xl text-ink" style={{ fontFamily: "var(--font-cormorant), serif" }}>Category not found</h1>
      </div>
    );
  }

  return (
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
              <Link 
                key={idx}
                href={`/book?service=${encodeURIComponent(service.title)}&id=${service.id}`}
                className="group flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 p-6 md:p-8 bg-white rounded-2xl border border-brand-100 shadow-sm hover:border-brand-700 hover:shadow-md transition-all"
              >
                {/* SERVICE THUMBNAIL IMAGE */}
                {service.image && (
                  <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-brand-50">
                    <Image 
                      src={service.image} 
                      alt={service.title} 
                      fill 
                      className="object-cover" 
                    />
                  </div>
                )}

                <div className="flex-1 w-full">
                  <div className="flex items-center justify-between mb-2">
                    <h3 
                      className="text-[24px] md:text-[28px] text-ink group-hover:text-brand-700 transition-colors" 
                      style={{ fontFamily: 'var(--font-cormorant), serif' }}
                    >
                      {service.title}
                    </h3>
                    <div className="h-8 w-8 shrink-0 rounded-full bg-brand-50 flex items-center justify-center text-brand-700 opacity-0 group-hover:opacity-100 transition-all transform group-hover:-translate-x-2">
                      →
                    </div>
                  </div>
                  
                  {service.description && (
                    <p className="text-[13px] text-muted max-w-xl" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>
                      {service.description}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
