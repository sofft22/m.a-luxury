"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export default function AdminAvailabilityPage() {
  const router = useRouter();
  const [schedule, setSchedule] = useState<any[]>([]);
  const [exceptions, setExceptions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [exDate, setExDate] = useState("");
  const [exIsOpen, setExIsOpen] = useState(false);
  const [exStart, setExStart] = useState("09:00");
  const [exEnd, setExEnd] = useState("18:00");

  const loadData = async () => {
    if (localStorage.getItem("ma_admin_logged_in") !== "true") {
      router.push("/admin/login");
      return;
    }
    try {
      const res = await fetch("/api/availability");
      const data = await res.json();
      if (data.schedule) setSchedule(data.schedule);
      if (data.exceptions) setExceptions(data.exceptions);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleWeeklyChange = (id: number, field: string, value: any) => {
    setSchedule((prev) =>
      prev.map((day) => (day.id === id ? { ...day, [field]: value } : day))
    );
  };

  const saveWeekly = async () => {
    setSaving(true);
    await fetch("/api/availability", {
      method: "POST",
      body: JSON.stringify({ type: "weekly", schedule }),
    });
    setSaving(false);
    alert("Weekly schedule updated!");
  };

  const addException = async () => {
    if (!exDate) return alert("Please select a date");
    await fetch("/api/availability", {
      method: "POST",
      body: JSON.stringify({
        type: "exception",
        date: exDate,
        isOpen: exIsOpen ? 1 : 0,
        startTime: exStart,
        endTime: exEnd,
      }),
    });
    setExDate("");
    loadData();
  };

  const deleteException = async (id: string) => {
    if (!confirm("Remove this exception?")) return;
    await fetch(`/api/availability?id=${id}`, { method: "DELETE" });
    loadData();
  };

  if (loading) return <div className="flex justify-center py-24"><div className="h-6 w-6 animate-spin rounded-full border-2 border-brand-200 border-t-brand-700" /></div>;

  return (
    <div className="mx-auto max-w-4xl px-5 py-8 sm:px-8 sm:py-10 min-h-screen bg-[#FAF7FE]">
      
      <div className="mb-10 border-b border-ink/10 pb-6">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-700/60">Schedule</p>
        <h1 className="mt-1 text-[32px] font-normal text-ink" style={{ fontFamily: "var(--font-cormorant), serif" }}>
          My Availability
        </h1>
      </div>

      {/* WEEKLY SCHEDULE */}
      <div className="mb-12 bg-white rounded-2xl border border-brand-100 shadow-sm p-6 md:p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-[24px] text-ink" style={{ fontFamily: "var(--font-cormorant), serif" }}>My Standard Week</h2>
          <button onClick={saveWeekly} disabled={saving} className="rounded-full bg-brand-700 px-6 py-2.5 text-[10px] font-bold uppercase tracking-[0.15em] text-white hover:bg-brand-900 transition-colors">
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>

        <div className="flex flex-col divide-y divide-ink/5">
          {schedule.map((day) => (
            <div key={day.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4 w-40">
                <span className="text-[14px] font-medium text-ink">{DAYS[day.id]}</span>
                <button
                  onClick={() => handleWeeklyChange(day.id, "isOpen", day.isOpen ? 0 : 1)}
                  className={`relative inline-flex h-5 w-9 shrink-0 items-center rounded-full transition-colors ${day.isOpen ? "bg-brand-700" : "bg-ink/20"}`}
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${day.isOpen ? "translate-x-[18px]" : "translate-x-0.5"}`} />
                </button>
              </div>

              {day.isOpen ? (
                <div className="flex items-center gap-2">
                  <input type="time" value={day.startTime} onChange={(e) => handleWeeklyChange(day.id, "startTime", e.target.value)} className="rounded-md border border-ink/20 bg-[#FAF7FE] px-3 py-1.5 text-[13px] outline-none focus:border-brand-700" />
                  <span className="text-[13px] text-muted">to</span>
                  {/* ALLOW NEXT DAY END TIME */}
                  <input type="time" value={day.endTime} onChange={(e) => handleWeeklyChange(day.id, "endTime", e.target.value)} className="rounded-md border border-ink/20 bg-[#FAF7FE] px-3 py-1.5 text-[13px] outline-none focus:border-brand-700" />
                  <span className="text-[11px] text-muted ml-1">(Next day if past midnight)</span>
                </div>
              ) : (
                <span className="text-[13px] text-muted italic">Closed</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* EXCEPTIONS */}
      <div className="bg-white rounded-2xl border border-brand-100 shadow-sm p-6 md:p-8">
        <h2 className="text-[24px] text-ink mb-6" style={{ fontFamily: "var(--font-cormorant), serif" }}>Time Off & Exceptions</h2>
        
        {/* ADD EXCEPTION FORM */}
        <div className="bg-[#FAF7FE] p-4 rounded-xl border border-ink/5 mb-6 flex flex-col md:flex-row gap-4 items-end">
          <div className="flex-1">
            <label className="block text-[10px] font-bold uppercase tracking-[0.15em] text-ink/60 mb-1">Date</label>
            <input type="date" value={exDate} onChange={e => setExDate(e.target.value)} className="w-full rounded-md border border-ink/20 bg-white px-4 py-2.5 text-[13px] outline-none focus:border-brand-700" />
          </div>
          
          <div className="flex items-center gap-2 py-2">
            <button onClick={() => setExIsOpen(!exIsOpen)} className={`relative inline-flex h-5 w-9 shrink-0 items-center rounded-full transition-colors ${exIsOpen ? "bg-brand-700" : "bg-ink/20"}`}>
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${exIsOpen ? "translate-x-[18px]" : "translate-x-0.5"}`} />
            </button>
            <span className="text-[12px] text-ink font-medium">{exIsOpen ? "Custom Hours" : "Closed"}</span>
          </div>

          {exIsOpen && (
            <div className="flex items-center gap-2">
              <input type="time" value={exStart} onChange={e => setExStart(e.target.value)} className="rounded-md border border-ink/20 bg-white px-3 py-2 text-[13px] outline-none focus:border-brand-700" />
              <span className="text-[13px] text-muted">to</span>
              <input type="time" value={exEnd} onChange={e => setExEnd(e.target.value)} className="rounded-md border border-ink/20 bg-white px-3 py-2 text-[13px] outline-none focus:border-brand-700" />
            </div>
          )}

          <button onClick={addException} className="rounded-md bg-ink px-5 py-2.5 text-[10px] font-bold uppercase tracking-widest text-white hover:bg-brand-700 transition-colors">Add</button>
        </div>

        {/* LIST EXCEPTIONS */}
        {exceptions.length === 0 ? (
          <p className="text-[13px] text-muted text-center py-4">No exceptions set. You are following your standard weekly schedule.</p>
        ) : (
          <ul className="flex flex-col gap-2">
            {exceptions.map(ex => (
              <li key={ex.id} className="flex items-center justify-between bg-[#FAF7FE] p-3 rounded-lg border border-ink/5">
                <div>
                  <p className="text-[14px] font-medium text-ink">{new Date(ex.date).toLocaleDateString("en-GB", { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })}</p>
                  <p className="text-[12px] text-muted mt-0.5">
                    {ex.isOpen ? `${ex.startTime} - ${ex.endTime}` : "Closed all day"}
                  </p>
                </div>
                <button onClick={() => deleteException(ex.id)} className="text-[10px] font-bold uppercase tracking-wider text-red-500 hover:underline">Remove</button>
              </li>
            ))}
          </ul>
        )}
      </div>

    </div>
  );
}
