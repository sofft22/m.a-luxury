"use client";

import Link from "next/link";
import Image from "next/image";

export default function ConsultationPage() {
  return (
    <main className="min-h-screen bg-[#FAF7FE] pb-24">
      
      {/* HERO BANNER */}
      <section className="relative h-[45vh] md:h-[50vh] flex items-center justify-center overflow-hidden pt-[80px] md:pt-[100px]">
        <Image src="/hero-2.jpg" alt="Consultation" fill className="object-cover object-top" priority />
        <div className="absolute inset-0 bg-black/60" />
        
        <div className="relative z-10 text-center px-6 mt-10">
          <Link href="/services/locs-twists" className="text-[10px] font-bold uppercase tracking-widest text-white/60 hover:text-white mb-4 inline-block transition-colors" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
            ← Back to Locs
          </Link>
          <h1 className="text-[42px] md:text-[64px] text-white leading-tight mb-2" style={{ fontFamily: 'var(--font-cormorant), serif' }}>
            New Client Loc Consultation
          </h1>
          <p className="text-[13px] text-white/80 font-bold uppercase tracking-widest text-gold">
            £20 • 30 Minutes
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-5 md:px-8 -mt-10 md:-mt-16 relative z-20">
        <div className="bg-white p-6 md:p-12 rounded-3xl border border-brand-100 shadow-xl shadow-brand-900/10">
          
          <div className="mb-10 text-center">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-700 bg-brand-50 px-3 py-1 rounded-full">
              New Clients Only
            </span>
            <p className="mt-4 text-[15px] leading-relaxed text-muted max-w-xl mx-auto" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>
              This consultation is designed for individuals who are interested in starting their loc journey and want professional guidance on choosing the right loc style and starting method for their hair.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 border-t border-ink/10 pt-10">
            
            {/* WHAT'S DISCUSSED */}
            <div>
              <h3 className="text-[20px] text-brand-700 mb-4" style={{ fontFamily: 'var(--font-cormorant), serif' }}>
                What’s Discussed?
              </h3>
              <ul className="flex flex-col gap-3">
                {["Hair Assessment", "Loc Sizing & Parting", "Starting Methods", "Choosing Your Style", "Maintenance & Aftercare", "Loc Journey Expectations"].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-[13px] text-ink" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>
                    <span className="text-gold mt-0.5">✦</span> {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* PREPARATION */}
            <div>
              <h3 className="text-[20px] text-brand-700 mb-4" style={{ fontFamily: 'var(--font-cormorant), serif' }}>
                Preparation Required
              </h3>
              <ul className="flex flex-col gap-3">
                {[
                  "Ensure your natural hair is out and visible for an accurate assessment.",
                  "Avoid wearing wigs, extensions or protective styles that conceal your natural hair.",
                  "Have clear pictures of your desired loc style available for reference.",
                  "Be ready to discuss your hair history and your loc goals."
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-[13px] text-muted leading-relaxed" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>
                    <span className="text-brand-700 mt-0.5 font-bold">•</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* IMPORTANT NOTE */}
          <div className="mt-10 bg-brand-50 p-6 rounded-2xl border border-brand-100 text-center">
            <h4 className="text-[14px] font-bold uppercase tracking-widest text-brand-900 mb-2" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>
              Important Information
            </h4>
            <p className="text-[13px] text-muted leading-relaxed max-w-lg mx-auto" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>
              Please note that this appointment is for consultation and professional guidance. <strong>Loc installation is booked separately.</strong> Your loc journey starts with the right foundation. Let M.A Luxury help you get it right!
            </p>
          </div>

          <div className="mt-10 pt-8 border-t border-ink/10 flex flex-col items-center">
            <Link 
              href="/book/calendar?service=New%20Client%20Loc%20Consultation&id=consultation&option=Consultation&price=20&duration=30&extras="
              className="w-full md:w-auto rounded-full bg-brand-700 px-12 py-4 text-center text-[11px] font-bold uppercase tracking-[0.15em] text-white shadow-lg shadow-brand-700/30 transition-all hover:bg-brand-900 hover:-translate-y-0.5"
            >
              Book My Consultation →
            </Link>
          </div>

        </div>
      </div>
    </main>
  );
}
