/**
 * OurStory — Brand story with image, description, CTA, and highlight cards.
 */

import { Button } from "@/components/ui/Button";
import { CheckCircle2 } from "lucide-react";

export const OurStory: React.FC = () => {
  /* Highlight cards data — key brand values */
  const highlights = [
    { title: "Mindfully Sourced", desc: "Premium non-GMO ingredients" },
    { title: "Balanced Nutrition", desc: "Diverse range of snack types" },
    { title: "Conscious Choices", desc: "No palm oil, no artificial flavours" },
  ];

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-brand-bg overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 md:px-8 lg:px-10 xl:px-10 2xl:px-12">
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-10 md:gap-12 lg:gap-16 xl:gap-20">

          {/* ── Left Column: Image ── */}
          <div className="w-full lg:flex-1 lg:max-w-[45%] relative flex justify-center lg:justify-start">
            <div className="w-full max-w-[400px] sm:max-w-[450px] lg:max-w-none aspect-[4/5] sm:aspect-[10/11] lg:h-[480px] xl:h-[520px] 2xl:h-[550px] rounded-2xl lg:rounded-3xl overflow-hidden bg-gray-200 shadow-lg">
              <img
                src="https://s3-alpha-sig.figma.com/img/67d8/0cc5/654d01deade95e42e47d2afd1c672c85?Expires=1781481600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=EtcZsw8GNS-OxeKl46DCvxfUgEdEpLqCLMMbEUgljhUDaI3YklwMWlpwKXuDs-JHzyXkJu52Gs3oDTkUg2HIP1v1SQLMwcF5Bkdm7NrMo0oA9NEngwz3n9-61GachZN8a0WFEUt5BylQW6xw9GUDN4eh8Nc85bpxeA0O0P9Qux9OXgn~7cIMPvaS1P~IrkD9BikOFKNh~MCDdQbLc~gD4gl9BaD5BPPuTOovtdqnaHAKddVlsFsUSqeNDCxeIHZ66lSgfvB-qm188qIwLMW8LqXXjmy9BXp6D4teladN-PcRRJoAMWK31jWOR4EJOaxKCI1ZbF1KVUPK1A~l9~JaNA__"
                alt="Our Story"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* ── Right Column: Text Content + Highlights ── */}
          <div className="flex-1 w-full space-y-6 sm:space-y-7 md:space-y-8 lg:space-y-9 xl:space-y-10 text-center lg:text-left">
            {/* Main Content */}
            <div className="space-y-4 sm:space-y-5 md:space-y-6">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-4xl xl:text-5xl font-serif font-bold text-brand-brown">
                Our Story
              </h2>
              <div className="space-y-3 sm:space-y-4">
                <h3 className="text-lg sm:text-xl md:text-2xl lg:text-xl xl:text-2xl font-serif font-bold text-brand-green">
                  Balanced Snacks for an Active Life
                </h3>
                <p className="text-brand-green-dark font-poppins text-sm sm:text-base lg:text-sm xl:text-base leading-relaxed max-w-2xl mx-auto lg:mx-0">
                  At healthy snack store we believe that smart snacking is the key to a balanced life. We curate the finest natural ingredients to create satisfying, nutrients rich snacks that fuel your body and delight your taste buds without compromise. No artificial additives, just pure, wholesome energy to keep you going strong.
                </p>
              </div>
              <div className="flex justify-center lg:justify-start">
                <Button variant="primary" className="rounded-full border border-brand-gold w-full sm:w-auto px-6 sm:px-8">
                  Learn More About Us
                </Button>
              </div>
            </div>

            {/* Highlight cards */}
            <div className="space-y-3 sm:space-y-4">
              {/* Mobile/Tablet: All cards stacked vertically */}
              <div className="flex flex-col gap-3 sm:gap-4 lg:hidden">
                {highlights.map((h, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 sm:gap-4 p-4 sm:p-5 border border-brand-brown/10 rounded-xl bg-white/50 backdrop-blur-sm"
                  >
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-brand-primary flex items-center justify-center text-[#F6F1E9] shrink-0">
                      <CheckCircle2 size={20} className="sm:w-6 sm:h-6" />
                    </div>
                    <div className="text-left">
                      <h4 className="text-brand-green font-poppins font-bold text-sm sm:text-base">
                        {h.title}
                      </h4>
                      <p className="text-brand-green-light font-poppins text-xs sm:text-sm">
                        {h.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Desktop: 2 cards in row, 1 below */}
              <div className="hidden lg:block">
                {/* First row: 2 cards */}
                <div className="grid grid-cols-2 gap-3 xl:gap-4 mb-3 xl:mb-4">
                  {highlights.slice(0, 2).map((h, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 xl:gap-4 p-4 xl:p-5 border border-brand-brown/10 rounded-xl bg-white/50 backdrop-blur-sm"
                    >
                      <div className="w-9 h-9 xl:w-10 xl:h-10 rounded-full bg-brand-primary flex items-center justify-center text-[#F6F1E9] shrink-0">
                        <CheckCircle2 size={18} className="xl:w-5 xl:h-5" />
                      </div>
                      <div className="text-left">
                        <h4 className="text-brand-green font-poppins font-bold text-sm xl:text-base">
                          {h.title}
                        </h4>
                        <p className="text-brand-green-light font-poppins text-xs xl:text-sm">
                          {h.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Second row: 1 card full width */}
                <div className="flex items-center gap-3 xl:gap-4 p-4 xl:p-5 border border-brand-brown/10 rounded-xl bg-white/50 backdrop-blur-sm">
                  <div className="w-9 h-9 xl:w-10 xl:h-10 rounded-full bg-brand-primary flex items-center justify-center text-[#F6F1E9] shrink-0">
                    <CheckCircle2 size={18} className="xl:w-5 xl:h-5" />
                  </div>
                  <div className="text-left">
                    <h4 className="text-brand-green font-poppins font-bold text-sm xl:text-base">
                      {highlights[2].title}
                    </h4>
                    <p className="text-brand-green-light font-poppins text-xs xl:text-sm">
                      {highlights[2].desc}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
