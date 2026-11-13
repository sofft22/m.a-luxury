import Link from "next/link";

const SERVICES_DATA = [
  {
    id: "braids",
    title: "Braids",
    image: "https://images.unsplash.com/photo-1605980776566-0486c3ac7617?w=1200&q=80",
    description: "Flawless, tension-free braiding tailored to your crown.",
  },
  {
    id: "locs-twists",
    title: "Locs & Twists",
    image: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=1200&q=80",
    description: "Expert maintenance and installation for locs and twists.",
  },
  {
    id: "installs",
    title: "Installs & Styling",
    image: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=1200&q=80",
    description: "Seamless installations, treatments, and healthy hair care.",
  },
  {
    id: "beauty",
    title: "Beauty",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1200&q=80",
    description: "Lashes, brows, and treatments to enhance your natural features.",
  },
  {
    id: "piercing",
    title: "Piercing",
    image: "https://images.unsplash.com/photo-1615859310457-12e7b8d611ec?w=1200&q=80",
    description: "Safe, sterile, and professional piercing services.",
  }
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-[#FAF7FE] pt-[80px] md:pt-[100px]">
      
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

      {/* SERVICES GRID */}
      <section className="mx-auto max-w-7xl px-4 py-12 md:px-8 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          
          {SERVICES_DATA.map((category, index) => (
            <Link 
              key={category.id}
              href={`/services/${category.id}`}
              className={`group relative block w-full overflow-hidden rounded-2xl border border-brand-100 shadow-sm hover:shadow-xl transition-all duration-500 ${
                index === 0 || index === 3 ? "md:col-span-2 md:aspect-[21/9]" : "aspect-square md:aspect-[4/5]"
              }`}
            >
              {/* Image Background */}
              <div 
                className="absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: `url(${category.image})` }}
              />
              
              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />

              {/* Text Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10">
                <h2 
                  className="text-[32px] md:text-[48px] text-white mb-2 transition-transform duration-300 group-hover:-translate-y-1"
                  style={{ fontFamily: 'var(--font-cormorant), serif' }}
                >
                  {category.title}
                </h2>
                <p 
                  className="text-[13px] md:text-[15px] text-white/80 max-w-sm transition-transform duration-300 group-hover:-translate-y-1"
                  style={{ fontFamily: 'var(--font-inter), sans-serif' }}
                >
                  {category.description}
                </p>
                
                <div className="mt-4 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gold opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                  View Services <span>→</span>
                </div>
              </div>
            </Link>
          ))}

        </div>
      </section>
    </main>
  );
}
