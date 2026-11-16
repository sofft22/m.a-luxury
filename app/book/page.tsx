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
          
          // PARSE EXTRAS HERE
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
          total += Number(extra.minPrice) || 0; // We add the minimum price to the total
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
          
          {/* OPTIONS */}
          <div className="mb-8">
            <h2 className="text-[20px] text-ink mb-4" style={{ fontFamily: 'var(--font-cormorant), serif' }}>
              Select Size / Length
            </h2>
            
            {serviceData && serviceData.options.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {serviceData.options.map((opt: any, i: number) => (
                  <button
                    key={i}
                    onClick={() => setSelectedOption(opt)}
                    className={`py-3 px-4 rounded-lg border text-[12px] font-bold uppercase tracking-wider transition-all flex flex-col items-center justify-center gap-1 ${
                      selectedOption?.name === opt.name 
                        ? "border-brand-700 bg-brand-700 text-white shadow-md" 
                        : "border-ink/10 text-ink hover:border-brand-700 bg-white"
                    }`}
                  >
                    <span>{opt.name}</span>
                    <span className={`text-[14px] ${selectedOption?.name === opt.name ? "text-white/80" : "text-brand-700"}`}>
                      £{opt.price}
                    </span>
                    <span className={`text-[10px] ${selectedOption?.name === opt.name ? "text-white/60" : "text-muted"}`}>
                      {opt.duration >= 60 ? `${(opt.duration / 60).toFixed(1).replace('.0', '')} hrs` : `${opt.duration} mins`}
                    </span>
                  </button>
                ))}
              </div>
            ) : (
              <p className="text-[13px] text-muted">No specific options available.</p>
            )}
          </div>

          {/* EXTRAS CHECKBOXES */}
          {serviceData && serviceData.extras && serviceData.extras.length > 0 && (
            <div className="mb-8 pt-6 border-t border-ink/10">
              <h2 className="text-[20px] text-ink mb-4" style={{ fontFamily: 'var(--font-cormorant), serif' }}>
                Add-ons
              </h2>
              <div className="flex flex-col gap-3">
                {serviceData.extras.map((extra: any, i: number) => (
                  <label key={i} className="flex items-center gap-3 cursor-pointer group">
                    <div className="relative flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedExtras.includes(extra.name)}
                        onChange={() => toggleExtra(extra.name)}
                        className="peer h-5 w-5 cursor-pointer appearance-none rounded border border-ink/30 bg-white transition-all checked:border-brand-700 checked:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-700/20 focus:ring-offset-1"
                      />
                      <svg className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 peer-checked:opacity-100 transition-opacity" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                    <span className="text-[14px] text-ink group-hover:text-brand-700 transition-colors">
                      {extra.name} 
                      <span className="text-muted ml-1">
                        (from £{extra.minPrice}{extra.maxPrice > extra.minPrice ? ` - £${extra.maxPrice}` : ""})
                      </span>
                    </span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* TOTAL */}
          <div className="pt-6 border-t border-ink/10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-widest text-muted mb-1">Estimated Total</p>
              <p className="text-[32px] text-brand-700" style={{ fontFamily: 'var(--font-cormorant), serif' }}>
                £{calculateTotal()}
              </p>
            </div>
            
            <button 
              onClick={handleContinue}
              disabled={!selectedOption}
              className="w-full md:w-auto rounded-full bg-brand-700 px-10 py-4 text-[11px] font-bold uppercase tracking-[0.15em] text-white shadow-lg shadow-brand-700/30 transition-all hover:bg-brand-900 disabled:opacity-50"
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
