/**
 * OurStory Section — Brand story with image, description, CTA, and highlight cards.
 * Migrated from TB-Dualite React project.
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
    <section className="py-16 md:py-24 bg-brand-bg overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-24 flex flex-col lg:flex-row items-center gap-12 lg:gap-32">

        {/* ── Left Column: Image ── */}
        <div className="w-full lg:flex-1 relative flex justify-center">
          <div className="w-full max-w-[500px] aspect-[10/11] md:h-[550px] rounded-2xl overflow-hidden bg-gray-200">
            <img
              src="https://s3-alpha-sig.figma.com/img/67d8/0cc5/654d01deade95e42e47d2afd1c672c85?Expires=1781481600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=EtcZsw8GNS-OxeKl46DCvxfUgEdEpLqCLMMbEUgljhUDaI3YklwMWlpwKXuDs-JHzyXkJu52Gs3oDTkUg2HIP1v1SQLMwcF5Bkdm7NrMo0oA9NEngwz3n9-61GachZN8a0WFEUt5BylQW6xw9GUDN4eh8Nc85bpxeA0O0P9Qux9OXgn~7cIMPvaS1P~IrkD9BikOFKNh~MCDdQbLc~gD4gl9BaD5BPPuTOovtdqnaHAKddVlsFsUSqeNDCxeIHZ66lSgfvB-qm188qIwLMW8LqXXjmy9BXp6D4teladN-PcRRJoAMWK31jWOR4EJOaxKCI1ZbF1KVUPK1A~l9~JaNA__"
              alt="Our Story"
              className="w-full h-full object-cover scale-110"
            />
          </div>
        </div>

        {/* ── Right Column: Text Content + Highlights ── */}
        <div className="flex-1 space-y-8 md:space-y-10 text-center lg:text-left">
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-poppins font-bold text-brand-brown">Our Story</h2>
            <div className="space-y-4">
              <h3 className="text-xl md:text-2xl font-poppins font-bold text-brand-green">Balanced Snacks for an Active Life</h3>
              <p className="text-brand-green-dark font-poppins text-sm md:text-base leading-relaxed">
                At healthy snack store we believe that smart snacking is the key to a balanced life. We curate the finest natural ingredients to create satisfying, nutrients rich snacks that fuel your body and delight your taste buds without compromise. No artificial additives, just pure, wholesome energy to keep you going strong.
              </p>
            </div>
            <Button variant="primary" className="rounded-full border border-brand-gold w-full sm:w-auto">Learn More About Us</Button>
          </div>

          {/* Highlight cards */}
          <div className="space-y-2 border-l-0 lg:border-l border-brand-brown/10">
            {highlights.map((h, i) => (
              <div key={i} className="flex items-center gap-4 p-4 border border-brand-brown/10 rounded-lg mb-2 text-left">
                <div className="w-9 h-9 rounded-full bg-brand-primary flex items-center justify-center text-[#F6F1E9] shrink-0">
                  <CheckCircle2 size={18} />
                </div>
                <div>
                  <h4 className="text-brand-green font-poppins font-bold text-sm md:text-base">{h.title}</h4>
                  <p className="text-brand-green-light font-poppins text-[10px] md:text-xs">{h.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
