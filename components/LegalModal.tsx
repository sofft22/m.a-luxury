"use client";

export function LegalModal({ 
  isOpen, 
  onClose, 
  type 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  type: "policies" | "privacy" | null 
}) {
  if (!isOpen || !type) return null;

  return (
    <div className="fixed inset-0 z-[150] flex bg-black/60 backdrop-blur-sm sm:p-6 sm:items-center justify-center" onClick={onClose}>
      <div 
        onClick={(e) => e.stopPropagation()} 
        className="relative flex flex-col bg-white shadow-2xl w-full h-full sm:h-auto sm:max-h-[85vh] sm:max-w-[800px] sm:rounded-xl overflow-y-auto animate-in slide-in-from-bottom-full sm:zoom-in-95 duration-200"
      >
        
        {/* Simple Close Button */}
        <button 
          onClick={onClose} 
          className="absolute top-6 right-6 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:text-ink hover:bg-gray-200 transition-colors"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-5 w-5"><path d="M6 6l12 12M18 6L6 18" /></svg>
        </button>

        {/* CONTENT */}
        <div className="p-8 md:p-12 text-[13px] leading-[1.8] text-muted space-y-8" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
          
          <div className="mb-8">
            <h2 className="text-[28px] md:text-[36px] text-ink mb-2" style={{ fontFamily: "var(--font-cormorant), serif" }}>
              {type === "privacy" ? "Privacy Policy" : "Terms & Policies"}
            </h2>
            <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-gold" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
              M.A Luxury
            </p>
          </div>

          {type === "privacy" ? (
            <>
              <p>Personal information collected during bookings and purchases will be used to process orders, manage appointments and communicate with customers.</p>
              <p>Customer information will be handled securely and in accordance with applicable UK data protection legislation. Personal information will only be shared with third parties where necessary for legitimate business operations (such as payment processing and delivery), or where legally required.</p>
              <p>Photographs and videos of clients will only be used for promotional purposes with their permission. We will not sell customers’ personal information to third parties.</p>
            </>
          ) : (
            <>
              <p className="text-[14px] text-ink font-medium">Welcome to M.A Luxury. By booking a service or placing an order, you agree to the terms outlined below.</p>

              <div>
                <h3 className="text-[16px] font-bold text-ink mb-3 border-b border-gray-100 pb-2">1. Booking & Deposits</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>All appointments must be booked in advance and are only confirmed once the required deposit has been received.</li>
                  <li>A fixed <strong>£10 booking deposit</strong> is required to secure every appointment.</li>
                  <li>The deposit will be deducted from the total cost of your service.</li>
                  <li>Deposits cannot be transferred to another person, but may be transferred once to a new appointment if at least 48 hours' notice is provided.</li>
                  <li>Deposits may be retained for late cancellations and no-shows where the charge is fair and proportionate.</li>
                </ul>
              </div>

              <div>
                <h3 className="text-[16px] font-bold text-ink mb-3 border-b border-gray-100 pb-2">2. Lateness Policy</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>A 15-minute grace period is allowed. Please contact us as soon as possible if you anticipate being late.</li>
                  <li>A <strong>£15 lateness fee</strong> will apply to appointments where we are able to accommodate a client arriving more than 15 minutes late.</li>
                  <li>Clients arriving more than 15 minutes late may have their appointment shortened, rescheduled, or cancelled.</li>
                  <li>If your appointment is cancelled due to lateness, your deposit may be forfeited where this is fair and proportionate.</li>
                </ul>
              </div>

              <div>
                <h3 className="text-[16px] font-bold text-ink mb-3 border-b border-gray-100 pb-2">3. Cancellations & Rescheduling</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>We require at least <strong>48 hours’ notice</strong> for cancellations or appointment changes.</li>
                  <li>Cancellations made less than 48 hours before the appointment may result in the loss of the deposit.</li>
                  <li>Failure to attend an appointment without prior notice may result in the loss of the deposit.</li>
                </ul>
              </div>

              <div>
                <h3 className="text-[16px] font-bold text-ink mb-3 border-b border-gray-100 pb-2">4. Services & Preparation</h3>
                <p className="mb-2">Clients must select the correct service when booking, disclose previous chemical treatments or scalp conditions, and arrive with hair in the specified condition (washed and blow-dried).</p>
                <p className="mb-2">For piercing, clients must meet legal age/consent requirements. We reserve the right to decline or postpone any service where there is a reasonable health, safety, or hygiene concern.</p>
                <p>Clients supplying their own hair extensions or accessories are responsible for ensuring they are suitable for the selected style.</p>
              </div>

              <div>
                <h3 className="text-[16px] font-bold text-ink mb-3 border-b border-gray-100 pb-2">5. Product Orders & Delivery</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Customers are responsible for selecting the correct product, length, texture, and quantity.</li>
                  <li>Full payment is required when placing an order unless otherwise agreed.</li>
                  <li><strong>Delivery:</strong> Estimated timeframe is 1–3 days. Timeframes begin once an order has been confirmed and processed.</li>
                  <li><strong>Collection:</strong> Arrangements will be communicated after order confirmation.</li>
                </ul>
              </div>

              <div>
                <h3 className="text-[16px] font-bold text-ink mb-3 border-b border-gray-100 pb-2">6. Returns & Refunds</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Any incorrect, damaged, or faulty product should be reported as soon as possible. Photographs may be requested.</li>
                  <li>Customers purchasing online may have a statutory 14-day cancellation right, subject to applicable exceptions.</li>
                  <li>Certain sealed hygiene-sensitive products may be exempt from change-of-mind returns once unsealed.</li>
                </ul>
              </div>

              <div>
                <h3 className="text-[16px] font-bold text-ink mb-3 border-b border-gray-100 pb-2">7. General Policies</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>Health & Safety:</strong> Relevant tools and equipment will be cleaned, disinfected, or sterilised as appropriate.</li>
                  <li><strong>Conduct:</strong> Mutual respect and courtesy are expected at all times. Abusive behaviour will not be tolerated.</li>
                  <li><strong>Children:</strong> Children attending appointments must be supervised by a responsible adult.</li>
                  <li><strong>Complaints:</strong> If you have a concern, please contact us within 48 hours of your appointment. We will review every complaint fairly.</li>
                  <li><strong>Business Cancellations:</strong> If M.A Luxury needs to cancel or reschedule an appointment, affected clients will be informed as soon as reasonably possible and any payment will be refunded as appropriate.</li>
                </ul>
              </div>

              <div className="pt-6 border-t border-gray-100 text-[11px] text-gray-500">
                Nothing in these policies excludes, restricts, or limits any statutory rights or remedies available to customers under UK consumer protection legislation.
              </div>
            </>
          )}

        </div>
      </div>
    </div>
  );
}
