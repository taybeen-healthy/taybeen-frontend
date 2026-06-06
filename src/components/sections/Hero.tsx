/**
 * Hero — Landing hero with headline, tagline, CTAs, and dual image grid.
 * Uses framer-motion for floating info card animations.
 */

import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";

export const Hero: React.FC = () => {
  return (
    <section className="relative pt-24 md:pt-32 pb-16 md:pb-20 bg-gradient-to-b from-white to-[#F7A50324] overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 md:px-8 lg:px-10 xl:px-10 2xl:px-12">
        <div className="flex flex-col-reverse lg:flex-row items-center lg:items-start gap-12 lg:gap-12 xl:gap-0">
          {/* ── Left Column: Text Content ── */}
          <div className="flex-1 w-full lg:w-auto space-y-6 md:space-y-8 lg:space-y-6 xl:space-y-7 2xl:space-y-8 text-center lg:text-left lg:pr-4 xl:pr-8">
            {/* Organic badge */}
            <div className="inline-block px-4 py-2 rounded-3xl bg-brand-primary bg-opacity-25 border border-[#F6EBDA80] backdrop-blur-sm">
              <span className="text-brand-green font-poppins font-semibold text-sm md:text-base">
                100% Natural &amp; Organic
              </span>
            </div>

            {/* Main headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-serif font-bold leading-[1.1] text-black">
              Rediscover <br className="hidden md:block" />
              the Power of <br className="hidden md:block" />{" "}
              <span className="text-brand-primary font-serif">Dates.</span>
            </h1>

            {/* Subheading description */}
            <p className="max-w-md lg:max-w-md xl:max-w-lg 2xl:max-w-xl mx-auto lg:mx-0 text-base md:text-lg lg:text-base xl:text-base 2xl:text-lg font-poppins text-[#7E7D7A] leading-relaxed">
              Exceptional dates, naturally nurtured to perfection. Pure sweetness
              with no compromise on quality. A luxurious and healthier alternative
              to refined sugar.
            </p>

            {/* Italic tagline */}
            <p className="text-base md:text-lg lg:text-base xl:text-base 2xl:text-lg font-serif font-medium text-brand-green italic">
              One date a day. A lifetime of difference.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 md:gap-5">
              <Button variant="primary" className="w-full sm:w-auto">
                Explore Collection
              </Button>
              <Button variant="outline" className="w-full sm:w-auto">
                Gift Hampers
              </Button>
            </div>
          </div>

          {/* ── Right Column: Image Grid + Floating Cards ── */}
          <div className="flex-1 w-full lg:w-auto relative min-h-[400px] sm:min-h-[450px] lg:h-[460px] xl:h-[500px] 2xl:h-[540px] mt-6 lg:mt-0">

            {/* Top-left small card — Ajwa Dates */}
            <div className="absolute top-0 left-[20px] lg:top-0 lg:left-0 w-[80px] lg:w-[80px] xl:w-[85px] 2xl:w-[90px] h-[80px] lg:h-[80px] xl:h-[85px] 2xl:h-[90px] rounded-[16px] lg:rounded-[18px] xl:rounded-[20px] overflow-hidden border-[1.6px] lg:border-[2px] border-brand-primary border-opacity-25 shadow-sm lg:shadow-premium z-10">
              <img
                src="https://s3-alpha-sig.figma.com/img/cc9f/1b5e/6a2aa10b77d50a2a53738530eff845ba?Expires=1781481600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=qOl3te8RaPpOlSzb5JgnonWzVXkzOH6Ne0kbNCLfQovaOI7RO3Efx2P5QyVeYfX1qY4Zt19fzQNN4lnGmmHGTVvSQUsUFb1o40nwm5HX2hnHZjEGMQTB249bzyF5iUbC4HZN9lvxfXg1qmpxyF8469nXK9ZCRUEjt7hK2mzHWHIVy-UI~pptewnZ0EwyCEcmiU1N4cy4SpV-qrQCshdC8z2GmEsTIBboOjyLOvW2DjjF4oxmmc-cbFDuYIwYOFaG8qA46Ga6vjrF2mtI-FXg6xbhfa6oPBIy0JocersSl4nIDA6Cxp1W9gUJ7e91uH7FyY~O9eDriLkolsm~LYFrSA__"
                alt="Ajwa Dates"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Top-right image card — Kalmi Dates */}
            <div className="absolute top-[40px] left-1/2 -translate-x-1/2 lg:translate-x-0 lg:left-auto lg:top-[25px] lg:right-0 w-[220px] lg:w-[210px] xl:w-[245px] 2xl:w-[270px] h-[300px] lg:h-[280px] xl:h-[320px] 2xl:h-[350px] rounded-[24px] lg:rounded-[32px] xl:rounded-[40px] overflow-hidden shadow-premium border-[2.4px] lg:border-[2px] border-brand-primary border-opacity-25 z-10">
              <img
                src="https://s3-alpha-sig.figma.com/img/2dff/23f9/ba8253a209241a43ec270cb9f4d27fab?Expires=1781481600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=sxfvpXon4VjOj23i8LiiF6nyoK6qQnTHCargOpEP0TlrWDowdAcRjUu78QigbLNIudx~iy8qqUbf6y9EJOs6EWLiT-Wg3fNTrggPZx3-uzxPW6bXhNmaAwBbXGqwQM1XmyEB6OruP2gETcHa5-1KG0lYX7xgqEtWIwDbwHGa8ntSye0udtJ2PybNx~XriVAPk87S-Qx3UJUHZqcsxZeCh5ML1mfgCOek1Sw6U21niNGyw3Ny7lRotPUnmDq5i7LxR6n3ZGe-U8g1KmTW5gdW7dQGq5FQEoj9xiei3rV3IPMDxQ9rr~W5vEupLEuotAxebZL1TxcgIBTV05J1k8TjyA__"
                alt="Kalmi Dates"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-green/25 to-transparent" />
              <div className="absolute bottom-3 lg:bottom-4 xl:bottom-5 left-3 lg:left-4 xl:left-5">
                <p className="text-white/80 font-dm font-bold text-[10px] lg:text-[8px] xl:text-[10px] tracking-[0.1em] uppercase">
                  Featured Variety
                </p>
                <h3 className="text-[#FFEBBC] font-serif font-bold text-lg lg:text-lg xl:text-xl">
                  Kalmi Dates
                </h3>
              </div>
            </div>

            {/* Bottom-left image card — Sukkary Dates (Hidden on mobile/tablet) */}
            <div className="hidden lg:block absolute lg:top-[175px] xl:top-[185px] 2xl:top-[195px] lg:left-[70px] xl:left-[85px] 2xl:left-[95px] lg:w-[210px] xl:w-[245px] 2xl:w-[270px] lg:h-[280px] xl:h-[310px] 2xl:h-[340px] lg:rounded-[32px] xl:rounded-[40px] overflow-hidden shadow-premium lg:border-[2px] border-brand-primary border-opacity-25 z-[5]">
              <img
                src="https://s3-alpha-sig.figma.com/img/014e/7516/579b84dc7ce36649207b116fdaf381c6?Expires=1781481600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=nM4OhWdZKZv8JVeE27KFn7RbRt04rZ3XxeC3U1DSuyQmqtVn1qfZE9qPxEpQR26ZwhacTT~0Z21T3ugF65zHryrXs~tX2tMdMajs2EN5NukmA0fm~OasK1clgaTQHdlAyOd-AWYPEsWInABQfdsIYMYLzi1wsrhDgyD3hGFgarxauxcSP2R4FZmsah5DiQtreM2eAS9LUZ5lwGUvM~4vbVhUykJh8TBOl3rTNRfE6bjtC2mCiZtHHqJreiYrSWH9aPtMHjJkytEjmSvvDMZoHZNKdXAzPwIsqb7jOn3DC2I5Y9TnGrY-rn8lL1V6iASdn7FozA~tEyW9VrpaPwG30AA__"
                alt="Sukkary Dates"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-green/25 to-transparent" />
              <div className="absolute bottom-3 lg:bottom-4 xl:bottom-5 left-3 lg:left-4 xl:left-5">
                <p className="text-white/80 font-dm font-bold text-[10px] lg:text-[8px] xl:text-[10px] tracking-[0.1em] uppercase">
                  Featured Variety
                </p>
                <h3 className="text-[#FFEBBC] font-serif font-bold text-lg lg:text-lg xl:text-xl">
                  Sukkary Dates
                </h3>
              </div>
            </div>

            {/* Bottom-right small card — Safawi Dates */}
            <div className="absolute bottom-[30px] right-[20px] lg:bottom-[5px] lg:right-[5px] xl:bottom-[5px] xl:right-[10px] 2xl:bottom-[5px] 2xl:right-[10px] w-[80px] lg:w-[80px] xl:w-[85px] 2xl:w-[90px] h-[80px] lg:h-[80px] xl:h-[85px] 2xl:h-[90px] rounded-[16px] lg:rounded-[18px] xl:rounded-[20px] overflow-hidden border-[1.6px] lg:border-[2px] border-brand-primary border-opacity-25 shadow-sm lg:shadow-premium z-10">
              <img
                src="https://s3-alpha-sig.figma.com/img/4899/d334/711770072c9bfcfcf8508aa89b253dc0?Expires=1781481600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=SLlbyyUfITqA37JRfy5Q7hfABOEHkYU-OweiBylX4UBGM5lRQa6tAT79ytldlaTt0bw~-t63uYKIgeH17HpirLrYsCoMOKVUJCOFjXeJAGr887flJQLvSOySwzOCMfGIS6lcDJj1fonNJLWjPKSv2D-vKs4ztDfn3YPqeSVmDw2N-N648VlUc3yB3BABeiAiDy9yrmICpZc4ot0~GEYew6Arok0Biqo0y848vohmvmZ41DL1DK6yAyQxSZNoGI7ps3GlYQs6XkFomZ4nwtaGJn1-dMyt9GvURJuj-nLvxaRW-VMV70HoUsEv69MGtJbgA6WJkLLgag8hEwhteJv52Q__"
                alt="Safawi Dates"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Floating Info Card — Farm-to-table (animated) */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="absolute bottom-[50px] left-[15px] lg:bottom-[60px] lg:left-[110px] xl:bottom-[65px] xl:left-[135px] 2xl:bottom-[70px] 2xl:left-[150px] bg-white/90 backdrop-blur-md border border-brand-primary/25 rounded-xl p-2 lg:p-2 xl:p-2.5 flex items-center gap-2 lg:gap-2 xl:gap-2.5 shadow-lg z-20"
            >
              <div className="text-xl lg:text-xl xl:text-2xl">🌴</div>
              <div>
                <p className="text-brand-green font-poppins font-semibold text-xs lg:text-[11px] xl:text-sm">
                  Farm-to-table
                </p>
                <p className="text-brand-green-light font-poppins text-[10px] lg:text-[9px] xl:text-xs">
                  Saudi · Jordan · Iran
                </p>
              </div>
            </motion.div>

            {/* Floating Info Card — Natural energy (animated) */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="absolute top-[60px] right-[10px] lg:top-[10px] lg:right-[5px] xl:top-[10px] xl:right-[10px] 2xl:top-[10px] 2xl:right-[10px] bg-brand-green border border-brand-primary/25 rounded-2xl p-2.5 lg:p-2 xl:p-2.5 shadow-xl z-20 w-24 lg:w-[90px] xl:w-[100px] 2xl:w-[105px]"
            >
              <p className="text-white/60 font-dm font-medium text-[8px] lg:text-[9px] xl:text-[10px] uppercase">
                Natural energy
              </p>
              <p className="text-brand-primary font-poppins font-extrabold text-lg lg:text-lg xl:text-xl">
                66 kcal
              </p>
              <p className="text-white/60 font-dm text-[8px] lg:text-[9px] xl:text-[10px]">
                per 3 dates
              </p>
            </motion.div>

            {/* Center floating "Premium" pill (Hidden on mobile/tablet) */}
            <div className="hidden lg:flex absolute lg:top-[25px] lg:left-[90px] xl:top-[28px] xl:left-[105px] 2xl:top-[30px] 2xl:left-[115px] lg:w-[100px] xl:w-[110px] 2xl:w-[120px] lg:h-[38px] xl:h-[42px] 2xl:h-[46px] bg-white/40 backdrop-blur-sm rounded-[42px] items-center justify-center shadow-lg border border-white/70 z-20">
              <span className="text-[#222222] font-poppins lg:text-sm xl:text-base">
                Premium
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
