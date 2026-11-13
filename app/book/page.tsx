"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Suspense, useState } from "react";
import Link from "next/link";

function BookingContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  // Grab the service from the URL (e.g., ?service=Relocs)
  const serviceName = searchParams.get("service") || "General Appointment";

  // Form state
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  return (
    <main className="min-h-screen bg-[#FAF7FE] pt-[120px] md:pt-[160px] pb-24">
      <div className="mx-auto max-w-3xl px-5 md:px-8">
        
        {/* HEADER */}
        <div className="mb-12 text-center">
          <Link 
            href="/services" 
            className="text-[10px] font-bold uppercase tracking-widest text-brand-700/60 hover:text-brand-700 transition-colors mb-6 inline-block"
            style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
          >
            ← Back to services
          </Link>
          <h1 className="text-[36px] md:text-[52px] text-ink leading-tight mb-4" style={{ fontFamily: 'var(--font-cormorant), serif' }}>
            Complete Your Booking
          </h1>
          <p className="text-[14px] text-muted">
            You are booking: <strong className="text-ink">{serviceName}</strong>
          </p>
        </div>

        {/* BOOKING CARD */}
        <div className="bg-white p-6 md:p-10 rounded-3xl border border-brand-100 shadow-xl shadow-brand-900/5">
          
          <div className="mb-8">
            <h2 className="text-[20px] text-ink mb-4" style={{ fontFamily: 'var(--font-cormorant), serif' }}>
              1. Select a Date
            </h2>
            {/* CALENDAR PLACEHOLDER */}
            <div className="border border-dashed border-brand-200 bg-brand-50/50 rounded-xl p-10 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-brand-50 transition-colors">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1} className="w-10 h-10 text-brand-700 mb-3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
              </svg>
              <p className="text-[13px] text-brand-700 font-medium">Date Picker Integration Coming Soon</p>
              <p className="text-[11px] text-muted mt-1">The admin will set available dates here.</p>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-[20px] text-ink mb-4" style={{ fontFamily: 'var(--font-cormorant), serif' }}>
              2. Select a Time
            </h2>
            {/* TIME SLOTS PLACEHOLDER */}
            <div className="grid grid-cols-3 gap-2">
              {["09:00 AM", "11:00 AM", "01:00 PM", "03:00 PM", "05:00 PM"].map((time) => (
                <button 
                  key={time}
                  className="py-3 rounded-md border border-ink/10 text-[12px] text-ink hover:border-brand-700 hover:text-brand-700 transition-colors bg-white"
                  style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-[20px] text-ink mb-4" style={{ fontFamily: 'var(--font-cormorant), serif' }}>
              3. Your Details
            </h2>
            <div className="flex flex-col gap-3">
              <input type="text" placeholder="Full Name" className="w-full rounded-md border border-ink/20 bg-[#FAF7FE] px-4 py-3 text-[14px] outline-none focus:border-brand-700 transition-colors" />
              <input type="tel" placeholder="Phone Number" className="w-full rounded-md border border-ink/20 bg-[#FAF7FE] px-4 py-3 text-[14px] outline-none focus:border-brand-700 transition-colors" />
              <input type="email" placeholder="Email Address (Optional)" className="w-full rounded-md border border-ink/20 bg-[#FAF7FE] px-4 py-3 text-[14px] outline-none focus:border-brand-700 transition-colors" />
            </div>
          </div>

          {/* DEPOSIT CHECKOUT */}
          <div className="pt-6 border-t border-ink/10 flex flex-col items-center">
            <p className="text-[12px] text-muted mb-4 text-center">
              A £10 non-refundable deposit is required to secure your slot. The remaining balance is due on the day.
            </p>
            <button 
              className="w-full rounded-full bg-brand-700 py-4 text-[11px] font-bold uppercase tracking-[0.15em] text-white shadow-lg shadow-brand-700/30 transition-all hover:bg-brand-900"
              style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
            >
              Pay £10 Deposit & Book
            </button>
          </div>

        </div>
      </div>
    </main>
  );
}

export default function BookPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FAF7FE] flex justify-center pt-32"><div className="h-8 w-8 animate-spin rounded-full border-2 border-brand-200 border-t-brand-700" /></div>}>
      <BookingContent />
    </Suspense>
  );
}
