"use client"; // 👈 Added this to allow using usePathname

import { Metadata } from "next";
import { usePathname } from "next/navigation";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";
import { CartProvider } from "./CartContext";
import { CartDrawer } from "@/components/CartDrawer";

// Note: If you use "use client", you technically can't export metadata from the same file in Next.js App Router. 
// If you need SEO, you should keep this file as a Server Component and just use the separate wrapper I gave you earlier. 
// But if you strictly want it all in one file, this is how.

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname(); // 👈 Gets the current route

  return (
    <html lang="en" suppressHydrationWarning className="light">
      <body>
        <ThemeProvider attribute="class" defaultTheme="light" forcedTheme="light" enableSystem={false}>
          <CartProvider>
            <Header />
            <CartDrawer />
            {children}
            
            {/* 👈 Only render the Footer if we are on the exact homepage */}
            {pathname === "/" && <Footer />}
            
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
