"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/Input";
import { apiClient } from "@/lib/apiClient";
import { Loader2, CheckCircle } from "lucide-react";

export const ContactForm: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    const payload = {
      name,
      email,
      subject: `Contact Inquiry from ${name}`,
      message: `Message: ${message}\n\nPhone Number: ${phone}`,
    };

    try {
      await apiClient.post("/contact", payload);
      setIsSuccess(true);
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
    } catch (err: any) {
      console.error("Contact form error:", err);
      setSubmitError(
        err.response?.data?.message || "Failed to send message. Please try again later."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="w-full lg:w-[50%] bg-[#F6F1E9]/30 border border-[#C4A482]/25 rounded-2xl p-6 sm:p-8 md:p-10 shadow-premium flex flex-col items-center text-center font-poppins">
        <div className="w-14 h-14 rounded-full bg-green-50 text-green-600 flex items-center justify-center border border-green-100 shadow-sm mb-6 animate-in zoom-in duration-300">
          <CheckCircle size={30} />
        </div>
        <h2 className="text-2xl font-serif font-bold text-[#5A3E2B] mb-3">Message Sent!</h2>
        <p className="text-[#768C3A] text-sm leading-relaxed mb-6 max-w-sm">
          Thank you for reaching out to Taybeen. We have received your message and will get back to
          you shortly.
        </p>
        <button
          onClick={() => setIsSuccess(false)}
          className="px-6 py-2.5 bg-[#5A3E2B] hover:bg-[#432E20] text-[#FDFAF3] rounded-lg font-poppins font-bold text-xs tracking-wider uppercase transition-all shadow-md cursor-pointer"
        >
          Send Another Message
        </button>
      </div>
    );
  }

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

      {submitError && (
        <div className="text-red-500 font-poppins text-xs font-semibold text-center bg-red-50 border border-red-200 rounded-lg p-2.5">
          {submitError}
        </div>
      )}

      <div className="pt-2 text-left">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full sm:w-[260px] bg-[#5A3E2B] hover:bg-[#432E20] disabled:bg-[#5A3E2B]/50 text-[#FDFAF3] py-4 rounded-lg font-poppins font-bold text-sm tracking-wider uppercase transition-all shadow-md active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-white" />
              <span>SUBMITTING...</span>
            </>
          ) : (
            <span>SUBMIT</span>
          )}
        </button>
      </div>
    </form>
  );
};

export default ContactForm;
