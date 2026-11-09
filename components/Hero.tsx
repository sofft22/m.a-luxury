"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

const WHATSAPP_NUMBER = "440000000000"; // Replace later

const HERO_IMAGES = [
  "/hero-1.jpg",
  "/hero-2.jpg",
  "/hero-3.jpg",
  "/hero-4.jpg",
];

function bookLink() {
  const text = "Hi M.a Luxury! I'd like to book an appointment 💜";
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

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
    // REDUCED MOBILE HEIGHT TO 68VH
    <section id="hero" className="relative w-full h-[68vh] md:h-[93vh] min-h-[500px] bg-ink">
      
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
        <div className="absolute inset-0 z-20 bg-gradient-to-t from-black/90 via-black/40 to-black/30" />
      </div>

      {/* TEXT LAYOUT - PUSHED TO THE BOTTOM */}
      <div className="relative z-30 flex h-full items-end pb-12 md:pb-24">
        <div className="mx-auto w-full max-w-7xl px-5 md:px-12">
          
          <div className="max-w-xl md:max-w-2xl">
            
            <h1
              className="text-white font-normal leading-[1.05] tracking-tight text-[42px] sm:text-[60px] md:text-[76px]"
              style={{ fontFamily: "var(--font-cormorant), serif" }}
            >
              Luxury Braids & 
              <br />
              <span className="italic text-gold">Premium Extensions.</span>
            </h1>

            {/* SIDE BY SIDE CTAs */}
            <div className="mt-6 md:mt-8 flex flex-row gap-3 sm:gap-4">
              <a
                href={bookLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-1 sm:flex-none sm:w-48 items-center justify-center rounded-full bg-white px-4 py-3.5 sm:px-8 sm:py-4 text-center text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.1em] sm:tracking-[0.15em] text-ink transition-all hover:bg-gray-100"
                style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
              >
                Book Now
              </a>

              <Link
                href="/shop"
                className="flex flex-1 sm:flex-none sm:w-48 items-center justify-center rounded-full border border-white/40 px-4 py-3.5 sm:px-8 sm:py-4 text-center text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.1em] sm:tracking-[0.15em] text-white transition-all hover:bg-white/10"
                style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
              >
                Shop Hair
              </Link>
            </div>
            
          </div>

        </div>
      </div>

    </section>
  );
}
