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

  if (loading) {
    return <div className="min-h-screen bg-[#FAF7FE] flex justify-center pt-32"><div className="h-8 w-8 animate-spin rounded-full border-2 border-brand-200 border-t-brand-700" /></div>;
  }

  const bannerImage = serviceData?.image || "/hero-1.jpg";

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
          <p className="text-[13px] text-white/80">Select your options below</p>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-5 md:px-8 -mt-10 md:-mt-16 relative z-20">
        <div className="bg-white p-6 md:p-10 rounded-3xl border border-brand-100 shadow-xl shadow-brand-900/10">
          
          {/* PREMIUM OPTIONS GRID */}
          <div className="mb-10">
            <h2 className="text-[22px] text-ink mb-6" style={{ fontFamily: 'var(--font-cormorant), serif' }}>
              1. Select Size & Length
            </h2>
            
            {serviceData && serviceData.options.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {serviceData.options.map((opt: any, i: number) => {
                  const isSelected = selectedOption?.name === opt.name;
                  return (
                    <button
                      key={i}
                      onClick={() => setSelectedOption(opt)}
                      className={`group relative p-5 rounded-xl border-2 text-left transition-all duration-300 flex flex-col justify-center ${
                        isSelected 
                          ? "border-brand-700 bg-brand-700 shadow-lg shadow-brand-700/20" 
                          : "border-ink/10 bg-[#FAF7FE] hover:border-brand-300 hover:bg-white"
                      }`}
                    >
                      <div className="flex justify-between items-start mb-1">
                        <span className={`text-[14px] font-bold uppercase tracking-wider ${isSelected ? "text-white" : "text-ink"}`}>
                          {opt.name}
                        </span>
                        {isSelected && (
                          <div className="h-5 w-5 rounded-full bg-white flex items-center justify-center">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="w-3 h-3 text-brand-700"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex items-baseline gap-2 mt-2">
                        <span className={`text-[22px] leading-none ${isSelected ? "text-white" : "text-brand-700"}`} style={{ fontFamily: 'var(--font-cormorant), serif' }}>
                          £{opt.price}
                        </span>
                        <span className={`text-[11px] uppercase tracking-wider ${isSelected ? "text-white/60" : "text-muted"}`}>
                          {opt.duration >= 60 ? `${(opt.duration / 60).toFixed(1).replace('.0', '')} hrs` : `${opt.duration} mins`}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            ) : (
              <p className="text-[13px] text-muted">No specific options available.</p>
            )}
          </div>

          {/* PREMIUM EXTRAS */}
          {serviceData && serviceData.extras && serviceData.extras.length > 0 && (
            <div className="mb-10 pt-8 border-t border-ink/10">
              <h2 className="text-[22px] text-ink mb-2" style={{ fontFamily: 'var(--font-cormorant), serif' }}>
                2. Add-ons
              </h2>
              <p className="text-[12px] text-muted mb-4">Optional extras to elevate your look.</p>

              <div className="flex flex-col gap-3">
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
                      <div className="flex items-center gap-4">
                        {/* CUSTOM CHECKBOX */}
                        <div className={`flex h-6 w-6 shrink-0 items-center justify-center rounded border-2 transition-colors ${
                          isChecked ? "border-brand-700 bg-brand-700" : "border-ink/30 bg-white"
                        }`}>
                          {isChecked && <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="w-4 h-4 text-white"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>}
                        </div>
                        
                        <div className="text-left">
                          <p className={`text-[14px] font-bold ${isChecked ? "text-brand-900" : "text-ink"}`}>{extra.name}</p>
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

          {/* TOTAL & CONTINUE */}
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
