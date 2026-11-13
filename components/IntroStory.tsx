export function IntroStory() {
  return (
    <section className="relative w-full bg-[#FAF7FE] py-16 md:py-24 px-5 md:px-8 border-b border-brand-100">
      <div className="relative z-10 mx-auto max-w-3xl flex flex-col items-center text-center">
        
        {/* TOP LABEL */}
        <span className="text-gold text-[10px] font-bold uppercase tracking-[0.4em] mb-4 flex items-center gap-3">
          <span className="w-6 h-[1px] bg-gold/50"></span>
          Our Story
          <span className="w-6 h-[1px] bg-gold/50"></span>
        </span>
        
        {/* HEADLINE */}
        <h2 
          className="text-[32px] sm:text-[44px] md:text-[56px] text-ink leading-[1.1] tracking-tight mb-5" 
          style={{ fontFamily: 'var(--font-cormorant), serif' }}
        >
          Elevating your <span className="italic text-brand-700">natural beauty.</span>
        </h2>

        {/* SHORTENED SMART TEXT */}
        <p 
          className="text-[14px] md:text-[15px] leading-relaxed text-muted max-w-xl"
          style={{ fontFamily: 'var(--font-inter), sans-serif' }}
        >
          Plymouth's premier destination for flawless braiding, expert loc maintenance, and premium extensions. We blend technical precision with a luxury VIP experience.
        </p>

      </div>
    </section>
  );
}
