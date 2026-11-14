"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Suspense, useState, useEffect } from "react";
import Link from "next/link";

const WHATSAPP_NUMBER = "447393157901";

function CalendarContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const serviceName = searchParams.get("service") || "Service";
  const serviceId = searchParams.get("id") || "";
  const optionName = searchParams.get("option") || "";
  const price = searchParams.get("price") || "0";
  const duration = Number(searchParams.get("duration")) || 60;

  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [existingBookings, setExistingBookings] = useState<any[]>([]);
  
  // Availability States
  const [weeklySchedule, setWeeklySchedule] = useState<any[]>([]);
  const [dayException, setDayException] = useState<any>(null);
  const [isClosed, setIsClosed] = useState(false);
  
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (!selectedDate) return;
    fetch(`/api/bookings?date=${selectedDate}`)
      .then(res => res.json())
      .then(data => {
        if (data.bookings) setExistingBookings(data.bookings);
        if (data.weeklySchedule) setWeeklySchedule(data.weeklySchedule);
        if (data.exception) setDayException(data.exception);
        else setDayException(null);
      })
      .catch(console.error);
  }, [selectedDate]);

  // CALCULATE SLOTS
  const generateSlots = () => {
    if (!selectedDate) return [];

    // 1. Check if there is a specific exception for this day
    if (dayException) {
      if (dayException.isOpen === 0) {
        setIsClosed(true);
        return [];
      }
    } else {
      // 2. If no exception, check the standard weekly schedule
      const dateObj = new Date(selectedDate);
      const dayOfWeek = dateObj.getDay(); // 0 = Sunday, 1 = Monday, etc.
      const standardDay = weeklySchedule.find(d => d.id === dayOfWeek);
      
      if (standardDay && standardDay.isOpen === 0) {
        setIsClosed(true);
        return [];
      }
    }

    setIsClosed(false);

    // 3. Determine open/close times
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
      
      // If service runs past closing time, skip it
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
    return slots;
  };

  const availableSlots = generateSlots();

  const handleBook = async () => {
    if (!selectedDate || !selectedTime || !name || !phone) {
      return alert("Please fill all required fields");
    }

    setSubmitting(true);
    const selectedSlot = availableSlots.find(s => s.start === selectedTime);
    
    try {
      await fetch("/api/bookings", {
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
      setIsSuccess(true);
    } catch (error) {
      alert("Failed to book. Please try again.");
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
━━━━━━━━━━━━━━━

*Name:* ${name}
*Phone:* ${phone}

*Deposit Paid:* £10

Please find my receipt attached. Looking forward to it!`;

  const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`;

  if (isSuccess) {
    return (
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
    );
  }

  return (
    <main className="min-h-screen bg-[#FAF7FE] pt-[120px] md:pt-[160px] pb-24">
      <div className="mx-auto max-w-3xl px-5 md:px-8">
        
        <div className="mb-10 text-center">
          <Link href={`/book?service=${serviceName}&id=${serviceId}`} className="text-[10px] font-bold uppercase tracking-widest text-brand-700/60 hover:text-brand-700 mb-6 inline-block transition-colors">
            ← Back to options
          </Link>
          <h1 className="text-[36px] md:text-[52px] text-ink leading-tight mb-2" style={{ fontFamily: 'var(--font-cormorant), serif' }}>
            Select Date & Time
          </h1>
          <p className="text-[14px] text-muted">
            You are booking: <strong className="text-ink">{serviceName} ({optionName})</strong> — <strong className="text-brand-700">£{price}</strong>
          </p>
        </div>

        <div className="bg-white p-6 md:p-10 rounded-3xl border border-brand-100 shadow-xl shadow-brand-900/5">
          
          <div className="mb-8">
            <h2 className="text-[20px] text-ink mb-4" style={{ fontFamily: 'var(--font-cormorant), serif' }}>1. Pick a Date</h2>
            <input 
              type="date"
              value={selectedDate}
              onChange={(e) => { setSelectedDate(e.target.value); setSelectedTime(""); }}
              className="w-full rounded-md border border-ink/20 bg-[#FAF7FE] px-4 py-4 text-[14px] outline-none focus:border-brand-700"
            />
          </div>

          {selectedDate && (
            <div className="mb-8">
              <h2 className="text-[20px] text-ink mb-4" style={{ fontFamily: 'var(--font-cormorant), serif' }}>2. Pick a Time</h2>
              {isClosed ? (
                <p className="text-[13px] text-red-500 font-medium bg-red-50 p-4 rounded-lg">We are closed on this day. Please pick another date.</p>
              ) : availableSlots.length === 0 ? (
                <p className="text-[13px] text-red-500 font-medium bg-red-50 p-4 rounded-lg">No available slots for this day. Please pick another date.</p>
              ) : (
                <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
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
            <button 
              onClick={handleBook}
              disabled={!selectedTime || !name || !phone || submitting}
              className="w-full rounded-full bg-brand-700 py-4 text-[11px] font-bold uppercase tracking-[0.15em] text-white shadow-lg shadow-brand-700/30 transition-all hover:bg-brand-900 disabled:opacity-50"
            >
              {submitting ? "Processing..." : "Confirm Booking Details"}
            </button>
          </div>

        </div>
      </div>
    </main>
  );
}

export default function CalendarPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FAF7FE] flex justify-center pt-32"><div className="h-8 w-8 animate-spin rounded-full border-2 border-brand-200 border-t-brand-700" /></div>}>
      <CalendarContent />
    </Suspense>
  );
}
