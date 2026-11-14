"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
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
      setServices(Array.isArray(data) ? data : []);
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
    if (confirm(`Are you sure you want to delete "${title}"?`)) {
      setServices(services.filter(s => s.id !== id));
      await fetch(`/api/services?id=${id}`, { method: "DELETE" });
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-5 py-8 sm:px-8 sm:py-10 min-h-screen bg-[#FAF7FE]">
      
      {/* HEADER */}
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4 border-b border-ink/10 pb-6">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-700/60" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
            Service Menu
          </p>
          <h1 className="mt-1 text-[32px] font-normal text-ink" style={{ fontFamily: "var(--font-cormorant), serif" }}>
            Manage Services
          </h1>
          <p className="mt-2 text-[13px] text-muted" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
            {services.length} services available for booking
          </p>
        </div>
        
        <button 
          onClick={() => { setEditingService(null); setIsModalOpen(true); }} 
          className="inline-flex items-center gap-2 rounded-full bg-brand-700 px-6 py-3 text-[10px] font-bold uppercase tracking-[0.15em] text-white transition-colors hover:bg-brand-900"
          style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="h-4 w-4"><path d="M12 5v14M5 12h14" /></svg>
          Add Service
        </button>
      </div>

      {/* LIST */}
      {loading ? (
        <div className="flex justify-center py-24"><div className="h-6 w-6 animate-spin rounded-full border-2 border-brand-200 border-t-brand-700" /></div>
      ) : services.length === 0 ? (
        <div className="py-24 text-center text-[14px] text-muted" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
          No services found. Click "Add Service" to create your first one.
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-brand-100 overflow-hidden">
          <ul className="flex flex-col">
            {services.map((s) => {
              // Parse options to get price
              let minPrice = 0;
              try {
                const parsed = typeof s.options === 'string' ? JSON.parse(s.options) : s.options;
                if (Array.isArray(parsed) && parsed.length > 0) {
                  minPrice = Math.min(...parsed.map((o: any) => Number(o.price) || 0));
                }
              } catch (e) {}

              return (
                <li 
                  key={s.id} 
                  onClick={() => { setEditingService(s); setIsModalOpen(true); }} 
                  className="group flex items-center justify-between border-b border-ink/5 last:border-0 py-4 hover:bg-brand-50/30 px-6 cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-5">
                    {/* THUMBNAIL */}
                    <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-md bg-brand-100 border border-ink/5">
                      {s.image ? (
                        <Image src={s.image} alt={s.title} fill className="object-cover" />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-ink/20">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1} className="h-6 w-6"><path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                        </div>
                      )}
                    </div>

                    {/* DETAILS */}
                    <div>
                      <p className="text-[20px] text-ink font-medium" style={{ fontFamily: "var(--font-cormorant), serif" }}>
                        {s.title}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[9px] font-bold uppercase tracking-wider bg-brand-50 text-brand-700 px-2 py-0.5 rounded">
                          {s.category}
                        </span>
                        {!s.inStock && (
                          <span className="text-[9px] font-bold uppercase tracking-wider bg-red-50 text-red-600 px-2 py-0.5 rounded">
                            Hidden
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="text-right hidden sm:block">
                      <p className="text-[9px] font-bold uppercase tracking-widest text-muted" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>From</p>
                      <p className="text-[16px] text-ink" style={{ fontFamily: "var(--font-cormorant), serif" }}>£{minPrice}</p>
                    </div>

                    <button 
                      onClick={(e) => handleDelete(e, s.id, s.title)} 
                      className="opacity-0 group-hover:opacity-100 text-ink/30 hover:text-red-600 transition-all p-2"
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4"><path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" /></svg>
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {isModalOpen && (
        <ServiceFormModal service={editingService} onClose={() => setIsModalOpen(false)} onSave={loadServices} />
      )}
    </div>
  );
}
