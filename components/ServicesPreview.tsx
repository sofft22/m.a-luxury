"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const WHATSAPP_NUMBER = "440000000000"; // Replace later

function bookLink(service: string) {
  const text = `Hi M.a Luxury! I'd like to book ${service} 💜`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

const SERVICES = [
  {
    title: "Knotless Braids",
    desc: "Small, Medium, Large, Jumbo. Available in shoulder, mid-back, and waist lengths. Expertly installed for a flawless, tension-free finish.",
    image: "/hero-1.jpg", 
  },
  {
    title: "Boho Braids",
    desc: "Small, Medium, Large, Jumbo. Available in shoulder, mid-back, and waist lengths. Perfectly blended curls for a soft, natural look.",
    image: "/hero-2.jpg",
  },
  {
    title: "Locs & Relocs",
    desc: "Interlocking, Retwist, Styling. Whether you're starting fresh or maintaining your crown, we ensure neat and healthy locs.",
    image: "/hero-3.jpg",
  },
  {
    title: "Twists",
    desc: "Passion twists, Kinky twists, and Marley twists. With or without expression. Beautiful, long-lasting protective styles.",
    image: "/hero-4.jpg",
  },
  {
    title: "Sew-ins & Styling",
    desc: "Custom installs, retouch & washing, and hair straightening services. A seamless, natural finish every time.",
    image: "/hero-1.jpg",
  },
  {
    title: "Beauty & Brows",
    desc: "Lash extensions (classic, hybrid, volume), brow lamination, tinting, and SPMU. Enhance your natural features with our expert beauty services.",
    image: "/hero-2.jpg",
  }
];

export function ServicesPreview() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleService = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full bg-white py-16 px-5 md:py-24 md:px-8">
      <div className="mx-auto max-w-3xl">
        
        {/* SUBTLE HEADER */}
        <div className="mb-10 flex flex-row items-baseline justify-between border-b border-ink/10 pb-4">
          <div className="flex items-baseline gap-4">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold">Services</span>
            <h2 className="text-[20px] text-ink" style={{ fontFamily: 'var(--font-cormorant), serif' }}>
              Our Menu
            </h2>
          </div>
          <Link 
            href="/services" 
            className="text-[10px] font-bold uppercase tracking-[0.1em] text-ink/50 hover:text-ink transition-colors" 
            style={{ fontFamily: 'var(--font-inter), sans-serif' }}
          >
            View All
          </Link>
        </div>

        {/* COMPACT LIST */}
        <div className="flex flex-col">
          {SERVICES.map((service, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div key={idx} className="border-b border-ink/5">
                
                {/* ROW */}
                <button 
                  onClick={() => toggleService(idx)}
                  className="w-full flex items-center justify-between py-5 group text-left"
                >
                  <div className="flex items-baseline gap-6">
                    <span className="text-[9px] font-bold text-ink/30 tracking-widest hidden md:block">
                      0{idx + 1}
                    </span>
                    <h3 
                      className={`text-[22px] md:text-[26px] transition-colors duration-300 ${
                        isOpen ? "text-brand-700 italic" : "text-ink group-hover:text-ink/60"
                      }`}
                      style={{ fontFamily: 'var(--font-cormorant), serif' }}
                    >
                      {service.title}
                    </h3>
                  </div>
                  
                  {/* Small Plus Icon */}
                  <div className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full transition-all duration-500 ${
                    isOpen ? "bg-brand-700 text-white rotate-45" : "text-ink/40 group-hover:text-ink"
                  }`}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                  </div>
                </button>

                {/* EXPANDED DETAILS */}
                <div 
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    isOpen ? "max-h-[500px] opacity-100 mb-8" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pl-0 md:pl-10 pr-2 items-center">
                    
                    {/* Smaller Image */}
                    <div className="relative w-full aspect-[4/3] rounded-sm overflow-hidden">
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover object-top"
                      />
                    </div>

                    {/* Compact Text */}
                    <div className="flex flex-col items-start justify-center">
                      <p 
                        className="text-[12px] leading-relaxed text-muted mb-6"
                        style={{ fontFamily: 'var(--font-inter), sans-serif' }}
                      >
                        {service.desc}
                      </p>
                      
                      <a 
                        href={bookLink(service.title)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 border-b border-brand-700 pb-0.5 text-[9px] font-bold uppercase tracking-[0.15em] text-brand-700 transition-all hover:gap-3 hover:text-brand-900 hover:border-brand-900"
                        style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
                      >
                        Book Now
                        <span>→</span>
                      </a>
                    </div>

                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
