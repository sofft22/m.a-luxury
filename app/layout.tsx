import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer"; // <-- ADDED THIS BACK
import { ThemeProvider } from "@/components/ThemeProvider";
import { CartProvider } from "./CartContext";
import { CartDrawer } from "@/components/CartDrawer";

export const metadata: Metadata = {
  title: "M.A Luxury | Premium Hair & Beauty Services",
  description: "Premium hair extensions, braids, locs, and luxury beauty services. Book your appointment today for flawless styles tailored to your crown.",
  
  metadataBase: new URL('https://maluxury.co.uk'),

  // GOOGLE SEARCH CONSOLE VERIFICATION
  verification: {
    google: "sjPHA5MH7OCR9z2a7pYEJh48W4EYHe917m2LfV3KL4w",
  },

  // Favicon
  icons: {
    icon: '/favicon.ico', 
  },

  openGraph: {
    title: "M.A Luxury | Premium Hair & Beauty",
    description: "Elevate your look with our expert braiding, locs, and beauty services. Book your appointment online.",
    url: 'https://maluxury.co.uk',
    siteName: 'M.A Luxury',
    locale: 'en_GB',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'M.A Luxury Logo',
      },
    ],
  },
  
  twitter: {
    card: "summary_large_image",
    title: "M.A Luxury | Premium Hair & Beauty",
    description: "Elevate your look with our expert braiding, locs, and beauty services. Book your appointment online.",
    images: ['/og-image.jpg'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className="light">
      <body>
        <ThemeProvider attribute="class" defaultTheme="light" forcedTheme="light" enableSystem={false}>
          <CartProvider>
            <Header />
            <CartDrawer />
            
            {/* The main content of your pages goes here */}
            {children}
            
            <Footer /> {/* <-- ADDED THIS BACK */}
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
