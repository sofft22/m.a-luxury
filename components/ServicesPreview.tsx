import Image from "next/image";
import Link from "next/link";

const WHATSAPP_NUMBER = "440000000000"; // Replace later

function bookLink(service: string) {
  const text = `Hi M.a Luxury! I'd like to book ${service} 💜`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

const FEATURED_SERVICES = [
  {
    title: "Knotless Braids",
    desc: "Small, Medium, Large, Jumbo",
    image: "/hero-1.jpg", 
  },
  {
    title: "Boho Braids",
    desc: "Shoulder, Mid-back, Waist",
    image: "/hero-2.jpg",
  },
  {
    title: "Locs & Relocs",
    desc: "Interlocking, Retwist, Styling",
    image: "/hero-3.jpg",
  },
  {
    title: "Twists",
    desc: "Passion, Kinky, Marley",
    image: "/hero-4.jpg",
  }
];

export function ServicesPreview() {
  return (
    <section className="w-full bg-white py-16 px-4 md:py-24 md:px-6">
      <div className="mx-auto max-w-[1400px]">
        
        {/* HEADER */}
        <div className="mb-10 flex flex-row items-end justify-between gap-2 sm:gap-6 border-b border-brand-100 pb-6">
          <div>
            <p className="text-gold text-[10px] font-bold uppercase tracking-[0.25em] mb-2" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
              ✦ Expert Styling
            </p>
            <h2 
              className="text-[26px] sm:text-[36px] text-ink leading-tight whitespace-nowrap" 
              style={{ fontFamily: 'var(--font-cormorant), serif' }}
            >
              Our Services
            </h2>
          </div>
          
          <Link 
            href="/services" 
            className="group flex shrink-0 items-center gap-1 sm:gap-2 pb-1 text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.15em] text-brand-700 transition-colors hover:text-brand-900" 
            style={{ fontFamily: 'var(--font-inter), sans-serif' }}
          >
            <span className="border-b border-brand-700 pb-0.5 whitespace-nowrap">View All Services</span>
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
        </div>

        {/* GRID: 1 col mobile, 2 col tablet, 4 col desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-6">
          {FEATURED_SERVICES.map((service, idx) => (
            <div key={idx} className="group flex flex-col">
              
              {/* Image Card */}
              <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden shadow-sm ring-1 ring-brand-100">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Hover Overlay with Book Button */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <a 
                    href={bookLink(service.title)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full bg-white px-6 py-3 text-[10px] font-bold uppercase tracking-[0.15em] text-brand-900 shadow-xl hover:scale-105 transition-transform"
                    style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
                  >
                    Book on WhatsApp
                  </a>
                </div>
              </div>

              {/* Text Under Image */}
              <div className="mt-4 flex flex-col">
                <h3 
                  className="text-[22px] text-ink leading-tight truncate group-hover:text-brand-700 transition-colors"
                  style={{ fontFamily: 'var(--font-cormorant), serif' }}
                >
                  {service.title}
                </h3>
                <p 
                  className="text-[12px] text-muted mt-1"
                  style={{ fontFamily: 'var(--font-inter), sans-serif' }}
                >
                  {service.desc}
                </p>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
