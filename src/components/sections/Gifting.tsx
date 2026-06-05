/**
 * Gifting Section — Premium gifting showcase with a 12-column grid layout.
 * Features a main large card and two smaller cards on the right.
 * Migrated from TB-Dualite React project.
 */

export const Gifting: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-brand-green text-white">
      <div className="max-w-7xl mx-auto px-6 md:px-24">

        {/* ── Section Header ── */}
        <div className="mb-12 md:mb-16 space-y-4 md:space-y-6 text-center lg:text-left">
          <div className="inline-block px-4 py-2 rounded-3xl bg-brand-primary border border-[#F6EBDA80] backdrop-blur-sm">
            <span className="text-white font-poppins font-semibold text-xs md:text-sm">Gifting and Occasions</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-poppins font-bold text-brand-primary leading-tight -tracking-[0.03em]">
            The Art of Premium Gifting
          </h2>
        </div>

        {/* ── Gifting Cards Grid (12-column layout) ── */}
        <div className="grid grid-cols-12 gap-4 md:gap-6 h-auto lg:h-[650px]">

          {/* Main Large Card — Festive Diwali Hamper */}
          <div className="col-span-12 lg:col-span-7 bg-white rounded-2xl overflow-hidden relative group min-h-[350px] md:min-h-[450px]">
            <img
              src="https://s3-alpha-sig.figma.com/img/09a7/959c/665a5e022a30a5e6bdac4cdf87b661c6?Expires=1781481600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=LeRFZIoy7Aqv9M6stGfbkh9I7SHqyWO2u8naUp4BiD8FhD89JhOJ0DdUdoZbijwMu8~axfBpjZ-6vFOmMKoX5W0HyfW0NFWUBeSoAp8bcOhDuPNtzyGHVlwzcaIUieiAJpb-JPedY2~vdLBkRiiZEQNn-Nk8QtK8a4nkj7savDNWv4JIKmgekE6721TA0TdvA8uFRJmNjS3-NihN5ElRO-PAbOHGHFHT-u2GsUSsgDpig1OvPm7qbQ3g~IgAuoEYme8wTuJZSZdt6ji3LcYfuT0Lk7xBkEZbl2iAupWf8X66LDUsSxyNfVMX62tzs~uKctN56OQ3Eiz55aIIZagrvA__"
              alt="Festive Diwali Hamper"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {/* "Most Popular" floating badge */}
            <div className="absolute top-4 left-4 md:left-6 px-4 py-2 rounded-3xl bg-gray-400/50 border border-white/50 backdrop-blur-sm">
              <span className="text-white font-poppins text-xs md:text-sm">Most Popular</span>
            </div>
            {/* Bottom info overlay */}
            <div className="absolute bottom-6 md:bottom-10 left-4 md:left-6 bg-stone-500/50 backdrop-blur-md p-4 md:p-6 rounded-2xl border border-white/10 w-[calc(100%-2rem)] md:w-[390px]">
              <p className="text-white font-poppins font-semibold text-[10px] md:text-sm uppercase mb-1 md:mb-2">CELEBRATE WITH SWEETNESS</p>
              <h3 className="text-brand-primary font-poppins font-semibold text-xl md:text-3xl">Festive Diwali Hamper</h3>
            </div>
          </div>

          {/* Right Column — Two stacked cards */}
          <div className="col-span-12 lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 lg:grid-rows-2 gap-4 md:gap-6">

            {/* Premium Date Collection card */}
            <div className="bg-brand-primary rounded-2xl overflow-hidden relative group h-[250px] md:h-auto">
              <img
                src="https://s3-alpha-sig.figma.com/img/adf2/f70a/bf44c05647e6b6c385b5b929b1e66cd5?Expires=1781481600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=Is5mrUedAqnQTmJlXilPLheck97DIIEKPXN6ewWKO8omnkJ319-ivvWavGL6fem9u74U78r~k2LKCq27TLELovKXeq0K9BesUzzl9V2IHb9qwRxmZ4SkKMDTprmgKwnkslJeOfmGpXa9Gley1DUltu8wgBqkP0t-fYq0g43Kb1~lN8fY0Vi8fevR7SkNw44ZiDUwEDvDzk24T6QHQBbudK~pjn4wqbEd5mZoEnq1n6F6Rp7Liwv7zq7hxgaCfwxYwIGh0c9AOZ~bwRUBmr6WNGE2vmUlGcCVfr-KswJgSxpcboNEwEwHkbiNgU~VL9pA0ec5zV6YHutO8Hjiwz73NQ__"
                alt="Premium Date Collection"
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all"
              />
              <div className="absolute top-3 left-3 px-3 py-1.5 md:py-2 rounded-3xl bg-brand-green-light border border-white/50 backdrop-blur-sm">
                <span className="text-white font-poppins text-xs md:text-sm">Best Seller</span>
              </div>
              <h3 className="absolute bottom-4 md:bottom-6 left-4 text-white font-poppins font-semibold text-lg md:text-xl">Premium Date Collection</h3>
            </div>

            {/* Curated Wellness Box card */}
            <div className="bg-brand-primary rounded-2xl overflow-hidden relative group h-[250px] md:h-auto">
              <img
                src="https://s3-alpha-sig.figma.com/img/d4a6/fa5a/8d5d8bcc3afc4b8d1ce862a552272063?Expires=1781481600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=J0Pf7DR5yhcsAhayzXMZi5kywWvrO637siNzabZSZzqHiFo4cwPcnu60G8yP3PmxHwtl0ALpl-cvqLWcUcF476fRLS8rcZ3AvvEF7bEgtowKU4fnBVlSgL3YcR854lh5S~-a8EIiNzdJ9vpUMNt28bvWh7YcT35Lf0YGIFMllwYHk-lLK~3vpVdVx6a8SSSLZPsaGZjrlBWOgF57X6iRZQyJ~5OrUCO2XHFPB8q2gxL9tGInBKOm2zwRMf8C27qeJMQpaq5Ymk~o0Av4VDNJEiqs8fNrcGSw4L4kssJ-548kNcXsnSyZ9JoNGr~CDC6wdk1Oo2G2tsYrhlj3I35Ixw__"
                alt="Curated Wellness Box"
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all"
              />
              <div className="absolute top-3 left-3 px-3 py-1.5 md:py-2 rounded-3xl bg-brand-green border border-white/50 backdrop-blur-sm">
                <span className="text-white font-poppins text-xs md:text-sm">New</span>
              </div>
              <h3 className="absolute bottom-4 md:bottom-6 left-4 text-white font-poppins font-semibold text-lg md:text-xl">Curated Wellness Box</h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
