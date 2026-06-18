"use client";

import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/layout/Hero";
import { legalData } from "@/data/user/legalData";

export const ShippingDeliveryPage: React.FC = () => {
  const { title, sections } = legalData.shippingDelivery;

  return (
    <div className="min-h-screen bg-brand-bg selection:bg-brand-primary/30 flex flex-col justify-between">
      <div>
        <Navbar />

        <Hero src="/OurProducts Header.png" alt="Shipping & Delivery Header Banner" />

        <main className="max-w-4xl mx-auto px-6 md:px-8 py-12 sm:py-16 md:py-20 text-left font-poppins">
          <h1 className="font-serif font-bold text-brand-brown text-3xl sm:text-4xl md:text-5xl leading-tight mb-10 pb-5 border-b border-[#C4A482]/25">
            {title}
          </h1>

          <div className="space-y-10">
            <div>
              <h2 className="font-serif font-bold text-brand-brown text-lg sm:text-xl md:text-2xl mb-4">
                {sections.processingTime.title}
              </h2>
              {sections.processingTime.paragraphs.map((p, idx) => (
                <p
                  key={idx}
                  className="text-brand-green/90 text-sm sm:text-base leading-[1.8] mb-4 last:mb-0"
                >
                  {p}
                </p>
              ))}
            </div>

            <div>
              <h2 className="font-serif font-bold text-brand-brown text-lg sm:text-xl md:text-2xl mb-4">
                {sections.shippingRates.title}
              </h2>
              {sections.shippingRates.paragraphs.map((p, idx) => (
                <p
                  key={idx}
                  className="text-brand-green/90 text-sm sm:text-base leading-[1.8] mb-4 last:mb-0"
                >
                  {p}
                </p>
              ))}
            </div>

            <div>
              <h2 className="font-serif font-bold text-brand-brown text-lg sm:text-xl md:text-2xl mb-4">
                {sections.returnsPolicy.title}
              </h2>
              <p className="text-brand-green/90 text-sm sm:text-base leading-[1.8] mb-4">
                At Taybeen, we take great care to ensure that all products arrive in excellent
                condition at the shipping address provided during checkout. If you are not fully
                satisfied with the quality of your order upon delivery, please contact us at{" "}
                <a
                  href="mailto:contactus@taybeen.com"
                  className="text-brand-primary hover:underline font-medium"
                >
                  contactus@taybeen.com
                </a>{" "}
                within 48 hours of receiving your order, along with a detailed description and clear
                photographs of the issue.
              </p>
              <p className="text-brand-green/90 text-sm sm:text-base leading-[1.8] mb-6">
                Due to the perishable nature of our products, claims submitted without adequate
                supporting documentation may not be eligible for replacement or exchange. Taybeen
                reserves the right to review and limit replacement requests at its discretion.
              </p>

              {sections.returnsPolicy.bullets && (
                <div className="space-y-4">
                  <p className="font-bold text-brand-brown text-sm sm:text-base">
                    {sections.returnsPolicy.bullets.title}
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-brand-green/90 text-sm sm:text-base leading-[1.8]">
                    {sections.returnsPolicy.bullets.items.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}

              {sections.returnsPolicy.footerText && (
                <p className="text-brand-green/90 text-sm sm:text-base leading-[1.8] mt-6">
                  {sections.returnsPolicy.footerText}
                </p>
              )}
            </div>

            <div>
              <h2 className="font-serif font-bold text-brand-brown text-lg sm:text-xl md:text-2xl mb-4">
                {sections.replacementsRefunds.title}
              </h2>
              <p className="text-brand-green/90 text-sm sm:text-base leading-[1.8] mb-4">
                All replacement requests must be submitted within 48 hours of receiving your order
                by contacting our customer support team at{" "}
                <a
                  href="mailto:contactus@taybeen.com"
                  className="text-brand-primary hover:underline font-medium"
                >
                  contactus@taybeen.com
                </a>
                . Once the request has been reviewed and approved, the replacement item(s) will be
                dispatched within 2-5 business days.
              </p>
              <p className="text-brand-green/90 text-sm sm:text-base leading-[1.8] mb-6">
                If a replacement is not possible, a refund may be issued to the original payment
                method. Refunds may take between 10-30 business days to reflect in your account,
                depending on your payment provider and financial institution.
              </p>

              {sections.replacementsRefunds.bullets && (
                <div className="space-y-4">
                  <p className="font-bold text-brand-brown text-sm sm:text-base">
                    {sections.replacementsRefunds.bullets.title}
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-brand-green/90 text-sm sm:text-base leading-[1.8]">
                    {sections.replacementsRefunds.bullets.items.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default ShippingDeliveryPage;
