import React from "react";
import Image from "next/image";
import Link from "next/link";

export const AdminAuthHeader: React.FC = () => {
  return (
    <header className="w-full flex flex-col items-center select-none pt-8 md:pt-10">
      <Link href="/">
        <Image
          src="/TaybeenLogo.png"
          alt="Taybeen Logo"
          width={130}
          height={58}
          className="h-[40px] md:h-[48px] w-auto object-contain cursor-pointer"
          priority
        />
      </Link>
    </header>
  );
};

export default AdminAuthHeader;
