"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Suspense, useState, useEffect } from "react";
import Link from "next/link";

// --- MOCK DATA FOR PRICING ---
// In the future, this comes from your database.
const PRICING: Record<string, { basePrice: number, sizes: string[], lengths: string[] }> = {
  "Knotless Braids": {
    basePrice: 70,
    sizes: ["Small", "Medium", "Large", "Jumbo"],
    lengths: ["Shoulder", "Mid-back", "Waist"],
  },
  "Boho Braids": {
    basePrice: 80,
    sizes: ["Small", "Medium", "Large", "Jumbo"],
    lengths: ["Shoulder", "Mid-back", "Waist"],
  },
  "Kinky Twists": {
    basePrice: 60,
    sizes: ["Small", "Medium", "Large", "Jumbo"],
    lengths: ["Shoulder", "Mid-back", "Waist"],
  },
  "Marley Twists": {
    basePrice: 60,
    sizes: ["Small", "Medium", "Large", "Jumbo"],
    lengths: ["Shoulder", "Mid-back", "Waist"],
  },
  "Locs": {
    basePrice: 50,
    sizes: ["Standard"],
    lengths: ["Standard"],
  }
};

function BookingOptionsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const serviceName = searchParams.get("service") || "General Appointment";
  
  // Get pricing details for this service (fallback to a default if not found)
  const details = PRICING[serviceName] || {
    basePrice: 40,
    sizes: ["Standard"],
    lengths: ["Standard"],
  };

  // State for selections
  const [selectedSize, setSelectedSize] = useState(details.sizes[0]);
  const [selectedLength, setSelectedLength] = useState(details.lengths[0]);

  // Calculate price dynamically
  // (Just a fake calculation for now: Size adds £20, Length adds £30)
  const getPrice = () => {
    let price = details.basePrice;
    if (selectedSize === "Medium") price += 20;
    if (selectedSize === "Large") price += 40;
    if (selectedSize === "Jumbo") price += 50;
    
    if (selectedLength === "Mid-back") price += 20;
    if (selectedLength === "Waist") price += 40;
    
    return price;
  };

  const currentPrice = getPrice();

  // When they click continue, we push to the calendar page with all the info in the URL
  const handleContinue = () => {
    router.push(
      `/book/calendar?service=${encodeURIComponent(serviceName)}&size=${encodeURIComponent(selectedSize)}&length=${encodeURIComponent(selectedLength)}&price=${currentPrice}`
    );
  };

  return (
    <main className="min-h-screen bg-[#FAF7FE] pt-[120px] md:pt-[160px] pb-24">
      <div className="mx-auto max-w-3xl px-5 md:px-8">
        
        {/* HEADER */}
        <div className="mb-10 text-center">
          <Link 
            href="/services" 
            className="text-[10px] font-bold uppercase tracking-widest text-brand-700/60 hover:text-brand-700 transition-colors mb-6 inline-block"
            style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
          >
            ← Back to services
          </Link>
          <h1 className="text-[36px] md:text-[52px] text-ink leading-tight mb-2" style={{ fontFamily: 'var(--font-cormorant), serif' }}>
            {serviceName}
          </h1>
          <p className="text-[14px] text-muted">
            Select your options below to see the final price.
          </p>
        </div>

        {/* OPTIONS CARD */}
        <div className="bg-white p-6 md:p-10 rounded-3xl border border-brand-100 shadow-xl shadow-brand-900/5">
          
          {/* SIZES */}
          {details.sizes.length > 0 && details.sizes[0] !== "Standard" && (
            <div className="mb-8">
              <h2 className="text-[18px] text-ink mb-4" style={{ fontFamily: 'var(--font-cormorant), serif' }}>
                Select Size
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {details.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-3 rounded-lg border text-[12px] font-bold uppercase tracking-wider transition-all ${
                      selectedSize === size 
                        ? "border-brand-700 bg-brand-700 text-white shadow-md" 
                        : "border-ink/10 text-ink hover:border-brand-700"
                    }`}
                    style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* LENGTHS */}
          {details.lengths.length > 0 && details.lengths[0] !== "Standard" && (
            <div className="mb-8">
              <h2 className="text-[18px] text-ink mb-4" style={{ fontFamily: 'var(--font-cormorant), serif' }}>
                Select Length
              </h2>
              <div className="grid grid-cols-3 gap-3">
                {details.lengths.map((length) => (
                  <button
                    key={length}
                    onClick={() => setSelectedLength(length)}
                    className={`py-3 rounded-lg border text-[12px] font-bold uppercase tracking-wider transition-all ${
                      selectedLength === length 
                        ? "border-brand-700 bg-brand-700 text-white shadow-md" 
                        : "border-ink/10 text-ink hover:border-brand-700"
                    }`}
                    style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
                  >
                    {length}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* PRICE SUMMARY & CONTINUE */}
          <div className="pt-6 border-t border-ink/10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-widest text-muted mb-1" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                Total Price
              </p>
              <p className="text-[32px] text-brand-700" style={{ fontFamily: 'var(--font-cormorant), serif' }}>
                £{currentPrice}
              </p>
            </div>
            
            <button 
              onClick={handleContinue}
              className="w-full md:w-auto rounded-full bg-brand-700 px-10 py-4 text-[11px] font-bold uppercase tracking-[0.15em] text-white shadow-lg shadow-brand-700/30 transition-all hover:bg-brand-900"
              style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
            >
              Continue to Date & Time →
            </button>
          </div>

        </div>
      </div>
    </main>
  );
}

export default function BookingPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FAF7FE] flex justify-center pt-32"><div className="h-8 w-8 animate-spin rounded-full border-2 border-brand-200 border-t-brand-700" /></div>}>
      <BookingOptionsContent />
    </Suspense>
  );
}
