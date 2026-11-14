"use client";

import { useState } from "react";

interface Props {
  service: any | null;
  onClose: () => void;
  onSave: () => void;
}

export function ServiceFormModal({ service, onClose, onSave }: Props) {
  const [title, setTitle] = useState(service?.title || "");
  const [category, setCategory] = useState(service?.category || "braids");
  const [description, setDescription] = useState(service?.description || "");
  const [inStock, setInStock] = useState(service ? service.inStock === 1 : true);
  
  const [options, setOptions] = useState<{ name: string; price: string }[]>(() => {
    if (!service || !service.options) return [{ name: "", price: "" }];
    try {
      const parsed = JSON.parse(service.options);
      if (Array.isArray(parsed)) return parsed.map((o: any) => ({ name: o.name || "", price: o.price?.toString() || "" }));
    } catch (e) {}
    return [{ name: "", price: "" }];
  });
  
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!title.trim()) return alert("Title is required.");
    setSaving(true);
    
    const cleanOptions = options
      .filter((o) => o.name.trim() !== "")
      .map((o) => ({ name: o.name.trim(), price: o.price ? Number(o.price) : 0 }));

    const payload = {
      id: service?.id,
      title: title.trim(),
      category,
      description: description.trim(),
      options: cleanOptions,
      inStock,
    };

    const method = service ? "PUT" : "POST";
    try {
      await fetch("/api/services", { method, body: JSON.stringify(payload) });
      onSave();
      onClose();
    } catch (error) {
      alert("Failed to save");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[120] flex bg-ink/60 backdrop-blur-sm sm:p-4 sm:items-center justify-center">
      <div className="absolute inset-0 hidden sm:block" onClick={onClose} />
      
      <div className="relative flex flex-col bg-[#FAF7FE] shadow-2xl w-full h-full sm:h-auto sm:max-h-[90vh] sm:max-w-[600px] sm:rounded-2xl overflow-y-auto">
        
        <div className="flex items-center justify-between border-b border-ink/10 px-6 py-5 bg-[#FAF7FE] sticky top-0 z-10">
          <h2 className="text-[24px] text-ink" style={{ fontFamily: "var(--font-cormorant), serif" }}>
            {service ? "Edit Service" : "New Service"}
          </h2>
          <button onClick={onClose} className="text-ink/50 hover:text-ink transition-colors">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-5 w-5"><path d="M6 6l12 12M18 6L6 18" /></svg>
          </button>
        </div>

        <div className="p-6 flex flex-col gap-6 pb-8">
          
          <div>
            <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.15em] text-ink/60" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>Service Title</label>
            <input value={title} onChange={e => setTitle(e.target.value)} type="text" placeholder="e.g. Knotless Braids" className="w-full rounded-md border border-ink/20 bg-white px-4 py-3 text-[14px] text-ink outline-none focus:border-brand-700" />
          </div>

          <div>
            <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.15em] text-ink/60" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>Category</label>
            <select value={category} onChange={e => setCategory(e.target.value)} className="w-full rounded-md border border-ink/20 bg-white px-4 py-3 text-[14px] text-ink outline-none focus:border-brand-700">
              <option value="braids">Braids & Twists</option>
              <option value="locs">Locs & Maintenance</option>
              <option value="installs">Installs & Styling</option>
              <option value="beauty">Beauty</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.15em] text-ink/60" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>Description</label>
            <textarea value={description} onChange={e => setDescription(e.target.value)} rows={3} placeholder="Describe the service..." className="w-full resize-none rounded-md border border-ink/20 bg-white px-4 py-3 text-[14px] text-ink outline-none focus:border-brand-700" />
          </div>

          <div>
            <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.15em] text-ink/60" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>Options & Prices</label>
            <div className="flex flex-col gap-3">
              {options.map((option, i) => (
                <div key={i} className="flex gap-2 items-center">
                  <input 
                    value={option.name} 
                    onChange={e => { const n = [...options]; n[i].name = e.target.value; setOptions(n); }} 
                    type="text" 
                    placeholder='e.g. Small Shoulder' 
                    className="flex-1 rounded-md border border-ink/20 bg-white px-4 py-2 text-[13px] outline-none focus:border-brand-700" 
                  />
                  <div className="relative w-[100px]">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[13px] text-ink/50">£</span>
                    <input 
                      value={option.price} 
                      onChange={e => { const n = [...options]; n[i].price = e.target.value; setOptions(n); }} 
                      type="number" 
                      placeholder="0" 
                      className="w-full rounded-md border border-ink/20 bg-white pl-7 pr-3 py-2 text-[13px] outline-none focus:border-brand-700" 
                    />
                  </div>
                  <button onClick={() => setOptions(options.filter((_, idx) => idx !== i))} className="text-ink/40 hover:text-red-500 px-2">✕</button>
                </div>
              ))}
              <button onClick={() => setOptions([...options, { name: "", price: "" }])} className="text-[11px] font-bold uppercase tracking-wider text-brand-700 text-left mt-2 hover:underline">+ Add Option</button>
            </div>
          </div>

          <div className="flex items-center justify-between border-y border-ink/10 py-4">
            <div>
              <p className="text-[14px] font-semibold text-ink">Available for Booking</p>
            </div>
            <button onClick={() => setInStock(!inStock)} className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors ${inStock ? "bg-brand-700" : "bg-ink/20"}`}>
              <span className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${inStock ? "translate-x-[22px]" : "translate-x-0.5"}`} />
            </button>
          </div>

        </div>

        <div className="p-6 pb-8 sm:pb-6 bg-white border-t border-ink/10 shrink-0">
          <button onClick={handleSave} disabled={saving} className="w-full rounded-full bg-brand-700 py-4 text-[11px] font-bold uppercase tracking-[0.15em] text-white transition-all hover:bg-brand-900 disabled:opacity-50">
            {saving ? "Saving..." : service ? "Save Changes" : "Create Service"}
          </button>
        </div>

      </div>
    </div>
  );
}
