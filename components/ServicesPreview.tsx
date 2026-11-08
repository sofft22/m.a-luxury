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
    desc: "Small, Medium, Large, Jumbo. Available in shoulder, mid-back, and waist lengths.",
    image: "/hero-1.jpg", 
  },
  {
    title: "Boho Braids",
    desc: "Small, Medium, Large, Jumbo. Available in shoulder, mid-back, and waist lengths.",
    image: "/hero-2.jpg",
  },
  {
    title: "Locs & Relocs",
    desc: "Interlocking, Retwist, Styling. Whether you're starting fresh or maintaining your crown.",
    image: "/hero-3.jpg",
  },
  {
    title: "Twists",
    desc: "Passion twists, Kinky twists, and Marley twists. With or without expression.",
    image: "/hero-4.jpg",
  },
  {
    title: "Sew-ins & Styling",
    desc: "Custom installs, retouch & washing, and hair straightening services.",
    image: "/hero-1.jpg",
  },
  {
    title: "Beauty & Brows",
    desc: "Lash extensions (classic, hybrid, volume), brow lamination, tinting, and SPMU.",
    image: "/hero-2.jpg",
  }
];

export function ServicesPreview() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleService = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full bg-white py-20 px-5 md:py-28 md:px-8">
      <div className="mx-auto max-w-5xl">
        
        {/* HEADER */}
        <div className="mb-12 flex flex-row items-end justify-between gap-2 sm:gap-6 border-b border-brand-100 pb-6">
          <div>
            <p className="text-brand-700 text-[10px] font-bold uppercase tracking-[0.25em] mb-2" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
              ✦ Expert Styling
            </p>
            <h2 
              className="text-[32px] sm:text-[44px] text-brand-700 leading-tight whitespace-nowrap" 
              style={{ fontFamily: 'var(--font-cormorant), serif' }}
            >
              Our Services
            </h2>
          </div>
          
          <Link 
            href="/services" 
            className="group hidden sm:flex shrink-0 items-center gap-2 pb-1 text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.15em] text-brand-700 transition-colors hover:text-brand-900" 
            style={{ fontFamily: 'var(--font-inter), sans-serif' }}
          >
            <span className="border-b border-brand-700 pb-0.5 whitespace-nowrap">View All</span>
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
        </div>

        {/* LIST ACCORDION */}
        <div className="flex flex-col border-t border-brand-100">
          {SERVICES.map((service, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div key={idx} className="border-b border-brand-100">
                <button 
                  onClick={() => toggleService(idx)}
                  className="w-full flex items-center justify-between py-6 group text-left transition-colors hover:bg-brand-50/50 px-2 md:px-4"
                >
                  <h3 
                    className={`text-[28px] md:text-[36px] transition-colors ${
                      isOpen ? "text-brand-700 italic" : "text-ink group-hover:text-brand-700"
                    }`}
                    style={{ fontFamily: 'var(--font-cormorant), serif' }}
                  >
                    {service.title}
                  </h3>
                  
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                    isOpen ? "bg-brand-700 border-brand-700 text-white rotate-45" : "border-brand-200 text-brand-700 group-hover:border-brand-700"
                  }`}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                  </div>
                </button>

                <div 
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    isOpen ? "max-h-[800px] opacity-100 mb-8" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 p-2 md:p-4 items-center">
                    <div className="relative w-full aspect-[4/3] md:aspect-square rounded-xl overflow-hidden shadow-lg">
                      <Image src={service.image} alt={service.title} fill className="object-cover object-top" />
                    </div>
                    <div className="flex flex-col items-start justify-center">
                      <p className="text-[15px] leading-relaxed text-muted mb-8" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>
                        {service.desc}
                      </p>
                      <a 
                        href={bookLink(service.title)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-full bg-brand-700 px-8 py-3.5 text-[11px] font-bold uppercase tracking-[0.1em] text-white shadow-lg shadow-brand-700/30 transition-all hover:bg-brand-900 hover:-translate-y-0.5"
                        style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
                      >
                        Book via WhatsApp
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
