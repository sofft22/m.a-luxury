"use client";

import Image from "next/image";
import Link from "next/link";

const GALLERY_IMAGES = [
  {
    src: "/hero-1.jpg",
    title: "Signature Knotless",
    size: "tall",
  },
  {
    src: "/hero-2.jpg",
    title: "Soft Boho Curls",
    size: "square",
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
    src: "/hero-2.jpg",
    title: "Custom Installs",
    size: "square",
  },
  {
    src: "/hero-1.jpg",
    title: "Feed-in Braids",
    size: "tall",
  },
  {
    src: "/hero-4.jpg",
    title: "Marley Twists",
    size: "square",
  },
  {
    src: "/hero-3.jpg",
    title: "Bridal Styling",
    size: "tall",
  }
];

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
              Book the Look
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

        {/* MASONRY GRID - REDUCED GAPS */}
        <div className="columns-2 md:columns-3 lg:columns-4 gap-2 md:gap-3 space-y-2 md:space-y-3">
          {GALLERY_IMAGES.map((img, idx) => (
            <Link
              key={idx}
              href="/book"
              className="group relative block w-full overflow-hidden rounded-lg break-inside-avoid"
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
                    className="text-white text-[18px] italic translate-y-4 group-hover:translate-y-0 transition-transform duration-300 mb-3"
                    style={{ fontFamily: 'var(--font-cormorant), serif' }}
                  >
                    {img.title}
                  </span>
                  <span 
                    className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/90 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75 border-b border-white/50 pb-1"
                    style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
                  >
                    Book This Style
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
