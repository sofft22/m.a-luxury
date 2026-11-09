"use client";

import Link from "next/link";

const CATEGORIES = [
  {
    title: "Braids",
    items: [
      { name: "Knotless Braids", price: "from £100" },
      { name: "Boho Braids", price: "from £120" },
      { name: "Stitch Braids", price: "from £80" },
      { name: "Feed-in Braids", price: "from £70" }
    ]
  },
  {
    title: "Locs & Twists",
    items: [
      { name: "Locs & Relocs", price: "from £90" },
      { name: "Twists (Expression)", price: "from £85" },
      { name: "Kinky Twists", price: "from £95" },
      { name: "Marley Twists", price: "from £95" }
    ]
  },
  {
    title: "Installs & Styling",
    items: [
      { name: "Sew-ins", price: "from £110" },
      { name: "Retouch & Wash", price: "from £40" },
      { name: "Hair Straightening", price: "from £30" }
    ]
  },
  {
    title: "Beauty",
    items: [
      { name: "Lash Extensions", price: "from £45" },
      { name: "Brow Lamination", price: "from £35" },
      { name: "SPMU Brows", price: "from £150" }
    ]
  },
  {
    title: "More",
    items: [
      { name: "Piercing", price: "from £15" },
      { name: "New Client Consult", price: "Free" }
    ]
  }
];

export function ServicesPreview() {
  return (
    <section className="w-full bg-white py-16 px-5 md:py-24 md:px-8 border-t border-brand-100">
      <div className="mx-auto max-w-6xl">
        
        {/* HEADER */}
        <div className="mb-12 flex flex-col items-center text-center">
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

        {/* EDITORIAL MENU LAYOUT: 2 columns mobile, 5 columns desktop */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-x-6 gap-y-10 md:gap-8">
          {CATEGORIES.map((category, idx) => {
            // Check if it's the last item (index 4)
            const isLastItem = idx === CATEGORIES.length - 1;

            return (
              <div 
                key={idx} 
                // If it's the last item on mobile, span 2 columns and center it. On desktop, it resets to 1 column.
                className={`flex flex-col ${
                  isLastItem ? "col-span-2 md:col-span-1 max-w-[200px] mx-auto md:max-w-none" : ""
                }`}
              >
                {/* Category Title */}
                <h3 
                  className="text-[18px] md:text-[20px] text-brand-700 italic mb-4 pb-2 border-b border-brand-700/20"
                  style={{ fontFamily: 'var(--font-cormorant), serif' }}
                >
                  {category.title}
                </h3>
                
                {/* Category Items with Prices */}
                <ul className="flex flex-col gap-3">
                  {category.items.map((item, i) => (
                    <li key={i} className="flex flex-col">
                      <Link 
                        href={`/services#${category.title.toLowerCase()}`}
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
              </div>
            );
          })}
        </div>

        {/* BOTTOM CTA */}
        <div className="mt-16 flex justify-center">
          <Link 
            href="/services"
            className="group flex items-center gap-2 rounded-full border border-ink/20 px-8 py-3.5 text-center text-[10px] font-bold uppercase tracking-[0.15em] text-ink transition-all hover:bg-ink hover:text-white"
            style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
          >
            View Full Service Menu
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>

      </div>
    </section>
  );
}
