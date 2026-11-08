"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const WHATSAPP_NUMBER = "440000000000"; // Replace later

// FIXED PATHS: Directly inside public, exact names from your screenshot
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

  // Auto-swap every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full overflow-hidden bg-white pt-[120px] pb-16 md:pt-[160px] md:pb-24">
      
      {/* Soft bright background glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse at 70% 30%, rgba(217, 70, 239, 0.08) 0%, transparent 60%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* LEFT — CAROUSEL */}
          <div className="order-1 lg:order-1">
            <div className="relative w-full aspect-[4/5] lg:aspect-[5/6] rounded-[32px] overflow-hidden shadow-2xl ring-1 ring-brand-100 bg-brand-50">
              
              {HERO_IMAGES.map((src, index) => (
                <Image
                  key={src}
                  src={src}
                  alt={`M.a Luxury Hair ${index + 1}`}
                  fill
                  priority={index === 0} // Load first image immediately
                  className={`object-cover object-center transition-opacity duration-1000 ease-in-out ${
                    index === currentImage ? "opacity-100 z-10" : "opacity-0 z-0"
                  }`}
                />
              ))}

              {/* Little dots at the bottom */}
              <div className="absolute bottom-5 left-0 right-0 z-20 flex justify-center gap-2">
                {HERO_IMAGES.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImage(idx)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      idx === currentImage ? "w-6 bg-white" : "w-1.5 bg-white/50"
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>

            </div>
          </div>

          {/* RIGHT — TEXT */}
          <div className="order-2 lg:order-2 text-center lg:text-left">
            
            <p
              className="text-brand-700 text-[10px] font-bold uppercase tracking-[0.25em] mb-4"
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
              className="mt-6 mx-auto lg:mx-0 max-w-[340px] text-[14px] md:text-[15px] leading-relaxed text-muted"
              style={{ fontFamily: "var(--font-inter), sans-serif" }}
            >
              Signature braids, locs & premium extensions. 
              Booked in seconds on WhatsApp.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4 max-w-md mx-auto lg:mx-0">
              <a
                href={bookLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 rounded-full bg-brand-700 px-8 py-4 text-center text-[11px] font-bold uppercase tracking-[0.1em] text-white shadow-lg shadow-brand-700/30 transition-all hover:bg-brand-900 hover:-translate-y-0.5"
                style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
              >
                Book Appointment
              </a>

              <Link
                href="/shop"
                className="flex-1 rounded-full border-2 border-brand-700/20 px-8 py-4 text-center text-[11px] font-bold uppercase tracking-[0.1em] text-brand-700 transition-all hover:border-brand-700 hover:bg-brand-50"
                style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
              >
                Shop Extensions
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
