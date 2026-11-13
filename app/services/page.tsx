"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const WHATSAPP_NUMBER = "447393157901";

// ADDED TYPE DEFINITION SO TYPESCRIPT KNOWS SIZES/DETAILS ARE OPTIONAL
interface ServiceItem {
  name: string;
  sizes?: string;
  lengths?: string;
  details?: string;
}

interface ServiceCategory {
  id: string;
  title: string;
  image: string;
  description: string;
  services: ServiceItem[];
}

const SERVICES_DATA: ServiceCategory[] = [
  {
    id: "braids",
    title: "Braids",
    image: "/hero-1.jpg",
    description: "Flawless, tension-free braiding tailored to your crown.",
    services: [
      { name: "Knotless Braids", sizes: "Small, Medium, Large, Jumbo", lengths: "Shoulder, Mid-back, Waist" },
      { name: "Boho Braids", sizes: "Small, Medium, Large, Jumbo", lengths: "Shoulder, Mid-back, Waist" },
      { name: "Stitch Braids", sizes: "All lengths" },
      { name: "Feed-in Braids", sizes: "Ponytails, All Backs, Alicia Keys, Fulani, Lemonade" },
    ]
  },
  {
    id: "locs-twists",
    title: "Locs & Twists",
    image: "/hero-2.jpg",
    description: "Expert maintenance and installation for locs and twists.",
    services: [
      { name: "Locs", details: "Two strand twist, Interlocking" },
      { name: "Relocs", details: "Interlocking, Retwist (with/without styling)" },
      { name: "Twists", details: "With expression" },
      { name: "Kinky Twists", sizes: "Small, Medium, Large, Jumbo", lengths: "Shoulder, Mid-back, Waist" },
      { name: "Marley Twists", sizes: "Small, Medium, Large, Jumbo", lengths: "Shoulder, Mid-back, Waist" },
    ]
  },
  {
    id: "installs",
    title: "Installs & Styling",
    image: "/hero-3.jpg",
    description: "Seamless installations, treatments, and healthy hair care.",
    services: [
      { name: "Sew-ins" },
      { name: "Retouch & Washing" },
      { name: "Hair Straightening" },
      { name: "New Client Consultation" },
    ]
  },
  {
    id: "beauty",
    title: "Beauty",
    image: "/hero-4.jpg",
    description: "Lashes, brows, and treatments to enhance your natural features.",
    services: [
      { name: "Lash Extensions", details: "Classic, Hybrid, Volume" },
      { name: "Brow Tint" },
      { name: "Brow Lamination" },
      { name: "Brow Tint & Lamination" },
      { name: "Brow Shaping" },
      { name: "SPMU Brows", details: "Microblading, Microshading, Combo" },
    ]
  },
  {
    id: "piercing",
    title: "Piercing",
    image: "/hero-1.jpg",
    description: "Safe, sterile, and professional piercing services.",
    services: [
      { name: "Standard Earlobe" },
      { name: "Helix" },
      { name: "Tragus" },
    ]
  }
];

