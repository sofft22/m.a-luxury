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
    
    // Safely try to read from cache
    try {
      const cached = localStorage.getItem("mocktopia_products_cache");
      if (cached) {
        const parsed = JSON.parse(cached);
        const found = parsed.find((p: any) => p.id === productId);
        if (found) {
          onSelect(found);
          return;
        }
      }
    } catch (e) {
      console.warn("Local storage read failed", e);
    }

    // Fetch if not in cache
    fetch("/api/products").then(res => res.json()).then(data => {
      try {
        localStorage.setItem("mocktopia_products_cache", JSON.stringify(data));
      } catch (e) {
        console.warn("Local storage write failed, quota exceeded likely", e);
      }
      const found = data.find((p: any) => p.id === productId);
      if (found) onSelect(found);
    });
  }, [productId, onSelect]);

  return null;
}

export function HomeClient({ featuredProducts = [] }: { featuredProducts?: any[] }) {
  console.log("[HomeClient] received featuredProducts:", featuredProducts.length);

  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [allProducts, setAllProducts] = useState<any[]>([]);
  const [boxConfig, setBoxConfig] = useState<any>(null);
  const [isBoxModalOpen, setIsBoxModalOpen] = useState(false);

  useEffect(() => {
    // Safely try to read from cache
    try {
      const cached = localStorage.getItem("mocktopia_products_cache");
      if (cached) {
        setAllProducts(JSON.parse(cached)); 
      }
    } catch (e) {
      console.warn("Local storage read failed", e);
    }

    // Fetch fresh products
    fetch("/api/products").then(res => res.json()).then(data => {
      setAllProducts(data);
      try {
        localStorage.setItem("mocktopia_products_cache", JSON.stringify(data));
      } catch (e) {
        console.warn("Local storage write failed, quota exceeded likely", e);
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
  }, []);

  return (
    <>
      <Suspense fallback={null}>
        <ProductDeepLink onSelect={setSelectedProduct} />
      </Suspense>

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
