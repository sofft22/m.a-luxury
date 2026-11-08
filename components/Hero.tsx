"use client";

import Image from "next/image";
import Link from "next/link";

const WHATSAPP_NUMBER = "440000000000"; // TODO: replace with real number

function bookLink() {
  const text = "Hi M.a Luxury! I'd like to book an appointment 💜";
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

export function Hero() {
  return (
    <>
      <style>{`
        .hero-section {
          min-height: 100vh;
        }
      `}</style>

      <section
        id="hero"
        className="hero-section relative w-full overflow-hidden bg-brand-50 pt-[88px] pb-16 md:pt-[104px] md:pb-24"
      >
        {/* soft purple radial glow behind the card */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 0%, rgba(139, 92, 246, 0.12) 0%, transparent 55%)",
          }}
        />

        <div className="relative z-10 mx-auto max-w-3xl px-5 md:px-6">
          {/* IMAGE CARD */}
          <div className="relative w-full aspect-[4/5] sm:aspect-[16/11] rounded-[28px] overflow-hidden shadow-[0_30px_80px_-30px_rgba(59,7,100,0.45)] ring-1 ring-brand-700/10">
            <Image
              src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1400&q=80"
              alt="M.a Luxury — Hair & Beauty"
              fill
              priority
              unoptimized
              className="object-cover object-center"
            />

            {/* gradient overlay bottom */}
            <div className="absolute inset-0 bg-gradient-to-t from-brand-900/55 via-brand-900/5 to-transparent" />

            {/* top-left pill: location */}
            <span
              className="absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-white/95 backdrop-blur px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-brand-700 shadow-sm"
              style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-gold" />
              Plymouth
            </span>

            {/* bottom-right pill: rating */}
            <span
              className="absolute bottom-4 right-4 inline-flex items-center gap-1.5 rounded-full bg-white/95 backdrop-blur px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-ink shadow-sm"
              style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
            >
              <span className="text-gold">★★★★★</span>
              4.9
            </span>
          </div>

          {/* TEXT UNDER */}
          <div className="mt-10 md:mt-12 text-center">
            <p
              className="text-gold text-[10px] font-bold uppercase tracking-[0.3em]"
              style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
            >
              ✦ Hair · Locs · Brows · Beauty
            </p>

            <h1
              className="mt-4 text-ink font-normal leading-[0.95] tracking-tight text-[52px] sm:text-[64px] md:text-[80px]"
              style={{ fontFamily: "var(--font-cormorant), serif" }}
            >
              Your crown,
              <br />
              <span className="italic text-brand-700">beautifully done.</span>
            </h1>

            <p
              className="mt-5 mx-auto max-w-md text-[14px] md:text-[15px] leading-relaxed text-muted"
              style={{ fontFamily: "var(--font-inter), sans-serif" }}
            >
              Expert braiding, locs & beauty in Plymouth — booked in seconds
              on WhatsApp.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={bookLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-700 px-7 py-3.5 text-[11px] font-bold uppercase tracking-[0.15em] text-white shadow-[0_10px_30px_-10px_rgba(109,40,217,0.6)] transition-all hover:bg-brand-900 hover:scale-[1.02]"
                style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden>
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                Book on WhatsApp
              </a>

              <Link
                href="/services"
                className="inline-flex items-center justify-center rounded-full border border-brand-700/30 px-7 py-3.5 text-[11px] font-bold uppercase tracking-[0.15em] text-brand-700 transition-all hover:border-brand-700 hover:bg-brand-700 hover:text-white"
                style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
              >
                View services
              </Link>
            </div>

            {/* small footnote */}
            <p
              className="mt-6 text-[10px] uppercase tracking-[0.2em] text-muted/70"
              style={{ fontFamily: "var(--font-inter), sans-serif" }}
            >
              500+ happy clients · Plymouth & surrounding
            </p>
          </div>
        </div>

        {/* subtle bottom fade into next section */}
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-b from-transparent to-brand-50" />
      </section>
    </>
  );
}
