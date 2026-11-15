export function IntroStory() {
  return (
    <section className="relative w-full bg-[#FAF7FE] py-14 md:py-20 px-5 md:px-8 border-b border-brand-100">
      <div className="relative z-10 mx-auto max-w-2xl flex flex-col items-center text-center">
        
        {/* SHORTER HEADLINE */}
        <h2 
          className="text-[28px] sm:text-[36px] md:text-[44px] text-ink leading-[1.1] tracking-tight mb-4" 
          style={{ fontFamily: 'var(--font-cormorant), serif' }}
        >
          Your beauty, <span className="italic text-brand-700">elevated.</span>
        </h2>

        {/* SHORTER TEXT */}
        <p 
          className="text-[13px] md:text-[14px] leading-relaxed text-muted max-w-md"
          style={{ fontFamily: 'var(--font-inter), sans-serif' }}
        >
          Plymouth's premier destination for flawless braiding, expert loc maintenance, and premium hair extensions.
        </p>

      </div>
    </section>
  );
}
