"use client";

import { usePathname } from "next/navigation";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";
import { CartProvider } from "./CartContext";
import { CartDrawer } from "@/components/CartDrawer";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname(); 
  const isAdmin = pathname?.startsWith("/admin");

  return (
    <html lang="en" suppressHydrationWarning className="light">
      <body>
        <ThemeProvider attribute="class" defaultTheme="light" forcedTheme="light" enableSystem={false}>
          <CartProvider>
            
            {/* Only show the global site Header and Cart on non-admin pages */}
            {!isAdmin && (
              <>
                <Header />
                <CartDrawer />
              </>
            )}
            
            {children}
            
            {/* Only render the Footer if we are on the exact homepage */}
            {pathname === "/" && <Footer />}
            
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
