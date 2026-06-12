import React from "react";
import Image from "next/image";

interface HeroProps {
  src?: string;
  alt?: string;
  className?: string;
}

export const Hero: React.FC<HeroProps> = ({
  src = "/OurProducts Header.png",
  alt = "Header Banner",
  className = "h-[120px] md:h-[150px]",
}) => {
  return (
    <div className={`relative w-full mt-[74px] md:mt-[88px] lg:mt-[99px] overflow-hidden select-none pointer-events-none ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes="100vw"
        className="object-cover object-center"
        priority
      />
    </div>
  );
};

export default Hero;
