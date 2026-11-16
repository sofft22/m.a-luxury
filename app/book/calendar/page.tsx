"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Suspense, useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { LegalModal } from "@/components/LegalModal";

const WHATSAPP_NUMBER = "447393157901";

const CATEGORY_NAMES: Record<string, string> = {
  "braids": "Braids & Twists",
  "locs": "Locs & Maintenance",
  "installs": "Installs & Styling",
  "beauty": "Beauty",
};

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

function CalendarContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const serviceName = searchParams.get("service") || "Service";
  const serviceId = searchParams.get("id") || "";
  const optionName = searchParams.get("option") || "";
  const price = searchParams.get("price") || "0";
  const duration = Number(searchParams.get("duration")) || 60;
  const extrasParam = searchParams.get("extras") || "";

  const [serviceImage, setServiceImage] = useState("/hero-1.jpg");
  const [serviceCategory, setServiceCategory] = useState("Services");

  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [existingBookings, setExistingBookings] = useState<any[]>([]);
  
  const [weeklySchedule, setWeeklySchedule] = useState<any[]>([]);
  const [dayException, setDayException] = useState<any>(null);
  
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [legalModalOpen, setLegalModalOpen] = useState(false);
  const [legalType, setLegalType] = useState<"policies" | "privacy" | null>(null);

  const openLegal = (type: "policies" | "privacy", e: React.MouseEvent) => {
    e.preventDefault();
    setLegalType(type);
    setLegalModalOpen(true);
  };

  useEffect(() => {
    if (!serviceId) return;
    fetch("/api/services")
      .then(res => res.json())
      .then(data => {
        const found = data.find((s: any) => s.id === serviceId);
        if (found) {
          if (found.image) setServiceImage(found.image);
          if (found.category) setServiceCategory(CATEGORY_NAMES[found.category] || "Services");
        }
      })
      .catch(console.error);
  }, [serviceId]);

  useEffect(() => {
    if (!selectedDate) return;
    
    fetch(`/api/bookings?date=${selectedDate}`)
      .then(res => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then(data => {
        setExistingBookings(Array.isArray(data.bookings) ? data.bookings : []);
        setWeeklySchedule(Array.isArray(data.weeklySchedule) ? data.weeklySchedule : []);
        setDayException(data.exception || null);
      })
      .catch(err => {
        console.error("Fetch error:", err);
        setExistingBookings([]);
        setWeeklySchedule([]);
        setDayException(null);
      });
  }, [selectedDate]);

  const { availableSlots, isClosed } = useMemo(() => {
    if (!selectedDate) return { availableSlots: [], isClosed: false };

    if (dayException) {
      if (dayException.isOpen === 0) {
        return { availableSlots: [], isClosed: true };
      }
    } else {
      const dateObj = new Date(selectedDate);
      const dayOfWeek = dateObj.getDay(); 
      const standardDay = weeklySchedule.find(d => d.id === dayOfWeek);
      
      if (standardDay && standardDay.isOpen === 0) {
        return { availableSlots: [], isClosed: true };
      }
    }

    let openTime = 9; 
    let closeTime = 18; 

    const dateObj = new Date(selectedDate);
    const dayOfWeek = dateObj.getDay();
    const standardDay = weeklySchedule.find(d => d.id === dayOfWeek);

    if (dayException && dayException.isOpen === 1) {
      openTime = parseInt(dayException.startTime.split(":")[0]);
      closeTime = parseInt(dayException.endTime.split(":")[0]);
    } else if (standardDay) {
      openTime = parseInt(standardDay.startTime.split(":")[0]);
      closeTime = parseInt(standardDay.endTime.split(":")[0]);
    }
    
    const slots = [];
    
    for (let hour = openTime; hour < closeTime; hour++) {
      const endHour = hour + (duration / 60);
      
      if (endHour > closeTime) continue;

      const startStr = `${hour.toString().padStart(2, '0')}:00`;
      const endH = Math.floor(endHour);
      const endM = (endHour % 1) !== 0 ? "30" : "00";
      const endStr = `${endH.toString().padStart(2, '0')}:${endM}`;

      const isOverlapping = existingBookings.some(b => {
        return (startStr < b.endTime && endStr > b.startTime);
      });

      if (!isOverlapping) {
        slots.push({ start: startStr, end: endStr });
      }
    }
    return { availableSlots: slots, isClosed: false };
  }, [selectedDate, dayException, weeklySchedule, existingBookings, duration]);

  const handleBook = async () => {
    if (!selectedDate || !selectedTime || !name || !phone) {
      return alert("Please fill all required fields");
    }
    if (!agreedToTerms) {
      return alert("Please agree to the Terms of Service and Privacy Policy.");
    }

    setSubmitting(true);
    const selectedSlot = availableSlots.find(s => s.start === selectedTime);
    
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        body: JSON.stringify({
          serviceId,
          serviceName: `${serviceName} (${optionName})`,
          customerName: name,
          phone,
          email,
          date: selectedDate,
          startTime: selectedTime,
          endTime: selectedSlot?.end
        })
      });

      if (!res.ok) {
        const errorData = await res.json();
        alert(`Database Error: ${errorData.error || "Unknown error"}`);
        setSubmitting(false);
        return;
      }

      setIsSuccess(true);
    } catch (error: any) {
      alert(`Network Error: ${error.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  const whatsappMessage = 
`Hi M.a Luxury! 💜

I have just paid my deposit for a new booking.

*Booking Details:*
━━━━━━━━━━━━━━━
*Service:* ${serviceName}
*Style:* ${optionName}
*Date:* ${selectedDate}
*Time:* ${selectedTime}
*Price:* £${price}
${extrasParam ? `*Extras:* ${extrasParam}\n` : ""}━━━━━━━━━━━━━━━

*Name:* ${name}
*Phone:* ${phone}

*Deposit Paid:* £10

Please find my receipt attached. Looking forward to it!`;

  const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`;

  const getDaysInMonth = (month: number, year: number) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (month: number, year: number) => new Date(year, month, 1).getDay();

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const generateCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
    const days = [];
    for (let i = 0; i < firstDay; i++) days.push(null);
    for (let i = 1; i <= daysInMonth; i++) days.push(i);
    return days;
  };

  return (
    <>
      {isSuccess ? (
        <main className="min-h-screen bg-[#FAF7FE] pt-[120px] md:pt-[160px] pb-24">
          <div className="mx-auto max-w-2xl px-5 md:px-8">
            
            <div className="bg-white p-8 md:p-12 rounded-3xl border border-brand-100 shadow-xl shadow-brand-900/5 text-center">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-8 h-8 text-green-600"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
              </div>
              
              <h1 className="text-[32px] md:text-[40px] text-ink mb-2" style={{ fontFamily: 'var(--font-cormorant), serif' }}>
                Booking Confirmed!
              </h1>
              <p className="text-[14px] text-muted mb-8">
                Your slot is reserved. Please follow the steps below to secure it.
              </p>

              <div className="bg-[#FAF7FE] border border-brand-100 rounded-2xl p-6 text-left mb-8">
                <h2 className="text-[12px] font-bold uppercase tracking-[0.15em] text-brand-700 mb-4" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>Payment Details</h2>
                <p className="text-[13px] text-ink mb-4">Please send the <strong>£10 deposit</strong> to:</p>
                
                <div className="flex flex-col gap-2 text-[14px]">
                  <div className="flex justify-between border-b border-ink/10 pb-2">
                    <span className="text-muted">Bank</span>
                    <span className="font-medium text-ink">Monzo</span>
                  </div>
                  <div className="flex justify-between border-b border-ink/10 pb-2">
                    <span className="text-muted">Account Name</span>
                    <span className="font-medium text-ink">Azizat Mayokun Akanbi</span>
                  </div>
                  <div className="flex justify-between border-b border-ink/10 pb-2">
                    <span className="text-muted">Sort Code</span>
                    <span className="font-medium text-ink tracking-wider">04-00-03</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted">Account Number</span>
                    <span className="font-medium text-ink tracking-wider">35281032</span>
                  </div>
                </div>
              </div>

              <a 
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] py-4 text-[11px] font-bold uppercase tracking-[0.15em] text-white shadow-lg shadow-[#25D366]/30 transition-all hover:bg-[#1ebe57]"
                style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                Send Receipt on WhatsApp
              </a>
              
              <p className="text-[11px] text-muted mt-4">
                Your appointment will be fully confirmed once we verify your receipt.
              </p>
            </div>

          </div>
        </main>
      ) : (
        <main className="min-h-screen bg-[#FAF7FE] pb-24">
          
          <section className="relative h-[40vh] md:h-[50vh] flex items-center justify-center overflow-hidden pt-[80px] md:pt-[100px]">
            <Image src={serviceImage} alt={serviceName} fill className="object-cover object-top" priority />
            <div className="absolute inset-0 bg-black/60" />
            
            <div className="relative z-10 text-center px-6 mt-10">
              <Link href={`/book?service=${serviceName}&id=${serviceId}`} className="text-[10px] font-bold uppercase tracking-widest text-white/60 hover:text-white mb-4 inline-block transition-colors" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                ← Back to options
              </Link>
              <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-gold mb-2" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                {serviceCategory}
              </p>
              <h1 className="text-[42px] md:text-[64px] text-white leading-tight mb-2" style={{ fontFamily: 'var(--font-cormorant), serif' }}>
                {serviceName}
              </h1>
              <p className="text-[13px] text-white/80">Select your date and time below</p>
            </div>
          </section>

          <div className="mx-auto max-w-3xl px-5 md:px-8 -mt-10 md:-mt-16 relative z-20">
            <div className="bg-white p-6 md:p-10 rounded-3xl border border-brand-100 shadow-xl shadow-brand-900/10">
              
              <div className="mb-10">
                <h2 className="text-[20px] text-ink mb-6" style={{ fontFamily: 'var(--font-cormorant), serif' }}>1. Pick a Date</h2>
                
                <div className="bg-[#FAF7FE] rounded-2xl border border-ink/5 p-4 sm:p-6">
                  <div className="flex items-center justify-between mb-6">
                    <button onClick={handlePrevMonth} className="p-2 rounded-full hover:bg-brand-100 transition-colors">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5 text-ink"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
                    </button>
                    <h3 className="text-[18px] font-bold text-ink uppercase tracking-wider" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>
                      {MONTHS[currentMonth]} {currentYear}
                    </h3>
                    <button onClick={handleNextMonth} className="p-2 rounded-full hover:bg-brand-100 transition-colors">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5 text-ink"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                    </button>
                  </div>

                  <div className="grid grid-cols-7 gap-1 mb-2">
                    {DAYS.map(day => (
                      <div key={day} className="text-center text-[11px] font-bold text-muted uppercase tracking-wider py-2">{day}</div>
                    ))}
                  </div>

                  <div className="grid grid-cols-7 gap-1 sm:gap-2">
                    {generateCalendarDays().map((day, i) => {
                      if (day === null) return <div key={`empty-${i}`} />;
                      const dateStr = `${currentYear}-${(currentMonth + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
                      const isSelected = selectedDate === dateStr;
                      const isPast = new Date(dateStr) < new Date(new Date().setHours(0,0,0,0));

                      return (
                        <button
                          key={i}
                          disabled={isPast}
                          onClick={() => { setSelectedDate(dateStr); setSelectedTime(""); }}
                          className={`aspect-square flex items-center justify-center rounded-lg text-[14px] sm:text-[16px] transition-all ${
                            isPast 
                              ? "text-ink/20 cursor-not-allowed" 
                              : isSelected
                                ? "bg-brand-700 text-white shadow-md font-bold scale-105"
                                : "bg-white text-ink hover:bg-brand-50 hover:border-brand-200 border border-transparent"
                          }`}
                        >
                          {day}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {selectedDate && (
                <div className="mb-8">
                  <h2 className="text-[20px] text-ink mb-4" style={{ fontFamily: 'var(--font-cormorant), serif' }}>2. Pick a Time</h2>
                  {isClosed ? (
                    <p className="text-[13px] text-red-500 font-medium bg-red-50 p-4 rounded-lg">We are closed on this day. Please pick another date.</p>
                  ) : availableSlots.length === 0 ? (
                    <p className="text-[13px] text-red-500 font-medium bg-red-50 p-4 rounded-lg">No available slots for this day. Please pick another date.</p>
                  ) : (
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                      {availableSlots.map((slot, i) => (
                        <button 
                          key={i}
                          onClick={() => setSelectedTime(slot.start)}
                          className={`py-3 rounded-md border text-[12px] transition-colors ${
                            selectedTime === slot.start ? "border-brand-700 bg-brand-700 text-white" : "border-ink/10 text-ink hover:border-brand-700 bg-[#FAF7FE]"
                          }`}
                        >
                          {slot.start}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {selectedTime && (
                <div className="mb-8">
                  <h2 className="text-[20px] text-ink mb-4" style={{ fontFamily: 'var(--font-cormorant), serif' }}>3. Your Details</h2>
                  <div className="flex flex-col gap-3">
                    <input type="text" placeholder="Full Name" value={name} onChange={e => setName(e.target.value)} className="w-full rounded-md border border-ink/20 bg-[#FAF7FE] px-4 py-3 text-[14px] outline-none focus:border-brand-700" />
                    <input type="tel" placeholder="Phone Number" value={phone} onChange={e => setPhone(e.target.value)} className="w-full rounded-md border border-ink/20 bg-[#FAF7FE] px-4 py-3 text-[14px] outline-none focus:border-brand-700" />
                    <input type="email" placeholder="Email Address (Optional)" value={email} onChange={e => setEmail(e.target.value)} className="w-full rounded-md border border-ink/20 bg-[#FAF7FE] px-4 py-3 text-[14px] outline-none focus:border-brand-700" />
                  </div>
                </div>
              )}

              <div className="pt-6 border-t border-ink/10 flex flex-col items-center">
                <p className="text-[12px] text-muted mb-4 text-center">A £10 non-refundable deposit is required to secure your slot.</p>
                
                <div className="flex items-start gap-3 w-full mb-6 px-2">
                  <div className="relative flex items-center">
                    <input
                      type="checkbox"
                      id="terms"
                      checked={agreedToTerms}
                      onChange={(e) => setAgreedToTerms(e.target.checked)}
                      className="peer h-5 w-5 cursor-pointer appearance-none rounded border border-ink/30 bg-white transition-all checked:border-brand-700 checked:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-700/20 focus:ring-offset-1"
                    />
                    <svg className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 peer-checked:opacity-100 transition-opacity" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <label htmlFor="terms" className="text-[12px] text-muted leading-tight cursor-pointer select-none">
                    I agree to the{" "}
                    <button onClick={(e) => openLegal("policies", e as any)} className="font-bold text-ink underline underline-offset-2 hover:text-brand-700 transition-colors">
                      Terms of Service
                    </button>{" "}
                    and{" "}
                    <button onClick={(e) => openLegal("privacy", e as any)} className="font-bold text-ink underline underline-offset-2 hover:text-brand-700 transition-colors">
                      Privacy Policy
                    </button>
                    .
                  </label>
                </div>

                <button 
                  onClick={handleBook}
                  disabled={!selectedTime || !name || !phone || submitting || !agreedToTerms}
                  className="w-full rounded-full bg-brand-700 py-4 text-[11px] font-bold uppercase tracking-[0.15em] text-white shadow-lg shadow-brand-700/30 transition-all hover:bg-brand-900 disabled:opacity-50"
                >
                  {submitting ? "Processing..." : "Confirm Booking Details"}
                </button>
              </div>

            </div>
          </div>
        </main>
      )}

      <LegalModal isOpen={legalModalOpen} onClose={() => setLegalModalOpen(false)} type={legalType} />
    </>
  );
}

export default function CalendarPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FAF7FE] flex justify-center pt-32"><div className="h-8 w-8 animate-spin rounded-full border-2 border-brand-200 border-t-brand-700" /></div>}>
      <CalendarContent />
    </Suspense>
  );
}
