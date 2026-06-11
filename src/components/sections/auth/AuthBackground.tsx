import React from "react";
import Image from "next/image";
import { authPageData } from "@/data/authPageData";

export const AuthBackground: React.FC = () => {
  return (
    <div className="absolute top-0 left-0 right-0 h-[46vh] min-h-[380px] lg:h-[48vh] z-0 select-none pointer-events-none border-b border-[#5A3E2B]/10 bg-[#FDFAF3]">
      <Image
        src={authPageData.backgroundImage}
        alt={authPageData.backgroundAlt}
        fill
        className="object-cover object-[90%_top] md:object-cover md:object-top opacity-100"
        priority
      />
    </div>
  );
};

export default AuthBackground;
