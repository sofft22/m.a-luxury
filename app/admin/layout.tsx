"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { AdminNav } from "@/components/admin/AdminNav";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";

  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen bg-[#FAF7FE]">
      
      {/* DESKTOP SIDEBAR (Fixed) */}
      <div className="hidden lg:block lg:w-[260px] fixed inset-y-0 left-0 z-50 border-r border-ink/5 bg-white shadow-sm">
        <AdminNav />
      </div>

      {/* MAIN CONTENT AREA */}
      {/* Added lg:pl-[260px] to push content past the fixed sidebar */}
      <div className="flex-1 w-full lg:pl-[260px] flex flex-col min-h-screen">
        
        {/* STICKY PREMIUM HEADER (Works on Mobile & Desktop) */}
        <header className="sticky top-0 z-40 flex h-[70px] items-center justify-center lg:justify-start lg:px-10 bg-[#FAF7FE]/80 backdrop-blur-md border-b border-ink/5">
          <span className="text-[22px] font-semibold uppercase tracking-[0.2em] text-brand-700" style={{ fontFamily: "var(--font-cormorant), serif" }}>
            M.A LUXURY
          </span>
        </header>

        {/* Page Content */}
        <main className="flex-1 pb-[100px] lg:pb-0">
          {children}
        </main>
      </div>

      {/* MOBILE FLOATING GLASSMORPHISM NAV */}
      <div className="lg:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-[320px] px-4">
        <nav className="flex w-full items-center justify-around rounded-full border border-white/60 bg-white/40 px-2 py-1.5 shadow-[0_8px_32px_rgba(0,0,0,0.08)] backdrop-blur-2xl">
          
          <Link href="/admin/products" className={`flex flex-col items-center justify-center gap-1 p-2.5 rounded-full transition-all duration-300 ${pathname.includes("products") ? "bg-brand-700 text-white shadow-md" : "text-ink/60 hover:text-brand-700"}`}>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
            {pathname.includes("products") && <span className="text-[8px] font-bold uppercase tracking-wider">Shop</span>}
          </Link>

          <Link href="/admin/services" className={`flex flex-col items-center justify-center gap-1 p-2.5 rounded-full transition-all duration-300 ${pathname.includes("services") ? "bg-brand-700 text-white shadow-md" : "text-ink/60 hover:text-brand-700"}`}>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243 4.243 3 3 0 004.243-4.243zm0-5.758a3 3 0 10-4.243-4.243 3 3 0 004.243 4.243z" /></svg>
            {pathname.includes("services") && <span className="text-[8px] font-bold uppercase tracking-wider">Services</span>}
          </Link>

          <Link href="/admin/bookings" className={`flex flex-col items-center justify-center gap-1 p-2.5 rounded-full transition-all duration-300 ${pathname.includes("bookings") ? "bg-brand-700 text-white shadow-md" : "text-ink/60 hover:text-brand-700"}`}>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            {pathname.includes("bookings") && <span className="text-[8px] font-bold uppercase tracking-wider">Bookings</span>}
          </Link>

          <Link href="/admin/availability" className={`flex flex-col items-center justify-center gap-1 p-2.5 rounded-full transition-all duration-300 ${pathname.includes("availability") ? "bg-brand-700 text-white shadow-md" : "text-ink/60 hover:text-brand-700"}`}>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            {pathname.includes("availability") && <span className="text-[8px] font-bold uppercase tracking-wider">Hours</span>}
          </Link>

        </nav>
      </div>

    </div>
  );
}
