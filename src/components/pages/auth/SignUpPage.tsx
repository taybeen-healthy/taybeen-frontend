"use client";

import React from "react";
import Image from "next/image";
import { Navbar } from "@/components/layout/Navbar";
import { AuthForm } from "@/components/features/auth/AuthForm";

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-[#FDFAF3] flex flex-col justify-between relative overflow-hidden">
      <div className="fixed top-0 left-0 right-0 h-[46vh] min-h-[380px] lg:h-[48vh] z-0 select-none pointer-events-none border-b border-[#5A3E2B]/10 bg-[#FDFAF3]">
        <Image
          src="/authBg.png"
          alt="Botanical Background"
          fill
          className="object-contain md:object-cover object-top opacity-100"
          priority
        />
      </div>

      <Navbar />

      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 md:px-8 py-28 md:py-32 lg:py-36 z-10 relative">
        <AuthForm type="signup" />
      </main>
    </div>
  );
}
