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
    <section id="hero" className="relative w-full h-[70vh] md:h-[90vh] min-h-[550px] bg-ink">
      
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
            className={`object-cover object-top absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentImage ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          />
        ))}
        
        {/* PREMIUM EDITORIAL OVERLAY: Dark on the left, clear on the right */}
        <div className="absolute inset-0 z-20 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
      </div>

      {/* EDITORIAL TEXT LAYOUT (Left Aligned + Glass Panel) */}
      <div className="relative z-30 flex h-full items-center">
        <div className="mx-auto w-full max-w-7xl px-6 md:px-12">
          
          <div className="max-w-lg md:max-w-xl backdrop-blur-sm bg-white/5 border border-white/10 p-8 md:p-12 shadow-2xl">
            
            <p
              className="text-gold text-[10px] font-bold uppercase tracking-[0.3em] mb-4"
              style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
            >
              M.a Luxury · Plymouth
            </p>

            <h1
              className="text-white font-light leading-[0.95] tracking-tight text-[56px] sm:text-[72px] md:text-[88px]"
              style={{ fontFamily: "var(--font-cormorant), serif" }}
            >
              The art of
              <br />
              <span className="italic font-normal text-white">elevation.</span>
            </h1>

            <p
              className="mt-6 max-w-sm text-[13px] md:text-[14px] leading-loose text-white/70 uppercase tracking-[0.1em]"
              style={{ fontFamily: "var(--font-inter), sans-serif" }}
            >
              Signature braids, luxury locs & premium extensions.
            </p>

            {/* REFINED CTAs */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <a
                href={bookLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center justify-center gap-2 overflow-hidden rounded-full bg-white px-8 py-4 text-center text-[10px] font-bold uppercase tracking-[0.15em] text-ink transition-all hover:bg-brand-700 hover:text-white"
                style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
              >
                Book Appointment
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </a>

              <Link
                href="/shop"
                className="flex items-center justify-center rounded-full border border-white/40 px-8 py-4 text-center text-[10px] font-bold uppercase tracking-[0.15em] text-white transition-all hover:bg-white/10"
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
