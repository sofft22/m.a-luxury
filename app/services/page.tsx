import Link from "next/link";
import Image from "next/image";

const CATEGORIES = [
  {
    id: "braids",
    title: "Braids",
    image: "/hero-1.jpg",
    subCategories: ["Knotless", "Boho", "Stitch", "Feed-in"]
  },
  {
    id: "locs-twists",
    title: "Locs & Twists",
    image: "/hero-2.jpg",
    subCategories: ["Locs", "Relocs", "Twists", "Kinky", "Marley"]
  },
  {
    id: "installs",
    title: "Installs & Styling",
    image: "/hero-3.jpg",
    subCategories: ["Sew-ins", "Retouch & Wash", "Straightening"]
  },
  {
    id: "beauty",
    title: "Beauty & Piercing",
    image: "/hero-4.jpg",
    subCategories: ["Lashes", "Brows", "SPMU", "Piercing"]
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
            className="text-[14px] md:text-[16px] text-white/70 max-w-lg mx-auto"
            style={{ fontFamily: 'var(--font-inter), sans-serif' }}
          >
            Select a category below to view specific treatments, sizes, and options. 
            All bookings require a £10 deposit.
          </p>
        </div>
      </section>

      {/* 4-COLUMN GRID */}
      <section className="mx-auto max-w-7xl px-4 py-12 md:px-8 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {CATEGORIES.map((category, idx) => (
            <Link 
              key={idx} 
              href={`/services/${category.id}`}
              className="group flex flex-col"
            >
              {/* Image Card */}
              <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden shadow-sm border border-brand-100 mb-5">
                <Image
                  src={category.image}
                  alt={category.title}
                  fill
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Text Area */}
              <div className="flex flex-col">
                <h3 
                  className="text-[24px] md:text-[28px] text-ink leading-tight mb-3 group-hover:text-brand-700 transition-colors"
                  style={{ fontFamily: 'var(--font-cormorant), serif' }}
                >
                  {category.title}
                </h3>
                
                {/* SUB-CATEGORY TAGS */}
                <div className="flex flex-wrap gap-2">
                  {category.subCategories.map((sub, i) => (
                    <span 
                      key={i} 
                      className="text-[10px] font-bold uppercase tracking-wider text-muted bg-brand-50 px-2.5 py-1 rounded-sm"
                      style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
                    >
                      {sub}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

    </main>
  );
}
