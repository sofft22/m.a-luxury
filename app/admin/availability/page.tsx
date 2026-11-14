"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminAvailabilityPage() {
  const router = useRouter();
  const [availability, setAvailability] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Form State
  const [date, setDate] = useState("");
  const [isOpen, setIsOpen] = useState(true);
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("18:00");
  const [saving, setSaving] = useState(false);

  const loadAvailability = async () => {
    if (localStorage.getItem("ma_admin_logged_in") !== "true") {
      router.push("/admin/login");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/availability");
      const data = await res.json();
      // Sort by date descending
      const sorted = Array.isArray(data) ? data.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()) : [];
      setAvailability(sorted);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadAvailability();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!date) return alert("Please select a date");
    
    setSaving(true);
    try {
      await fetch("/api/availability", {
        method: "POST",
        body: JSON.stringify({ date, isOpen, startTime, endTime })
      });
      // Reset form
      setDate("");
      setIsOpen(true);
      setStartTime("09:00");
      setEndTime("18:00");
      loadAvailability();
    } catch (error) {
      alert("Failed to save");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-5 py-8 sm:px-8 sm:py-10 min-h-screen bg-[#FAF7FE]">
      
      <div className="mb-8 border-b border-ink/10 pb-6">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-700/60">Schedule</p>
        <h1 className="mt-1 text-[32px] font-normal text-ink" style={{ fontFamily: "var(--font-cormorant), serif" }}>
          Manage Availability
        </h1>
        <p className="mt-2 text-[13px] text-muted">Set the days you are open and the hours you are working.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        
        {/* FORM TO ADD/EDIT HOURS */}
        <div className="bg-white p-6 md:p-8 rounded-2xl border border-brand-100 shadow-sm h-fit">
          <h2 className="text-[20px] text-ink mb-6" style={{ fontFamily: "var(--font-cormorant), serif" }}>Set Working Hours</h2>
          
          <form onSubmit={handleSave} className="flex flex-col gap-4">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-[0.15em] text-ink/60 mb-2">Date</label>
              <input 
                type="date" 
                value={date} 
                onChange={e => setDate(e.target.value)} 
                required
                className="w-full rounded-md border border-ink/20 bg-[#FAF7FE] px-4 py-3 text-[14px] outline-none focus:border-brand-700" 
              />
            </div>

            <div className="flex items-center justify-between py-2 border-y border-ink/5">
              <div>
                <p className="text-[14px] font-medium text-ink">Open for Bookings?</p>
              </div>
              <button 
                type="button"
                onClick={() => setIsOpen(!isOpen)} 
                className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors ${isOpen ? "bg-brand-700" : "bg-ink/20"}`}
              >
                <span className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${isOpen ? "translate-x-[22px]" : "translate-x-0.5"}`} />
              </button>
            </div>

            {isOpen && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-[0.15em] text-ink/60 mb-2">Start Time</label>
                  <input type="time" value={startTime} onChange={e => setStartTime(e.target.value)} className="w-full rounded-md border border-ink/20 bg-[#FAF7FE] px-4 py-3 text-[14px] outline-none focus:border-brand-700" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-[0.15em] text-ink/60 mb-2">End Time</label>
                  <input type="time" value={endTime} onChange={e => setEndTime(e.target.value)} className="w-full rounded-md border border-ink/20 bg-[#FAF7FE] px-4 py-3 text-[14px] outline-none focus:border-brand-700" />
                </div>
              </div>
            )}

            <button 
              type="submit" 
              disabled={saving}
              className="mt-2 w-full rounded-full bg-brand-700 py-3.5 text-[11px] font-bold uppercase tracking-[0.15em] text-white transition-all hover:bg-brand-900"
            >
              {saving ? "Saving..." : "Save Schedule"}
            </button>
          </form>
        </div>

        {/* LIST OF SET DAYS */}
        <div>
          <h2 className="text-[20px] text-ink mb-6" style={{ fontFamily: "var(--font-cormorant), serif" }}>Your Schedule</h2>
          
          {loading ? (
            <div className="flex justify-center py-10"><div className="h-6 w-6 animate-spin rounded-full border-2 border-brand-200 border-t-brand-700" /></div>
          ) : availability.length === 0 ? (
            <div className="text-[13px] text-muted italic bg-white p-6 rounded-2xl border border-brand-100">No custom schedule set. The system will use default 9AM - 6PM every day.</div>
          ) : (
            <ul className="flex flex-col gap-2">
              {availability.map((a) => (
                <li key={a.id} className="flex items-center justify-between bg-white p-4 rounded-xl border border-brand-100">
                  <div>
                    <p className="text-[14px] font-medium text-ink">{new Date(a.date).toLocaleDateString("en-GB", { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })}</p>
                    {a.isOpen ? (
                      <p className="text-[12px] text-green-600 mt-0.5">{a.startTime} - {a.endTime}</p>
                    ) : (
                      <p className="text-[12px] text-red-500 mt-0.5">Closed / Holiday</p>
                    )}
                  </div>
                  <button onClick={() => {
                    setDate(a.date);
                    setIsOpen(a.isOpen === 1);
                    setStartTime(a.startTime);
                    setEndTime(a.endTime);
                  }} className="text-[10px] font-bold uppercase text-brand-700 hover:underline">
                    Edit
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

      </div>
    </div>
  );
}
