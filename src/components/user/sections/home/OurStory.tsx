import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Leaf, Apple, Award } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { HighlightCard } from "@/components/ui/HighlightCard";
import { useCustomization } from "@/context/CustomizationContext";

export const OurStory: React.FC = () => {
  const { story } = useCustomization();
  const icons = [Leaf, Apple, Award];
  const highlights = story.highlights.map((h: any, i: number) => ({
    title: h.title,
    desc: h.desc,
    icon: icons[i],
  }));

  return (
    <Section bg="cream" overflowHidden={true}>
      <div className="flex flex-col lg:flex-row items-center lg:items-start gap-10 md:gap-12 lg:gap-16 xl:gap-20">
        <div className="w-full lg:flex-1 lg:max-w-[45%] relative flex justify-center lg:justify-start">
          <div className="w-full max-w-[400px] sm:max-w-[450px] lg:max-w-none aspect-[4/5] sm:aspect-[10/11] lg:h-[480px] xl:h-[520px] 2xl:h-[550px] rounded-2xl lg:rounded-3xl overflow-hidden bg-gray-200 shadow-lg relative">
            <Image
              src={story.imageUrl}
              alt={story.title}
              fill
              sizes="(max-width: 768px) 400px, (max-width: 1024px) 450px, 50vw"
              className="object-cover"
            />
          </div>
        </div>

        <div className="flex-1 w-full space-y-6 sm:space-y-7 md:space-y-8 lg:space-y-9 xl:space-y-10 text-center lg:text-left">
          <div className="space-y-4 sm:space-y-5 md:space-y-6">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-4xl xl:text-5xl font-serif font-bold text-brand-brown">
              {story.title}
            </h2>
            <div className="space-y-3 sm:space-y-4">
              <h3 className="text-lg sm:text-xl md:text-2xl lg:text-xl xl:text-2xl font-serif font-bold text-brand-green">
                {story.subtitle}
              </h3>
              <p className="text-brand-green-dark font-poppins text-sm sm:text-base lg:text-sm xl:text-base leading-relaxed max-w-2xl mx-auto lg:mx-0">
                {story.description}
              </p>
            </div>
            <div className="flex justify-center lg:justify-start">
              <Button
                variant="primary"
                className="rounded-full border border-brand-gold w-full sm:w-auto px-6 sm:px-8 cursor-pointer"
              >
                {story.buttonText}
              </Button>
            </div>
          </div>

          <div className="space-y-3 sm:space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 lg:gap-3 xl:gap-4">
              {highlights.map((h: any, i: number) => (
                <HighlightCard key={i} title={h.title} description={h.desc} icon={h.icon} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};
