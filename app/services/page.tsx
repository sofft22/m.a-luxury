import Link from "next/link";
import Image from "next/image";

const CATEGORIES = [
 

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
              <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden shadow-sm border border-brand-100">
                <Image
                  src={category.image}
                  alt={category.title}
                  fill
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Text Area */}
              <div className="mt-5 flex flex-col">
                <h3 
                  className="text-[24px] md:text-[28px] text-ink leading-tight mb-2 group-hover:text-brand-700 transition-colors"
                  style={{ fontFamily: 'var(--font-cormorant), serif' }}
                >
                  {category.title}
                </h3>
                <p 
                  className="text-[13px] text-muted leading-relaxed"
                  style={{ fontFamily: 'var(--font-inter), sans-serif' }}
                >
                  {category.description}
                </p>
                <div className="mt-4 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-brand-700">
                  View Options <span>→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

    </main>
  );
}
