"use client";

import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { contactData } from "@/data/contactData";
import { ContactHero, ContactInfo, ContactForm } from "@/components/sections/contact";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#FDFAF3] flex flex-col justify-between relative overflow-hidden selection:bg-brand-primary/30">
      <ContactHero data={contactData.hero} />
      <Navbar />
      <main className="flex-1 z-10 relative">
        <section className="bg-[#FDFAF3] z-20 relative pt-10 lg:pt-14 px-6 md:px-12 lg:px-20 xl:px-24">
          <div className="max-w-[1200px] mx-auto flex flex-col-reverse lg:flex-row justify-between items-start gap-12 lg:gap-20">
            <ContactInfo connect={contactData.connect} service={contactData.service} />
            <ContactForm />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
