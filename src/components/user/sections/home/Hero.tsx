"use client";

import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { Tag } from "@/components/ui/Tag";
import { useCustomization } from "@/context/CustomizationContext";

export const Hero: React.FC = () => {
  const { hero } = useCustomization();

  return (
    <Section
      bg="none"
      overflowHidden={true}
      className="relative pt-24 sm:pt-24 md:pt-32 lg:pt-32 pb-8 sm:pb-8 md:pb-20 lg:pb-20"
    >
      <div className="flex flex-col-reverse lg:flex-row items-center lg:items-start gap-12 lg:gap-12 xl:gap-0">
        <div className="flex-1 w-full lg:w-auto space-y-6 md:space-y-8 lg:space-y-6 xl:space-y-7 2xl:space-y-8 text-center lg:text-left lg:pr-4 xl:pr-8">
          <Tag variant="primary-light" className="px-4 py-2 text-sm md:text-base">
            {hero.tag}
          </Tag>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-serif font-bold leading-[1.1] text-[#5A4200]">
            Rediscover <br className="hidden md:block" />
            the Power of <br className="hidden md:block" />{" "}
            <span className="text-brand-primary font-serif">Dates.</span>
          </h1>

          <p className="max-w-md lg:max-w-md xl:max-w-lg 2xl:max-w-xl mx-auto lg:mx-0 text-base md:text-lg lg:text-base xl:text-base 2xl:text-lg font-poppins text-[#7E7D7A] leading-relaxed">
            {hero.description}
          </p>

          <p className="text-base md:text-lg lg:text-base xl:text-base 2xl:text-lg font-serif font-medium text-brand-green">
            {hero.tagline}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 md:gap-5">
            <Button variant="primary" className="w-full sm:w-auto">
              {hero.buttons.primary}
            </Button>
            <Button variant="outline" className="w-full sm:w-auto">
              {hero.buttons.outline}
            </Button>
          </div>
        </div>

        <div className="flex-1 w-full max-w-[340px] sm:max-w-[380px] md:max-w-[540px] lg:max-w-[580px] xl:max-w-[640px] 2xl:max-w-[700px] mx-auto relative min-h-[420px] sm:min-h-[460px] md:h-[480px] lg:h-[515px] xl:h-[570px] 2xl:h-[620px] mt-6 lg:mt-0">
          <div className="absolute top-0 left-[20px] w-[80px] h-[80px] rounded-[16px] border-[1.6px] border-[#FFDA8C] shadow-sm z-20 overflow-hidden md:top-[20px] md:left-[170px] md:w-[80px] md:h-[80px] md:rounded-[20px] md:border-[2px] lg:top-[21px] lg:left-[182px] lg:w-[86px] lg:h-[86px] lg:rounded-[22px] xl:top-[24px] xl:left-[201px] xl:w-[95px] xl:h-[95px] xl:rounded-[24px] 2xl:top-[26px] 2xl:left-[220px] 2xl:w-[104px] 2xl:h-[104px] 2xl:rounded-[26px]">
            <Image
              src={hero.varieties.ajwa.image}
              alt={hero.varieties.ajwa.name}
              fill
              sizes="(max-width: 768px) 80px, (max-width: 1024px) 86px, 104px"
              className="object-cover"
            />
          </div>

          <div className="absolute top-[40px] left-1/2 -translate-x-1/2 w-[220px] h-[300px] rounded-[24px] border-[1.6px] border-[#FFDA8C] shadow-premium z-10 overflow-hidden md:translate-x-0 md:left-auto md:right-[10px] md:top-[20px] md:w-[240px] md:h-[340px] md:rounded-[36px] md:border-[2px] lg:top-[21px] lg:right-[11px] lg:w-[258px] lg:h-[365px] lg:rounded-[40px] xl:top-[24px] xl:right-[12px] xl:w-[284px] xl:h-[404px] xl:rounded-[44px] 2xl:top-[26px] 2xl:right-[13px] 2xl:w-[310px] 2xl:h-[440px] 2xl:rounded-[48px]">
            <Image
              src={hero.varieties.kalmi.image}
              alt={hero.varieties.kalmi.name}
              fill
              sizes="(max-width: 640px) 220px, (max-width: 768px) 240px, (max-width: 1024px) 258px, 310px"
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
            <div className="absolute bottom-4 lg:bottom-5 xl:bottom-6 left-4 lg:left-5 xl:left-6">
              <p className="text-white/80 font-poppins font-semibold text-[9px] md:text-[10px] lg:text-[10px] xl:text-[11px] 2xl:text-[12px] tracking-[0.15em] uppercase">
                Featured Variety
              </p>
              <h3 className="text-[#FFEBBC] font-serif font-bold text-lg md:text-xl lg:text-[20px] xl:text-[24px] 2xl:text-[28px] mt-0.5 md:mt-1">
                {hero.varieties.kalmi.name}
              </h3>
            </div>
          </div>

          <div className="hidden md:block absolute md:top-[120px] md:left-[10px] md:w-[240px] md:h-[340px] md:rounded-[36px] md:border-[2px] border-[#FFDA8C] shadow-premium z-[5] overflow-hidden lg:top-[128px] lg:left-[11px] lg:w-[258px] lg:h-[365px] lg:rounded-[40px] xl:top-[142px] xl:left-[12px] xl:w-[284px] xl:h-[404px] xl:rounded-[44px] 2xl:top-[155px] 2xl:left-[13px] 2xl:w-[310px] 2xl:h-[440px] 2xl:rounded-[48px]">
            <Image
              src={hero.varieties.sukkary.image}
              alt={hero.varieties.sukkary.name}
              fill
              sizes="(max-width: 768px) 240px, (max-width: 1024px) 258px, 310px"
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
            <div className="absolute bottom-4 lg:bottom-5 xl:bottom-6 left-4 lg:left-5 xl:left-6">
              <p className="text-white/80 font-poppins font-semibold text-[9px] md:text-[10px] lg:text-[10px] xl:text-[11px] 2xl:text-[12px] tracking-[0.15em] uppercase">
                Featured Variety
              </p>
              <h3 className="text-[#FFEBBC] font-serif font-bold text-lg md:text-xl lg:text-[20px] xl:text-[24px] 2xl:text-[28px] mt-0.5 md:mt-1">
                {hero.varieties.sukkary.name}
              </h3>
            </div>
          </div>

          <div className="absolute bottom-2 right-[20px] w-[80px] h-[80px] rounded-[16px] border-[1.6px] border-[#FFDA8C] shadow-sm z-20 overflow-hidden md:bottom-[80px] md:right-[-30px] md:w-[80px] md:h-[80px] md:rounded-[20px] md:border-[2px] lg:bottom-[86px] lg:right-[-32px] lg:w-[86px] lg:h-[86px] lg:rounded-[18px] xl:bottom-[95px] xl:right-[-35px] xl:w-[95px] xl:h-[95px] xl:rounded-[20px] 2xl:bottom-[104px] 2xl:right-[-38px] 2xl:w-[104px] 2xl:h-[104px] 2xl:rounded-[22px]">
            <Image
              src={hero.varieties.safawi.image}
              alt={hero.varieties.safawi.name}
              fill
              sizes="(max-width: 768px) 80px, (max-width: 1024px) 86px, 104px"
              className="object-cover"
            />
          </div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="absolute bottom-2 left-[15px] bg-brand-bg/95 backdrop-blur-sm border border-[#EADFC9] rounded-xl px-3 py-1.5 flex items-center gap-2 shadow-lg z-30 md:bottom-[40px] md:left-[290px] md:px-4 md:py-2 md:right-auto lg:bottom-[64px] lg:left-[311px] xl:bottom-[71px] xl:left-[344px] 2xl:bottom-[78px] 2xl:left-[377px]"
          >
            <div className="text-xl lg:text-xl xl:text-2xl">🌴</div>
            <div>
              <p className="text-brand-green font-poppins font-semibold text-xs lg:text-[11px] xl:text-sm leading-tight">
                {hero.badges.farmToTableTitle}
              </p>
              <p className="text-brand-green-light font-poppins text-[10px] lg:text-[9px] xl:text-xs mt-0.5 leading-none">
                {hero.badges.farmToTableDesc}
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="absolute top-[80px] right-[10px] w-24 bg-[#2C3A1A] rounded-xl p-2 text-center shadow-xl z-30 md:top-[80px] md:right-[-30px] md:w-[110px] md:h-[80px] md:flex md:flex-col md:justify-center lg:top-[86px] lg:right-[-32px] lg:w-[118px] lg:h-[90px] xl:top-[95px] xl:right-[-35px] xl:w-[130px] xl:h-[90px] 2xl:top-[104px] 2xl:right-[-38px]"
          >
            <p className="text-white/70 font-poppins font-medium text-[8px] md:text-[9px] lg:text-[10px] xl:text-[11px] 2xl:text-[12px] leading-tight">
              {hero.badges.energyTitle}
            </p>
            <p className="text-brand-primary font-poppins font-bold text-sm md:text-[20px] lg:text-[22px] xl:text-[24px] 2xl:text-[26px] leading-none my-1">
              {hero.badges.energyValue}
            </p>
            <p className="text-white/70 font-poppins font-normal text-[8px] md:text-[9px] lg:text-[10px] xl:text-[11px] 2xl:text-[12px]">
              {hero.badges.energyDesc}
            </p>
          </motion.div>

          <div className="hidden md:flex absolute md:top-[40px] md:left-[80px] md:w-[110px] md:h-[40px] bg-white backdrop-blur-sm rounded-[42px] items-center justify-center shadow-premium border border-white/70 z-30 lg:top-[43px] lg:left-[86px] lg:w-[118px] lg:h-[43px] xl:top-[38px] xl:left-[92px] xl:w-[130px] xl:h-[47px] 2xl:top-[50px] 2xl:left-[104px] 2xl:w-[142px] 2xl:h-[52px]">
            <span className="text-[#222222] font-poppins font-medium text-xs md:text-sm lg:text-sm xl:text-base">
              {hero.badges.premiumLabel}
            </span>
          </div>
        </div>
      </div>
    </Section>
  );
};
