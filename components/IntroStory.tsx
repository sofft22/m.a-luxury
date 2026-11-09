"use client";

import Image from "next/image";

export function IntroStory() {
  return (
    <section className="relative w-full bg-[#FAF7FE] py-20 md:py-32 px-5 md:px-8 overflow-hidden">
      
      {/* MASSIVE BACKGROUND TEXT (The "Dope" element) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none select-none overflow-hidden flex justify-center opacity-[0.03]">
        <span 
          className="text-[150px] md:text-[300px] font-bold whitespace-nowrap leading-none text-ink"
          style={{ fontFamily: 'var(--font-cormorant), serif' }}
        >
          M.A LUXURY
        </span>
      </div>

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
          
          {/* LEFT: Image with a unique overlapping frame */}
          <div className="relative">
            {/* The offset background block */}
            <div className="absolute inset-0 bg-brand-200 translate-x-4 translate-y-4 rounded-[32px] -z-10" />
            
            <div className="relative w-full aspect-[4/5] rounded-[32px] overflow-hidden shadow-2xl">
              <Image
                src="/hero-2.jpg" // Change this to a close-up detail shot of braids if you have one
                alt="M.a Luxury Styling"
                fill
                className="object-cover object-center"
              />
            </div>
          </div>

          {/* RIGHT: The Story */}
          <div className="flex flex-col items-start text-left">
            <span className="text-gold text-[10px] font-bold uppercase tracking-[0.3em] mb-4 flex items-center gap-2">
              <span className="w-8 h-[1px] bg-gold"></span>
              The M.a Standard
            </span>
            
            <h2 
              className="text-[36px] sm:text-[48px] text-ink leading-[1.1] mb-6" 
              style={{ fontFamily: 'var(--font-cormorant), serif' }}
            >
              Elevating your <br/>
              <span className="italic text-brand-700">natural beauty.</span>
            </h2>
            
            <p 
              className="text-[14px] md:text-[15px] leading-loose text-muted mb-8"
              style={{ fontFamily: 'var(--font-inter), sans-serif' }}
            >
              Welcome to M.a Luxury, Plymouth's premier destination for flawless braiding, expert loc maintenance, and premium hair extensions. We blend technical precision with a luxury VIP experience to protect your natural hair and elevate your everyday style.
            </p>

            <div className="flex flex-col gap-2 border-l border-brand-200 pl-4">
               <p className="text-[12px] font-bold uppercase tracking-[0.1em] text-ink" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                 Expert Technique.
               </p>
               <p className="text-[12px] font-bold uppercase tracking-[0.1em] text-ink" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                 Luxury Atmosphere.
               </p>
               <p className="text-[12px] font-bold uppercase tracking-[0.1em] text-brand-700" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                 Flawless Results.
               </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
