"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const NAV_ITEMS = [
  { label: "Products", href: "/admin/products", icon: "products" },
  { label: "Orders", href: "/admin/orders", icon: "orders" },
  { label: "Settings", href: "/admin/settings", icon: "settings" }, 
];

const MOBILE_TABS = NAV_ITEMS.slice(0, 3);
const MORE_ITEMS = NAV_ITEMS.slice(3);

export function AdminNav() {
  const pathname = usePathname();
  const router = useRouter();
  const [moreOpen, setMoreOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("ma_admin_logged_in");
    router.push("/admin/login");
  };

  const renderIcon = (name: string) => {
    const cls = "h-5 w-5";
    switch (name) {
      case "orders": return <svg className={cls} fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>;
      case "products": return <svg className={cls} fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>;
      case "settings": return <svg className={cls} fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
      default: return null;
    }
  };

  return (
    <>
      {/* DESKTOP SIDEBAR */}
      <aside className="hidden lg:flex w-64 flex-col border-r border-ink/10 bg-[#FAF7FE] h-screen sticky top-0">
        <div className="flex h-[72px] items-center px-8 border-b border-ink/10">
          <span className="text-[20px] font-semibold uppercase tracking-[0.15em] text-brand-700" style={{ fontFamily: "var(--font-cormorant), serif" }}>
            M.A Luxury
          </span>
        </div>
        <nav className="flex-1 overflow-y-auto py-6 px-4 flex flex-col gap-1">
          {NAV_ITEMS.map((item) => {
            const active = pathname === item.href;
            return (
              <Link key={item.href} href={item.href} className={`flex items-center gap-3 rounded-md px-4 py-3 text-[13px] font-medium transition-colors ${
                active ? "bg-brand-700 text-white" : "text-ink/70 hover:bg-brand-50 hover:text-ink"
              }`}>
                {renderIcon(item.icon)}
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-ink/10">
          <button onClick={handleLogout} className="flex w-full items-center gap-3 rounded-md px-4 py-3 text-[13px] font-medium text-red-600 hover:bg-red-50 transition-colors">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
            Log Out
          </button>
        </div>
      </aside>

      {/* MOBILE BOTTOM NAV */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-[100] flex h-[60px] items-center justify-around border-t border-ink/10 bg-[#FAF7FE] pb-safe">
        {MOBILE_TABS.map((item) => {
          const active = pathname === item.href;
          return (
            <Link key={item.href} href={item.href} className={`flex flex-col items-center justify-center gap-1 w-16 h-full ${active ? "text-brand-700" : "text-ink/40"}`}>
              {renderIcon(item.icon)}
              <span className="text-[9px] font-bold uppercase tracking-wider">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}
