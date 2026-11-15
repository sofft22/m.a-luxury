export function IntroStory() {
  return (
    <section className="relative w-full bg-[#FAF7FE] py-16 md:py-24 px-5 md:px-8 border-b border-brand-100">
      <div className="relative z-10 mx-auto max-w-3xl flex flex-col items-center text-center">
        
        {/* SHORTER HEADLINE */}
        <h2 
          className="text-[28px] sm:text-[36px] md:text-[44px] text-ink leading-[1.1] tracking-tight mb-8" 
          style={{ fontFamily: 'var(--font-cormorant), serif' }}
        >
          Look good. <span className="italic text-brand-700">Feel luxurious.</span>
        </h2>

        {/* MAIN TEXT */}
        <div className="flex flex-col gap-6 text-[13px] md:text-[14px] leading-loose text-muted max-w-xl mx-auto">
          <p style={{ fontFamily: 'var(--font-inter), sans-serif' }}>
            From flawless lashes to beautiful hair, locs and professional ear-piercing services, and perfectly polished nails we bring luxury, quality and attention to detail into every experience.
          </p>
          
          <p style={{ fontFamily: 'var(--font-inter), sans-serif' }}>
            Because you deserve to look good, feel good and live beautifully.
          </p>

          <p 
            className="text-[14px] md:text-[16px] text-ink italic mt-4" 
            style={{ fontFamily: 'var(--font-cormorant), serif' }}
          >
            M.A Luxury – Luxury isn’t just a look, it’s an experience. 💜
          </p>
        </div>

      </div>
    </section>
  );
}
