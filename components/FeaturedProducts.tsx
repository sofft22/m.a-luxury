"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ProductCard } from "./ProductCard";

interface Props {
  onProductClick: (product: any) => void;
}

export function FeaturedProducts({ onProductClick }: Props) {
  const [featuredItems, setFeaturedItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        
        // Filter only items marked as "featured" and format them
        const featured = data
          .filter((p: any) => p.featured === 1)
          .slice(0, 4)
          .map((p: any) => ({
            ...p,
            sizes: typeof p.sizes === 'string' ? JSON.parse(p.sizes || "[]") : p.sizes
          }));

        setFeaturedItems(featured);
      } catch (error) {
        console.error("Failed to load featured products", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeatured();
  }, []);

  if (loading) return null; 
  if (featuredItems.length === 0) return null; // Don't show section if no featured products

  return (
    <section className="w-full bg-[#FAF7FE] py-20 px-4 md:py-28 md:px-6">
      <div className="mx-auto max-w-[1400px]">
        
        {/* HEADER */}
        <div className="mb-12 flex flex-row items-end justify-between gap-2 sm:gap-6 border-b border-brand-100 pb-6">
          <div>
            <h2 
              className="text-[26px] sm:text-[36px] text-ink leading-tight whitespace-nowrap" 
              style={{ fontFamily: 'var(--font-cormorant), serif' }}
            >
              The Hair Edit
            </h2>
          </div>
          
          <Link 
            href="/shop" 
            className="group flex shrink-0 items-center gap-1 sm:gap-2 pb-1 text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.15em] text-brand-700 transition-colors hover:text-brand-900" 
            style={{ fontFamily: 'var(--font-inter), sans-serif' }}
          >
            <span className="border-b border-brand-700 pb-0.5 whitespace-nowrap">Shop All</span>
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-6 lg:gap-y-14">
          {featuredItems.map((item, idx) => (
            <div 
              key={item.id} 
              className="rounded-xl overflow-hidden group cursor-pointer" 
              onClick={() => onProductClick(item)} 
            >
              <ProductCard 
                product={{
                  ...item,
                  price: `£${item.price.toLocaleString()}`, 
                  sizes: item.sizes
                }} 
                priority={idx < 2}
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
