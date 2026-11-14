"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Suspense, useState, useEffect } from "react";
import Link from "next/link";

function BookingOptionsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const serviceName = searchParams.get("service") || "Service";
  const serviceId = searchParams.get("id");

  const [serviceData, setServiceData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  // State for the selected option
  const [selectedOption, setSelectedOption] = useState<{ name: string, price: number } | null>(null);

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
          // Parse the options JSON string
          const parsedOptions = typeof found.options === 'string' ? JSON.parse(found.options || "[]") : found.options;
          setServiceData({ ...found, options: parsedOptions });
          
          // Auto-select the first option
          if (parsedOptions.length > 0) {
            setSelectedOption(parsedOptions[0]);
          }
        }
      } catch (error) {
        console.error("Failed to fetch service options", error);
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [serviceId]);

  const handleContinue = () => {
    if (!selectedOption) return alert("Please select an option");
    
    // Pass everything to the calendar page
    router.push(
      `/book/calendar?service=${encodeURIComponent(serviceName)}&option=${encodeURIComponent(selectedOption.name)}&price=${selectedOption.price}`
    );
  };

  if (loading) {
    return <div className="min-h-screen bg-[#FAF7FE] flex justify-center pt-32"><div className="h-8 w-8 animate-spin rounded-full border-2 border-brand-200 border-t-brand-700" /></div>;
  }

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
          
          <div className="mb-8">
            <h2 className="text-[20px] text-ink mb-4" style={{ fontFamily: 'var(--font-cormorant), serif' }}>
              Select Size / Length
            </h2>
            
            {serviceData && serviceData.options.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {serviceData.options.map((opt: any, i: number) => (
                  <button
                    key={i}
                    onClick={() => setSelectedOption(opt)}
                    className={`py-3 px-4 rounded-lg border text-[12px] font-bold uppercase tracking-wider transition-all flex flex-col items-center justify-center gap-1 ${
                      selectedOption?.name === opt.name 
                        ? "border-brand-700 bg-brand-700 text-white shadow-md" 
                        : "border-ink/10 text-ink hover:border-brand-700"
                    }`}
                    style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
                  >
                    <span>{opt.name}</span>
                    <span className={`text-[14px] ${selectedOption?.name === opt.name ? "text-white/80" : "text-brand-700"}`}>
                      £{opt.price}
                    </span>
                  </button>
                ))}
              </div>
            ) : (
              <p className="text-[13px] text-muted">No specific options available for this service.</p>
            )}
          </div>

          {/* PRICE SUMMARY & CONTINUE */}
          <div className="pt-6 border-t border-ink/10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-widest text-muted mb-1" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                Total Price
              </p>
              <p className="text-[32px] text-brand-700" style={{ fontFamily: 'var(--font-cormorant), serif' }}>
                £{selectedOption ? selectedOption.price : 0}
              </p>
            </div>
            
            <button 
              onClick={handleContinue}
              disabled={!selectedOption}
              className="w-full md:w-auto rounded-full bg-brand-700 px-10 py-4 text-[11px] font-bold uppercase tracking-[0.15em] text-white shadow-lg shadow-brand-700/30 transition-all hover:bg-brand-900 disabled:opacity-50"
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
