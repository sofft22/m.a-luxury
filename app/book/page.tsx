"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Suspense, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

function BookingOptionsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const serviceName = searchParams.get("service") || "Service";
  const serviceId = searchParams.get("id");

  const [serviceData, setServiceData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  const [selectedOption, setSelectedOption] = useState<{ name: string, price: number, duration: number } | null>(null);
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);

  useEffect(() => {
    if (!serviceId) {
      setLoading(false);
      return;
    }

    const fetchService = async () => {
      try {
        const res = await fetch("/api/services");
        const data = await res.json();
        const found = data.find((s: any) => s.id === serviceId);
        
        if (found) {
          const parsedOptions = typeof found.options === 'string' ? JSON.parse(found.options || "[]") : found.options;
          const parsedExtras = typeof found.extras === 'string' ? JSON.parse(found.extras || "[]") : (found.extras || []);

          const cleanOptions = parsedOptions.map((o: any) => ({ ...o, duration: o.duration || 60 }));

          setServiceData({ ...found, options: cleanOptions, extras: parsedExtras });
          
          if (cleanOptions.length > 0) {
            setSelectedOption(cleanOptions[0]);
          }
        }
      } catch (error) {
        console.error("Failed to fetch service", error);
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [serviceId]);

  const toggleExtra = (extraName: string) => {
    setSelectedExtras(prev => 
      prev.includes(extraName) ? prev.filter(e => e !== extraName) : [...prev, extraName]
    );
  };

  const calculateTotal = () => {
    if (!selectedOption) return 0;
    let total = selectedOption.price;
    
    if (serviceData?.extras) {
      serviceData.extras.forEach((extra: any) => {
        if (selectedExtras.includes(extra.name)) {
          total += Number(extra.minPrice) || 0;
        }
      });
    }
    
    return total;
  };

  const handleContinue = () => {
    if (!selectedOption) return alert("Please select an option");
    
    const totalPrice = calculateTotal();
    const extrasString = selectedExtras.length > 0 ? selectedExtras.join(", ") : "";

    router.push(
      `/book/calendar?service=${encodeURIComponent(serviceName)}&id=${serviceId}&option=${encodeURIComponent(selectedOption.name)}&price=${totalPrice}&duration=${selectedOption.duration}&extras=${encodeURIComponent(extrasString)}`
    );
  };

  const formatTime = (mins: number) => {
    if (mins === 1440) return "24 Hours";
    if (mins >= 60) {
      const hrs = mins / 60;
      return `${hrs % 1 === 0 ? hrs : hrs.toFixed(1)} Hrs`;
    }
    return `${mins} Mins`;
  };

  if (loading) {
    return <div className="min-h-screen bg-[#FAF7FE] flex justify-center pt-32"><div className="h-8 w-8 animate-spin rounded-full border-2 border-brand-200 border-t-brand-700" /></div>;
  }

  const bannerImage = serviceData?.image || "/hero-1.jpg";
  const isConsultation = serviceName.toLowerCase().includes("consultation");

  return (
    <main className="min-h-screen bg-[#FAF7FE] pb-24">
      
      {/* HERO BANNER */}
      <section className="relative h-[45vh] md:h-[50vh] flex items-center justify-center overflow-hidden pt-[80px] md:pt-[100px]">
        <Image src={bannerImage} alt={serviceName} fill className="object-cover object-top" priority />
        <div className="absolute inset-0 bg-black/60" />
        
        <div className="relative z-10 text-center px-6 mt-10">
          <Link href="/services" className="text-[10px] font-bold uppercase tracking-widest text-white/60 hover:text-white mb-4 inline-block transition-colors">
            ← Back to services
          </Link>
          <h1 className="text-[42px] md:text-[64px] text-white leading-tight mb-2" style={{ fontFamily: 'var(--font-cormorant), serif' }}>
            {serviceName}
          </h1>
          {isConsultation && (
            <p className="text-[13px] text-white/80 font-bold uppercase tracking-widest text-gold">
              £20 • 30 Minutes
            </p>
          )}
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-5 md:px-8 -mt-10 md:-mt-16 relative z-20">
        
        {/* IF IT'S A CONSULTATION, SHOW THE SPECIAL EDITORIAL LAYOUT */}
        {isConsultation ? (
          <div className="bg-white p-6 md:p-12 rounded-3xl border border-brand-100 shadow-xl shadow-brand-900/10">
            
            <div className="mb-10 text-center">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-700 bg-brand-50 px-3 py-1 rounded-full">
                New Clients Only
              </span>
              <p className="mt-4 text-[15px] leading-relaxed text-muted max-w-xl mx-auto" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>
                {serviceData?.description}
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
              <button 
                onClick={handleContinue}
                className="w-full md:w-auto rounded-full bg-brand-700 px-12 py-4 text-[11px] font-bold uppercase tracking-[0.15em] text-white shadow-lg shadow-brand-700/30 transition-all hover:bg-brand-900 hover:-translate-y-0.5"
              >
                I Understand, Book My Consultation →
              </button>
            </div>

          </div>
        ) : (
          
          // REGULAR SERVICE LAYOUT (Options & Extras)
          <div className="bg-white p-6 md:p-10 rounded-3xl border border-brand-100 shadow-xl shadow-brand-900/10">
            <div className="mb-10">
              <h2 className="text-[22px] text-ink mb-2" style={{ fontFamily: 'var(--font-cormorant), serif' }}>
                1. Select Size & Length
              </h2>
              <p className="text-[12px] text-muted mb-6">Choose the style that fits your desired look.</p>
              
              {serviceData && serviceData.options.length > 0 ? (
                <div className="flex flex-col gap-3">
                  {serviceData.options.map((opt: any, i: number) => {
                    const isSelected = selectedOption?.name === opt.name;
                    return (
                      <button
                        key={i}
                        onClick={() => setSelectedOption(opt)}
                        className={`group relative w-full p-5 rounded-xl border transition-all duration-300 flex items-center justify-between ${
                          isSelected 
                            ? "border-brand-700 bg-brand-50 shadow-sm" 
                            : "border-ink/10 bg-white hover:border-brand-300"
                        }`}
                      >
                        <div className="flex flex-col items-start text-left">
                          <span className={`text-[15px] font-bold uppercase tracking-wider ${isSelected ? "text-brand-900" : "text-ink"}`}>
                            {opt.name}
                          </span>
                          <span className={`text-[12px] uppercase tracking-wider mt-1 ${isSelected ? "text-brand-700/70" : "text-muted"}`}>
                            {formatTime(opt.duration)}
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-4">
                          <span className={`text-[20px] ${isSelected ? "text-brand-700" : "text-ink"}`} style={{ fontFamily: 'var(--font-cormorant), serif' }}>
                            £{opt.price}
                          </span>
                          <div className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                            isSelected ? "border-brand-700 bg-brand-700" : "border-ink/20 bg-white"
                          }`}>
                            {isSelected && <div className="h-2.5 w-2.5 rounded-full bg-white" />}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              ) : (
                <p className="text-[13px] text-muted">No specific options available.</p>
              )}
            </div>

            {serviceData && serviceData.extras && serviceData.extras.length > 0 && (
              <div className="mb-10 pt-8 border-t border-ink/10">
                <h2 className="text-[22px] text-ink mb-2" style={{ fontFamily: 'var(--font-cormorant), serif' }}>
                  2. Add-ons
                </h2>
                <p className="text-[12px] text-muted mb-4">Optional extras to elevate your look.</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {serviceData.extras.map((extra: any, i: number) => {
                    const isChecked = selectedExtras.includes(extra.name);
                    return (
                      <button
                        key={i}
                        onClick={() => toggleExtra(extra.name)}
                        className={`w-full flex items-center justify-between p-4 rounded-xl border-2 transition-all duration-200 ${
                          isChecked 
                            ? "border-brand-700 bg-brand-50" 
                            : "border-ink/10 bg-white hover:border-brand-300"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 transition-colors ${
                            isChecked ? "border-brand-700 bg-brand-700" : "border-ink/30 bg-white"
                          }`}>
                            {isChecked && <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="w-3.5 h-3.5 text-white"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>}
                          </div>
                          
                          <div className="text-left">
                            <p className={`text-[13px] font-bold ${isChecked ? "text-brand-900" : "text-ink"}`}>{extra.name}</p>
                            <p className="text-[11px] text-muted mt-0.5">
                              From £{extra.minPrice}{extra.maxPrice > extra.minPrice ? ` - £${extra.maxPrice}` : ""}
                            </p>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="pt-8 border-t border-ink/10 flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-widest text-muted mb-1">Estimated Total</p>
                <div className="flex items-baseline gap-2">
                  <p className="text-[40px] text-brand-700 leading-none" style={{ fontFamily: 'var(--font-cormorant), serif' }}>
                    £{calculateTotal()}
                  </p>
                </div>
              </div>
              
              <button 
                onClick={handleContinue}
                disabled={!selectedOption}
                className="w-full md:w-auto rounded-full bg-brand-700 px-10 py-4 text-[11px] font-bold uppercase tracking-[0.15em] text-white shadow-lg shadow-brand-700/30 transition-all hover:bg-brand-900 hover:-translate-y-0.5 disabled:opacity-50"
              >
                Continue to Date & Time →
              </button>
            </div>
          </div>
        )}
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
