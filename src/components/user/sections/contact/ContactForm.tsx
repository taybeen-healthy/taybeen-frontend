"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/Input";

export const ContactForm: React.FC = () => {
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
          SUBMIT
        </button>
      </div>
    </form>
  );
};

export default ContactForm;
