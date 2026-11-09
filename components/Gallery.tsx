"use client";

import Image from "next/image";
import Link from "next/link";

const WHATSAPP_NUMBER = "440000000000"; // Replace later

const GALLERY_IMAGES = [
  {
    src: "/hero-1.jpg",
    title: "Signature Knotless",
    size: "tall", // aspect-[3/4]
  },
  {
    src: "/hero-2.jpg",
    title: "Boho Curls",
    size: "square", // aspect-square
  },
  {
    src: "/hero-3.jpg",
    title: "Neat Locs",
    size: "tall",
  },
  {
    src: "/hero-4.jpg",
    title: "Passion Twists",
    size: "square",
  },
  {
    src: "/hero-1.jpg",
    title: "Custom Installs",
    size: "square",
  },
  {
    src: "/hero-2.jpg",
    title: "Soft Glam",
    size: "tall",
  },
];

export function Gallery() {
  return (
    <section className="w-full bg-[#FAF7FE] py-20 px-4 md:py-28 md:px-8 border-t border-brand-100">
      <div className="mx-auto max-w-7xl">
        
        {/* HEADER */}
        <div className="mb-12 flex flex-col md:flex-row items-center md:items-end justify-between gap-6 text-center md:text-left">
          <div>
            <p 
              className="text-gold text-[10px] font-bold uppercase tracking-[0.3em] mb-3"
              style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
            >
              ✦ Portfolio
            </p>
            <h2 
              className="text-[32px] sm:text-[44px] text-ink leading-tight" 
              style={{ fontFamily: 'var(--font-cormorant), serif' }}
            >
              The Lookbook
            </h2>
          </div>
          
          <Link 
            href="https://instagram.com/ma.luxury" 
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 pb-1 text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.15em] text-brand-700 transition-colors hover:text-brand-900" 
            style={{ fontFamily: 'var(--font-inter), sans-serif' }}
          >
            <span className="border-b border-brand-700 pb-0.5 whitespace-nowrap">See More on Instagram</span>
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
        </div>

        {/* MASONRY GRID */}
        <div className="columns-2 md:columns-3 gap-4 md:gap-6 space-y-4 md:space-y-6">
          {GALLERY_IMAGES.map((img, idx) => (
            <Link
              key={idx}
              href="/book"
              className="group relative block w-full overflow-hidden rounded-xl break-inside-avoid"
            >
              {/* Image Container with varying aspect ratios */}
              <div 
                className={`relative w-full ${
                  img.size === "tall" ? "aspect-[3/4]" : "aspect-square"
                }`}
              >
                <Image
                  src={img.src}
                  alt={img.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                
                {/* Hover Overlay (Desktop) */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:flex flex-col items-center justify-center">
                  <span 
                    className="text-white text-[18px] italic translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
                    style={{ fontFamily: 'var(--font-cormorant), serif' }}
                  >
                    {img.title}
                  </span>
                  <span 
                    className="mt-2 text-[9px] font-bold uppercase tracking-[0.2em] text-white/80 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75"
                    style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
                  >
                    Book This Look →
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
