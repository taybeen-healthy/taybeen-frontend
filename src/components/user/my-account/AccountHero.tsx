import React from "react";
import Image from "next/image";

export const AccountHero: React.FC = () => {
  return (
    <div className="relative w-full h-[120px] md:h-[150px] mt-[74px] md:mt-[88px] lg:mt-[99px] overflow-hidden select-none pointer-events-none">
      <Image
        src="/OurProducts Header.png"
        alt="Account Banner"
        fill
        sizes="100vw"
        className="object-cover object-center"
        priority
      />
    </div>
  );
};

export default AccountHero;
