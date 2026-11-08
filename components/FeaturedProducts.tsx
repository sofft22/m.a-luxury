"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ProductCard } from "./ProductCard";

interface Props {
  onProductClick: (product: any) => void;
}

const FALLBACK_PRODUCTS = [
  {
    id: "p-1",
    title: "Bonestraight",
    price: 45,
    image: "/hero-1.jpg",
    featured: 1,
    inStock: 1,
    sizes: JSON.stringify([{ size: '16"', price: 45 }]),
  },
  {
    id: "p-2",
    title: "French Curls",
    price: 50,
    image: "/hero-2.jpg",
    featured: 1,
    inStock: 1,
    sizes: JSON.stringify([{ size: '18"', price: 50 }]),
  },
  {
    id: "p-3",
    title: "Passion Twist",
    price: 40,
    image: "/hero-3.jpg",
    featured: 1,
    inStock: 1,
    sizes: JSON.stringify([{ size: '24"', price: 40 }]),
  },
  {
    id: "p-4",
    title: "Kinky",
    price: 45,
    image: "/hero-4.jpg",
    featured: 1,
    inStock: 1,
    sizes: JSON.stringify([{ size: '18"', price: 45 }]),
  }
];

export function FeaturedProducts({ onProductClick }: Props) {
  const [featuredItems, setFeaturedItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Try cache first
    const cached = localStorage.getItem("ma_products_cache");
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        const featured = parsed.filter((p: any) => p.featured === 1);
        if (featured.length > 0) {
          setFeaturedItems(featured.slice(0, 4)); 
          setLoading(false);
        }
      } catch (e) {}
    }

    // 2. Fetch fresh from API
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.length > 0) {
          const featured = data.filter((p: any) => p.featured === 1);
          setFeaturedItems(featured.slice(0, 4));
          localStorage.setItem("ma_products_cache", JSON.stringify(data));
        } else {
          setFeaturedItems(FALLBACK_PRODUCTS);
        }
        setLoading(false);
      })
      .catch(() => {
        setFeaturedItems(FALLBACK_PRODUCTS);
        setLoading(false);
      });
  }, []);

  if (loading) return null; 
  
  const displayItems = featuredItems.length > 0 ? featuredItems : FALLBACK_PRODUCTS;

  return (
    <section className="w-full bg-[#FAF7FE] py-20 px-4 md:py-28 md:px-6">
      <div className="mx-auto max-w-[1400px]">
        
        {/* HEADER - Normal font, no uppercase, no bold */}
        <div className="mb-12 flex flex-col md:flex-row items-end justify-between gap-6 border-b border-brand-100 pb-6">
          <div className="text-center md:text-left">
            <h2 
              className="text-[28px] md:text-[36px] text-ink leading-tight" 
              style={{ fontFamily: 'var(--font-cormorant), serif' }}
            >
              The Hair Edit
            </h2>
          </div>
          
          <Link 
            href="/shop" 
            className="group flex shrink-0 items-center gap-2 pb-1 text-[11px] font-bold uppercase tracking-[0.15em] text-brand-700 transition-colors hover:text-brand-900" 
            style={{ fontFamily: 'var(--font-inter), sans-serif' }}
          >
            <span className="border-b border-brand-700 pb-0.5 whitespace-nowrap">Shop All</span>
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-6 lg:gap-y-14">
          {displayItems.map((item, idx) => (
            <div 
              key={item.id} 
              className="rounded-xl overflow-hidden group cursor-pointer" 
              onClick={() => onProductClick(item)} 
            >
              <ProductCard 
                product={{
                  ...item,
                  price: `£${item.price.toLocaleString()}`, 
                  sizes: typeof item.sizes === 'string' ? JSON.parse(item.sizes || "[]") : item.sizes
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
