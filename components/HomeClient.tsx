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
    fetch("/api/products").then(res => res.json()).then(data => {
      const found = data.find((p: any) => p.id === productId);
      if (found) onSelect(found);
    });
  }, [productId, onSelect]);

  return null;
}

export function HomeClient({ featuredProducts = [] }: { featuredProducts?: any[] }) {
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [allProducts, setAllProducts] = useState<any[]>([]);
  const [clientFeatured, setClientFeatured] = useState<any[]>(featuredProducts);
  const [boxConfig, setBoxConfig] = useState<any>(null);
  const [isBoxModalOpen, setIsBoxModalOpen] = useState(false);

  useEffect(() => {
    fetch("/api/products").then(res => res.json()).then(data => {
      setAllProducts(data);

      // IF SERVER PASSED 0 ITEMS, FETCH THEM HERE
      if (clientFeatured.length === 0 && Array.isArray(data)) {
        console.log("Client fetching featured products...");
        const featured = data
          .filter((p: any) => p.featured === 1 || p.featured === true || p.featured === "1")
          .slice(0, 4)
          .map((p: any) => ({
            ...p,
            sizes: typeof p.sizes === 'string' ? JSON.parse(p.sizes || "[]") : p.sizes
          }));
        setClientFeatured(featured);
      }
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
  }, [clientFeatured.length]);

  return (
    <>
      <Suspense fallback={null}>
        <ProductDeepLink onSelect={setSelectedProduct} />
      </Suspense>

      <FeaturedProducts 
        initialItems={clientFeatured}
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
