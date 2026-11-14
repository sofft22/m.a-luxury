"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export function AdminDashboardClient() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  
  const [stats, setStats] = useState({
    totalProducts: 0,
  });

  useEffect(() => {
    // 1. CHECK NEW LOGIN KEY
    if (typeof window !== "undefined" && localStorage.getItem("ma_admin_logged_in") !== "true") {
      router.push("/admin/login");
      return;
    }

    const fetchData = async () => {
      try {
        // ONLY fetch products for now to prevent crashes
        const productsRes = await fetch("/api/products");
        const products = await productsRes.json();

        setStats({
          totalProducts: products.length || 0,
        });
      } catch (error) {
        console.error("Failed to load dashboard data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FAF7FE]">
        <div className="h-8 w-8 animate-spin rounded-full border-[3px] border-brand-200 border-t-brand-700" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-5 py-8 sm:px-8 sm:py-10 min-h-screen bg-[#FAF7FE]">
      
      {/* HEADER */}
      <div className="mb-8">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-700/50" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
          M.A Luxury Admin
        </p>
        <h1 className="mt-1 text-[32px] font-normal text-ink" style={{ fontFamily: "var(--font-cormorant), serif" }}>
          Dashboard
        </h1>
        <p className="mt-2 text-[13px] text-muted" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
          Welcome back. Here is your store overview.
        </p>
      </div>

      {/* TOTAL PRODUCTS CARD */}
      <div className="rounded-xl border border-brand-100 bg-white p-6 shadow-sm mb-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-ink/50" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>Total Products</span>
            <span className="text-[32px] text-brand-700" style={{ fontFamily: "var(--font-cormorant), serif" }}>{stats.totalProducts}</span>
          </div>
          <button onClick={() => router.push("/admin/products")} className="rounded-md bg-brand-700 px-5 py-3 text-[11px] font-bold uppercase tracking-[0.1em] text-white hover:bg-brand-900 transition-colors" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
            Manage Products →
          </button>
        </div>
      </div>

      {/* PLACEHOLDER FOR FUTURE STATS */}
      <div className="rounded-xl border border-brand-100 bg-white p-6 shadow-sm opacity-50">
        <div className="py-8 text-center text-[13px] text-muted" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
          Sales and Order tracking will be available once the store is fully live.
        </div>
      </div>

    </div>
  );
}
