"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { Tag } from "@/components/ui/Tag";
import { useCustomization } from "@/context/CustomizationContext";
import { homeData } from "@/data/user/homeData";

export const Hero: React.FC = () => {
  const router = useRouter();
  const { hero } = useCustomization();

  const ajwaImage = hero.heroImages?.[0] || homeData.hero.varieties.ajwa.image;
  const kalmiImage = hero.heroImages?.[1] || homeData.hero.varieties.kalmi.image;
  const sukkaryImage = hero.heroImages?.[2] || homeData.hero.varieties.sukkary.image;
  const safawiImage = hero.heroImages?.[3] || homeData.hero.varieties.safawi.image;

  const farmTitle = hero.farmTitle || homeData.hero.badges.farmToTableTitle;
  const farmDesc = hero.farmDesc || homeData.hero.badges.farmToTableDesc;
  const energyTitle = hero.energyTitle || homeData.hero.badges.energyTitle;
  const energyValue = hero.energyValue || homeData.hero.badges.energyValue;
  const energyDesc = hero.energyDesc || homeData.hero.badges.energyDesc;

  return (
    <Section
      bg="none"
      overflowHidden={true}
      className="relative pt-20 sm:pt-24 md:pt-28 lg:pt-28 pb-10 sm:pb-10 md:pb-14 lg:pb-16"
    >
      <div className="flex flex-col-reverse lg:flex-row items-start lg:items-center gap-12 lg:gap-8 xl:gap-0">
        <div className="flex-1 w-full lg:w-auto space-y-6 md:space-y-8 lg:space-y-6 xl:space-y-7 2xl:space-y-8 text-left lg:text-left lg:pr-0">
          <Tag variant="primary-light" className="px-4 py-2 text-sm md:text-base">
            {hero.tag || homeData.hero.tag}
          </Tag>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-serif font-bold leading-[1.1] text-[#5A4200]">
            {hero.heading || "Rediscover the Power of"} <br className="hidden md:block" />{" "}
            <span className="text-brand-primary font-serif">{hero.heading2 || "Dates."}</span>
          </h1>

          <p className="max-w-md lg:max-w-md xl:max-w-lg 2xl:max-w-xl lg:mx-0 text-base md:text-lg lg:text-base xl:text-base 2xl:text-lg font-poppins text-[#7E7D7A] leading-relaxed">
            {hero.description || homeData.hero.description}
          </p>

          <p className="text-base md:text-lg lg:text-base xl:text-base 2xl:text-lg font-serif font-medium text-brand-green">
            {hero.tagline || homeData.hero.tagline}
          </p>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-start gap-4 md:gap-5">
            <Button
              onClick={() => router.push("/products")}
              variant="primary"
              className="w-48 md:w-auto px-6 justify-center"
            >
              {hero.buttons?.primary || homeData.hero.buttons.primary}
            </Button>
            <Button
              onClick={() => router.push("/products")}
              variant="outline"
              className="w-48 md:w-auto px-6 justify-center"
            >
              {hero.buttons?.outline || homeData.hero.buttons.outline}
            </Button>
          </div>
        </div>

        <div className="flex-1 w-full max-w-[360px] sm:max-w-[400px] md:max-w-[540px] lg:max-w-[540px] xl:max-w-[600px] 2xl:max-w-[660px] mx-auto relative min-h-[460px] sm:min-h-[500px] md:h-[480px] lg:h-[475px] xl:h-[520px] 2xl:h-[575px] mt-6 lg:mt-0">
          <div className="absolute top-0 left-0 w-[105px] h-[105px] sm:w-[115px] sm:h-[115px] rounded-[22px] border-[2px] border-[#FFDA8C] shadow-sm z-20 overflow-hidden md:top-[20px] md:left-[170px] md:w-[80px] md:h-[80px] md:rounded-[20px] md:border-[2px] lg:top-[16px] lg:left-[150px] lg:w-[80px] lg:h-[80px] lg:rounded-[20px] xl:top-[18px] xl:left-[170px] xl:w-[90px] xl:h-[90px] xl:rounded-[22px] 2xl:top-[20px] 2xl:left-[190px] 2xl:w-[100px] 2xl:h-[100px] 2xl:rounded-[24px]">
            <Image
              src={ajwaImage}
              alt={homeData.hero.varieties.ajwa.name}
              fill
              sizes="(max-width: 768px) 115px, (max-width: 1024px) 80px, 100px"
              className="object-cover"
            />
          </div>

          <div className="absolute top-[28px] left-1/2 -translate-x-1/2 w-[285px] sm:w-[320px] h-[390px] sm:h-[420px] rounded-[36px] sm:rounded-[40px] border-[2px] border-[#FFDA8C] shadow-premium z-10 overflow-hidden md:translate-x-0 md:left-auto md:right-[10px] md:top-[20px] md:w-[240px] md:h-[340px] md:rounded-[36px] md:border-[2px] lg:top-[16px] lg:right-[10px] lg:w-[240px] lg:h-[340px] lg:rounded-[36px] xl:top-[18px] xl:right-[12px] xl:w-[270px] xl:h-[380px] xl:rounded-[42px] 2xl:top-[20px] 2xl:right-[15px] 2xl:w-[300px] 2xl:h-[420px] 2xl:rounded-[46px]">
            <Image
              src={kalmiImage}
              alt={homeData.hero.varieties.kalmi.name}
              fill
              sizes="(max-width: 640px) 285px, (max-width: 768px) 320px, (max-width: 1024px) 240px, 300px"
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
            <div className="absolute bottom-4 lg:bottom-5 xl:bottom-6 left-4 lg:left-5 xl:left-6">
              <p className="text-white/80 font-poppins font-semibold text-[9px] md:text-[10px] lg:text-[10px] xl:text-[11px] 2xl:text-[12px] tracking-[0.15em] uppercase">
                Featured Variety
              </p>
              <h3 className="text-[#FFEBBC] font-serif font-bold text-lg md:text-xl lg:text-[20px] xl:text-[24px] 2xl:text-[28px] mt-0.5 md:mt-1">
                {homeData.hero.varieties.kalmi.name}
              </h3>
            </div>
          </div>

          <div className="hidden md:block absolute md:top-[120px] md:left-[10px] md:w-[240px] md:h-[340px] md:rounded-[36px] md:border-[2px] border-[#FFDA8C] shadow-premium z-[5] overflow-hidden lg:top-[115px] lg:left-[10px] lg:w-[240px] lg:h-[340px] lg:rounded-[36px] xl:top-[125px] xl:left-[12px] xl:w-[270px] xl:h-[380px] xl:rounded-[42px] 2xl:top-[135px] 2xl:left-[15px] 2xl:w-[300px] 2xl:h-[420px] 2xl:rounded-[46px]">
            <Image
              src={sukkaryImage}
              alt={homeData.hero.varieties.sukkary.name}
              fill
              sizes="(max-width: 768px) 240px, (max-width: 1024px) 240px, 300px"
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
            <div className="absolute bottom-4 lg:bottom-5 xl:bottom-6 left-4 lg:left-5 xl:left-6">
              <p className="text-white/80 font-poppins font-semibold text-[9px] md:text-[10px] lg:text-[10px] xl:text-[11px] 2xl:text-[12px] tracking-[0.15em] uppercase">
                Featured Variety
              </p>
              <h3 className="text-[#FFEBBC] font-serif font-bold text-lg md:text-xl lg:text-[20px] xl:text-[24px] 2xl:text-[28px] mt-0.5 md:mt-1">
                {homeData.hero.varieties.sukkary.name}
              </h3>
            </div>
          </div>

          <div className="absolute bottom-0 right-0 w-[105px] h-[105px] sm:w-[115px] sm:h-[115px] rounded-[22px] border-[2px] border-[#FFDA8C] shadow-sm z-20 overflow-hidden md:bottom-[80px] md:right-[-30px] md:w-[80px] md:h-[80px] md:rounded-[20px] md:border-[2px] lg:bottom-[40px] lg:right-[0px] lg:w-[80px] lg:h-[80px] lg:rounded-[18px] xl:bottom-[45px] xl:right-[0px] xl:w-[90px] xl:h-[90px] xl:rounded-[20px] 2xl:bottom-[50px] 2xl:right-[0px] 2xl:w-[100px] 2xl:h-[100px] 2xl:rounded-[22px]">
            <Image
              src={safawiImage}
              alt={homeData.hero.varieties.safawi.name}
              fill
              sizes="(max-width: 768px) 115px, (max-width: 1024px) 80px, 100px"
              className="object-cover"
            />
          </div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="absolute bottom-3 left-1 bg-brand-bg/95 backdrop-blur-sm border border-[#EADFC9] rounded-xl px-3.5 py-2 flex items-center gap-2 shadow-lg z-30 md:bottom-[40px] md:left-[290px] md:px-4 md:py-2 md:right-auto lg:bottom-[20px] lg:left-[220px] xl:bottom-[25px] xl:left-[250px] 2xl:bottom-[30px] 2xl:left-[280px]"
          >
            <div className="text-xl lg:text-xl xl:text-2xl">🌴</div>
            <div>
              <p className="text-brand-green font-poppins font-semibold text-xs lg:text-[11px] xl:text-sm leading-tight">
                {farmTitle}
              </p>
              <p className="text-brand-green-light font-poppins text-[10px] lg:text-[9px] xl:text-xs mt-0.5 leading-none">
                {farmDesc}
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="absolute top-[48px] right-0 w-[110px] sm:w-[120px] bg-[#2C3A1A] rounded-[18px] p-2.5 text-center shadow-xl z-30 md:top-[80px] md:right-[-30px] md:w-[110px] md:h-[80px] md:flex md:flex-col md:justify-center lg:top-[60px] lg:right-[0px] lg:w-[110px] lg:h-[80px] xl:top-[70px] xl:right-[0px] xl:w-[120px] xl:h-[85px] 2xl:top-[80px] 2xl:right-[0px] 2xl:w-[130px] 2xl:h-[90px]"
          >
            <p className="text-white/70 font-poppins font-medium text-[8px] md:text-[9px] lg:text-[10px] xl:text-[11px] 2xl:text-[12px] leading-tight">
              {energyTitle}
            </p>
            <p className="text-brand-primary font-poppins font-bold text-sm md:text-[20px] lg:text-[20px] xl:text-[22px] 2xl:text-[24px] leading-none my-1">
              {energyValue}
            </p>
            <p className="text-white/70 font-poppins font-normal text-[8px] md:text-[9px] lg:text-[10px] xl:text-[11px] 2xl:text-[12px]">
              {energyDesc}
            </p>
          </motion.div>

          <div className="hidden md:flex absolute md:top-[40px] md:left-[80px] md:w-[110px] md:h-[40px] bg-white backdrop-blur-sm rounded-[42px] items-center justify-center shadow-premium border border-white/70 z-30 lg:top-[36px] lg:left-[60px] lg:w-[110px] lg:h-[40px] xl:top-[38px] xl:left-[70px] xl:w-[120px] xl:h-[44px] 2xl:top-[42px] 2xl:left-[80px] 2xl:w-[130px] 2xl:h-[48px]">
            <span className="text-[#222222] font-poppins font-medium text-xs md:text-sm lg:text-sm xl:text-base">
              {homeData.hero.badges.premiumLabel}
            </span>
          </div>
        </div>
      </div>
    </Section>
  );
};
