import Link from "next/link";

const CATEGORIES = [
  {
    id: "braids",
    title: "Braids",
    subCategories: ["Knotless Braids", "Boho Braids", "Stitch Braids", "Feed-in Braids"]
  },
  {
    id: "locs-twists",
    title: "Locs & Twists",
    subCategories: ["Locs", "Relocs", "Twists", "Kinky Twists", "Marley Twists"]
  },
  {
    id: "installs",
    title: "Installs & Styling",
    subCategories: ["Sew-ins", "Retouch & Washing", "Hair Straightening", "Consultation"]
  },
  {
    id: "beauty",
    title: "Beauty & Piercing",
    subCategories: ["Lash Extensions", "Brow Tint & Lamination", "SPMU", "Piercing"]
  }
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-[#FAF7FE] pt-[80px] md:pt-[100px] pb-24">
      
      {/* HEADER */}
      <section className="bg-ink py-16 px-6 md:py-24 md:px-12 text-center">
        <div className="mx-auto max-w-4xl">
          <h1 
            className="text-[40px] md:text-[64px] text-white leading-tight mb-4" 
            style={{ fontFamily: 'var(--font-cormorant), serif' }}
          >
            Our Services
          </h1>
          <p 
            className="text-[13px] md:text-[14px] text-white/60 uppercase tracking-[0.2em]"
            style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
          >
            Select a category to view options
          </p>
        </div>
      </section>

      {/* EDITORIAL LIST */}
      <section className="mx-auto max-w-5xl px-4 py-12 md:px-8 md:py-20">
        <div className="flex flex-col border-t border-ink/10">
          
          {CATEGORIES.map((category, idx) => (
            <Link 
              key={idx} 
              href={`/services/${category.id}`}
              className="group relative flex flex-col md:flex-row md:items-center justify-between py-10 md:py-14 border-b border-ink/10 hover:bg-white transition-colors px-4 md:px-8 -mx-4 md:-mx-8"
            >
              
              {/* LEFT: Number & Title */}
              <div className="flex items-baseline gap-6 md:gap-10">
                <span 
                  className="text-[12px] font-bold text-ink/30 tracking-widest"
                  style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
                >
                  0{idx + 1}
                </span>
                <h2 
                  className="text-[36px] md:text-[56px] text-ink group-hover:text-brand-700 transition-colors"
                  style={{ fontFamily: 'var(--font-cormorant), serif' }}
                >
                  {category.title}
                </h2>
              </div>

              {/* RIGHT: Subcategories & Arrow */}
              <div className="mt-6 md:mt-0 flex items-center justify-between md:justify-end gap-8 w-full md:w-auto">
                
                {/* Subcategories (fade in on hover for desktop, always visible on mobile) */}
                <div className="flex flex-wrap gap-x-4 gap-y-2 max-w-sm md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
                  {category.subCategories.map((sub, i) => (
                    <span 
                      key={i}
                      className="text-[10px] md:text-[11px] font-bold uppercase tracking-wider text-muted"
                      style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
                    >
                      {sub}
                    </span>
                  ))}
                </div>

                {/* Arrow Icon */}
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-700 group-hover:bg-brand-700 group-hover:text-white transition-all transform group-hover:translate-x-2">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>

            </Link>
          ))}

        </div>
      </section>
    </main>
  );
}
