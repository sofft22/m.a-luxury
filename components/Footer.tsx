"use client";

import Link from "next/link";
import { useState } from "react";
import { LegalModal } from "./LegalModal";

const WHATSAPP_NUMBER = "447393157901";

export function Footer() {
  const [legalModalOpen, setLegalModalOpen] = useState(false);
  const [legalType, setLegalType] = useState<"policies" | "privacy" | null>(null);

  const openLegal = (type: "policies" | "privacy") => {
    setLegalType(type);
    setLegalModalOpen(true);
  };

  const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi M.a Luxury! I have a question 💜")}`;

  return (
    <>
      <footer className="w-full bg-brand-900 pt-20 pb-10 px-6 md:pt-24 md:px-12">
        <div className="mx-auto max-w-7xl flex flex-col">
          
          {/* TOP SECTION - BRAND & CTA */}
          <div className="flex flex-col items-start gap-6">
            <div>
              <h2 
                className="text-[28px] md:text-[32px] text-white tracking-[0.15em] uppercase leading-none mb-3" 
                style={{ fontFamily: "var(--font-montserrat), sans-serif", fontWeight: 500 }}
              >
                M.A LUXURY
              </h2>
              <p 
                className="text-[10px] md:text-[11px] text-white/50 uppercase tracking-[0.2em]"
                style={{ fontFamily: "var(--font-inter), sans-serif" }}
              >
                Hair & Beauty · Plymouth
              </p>
            </div>

            <a 
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-gold/50 px-6 py-3 text-[10px] font-bold uppercase tracking-[0.2em] text-gold transition-all hover:bg-gold hover:text-brand-900 mt-2"
              style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
            >
              Book on WhatsApp
            </a>
          </div>

          {/* MIDDLE SECTION - LINKS */}
          <div className="mt-16 grid grid-cols-2 gap-8 md:flex md:gap-16 border-t border-white/10 pt-10">
            <Link 
              href="/shop" 
              className="text-[11px] font-bold uppercase tracking-[0.2em] text-gold/80 hover:text-gold transition-colors"
              style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
            >
              Shop
            </Link>
            <Link 
              href="/services" 
              className="text-[11px] font-bold uppercase tracking-[0.2em] text-gold/80 hover:text-gold transition-colors"
              style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
            >
              Services
            </Link>
            <Link 
              href="/book" 
              className="text-[11px] font-bold uppercase tracking-[0.2em] text-gold/80 hover:text-gold transition-colors hidden md:block"
              style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
            >
              Book
            </Link>
            <button 
              onClick={() => openLegal("policies")}
              className="text-[11px] font-bold uppercase tracking-[0.2em] text-gold/80 hover:text-gold transition-colors text-left"
              style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
            >
              Policies
            </button>
            <button 
              onClick={() => openLegal("privacy")}
              className="text-[11px] font-bold uppercase tracking-[0.2em] text-gold/80 hover:text-gold transition-colors text-left hidden md:block"
              style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
            >
              Privacy
            </button>
          </div>

          {/* BOTTOM SECTION - DM PROMPT & COPYRIGHT */}
          <div className="mt-20 pt-10 border-t border-white/10 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            
            <div>
              <p 
                className="text-[20px] md:text-[24px] text-white/90 mb-2"
                style={{ fontFamily: "var(--font-cormorant), serif" }}
              >
                Why not..
              </p>
              <a 
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 text-[14px] md:text-[16px] text-white/60 hover:text-white transition-colors"
                style={{ fontFamily: "var(--font-inter), sans-serif" }}
              >
                Have any questions, send a DM
                <span className="text-brand-700 bg-white/10 rounded-full p-1 group-hover:bg-white group-hover:text-brand-900 transition-all">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-3 h-3"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" /></svg>
                </span>
              </a>
            </div>

            <p 
              className="text-[9px] md:text-[10px] uppercase tracking-[0.15em] text-white/30"
              style={{ fontFamily: "var(--font-inter), sans-serif" }}
            >
              © {new Date().getFullYear()} M.A Luxury. All rights reserved.
            </p>
          </div>

        </div>
      </footer>

      <LegalModal 
        isOpen={legalModalOpen} 
        onClose={() => setLegalModalOpen(false)} 
        type={legalType} 
      />
    </>
  );
}
