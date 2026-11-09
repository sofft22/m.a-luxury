"use client";

import Link from "next/link";

export function IntroStory() {
  return (
    <section className="relative w-full bg-white py-24 md:py-32 px-5 md:px-8 overflow-hidden border-b border-brand-100">
      
      {/* MASSIVE BACKGROUND TEXT */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none select-none overflow-hidden flex justify-center opacity-[0.03]">
        <span 
          className="text-[120px] md:text-[280px] font-bold whitespace-nowrap leading-none text-ink"
          style={{ fontFamily: 'var(--font-cormorant), serif' }}
        >
          M.A LUXURY
        </span>
      </div>

      <div className="relative z-10 mx-auto max-w-5xl">
        
        {/* TOP HEADER */}
        <div className="flex flex-col items-center text-center mb-12">
          <span className="text-gold text-[10px] font-bold uppercase tracking-[0.4em] mb-6 flex items-center gap-3">
            <span className="w-8 h-[1px] bg-gold/50"></span>
            Our Story
            <span className="w-8 h-[1px] bg-gold/50"></span>
          </span>
          
          <h2 
            className="text-[40px] sm:text-[56px] md:text-[72px] text-ink leading-[1.05] tracking-tight max-w-3xl" 
            style={{ fontFamily: 'var(--font-cormorant), serif' }}
          >
            Elevating your <span className="italic text-brand-700">natural beauty.</span>
          </h2>
        </div>

        {/* 2-COLUMN TEXT LAYOUT */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-start max-w-4xl mx-auto">
          
          <div className="flex flex-col gap-6">
            <p 
              className="text-[15px] md:text-[16px] leading-loose text-ink/80 font-medium"
              style={{ fontFamily: 'var(--font-inter), sans-serif' }}
            >
              Welcome to M.a Luxury, Plymouth's premier destination for flawless braiding, expert loc maintenance, and premium hair extensions. 
            </p>
            <p 
              className="text-[14px] leading-loose text-muted"
              style={{ fontFamily: 'var(--font-inter), sans-serif' }}
            >
              We blend technical precision with a luxury VIP experience to protect your natural hair and elevate your everyday style. 
            </p>
          </div>

          <div className="flex flex-col gap-6 md:pt-2">
            <p 
              className="text-[14px] leading-loose text-muted"
              style={{ fontFamily: 'var(--font-inter), sans-serif' }}
            >
              Whether you are looking for a complete transformation or routine maintenance, our goal is to ensure you leave our chair feeling confident, beautiful, and completely obsessed with your hair.
            </p>

            <Link 
              href="/book"
              className="group inline-flex items-center gap-2 border-b border-brand-700 pb-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-brand-700 transition-colors hover:text-ink hover:border-ink mt-4 w-fit"
              style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
            >
              Experience the standard
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
