"use client";

import Link from "next/link";
import { useState } from "react";
import { LegalModal } from "./LegalModal";

const WHATSAPP_NUMBER = "447393157901";
const EMAIL = "hello@maluxury.com";
const CITY = "Plymouth";
const INSTAGRAM_HANDLE = "ma.luxury";
const TIKTOK_HANDLE = "m.aluxury1";

export function Footer() {
  const [legalModalOpen, setLegalModalOpen] = useState(false);
  const [legalType, setLegalType] = useState<"policies" | "privacy" | null>(null);

  const openLegal = (type: "policies" | "privacy") => {
    setLegalType(type);
    setLegalModalOpen(true);
  };

  const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi M.a Luxury! I have a question 💜")}`;

  const SHOP_LINKS = [
    { label: "Bonestraight", href: "/shop?category=bonestraight" },
    { label: "French Curls", href: "/shop?category=french-curls" },
    { label: "Kinky", href: "/shop?category=kinky" },
    { label: "Passion Twist", href: "/shop?category=passion-twist" },
    { label: "Expression", href: "/shop?category=expression" },
    { label: "Crochet", href: "/shop?category=crochet" },
    { label: "Sew-in Extensions", href: "/shop?category=sew-in" },
    { label: "Locs Extensions", href: "/shop?category=locs" },
    { label: "Shop all →", href: "/shop" },
  ];

  const SERVICE_LINKS = [
    { label: "Braids & Twists", href: "/services/braids" },
    { label: "Locs & Maintenance", href: "/services/locs-twists" },
    { label: "Installs & Styling", href: "/services/installs" },
    { label: "Beauty", href: "/services/beauty" },
    { label: "View all services →", href: "/services" },
  ];

  const INFO_LINKS = [
    { label: "Book an Appointment", href: "/book" },
    { label: "Gallery", targetId: "gallery" },
    { label: "Reviews", targetId: "reviews" },
    { label: "About Us", targetId: "about" },
    { label: "FAQs", targetId: "faq" },
  ];

  return (
    <>
      <footer className="w-full bg-brand-900 pt-20 pb-10 px-6 md:pt-24 md:px-12">
        <div className="mx-auto max-w-7xl">
          
          {/* TOP ROW: 4 columns */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-6 pb-16 border-b border-white/10">
            
            {/* Column 1: Brand */}
            <div className="col-span-2 md:col-span-1 flex flex-col items-start">
              <Link href="/" className="flex items-baseline mb-3">
                <span
                  className="text-[24px] uppercase leading-none tracking-[0.15em] text-white"
                  style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 600 }}
                >
                  M.a Luxury
                </span>
              </Link>
              <p
                className="text-[10px] uppercase tracking-[0.15em] mt-2 text-white/50"
                style={{ fontFamily: "var(--font-inter), sans-serif" }}
              >
                Hair & Beauty · {CITY}
              </p>
              
              <div className="mt-6 flex flex-col gap-2">
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="text-[12px] text-white/70 hover:text-white transition-colors">
                  {WHATSAPP_NUMBER}
                </a>
                <a href={`mailto:${EMAIL}`} className="text-[12px] text-white/70 hover:text-white transition-colors">
                  {EMAIL}
                </a>
              </div>
            </div>

            {/* Column 2: Shop */}
            <div className="flex flex-col gap-3">
              <h4 className="text-[10px] font-bold uppercase tracking-[0.15em] mb-2 text-gold" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                Shop Extensions
              </h4>
              {SHOP_LINKS.map((item) => (
                <Link key={item.label} href={item.href} className="text-[12px] text-white/70 hover:text-white transition-colors" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Column 3: Services */}
            <div className="flex flex-col gap-3">
              <h4 className="text-[10px] font-bold uppercase tracking-[0.15em] mb-2 text-gold" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                Services
              </h4>
              {SERVICE_LINKS.map((item) => (
                <Link key={item.label} href={item.href} className="text-[12px] text-white/70 hover:text-white transition-colors" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Column 4: Info + Socials */}
            <div className="flex flex-col gap-3">
              <h4 className="text-[10px] font-bold uppercase tracking-[0.15em] mb-2 text-gold" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                Info
              </h4>
              {INFO_LINKS.map((item) => (
                <Link 
                  key={item.label} 
                  href={item.href || `/#${item.targetId}`} 
                  className="text-[12px] text-white/70 hover:text-white transition-colors" 
                  style={{ fontFamily: "var(--font-inter), sans-serif" }}
                >
                  {item.label}
                </Link>
              ))}

              <div className="mt-4 border-t border-white/10 pt-4 flex flex-col gap-2">
                <a href={`https://instagram.com/${INSTAGRAM_HANDLE}`} target="_blank" rel="noopener noreferrer" className="text-[12px] text-white/70 hover:text-white transition-colors" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
                  Instagram
                </a>
                <a href={`https://tiktok.com/@${TIKTOK_HANDLE}`} target="_blank" rel="noopener noreferrer" className="text-[12px] text-white/70 hover:text-white transition-colors" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
                  TikTok
                </a>
              </div>
            </div>

          </div>

          {/* DM PROMPT & POLICIES */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 py-8 border-b border-white/10">
            <a 
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 text-[16px] text-white/90 hover:text-white transition-colors"
              style={{ fontFamily: "var(--font-cormorant), serif" }}
            >
              Have any questions? Send a DM
              <span className="text-brand-900 bg-white/10 rounded-full p-1.5 group-hover:bg-gold group-hover:text-brand-900 transition-all">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-3.5 h-3.5"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" /></svg>
              </span>
            </a>

            <div className="flex gap-6">
              <button onClick={() => openLegal("policies")} className="text-[10px] uppercase tracking-[0.15em] text-white/50 hover:text-white transition-colors">
                Terms & Policies
              </button>
              <button onClick={() => openLegal("privacy")} className="text-[10px] uppercase tracking-[0.15em] text-white/50 hover:text-white transition-colors">
                Privacy
              </button>
            </div>
          </div>

          {/* BOTTOM BAR */}
          <div className="flex flex-col items-center justify-between pt-6 gap-3 md:flex-row">
            <p className="text-[9px] md:text-[10px] uppercase tracking-[0.1em] text-center md:text-left text-white/40" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
              © {new Date().getFullYear()} M.a Luxury. All rights reserved.
            </p>
            <p className="text-[9px] md:text-[10px] uppercase tracking-[0.1em] text-white/30 italic" style={{ fontFamily: "var(--font-cormorant), serif" }}>
              Luxury hair for luxury girls. 💜
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
