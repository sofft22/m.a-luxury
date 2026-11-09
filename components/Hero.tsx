export function TrustStrip() {
  return (
    <section className="w-full bg-brand-50 border-y border-brand-100 py-4 md:py-6 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        
        {/* Mobile: Horizontal Scrollable row. Desktop: Centered flexible row */}
        <div className="flex flex-row items-center justify-start md:justify-center gap-8 md:gap-16 overflow-x-auto no-scrollbar whitespace-nowrap">
          
          <span 
            className="text-[10px] md:text-[12px] font-bold uppercase tracking-[0.2em] text-brand-900 flex items-center gap-2 shrink-0"
            style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
          >
            {/* Smaller, cleaner diamond icon */}
            <svg width="8" height="8" viewBox="0 0 24 24" fill="currentColor" className="text-gold">
              <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
            </svg>
            Signature Braiding
          </span>

          <span className="hidden md:block h-1.5 w-1.5 rounded-full bg-brand-200 shrink-0" aria-hidden />

          <span 
            className="text-[10px] md:text-[12px] font-bold uppercase tracking-[0.2em] text-brand-900 flex items-center gap-2 shrink-0"
            style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
          >
            <svg width="8" height="8" viewBox="0 0 24 24" fill="currentColor" className="text-gold">
              <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
            </svg>
            Luxury Hair Extensions
          </span>

          <span className="hidden md:block h-1.5 w-1.5 rounded-full bg-brand-200 shrink-0" aria-hidden />

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
      </div>
    </section>
  );
}
