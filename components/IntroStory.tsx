"use client";

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

      <div className="relative z-10 mx-auto max-w-3xl flex flex-col items-center text-center">
        
        {/* TOP LABEL */}
        <span className="text-gold text-[10px] font-bold uppercase tracking-[0.4em] mb-6 flex items-center gap-3">
          <span className="w-8 h-[1px] bg-gold/50"></span>
          Our Story
          <span className="w-8 h-[1px] bg-gold/50"></span>
        </span>
        
        {/* HEADLINE */}
        <h2 
          className="text-[40px] sm:text-[56px] md:text-[68px] text-ink leading-[1.05] tracking-tight mb-8" 
          style={{ fontFamily: 'var(--font-cormorant), serif' }}
        >
          Elevating your <span className="italic text-brand-700">natural beauty.</span>
        </h2>

        {/* SHORTENED SMART TEXT */}
        <p 
          className="text-[15px] md:text-[17px] leading-loose text-muted max-w-2xl"
          style={{ fontFamily: 'var(--font-inter), sans-serif' }}
        >
          Welcome to M.a Luxury, Plymouth's premier destination for flawless braiding, expert loc maintenance, and premium extensions. We blend technical precision with a luxury VIP experience to protect your hair and elevate your everyday style.
        </p>

      </div>
    </section>
  );
}
