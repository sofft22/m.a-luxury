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
    <section className="w-full bg-white py-20 px-5 md:py-32 md:px-8">
      <div className="mx-auto max-w-4xl">
        
        {/* PREMIUM HEADER - BLACK & GOLD */}
        <div className="mb-16 flex flex-col items-center text-center">
          <p 
            className="text-[10px] font-bold uppercase tracking-[0.4em] text-gold mb-4"
            style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
          >
            Our Expertise
          </p>
          <h2 
            className="text-[36px] sm:text-[52px] text-ink font-normal leading-tight" 
            style={{ fontFamily: 'var(--font-cormorant), serif' }}
          >
            The Service Menu
          </h2>
          <div className="w-12 h-[1px] bg-ink/20 mt-6" />
        </div>

        {/* THE LIST */}
        <div className="flex flex-col border-t border-ink/10">
          {SERVICES.map((service, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div key={idx} className="border-b border-ink/10">
                
                {/* CLICKABLE ROW */}
                <button 
                  onClick={() => toggleService(idx)}
                  className="w-full flex items-center justify-between py-8 md:py-10 group text-left transition-colors"
                >
                  <div className="flex items-baseline gap-4 md:gap-6">
                    <span className="text-[10px] font-bold text-ink/30 tracking-widest hidden md:block">
                      0{idx + 1}
                    </span>
                    <h3 
                      className={`text-[28px] md:text-[40px] transition-colors duration-300 ${
                        isOpen ? "text-brand-700 italic" : "text-ink group-hover:text-ink/60"
                      }`}
                      style={{ fontFamily: 'var(--font-cormorant), serif' }}
                    >
                      {service.title}
                    </h3>
                  </div>
                  
                  {/* Plus/Minus Icon */}
                  <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-500 ${
                    isOpen ? "bg-brand-700 text-white rotate-45" : "text-ink/40 group-hover:text-ink"
                  }`}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="h-6 w-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                  </div>
                </button>

                {/* EXPANDED DETAILS */}
                <div 
                  className={`overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${
                    isOpen ? "max-h-[800px] opacity-100 mb-10" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 pl-0 md:pl-12 pr-2 md:pr-4 items-center">
                    
                    {/* Image */}
                    <div className="relative w-full aspect-square rounded-sm overflow-hidden">
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover object-top"
                      />
                    </div>

                    {/* Text & CTA */}
                    <div className="flex flex-col items-start justify-center">
                      <p 
                        className="text-[14px] leading-loose text-muted mb-8"
                        style={{ fontFamily: 'var(--font-inter), sans-serif' }}
                      >
                        {service.desc}
                      </p>
                      
                      <a 
                        href={bookLink(service.title)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 border-b border-brand-700 pb-1 text-[10px] font-bold uppercase tracking-[0.15em] text-brand-700 transition-all hover:gap-3 hover:text-brand-900 hover:border-brand-900"
                        style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
                      >
                        Book via WhatsApp
                        <span>→</span>
                      </a>
                    </div>

                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Mobile View All Button */}
        <div className="mt-12 flex justify-center">
          <Link 
            href="/services" 
            className="border-b border-ink pb-1 text-[10px] font-bold uppercase tracking-[0.2em] text-ink transition-colors hover:text-brand-700 hover:border-brand-700"
            style={{ fontFamily: 'var(--font-inter), sans-serif' }}
          >
            View All Services
          </Link>
        </div>

      </div>
    </section>
  );
}
