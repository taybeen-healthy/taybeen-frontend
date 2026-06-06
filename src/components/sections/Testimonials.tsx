/**
 * Testimonials — Customer reviews grid with navigation arrows.
 * Displays quote, rating stars, author details, and product badge for each testimonial.
 */

import { testimonials } from "@/data/mockData";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

export const Testimonials: React.FC = () => {
  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-brand-bg">
      <div className="max-w-[1440px] mx-auto px-6 md:px-8 lg:px-10 xl:px-10 2xl:px-12">

        {/* ── Section Header with Navigation Arrows ── */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-16 gap-8">
          <div className="space-y-4 text-left">
            <div className="inline-block px-4 py-2 rounded-3xl bg-brand-primary/25 border border-[#F6EBDA80] backdrop-blur-sm">
              <span className="text-brand-brown font-poppins font-semibold text-xs md:text-sm">From Our Community</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-4xl xl:text-5xl font-serif font-bold text-brand-brown leading-tight -tracking-[0.04em]">
              Dates worth talking about!
            </h2>
          </div>
          {/* Carousel navigation arrows */}
          <div className="flex items-center justify-start md:justify-end gap-4 md:gap-6 w-full md:w-auto">
            <button className="w-12 h-12 md:w-14 md:h-14 rounded-full border-[1.6px] border-brand-green-light flex items-center justify-center text-brand-green-light hover:bg-brand-green-light hover:text-white transition-all">
              <ChevronLeft size={20} className="md:w-6 md:h-6" />
            </button>
            <button className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-brand-green-light border-[1.6px] border-brand-green-light flex items-center justify-center text-white hover:bg-opacity-90 transition-all">
              <ChevronRight size={20} className="md:w-6 md:h-6" />
            </button>
          </div>

        </div>

        {/* ── Testimonial Cards Grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 xl:gap-8">
          {testimonials.map((t) => (
            <div key={t.id} className="bg-white p-5 md:p-6 lg:p-7 xl:p-8 rounded-2xl border border-brand-brown-dark/10 flex flex-col h-auto lg:h-[380px] xl:h-[400px]">

              {/* Quote and review text */}
              <div className="space-y-4 md:space-y-5 flex-1 mb-6">
                <div className="flex items-center gap-1 text-brand-primary">
                  {/* Quote icon — merged className from original (size + opacity + rotation) */}
                  <Quote size={20} fill="currentColor" className="md:w-6 md:h-6 opacity-50 rotate-180" />
                </div>
                <p className="text-brand-green font-poppins text-sm leading-[1.8]">
                  {t.quote}
                </p>
                {/* Product name badge */}
                <div className="inline-block px-4 py-1 rounded-2xl bg-[#FFEABF]">
                  <span className="text-brand-brown font-poppins font-semibold text-xs md:text-sm">{t.productName}</span>
                </div>
              </div>

              {/* Author details and star rating */}
              <div className="pt-6 border-t border-[#C4C4C4] space-y-4">
                {/* Star rating */}
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className="md:w-4 md:h-4" fill={i < t.rating ? "#F7A503" : "none"} stroke="#F7A503" strokeWidth={i < t.rating ? 0 : 2} />
                  ))}
                </div>
                {/* Author avatar and info */}
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 md:w-11 md:h-11 rounded-full bg-[#FFDA8C]/20 border-[1.6px] border-[#FFDA8C] flex items-center justify-center overflow-hidden">
                    <div className="w-5 h-5 bg-gray-300 rounded-full relative top-1">
                      <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-3 h-3 bg-gray-300 rounded-full"></div>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-brand-green font-poppins font-semibold text-sm md:text-base">{t.author}</h4>
                    <p className="text-brand-green-light font-poppins text-[10px] md:text-xs">{t.role}, {t.location}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
