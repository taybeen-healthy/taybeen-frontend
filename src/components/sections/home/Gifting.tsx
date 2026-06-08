import React from "react";
import Image from "next/image";

export const Gifting: React.FC = () => {
  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-[#24351F] text-white">
      <div className="max-w-[1440px] mx-auto px-6 md:px-8 lg:px-10 xl:px-10 2xl:px-12">
        <div className="grid grid-cols-12 gap-6 md:gap-8 h-auto lg:h-[480px] xl:h-[540px] 2xl:h-[600px]">

          <div className="col-span-12 lg:col-span-7 flex flex-col lg:h-full justify-between gap-6 lg:gap-8 lg:min-h-0">

            <div className="space-y-3 md:space-y-4 text-center lg:text-left flex-shrink-0">
              <div className="inline-block px-4 py-1.5 rounded-full bg-brand-primary">
                <span className="text-white font-poppins font-semibold text-xs md:text-sm uppercase tracking-wider">
                  Gifting and Occasions
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[2.75rem] xl:text-[3.25rem] font-serif font-bold text-white leading-tight">
                The Art of <span className="text-[#F7A503] font-serif">Premium</span> <br className="hidden lg:block" />
                <span className="text-[#F7A503] font-serif">Gifting</span>
              </h2>
            </div>

            <div className="bg-white rounded-2xl overflow-hidden relative group min-h-[400px] lg:min-h-0 lg:flex-1">
              <Image
                src="https://s3-alpha-sig.figma.com/img/09a7/959c/665a5e022a30a5e6bdac4cdf87b661c6?Expires=1781481600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=LeRFZIoy7Aqv9M6stGfbkh9I7SHqyWO2u8naUp4BiD8FhD89JhOJ0DdUdoZbijwMu8~axfBpjZ-6vFOmMKoX5W0HyfW0NFWUBeSoAp8bcOhDuPNtzyGHVlwzcaIUieiAJpb-JPedY2~vdLBkRiiZEQNn-Nk8QtK8a4nkj7savDNWv4JIKmgekE6721TA0TdvA8uFRJmNjS3-NihN5ElRO-PAbOHGHFHT-u2GsUSsgDpig1OvPm7qbQ3g~IgAuoEYme8wTuJZSZdt6ji3LcYfuT0Lk7xBkEZbl2iAupWf8X66LDUsSxyNfVMX62tzs~uKctN56OQ3Eiz55aIIZagrvA__"
                alt="Festive Diwali Hamper"
                fill
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute top-4 left-4 md:top-6 md:left-6 px-3.5 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30">
                <span className="text-white font-poppins text-xs md:text-sm font-semibold">Most Popular</span>
              </div>
              <div className="absolute bottom-6 left-6 right-6 bg-black/40 backdrop-blur-md p-4 md:p-5 rounded-2xl border border-white/10 max-w-[420px]">
                <p className="text-white/80 font-poppins font-medium text-[10px] md:text-xs uppercase tracking-wider mb-1">
                  CELEBRATE WITH SWEETNESS
                </p>
                <h3 className="text-[#F7A503] font-serif font-bold text-xl md:text-2xl">
                  Festive Diwali Hamper
                </h3>
              </div>
            </div>

          </div>

          <div className="col-span-12 lg:col-span-5 flex flex-col gap-6 lg:h-full justify-between lg:min-h-0">

            <div className="bg-brand-primary rounded-2xl overflow-hidden relative group w-full h-[220px] sm:h-[260px] lg:h-full lg:flex-1 lg:min-h-0">
              <Image
                src="https://s3-alpha-sig.figma.com/img/adf2/f70a/bf44c05647e6b6c385b5b929b1e66cd5?Expires=1781481600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=Is5mrUedAqnQTmJlXilPLheck97DIIEKPXN6ewWKO8omnkJ319-ivvWavGL6fem9u74U78r~k2LKCq27TLELovKXeq0K9BesUzzl9V2IHb9qwRxmZ4SkKMDTprmgKwnkslJeOfmGpXa9Gley1DUltu8wgBqkP0t-fYq0g43Kb1~lN8fY0Vi8fevR7SkNw44ZiDUwEDvDzk24T6QHQBbudK~pjn4wqbEd5mZoEnq1n6F6Rp7Liwv7zq7hxgaCfwxYwIGh0c9AOZ~bwRUBmr6WNGE2vmUlGcCVfr-KswJgSxpcboNEwEwHkbiNgU~VL9pA0ec5zV6YHutO8Hjiwz73NQ__"
                alt="Premium Date Collection"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover opacity-90 group-hover:opacity-100 transition-all duration-500 group-hover:scale-105"
              />
              <div className="absolute top-4 left-4 px-3.5 py-1.5 rounded-full bg-brand-green-light/80 backdrop-blur-sm">
                <span className="text-white font-poppins text-xs md:text-sm font-semibold">Best Seller</span>
              </div>
              <h3 className="absolute bottom-4 left-4 md:bottom-6 md:left-6 text-white font-serif font-bold text-lg md:text-xl xl:text-2xl">
                Premium Date Collection
              </h3>
            </div>

            <div className="bg-brand-primary rounded-2xl overflow-hidden relative group w-full h-[220px] sm:h-[260px] lg:h-full lg:flex-1 lg:min-h-0">
              <Image
                src="https://s3-alpha-sig.figma.com/img/d4a6/fa5a/8d5d8bcc3afc4b8d1ce862a552272063?Expires=1781481600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=J0Pf7DR5yhcsAhayzXMZi5kywWvrO637siNzabZSZzqHiFo4cwPcnu60G8yP3PmxHwtl0ALpl-cvqLWcUcF476fRLS8rcZ3AvvEF7bEgtowKU4fnBVlSgL3YcR854lh5S~-a8EIiNzdJ9vpUMNt28bvWh7YcT35Lf0YGIFMllwYHk-lLK~3vpVdVx6a8SSSLZPsaGZjrlBWOgF57X6iRZQyJ~5OrUCO2XHFPB8q2gxL9tGInBKOm2zwRMf8C27qeJMQpaq5Ymk~o0Av4VDNJEiqs8fNrcGSw4L4kssJ-548kNcXsnSyZ9JoNGr~CDC6wdk1Oo2G2tsYrhlj3I35Ixw__"
                alt="Curated Wellness Box"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover opacity-90 group-hover:opacity-100 transition-all duration-500 group-hover:scale-105"
              />
              <div className="absolute top-4 left-4 px-3.5 py-1.5 rounded-full bg-brand-green/80 backdrop-blur-sm">
                <span className="text-white font-poppins text-xs md:text-sm font-semibold">New</span>
              </div>
              <h3 className="absolute bottom-4 left-4 md:bottom-6 md:left-6 text-white font-serif font-bold text-lg md:text-xl xl:text-2xl">
                Curated Wellness Box
              </h3>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
