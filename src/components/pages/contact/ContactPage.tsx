"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Input } from "@/components/ui/Input";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thank you for your message! We will get back to you shortly.");
    setName("");
    setEmail("");
    setPhone("");
    setMessage("");
  };

  return (
    <div className="min-h-screen bg-[#FDFAF3] flex flex-col justify-between relative overflow-hidden selection:bg-brand-primary/30">
      {/* Background Graphic */}
      <div className="absolute top-0 left-0 right-0 h-[46vh] min-h-[380px] lg:h-[48vh] z-0 select-none pointer-events-none border-b border-[#5A3E2B]/10 bg-[#FDFAF3]">
        <Image
          src="/authBg.png"
          alt="Botanical Background"
          fill
          className="object-cover object-[90%_top] md:object-cover md:object-top opacity-100"
          priority
        />
      </div>

      <Navbar />

      <main className="flex-1 z-10 relative">
        {/* Hero Section centered over background image */}
        <section className="h-[46vh] min-h-[380px] lg:h-[48vh] flex flex-col justify-center items-center text-center px-4 sm:px-6 md:px-8 pt-16">
          <h1 className="text-3xl sm:text-4xl md:text-[2.75rem] font-serif font-bold text-[#5A3E2B] leading-tight">
            We&apos;re just a message away!
          </h1>
          <p className="text-brand-green font-poppins text-xs sm:text-sm md:text-base leading-relaxed max-w-2xl mt-4">
            Whether you have a question about our dates, gifting options, orders, or simply want to say hello, we&apos;d love to hear from you
          </p>
        </section>

        {/* Form and Contact Information Section */}
        <section className="bg-[#FDFAF3] z-20 relative pt-10 lg:pt-14 px-6 md:px-12 lg:px-20 xl:px-24">
          <div className="max-w-[1200px] mx-auto flex flex-col-reverse lg:flex-row justify-between items-start gap-12 lg:gap-20">
            
            {/* Left Column: Quick Connect & Customer Service */}
            <div className="w-full lg:w-[42%] text-left space-y-12">
              <div>
                <h2 className="text-xl sm:text-2xl font-poppins font-bold text-brand-brown mb-6">
                  Quick Connect
                </h2>
                <div className="space-y-4 font-poppins text-sm md:text-base text-[#3A2418]">
                  <p className="leading-relaxed">
                    <span className="font-semibold text-brand-brown">Email:</span>{" "}
                    <a href="mailto:contactus@taybeen.com" className="hover:underline">
                      contactus@taybeen.com
                    </a>
                  </p>
                  <p className="leading-relaxed">
                    <span className="font-semibold text-brand-brown">Call or WhatsApp:</span>{" "}
                    <span className="font-medium">+91 9560722952 or</span>
                    <br />
                    <span className="font-medium">+91 9958544930</span>
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-xl sm:text-2xl font-poppins font-bold text-brand-brown mb-6">
                  Customer Service
                </h2>
                <div className="space-y-3 font-poppins text-sm md:text-base text-[#3A2418] font-medium">
                  <p className="leading-relaxed">
                    Monday to Saturday 9:00 AM – 5:30 PM
                  </p>
                  <p className="leading-relaxed">
                    Sunday 9:00 AM – 3:30 PM
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Contact Form */}
            <form onSubmit={handleSubmit} className="w-full lg:w-[50%] space-y-6">
              <div className="space-y-2.5 text-left">
                <label className="block font-poppins font-medium text-xs sm:text-sm text-[#3A2418]">
                  Name*
                </label>
                <Input
                  type="text"
                  required
                  placeholder="Enter Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="border-[#C4A482]/40 rounded-lg focus:border-[#F7A503]"
                />
              </div>

              <div className="space-y-2.5 text-left">
                <label className="block font-poppins font-medium text-xs sm:text-sm text-[#3A2418]">
                  Email*
                </label>
                <Input
                  type="email"
                  required
                  placeholder="Enter Your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border-[#C4A482]/40 rounded-lg focus:border-[#F7A503]"
                />
              </div>

              <div className="space-y-2.5 text-left">
                <label className="block font-poppins font-medium text-xs sm:text-sm text-[#3A2418]">
                  Phone Number*
                </label>
                <Input
                  type="tel"
                  required
                  placeholder="Enter Your Phone Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="border-[#C4A482]/40 rounded-lg focus:border-[#F7A503]"
                />
              </div>

              <div className="space-y-2.5 text-left">
                <label className="block font-poppins font-medium text-xs sm:text-sm text-[#3A2418]">
                  Message*
                </label>
                <textarea
                  required
                  rows={6}
                  placeholder="Write to Us."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-white border border-[#C4A482]/40 rounded-lg py-3 px-4 text-sm font-poppins text-[#3A2418] placeholder-brand-brown/40 focus:outline-none focus:border-[#F7A503] focus:ring-1 focus:ring-[#F7A503]/20 transition-all resize-none"
                />
              </div>

              <div className="pt-2 text-left">
                <button
                  type="submit"
                  className="w-full sm:w-[260px] bg-[#5A3E2B] hover:bg-[#432E20] text-[#FDFAF3] py-4 rounded-lg font-poppins font-bold text-sm tracking-wider uppercase transition-all shadow-md active:scale-[0.98] cursor-pointer"
                >
                  SUMBIT
                </button>
              </div>
            </form>

          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
