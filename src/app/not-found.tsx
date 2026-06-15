import Link from "next/link";
import Image from "next/image";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#FDFAF3] flex flex-col justify-between relative overflow-hidden font-sans selection:bg-[#5A3E2B]/10">
      {/* Background Pattern */}
      <div className="absolute top-0 left-0 right-0 h-[46vh] min-h-[380px] lg:h-[48vh] z-0 select-none pointer-events-none border-b border-[#5A3E2B]/10 bg-[#FDFAF3]">
        <Image
          src="/authBg.png"
          alt="Botanical Background"
          fill
          className="object-cover object-[90%_top] md:object-cover md:object-top opacity-100"
          priority
        />
      </div>

      {/* Header Logo */}
      <header className="z-10 relative w-full px-6 py-6 md:px-12 flex justify-center">
        <Link href="/">
          <Image
            src="/TaybeenLogo.png"
            alt="Taybeen Logo"
            width={140}
            height={63}
            className="h-10 md:h-12 w-auto object-contain cursor-pointer"
            priority
          />
        </Link>
      </header>

      {/* Main Content Card */}
      <main className="flex-1 flex items-center justify-center px-4 py-8 sm:py-12 z-10 relative">
        <div className="w-full max-w-[800px] bg-white border border-[#C4A482]/25 rounded-2xl p-6 sm:p-10 shadow-[0_15px_45px_rgba(90,62,43,0.08)] flex flex-col items-center text-center">
          <span className="text-[#F7A503] font-serif text-7xl sm:text-8xl font-bold leading-none select-none tracking-tight">
            404
          </span>

          <h1 className="text-2xl sm:text-[1.75rem] font-serif font-bold text-[#5A3E2B] mt-4 leading-snug">
            Page Not Found
          </h1>

          <p className="text-xs sm:text-sm text-[#8D7F75] font-poppins mt-3 max-w-[340px] leading-relaxed">
            The page you are looking for might have been removed, had its name changed, or is
            temporarily unavailable.
          </p>

          <div className="w-full border-t border-[#C4A482]/15 my-6 sm:my-8" />

          <Link
            href="/"
            className="w-fit bg-[#5A3E2B] hover:bg-[#432E20] text-[#FDFAF3] px-6 py-4 rounded-full font-poppins font-bold text-xs sm:text-sm tracking-wider uppercase transition-all shadow-md active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2"
          >
            <Home size={16} />
            <span>Return to Storefront</span>
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="z-10 relative py-6 text-center select-none font-poppins">
        <p className="text-[11px] sm:text-xs text-brand-brown/50">
          © {new Date().getFullYear()} Taybeen Premium Dates. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
