"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { FeaturedProducts } from "./FeaturedProducts";
import { ProductModal } from "./ProductModal";
import { BoxBuilderModal } from "./BoxBuilderModal"; 

function ProductDeepLink({ onSelect }: { onSelect: (p: any) => void }) {
  const searchParams = useSearchParams();
  const productId = searchParams.get("product");

  useEffect(() => {
    if (!productId) return;
    const cached = localStorage.getItem("mocktopia_products_cache");
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        const found = parsed.find((p: any) => p.id === productId);
        if (found) onSelect(found);
        return;
      } catch (e) {}
    }
    fetch("/api/products").then(res => res.json()).then(data => {
      localStorage.setItem("mocktopia_products_cache", JSON.stringify(data));
      const found = data.find((p: any) => p.id === productId);
      if (found) onSelect(found);
    });
  }, [productId, onSelect]);

  return null;
}

// NEW: Accept featuredProducts as a prop from the server page
export function HomeClient({ featuredProducts = [] }: { featuredProducts?: any[] }) {
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [allProducts, setAllProducts] = useState<any[]>([]);
  
  const [boxConfig, setBoxConfig] = useState<any>(null);
  const [isBoxModalOpen, setIsBoxModalOpen] = useState(false);

  useEffect(() => {
    const cached = localStorage.getItem("mocktopia_products_cache");
    if (cached) {
      try { setAllProducts(JSON.parse(cached)); } catch (e) {}
    }
    fetch("/api/products").then(res => res.json()).then(data => {
      setAllProducts(data);
      localStorage.setItem("mocktopia_products_cache", JSON.stringify(data));
    });

    fetch("/api/settings").then(res => res.json()).then(data => {
      if (data && data.boxBuilderConfig) {
        try {
          const parsed = JSON.parse(data.boxBuilderConfig);
          if (parsed.isActive && parsed.toppings.length > 0) {
            setBoxConfig(parsed);
          }
        } catch (e) {}
      }
    });
  }, []);

  return (
    <>
      <Suspense fallback={null}>
        <ProductDeepLink onSelect={setSelectedProduct} />
      </Suspense>

      {/* NEW: Pass the pre-fetched items to the component */}
      <FeaturedProducts 
        initialItems={featuredProducts}
        onProductClick={(product) => setSelectedProduct(product)} 
      />
      
      {selectedProduct && (
        <ProductModal 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
          allProducts={allProducts} 
        />
      )}

      {isBoxModalOpen && boxConfig && (
        <BoxBuilderModal 
          config={boxConfig} 
          onClose={() => setIsBoxModalOpen(false)} 
        />
      )}
    </>
  );
}
