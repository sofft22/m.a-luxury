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
    <section id="hero" className="relative w-full h-[60vh] md:h-[85vh] min-h-[450px] bg-black">
      
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
        
        {/* Dark gradient overlay for text readability */}
        <div className="absolute inset-0 z-20 bg-black/30 md:bg-black/40" />
        <div className="absolute inset-0 z-20 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
      </div>

      {/* TEXT OVERLAY */}
      <div className="relative z-30 flex h-full flex-col items-center justify-center px-5 text-center">
        
        <h1
          className="text-white font-normal leading-[0.95] tracking-tight text-[56px] sm:text-[72px] md:text-[96px] drop-shadow-lg"
          style={{ fontFamily: "var(--font-cormorant), serif" }}
        >
          Your crown,
          <br />
          <span className="italic text-gold">elevated.</span>
        </h1>

        {/* Shortened Text */}
        <p
          className="mt-4 max-w-[280px] text-[13px] md:text-[15px] leading-relaxed text-white/90 drop-shadow-md"
          style={{ fontFamily: "var(--font-inter), sans-serif" }}
        >
          Signature braids & premium extensions. Book on WhatsApp.
        </p>

        {/* CTAs */}
        <div className="mt-8 flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <a
            href={bookLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-brand-700 px-8 py-3.5 text-center text-[11px] font-bold uppercase tracking-[0.1em] text-white shadow-xl shadow-brand-900/50 transition-all hover:bg-brand-900 hover:-translate-y-0.5"
            style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
          >
            Book Appointment
          </a>

          <Link
            href="/shop"
            className="rounded-full border border-white/40 bg-white/10 backdrop-blur-md px-8 py-3.5 text-center text-[11px] font-bold uppercase tracking-[0.1em] text-white transition-all hover:bg-white hover:text-ink"
            style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
          >
            Shop Extensions
          </Link>
        </div>
      </div>

    </section>
  );
}
