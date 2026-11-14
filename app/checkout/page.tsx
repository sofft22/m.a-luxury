"use client";

import { useState, useEffect } from "react";
import { useCart } from "@/app/CartContext";
import Image from "next/image";
import Link from "next/link";

const WHATSAPP_NUMBER = "447393157901";

export default function CheckoutPage() {
  const { cart, cartTotal, clearCart } = useCart();
  
  const [isSuccess, setIsSuccess] = useState(false);
  const [orderId, setOrderId] = useState("");
  
  // Form State
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [saveDetails, setSaveDetails] = useState(false);

  // Promo State
  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState<any>(null);
  const [promoError, setPromoError] = useState("");
  const [checkingPromo, setCheckingPromo] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("ma_customer_details");
    if (saved) {
      const parsed = JSON.parse(saved);
      setFirstName(parsed.firstName || "");
      setLastName(parsed.lastName || "");
      setPhone(parsed.phone || "");
      setEmail(parsed.email || "");
      setAddress(parsed.address || "");
      setCity(parsed.city || "");
    }
  }, []);

  // --- Calculate Total Weight Safely ---
  const totalWeight = cart.reduce((total: number, item: any) => {
    let itemWeight = Number(item.weight) || 0;
    
    if (item.size && item.sizes) {
      let sizesArray: any[] = [];
      try {
        sizesArray = typeof item.sizes === "string" ? JSON.parse(item.sizes) : item.sizes;
      } catch (e) {
        sizesArray = [];
      }

      if (Array.isArray(sizesArray)) {
        const sizeObj = sizesArray.find((s: any) => s.name === item.size || s.size === item.size);
        if (sizeObj && sizeObj.weight !== undefined) {
          itemWeight = Number(sizeObj.weight);
        }
      }
    }
    
    return total + (itemWeight * item.qty);
  }, 0);

  // --- Calculate Shipping based on Weight ---
  let shipping = 0;
  if (totalWeight > 0) {
    if (totalWeight <= 2) {
      shipping = 4.80;
    } else if (totalWeight <= 20) {
      shipping = 7.50;
    } else {
      shipping = 7.50; 
    }
  }

  // Calculate Discount
  let discountAmount = 0;
  if (appliedPromo) {
    if (appliedPromo.type === "percentage") {
      discountAmount = Math.round((cartTotal * appliedPromo.value) / 100);
    } else {
      discountAmount = appliedPromo.value;
    }
  }

  const baseAmount = Math.max(0, cartTotal + shipping - discountAmount);
  const feePercentage = 0.015;
  const fixedFee = 0.20;
  const processingFee = Number((baseAmount * feePercentage + fixedFee).toFixed(2));
  const total = Number((baseAmount + processingFee).toFixed(2));
  
  const canSubmit = Boolean(firstName.trim() && lastName.trim() && phone.trim() && address.trim() && city.trim());

  const handleApplyPromo = async () => {
    if (!promoCode) return;
    setCheckingPromo(true);
    setPromoError("");

    const res = await fetch("/api/promos/check", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code: promoCode, phone: phone }),
    });
    
    const data = await res.json();
    if (!res.ok) {
      setPromoError(data.error);
      setAppliedPromo(null);
    } else {
      setAppliedPromo(data.promo);
      setPromoError("");
    }
    setCheckingPromo(false);
  };

  const handlePlaceOrder = async () => {
    if (!canSubmit) return;
    
    if (saveDetails) {
      localStorage.setItem("ma_customer_details", JSON.stringify({
        firstName, lastName, phone, email, address, city
      }));
    }

    // Generate a simple order ID
    const newOrderId = `MA-${Math.floor(1000 + Math.random() * 9000)}`;
    setOrderId(newOrderId);
    
    // Save the order data to the database (Optional, but good for records)
    try {
      const items = cart.map((item: any) => ({
        id: item.id,
        title: item.title,
        price: typeof item.price === "number" ? item.price : parseInt(String(item.price).replace(/[^0-9]/g, ""), 10),
        qty: item.qty,
        size: item.size,
        image: item.image
      }));

      // You can create an API route for /api/orders if you want to save these
      // For now, we just move to the success screen
      
      clearCart();
      setIsSuccess(true); 
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Something went wrong placing your order.");
    }
  };

  // BEAUTIFULLY FORMATTED WHATSAPP MESSAGE
  const whatsappMessage = 
