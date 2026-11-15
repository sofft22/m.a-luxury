"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminBookingsPage() {
  const router = useRouter();
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadBookings = async () => {
    if (localStorage.getItem("ma_admin_logged_in") !== "true") {
      router.push("/admin/login");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/bookings");
      const data = await res.json();
      // Sort by date descending
      const sorted = Array.isArray(data) ? data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()) : [];
      setBookings(sorted);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadBookings();
  }, []);

  const updateStatus = async (id: string, newStatus: string) => {
    setBookings(bookings.map(b => b.id === id ? { ...b, status: newStatus } : b));
    await fetch("/api/bookings", {
      method: "PUT",
      body: JSON.stringify({ id, status: newStatus }),
    });
  };

  const deleteBooking = async (id: string) => {
    if (!confirm("Delete this booking?")) return;
    setBookings(bookings.filter(b => b.id !== id));
    await fetch(`/api/bookings?id=${id}`, { method: "DELETE" });
  };

  return (
    <div className="mx-auto max-w-4xl px-5 py-8 sm:px-8 sm:py-10 min-h-screen bg-[#FAF7FE]">
      
      <div className="mb-8 border-b border-ink/10 pb-6">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-700/60">Schedule</p>
        <h1 className="mt-1 text-[32px] font-normal text-ink" style={{ fontFamily: "var(--font-cormorant), serif" }}>
          Bookings
        </h1>
      </div>

      {loading ? (
        <div className="flex justify-center py-24"><div className="h-6 w-6 animate-spin rounded-full border-2 border-brand-200 border-t-brand-700" /></div>
      ) : bookings.length === 0 ? (
        <div className="py-24 text-center text-[14px] text-muted">No bookings yet.</div>
      ) : (
        <div className="flex flex-col gap-4">
          {bookings.map((b) => (
            <div key={b.id} className="bg-white rounded-2xl border border-brand-100 shadow-sm p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
              
              <div className="flex items-start gap-4">
                <div className="flex flex-col items-center justify-center h-16 w-16 bg-brand-50 rounded-lg shrink-0 border border-brand-100">
                  <span className="text-[10px] font-bold uppercase text-brand-700/60">{new Date(b.date).toLocaleDateString('en-GB', { month: 'short' })}</span>
                  <span className="text-[22px] font-semibold text-brand-700 leading-none mt-1">{new Date(b.date).getDate()}</span>
                </div>
                
                <div>
                  <h3 className="text-[20px] text-ink font-medium" style={{ fontFamily: "var(--font-cormorant), serif" }}>{b.serviceName}</h3>
                  <p className="text-[13px] text-muted mt-1">{b.customerName} • {b.phone}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="bg-ink/5 px-2 py-1 rounded text-[11px] font-medium text-ink">{b.startTime} - {b.endTime}</span>
                    <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${
                      b.status === "Confirmed" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"
                    }`}>
                      {b.status || "Pending"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 w-full md:w-auto">
                {b.status !== "Confirmed" && (
                  <button onClick={() => updateStatus(b.id, "Confirmed")} className="flex-1 md:flex-none rounded-full bg-brand-700 px-6 py-2.5 text-[10px] font-bold uppercase tracking-widest text-white hover:bg-brand-900 transition-colors">
                    Confirm
                  </button>
                )}
                <button onClick={() => deleteBooking(b.id)} className="rounded-full border border-red-200 px-6 py-2.5 text-[10px] font-bold uppercase tracking-widest text-red-600 hover:bg-red-50 transition-colors">
                  Delete
                </button>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}
