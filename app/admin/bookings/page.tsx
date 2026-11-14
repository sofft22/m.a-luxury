"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminBookingsPage() {
  const router = useRouter();
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (localStorage.getItem("ma_admin_logged_in") !== "true") {
      router.push("/admin/login");
      return;
    }

    fetch("/api/bookings")
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          // Sort by date and time
          const sorted = data.sort((a: any, b: any) => {
            const dateCompare = new Date(a.date).getTime() - new Date(b.date).getTime();
            if (dateCompare !== 0) return dateCompare;
            return a.startTime.localeCompare(b.startTime);
          });
          setBookings(sorted);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [router]);

  return (
    <div className="mx-auto max-w-5xl px-5 py-8 sm:px-8 sm:py-10 min-h-screen bg-[#FAF7FE]">
      
      <div className="mb-8 border-b border-ink/10 pb-6">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-700/60">Schedule</p>
        <h1 className="mt-1 text-[32px] font-normal text-ink" style={{ fontFamily: "var(--font-cormorant), serif" }}>
          Appointments
        </h1>
      </div>

      {loading ? (
        <div className="flex justify-center py-24"><div className="h-6 w-6 animate-spin rounded-full border-2 border-brand-200 border-t-brand-700" /></div>
      ) : bookings.length === 0 ? (
        <div className="py-24 text-center text-[14px] text-muted">No appointments booked yet.</div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-brand-100 overflow-hidden">
          <ul className="flex flex-col">
            {bookings.map((b) => (
              <li key={b.id} className="border-b border-ink/5 last:border-0 p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                
                <div className="flex items-start gap-4">
                  {/* Date Box */}
                  <div className="flex flex-col items-center justify-center h-16 w-16 bg-brand-50 rounded-lg shrink-0 border border-brand-100">
                    <span className="text-[10px] font-bold uppercase text-brand-700/60">{new Date(b.date).toLocaleDateString('en-GB', { month: 'short' })}</span>
                    <span className="text-[22px] font-semibold text-brand-700 leading-none mt-1">{new Date(b.date).getDate()}</span>
                  </div>
                  
                  {/* Booking Details */}
                  <div>
                    <h3 className="text-[20px] text-ink font-medium" style={{ fontFamily: "var(--font-cormorant), serif" }}>{b.serviceName}</h3>
                    <p className="text-[13px] text-muted mt-1">{b.customerName} • {b.phone}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="bg-ink/5 px-2 py-1 rounded text-[11px] font-medium text-ink">{b.startTime} - {b.endTime}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                   <span className="text-[10px] font-bold uppercase tracking-wider bg-green-100 text-green-700 px-3 py-1.5 rounded-full">Deposit Paid</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
