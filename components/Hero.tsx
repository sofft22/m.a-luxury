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
    <section
      id="hero"
      className="relative w-full overflow-hidden bg-brand-50 pt-[88px] pb-16 md:pt-[104px] md:pb-24"
    >
      {/* soft purple radial glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse at 30% 30%, rgba(139, 92, 246, 0.14) 0%, transparent 55%), radial-gradient(ellipse at 80% 70%, rgba(201, 162, 74, 0.08) 0%, transparent 50%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* LEFT — IMAGE CARD */}
          <div className="order-1 lg:order-1">
            <div className="relative w-full aspect-[4/5] lg:aspect-[5/6] rounded-[32px] overflow-hidden shadow-[0_40px_100px_-40px_rgba(59,7,100,0.5)] ring-1 ring-brand-700/10">
              <Image
                src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1400&q=80"
                alt="M.a Luxury — Hair & Beauty"
                fill
                priority
                unoptimized
                className="object-cover object-center"
              />

              {/* bottom gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-brand-900/60 via-brand-900/5 to-transparent" />

              {/* location pill */}
              <span
                className="absolute top-5 left-5 inline-flex items-center gap-1.5 rounded-full bg-white/95 backdrop-blur px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-brand-700 shadow-sm"
                style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                Plymouth
              </span>

              {/* rating pill */}
              <span
                className="absolute bottom-5 right-5 inline-flex items-center gap-1.5 rounded-full bg-white/95 backdrop-blur px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-ink shadow-sm"
                style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
              >
                <span className="text-gold">★★★★★</span>
                4.9
              </span>
            </div>
          </div>

          {/* RIGHT — TEXT */}
          <div className="order-2 lg:order-2 text-center lg:text-left">
            <p
              className="text-gold text-[10px] font-bold uppercase tracking-[0.35em]"
              style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
            >
              ✦ Hair · Locs · Brows · Beauty
            </p>

            <h1
              className="mt-5 text-ink font-normal leading-[0.9] tracking-tight text-[56px] sm:text-[72px] md:text-[88px] lg:text-[96px]"
              style={{ fontFamily: "var(--font-cormorant), serif" }}
            >
              Your crown,
              <br />
              <span className="italic text-brand-700">elevated.</span>
            </h1>

            <p
              className="mt-6 mx-auto lg:mx-0 max-w-md text-[14px] md:text-[15px] leading-relaxed text-muted"
              style={{ fontFamily: "var(--font-inter), sans-serif" }}
            >
              Signature braids, locs & beauty — plus premium hair extensions
              curated for your next install. Booked in seconds on WhatsApp.
            </p>

            {/* DUAL PATH CTAs */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-md mx-auto lg:mx-0">
              {/* Book a service */}
              <a
                href={bookLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-start gap-1 rounded-2xl bg-brand-700 px-5 py-4 text-left text-white shadow-[0_15px_35px_-15px_rgba(109,40,217,0.7)] transition-all hover:bg-brand-900 hover:-translate-y-0.5"
              >
                <span
                  className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/60"
                  style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
                >
                  Book a service
                </span>
                <span
                  className="flex w-full items-center justify-between gap-2 text-[13px] font-bold uppercase tracking-[0.1em]"
                  style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
                >
                  On WhatsApp
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 opacity-80 group-hover:opacity-100" aria-hidden>
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                </span>
              </a>

              {/* Shop extensions */}
              <Link
                href="/shop"
                className="group flex flex-col items-start gap-1 rounded-2xl border border-brand-700/25 bg-white/60 backdrop-blur px-5 py-4 text-left text-brand-700 transition-all hover:border-brand-700 hover:bg-white hover:-translate-y-0.5"
              >
                <span
                  className="text-[9px] font-bold uppercase tracking-[0.2em] text-brand-700/60"
                  style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
                >
                  Shop extensions
                </span>
                <span
                  className="flex w-full items-center justify-between gap-2 text-[13px] font-bold uppercase tracking-[0.1em]"
                  style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
                >
                  Bonestraight & more
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </span>
              </Link>
            </div>

            {/* trust line */}
            <div className="mt-8 flex items-center justify-center lg:justify-start gap-3">
              <div className="flex -space-x-2">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="h-7 w-7 rounded-full border-2 border-brand-50 bg-brand-100 ring-1 ring-brand-700/10"
                  />
                ))}
              </div>
              <p
                className="text-[10px] uppercase tracking-[0.2em] text-muted/80"
                style={{ fontFamily: "var(--font-inter), sans-serif" }}
              >
                500+ happy clients · Plymouth
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
