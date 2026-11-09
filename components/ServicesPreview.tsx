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
    <section className="w-full bg-white py-16 px-5 md:py-24 md:px-8 border-t border-brand-100">
      <div className="mx-auto max-w-6xl">
        
        {/* CLEAN HEADER */}
        <div className="mb-12 flex flex-col items-center text-center">
          <h2 
            className="text-[32px] sm:text-[44px] text-ink leading-tight" 
            style={{ fontFamily: 'var(--font-cormorant), serif' }}
          >
            Services We Offer
          </h2>
        </div>

        {/* EDITORIAL MENU LAYOUT */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-12 md:gap-8">
          {CATEGORIES.map((category, idx) => (
            <div key={idx} className="flex flex-col h-full">
              {/* Category Title */}
              <h3 
                className="text-[18px] md:text-[20px] text-brand-700 italic mb-4 pb-2 border-b border-brand-700/20"
                style={{ fontFamily: 'var(--font-cormorant), serif' }}
              >
                {category.title}
              </h3>
              
              {/* Category Items with Prices */}
              <ul className="flex flex-col gap-3 flex-grow">
                {category.items.map((item, i) => (
                  <li key={i} className="flex flex-col">
                    <Link 
                      href={`/services#${category.slug}`}
                      className="text-[12px] md:text-[13px] text-ink hover:text-brand-700 transition-colors duration-300"
                      style={{ fontFamily: 'var(--font-inter), sans-serif' }}
                    >
                      {item.name}
                    </Link>
                    <span 
                      className="text-[10px] md:text-[11px] text-muted mt-0.5"
                      style={{ fontFamily: 'var(--font-inter), sans-serif' }}
                    >
                      {item.price}
                    </span>
                  </li>
                ))}
              </ul>

              {/* SEE MORE DETAILS LINK - GOLD */}
              <div className="mt-6 pt-4 border-t border-brand-100">
                <Link 
                  href={`/services#${category.slug}`}
                  className="group/link inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-[0.1em] text-gold transition-colors hover:text-brand-700"
                  style={{ fontFamily: 'var(--font-inter), sans-serif' }}
                >
                  See More Details
                  <span className="transition-transform group-hover/link:translate-x-1">→</span>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* FINAL CTA UNDER THE SECTION */}
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
