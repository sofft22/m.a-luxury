"use client";

import { useEffect, useMemo, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { ProductModal } from "@/components/ProductModal";
import { ProductCard } from "@/components/ProductCard";

const CATEGORIES = [
  { id: "all", label: "All Extensions" },
  { id: "bonestraight", label: "Bonestraight" },
  { id: "french-curls", label: "French Curls" },
  { id: "kinky", label: "Kinky" },
  { id: "passion-twist", label: "Passion Twist" },
  { id: "expression", label: "Expression" },
];

// FALLBACK FAKE DATA (Using your hero images)
const FALLBACK_PRODUCTS = [
  {
    id: "p-1",
    title: "Bonestraight",
    price: 45,
    image: "/hero-1.jpg", 
    category: "bonestraight",
    inStock: 1,
    sizes: JSON.stringify([{ size: '16"', price: 45 }, { size: '20"', price: 55 }]),
  },
  {
    id: "p-2",
    title: "French Curls",
    price: 50,
    image: "/hero-2.jpg",
    category: "french-curls",
    inStock: 1,
    sizes: JSON.stringify([{ size: '18"', price: 50 }, { size: '22"', price: 60 }]),
  },
  {
    id: "p-3",
    title: "Passion Twist",
    price: 40,
    image: "/hero-3.jpg",
    category: "passion-twist",
    inStock: 1,
    sizes: JSON.stringify([{ size: '24"', price: 40 }]),
  },
  {
    id: "p-4",
    title: "Kinky",
    price: 45,
    image: "/hero-4.jpg",
    category: "kinky",
    inStock: 1,
    sizes: JSON.stringify([{ size: '18"', price: 45 }]),
  },
  {
    id: "p-5",
    title: "Expression",
    price: 40,
    image: "/hero-1.jpg",
    category: "expression",
    inStock: 1,
    sizes: JSON.stringify([{ size: '20"', price: 40 }]),
  },
  {
    id: "p-6",
    title: "Crochet Braids",
    price: 35,
    image: "/hero-2.jpg",
    category: "all",
    inStock: 1,
    sizes: JSON.stringify([{ size: 'Standard', price: 35 }]),
  }
];

function ShopContent() {
  // INSTANT CACHE INITIALIZATION
  const [products, setProducts] = useState<any[]>(() => {
    if (typeof window !== "undefined") {
      const cached = localStorage.getItem("ma_products_cache");
      if (cached) {
        try { return JSON.parse(cached); } catch (e) {}
      }
    }
    return FALLBACK_PRODUCTS; // Use fallback immediately if no cache
  });

  const [loading, setLoading] = useState(products.length === 0);
  
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");

  const [activeCategory, setActiveCategory] = useState("all");
  const [isCatOpen, setIsCatOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  useEffect(() => {
    if (categoryParam) setActiveCategory(categoryParam);
  }, [categoryParam]);

  useEffect(() => {
    fetch("/api/products")
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) {
          setProducts(data);
          localStorage.setItem("ma_products_cache", JSON.stringify(data));
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    if (activeCategory === "all") return products;
    return products.filter((p) => p.category === activeCategory);
  }, [products, activeCategory]);

  const currentCategoryLabel = CATEGORIES.find((c) => c.id === activeCategory)?.label || "All Extensions";

  return (
    <div className="min-h-screen bg-[#FAF7FE] text-ink flex flex-col">
      
      {/* HEADER SECTION */}
      <section className="bg-ink pt-[120px] pb-10 px-6 md:pt-[160px] md:pb-16 md:px-12 border-b border-brand-100 relative z-20">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="relative">
              <button onClick={() => setIsCatOpen(!isCatOpen)} className="flex items-center gap-4 group">
                <h1 className="text-[36px] md:text-[56px] leading-none text-white" style={{ fontFamily: 'var(--font-cormorant), serif' }}>
                  {currentCategoryLabel}
                </h1>
                <svg className={`w-5 h-5 md:w-6 md:h-6 text-white/50 transition-transform ${isCatOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
              </button>
              
              {isCatOpen && (
                <div className="absolute left-0 top-full mt-4 w-56 bg-white text-ink shadow-xl z-50 border border-brand-100 rounded-xl overflow-hidden py-2">
                  {CATEGORIES.map((c) => (
                    <button key={c.id} onClick={() => { setActiveCategory(c.id); setIsCatOpen(false); }} className={`block w-full text-left px-5 py-3 text-[12px] uppercase tracking-wider hover:bg-brand-50 transition-colors ${activeCategory === c.id ? 'font-bold text-brand-700 bg-brand-50/50' : ''}`} style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>
                      {c.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <p className="text-[10px] font-bold text-white/50 uppercase tracking-[0.2em] pb-1">
              {filtered.length} Items
            </p>
          </div>
        </div>
      </section>

      {/* PRODUCT GRID */}
      <section className="mx-auto w-full max-w-7xl flex-1 px-4 py-12 md:px-8 md:py-20">
        {loading && products.length === 0 ? (
          <div className="flex justify-center py-20"><div className="h-6 w-6 animate-spin rounded-full border-2 border-brand-200 border-t-brand-700" /></div>
        ) : filtered.length === 0 ? (
          <div className="py-20 text-center text-[14px] text-muted" style={{ fontFamily: "var(--font-inter), sans-serif" }}>No products available right now.</div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-6 lg:gap-y-16">
            {filtered.map((product, idx) => (
              <div key={product.id} className="rounded-xl overflow-hidden group" onClick={() => setSelectedProduct(product)}>
                <ProductCard 
                  product={{
                    ...product,
                    sizes: typeof product.sizes === 'string' ? JSON.parse(product.sizes || "[]") : product.sizes
                  }} 
                  priority={idx < 4}
                />
              </div>
            ))}
          </div>
        )}
      </section>

      <div className="w-full border-t border-brand-100 py-8 mt-auto">
        <p className="text-center text-[9px] md:text-[10px] uppercase tracking-[0.15em] text-muted" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>
          © {new Date().getFullYear()} M.a Luxury. All rights reserved.
        </p>
      </div>

      {selectedProduct && (
        <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} allProducts={products} />
      )}
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FAF7FE] flex items-center justify-center"><div className="h-6 w-6 animate-spin rounded-full border-2 border-brand-200 border-t-brand-700" /></div>}>
      <ShopContent />
    </Suspense>
  );
}
