"use client";

import Link from "next/link";

const CATEGORIES = [
  {
    title: "Braids",
    slug: "braids",
    items: [
      { name: "Knotless Braids", price: "from £100" },
      { name: "Boho Braids", price: "from £120" },
      { name: "Stitch Braids", price: "from £80" },
      { name: "Feed-in Braids", price: "from £70" }
    ]
  },
  {
    title: "Locs & Twists",
    slug: "locs-twists",
    items: [
      { name: "Locs & Relocs", price: "from £90" },
      { name: "Twists (Expression)", price: "from £85" },
      { name: "Kinky Twists", price: "from £95" },
      { name: "Marley Twists", price: "from £95" }
    ]
  },
  {
    title: "Installs & Styling",
    slug: "installs",
    items: [
      { name: "Sew-ins", price: "from £110" },
      { name: "Retouch & Wash", price: "from £40" },
      { name: "Hair Straightening", price: "from £30" }
    ]
  },
  {
    title: "Beauty",
    slug: "beauty",
    items: [
      { name: "Lash Extensions", price: "from £45" },
      { name: "Brow Lamination", price: "from £35" },
      { name: "SPMU Brows", price: "from £150" }
    ]
  }
];

export function ServicesPreview() {
  return (
    <section className="w-full bg-white py-20 px-5 md:py-32 md:px-8 border-t border-brand-100">
      <div className="mx-auto max-w-6xl">
        
        {/* EDITORIAL HEADER */}
        <div className="mb-20 flex flex-col items-center text-center">
          <h2 
            className="text-[40px] sm:text-[56px] md:text-[72px] text-ink leading-[1.05] tracking-tight" 
            style={{ fontFamily: 'var(--font-cormorant), serif' }}
          >
            Services We Offer
          </h2>
          <div className="w-12 h-[1px] bg-gold mt-6" />
          <p 
            className="mt-6 text-[10px] font-bold uppercase tracking-[0.2em] text-muted"
            style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
          >
            Tap any category to view options
          </p>
        </div>

        {/* 2-COLUMN LUXURY MENU GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 lg:gap-x-32 gap-y-16 md:gap-y-24">
          {CATEGORIES.map((category, idx) => (
            <div key={idx} className="flex flex-col group">
              
              {/* Category Header (Clickable) */}
              <Link href={`/services/${category.slug}`} className="block">
                <div className="flex items-baseline justify-between border-b border-ink/10 pb-4 mb-6 group-hover:border-brand-700 transition-colors">
                  <h3 
                    className="text-[32px] md:text-[40px] text-ink italic group-hover:text-brand-700 transition-colors"
                    style={{ fontFamily: 'var(--font-cormorant), serif' }}
                  >
                    {category.title}
                  </h3>
                  
                  {/* ARROW INDICATOR */}
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-50 text-brand-700 opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-2">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </Link>
              
              {/* Category Items */}
              <ul className="flex flex-col gap-5 flex-grow mb-8">
                {category.items.map((item, i) => (
                  <li key={i} className="flex items-baseline justify-between group/item">
                    <span 
                      className="text-[14px] md:text-[15px] text-ink font-medium transition-colors group-hover/item:text-brand-700"
                      style={{ fontFamily: 'var(--font-inter), sans-serif' }}
                    >
                      {item.name}
                    </span>
                    {/* Dotted line connecting name to price */}
                    <div className="flex-grow border-b border-dotted border-ink/20 mx-4 relative -top-1" />
                    <span 
                      className="text-[12px] md:text-[13px] text-muted whitespace-nowrap"
                      style={{ fontFamily: 'var(--font-inter), sans-serif' }}
                    >
                      {item.price}
                    </span>
                  </li>
                ))}
              </ul>

              {/* See More Details Link */}
              <Link 
                href={`/services/${category.slug}`}
                className="group/link inline-flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.2em] text-gold transition-colors hover:text-ink w-fit mt-auto"
                style={{ fontFamily: 'var(--font-inter), sans-serif' }}
              >
                View {category.title} Options
                <span className="transition-transform group-hover/link:translate-x-1">→</span>
              </Link>
            </div>
          ))}
        </div>

        {/* FINAL CTA */}
        <div className="mt-24 flex justify-center">
          <Link 
            href="/services"
            className="group flex items-center gap-3 rounded-full border border-ink/20 px-10 py-5 text-center text-[10px] font-bold uppercase tracking-[0.2em] text-ink transition-all hover:bg-ink hover:text-white"
            style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
          >
            View Full Service Menu & Pricing
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>

      </div>
    </section>
  );
}
