"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function AdminDashboardClient() {
  const router = useRouter();

  useEffect(() => {
    // Check if logged in, then immediately redirect to the Products page
    if (typeof window !== "undefined" && localStorage.getItem("ma_admin_logged_in") !== "true") {
      router.push("/admin/login");
    } else {
      router.push("/admin/products");
    }
  }, [router]);

  // Show a quick loading spinner while it redirects
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#FAF7FE]">
      <div className="h-8 w-8 animate-spin rounded-full border-[3px] border-brand-200 border-t-brand-700" />
    </div>
  );
}
