"use client";

import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { notFound } from "next/navigation";

const ALL_SERVICES: Record<string, { title: string, image: string, services: any[] }> = {
  "braids": {
    title: "Braids",
    image: "/hero-1.jpg",
    services: [
      { name: "Knotless Braids", sizes: "Small, Medium, Large, Jumbo", lengths: "Shoulder, Mid-back, Waist" },
      { name: "Boho Braids", sizes: "Small, Medium, Large, Jumbo", lengths: "Shoulder, Mid-back, Waist" },
      { name: "Stitch Braids", sizes: "All lengths" },
      { name: "Feed-in Braids", sizes: "Ponytails, All Backs, Alicia Keys, Fulani, Lemonade" },
    ]
  },
  "locs-twists": {
    title: "Locs & Twists",
    image: "/hero-2.jpg",
    services: [
      { name: "Locs", details: "Two strand twist, Interlocking" },
      { name: "Relocs", details: "Interlocking, Retwist (with/without styling)" },
      { name: "Twists", details: "With expression" },
      { name: "Kinky Twists", sizes: "Small, Medium, Large, Jumbo", lengths: "Shoulder, Mid-back, Waist" },
      { name: "Marley Twists", sizes: "Small, Medium, Large, Jumbo", lengths: "Shoulder, Mid-back, Waist" },
    ]
  },
  "installs": {
    title: "Installs & Styling",
    image: "/hero-3.jpg",
    services: [
      { name: "Sew-ins" },
      { name: "Retouch & Washing" },
      { name: "Hair Straightening" },
      { name: "New Client Consultation" },
    ]
  },
  "beauty": {
    title: "Beauty & Piercing",
    image: "/hero-4.jpg",
    services: [
      { name: "Lash Extensions", details: "Classic, Hybrid, Volume" },
      { name: "Brow Tint" },
      { name: "Brow Lamination" },
      { name: "Brow Tint & Lamination" },
      { name: "Brow Shaping" },
      { name: "SPMU Brows", details: "Microblading, Microshading, Combo" },
      { name: "Piercing", details: "Earlobe, Helix, Tragus" },
    ]
  }
};

export default function ServiceCategoryPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const category = ALL_SERVICES[slug];

  if (!category) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#FAF7FE] pt-[80px] md:pt-[100px] pb-24">
      
      {/* HERO SECTION */}
      <section className="relative h-[40vh] md:h-[50vh] flex items-center justify-center overflow-hidden">
        <Image 
          src={category.image} 
          alt={category.title} 
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
            {category.title}
          </h1>
        </div>
      </section>

      {/* SUBCATEGORY LIST */}
      <section className="mx-auto max-w-3xl px-4 md:px-8 py-12 md:py-20">
        <div className="flex flex-col gap-4">
          {category.services.map((service: any, idx: number) => (
            <Link 
              key={idx}
              href={`/book?service=${encodeURIComponent(service.name)}`}
              className="group flex flex-col p-6 md:p-8 bg-white rounded-2xl border border-brand-100 shadow-sm hover:border-brand-700 hover:shadow-md transition-all"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 
                  className="text-[24px] md:text-[28px] text-ink group-hover:text-brand-700 transition-colors" 
                  style={{ fontFamily: 'var(--font-cormorant), serif' }}
                >
                  {service.name}
                </h3>
                <div className="h-8 w-8 rounded-full bg-brand-50 flex items-center justify-center text-brand-700 opacity-0 group-hover:opacity-100 transition-all transform group-hover:-translate-x-2">
                  →
                </div>
              </div>
              
              {(service.sizes || service.lengths || service.details) && (
                <div 
                  className="text-[12px] text-muted flex flex-col gap-1 mt-1" 
                  style={{ fontFamily: 'var(--font-inter), sans-serif' }}
                >
                  {service.details && <p>{service.details}</p>}
                  {service.sizes && <p><strong className="font-medium text-ink">Sizes:</strong> {service.sizes}</p>}
                  {service.lengths && <p><strong className="font-medium text-ink">Lengths:</strong> {service.lengths}</p>}
                </div>
              )}
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
