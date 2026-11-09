"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCart } from "@/app/CartContext";

const WHATSAPP_NUMBER = "447393157901"; // Updated number

function bookLink(service?: string) {
  const text = service
    ? `Hi M.a Luxury! I'd like to book ${service} 💜`
    : `Hi M.a Luxury! I'd like to book an appointment 💜`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

export function Header() {
  const { cartCount, setIsCartOpen } = useCart();
  const router = useRouter();
  const pathname = usePathname();

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileCategoriesOpen, setMobileCategoriesOpen] = useState(false);
  const [desktopCategoriesOpen, setDesktopCategoriesOpen] = useState(false);

  const [scrolled, setScrolled] = useState(0);
  const [hidden, setHidden] = useState(false);
  const [heroHeight, setHeroHeight] = useState(0);

  const [bannerText, setBannerText] = useState("");
  const [bannerActive, setBannerActive] = useState(false);
  const [isBannerClosed, setIsBannerClosed] = useState(false);

  const lastY = useRef(0);
  const ticking = useRef(false);

  const HIDE_AFTER = 50;
  const TOLERANCE = 5;

  useEffect(() => {
    setMobileMenuOpen(false);
    setMobileCategoriesOpen(false);
  }, [pathname]);

  useEffect(() => {
    fetch("/api/settings")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.bannerActive === 1 && data.bannerText) {
          setBannerText(data.bannerText);
          setBannerActive(true);
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const measure = () => {
      const el = document.getElementById("hero");
      if (el) setHeroHeight(el.offsetHeight);
      else setHeroHeight(0);
    };
    setTimeout(measure, 100);
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        const prev = lastY.current;
        const diff = y - prev;

        setScrolled(y);

        if (y > HIDE_AFTER && diff > TOLERANCE) {
          setHidden(true);
        } else if (diff < -TOLERANCE || y <= HIDE_AFTER) {
          setHidden(false);
        }

        lastY.current = y;
        ticking.current = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const overHero = heroHeight > 0 && scrolled < heroHeight - 40;
  const textClass = overHero ? "text-white" : "text-ink";
  
  // LOGO COLOR: White on hero, Purple when scrolled
  const logoClass = overHero ? "text-white" : "text-brand-700";

  const NAV = [
    { label: "Shop", href: "/shop" },
    {
      label: "Services",
      targetId: "services",
      dropdown: [
        { label: "Knotless Braids", href: "/services/knotless-braids" },
        { label: "Boho Braids", href: "/services/boho-braids" },
        { label: "Locs & Retwist", href: "/services/locs-retwist" },
        { label: "Twists", href: "/services/twists" },
        { label: "Sew-ins", href: "/services/sew-ins" },
        { label: "Lashes", href: "/services/lash-extensions" },
        { label: "Brows", href: "/services/brows" },
        { label: "View all services →", href: "/services" },
      ],
    },
    { label: "Gallery", targetId: "gallery" },
    { label: "Reviews", targetId: "reviews" },
    { label: "Book", href: "/book" },
    { label: "About", targetId: "about" },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, item: any) => {
    if (item.href) return;
    if (item.dropdown) return;

    e.preventDefault();
    setMobileMenuOpen(false);

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

  const showBanner =
    bannerActive && !isBannerClosed && (pathname === "/" || pathname === "/shop");

  return (
    <>
      <header
        className={`fixed left-0 right-0 top-0 z-40 transition-[background-color,border-color,transform,color] duration-300 ease-out flex flex-col ${
          hidden ? "-translate-y-full" : "translate-y-0"
        }`}
        style={{
          backgroundColor: overHero ? "transparent" : "#FAF7FE",
          borderBottom: overHero ? "1px solid transparent" : "1px solid rgba(31, 18, 53, 0.08)",
        }}
      >
        {/* ANNOUNCEMENT BANNER */}
        {showBanner && (
          <div
            className={`w-full flex h-[32px] items-center justify-center relative overflow-hidden transition-colors duration-300 ${
              overHero ? "text-white" : "text-ink"
            }`}
          >
            <div className="flex-shrink-0 px-4 z-10">
              <svg
                className="h-3.5 w-3.5"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
                />
              </svg>
            </div>
            <div className="flex-1 overflow-hidden relative h-full flex items-center">
              <div className="animate-marquee whitespace-nowrap absolute flex">
                <span className="mx-4 text-[10px] font-bold uppercase tracking-[0.15em]">
                  {bannerText}
                </span>
                <span className="mx-4 text-[10px] font-bold uppercase tracking-[0.15em]">
                  {bannerText}
                </span>
                <span className="mx-4 text-[10px] font-bold uppercase tracking-[0.15em]">
                  {bannerText}
                </span>
                <span className="mx-4 text-[10px] font-bold uppercase tracking-[0.15em]">
                  {bannerText}
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsBannerClosed(true)}
              className="flex-shrink-0 px-4 opacity-50 hover:opacity-100 z-10 transition-opacity"
            >
              <svg
                className="h-3 w-3"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
            {!overHero && (
              <div className="absolute bottom-0 left-0 w-full h-[1px] bg-ink/10" />
            )}
          </div>
        )}

        {/* DESKTOP HEADER */}
        <div className="mx-auto hidden h-[72px] w-full max-w-7xl grid-cols-3 items-center px-8 lg:grid">
          <div className="flex justify-start">
            <Link href="/" className="flex items-center">
              {/* UPDATED FONT: Cormorant */}
              <span
                className={`uppercase leading-none tracking-[0.15em] transition-colors duration-300 text-[22px] ${logoClass}`}
                style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 600 }}
              >
                M.a Luxury
              </span>
            </Link>
          </div>

          <nav className="flex items-center justify-center gap-7">
            {NAV.map((item) => (
              <div
                key={item.label}
                className="relative group h-full py-6 flex items-center"
                onMouseEnter={() => item.dropdown && setDesktopCategoriesOpen(true)}
                onMouseLeave={() => item.dropdown && setDesktopCategoriesOpen(false)}
              >
                <Link
                  href={item.href || `/#${item.targetId}`}
                  onClick={(e) => handleNavClick(e, item)}
                  className={`whitespace-nowrap text-[10px] font-normal tracking-[0.15em] uppercase transition-colors duration-300 hover:opacity-60 flex items-center gap-1 ${textClass}`}
                  style={{ fontFamily: "var(--font-inter), sans-serif" }}
                >
                  {item.label}
                  {item.dropdown && (
                    <svg
                      className={`h-3 w-3 transition-transform duration-300 ${
                        desktopCategoriesOpen ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  )}
                </Link>

                {item.dropdown && (
                  <div
                    className={`absolute top-[60px] left-1/2 -translate-x-1/2 w-56 flex-col gap-1 rounded-xl bg-white p-2 shadow-xl border border-ink/10 transition-all duration-200 ${
                      desktopCategoriesOpen
                        ? "opacity-100 translate-y-0 pointer-events-auto flex"
                        : "opacity-0 -translate-y-2 pointer-events-none hidden"
                    }`}
                  >
                    {item.dropdown.map((sub) => (
                      <Link
                        key={sub.label}
                        href={sub.href}
                        className="rounded-lg px-4 py-2.5 text-[11px] font-medium text-ink hover:bg-brand-50 transition-colors"
                        style={{ fontFamily: "var(--font-inter), sans-serif" }}
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="flex justify-end items-center gap-3">
            {/* BOOK ON WHATSAPP */}
            <a
              href={bookLink()}
              target="_blank"
              rel="noopener noreferrer"
              className={`hidden md:inline-flex items-center gap-2 rounded-full px-4 py-2 text-[10px] font-bold uppercase tracking-[0.15em] transition-all ${
                overHero
                  ? "bg-white text-brand-700 hover:bg-brand-50"
                  : "bg-brand-700 text-white hover:bg-brand-900"
              }`}
              style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
            >
              <WhatsAppIcon />
              Book
            </a>

            <button
              onClick={() => setIsCartOpen(true)}
              aria-label="Cart"
              className={`relative flex h-10 w-10 items-center justify-center transition-colors duration-300 hover:opacity-70 ${textClass}`}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-[18px] w-[18px]"
              >
                <path d="M6 8h12l-1 12H7L6 8z" />
                <path d="M9 8V6a3 3 0 016 0v2" />
              </svg>
              {cartCount > 0 && (
                <span
                  className={`absolute -right-0.5 -top-0.5 flex h-[16px] min-w-[16px] items-center justify-center rounded-full px-1 text-[9.5px] font-bold leading-none transition-colors duration-300 ${
                    overHero ? "bg-white text-ink" : "bg-brand-700 text-white"
                  }`}
                >
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* MOBILE HEADER */}
        <div className="mx-auto flex h-[56px] w-full max-w-7xl items-center justify-between px-5 lg:hidden">
          <div className="flex w-16 items-center justify-start">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
              className={`-ml-2 flex h-10 w-10 items-center justify-center transition-colors duration-300 hover:opacity-70 ${textClass}`}
            >
              {mobileMenuOpen ? (
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  className="h-[18px] w-[18px]"
                >
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              ) : (
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  className="h-[18px] w-[18px]"
                >
                  <path d="M3 6h18M3 12h18M3 18h18" />
                </svg>
              )}
            </button>
          </div>

          <div className="flex flex-1 items-center justify-center">
            <Link href="/" className="flex items-center">
              {/* UPDATED FONT: Cormorant */}
              <span
                className={`uppercase leading-none tracking-[0.15em] transition-colors duration-300 text-[18px] ${logoClass}`}
                style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 600 }}
              >
                M.a Luxury
              </span>
            </Link>
          </div>

          <div className="flex w-16 items-center justify-end gap-1">
            <a
              href={bookLink()}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Book on WhatsApp"
              className={`flex h-10 w-10 items-center justify-center transition-colors duration-300 hover:opacity-70 ${textClass}`}
            >
              <WhatsAppIcon />
            </a>
            <button
              onClick={() => setIsCartOpen(true)}
              aria-label="Cart"
              className={`relative flex h-10 w-10 items-center justify-center transition-colors duration-300 hover:opacity-70 ${textClass}`}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-[18px] w-[18px]"
              >
                <path d="M6 8h12l-1 12H7L6 8z" />
                <path d="M9 8V6a3 3 0 016 0v2" />
              </svg>
              {cartCount > 0 && (
                <span
                  className={`absolute -right-0.5 -top-0.5 flex h-[16px] min-w-[16px] items-center justify-center rounded-full px-1 text-[9.5px] font-bold leading-none transition-colors duration-300 ${
                    overHero ? "bg-white text-ink" : "bg-brand-700 text-white"
                  }`}
                >
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* MOBILE DROPDOWN MENU */}
        <div
          className={`absolute left-4 right-4 z-50 overflow-hidden rounded-2xl bg-brand-50 shadow-2xl transition-all duration-300 ease-in-out lg:hidden border border-ink/10 ${
            mobileMenuOpen
              ? "max-h-[85vh] opacity-100 translate-y-0"
              : "max-h-0 opacity-0 -translate-y-4 pointer-events-none"
          } ${showBanner ? "top-[88px]" : "top-[56px]"}`}
        >
          <nav className="flex flex-col p-2">
            {NAV.map((item) => (
              <div key={item.label} className="flex flex-col">
                {item.dropdown ? (
                  <>
                    <button
                      onClick={() => setMobileCategoriesOpen(!mobileCategoriesOpen)}
                      className="flex items-center justify-between rounded-xl px-4 py-4 text-[13px] uppercase tracking-[0.1em] text-ink transition-colors hover:bg-brand-100 w-full text-left"
                      style={{ fontFamily: "var(--font-inter), sans-serif" }}
                    >
                      {item.label}
                      <svg
                        className={`h-4 w-4 transition-transform duration-300 ${
                          mobileCategoriesOpen ? "rotate-180" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>

                    <div
                      className={`overflow-hidden transition-all duration-300 ${
                        mobileCategoriesOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                      }`}
                    >
                      <div className="flex flex-col ml-4 pl-4 border-l border-ink/10 mb-2">
                        {item.dropdown.map((sub) => (
                          <Link
                            key={sub.label}
                            href={sub.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className="rounded-lg px-4 py-3 text-[12px] font-medium text-ink/70 transition-colors hover:text-ink hover:bg-brand-100"
                            style={{ fontFamily: "var(--font-inter), sans-serif" }}
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <Link
                    href={item.href || `/#${item.targetId}`}
                    onClick={(e) => handleNavClick(e, item)}
                    className="flex items-center justify-between rounded-xl px-4 py-4 text-[13px] uppercase tracking-[0.1em] text-ink transition-colors hover:bg-brand-100"
                    style={{ fontFamily: "var(--font-inter), sans-serif" }}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}

            {/* MOBILE BOOK CTA */}
            <a
              href={bookLink()}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-brand-700 px-4 py-4 text-[12px] font-bold uppercase tracking-[0.15em] text-white"
              style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
            >
              <WhatsAppIcon />
              Book on WhatsApp
            </a>
          </nav>
        </div>
      </header>

      {/* MOBILE OVERLAY */}
      <div
        className={`fixed inset-0 z-30 bg-black/40 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMobileMenuOpen(false)}
      />
    </>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}
