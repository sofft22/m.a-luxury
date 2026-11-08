"use client";

import { useState } from "react";
import Image from "next/image";

interface Product {
  id: string;
  title: string;
  price: string | number;
  image: string;
  inStock?: number;
}

interface Props {
  product: Product;
  priority?: boolean;
}

export function ProductCard({ product, priority }: Props) {
  const [imgLoaded, setImgLoaded] = useState(false);

  const numericPrice = typeof product.price === "number" 
    ? product.price 
    : parseFloat(String(product.price).replace(/[^0-9.]/g, ""));

  const formattedTitle = product.title.replace(/\b\w/g, (char) => char.toUpperCase());
  const isSoldOut = product.inStock === 0;

  return (
    <div className="group flex flex-col cursor-pointer w-full">
      
      {/* IMAGE CONTAINER */}
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-lg bg-brand-100">
        {!imgLoaded && (
          <div className="absolute inset-0 animate-pulse bg-brand-100" />
        )}

        <Image
          src={product.image || "/placeholder.png"}
          alt={formattedTitle}
          fill
          priority={priority}
          onLoad={() => setImgLoaded(true)}
          className={`object-cover transition-transform duration-700 ease-out group-hover:scale-105 ${
            imgLoaded ? "opacity-100" : "opacity-0"
          } ${isSoldOut ? "opacity-60 grayscale" : ""}`}
        />

        {isSoldOut && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/10">
            <span className="bg-white/90 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-ink">
              Sold Out
            </span>
          </div>
        )}
      </div>

      {/* TEXT CONTAINER */}
      <div className="mt-3 flex flex-col">
        
        {/* Product Title */}
        <h3 
          className="text-[18px] md:text-[20px] font-medium truncate leading-tight tracking-wide text-ink"
          style={{ fontFamily: 'var(--font-cormorant), serif' }}
        >
          {formattedTitle}
        </h3>
        
        {/* Price Row - Clean and aligned */}
        <div className="flex items-baseline gap-1.5 mt-0.5">
          <span 
            className="text-[9px] font-bold uppercase tracking-[0.15em] text-brand-700/60"
            style={{ fontFamily: 'var(--font-inter), sans-serif' }}
          >
            From
          </span>
          <p 
            className="text-[15px] md:text-[16px] font-medium text-ink"
            style={{ fontFamily: 'var(--font-cormorant), serif' }}
          >
            £{numericPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
        </div>
        
      </div>

    </div>
  );
}
