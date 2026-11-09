"use client";

import { useState } from "react";
import Link from "next/link";

const FAQS = [
  {
    question: "How do I secure an appointment?",
    answer: "All appointments are strictly by booking. You can secure your slot by messaging us directly on WhatsApp. A non-refundable deposit is required to lock in your date and time."
  },
  {
    question: "Are deposits required?",
    answer: "Yes, a deposit is mandatory for all services. The remaining balance is to be paid in cash or via bank transfer on the day of your appointment."
  },
  {
    question: "Do I need to supply my own hair?",
    answer: "For braiding and loc services, you are required to bring your own hair (unless a specific package was discussed). For sew-ins, please provide your bundles and closure/frontal."
  },
  {
    question: "How should I prepare for my visit?",
    answer: "Please arrive with your hair freshly washed, completely blow-dried, and detangled. We kindly ask that you do not apply heavy oils, grease, or leave-in conditioners prior to your appointment."
  },
  {
    question: "What is your cancellation policy?",
    answer: "We require a minimum of 48 hours' notice for any cancellations or rescheduling. Cancellations made within 48 hours of the appointment will result in the forfeiture of your deposit."
  },
  {
    question: "Can I purchase hair extensions?",
    answer: "Absolutely. Our premium hair extensions are available to purchase directly through our online shop. You can have them shipped to your address or collect them at your installation appointment."
  }
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full bg-white py-20 px-5 md:py-32 md:px-8 border-t border-brand-100">
      <div className="mx-auto max-w-4xl">
        
        {/* SMART HEADER - Centered, no extra text */}
        <div className="mb-12 text-center flex flex-col items-center">
          <h2 
            className="text-[36px] sm:text-[52px] text-ink leading-tight" 
            style={{ fontFamily: 'var(--font-cormorant), serif' }}
          >
            FAQs
          </h2>
          <div className="w-12 h-[1px] bg-ink/20 mt-6" />
        </div>

        {/* ACCORDION LIST */}
        <div className="flex flex-col border-t border-ink/10">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div key={idx} className="border-b border-ink/10">
                <button 
                  onClick={() => toggleFAQ(idx)}
                  className="w-full flex items-center justify-between py-6 group text-left transition-colors"
                >
                  <h3 
                    className={`text-[18px] md:text-[22px] transition-colors pr-6 ${
                      isOpen ? "text-brand-700 italic" : "text-ink group-hover:text-brand-700"
                    }`}
                    style={{ fontFamily: 'var(--font-cormorant), serif' }}
                  >
                    {faq.question}
                  </h3>
                  
                  {/* GOLD + / - ICON */}
                  <div className={`flex h-6 w-6 shrink-0 items-center justify-center transition-all duration-500 ${
                    isOpen ? "text-gold rotate-180" : "text-ink/40 group-hover:text-gold"
                  }`}>
                    {isOpen ? (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6">
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
                    className="text-[14px] text-muted leading-relaxed pr-12"
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
            href="https://wa.me/440000000000"
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
