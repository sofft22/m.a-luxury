"use client";

import { usePathname } from "next/navigation";
import { AdminNav } from "@/components/admin/AdminNav";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";

  // If it's the login page, render children naked (no sidebar or header)
  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen bg-[#FAF7FE]">
      
      {/* Desktop Sidebar */}
      <AdminNav />

      {/* Main Content Area */}
      <main className="flex-1 w-full lg:pb-0 pb-[80px]">
        
        {/* STATIC MINI HEADER (Mobile Only) */}
        <header className="lg:hidden fixed top-0 left-0 right-0 z-40 flex h-[60px] items-center justify-center border-b border-ink/10 bg-[#FAF7FE]">
          <span className="text-[20px] font-semibold uppercase tracking-[0.15em] text-brand-700" style={{ fontFamily: "var(--font-cormorant), serif" }}>
            M.A LUXURY
          </span>
        </header>

        {/* Spacer for the mobile mini header so content doesn't hide behind it initially */}
        <div className="lg:hidden h-[60px]" />

        {/* Page Content */}
        {children}
      </main>

    </div>
  );
}
