"use client";

import Image from "next/image";
import Link from "next/link";

// USING EXACTLY YOUR 8 IMAGES FROM THE PUBLIC FOLDER
const GALLERY_IMAGES = [
  { src: "/Lashes.jpg", title: "Braids", size: "tall", fit: "object-cover object-top" }, // Added object-top here to show lashes
  { src: "/hero-1.jpg", title: "Signature Knotless", size: "square", fit: "object-cover" },
  { src: "/locs-category.jpg", title: "Locs & Maintenance", size: "tall", fit: "object-cover" },
  { src: "/hero-2.jpg", title: "Soft Curls", size: "square", fit: "object-cover" },
  { src: "/installs-category.jpg", title: "Installs & Styling", size: "square", fit: "object-cover" },
  { src: "/hero-3.jpg", title: "Neat Styling", size: "tall", fit: "object-cover" },
  { src: "/beauty-category.jpg", title: "Beauty & Piercing", size: "square", fit: "object-cover" },
  { src: "/hero-4.jpg", title: "Soft Glam", size: "tall", fit: "object-cover" }
];

const TIKTOK_URL = "https://www.tiktok.com/@m.aluxury1";

export function Gallery() {
  return (
    <section className="w-full bg-[#FAF7FE] py-12 px-4 md:py-16 md:px-6 border-t border-brand-100">
      <div className="mx-auto max-w-7xl">
        
        {/* HEADER */}
        <div className="mb-8 flex flex-col md:flex-row items-center md:items-end justify-between gap-4 text-center md:text-left">
          <div>
            <h2 
              className="text-[32px] sm:text-[44px] text-ink leading-tight" 
              style={{ fontFamily: 'var(--font-cormorant), serif' }}
            >
              The Style Edit
            </h2>
          </div>
          
          <Link 
            href={TIKTOK_URL} 
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 pb-1 text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.15em] text-brand-700 transition-colors hover:text-brand-900" 
            style={{ fontFamily: 'var(--font-inter), sans-serif' }}
          >
            <span className="border-b border-brand-700 pb-0.5 whitespace-nowrap">See More on TikTok</span>
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
        </div>

        {/* MASONRY GRID */}
        <div className="columns-2 md:columns-3 lg:columns-4 gap-2 md:gap-3 space-y-2 md:space-y-3">
          {GALLERY_IMAGES.map((img, idx) => (
            <Link
              key={idx}
              href={TIKTOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block w-full overflow-hidden rounded-lg break-inside-avoid"
            >
              <div 
                className={`relative w-full ${
                  img.size === "tall" ? "aspect-[3/4]" : "aspect-square"
                }`}
              >
                <Image
                  src={img.src}
                  alt={img.title}
                  fill
                  unoptimized={true}
                  // Changed this line to use the dynamic 'fit' property
                  className={`${img.fit} transition-transform duration-700 ease-out group-hover:scale-105`}
                />
                
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:flex flex-col items-center justify-center">
                  <span 
                    className="text-white text-[20px] italic translate-y-4 group-hover:translate-y-0 transition-transform duration-300 mb-3"
                    style={{ fontFamily: 'var(--font-cormorant), serif' }}
                  >
                    {img.title}
                  </span>
                  <span 
                    className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/90 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75 border-b border-white/50 pb-1"
                    style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
                  >
                    Watch on TikTok
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
