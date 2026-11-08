"use client";

import Image from "next/image";
import Link from "next/link";

const WHATSAPP_NUMBER = "440000000000"; // TODO: replace with real number

function bookLink() {
  const text = "Hi M.a Luxury! I'd like to book an appointment 💜";
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

export function Hero() {
  return (
    <section
      id="0"
      className="relative w-full overflow-hidden bg-white pt-[88px] pb-16 md:pt-[104px] md:pb-24"
    >
      {/* Very soft, bright glow in the background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse at 70% 30%, rgba(217, 70, 239, 0.08) 0%, transparent 60%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* LEFT — IMAGE CARD */}
          <div className="order-1 lg:order-1">
            <div className="relative w-full aspect-[4/5] lg:aspect-[5/6] rounded-[32px] overflow-hidden shadow-2xl ring-1 ring-brand-100">
              {/* Using a placeholder image that mimics the bright pink vibe */}
              <Image
                src="https://images.unsplash.com/photo-1595959183082-7b570b7e08e2?w=1400&q=80"
                alt="M.a Luxury — Hair & Beauty"
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
              className="text-brand-700 text-[11px] font-bold uppercase tracking-[0.2em] mb-4"
              style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
            >
              Premium Hair Studio
            </p>

            <h1
              className="text-ink font-normal leading-[1.1] tracking-tight text-[50px] sm:text-[64px] md:text-[80px]"
              style={{ fontFamily: "var(--font-inter), sans-serif" }}
            >
              Precision. Artistry.
              <br />
              <span className="font-bold text-brand-700">Confidence.</span>
            </h1>

            <p
              className="mt-6 mx-auto lg:mx-0 max-w-md text-[15px] md:text-[16px] leading-relaxed text-muted"
              style={{ fontFamily: "var(--font-inter), sans-serif" }}
            >
              Welcome to M.a Luxury, your destination for luxury braids and 
              trend-focused styling. We combine expert technique with premium 
              extensions to transform your look and elevate your story.
            </p>

            {/* DUAL PATH CTAs */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4 max-w-md mx-auto lg:mx-0">
              
              {/* Book a service - Bright Magenta */}
              <a
                href={bookLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 rounded-full bg-brand-700 px-8 py-4 text-center text-[11px] font-bold uppercase tracking-[0.1em] text-white shadow-lg shadow-brand-700/30 transition-all hover:bg-brand-900 hover:-translate-y-0.5"
                style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
              >
                Book Now
              </a>

              {/* Shop extensions - Outline */}
              <Link
                href="/shop"
                className="flex-1 rounded-full border-2 border-brand-700/20 px-8 py-4 text-center text-[11px] font-bold uppercase tracking-[0.1em] text-brand-700 transition-all hover:border-brand-700 hover:bg-brand-50"
                style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
              >
                Shop Hair
              </Link>
            </div>

            {/* VIP REPLACEMENT */}
            <div className="mt-10 flex items-center justify-center lg:justify-start">
              <p
                className="text-[10px] font-bold uppercase tracking-[0.25em] text-gold"
                style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
              >
                ✦ VIP Experience
              </p>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
