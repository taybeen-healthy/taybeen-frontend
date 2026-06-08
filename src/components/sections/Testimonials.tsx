"use client";

import { useState, useEffect } from "react";
import { testimonials } from "@/data/mockData";
import { Star, ChevronLeft, ChevronRight, Quote, User } from "lucide-react";
import { motion } from "framer-motion";

export const Testimonials: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsPerPage(1);
      } else if (window.innerWidth < 1280) {
        setItemsPerPage(2);
      } else {
        setItemsPerPage(3);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const nextTestimonial = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const visibleTestimonials = [];
  for (let i = 0; i < itemsPerPage; i++) {
    const targetIndex = (activeIndex + i) % testimonials.length;
    visibleTestimonials.push({
      item: testimonials[targetIndex],
      index: i,
    });
  }

  const TestimonialCard = ({ testimonial }: { testimonial: typeof testimonials[0] }) => {
    return (
      <div className="bg-white p-5 md:p-6 lg:p-7 xl:p-8 rounded-2xl border border-brand-brown/20 flex flex-col h-full text-left">
        <div className="space-y-4 md:space-y-5 flex-1 mb-6">
          <div className="flex items-center gap-1">
            <Quote size={28} fill="currentColor" className="text-brand-primary rotate-180" />
          </div>
          <p className="text-brand-green font-poppins text-sm leading-[1.8]">
            {testimonial.quote}
          </p>
          <div className="inline-block px-4 py-1 rounded-2xl bg-[#FFEABF]">
            <span className="text-brand-brown font-poppins font-semibold text-xs md:text-sm">{testimonial.productName}</span>
          </div>
        </div>

        <div className="pt-6 border-t border-brand-brown/10 space-y-4">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={14}
                className="md:w-4 md:h-4"
                fill={i < testimonial.rating ? "#F7A503" : "none"}
                stroke="#F7A503"
                strokeWidth={i < testimonial.rating ? 0 : 2}
              />
            ))}
          </div>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 md:w-11 md:h-11 rounded-full bg-[#FFDA8C]/20 border-[1.6px] border-[#FFDA8C] flex items-center justify-center text-[#F7A503]">
              <User className="w-5 h-5 md:w-6 md:h-6" strokeWidth={1.5} />
            </div>
            <div>
              <h4 className="text-brand-green font-poppins font-semibold text-sm md:text-base">{testimonial.author}</h4>
              <p className="text-brand-green-light font-poppins text-[10px] md:text-xs">{testimonial.role}, {testimonial.location}</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-brand-bg overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 md:px-8 lg:px-10 xl:px-10 2xl:px-12">

        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-16 gap-8">
          <div className="space-y-4 text-left">
            <div className="inline-block px-4 py-2 rounded-3xl bg-brand-primary/25 border border-[#F6EBDA80] backdrop-blur-sm">
              <span className="text-brand-brown font-poppins font-semibold text-xs md:text-sm">From Our Community</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-4xl xl:text-5xl font-serif font-bold text-brand-brown leading-tight -tracking-[0.04em]">
              Dates worth talking about!
            </h2>
          </div>
          <div className="flex items-center justify-start md:justify-end gap-4 md:gap-6 w-full md:w-auto">
            <button
              onClick={prevTestimonial}
              className="w-12 h-12 md:w-14 md:h-14 rounded-full border-[1.6px] border-brand-green-light flex items-center justify-center text-brand-green-light hover:bg-brand-green-light hover:text-white transition-all"
            >
              <ChevronLeft size={20} className="md:w-6 md:h-6" />
            </button>
            <button
              onClick={nextTestimonial}
              className="w-12 h-12 md:w-14 md:h-14 rounded-full border-[1.6px] border-brand-green-light flex items-center justify-center text-brand-green-light hover:bg-brand-green-light hover:text-white transition-all"
            >
              <ChevronRight size={20} className="md:w-6 md:h-6" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 lg:gap-6 xl:gap-8 overflow-hidden py-2 px-1">
          {visibleTestimonials.map(({ item, index }) => (
            <motion.div
              key={item.id + "-" + index}
              initial={{ opacity: 0, x: direction * 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="h-full"
            >
              <TestimonialCard testimonial={item} />
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center items-center gap-2 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setDirection(index > activeIndex ? 1 : -1);
                setActiveIndex(index);
              }}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${index === activeIndex ? "bg-brand-brown-dark" : "bg-[#FFDA8C]"
                }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

