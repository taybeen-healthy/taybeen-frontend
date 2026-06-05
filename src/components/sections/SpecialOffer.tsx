/**
 * SpecialOffer Section — Promotional banner with offer text and image.
 * Migrated from TB-Dualite React project.
 */

export const SpecialOffer: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-brand-bg">
      <div className="max-w-7xl mx-auto px-6 md:px-24 flex flex-col lg:flex-row items-center gap-12 md:gap-20">

        {/* ── Left Column: Offer Text ── */}
        <div className="flex-1 space-y-6 md:space-y-8 text-center lg:text-left">
          <h4 className="text-brand-primary font-poppins font-bold text-2xl md:text-3xl">Special Offer!</h4>
          <h2 className="text-4xl md:text-7xl font-poppins font-bold text-brand-brown leading-[1.1] -tracking-[0.025em]">
            Unlock upto 50% on your first order
          </h2>
          <p className="text-brand-green font-poppins text-lg md:text-xl leading-relaxed">
            Join 8,000+ health-conscious Indian families. <br className="hidden md:block" />
            Get exclusive early access to new varieties, seasonal hampers, and wellness content — straight to your inbox.
          </p>
        </div>

        {/* ── Right Column: Promotional Image ── */}
        <div className="w-full max-w-[344px] aspect-square rounded-2xl overflow-hidden relative">
          <img
            src="https://s3-alpha-sig.figma.com/img/872e/ecfe/b923789118b00da9da7053d0ccee2cbf?Expires=1781481600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=UCZlVwukV~Gf99gJ9tdWNNcdGp99KTJQyy8HgNYWaw2OccoU-L81mX3qa6BcpPsLgd4NLOULMIuSqgFIAnasNhb2WRo4o42kzPrTIKlrzMIxiTTuHFvHETO4JqyLSpTd-2P2ZXd-91xMQa4YUq5sOmKq70kFS3PP4NHEhq4M2folPJjlZTBHfRar4vIzd9MvAT~DDQelGxzC37PDlBuUCL0VgYZQIwwOJYWsOeeq9b9oMo1Y2VHjtsjB8nblK0jI~rJap2SyV2sDnBXCEaQ7w7yMhiQ01L0lGa~BG3NOqJgTsOKZA3yMNJuYXfwRd71Hqz-f1LbS~1e0mzcfswOx6Q__"
            alt="Dates Bowl"
            className="w-full h-full object-cover scale-150 translate-x-[-10%] translate-y-[-10%]"
          />
        </div>
      </div>
    </section>
  );
};
