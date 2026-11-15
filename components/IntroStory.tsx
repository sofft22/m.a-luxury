export function IntroStory() {
  return (
    <section className="relative w-full bg-[#FAF7FE] py-16 md:py-24 px-5 md:px-8 border-b border-brand-100">
      <div className="relative z-10 mx-auto max-w-3xl flex flex-col items-center text-center">
        
        {/* HEADLINE */}
        <h2 
          className="text-[32px] sm:text-[44px] md:text-[56px] text-ink leading-[1.1] tracking-tight mb-5" 
          style={{ fontFamily: 'var(--font-cormorant), serif' }}
        >
          Elevating your <span className="italic text-brand-700">natural beauty.</span>
        </h2>

        {/* SHORTENED SMART TEXT */}
        <p 
          className="text-[14px] md:text-[16px] leading-relaxed text-muted max-w-lg"
          style={{ fontFamily: 'var(--font-inter), sans-serif' }}
        >
          Plymouth's premier destination for flawless braiding, expert loc maintenance, and premium extensions. 
          We blend technical precision with a luxury VIP experience.
        </p>

      </div>
    </section>
  );
}
