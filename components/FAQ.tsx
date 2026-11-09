"use client";

import { useState } from "react";
import Link from "next/link";

const FAQS = [
  {
    question: "How do I book an appointment?",
    answer: "All bookings are handled via WhatsApp. Simply click the 'Book Now' button anywhere on the site, and it will open a chat with us to secure your slot."
  },
  {
    question: "Do you require a deposit?",
    answer: "Yes, a non-refundable deposit is required to secure all appointments. The remaining balance can be paid in cash or via transfer on the day of your appointment."
  },
  {
    question: "Do I need to bring my own hair?",
    answer: "For most braiding and loc services, you will need to provide your own hair (or we can supply it for an additional fee if requested in advance). For sew-ins, please bring your bundles and closure/frontal."
  },
  {
    question: "How should I prep my hair?",
    answer: "Please arrive with your hair freshly washed, blow-dried, and completely detangled. Do not apply any heavy oils, grease, or leave-in conditioners before your appointment."
  },
  {
    question: "What is your cancellation policy?",
    answer: "We require at least 48 hours' notice for cancellations or rescheduling. If you cancel within 48 hours, your deposit will be forfeited."
  },
  {
    question: "Do you offer hair extensions for sale?",
    answer: "Yes! You can shop our premium hair extensions directly on the website. You can choose to have them shipped to you or have them ready for your installation appointment."
  }
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full bg-white py-20 px-5 md:py-28 md:px-8 border-t border-brand-100">
      <div className="mx-auto max-w-6xl">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
          
          {/* LEFT COLUMN - HEADING */}
          <div className="md:col-span-5 flex flex-col items-start">
            <h2 
              className="text-[32px] sm:text-[44px] text-ink leading-tight mb-6" 
              style={{ fontFamily: 'var(--font-cormorant), serif' }}
            >
              Frequently Asked Questions
            </h2>
            <p 
              className="text-[14px] text-muted leading-relaxed mb-8 max-w-sm"
              style={{ fontFamily: 'var(--font-inter), sans-serif' }}
            >
              Everything you need to know before your appointment. Can't find the answer you're looking for? 
            </p>
            <Link 
              href="https://wa.me/440000000000"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 border-b border-brand-700 pb-1 text-[11px] font-bold uppercase tracking-[0.15em] text-brand-700 transition-colors hover:text-ink hover:border-ink"
              style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
            >
              Message us on WhatsApp
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>

          {/* RIGHT COLUMN - ACCORDION */}
          <div className="md:col-span-7 flex flex-col border-t border-ink/10">
            {FAQS.map((faq, idx) => {
              const isOpen = openIndex === idx;

              return (
                <div key={idx} className="border-b border-ink/10">
                  <button 
                    onClick={() => toggleFAQ(idx)}
                    className="w-full flex items-center justify-between py-6 group text-left"
                  >
                    <h3 
                      className={`text-[16px] md:text-[18px] transition-colors pr-4 ${
                        isOpen ? "text-brand-700" : "text-ink group-hover:text-ink/60"
                      }`}
                      style={{ fontFamily: 'var(--font-inter), sans-serif' }}
                    >
                      {faq.question}
                    </h3>
                    
                    {/* Plus/Minus Icon */}
                    <div className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
                      isOpen ? "bg-brand-700 text-white rotate-45" : "bg-transparent text-ink/40 group-hover:text-ink"
                    }`}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                      </svg>
                    </div>
                  </button>

                  {/* Answer Dropdown */}
                  <div 
                    className={`overflow-hidden transition-all duration-500 ease-in-out ${
                      isOpen ? "max-h-[300px] opacity-100 mb-6" : "max-h-0 opacity-0"
                    }`}
                  >
                    <p 
                      className="text-[13px] md:text-[14px] text-muted leading-relaxed pr-8"
                      style={{ fontFamily: 'var(--font-inter), sans-serif' }}
                    >
                      {faq.answer}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
