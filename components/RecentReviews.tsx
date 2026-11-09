import { Star } from "lucide-react";

const REVIEWS = [
  {
    id: 1,
    text: "Thank you very much for my beautiful hair too. I love love it!!!!",
    time: "19:37",
  },
  {
    id: 2,
    text: "Got many compliments 🥰 Thank you",
    time: "13:22",
  },
  {
    id: 3,
    text: "I am fine. The lashes is okay, i am still maintaining it..thank you",
    time: "15:02",
  }
];

export function RecentReviews() {
  return (
    <section className="w-full bg-white py-20 px-4 md:py-28 md:px-8 border-t border-brand-100 overflow-hidden">
      <div className="mx-auto max-w-7xl">
        
        {/* HEADER */}
        <div className="mb-12 text-center flex flex-col items-center">
          <h2 
            className="text-[32px] sm:text-[44px] text-ink leading-tight" 
            style={{ fontFamily: 'var(--font-cormorant), serif' }}
          >
            Client Love
          </h2>
          <div className="mt-4 flex gap-1 text-gold">
            <Star className="w-4 h-4 fill-current" />
            <Star className="w-4 h-4 fill-current" />
            <Star className="w-4 h-4 fill-current" />
            <Star className="w-4 h-4 fill-current" />
            <Star className="w-4 h-4 fill-current" />
          </div>
        </div>

        {/* 
          MOBILE: Horizontal Scroll 
          DESKTOP: 3-Column Grid
        */}
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 md:grid md:grid-cols-3 md:gap-6 pb-6 md:pb-0 no-scrollbar">
          {REVIEWS.map((review) => (
            <div 
              key={review.id} 
              // ADDED h-full and min-h to make all bubbles the same size
              className="min-w-[85vw] sm:min-w-[350px] md:min-w-0 snap-center flex flex-col h-full"
            >
              {/* Chat Bubble Container */}
              <div className="flex flex-col justify-between bg-[#F0F2F5] rounded-2xl rounded-tl-sm p-6 relative shadow-sm border border-gray-200/50 w-full h-full min-h-[160px] md:min-h-[180px]">
                
                <p 
                  className="text-[15px] leading-relaxed text-[#111] font-medium"
                  style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif' }}
                >
                  {review.text}
                </p>
                
                <div className="mt-4 flex justify-end">
                  <span className="text-[11px] text-[#667781] font-medium flex items-center gap-1">
                    {review.time}
                    <svg viewBox="0 0 16 15" width="16" height="15" className="text-[#53BDEB]">
                      <path fill="currentColor" d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.879a.32.32 0 0 1-.484.033l-.358-.325a.319.319 0 0 0-.484.032l-.378.483a.418.418 0 0 0 .036.541l1.32 1.266c.143.14.361.125.484-.033l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.879a.32.32 0 0 1-.484.033L1.891 7.769a.366.366 0 0 0-.515.006l-.423.433a.364.364 0 0 0 .006.514l3.258 3.185c.143.14.361.125.484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z"></path>
                    </svg>
                  </span>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* MOBILE SWIPE INDICATOR */}
        <div className="mt-4 flex justify-center items-center gap-2 md:hidden">
          <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-muted">
            Swipe to read
          </span>
          <span className="text-muted">→</span>
        </div>

      </div>
    </section>
  );
}
