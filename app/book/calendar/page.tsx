"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Suspense, useState, useEffect } from "react";
import Link from "next/link";

function CalendarContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const serviceName = searchParams.get("service") || "Service";
  const serviceId = searchParams.get("id") || "";
  const price = searchParams.get("price") || "0";
  const duration = Number(searchParams.get("duration")) || 60; // In minutes

  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [existingBookings, setExistingBookings] = useState<any[]>([]);
  
  // Form
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Fetch existing bookings when a date is selected
  useEffect(() => {
    if (!selectedDate) return;
    fetch(`/api/bookings?date=${selectedDate}`)
      .then(res => res.json())
      .then(data => setExistingBookings(Array.isArray(data) ? data : []))
      .catch(console.error);
  }, [selectedDate]);

  // TIME SLOT GENERATOR
  // You work 9:00 AM to 6:00 PM (18:00).
  const generateSlots = () => {
    if (!selectedDate) return [];
    const slots = [];
    const openTime = 9; // 9 AM
    const closeTime = 18; // 6 PM
    
    for (let hour = openTime; hour < closeTime; hour++) {
      // Calculate end time of this slot
      const endHour = hour + (duration / 60);
      
      // If it runs past closing time, skip it
      if (endHour > closeTime) continue;

      const startStr = `${hour.toString().padStart(2, '0')}:00`;
      const endStr = `${Math.floor(endHour).toString().padStart(2, '0')}:${(endHour % 1 === 0.5 ? '30' : '00')}`;

      // Check if it overlaps with existing bookings
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
          serviceName,
          customerName: name,
          phone,
          email,
          date: selectedDate,
          startTime: selectedTime,
          endTime: selectedSlot?.end
        })
      });

      // In reality, you would route to Stripe Checkout here.
      // For now, we just go to the success page.
      router.push("/success"); 
    } catch (error) {
      alert("Failed to book");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#FAF7FE] pt-[120px] md:pt-[160px] pb-24">
      <div className="mx-auto max-w-3xl px-5 md:px-8">
        
        {/* HEADER */}
        <div className="mb-10 text-center">
          <Link href={`/book?service=${serviceName}&id=${serviceId}`} className="text-[10px] font-bold uppercase tracking-widest text-brand-700/60 hover:text-brand-700 mb-6 inline-block transition-colors">
            ← Back to options
          </Link>
          <h1 className="text-[36px] md:text-[52px] text-ink leading-tight mb-2" style={{ fontFamily: 'var(--font-cormorant), serif' }}>
            Select Date & Time
          </h1>
          <p className="text-[14px] text-muted">
            You are booking: <strong className="text-ink">{serviceName}</strong> (Est. {duration} mins) — <strong className="text-brand-700">£{price}</strong>
          </p>
        </div>

        <div className="bg-white p-6 md:p-10 rounded-3xl border border-brand-100 shadow-xl shadow-brand-900/5">
          
          {/* DATE INPUT */}
          <div className="mb-8">
            <h2 className="text-[20px] text-ink mb-4" style={{ fontFamily: 'var(--font-cormorant), serif' }}>1. Pick a Date</h2>
            <input 
              type="date"
              value={selectedDate}
              onChange={(e) => { setSelectedDate(e.target.value); setSelectedTime(""); }}
              className="w-full rounded-md border border-ink/20 bg-[#FAF7FE] px-4 py-4 text-[14px] outline-none focus:border-brand-700"
            />
          </div>

          {/* TIME SLOTS */}
          {selectedDate && (
            <div className="mb-8">
              <h2 className="text-[20px] text-ink mb-4" style={{ fontFamily: 'var(--font-cormorant), serif' }}>2. Pick a Time</h2>
              {availableSlots.length === 0 ? (
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

          {/* DETAILS FORM */}
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

          {/* CHECKOUT BUTTON */}
          <div className="pt-6 border-t border-ink/10 flex flex-col items-center">
            <p className="text-[12px] text-muted mb-4 text-center">A £10 non-refundable deposit is required to secure your slot.</p>
            <button 
              onClick={handleBook}
              disabled={!selectedTime || !name || !phone || submitting}
              className="w-full rounded-full bg-brand-700 py-4 text-[11px] font-bold uppercase tracking-[0.15em] text-white shadow-lg shadow-brand-700/30 transition-all hover:bg-brand-900 disabled:opacity-50"
            >
              {submitting ? "Processing..." : "Pay £10 Deposit & Confirm"}
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
