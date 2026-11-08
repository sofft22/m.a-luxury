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

  // Auto-swap every 3.5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  // Swipe logic
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
    <section className="relative w-full bg-white pt-[80px] md:pt-[100px]">
      
      {/* FULL-WIDTH IMAGE CAROUSEL (Edge to Edge) */}
      <div 
        className="relative w-full h-[50vh] md:h-[65vh] min-h-[400px] overflow-hidden"
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
            className={`object-cover object-center absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentImage ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          />
        ))}
        
        {/* Subtle gradient at the bottom to blend into the white text area */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white to-transparent z-20 pointer-events-none" />
      </div>

      {/* TEXT SECTION (Smart & Underneath) */}
      <div className="relative z-30 mx-auto max-w-4xl px-5 md:px-8 -mt-16 md:-mt-24 flex flex-col items-center text-center">
        
        <p
          className="text-brand-700 text-[10px] md:text-[11px] font-bold uppercase tracking-[0.3em] mb-4 bg-white px-4 py-2 rounded-full shadow-sm ring-1 ring-brand-100"
          style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
        >
          Plymouth's Luxury Hair Destination
        </p>

        <h1
          className="text-ink font-normal leading-[0.95] tracking-tight text-[56px] sm:text-[72px] md:text-[88px]"
          style={{ fontFamily: "var(--font-cormorant), serif" }}
        >
          Your crown,
          <br />
          <span className="italic text-brand-700">elevated.</span>
        </h1>

        <p
          className="mt-6 max-w-[340px] text-[14px] md:text-[15px] leading-relaxed text-muted"
          style={{ fontFamily: "var(--font-inter), sans-serif" }}
        >
          Signature braids, locs & premium extensions. 
          Booked in seconds on WhatsApp.
        </p>

        {/* CTAs */}
        <div className="mt-8 flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <a
            href={bookLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-brand-700 px-8 py-3.5 text-center text-[11px] font-bold uppercase tracking-[0.1em] text-white shadow-lg shadow-brand-700/30 transition-all hover:bg-brand-900 hover:-translate-y-0.5"
            style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
          >
            Book Appointment
          </a>

          <Link
            href="/shop"
            className="rounded-full border-2 border-brand-700/20 px-8 py-3.5 text-center text-[11px] font-bold uppercase tracking-[0.1em] text-brand-700 transition-all hover:border-brand-700 hover:bg-brand-50"
            style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
          >
            Shop Extensions
          </Link>
        </div>
      </div>

      {/* Bottom spacing */}
      <div className="h-16 md:h-24" />

    </section>
  );
}
