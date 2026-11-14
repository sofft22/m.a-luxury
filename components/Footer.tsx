"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LegalModal } from "./LegalModal";

const WHATSAPP_NUMBER = "447393157901"; 
const INSTAGRAM_HANDLE = "ma.luxury"; 
const TIKTOK_HANDLE = "m.aluxury1"; 
const EMAIL = "hello@maluxury.com"; 
const CITY = "Plymouth";

export function Footer() {
  const router = useRouter();
  const pathname = usePathname();

  const [legalModalOpen, setLegalModalOpen] = useState(false);
  const [legalType, setLegalType] = useState<"policies" | "privacy" | null>(null);

  const openLegal = (type: "policies" | "privacy") => {
    setLegalType(type);
    setLegalModalOpen(true);
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, item: any) => {
    if (item.href) return;
    e.preventDefault();
    const scrollToTarget = () => {
      const el = document.getElementById(item.targetId);
      if (el) {
        const yOffset = -80;
        const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    };
    if (pathname === "/") {
      scrollToTarget();
    } else {
      router.push("/");
      setTimeout(scrollToTarget, 500);
    }
  };

  const SHOP_LINKS = [
    { label: "Bonestraight", href: "/shop?category=bonestraight" },
    { label: "French Curls", href: "/shop?category=french-curls" },
    { label: "Kinky", href: "/shop?category=kinky" },
    { label: "Passion Twist", href: "/shop?category=passion-twist" },
    { label: "Expression", href: "/shop?category=expression" },
    { label: "Crochet", href: "/shop?category=crochet" },
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
    { label: "Book on WhatsApp", href: "/book" },
    { label: "Gallery", targetId: "gallery" },
    { label: "Reviews", targetId: "reviews" },
    { label: "About", targetId: "about" },
    { label: "FAQs", targetId: "faq" },
  ];

  const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi M.a Luxury! I have a question 💜")}`;

  return (
    <footer id="footer" className="w-full bg-brand-900 pt-20 pb-10 px-6 md:pt-24 md:px-12">
      <div className="mx-auto max-w-[1200px]">
        {/* TOP ROW: 4 columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-6 pb-16 border-b border-white/10">
          
          {/* Column 1: Brand + DM Prompt */}
          <div className="col-span-2 md:col-span-1 flex flex-col items-start">
            <Link href="/" className="flex items-baseline mb-3">
              <span
                className="text-[22px] md:text-[24px] uppercase leading-none tracking-[0.2em] text-white"
                style={{ fontFamily: "var(--font-montserrat), sans-serif", fontWeight: 600 }}
              >
                M.a Luxury
              </span>
            </Link>
            <p
              className="text-[10px] md:text-[11px] uppercase tracking-[0.15em] mt-2 text-white/50"
              style={{ fontFamily: "var(--font-inter), sans-serif" }}
            >
              Hair & Beauty · {CITY}
            </p>

            {/* REPLACED WHATSAPP BUTTON WITH DM PROMPT */}
            <div className="mt-8">
              <p 
                className="text-[20px] md:text-[24px] text-white/90 mb-1"
                style={{ fontFamily: 'var(--font-cormorant), serif' }}
              >
                Why not..
              </p>
              <a 
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 text-[13px] md:text-[14px] text-white/60 hover:text-gold transition-colors"
                style={{ fontFamily: "var(--font-inter), sans-serif" }}
              >
                Have any questions, send a DM
                <span className="text-brand-900 bg-white/10 rounded-full p-1 group-hover:bg-gold group-hover:text-brand-900 transition-all">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-3 h-3"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" /></svg>
                </span>
              </a>
            </div>
          </div>

          {/* Column 2: Shop */}
          <div className="flex flex-col gap-3">
            <h4
              className="text-[10px] font-bold uppercase tracking-[0.15em] mb-1 text-gold"
              style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
            >
              Shop
            </h4>
            {SHOP_LINKS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-[12px] text-white/70 hover:text-white transition-colors"
                style={{ fontFamily: "var(--font-inter), sans-serif" }}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Column 3: Services */}
          <div className="flex flex-col gap-3">
            <h4
              className="text-[10px] font-bold uppercase tracking-[0.15em] mb-1 text-gold"
              style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
            >
              Services
            </h4>
            {SERVICE_LINKS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-[12px] text-white/70 hover:text-white transition-colors"
                style={{ fontFamily: "var(--font-inter), sans-serif" }}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Column 4: Info + contact */}
          <div className="flex flex-col gap-3">
            <h4
              className="text-[10px] font-bold uppercase tracking-[0.15em] mb-1 text-gold"
              style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
            >
              Info
            </h4>
            {INFO_LINKS.map((item) => (
              <Link
                key={item.label}
                href={item.href || `/#${item.targetId}`}
                onClick={(e) => handleNavClick(e, item)}
                className="text-[12px] text-white/70 hover:text-white transition-colors"
                style={{ fontFamily: "var(--font-inter), sans-serif" }}
              >
                {item.label}
              </Link>
            ))}

            <div className="mt-3 border-t border-white/10 pt-3 flex flex-col gap-2">
              <a
                href={`https://instagram.com/${INSTAGRAM_HANDLE}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[12px] text-white/70 hover:text-white transition-colors"
                style={{ fontFamily: "var(--font-inter), sans-serif" }}
              >
                Instagram
              </a>
              <a
                href={`https://tiktok.com/@${TIKTOK_HANDLE}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[12px] text-white/70 hover:text-white transition-colors"
                style={{ fontFamily: "var(--font-inter), sans-serif" }}
              >
                TikTok
              </a>
              <a
                href={`mailto:${EMAIL}`}
                className="text-[12px] text-white/70 hover:text-white transition-colors"
                style={{ fontFamily: "var(--font-inter), sans-serif" }}
              >
                {EMAIL}
              </a>
            </div>
          </div>
        </div>

        {/* MIDDLE: policies row */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 pt-8 pb-6 border-b border-white/10">
          <button
            onClick={() => openLegal("policies")}
            className="text-[10px] uppercase tracking-[0.15em] text-white/50 hover:text-white transition-colors"
            style={{ fontFamily: "var(--font-inter), sans-serif" }}
          >
            Terms & Policies
          </button>
          <button
            onClick={() => openLegal("privacy")}
            className="text-[10px] uppercase tracking-[0.15em] text-white/50 hover:text-white transition-colors"
            style={{ fontFamily: "var(--font-inter), sans-serif" }}
          >
            Privacy
          </button>
        </div>

        {/* BOTTOM BAR */}
        <div className="flex flex-col items-center justify-between pt-6 gap-3 md:flex-row">
          <p
            className="text-[9px] md:text-[10px] uppercase tracking-[0.1em] text-center md:text-left text-white/50"
            style={{ fontFamily: "var(--font-inter), sans-serif" }}
          >
            © {new Date().getFullYear()} M.a Luxury. All rights reserved.
          </p>
          <p
            className="text-[9px] md:text-[10px] uppercase tracking-[0.1em] text-white/40 italic"
            style={{ fontFamily: 'var(--font-cormorant), serif' }}
          >
            Luxury hair for luxury girls. 💜
          </p>
        </div>
      </div>

      <LegalModal isOpen={legalModalOpen} onClose={() => setLegalModalOpen(false)} type={legalType} />
    </footer>
  );
}