export default function ServicesPage() {
  const [openCategory, setOpenCategory] = useState<string | null>(null);

  const toggleCategory = (id: string) => {
    setOpenCategory(openCategory === id ? null : id);
  };

  return (
    <main className="min-h-screen bg-[#FAF7FE] pt-[80px] md:pt-[100px]">
      
      {/* HEADER */}
      <section className="bg-ink py-16 px-6 md:py-24 md:px-12 text-center">
        <div className="mx-auto max-w-4xl">
          <h1 
            className="text-[40px] md:text-[64px] text-white leading-tight mb-4" 
            style={{ fontFamily: 'var(--font-cormorant), serif' }}
          >
            Our Services
          </h1>
          <p 
            className="text-[14px] md:text-[16px] text-white/70 max-w-lg mx-auto"
            style={{ fontFamily: 'var(--font-inter), sans-serif' }}
          >
            Select a category below to view specific treatments, sizes, and options. 
            All bookings require a £10 deposit.
          </p>
        </div>
      </section>

      {/* SERVICES LIST */}
      <section className="mx-auto max-w-6xl px-4 py-12 md:px-8 md:py-24">
        <div className="flex flex-col gap-6 md:gap-10">
          
          {SERVICES_DATA.map((category) => {
            const isOpen = openCategory === category.id;

            return (
              <div 
                key={category.id} 
                className="group relative bg-white rounded-2xl overflow-hidden border border-brand-100 shadow-sm transition-all duration-500"
              >
                {/* CATEGORY HEADER (Clickable) */}
                <button 
                  onClick={() => toggleCategory(category.id)}
                  className="w-full text-left flex flex-col md:flex-row items-center md:items-stretch h-auto md:h-[300px]"
                >
                  {/* Image */}
                  <div className="relative w-full md:w-1/2 h-[250px] md:h-full overflow-hidden">
                    <Image 
                      src={category.image} 
                      alt={category.title}
                      fill
                      className={`object-cover object-top transition-transform duration-700 ${isOpen ? "scale-105" : "group-hover:scale-105"}`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent md:bg-gradient-to-r" />
                  </div>

                  {/* Text */}
                  <div className="flex-1 p-8 md:p-12 flex flex-col justify-center relative">
                    <h2 
                      className={`text-[32px] md:text-[48px] transition-colors duration-300 ${isOpen ? 'text-brand-700 italic' : 'text-ink group-hover:text-brand-700'}`}
                      style={{ fontFamily: 'var(--font-cormorant), serif' }}
                    >
                      {category.title}
                    </h2>
                    <p 
                      className="mt-2 text-[14px] text-muted max-w-sm"
                      style={{ fontFamily: 'var(--font-inter), sans-serif' }}
                    >
                      {category.description}
                    </p>

                    {/* Plus/Minus Icon */}
                    <div className={`absolute top-8 right-8 md:top-12 md:right-12 flex h-10 w-10 items-center justify-center rounded-full border border-ink/10 transition-all duration-500 ${isOpen ? "bg-brand-700 text-white rotate-180" : "text-ink/40 group-hover:border-brand-700 group-hover:text-brand-700"}`}>
                      {isOpen ? (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5"><path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" /></svg>
                      ) : (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
                      )}
                    </div>
                  </div>
                </button>

                {/* EXPANDED SERVICES LIST */}
                <div 
                  className={`overflow-hidden transition-all duration-700 ease-in-out bg-[#FAF7FE] ${isOpen ? "max-h-[1000px] opacity-100 border-t border-brand-100" : "max-h-0 opacity-0"}`}
                >
                  <div className="p-8 md:p-12">
                    <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-700 mb-6" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                      Select a service to book
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {category.services.map((service, idx) => (
                        <Link 
                          key={idx}
                          href={`/book?service=${encodeURIComponent(service.name)}`}
                          className="group/item flex flex-col p-6 bg-white rounded-xl border border-ink/5 hover:border-brand-700 transition-colors"
                        >
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="text-[20px] text-ink group-hover/item:text-brand-700 transition-colors" style={{ fontFamily: 'var(--font-cormorant), serif' }}>
                              {service.name}
                            </h4>
                            <span className="text-brand-700 opacity-0 group-hover/item:opacity-100 transition-opacity">→</span>
                          </div>
                          
                          {(service.sizes || service.lengths || service.details) && (
                            <div className="text-[12px] text-muted flex flex-col gap-0.5 mt-2" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>
                              {service.details && <p>{service.details}</p>}
                              {service.sizes && <p><strong className="font-medium text-ink">Sizes:</strong> {service.sizes}</p>}
                              {service.lengths && <p><strong className="font-medium text-ink">Lengths:</strong> {service.lengths}</p>}
                            </div>
                          )}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
