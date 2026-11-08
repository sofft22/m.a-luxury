export function TrustStrip() {
  return (
    <section className="w-full bg-brand-50 border-y border-brand-100 py-6">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-16">
          <span className="text-[11px] md:text-[12px] font-bold uppercase tracking-[0.2em] text-brand-900 flex items-center gap-2" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
            <span className="text-gold text-[14px]">✦</span> Signature Braiding
          </span>
          <span className="hidden md:block h-1.5 w-1.5 rounded-full bg-brand-200" aria-hidden />
          <span className="text-[11px] md:text-[12px] font-bold uppercase tracking-[0.2em] text-brand-900 flex items-center gap-2" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
            <span className="text-gold text-[14px]">✦</span> Luxury Hair Extensions
          </span>
          <span className="hidden md:block h-1.5 w-1.5 rounded-full bg-brand-200" aria-hidden />
          <span className="text-[11px] md:text-[12px] font-bold uppercase tracking-[0.2em] text-brand-900 flex items-center gap-2" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
            <span className="text-gold text-[14px]">✦</span> VIP Experience
          </span>
        </div>
      </div>
    </section>
  );
}
