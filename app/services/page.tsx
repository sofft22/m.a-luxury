import Link from "next/link";
import Image from "next/image";

const CATEGORIES = [
  {
    id: "braids",
    title: "Braids",
    image: "/hero-1.jpg",
    subCategories: ["Knotless Braids", "Boho Braids", "Stitch Braids", "Feed-in Braids"]
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
    subCategories: ["Sew-ins", "Retouch & Wash", "Hair Straightening"]
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
            className="text-[13px] md:text-[14px] text-white/60 uppercase tracking-[0.2em]"
            style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
          >
            Select a category to view options
          </p>
        </div>
      </section>

      {/* 4-COLUMN GRID */}
      <section className="mx-auto max-w-7xl px-4 py-12 md:px-8 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
          {CATEGORIES.map((category, idx) => (
            <Link 
              key={idx} 
              href={`/services/${category.id}`}
              className="group flex flex-col"
            >
              {/* Image */}
              <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden shadow-sm border border-brand-100 mb-6">
                <Image
                  src={category.image}
                  alt={category.title}
                  fill
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              {/* Text Area */}
              <div className="flex flex-col text-center">
                <h3 
                  className="text-[28px] md:text-[32px] text-ink leading-tight mb-3 group-hover:text-brand-700 transition-colors"
                  style={{ fontFamily: 'var(--font-cormorant), serif' }}
                >
                  {category.title}
                </h3>
                
                {/* Professional Sub-category List (Separated by dots) */}
                <div className="flex flex-wrap justify-center items-center gap-x-2 gap-y-1">
                  {category.subCategories.map((sub, i) => (
                    <span key={i} className="flex items-center gap-x-2">
                      <span 
                        className="text-[11px] md:text-[12px] text-muted tracking-wide"
                        style={{ fontFamily: 'var(--font-inter), sans-serif' }}
                      >
                        {sub}
                      </span>
                      {/* Add a dot separator if it's not the last item */}
                      {i !== category.subCategories.length - 1 && (
                        <span className="h-1 w-1 rounded-full bg-brand-700/30" />
                      )}
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
