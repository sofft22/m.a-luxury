"use client";

import { useState } from "react";
import Link from "next/link";

const FAQS = [
  {
    question: "How do I secure an appointment?",
    answer: "All appointments must be booked in advance via WhatsApp. Your appointment is only confirmed once the required £10 booking deposit has been received. The remaining balance is paid on the day of your appointment."
  },
  {
    question: "What is your cancellation and lateness policy?",
    answer: "We require at least 48 hours' notice for cancellations or rescheduling to transfer your deposit. A 15-minute grace period is allowed for lateness; however, arriving later than this may result in a £15 lateness fee, or your appointment being shortened, rescheduled, or cancelled."
  },
  {
    question: "How should I prepare for my hair appointment?",
    answer: "Please arrive with your hair freshly washed, completely blow-dried, and detangled. Do not apply heavy oils, grease, or leave-in conditioners before your appointment. If you are supplying your own hair extensions, please ensure they are suitable for your chosen style."
  },
  {
    question: "Do you have health and safety requirements?",
    answer: "Yes. For lash, brow, and piercing services, you must disclose any allergies, skin sensitivities, or medical conditions beforehand. We reserve the right to decline or postpone any service if there is a reasonable health, safety, or hygiene concern."
  },
  {
    question: "How long does hair extension delivery take?",
    answer: "Our estimated delivery timeframe is 1–3 days once your order has been confirmed and processed. We also offer collection in Plymouth, which will be arranged after your order is confirmed."
  },
  {
    question: "Can I return hair extensions?",
    answer: "For hygiene reasons, sealed hair extensions are exempt from change-of-mind returns once unsealed. However, if your order is incorrect, damaged, or faulty, please contact us immediately with photos so we can resolve the issue."
  }
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full bg-white py-20 px-5 md:py-28 md:px-8 border-t border-brand-100">
      <div className="mx-auto max-w-3xl">
        
        {/* SMART HEADER */}
        <div className="mb-14 flex flex-col items-center text-center">
          <p className="text-gold text-[10px] font-bold uppercase tracking-[0.3em] mb-3" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
            ✦ Support
          </p>
          <h2 
            className="text-[32px] sm:text-[44px] text-ink leading-tight" 
            style={{ fontFamily: 'var(--font-cormorant), serif' }}
          >
            Frequently Asked Questions
          </h2>
        </div>

        {/* ACCORDION LIST */}
        <div className="flex flex-col border-t border-ink/10">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div key={idx} className="border-b border-ink/10 group">
                <button 
                  onClick={() => toggleFAQ(idx)}
                  className="w-full flex items-start justify-between py-6 text-left transition-colors"
                >
                  <h3 
                    className={`text-[16px] md:text-[18px] pr-8 transition-colors ${
                      isOpen ? "text-brand-700 font-medium" : "text-ink group-hover:text-brand-700"
                    }`}
                    style={{ fontFamily: 'var(--font-inter), sans-serif' }}
                  >
                    {faq.question}
                  </h3>
                  
                  {/* MINIMALIST + / - ICON */}
                  <div className={`mt-0.5 flex shrink-0 items-center justify-center transition-all duration-300 ${
                    isOpen ? "text-gold rotate-180" : "text-ink/30 group-hover:text-gold"
                  }`}>
                    {isOpen ? (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                      </svg>
                    )}
                  </div>
                </button>

                {/* ANSWER DROPDOWN */}
                <div 
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    isOpen ? "max-h-[300px] opacity-100 mb-6" : "max-h-0 opacity-0"
                  }`}
                >
                  <p 
                    className="text-[13px] md:text-[14px] text-muted leading-relaxed pr-12"
                    style={{ fontFamily: 'var(--font-inter), sans-serif' }}
                  >
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* BOTTOM WHATSAPP LINK */}
        <div className="mt-12 flex justify-center">
          <Link 
            href="https://wa.me/447393157901"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.15em] text-brand-700 transition-colors hover:text-ink"
            style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
          >
            Still have questions? Message us
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>

      </div>
    </section>
  );
}
