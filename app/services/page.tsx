"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

const CATEGORIES = [
  { 
    id: "braids", 
    title: "Braids & Twists", 
    dbKey: "braids", 
    // CHANGE THIS PATH TO YOUR NEW IMAGE IN THE PUBLIC FOLDER
    image: "/braids-category.jpg", 
    fallbackSubs: ["Knotless", "Boho", "Stitch", "Feed-in", "Twists"]
  },
  { 
    id: "locs-twists", 
    title: "Locs & Maintenance", 
    dbKey: "locs", 
    // CHANGE THIS PATH TO YOUR NEW IMAGE
    image: "/locs-category.jpg",
    fallbackSubs: ["Starter Locs", "Instant Locs", "Micro Locs", "Sister Locs", "Crochet Locs", "Reties"]
  },
  { 
    id: "installs", 
    title: "Installs & Styling", 
    dbKey: "installs", 
    // CHANGE THIS PATH TO YOUR NEW IMAGE
    image: "/installs-category.jpg",
    fallbackSubs: ["Sew-ins", "Wig Styling", "Retouch & Wash", "Hair Straightening"]
  },
  { 
    id: "beauty", 
    title: "Beauty & Piercing", 
    dbKey: "beauty", 
    // CHANGE THIS PATH TO YOUR NEW IMAGE
    image: "/beauty-category.jpg",
    fallbackSubs: ["Lashes", "Brows", "SPMU", "Piercing", "Manicure", "Pedicure"]
  }
];

export default function ServicesPage() {
  const [services, setServices] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/services")
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setServices(data);
      })
      .catch(console.error);
  }, []);

  return (
    <main className="min-h-screen bg-[#FAF7FE] pt-[80px] md:pt-[100px] pb-24">
      
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
            className="text-[13px] md:text-[14px] text-white/60 uppercase tracking-[0.2em]"
            style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
          >
            Select a category to view options
          </p>
        </div>
      </section>

      {/* 4-COLUMN GRID */}
      <section className="mx-auto max-w-7xl px-4 py-12 md:px-8 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
          {CATEGORIES.map((category, idx) => {
            const categoryServices = services.filter(s => s.category === category.dbKey);
            const subCategories = categoryServices.length > 0 
              ? categoryServices.map(s => s.title) 
              : category.fallbackSubs;

            return (
              <Link 
                key={idx} 
                href={`/services/${category.id}`}
                className="group flex flex-col items-center text-center"
              >
                {/* Image */}
                <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden shadow-sm border border-brand-100 mb-6">
                  <Image
                    src={category.image}
                    alt={category.title}
                    fill
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

                {/* Text Area */}
                <div className="flex flex-col items-center px-2">
                  <h3 
                    className="text-[28px] md:text-[32px] text-ink leading-tight mb-3 group-hover:text-brand-700 transition-colors"
                    style={{ fontFamily: 'var(--font-cormorant), serif' }}
                  >
                    {category.title}
                  </h3>
                  
                  <div className="flex flex-wrap justify-center items-center gap-x-2 gap-y-1">
                    {subCategories.map((sub, i) => (
                      <span key={i} className="flex items-center gap-x-2">
                        <span 
                          className="text-[11px] md:text-[12px] text-muted tracking-wide"
                          style={{ fontFamily: 'var(--font-inter), sans-serif' }}
                        >
                          {sub}
                        </span>
                        {i !== subCategories.length - 1 && (
                          <span className="h-1 w-1 rounded-full bg-brand-700/30" />
                        )}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
}
