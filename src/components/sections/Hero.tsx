/**
 * Hero — Landing hero with headline, tagline, CTAs, and dual image grid.
 * Uses framer-motion for floating info card animations.
 */

import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";

export const Hero: React.FC = () => {
  return (
    <section className="relative pt-24 md:pt-32 pb-16 md:pb-20 bg-gradient-to-b from-white to-[#F7A50324] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-24 flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

        {/* ── Left Column: Text Content ── */}
        <div className="flex-1 space-y-6 md:space-y-10 text-center lg:text-left">
          {/* Organic badge */}
          <div className="inline-block px-4 py-2 rounded-3xl bg-brand-primary bg-opacity-25 border border-[#F6EBDA80] backdrop-blur-sm">
            <span className="text-brand-green font-poppins font-semibold text-sm md:text-base">100% Natural &amp; Organic</span>
          </div>

          {/* Main headline */}
          <h1 className="text-5xl md:text-8xl font-poppins font-extrabold leading-[1.1] text-black">
            Rediscover <br className="hidden md:block" />the Power of <br className="hidden md:block" /> <span className="text-brand-primary">Dates.</span>
          </h1>

          {/* Subheading description */}
          <p className="max-w-md mx-auto lg:mx-0 text-base md:text-lg font-poppins text-[#7E7D7A] leading-relaxed">
            Exceptional dates, naturally nurtured to perfection. Pure sweetness with no compromise on quality. A luxurious and healthier alternative to refined sugar.
          </p>

          {/* Italic tagline */}
          <p className="text-base md:text-lg font-poppins font-normal text-brand-green italic">
            One date a day. A lifetime of difference.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 md:gap-5">
            <Button variant="primary" className="w-full sm:w-auto">Explore Collection</Button>
            <Button variant="outline" className="w-full sm:w-auto">Gift Hampers</Button>
          </div>
        </div>

        {/* ── Right Column: Image Grid + Floating Cards ── */}
        <div className="flex-1 relative w-full max-w-[750px] min-h-[450px] md:h-[650px] mt-12 lg:mt-0">

          {/* Top-right image card — Kalmi Dates */}
          <div className="absolute top-0 right-0 w-[240px] md:w-[340px] h-[320px] md:h-[460px] rounded-[32px] md:rounded-[48px] overflow-hidden shadow-premium border-[2.4px] border-brand-primary border-opacity-25 z-0">
            <img
              src="https://s3-alpha-sig.figma.com/img/2dff/23f9/ba8253a209241a43ec270cb9f4d27fab?Expires=1781481600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=sxfvpXon4VjOj23i8LiiF6nyoK6qQnTHCargOpEP0TlrWDowdAcRjUu78QigbLNIudx~iy8qqUbf6y9EJOs6EWLiT-Wg3fNTrggPZx3-uzxPW6bXhNmaAwBbXGqwQM1XmyEB6OruP2gETcHa5-1KG0lYX7xgqEtWIwDbwHGa8ntSye0udtJ2PybNx~XriVAPk87S-Qx3UJUHZqcsxZeCh5ML1mfgCOek1Sw6U21niNGyw3Ny7lRotPUnmDq5i7LxR6n3ZGe-U8g1KmTW5gdW7dQGq5FQEoj9xiei3rV3IPMDxQ9rr~W5vEupLEuotAxebZL1TxcgIBTV05J1k8TjyA__"
              alt="Kalmi Dates"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-green/25 to-transparent" />
            <div className="absolute bottom-6 md:bottom-10 left-6">
              <p className="text-white/80 font-dm font-bold text-[10px] md:text-xs tracking-[0.1em] uppercase">Featured Variety</p>
              <h3 className="text-[#FFEBBC] font-poppins font-extrabold text-xl md:text-2xl">Kalmi Dates</h3>
            </div>
          </div>

          {/* Bottom-left image card — Sukkary Dates */}
          <div className="absolute top-[120px] md:top-[197px] left-0 w-[240px] md:w-[340px] h-[320px] md:h-[460px] rounded-[32px] md:rounded-[48px] overflow-hidden shadow-premium border-[2.4px] border-brand-primary border-opacity-25 z-10">
            <img
              src="https://s3-alpha-sig.figma.com/img/014e/7516/579b84dc7ce36649207b116fdaf381c6?Expires=1781481600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=nM4OhWdZKZv8JVeE27KFn7RbRt04rZ3XxeC3U1DSuyQmqtVn1qfZE9qPxEpQR26ZwhacTT~0Z21T3ugF65zHryrXs~tX2tMdMajs2EN5NukmA0fm~OasK1clgaTQHdlAyOd-AWYPEsWInABQfdsIYMYLzi1wsrhDgyD3hGFgrxauxcSP2R4FZmsah5DiQtreM2eAS9LUZ5lwGUvM~4vbVhUykJh8TBOl3rTNRfE6bjtC2mCiZtHHqJreiYrSWH9aPtMHjJkytEjmSvvDMZoHZNKdXAzPwIsqb7jOn3DC2I5Y9TnGrY-rn8lL1V6iASdn7FozA~tEyW9VrpaPwG30AA__"
              alt="Sukkary Dates"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-green/25 to-transparent" />
            <div className="absolute bottom-6 md:bottom-10 left-6">
              <p className="text-white/80 font-dm font-bold text-[10px] md:text-xs tracking-[0.1em] uppercase">Featured Variety</p>
              <h3 className="text-[#FFEBBC] font-poppins font-extrabold text-xl md:text-2xl">Sukkary Dates</h3>
            </div>
          </div>

          {/* Floating Info Card — Farm-to-table (animated) */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="absolute bottom-10 md:bottom-24 right-4 md:right-40 bg-white/90 backdrop-blur-md border border-brand-primary/25 rounded-xl p-2 md:p-3 flex items-center gap-2 md:gap-3 shadow-lg z-20"
          >
            <div className="text-xl md:text-2xl">🌴</div>
            <div>
              <p className="text-brand-green font-poppins font-semibold text-xs md:text-sm">Farm-to-table</p>
              <p className="text-brand-green-light font-poppins text-[10px] md:text-xs">Saudi · Jordan · Iran</p>
            </div>
          </motion.div>

          {/* Floating Info Card — Natural energy (animated) */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="absolute top-6 md:top-12 right-0 bg-brand-green border border-brand-primary/25 rounded-2xl p-3 md:p-4 shadow-xl z-20 w-24 md:w-32"
          >
            <p className="text-white/60 font-dm font-medium text-[8px] md:text-[10px] uppercase">Natural energy</p>
            <p className="text-brand-primary font-poppins font-extrabold text-lg md:text-2xl">66 kcal</p>
            <p className="text-white/60 font-dm text-[8px] md:text-[10px]">per 3 dates</p>
          </motion.div>

          {/* Center floating "Premium" pill */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 md:w-40 h-12 md:h-16 bg-white/40 backdrop-blur-sm rounded-[42px] flex items-center justify-center shadow-lg border border-white/70 z-20">
            <span className="text-[#222222] font-poppins text-lg md:text-xl">Premium</span>
          </div>
        </div>
      </div>
    </section>
  );
};
