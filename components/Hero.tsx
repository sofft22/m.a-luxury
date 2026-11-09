"use client";

import Link from "next/link";

const CATEGORIES = [
  {
    title: "Braids",
    items: [
      "Knotless Braids",
      "Boho Braids",
      "Stitch Braids",
      "Feed-in Braids"
    ]
  },
  {
    title: "Locs & Twists",
    items: [
      "Locs & Relocs",
      "Twists (with expression)",
      "Kinky Twists",
      "Marley Twists"
    ]
  },
  {
    title: "Installs & Styling",
    items: [
      "Sew-ins",
      "Retouch & Washing",
      "Hair Straightening"
    ]
  },
  {
    title: "Beauty",
    items: [
      "Lash Extensions",
      "Brow Lamination & Tint",
      "SPMU Brows"
    ]
  },
  {
    title: "More",
    items: [
      "Piercing",
      "New Client Consultation"
    ]
  }
];

export function ServicesPreview() {
  return (
    <section className="w-full bg-[#FAF7FE] py-20 px-5 md:py-28 md:px-8 border-t border-brand-100">
      <div className="mx-auto max-w-6xl">
        
        {/* HEADER */}
        <div className="mb-16 flex flex-col items-center text-center">
          <p 
            className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold mb-3"
            style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
          >
            ✦ The M.a Experience
          </p>
          <h2 
            className="text-[32px] sm:text-[44px] text-ink leading-tight" 
            style={{ fontFamily: 'var(--font-cormorant), serif' }}
          >
            What We Offer
          </h2>
          <div className="w-8 h-[1px] bg-ink/20 mt-6" />
        </div>

        {/* EDITORIAL MENU LAYOUT (Grid of Text Columns) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 md:gap-8">
          {CATEGORIES.map((category, idx) => (
            <div key={idx} className="flex flex-col">
              {/* Category Title */}
              <h3 
                className="text-[20px] text-brand-700 italic mb-4 pb-2 border-b border-brand-700/20"
                style={{ fontFamily: 'var(--font-cormorant), serif' }}
              >
                {category.title}
              </h3>
              
              {/* Category Items */}
              <ul className="flex flex-col gap-3">
                {category.items.map((item, i) => (
                  <li key={i}>
                    <Link 
                      href={`/services#${category.title.toLowerCase()}`}
                      className="text-[13px] text-muted hover:text-ink transition-colors duration-300"
                      style={{ fontFamily: 'var(--font-inter), sans-serif' }}
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* BOTTOM CTA */}
        <div className="mt-16 flex justify-center">
          <Link 
            href="/services"
            className="group flex items-center gap-2 rounded-full border border-ink/20 px-8 py-3.5 text-center text-[10px] font-bold uppercase tracking-[0.15em] text-ink transition-all hover:bg-ink hover:text-white"
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
