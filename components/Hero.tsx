"use client";

import Image from "next/image";
import Link from "next/link";

const WHATSAPP_NUMBER = "440000000000"; // Replace later

function bookLink() {
  const text = "Hi M.a Luxury! I'd like to book an appointment 💜";
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

export function Hero() {
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

          {/* LEFT — IMAGE */}
          <div className="order-1 lg:order-1">
            <div className="relative w-full aspect-[4/5] lg:aspect-[5/6] rounded-[32px] overflow-hidden shadow-2xl ring-1 ring-brand-100">
              <Image
                src="https://images.unsplash.com/photo-1605980776566-0486c3ac7617?w=1400&q=80" 
                alt="M.a Luxury Hair"
                fill
                priority
                unoptimized
                className="object-cover object-center"
              />
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

            {/* RESTORED PREMIUM FONT & REDUCED TEXT */}
            <h1
              className="text-ink font-normal leading-[0.95] tracking-tight text-[56px] sm:text-[72px] md:text-[88px]"
              style={{ fontFamily: "var(--font-cormorant), serif" }}
            >
              Your crown,
              <br />
              <span className="italic text-brand-700">elevated.</span>
            </h1>

            {/* REDUCED PARAGRAPH */}
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
