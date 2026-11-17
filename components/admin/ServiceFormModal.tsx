"use client";

import { useState } from "react";
import Image from "next/image";

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
  const [image, setImage] = useState(service?.image || "");

  // OPTIONS STATE
  const [options, setOptions] = useState<{ name: string; price: string; duration: string }[]>(() => {
    if (!service || !service.options) return [{ name: "", price: "", duration: "60" }];
    try {
      const parsed = JSON.parse(service.options);
      if (Array.isArray(parsed)) return parsed.map((o: any) => ({ 
        name: o.name || "", 
        price: o.price?.toString() || "",
        duration: o.duration?.toString() || "60"
      }));
    } catch (e) {}
    return [{ name: "", price: "", duration: "60" }];
  });

  // EXTRAS STATE
  const [extras, setExtras] = useState<{ name: string; minPrice: string; maxPrice: string }[]>(() => {
    if (!service || !service.extras) return [];
    try {
      const parsed = JSON.parse(service.extras);
      if (Array.isArray(parsed)) return parsed.map((e: any) => ({ 
        name: e.name || "", 
        minPrice: e.minPrice?.toString() || "", 
        maxPrice: e.maxPrice?.toString() || "" 
      }));
    } catch (e) {}
    return [];
  });
  
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new window.Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const MAX_WIDTH = 600;
        const scale = MAX_WIDTH / img.width;
        canvas.width = MAX_WIDTH;
        canvas.height = img.height * scale;
        const ctx = canvas.getContext("2d");
        ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL("image/jpeg", 0.7);
        setImage(dataUrl);
        setUploading(false);
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const handleSave = async () => {
    if (!title.trim()) return alert("Title is required.");
    setSaving(true);
    
    const cleanOptions = options
      .filter((o) => o.name.trim() !== "")
      .map((o) => ({ 
        name: o.name.trim(), 
        price: o.price ? Number(o.price) : 0,
        duration: o.duration ? Number(o.duration) : 60
      }));

    const cleanExtras = extras
      .filter((e) => e.name.trim() !== "")
      .map((e) => ({ 
        name: e.name.trim(), 
        minPrice: e.minPrice ? Number(e.minPrice) : 0, 
        maxPrice: e.maxPrice ? Number(e.maxPrice) : 0 
      }));

    const payload = {
      id: service?.id,
      title: title.trim(),
      category,
      description: description.trim(),
      options: cleanOptions,
      extras: cleanExtras,
      image,
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
      
      <div className="relative flex flex-col bg-[#FAF7FE] shadow-2xl w-full h-full sm:h-auto sm:max-h-[90vh] sm:max-w-[700px] sm:rounded-2xl overflow-y-auto">
        
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
            <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.15em] text-ink/60">Service Image</label>
            <div className="flex items-center gap-4">
              {image && (
                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-md bg-brand-100 border border-ink/10">
                  <Image src={image} alt="Service" fill className="object-cover" />
                  <button onClick={() => setImage("")} className="absolute top-1 right-1 bg-white/90 rounded-full p-1 text-red-500 shadow-sm">
                     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-3 w-3"><path d="M6 6l12 12M18 6L6 18" /></svg>
                  </button>
                </div>
              )}
              <label className="flex flex-1 cursor-pointer items-center justify-center rounded-md border-2 border-dashed border-ink/20 bg-white py-4 text-[11px] font-bold uppercase tracking-wider text-ink/50 hover:border-brand-700 transition-colors">
                {uploading ? "Compressing..." : image ? "Change Image" : "Upload Image"}
                <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} disabled={uploading} />
              </label>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.15em] text-ink/60">Service Title</label>
              <input value={title} onChange={e => setTitle(e.target.value)} type="text" placeholder="e.g. Knotless Braids" className="w-full rounded-md border border-ink/20 bg-white px-4 py-3 text-[14px] text-ink outline-none focus:border-brand-700" />
            </div>
            <div>
              <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.15em] text-ink/60">Category</label>
              <select value={category} onChange={e => setCategory(e.target.value)} className="w-full rounded-md border border-ink/20 bg-white px-4 py-3 text-[14px] text-ink outline-none focus:border-brand-700">
                <option value="braids">Braids & Twists</option>
                <option value="locs">Locs & Maintenance</option>
                <option value="installs">Installs & Styling</option>
                <option value="beauty">Beauty</option>
              </select>
            </div>
          </div>

          <div>
            <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.15em] text-ink/60">Description</label>
            <input value={description} onChange={e => setDescription(e.target.value)} type="text" placeholder="Brief detail" className="w-full rounded-md border border-ink/20 bg-white px-4 py-3 text-[14px] text-ink outline-none focus:border-brand-700" />
          </div>

          {/* OPTIONS */}
          <div>
            <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.15em] text-ink/60">Options, Prices & Durations</label>
            <div className="flex flex-col gap-3">
              {options.map((option, i) => (
                <div key={i} className="flex flex-col sm:flex-row gap-2 items-start sm:items-center bg-white p-3 sm:p-0 rounded-lg sm:bg-transparent border border-ink/10 sm:border-0">
                  
                  <input 
                    value={option.name} 
                    onChange={e => { const n = [...options]; n[i].name = e.target.value; setOptions(n); }} 
                    type="text" 
                    placeholder='Option (e.g. Small Waist)' 
                    className="w-full sm:flex-1 rounded-md border border-ink/20 bg-white px-4 py-2 text-[13px] outline-none focus:border-brand-700" 
                  />
                  
                  <div className="flex gap-2 w-full sm:w-auto">
                    <div className="relative flex-1 sm:w-[90px]">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[13px] text-ink/50">£</span>
                      <input 
                        value={option.price} 
                        onChange={e => { const n = [...options]; n[i].price = e.target.value; setOptions(n); }} 
                        type="number" 
                        placeholder="Price" 
                        className="w-full rounded-md border border-ink/20 bg-white pl-7 pr-3 py-2 text-[13px] outline-none focus:border-brand-700" 
                      />
                    </div>
                    
                    <select 
                      value={option.duration} 
                      onChange={e => { const n = [...options]; n[i].duration = e.target.value; setOptions(n); }} 
                      className="flex-1 sm:w-[140px] rounded-md border border-ink/20 bg-white px-2 py-2 text-[12px] outline-none focus:border-brand-700"
                    >
                      <option value="30">30 Mins</option>
                      <option value="60">1 Hour</option>
                      <option value="90">1.5 Hours</option>
                      <option value="120">2 Hours</option>
                      <option value="150">2.5 Hours</option>
                      <option value="180">3 Hours</option>
                      <option value="210">3.5 Hours</option>
                      <option value="240">4 Hours</option>
                      <option value="270">4.5 Hours</option>
                      <option value="300">5 Hours</option>
                      <option value="330">5.5 Hours</option>
                      <option value="360">6 Hours</option>
                      <option value="420">7 Hours</option>
                      <option value="480">8 Hours</option>
                      <option value="540">9 Hours</option>
                      <option value="600">10 Hours</option>
                      <option value="660">11 Hours</option>
                      <option value="720">12 Hours</option>
                      <option value="780">13 Hours</option>
                      <option value="840">14 Hours</option>
                      <option value="900">15 Hours</option>
                      <option value="960">16 Hours</option>
                      <option value="1020">17 Hours</option>
                      <option value="1080">18 Hours</option>
                      <option value="1140">19 Hours</option>
                      <option value="1200">20 Hours</option>
                      <option value="1260">21 Hours</option>
                      <option value="1320">22 Hours</option>
                      <option value="1380">23 Hours</option>
                      <option value="1440">24 Hours</option>
                    </select>

                    <button onClick={() => setOptions(options.filter((_, idx) => idx !== i))} className="text-ink/40 hover:text-red-500 px-2 shrink-0">✕</button>
                  </div>
                </div>
              ))}
              <button onClick={() => setOptions([...options, { name: "", price: "", duration: "60" }])} className="text-[11px] font-bold uppercase tracking-wider text-brand-700 text-left mt-2 hover:underline">+ Add Option</button>
            </div>
          </div>

          {/* EXTRAS */}
          <div className="bg-white p-4 rounded-xl border border-brand-100">
            <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.15em] text-brand-700">Add-ons / Extras</label>
            <p className="text-[11px] text-muted mb-4">These apply to all options above.</p>
            
            <div className="flex flex-col gap-3">
              {extras.map((extra, i) => (
                <div key={i} className="flex flex-col sm:flex-row gap-2 items-start sm:items-center">
                  <input value={extra.name} onChange={e => { const n = [...extras]; n[i].name = e.target.value; setExtras(n); }} type="text" placeholder='e.g. Boho Curls' className="flex-1 w-full rounded-md border border-ink/20 bg-[#FAF7FE] px-4 py-2 text-[13px] outline-none focus:border-brand-700" />
                  
                  <div className="flex gap-2 w-full sm:w-auto">
                    <div className="relative flex-1 sm:w-[90px]">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[11px] text-ink/50">£ Min</span>
                      <input value={extra.minPrice} onChange={e => { const n = [...extras]; n[i].minPrice = e.target.value; setExtras(n); }} type="number" placeholder="30" className="w-full rounded-md border border-ink/20 bg-[#FAF7FE] pl-12 pr-2 py-2 text-[13px] outline-none focus:border-brand-700" />
                    </div>
                    <div className="relative flex-1 sm:w-[90px]">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[11px] text-ink/50">£ Max</span>
                      <input value={extra.maxPrice} onChange={e => { const n = [...extras]; n[i].maxPrice = e.target.value; setExtras(n); }} type="number" placeholder="40" className="w-full rounded-md border border-ink/20 bg-[#FAF7FE] pl-12 pr-2 py-2 text-[13px] outline-none focus:border-brand-700" />
                    </div>
                    <button onClick={() => setExtras(extras.filter((_, idx) => idx !== i))} className="text-ink/40 hover:text-red-500 px-2 shrink-0">✕</button>
                  </div>
                </div>
              ))}
              <button onClick={() => setExtras([...extras, { name: "", minPrice: "", maxPrice: "" }])} className="text-[11px] font-bold uppercase tracking-wider text-brand-700 text-left mt-2 hover:underline">+ Add Extra</button>
            </div>
          </div>

          <div className="flex items-center justify-between border-y border-ink/10 py-4">
            <div>
              <p className="text-[14px] font-semibold text-ink">Visible on Website</p>
            </div>
            <button onClick={() => setInStock(!inStock)} className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors ${inStock ? "bg-brand-700" : "bg-ink/20"}`}>
              <span className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${inStock ? "translate-x-[22px]" : "translate-x-0.5"}`} />
            </button>
          </div>

        </div>

        <div className="p-6 pb-8 sm:pb-6 bg-white border-t border-ink/10 shrink-0">
          <button onClick={handleSave} disabled={saving || uploading} className="w-full rounded-full bg-brand-700 py-4 text-[11px] font-bold uppercase tracking-[0.15em] text-white transition-all hover:bg-brand-900 disabled:opacity-50">
            {saving ? "Saving..." : service ? "Save Changes" : "Create Service"}
          </button>
        </div>

      </div>
    </div>
  );
}
