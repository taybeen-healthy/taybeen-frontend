import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F7F7F6] flex items-center justify-center p-4 sm:p-6 md:p-8 lg:p-12 relative overflow-hidden">
      {/* Central Panel */}
      <section className="relative w-full bg-white rounded-lg shadow-[0_8px_40px_-12px_rgba(0,0,0,0.04)] overflow-hidden flex flex-col min-h-[85vh]">
        {/* Top/Hero Area */}
        <div className="flex-1 px-6 py-12 sm:px-12 md:px-16 lg:px-24 lg:pt-14 z-10 flex flex-col">
          <div className="max-w-2xl mt-auto md:mt-0">
            <h1 className="text-4xl md:text-5xl lg:text-[52px tracking-tight font-medium text-[#111111] mb-6">
              Dates you can trust, quality you can taste.
            </h1>

            <p className="text-[#666666] text-base md:text-lg max-w-lg mb-8 md:mb-10 leading-relaxed font-light">
               Inspired by tradition and guided by quality, Taybeen delivers dates that are naturally wholesome, beautifully packed, and made for everyday enjoyment.
            </p>

            <button className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-[#F2F2F2] hover:bg-[#EAEAEA] text-[#111111] text-sm md:text-[15px] font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2">
              Shop Now
            </button>
          </div>
        </div>

        {/* Footer Area */}
        <footer className="px-6 sm:px-12 md:px-16 lg:px-24 pb-8 md:pb-12 z-10 w-full mt-auto">
          {/* Footer Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-10 sm:gap-8 mb-12 max-w-2xl ml-auto border-t border-black/[0.04] pt-10">
            {/* Pages Column */}
            <div>
              <h3 className="text-[#888888] text-xs uppercase tracking-wider font-medium mb-4">
                Pages
              </h3>
              <ul className="space-y-3">
                {["Home", "Shop", "About", "Contact"].map((link) => (
                  <li key={link}>
                    <Link
                      href="#"
                      className="text-[#111111] text-sm hover:text-[#888888] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 rounded-sm"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Categories Column */}
            <div>
              <h3 className="text-[#888888] text-xs uppercase tracking-wider font-medium mb-4">
                Categories
              </h3>
              <ul className="space-y-3">
                {["Premium Dates", "Gift Packs", "Daily Nutrition", "Best Sellers", "New Arrivals"].map((link) => (
                  <li key={link}>
                    <Link
                      href="#"
                      className="text-[#111111] text-sm hover:text-[#888888] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 rounded-sm"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Follow Column */}
            <div>
              <h3 className="text-[#888888] text-xs uppercase tracking-wider font-medium mb-4">
                Follow
              </h3>
              <ul className="space-y-3">
                {["Instagram", "Pinterest", "Facebook", "LinkedIn"].map(
                  (link) => (
                    <li key={link}>
                      <Link
                        href="#"
                        className="text-[#111111] text-sm hover:text-[#888888] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 rounded-sm"
                      >
                        {link}
                      </Link>
                    </li>
                  ),
                )}
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="relative flex flex-col md:flex-row justify-between items-center text-xs text-[#888888] font-light mt-8 gap-4 md:gap-0">
            <p className="w-full md:w-1/3 text-center md:text-left">
              © Copyright 2026
            </p>
            <p className="w-full md:w-1/3 text-center">Crafted with care by Taybeen</p>
            <div className="w-full md:w-1/3 hidden md:block"></div>
          </div>
        </footer>

        {/* Decorative Oversized Wordmark */}
        <div className="absolute bottom-[-1%] md:bottom-[-2%] left-1/2 -translate-x-1/2 w-full flex justify-center pointer-events-none select-none z-0 overflow-hidden">
          <span
            className="text-[clamp(120px,24vw,280px)] font-bold leading-none tracking-tighter text-black/[0.02] whitespace-nowrap"
            aria-hidden="true"
          >
            Taybeen
          </span>
        </div>
      </section>
    </main>
  );
}
