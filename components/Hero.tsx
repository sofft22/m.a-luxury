"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

const HERO_IMAGES = [
  "/hero-1.jpg",
  "/hero-2.jpg",
  "/hero-3.jpg",
  "/hero-4.jpg",
];

export function Hero() {
  const [currentImage, setCurrentImage] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    if (distance > 50) {
      setCurrentImage((prev) => (prev + 1) % HERO_IMAGES.length);
    } else if (distance < -50) {
      setCurrentImage((prev) => (prev - 1 + HERO_IMAGES.length) % HERO_IMAGES.length);
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    // INCREASED HEIGHT
    <section id="hero" className="relative w-full h-[80vh] md:h-[95vh] min-h-[550px] bg-ink">
      
      {/* FULL BLEED IMAGES */}
      <div 
        className="absolute inset-0 overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {HERO_IMAGES.map((src, index) => (
          <Image
            key={src}
            src={src}
            alt={`M.a Luxury Hair ${index + 1}`}
            fill
            priority={index === 0}
            className={`object-cover object-[center_20%] absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentImage ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          />
        ))}
        
        {/* DARK OVERLAY FOR READABILITY */}
        <div className="absolute inset-0 z-20 bg-gradient-to-t from-black/90 via-black/50 to-black/30" />
      </div>

      {/* CENTERED TEXT LAYOUT */}
      <div className="relative z-30 flex h-full items-center justify-center text-center">
        <div className="mx-auto w-full max-w-4xl px-5 md:px-12 flex flex-col items-center">
          
          <h1
            className="text-white font-normal leading-[1.05] tracking-tight text-[52px] sm:text-[68px] md:text-[84px] drop-shadow-lg"
            style={{ fontFamily: "var(--font-cormorant), serif" }}
          >
            Hair &
            <br />
            <span className="italic text-gold">Beauty.</span>
          </h1>

          <p 
            className="mt-4 md:mt-6 text-white/80 text-[14px] md:text-[16px] max-w-md font-light tracking-wide"
            style={{ fontFamily: "var(--font-inter), sans-serif" }}
          >
            Expert braiding, locs, and premium extensions in Plymouth.
          </p>

          {/* CTAs */}
          <div className="mt-8 md:mt-10 flex flex-row gap-3 sm:gap-4">
            <Link
              href="/services"
              className="group flex items-center justify-center rounded-full bg-white px-8 py-3.5 sm:px-10 sm:py-4 text-center text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.1em] sm:tracking-[0.15em] text-ink transition-all hover:bg-gray-100 hover:scale-105"
              style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
            >
              Book Now
            </Link>

            <Link
              href="/shop"
              className="flex items-center justify-center rounded-full border border-white/40 px-8 py-3.5 sm:px-10 sm:py-4 text-center text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.1em] sm:tracking-[0.15em] text-white transition-all hover:bg-white/10 hover:scale-105"
              style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
            >
              Shop Hair
            </Link>
          </div>
          
        </div>
      </div>

    </section>
  );
}
