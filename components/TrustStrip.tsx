export function TrustStrip() {
  return (
    <section className="relative w-full bg-brand-50 border-y border-brand-100 py-4 md:py-6 overflow-hidden">
      
      {/* Left Fade Gradient */}
      <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-brand-50 to-transparent z-10 pointer-events-none" />
      
      {/* Right Fade Gradient */}
      <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-brand-50 to-transparent z-10 pointer-events-none" />

      {/* MARQUEE CONTAINER */}
      <div className="flex w-max animate-marquee-slow">
        
        {/* We duplicate the list twice to create a seamless loop */}
        {[1, 2].map((loop) => (
          <div key={loop} className="flex items-center gap-8 md:gap-16 px-4 md:px-8 shrink-0">
            
            <span 
              className="text-[10px] md:text-[12px] font-bold uppercase tracking-[0.2em] text-brand-900 flex items-center gap-2 shrink-0"
              style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
            >
              <svg width="8" height="8" viewBox="0 0 24 24" fill="currentColor" className="text-gold">
                <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
              </svg>
              Signature Braiding
            </span>

            <span 
              className="text-[10px] md:text-[12px] font-bold uppercase tracking-[0.2em] text-brand-900 flex items-center gap-2 shrink-0"
              style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
            >
              <svg width="8" height="8" viewBox="0 0 24 24" fill="currentColor" className="text-gold">
                <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
              </svg>
              Luxury Hair Extensions
            </span>

            <span 
              className="text-[10px] md:text-[12px] font-bold uppercase tracking-[0.2em] text-brand-900 flex items-center gap-2 shrink-0"
              style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
            >
              <svg width="8" height="8" viewBox="0 0 24 24" fill="currentColor" className="text-gold">
                <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
              </svg>
              VIP Experience
            </span>

          </div>
        ))}
      </div>
    </section>
  );
}
