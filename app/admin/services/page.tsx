"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ServiceFormModal } from "@/components/admin/ServiceFormModal";

export default function AdminServicesPage() {
  const router = useRouter();
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<any | null>(null);

  const loadServices = async () => {
    if (localStorage.getItem("ma_admin_logged_in") !== "true") {
      router.push("/admin/login");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/services");
      const data = await res.json();
      setServices(data);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadServices();
  }, []);

  const handleDelete = async (e: React.MouseEvent, id: string, title: string) => {
    e.stopPropagation(); 
    if (confirm(`Delete "${title}"?`)) {
      setServices(services.filter(s => s.id !== id));
      await fetch(`/api/services?id=${id}`, { method: "DELETE" });
    }
  };

  return (
    <div className="mx-auto max-w-6xl px-5 py-8 sm:px-8 sm:py-10 min-h-screen bg-[#FAF7FE]">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-700/60">Menu</p>
          <h1 className="mt-1 text-[32px] font-normal text-ink" style={{ fontFamily: "var(--font-cormorant), serif" }}>Services</h1>
        </div>
        <button onClick={() => { setEditingService(null); setIsModalOpen(true); }} className="inline-flex items-center gap-2 rounded-md bg-brand-700 px-5 py-3 text-[11px] font-bold uppercase tracking-[0.1em] text-white transition-colors hover:bg-brand-900">
          + Add Service
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-24"><div className="h-6 w-6 animate-spin rounded-full border-2 border-brand-200 border-t-brand-700" /></div>
      ) : services.length === 0 ? (
        <div className="py-24 text-center text-[13.5px] text-muted">No services found. Add one above.</div>
      ) : (
        <ul className="flex flex-col border-t border-ink/10">
          {services.map((s) => (
            <li key={s.id} onClick={() => { setEditingService(s); setIsModalOpen(true); }} className="flex items-center justify-between border-b border-ink/10 py-4 hover:bg-white px-4 cursor-pointer transition-colors">
              <div>
                <p className="text-[18px] text-ink" style={{ fontFamily: "var(--font-cormorant), serif" }}>{s.title}</p>
                <p className="text-[11px] text-muted uppercase tracking-wider">{s.category}</p>
              </div>
              <button onClick={(e) => handleDelete(e, s.id, s.title)} className="text-ink/20 hover:text-red-600 transition-colors p-2">
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}

      {isModalOpen && (
        <ServiceFormModal service={editingService} onClose={() => setIsModalOpen(false)} onSave={loadServices} />
      )}
    </div>
  );
}