`Hi M.a Luxury! 💜

I have just placed an order on the website.

*Order Details:*
━━━━━━━━━━━━━━━
*Order ID:* ${orderId}
*Items:* ${cart.map(i => `${i.qty}x ${i.title} (${i.size})`).join(', ')}
*Total:* £${total.toFixed(2)}
━━━━━━━━━━━━━━━

*Name:* ${firstName} ${lastName}
*Phone:* ${phone}
*Address:* ${address}, ${city}

Please find my receipt attached for the total amount.`;

  const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`;

  if (isSuccess) {
    return (
      <main className="min-h-screen bg-[#FAF7FE] pt-[120px] md:pt-[160px] pb-24">
        <div className="mx-auto max-w-2xl px-5 md:px-8">
          
          <div className="bg-white p-8 md:p-12 rounded-3xl border border-brand-100 shadow-xl shadow-brand-900/5 text-center">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-8 h-8 text-green-600"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
            </div>
            
            <h1 className="text-[32px] md:text-[40px] text-ink mb-2" style={{ fontFamily: 'var(--font-cormorant), serif' }}>
              Order Confirmed!
            </h1>
            <p className="text-[14px] text-muted mb-8">
              Your order <strong className="text-ink">{orderId}</strong> is reserved. Please follow the steps below to finalize payment.
            </p>

            <div className="bg-[#FAF7FE] border border-brand-100 rounded-2xl p-6 text-left mb-8">
              <h2 className="text-[12px] font-bold uppercase tracking-[0.15em] text-brand-700 mb-4" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>Payment Details</h2>
              <p className="text-[13px] text-ink mb-4">Please send the total <strong>£{total.toFixed(2)}</strong> to:</p>
              
              <div className="flex flex-col gap-2 text-[14px]">
                <div className="flex justify-between border-b border-ink/10 pb-2">
                  <span className="text-muted">Bank</span>
                  <span className="font-medium text-ink">Monzo</span>
                </div>
                <div className="flex justify-between border-b border-ink/10 pb-2">
                  <span className="text-muted">Account Name</span>
                  <span className="font-medium text-ink">Azizat Mayokun Akanbi</span>
                </div>
                <div className="flex justify-between border-b border-ink/10 pb-2">
                  <span className="text-muted">Sort Code</span>
                  <span className="font-medium text-ink tracking-wider">04-00-03</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">Account Number</span>
                  <span className="font-medium text-ink tracking-wider">35281032</span>
                </div>
              </div>
            </div>

            <a 
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] py-4 text-[11px] font-bold uppercase tracking-[0.15em] text-white shadow-lg shadow-[#25D366]/30 transition-all hover:bg-[#1ebe57]"
              style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
              Send Receipt on WhatsApp
            </a>
            
            <p className="text-[11px] text-muted mt-4">
              Your order will be shipped once payment is received.
            </p>
          </div>

        </div>
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF7FE] flex flex-col">
      <section className="bg-ink pt-[100px] pb-16 px-6 md:pt-[140px] md:pb-24 md:px-12">
        <div className="mx-auto max-w-[800px]">
          <h1 className="text-[40px] md:text-[56px] text-white" style={{ fontFamily: "var(--font-cormorant), serif" }}>Checkout</h1>
          <p className="mt-2 text-[13px] uppercase tracking-widest text-white/60" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>Secure your order</p>
        </div>
      </section>

      <div className="mx-auto w-full max-w-[800px] px-6 -mt-10 md:-mt-16 pb-24 relative z-10">
        
        {/* ORDER SUMMARY */}
        <div className="mb-8 rounded-2xl border border-ink/10 bg-white p-6 md:p-8 shadow-xl shadow-brand-900/5">
          <h2 className="mb-6 text-[12px] font-bold uppercase tracking-[0.15em] text-ink" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>Your Order</h2>
          
          <div className="flex flex-col gap-4 mb-6 border-b border-ink/10 pb-6">
            {cart.map((item: any) => {
              const itemPrice = typeof item.price === "number" ? item.price : parseInt(String(item.price).replace(/[^0-9]/g, ""), 10);
              return (
                <div key={item.cartId} className="flex items-center gap-4">
                  <div className="relative h-16 w-14 shrink-0 overflow-hidden rounded-md bg-brand-100">
                    <Image src={item.image} alt={item.title} fill className="object-cover" unoptimized={true} />
                  </div>
                  <div className="flex-1">
                    <p className="text-[16px] text-ink" style={{ fontFamily: "var(--font-cormorant), serif" }}>{item.title}</p>
                    <p className="text-[11px] uppercase tracking-wider text-muted mt-1" style={{ fontFamily: "var(--font-inter), sans-serif" }}>{item.size} • Qty {item.qty}</p>
                  </div>
                  <p className="text-[16px] text-ink" style={{ fontFamily: "var(--font-cormorant), serif" }}>£{(itemPrice * item.qty).toLocaleString()}</p>
                </div>
              )
            })}
          </div>
          
          {/* PROMO CODE */}
          <div className="mb-6">
            <div className="flex gap-2">
              <input 
                value={promoCode} 
                onChange={(e) => setPromoCode(e.target.value.toUpperCase())} 
                type="text" 
                placeholder="Promo Code" 
                className="w-full rounded-md border border-ink/20 bg-[#FAF7FE] px-4 py-3 text-[13px] outline-none focus:border-brand-700 transition-colors" 
              />
              <button onClick={handleApplyPromo} disabled={checkingPromo || !promoCode} className="rounded-md bg-brand-100 px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-brand-700 hover:bg-brand-200 disabled:opacity-50 transition-colors" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                Apply
              </button>
            </div>
            {promoError && <p className="text-red-500 text-[11px] mt-2 font-bold">{promoError}</p>}
            {appliedPromo && <p className="text-green-600 text-[11px] mt-2 font-bold">Code {appliedPromo.code} applied!</p>}
          </div>

          {/* TOTALS */}
          <div className="flex flex-col gap-2 pt-4">
            <div className="flex justify-between text-[13px] text-muted"><span>Subtotal</span><span>£{cartTotal.toLocaleString()}</span></div>
            <div className="flex justify-between text-[13px] text-muted">
              <span>Delivery (Est. Weight: {totalWeight.toFixed(2)}kg)</span>
              <span>£{shipping.toFixed(2)}</span>
            </div>
            
            {discountAmount > 0 && (
              <div className="flex justify-between text-[13px] text-green-600 font-bold"><span>Discount</span><span>-£{discountAmount.toLocaleString()}</span></div>
            )}

            <div className="flex justify-between text-[13px] text-muted">
              <span>Processing Fee</span>
              <span>£{processingFee.toFixed(2)}</span>
            </div>

            <div className="flex justify-between border-t border-ink/10 pt-4 mt-2 text-[24px] text-ink" style={{ fontFamily: "var(--font-cormorant), serif" }}>
              <span>Total</span>
              <span className="text-brand-700">£{total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* CONTACT DETAILS */}
        <div className="mb-8">
          <h2 className="mb-4 text-[12px] font-bold uppercase tracking-[0.15em] text-ink" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>Contact</h2>
          <div className="flex flex-col gap-3">
            <input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="Email Address (Optional)" className="w-full rounded-md border border-ink/20 bg-white px-4 py-4 text-[14px] outline-none focus:border-brand-700 transition-colors" />
            <input value={phone} onChange={e => setPhone(e.target.value)} type="tel" placeholder="Phone Number" required className="w-full rounded-md border border-ink/20 bg-white px-4 py-4 text-[14px] outline-none focus:border-brand-700 transition-colors" />
          </div>
        </div>

        {/* DELIVERY ADDRESS */}
        <div className="mb-8">
          <h2 className="mb-4 text-[12px] font-bold uppercase tracking-[0.15em] text-ink" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>Delivery Address</h2>
          <div className="grid grid-cols-2 gap-3 mb-4">
            <input value={firstName} onChange={e => setFirstName(e.target.value)} type="text" placeholder="First Name" required className="w-full rounded-md border border-ink/20 bg-white px-4 py-4 text-[14px] outline-none focus:border-brand-700 transition-colors" />
            <input value={lastName} onChange={e => setLastName(e.target.value)} type="text" placeholder="Last Name" required className="w-full rounded-md border border-ink/20 bg-white px-4 py-4 text-[14px] outline-none focus:border-brand-700 transition-colors" />
            <input value={address} onChange={e => setAddress(e.target.value)} type="text" placeholder="Street Address" required className="col-span-2 w-full rounded-md border border-ink/20 bg-white px-4 py-4 text-[14px] outline-none focus:border-brand-700 transition-colors" />
            <input value={city} onChange={e => setCity(e.target.value)} type="text" placeholder="City" required className="col-span-2 w-full rounded-md border border-ink/20 bg-white px-4 py-4 text-[14px] outline-none focus:border-brand-700 transition-colors" />
          </div>
        </div>

        {/* SAVE DETAILS TOGGLE */}
        <div className="mb-10 flex items-center justify-between bg-white p-5 rounded-xl border border-ink/10">
          <div>
            <p className="text-[13px] text-ink font-bold" style={{ fontFamily: "var(--font-inter), sans-serif" }}>Save my details for next time</p>
            <p className="text-[11px] text-muted mt-1" style={{ fontFamily: "var(--font-inter), sans-serif" }}>We'll remember your address and contact info.</p>
          </div>
          <button onClick={() => setSaveDetails(!saveDetails)} className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors ${saveDetails ? "bg-brand-700" : "bg-ink/20"}`}>
            <span className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${saveDetails ? "translate-x-[22px]" : "translate-x-0.5"}`} />
          </button>
        </div>

        {/* PLACE ORDER BUTTON */}
        <button 
          onClick={handlePlaceOrder} 
          disabled={!canSubmit} 
          className="w-full rounded-full bg-brand-700 py-5 text-[12px] font-bold uppercase tracking-[0.15em] text-white shadow-xl shadow-brand-700/30 disabled:opacity-50 hover:bg-brand-900 transition-colors"
          style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
        >
          Confirm Order Details
        </button>
      </div>
    </div>
  );
}
