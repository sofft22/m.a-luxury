"use client";

import { useState } from "react";
import Image from "next/image";

interface Props {
  product: any | null;
  onClose: () => void;
  onSave: () => void;
}

export function ProductFormModal({ product, onClose, onSave }: Props) {
  const [title, setTitle] = useState(product?.title || "");
  const [price, setPrice] = useState(product?.price?.toString() || "");
  const [weight, setWeight] = useState(product?.weight?.toString() || "");
  const [description, setDescription] = useState(product?.description || "");
  
  // UPDATED CATEGORIES
  const [category, setCategory] = useState(product?.category || "bonestraight");
  
  const [inStock, setInStock] = useState(product ? product.inStock === 1 : true);
  const [featured, setFeatured] = useState(product ? product.featured === 1 : true);
  
  const [sizes, setSizes] = useState<{ size: string; price: string; weight: string }[]>(() => {
    if (!product || !product.sizes) return [{ size: "", price: "", weight: "" }];
    
    let parsedSizes: any[] = [];
    if (Array.isArray(product.sizes)) {
      parsedSizes = product.sizes;
    } else {
      try {
        const parsed = JSON.parse(product.sizes);
        if (Array.isArray(parsed)) parsedSizes = parsed;
      } catch (e) {}
    }

    if (parsedSizes.length === 0) return [{ size: "", price: "", weight: "" }];

    return parsedSizes.map((s: any) => {
      if (typeof s === "string") return { size: s, price: "", weight: "" };
      return { 
        size: s.size || "", 
        price: s.price?.toString() || "",
        weight: s.weight?.toString() || ""
      };
    });
  });
  
  const [images, setImages] = useState<string[]>(() => {
    if (!product) return [];
    if (product.images) {
      if (Array.isArray(product.images)) return product.images;
      try {
        const parsed = JSON.parse(product.images);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch (e) {}
    }
    return product.image ? [product.image] : [];
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
        const MAX_WIDTH = 800;
        const scale = MAX_WIDTH / img.width;
        canvas.width = MAX_WIDTH;
        canvas.height = img.height * scale;

        const ctx = canvas.getContext("2d");
        ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
        
        const dataUrl = canvas.toDataURL("image/jpeg", 0.7);
        
        setImages((prev) => {
          if (prev.length === 1 && prev[0] === "") return [dataUrl];
          return [...prev, dataUrl];
        });
        setUploading(false);
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const removeImage = (indexToRemove: number) => {
    setImages(images.filter((_, i) => i !== indexToRemove));
  };

  const setMainImage = (indexToMakeMain: number) => {
    if (indexToMakeMain === 0) return;
    const newImages = [...images];
    const [mainImage] = newImages.splice(indexToMakeMain, 1);
    newImages.unshift(mainImage);
    setImages(newImages);
  };

  const handleSave = async () => {
    if (!title.trim() || !price) return alert("Title and base price are required.");
    if (images.length === 0 || images[0] === "") return alert("At least one image is required.");

    setSaving(true);
    
    const cleanSizes = sizes
      .filter((s) => s.size.trim() !== "")
      .map((s) => ({
        size: s.size.trim(),
        price: s.price ? Number(s.price) : Number(price),
        weight: s.weight ? Number(s.weight) : Number(weight) || 0
      }));

    const payload = {
      id: product?.id,
      title: title.trim(),
      price: Number(price),
      weight: weight ? Number(weight) : 0,
      description: description.trim(),
      category,
      inStock,
      featured,
      image: images[0], 
      images: images,   
      sizes: cleanSizes,
    };

    const method = product ? "PUT" : "POST";
    await fetch("/api/products", { method, body: JSON.stringify(payload) });

    setSaving(false);
    onSave();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[120] flex bg-ink/60 backdrop-blur-sm sm:p-4 sm:items-center justify-center">
      <div className="absolute inset-0 hidden sm:block" onClick={onClose} />
      
      <div className="relative flex flex-col bg-[#FAF7FE] shadow-2xl w-full h-full sm:h-auto sm:max-h-[90vh] sm:max-w-[650px] sm:rounded-2xl overflow-y-auto">
        
        <div className="flex items-center justify-between border-b border-ink/10 px-6 py-5 bg-[#FAF7FE] sticky top-0 z-10">
          <h2 className="text-[24px] text-ink" style={{ fontFamily: "var(--font-cormorant), serif" }}>
            {product ? "Edit Product" : "New Product"}
          </h2>
          <button onClick={onClose} className="text-ink/50 hover:text-ink transition-colors">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-5 w-5"><path d="M6 6l12 12M18 6L6 18" /></svg>
          </button>
        </div>

        <div className="p-6 flex flex-col gap-6 pb-8">
          
          {/* IMAGES */}
          <div>
            <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.15em] text-ink/60">Product Images (First is Main)</label>
            <div className="flex flex-wrap gap-3">
              {images.map((img, i) => (
                <div key={i} className={`relative h-24 w-24 shrink-0 overflow-hidden rounded-md bg-brand-100 border-2 transition-all ${i === 0 ? "border-brand-700" : "border-transparent"}`}>
                  <Image src={img} alt={`Preview ${i}`} fill className="object-cover" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
                    <button onClick={() => removeImage(i)} className="bg-white rounded-full px-2 py-1 text-red-500 text-[10px] font-bold shadow-md">Remove</button>
                    {i !== 0 && <button onClick={() => setMainImage(i)} className="bg-white rounded-full px-2 py-1 text-ink text-[10px] font-bold shadow-md">Make Main</button>}
                  </div>
                  {i === 0 && <span className="absolute top-1 left-1 bg-brand-700 text-white text-[9px] font-bold px-1.5 py-0.5 rounded">MAIN</span>}
                </div>
              ))}
              <label className="flex h-24 w-24 shrink-0 cursor-pointer flex-col items-center justify-center gap-1 rounded-md border-2 border-dashed border-ink/20 bg-white text-ink/50 hover:border-brand-700 transition-colors">
                {uploading ? <div className="h-5 w-5 animate-spin rounded-full border-2 border-brand-200 border-t-brand-700" /> : <span className="text-2xl">+</span>}
                <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} disabled={uploading} />
              </label>
            </div>
          </div>

          <div>
            <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.15em] text-ink/60">Title</label>
            <input value={title} onChange={e => setTitle(e.target.value)} type="text" placeholder="e.g. Bonestraight" className="w-full rounded-md border border-ink/20 bg-white px-4 py-3 text-[14px] text-ink outline-none focus:border-brand-700" />
          </div>

          <div>
            <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.15em] text-ink/60">Category</label>
            {/* UPDATED CATEGORY DROPDOWN */}
            <select value={category} onChange={e => setCategory(e.target.value)} className="w-full rounded-md border border-ink/20 bg-white px-4 py-3 text-[14px] text-ink outline-none focus:border-brand-700">
              <option value="bonestraight">Bonestraight</option>
              <option value="french-curls">French Curls</option>
              <option value="italian-curls">Italian Curls</option>
              <option value="deep-wave">Deep Wave</option>
              <option value="remy-curls">Remy Curls</option>
              <option value="expression">Expression</option>
              <option value="locs">Locs Extensions</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.15em] text-ink/60">Base Price (£)</label>
              <input value={price} onChange={e => setPrice(e.target.value)} type="number" placeholder="45.00" className="w-full rounded-md border border-ink/20 bg-white px-4 py-3 text-[14px] text-ink outline-none focus:border-brand-700" />
            </div>
            <div>
              <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.15em] text-ink/60">Base Weight (kg)</label>
              <input value={weight} onChange={e => setWeight(e.target.value)} type="number" step="0.01" placeholder="0.2" className="w-full rounded-md border border-ink/20 bg-white px-4 py-3 text-[14px] text-ink outline-none focus:border-brand-700" />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.15em] text-ink/60">Description</label>
            <textarea value={description} onChange={e => setDescription(e.target.value)} rows={3} placeholder="100% Virgin hair..." className="w-full resize-none rounded-md border border-ink/20 bg-white px-4 py-3 text-[14px] text-ink outline-none focus:border-brand-700" />
          </div>

          {/* SIZES / LENGTHS */}
          <div>
            <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.15em] text-ink/60">Lengths, Prices & Weights</label>
            <div className="flex flex-col gap-3">
              {sizes.map((option, i) => (
                <div key={i} className="flex flex-col sm:flex-row gap-2 items-start sm:items-center bg-white p-3 sm:p-0 rounded-lg sm:bg-transparent border border-ink/10 sm:border-0">
                  
                  <input 
                    value={option.size} 
                    onChange={e => { const n = [...sizes]; n[i].size = e.target.value; setSizes(n); }} 
                    type="text" 
                    placeholder='Length (e.g. 16")' 
                    className="w-full sm:flex-1 rounded-md border border-ink/20 bg-white px-4 py-2 text-[13px] outline-none focus:border-brand-700" 
                  />
                  
                  <div className="flex gap-2 w-full sm:w-auto">
                    <div className="relative flex-1 sm:w-[90px]">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[13px] text-ink/50">£</span>
                      <input 
                        value={option.price} 
                        onChange={e => { const n = [...sizes]; n[i].price = e.target.value; setSizes(n); }} 
                        type="number" 
                        placeholder="Price" 
                        className="w-full rounded-md border border-ink/20 bg-white pl-7 pr-3 py-2 text-[13px] outline-none focus:border-brand-700" 
                      />
                    </div>
                    
                    <div className="relative flex-1 sm:w-[90px]">
                      <input 
                        value={option.weight} 
                        onChange={e => { const n = [...sizes]; n[i].weight = e.target.value; setSizes(n); }} 
                        type="number" 
                        step="0.01"
                        placeholder="Weight (kg)" 
                        className="w-full rounded-md border border-ink/20 bg-white px-3 py-2 text-[13px] outline-none focus:border-brand-700" 
                      />
                    </div>

                    <button onClick={() => setSizes(sizes.filter((_, idx) => idx !== i))} className="text-ink/40 hover:text-red-500 px-2 shrink-0">✕</button>
                  </div>
                </div>
              ))}
              <button onClick={() => setSizes([...sizes, { size: "", price: "", weight: "" }])} className="text-[11px] font-bold uppercase tracking-wider text-brand-700 text-left mt-2 hover:underline">+ Add Length</button>
            </div>
          </div>

          <div className="flex items-center justify-between border-y border-ink/10 py-4">
            <div>
              <p className="text-[14px] font-semibold text-ink">In Stock</p>
            </div>
            <button onClick={() => setInStock(!inStock)} className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors ${inStock ? "bg-brand-700" : "bg-ink/20"}`}>
              <span className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${inStock ? "translate-x-[22px]" : "translate-x-0.5"}`} />
            </button>
          </div>

          <div className="flex items-center justify-between pb-4">
            <div>
              <p className="text-[14px] font-semibold text-ink">Show on Homepage</p>
            </div>
            <button onClick={() => setFeatured(!featured)} className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors ${featured ? "bg-brand-700" : "bg-ink/20"}`}>
              <span className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${featured ? "translate-x-[22px]" : "translate-x-0.5"}`} />
            </button>
          </div>

        </div>

        <div className="p-6 pb-8 sm:pb-6 bg-white border-t border-ink/10 shrink-0">
          <button onClick={handleSave} disabled={saving || uploading} className="w-full rounded-full bg-brand-700 py-4 text-[11px] font-bold uppercase tracking-[0.15em] text-white transition-all hover:bg-brand-900 disabled:opacity-50">
            {saving ? "Saving..." : product ? "Save Changes" : "Create Product"}
          </button>
        </div>

      </div>
    </div>
  );
}
