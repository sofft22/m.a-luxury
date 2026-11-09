"use client";

import { useCart } from "@/app/CartContext";
import Image from "next/image";
import Link from "next/link";

export function CartDrawer() {
  const { cart, isCartOpen, setIsCartOpen, removeFromCart, updateQty, cartTotal } = useCart();

  if (!isCartOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-[90] bg-black/60 backdrop-blur-sm transition-opacity" onClick={() => setIsCartOpen(false)} />

      <div className="fixed inset-y-0 right-0 z-[100] flex w-full max-w-md flex-col bg-[#FAF7FE] shadow-2xl transition-transform duration-300">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-ink/10 px-6 py-5">
          <h2 className="text-[22px] font-normal text-ink" style={{ fontFamily: "var(--font-cormorant), serif" }}>Your Bag</h2>
          <button onClick={() => setIsCartOpen(false)} className="flex h-8 w-8 items-center justify-center text-ink/60 hover:text-ink transition-colors">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-5 w-5"><path d="M6 6l12 12M18 6L6 18" /></svg>
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {cart.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <p className="text-[14px] text-muted" style={{ fontFamily: "var(--font-inter), sans-serif" }}>Your bag is empty.</p>
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              {cart.map((item: any) => {
                const itemPrice = typeof item.price === "number" ? item.price : parseInt(String(item.price).replace(/[^0-9]/g, ""), 10);
                return (
                  <div key={item.cartId} className="flex gap-4">
                    <div className="relative h-24 w-20 shrink-0 overflow-hidden rounded-md bg-brand-100">
                      <Image src={item.image} alt={item.title} fill className="object-cover" />
                    </div>
                    <div className="flex flex-1 flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <h3 className="text-[16px] font-medium text-ink leading-tight pr-4" style={{ fontFamily: "var(--font-cormorant), serif" }}>{item.title}</h3>
                          <button onClick={() => removeFromCart(item.cartId)} className="text-ink/40 hover:text-ink transition-colors mt-1">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-4 w-4"><path d="M6 6l12 12M18 6L6 18" /></svg>
                          </button>
                        </div>
                        <p className="text-[11px] text-muted mt-1" style={{ fontFamily: "var(--font-inter), sans-serif" }}>{item.size}</p>
                      </div>
                      <div className="mt-2 flex items-center justify-between">
                        <div className="inline-flex items-stretch overflow-hidden rounded-md border border-ink/20 bg-white">
                          <button onClick={() => updateQty(item.cartId, item.qty - 1)} className="flex h-8 w-8 items-center justify-center text-ink/60 hover:bg-brand-700 hover:text-white transition-colors">−</button>
                          <span className="flex h-8 w-10 items-center justify-center text-[12px] font-bold text-ink">{item.qty}</span>
                          <button onClick={() => updateQty(item.cartId, item.qty + 1)} className="flex h-8 w-8 items-center justify-center text-ink/60 hover:bg-brand-700 hover:text-white transition-colors">+</button>
                        </div>
                        <p className="text-[15px] font-medium text-ink" style={{ fontFamily: "var(--font-cormorant), serif" }}>£{(itemPrice * item.qty).toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="border-t border-ink/10 px-6 py-6 flex flex-col gap-3 bg-white">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-ink" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>Subtotal</span>
              <span className="text-[22px] font-medium text-ink" style={{ fontFamily: "var(--font-cormorant), serif" }}>£{cartTotal.toLocaleString()}</span>
            </div>
            
            <Link 
              href="/checkout"
              onClick={() => setIsCartOpen(false)}
              className="block w-full rounded-full bg-brand-700 py-4 text-center text-[10px] font-bold uppercase tracking-[0.15em] text-white transition-all hover:bg-brand-900 shadow-lg shadow-brand-700/30"
              style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
            >
              Proceed to Checkout
            </Link>
            <button 
              onClick={() => setIsCartOpen(false)}
              className="block w-full rounded-full border border-ink/20 py-4 text-center text-[10px] font-bold uppercase tracking-[0.15em] text-ink transition-all hover:bg-brand-50"
              style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
}
