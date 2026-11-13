import Link from "next/link";
import { notFound } from "next/navigation";

const ALL_SERVICES: Record<string, { title: string, services: any[] }> = {
  "braids": {
    title: "Braids",
    services: [
      { name: "Knotless Braids", sizes: "Small, Medium, Large, Jumbo", lengths: "Shoulder, Mid-back, Waist" },
      { name: "Boho Braids", sizes: "Small, Medium, Large, Jumbo", lengths: "Shoulder, Mid-back, Waist" },
      { name: "Stitch Braids", sizes: "All lengths" },
      { name: "Feed-in Braids", sizes: "Ponytails, All Backs, Alicia Keys, Fulani, Lemonade" },
    ]
  },
  "locs-twists": {
    title: "Locs & Twists",
    services: [
      { name: "Locs", details: "Two strand twist, Interlocking" },
      { name: "Relocs", details: "Interlocking, Retwist (with/without styling)" },
      { name: "Twists", details: "With expression" },
      { name: "Kinky Twists", sizes: "Small, Medium, Large, Jumbo", lengths: "Shoulder, Mid-back, Waist" },
      { name: "Marley Twists", sizes: "Small, Medium, Large, Jumbo", lengths: "Shoulder, Mid-back, Waist" },
    ]
  },
  "installs": {
    title: "Installs & Styling",
    services: [
      { name: "Sew-ins" },
      { name: "Retouch & Washing" },
      { name: "Hair Straightening" },
      { name: "New Client Consultation" },
    ]
  },
  "beauty": {
    title: "Beauty",
    services: [
      { name: "Lash Extensions", details: "Classic, Hybrid, Volume" },
      { name: "Brow Tint" },
      { name: "Brow Lamination" },
      { name: "Brow Tint & Lamination" },
      { name: "Brow Shaping" },
      { name: "SPMU Brows", details: "Microblading, Microshading, Combo" },
    ]
  },
  "piercing": {
    title: "Piercing",
    services: [
      { name: "Standard Earlobe" },
      { name: "Helix" },
      { name: "Tragus" },
    ]
  }
};

export default function ServiceCategoryPage({ params }: { params: { slug: string } }) {
  const category = ALL_SERVICES[params.slug];

  if (!category) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#FAF7FE] pt-[80px] md:pt-[100px]">
      
      {/* HEADER */}
      <section className="bg-ink py-16 px-6 md:py-24 md:px-12 text-center relative">
        <Link 
          href="/services"
          className="absolute top-8 left-6 md:top-12 md:left-12 text-[10px] font-bold uppercase tracking-widest text-white/50 hover:text-white transition-colors flex items-center gap-2"
        >
          <span>←</span> Back to all services
        </Link>
        <div className="mx-auto max-w-4xl">
          <h1 
            className="text-[40px] md:text-[64px] text-white leading-tight mb-4" 
            style={{ fontFamily: 'var(--font-cormorant), serif' }}
          >
            {category.title}
          </h1>
        </div>
      </section>

      {/* LIST */}
      <section className="mx-auto max-w-4xl px-4 py-12 md:px-8 md:py-24">
        <div className="grid grid-cols-1 gap-4">
          {category.services.map((service: any, idx: number) => (
            <Link 
              key={idx}
              href={`/book?service=${encodeURIComponent(service.name)}`}
              className="group flex flex-col md:flex-row md:items-center justify-between p-6 md:p-8 bg-white rounded-2xl border border-brand-100 shadow-sm hover:border-brand-700 hover:shadow-md transition-all"
            >
              <div>
                <h3 className="text-[24px] text-ink group-hover:text-brand-700 transition-colors mb-2" style={{ fontFamily: 'var(--font-cormorant), serif' }}>
                  {service.name}
                </h3>
                
                {(service.sizes || service.lengths || service.details) && (
                  <div className="text-[12px] text-muted flex flex-col gap-1" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>
                    {service.details && <p>{service.details}</p>}
                    {service.sizes && <p><strong className="font-medium text-ink">Sizes:</strong> {service.sizes}</p>}
                    {service.lengths && <p><strong className="font-medium text-ink">Lengths:</strong> {service.lengths}</p>}
                  </div>
                )}
              </div>

              <div className="mt-4 md:mt-0 flex items-center justify-center h-10 w-10 rounded-full bg-brand-50 text-brand-700 group-hover:bg-brand-700 group-hover:text-white transition-all">
                →
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
