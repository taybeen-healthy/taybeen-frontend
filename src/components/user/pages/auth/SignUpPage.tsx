"use client";

import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AuthForm, AuthBackground } from "@/components/user/auth";

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-[#FDFAF3] flex flex-col justify-between relative overflow-hidden selection:bg-brand-primary/30">
      <AuthBackground />
      <Navbar />
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 md:px-8 md:py-0 py-28 md:pt-32 lg:pt-36 z-10 relative">
        <AuthForm type="signup" />
      </main>
      <Footer />
    </div>
  );
}
