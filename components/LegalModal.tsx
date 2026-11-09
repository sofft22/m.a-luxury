"use client";

import { useState } from "react";

export function LegalModal({ 
  isOpen, 
  onClose, 
  type 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  type: "policies" | "privacy" | null 
}) {
  const [activeTab, setActiveTab] = useState<"appointments" | "products" | "general">("appointments");

  if (!isOpen || !type) return null;

  return (
    <div className="fixed inset-0 z-[150] flex bg-black/60 backdrop-blur-sm sm:p-6 sm:items-center justify-center" onClick={onClose}>
      <div 
        onClick={(e) => e.stopPropagation()} 
        className="relative flex flex-col bg-white shadow-2xl w-full h-full sm:h-auto sm:max-h-[85vh] sm:max-w-[800px] sm:rounded-xl overflow-hidden animate-in slide-in-from-bottom-full sm:zoom-in-95 duration-200"
      >
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 bg-white px-6 py-5 shrink-0">
          <h2 className="text-[22px] text-ink" style={{ fontFamily: "var(--font-cormorant), serif" }}>
            {type === "privacy" ? "Privacy Policy" : "Terms & Policies"}
          </h2>
          <button onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-50 text-gray-500 hover:text-ink transition-colors">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-5 w-5"><path d="M6 6l12 12M18 6L6 18" /></svg>
          </button>
        </div>

        {/* PRIVACY CONTENT */}
        {type === "privacy" && (
          <div className="flex-1 overflow-y-auto p-6 md:p-8 text-[13px] leading-[1.8] text-muted space-y-6" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
            <p>Personal information collected during bookings and purchases will be used to process orders, manage appointments and communicate with customers.</p>
            <p>Customer information will be handled securely and in accordance with applicable UK data protection legislation. Personal information will only be shared with third parties where necessary for legitimate business operations (such as payment processing and delivery), or where legally required.</p>
            <p>Photographs and videos of clients will only be used for promotional purposes with their permission. We will not sell customers’ personal information to third parties.</p>
          </div>
        )}

        {/* POLICIES CONTENT */}
        {type === "policies" && (
          <>
            {/* TABS */}
            <div className="flex border-b border-gray-100 overflow-x-auto no-scrollbar shrink-0">
              {[
                { id: "appointments", label: "Appointment Policies" },
                { id: "products", label: "Product Policies" },
                { id: "general", label: "General & Privacy" }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-6 py-4 text-[11px] font-bold uppercase tracking-wider transition-colors whitespace-nowrap ${
                    activeTab === tab.id ? "text-brand-700 border-b-2 border-brand-700" : "text-gray-400 hover:text-ink"
                  }`}
                  style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* SCROLLABLE CONTENT */}
            <div className="flex-1 overflow-y-auto p-6 md:p-8 text-[13px] leading-[1.8] text-muted space-y-6" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
              
              {activeTab === "appointments" && (
                <>
                  <div>
                    <h3 className="font-bold text-ink mb-2">1. Booking & Deposits</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>All appointments must be booked in advance and are only confirmed once the required deposit has been received.</li>
                      <li>A fixed <strong>£10 booking deposit</strong> is required to secure every appointment.</li>
                      <li>The deposit will be deducted from the total cost of your service.</li>
                      <li>Deposits cannot be transferred to another person, but may be transferred once to a new appointment if at least 48 hours' notice is provided.</li>
                      <li>Deposits may be retained for late cancellations and no-shows where the charge is fair and proportionate.</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-bold text-ink mb-2">2. Lateness Policy</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>A 15-minute grace period is allowed. Please contact us as soon as possible if you anticipate being late.</li>
                      <li>A <strong>£15 lateness fee</strong> will apply to appointments where we are able to accommodate a client arriving more than 15 minutes late.</li>
                      <li>Clients arriving more than 15 minutes late may have their appointment shortened, rescheduled, or cancelled.</li>
                      <li>If your appointment is cancelled due to lateness, your deposit may be forfeited where this is fair and proportionate.</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-bold text-ink mb-2">3. Cancellations & Rescheduling</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>We require at least <strong>48 hours’ notice</strong> for cancellations or appointment changes.</li>
                      <li>Cancellations made less than 48 hours before the appointment may result in the loss of the deposit.</li>
                      <li>Failure to attend an appointment without prior notice may result in the loss of the deposit.</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-bold text-ink mb-2">4. Hair, Loc, Beauty & Piercing Services</h3>
                    <p className="mb-2">Clients must select the correct service when booking, disclose previous chemical treatments or scalp conditions, and arrive with hair in the specified condition (washed and blow-dried).</p>
                    <p className="mb-2">For piercing, clients must meet legal age/consent requirements. We reserve the right to decline or postpone any service where there is a reasonable health, safety, or hygiene concern.</p>
                    <p>Clients supplying their own hair extensions or accessories are responsible for ensuring they are suitable for the selected style.</p>
                  </div>
                </>
              )}

              {activeTab === "products" && (
                <>
                  <div>
                    <h3 className="font-bold text-ink mb-2">5. Orders & Payment</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Customers are responsible for selecting the correct product, length, texture, and quantity.</li>
                      <li>Full payment is required when placing an order unless otherwise agreed. Orders will not be processed until payment has been received.</li>
                      <li>If a product becomes unavailable after an order has been placed, the customer will be contacted to discuss an appropriate solution, including a refund where applicable.</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-bold text-ink mb-2">6. Collection & Delivery</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      <li><strong>Delivery:</strong> Estimated timeframe is 1–3 days. Timeframes begin once an order has been confirmed and processed. Any applicable delivery charges will be communicated before payment.</li>
                      <li><strong>Collection:</strong> Arrangements, including the agreed collection time and location, will be communicated after order confirmation.</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-bold text-ink mb-2">7. Returns & Refunds</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Any incorrect, damaged, or faulty product should be reported as soon as possible. Photographs may be requested.</li>
                      <li>Customers purchasing online may have a statutory 14-day cancellation right, subject to applicable exceptions.</li>
                      <li>Certain sealed hygiene-sensitive products may be exempt from change-of-mind returns once unsealed.</li>
                    </ul>
                  </div>
                </>
              )}

              {activeTab === "general" && (
                <>
                  <div>
                    <h3 className="font-bold text-ink mb-2">8. Health, Safety & Conduct</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Relevant tools and equipment will be cleaned, disinfected, or sterilised as appropriate.</li>
                      <li>Mutual respect and courtesy are expected at all times. Abusive or inappropriate behaviour will not be tolerated.</li>
                      <li>Children attending appointments must be supervised by a responsible adult.</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-bold text-ink mb-2">9. Complaints</h3>
                    <p>If you have a concern about a service received, please contact us within 48 hours of your appointment. We will review every complaint fairly and aim to respond within a reasonable timeframe.</p>
                  </div>

                  <div>
                    <h3 className="font-bold text-ink mb-2">10. Privacy Notice</h3>
                    <p>Personal information collected will be used to process orders, manage appointments, and communicate with customers. We will not sell your data. Full details are available in our Privacy Policy.</p>
                  </div>

                  <div>
                    <h3 className="font-bold text-ink mb-2">11. Business Cancellations</h3>
                    <p>If M.A Luxury needs to cancel or reschedule an appointment, affected clients will be informed as soon as reasonably possible and any payment for the service will be refunded as appropriate.</p>
                  </div>
                </>
              )}

            </div>
            
            {/* FOOTER */}
            <div className="p-6 bg-gray-50 border-t border-gray-100 text-[11px] text-gray-500 shrink-0 text-center">
              By booking a service or placing an order with M.A Luxury, you agree to the applicable terms outlined above. Nothing in these policies affects your statutory consumer rights.
            </div>
          </>
        )}

      </div>
    </div>
  );
}
