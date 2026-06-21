"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { testimonials as mockTestimonials } from "@/data/user/mockData";
import { ChevronLeft, ChevronRight, CircleUserRound, Quote } from "lucide-react";
import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { StarRating } from "@/components/ui/StarRating";
import { homeData } from "@/data/user/homeData";
import { apiClient } from "@/lib/apiClient";

export const Testimonials: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [direction, setDirection] = useState(1);
  const [testimonialsList, setTestimonialsList] = useState<any[]>(mockTestimonials);

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

  useEffect(() => {
    apiClient.get("/reviews")
      .then((res) => {
        const arr = res.data?.data?.data || res.data?.data || [];
        if (arr.length > 0) {
          const mapped = arr.map((item: any) => ({
            id: item.id || item._id,
            quote: item.comment,
            author: item.customerName,
            role: "Verified Buyer",
            location: "India",
            rating: item.rating,
            productName: item.productName || "Premium Dates",
            image: item.images?.[0] || undefined,
          }));
          setTestimonialsList(mapped);
        }
      })
      .catch((e) => {
        console.warn("Failed to fetch dynamic reviews, falling back to mock data:", e);
      });
  }, []);

  const nextTestimonial = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % testimonialsList.length);
  };

  const prevTestimonial = () => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + testimonialsList.length) % testimonialsList.length);
  };

  const visibleTestimonials = [];
  if (testimonialsList.length > 0) {
    for (let i = 0; i < Math.min(itemsPerPage, testimonialsList.length); i++) {
      const targetIndex = (activeIndex + i) % testimonialsList.length;
      visibleTestimonials.push({
        item: testimonialsList[targetIndex],
        index: i,
      });
    }
  }

  const TestimonialCard = ({ testimonial }: { testimonial: any }) => {
    return (
      <div className="bg-white p-5 md:p-6 lg:p-7 xl:p-8 rounded-2xl border border-brand-brown/20 flex flex-col h-full text-left">
        {testimonial.image && (
          <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden mb-5 flex-shrink-0">
            <Image
              src={testimonial.image}
              alt={testimonial.productName}
              fill
              className="object-cover"
            />
          </div>
        )}

        <div className="space-y-4 md:space-y-5 flex-1 mb-6">
          <div className="flex items-center gap-1">
            <Quote size={28} fill="currentColor" className="text-brand-primary rotate-180" />
          </div>
          <p className="text-brand-green font-poppins text-sm leading-[1.8]">{testimonial.quote}</p>
        </div>

        <div className="pt-6 border-t border-brand-brown/10 space-y-4">
          <div className="inline-block px-4 py-1 rounded-2xl bg-[#FFEABF]">
            <span className="text-brand-brown font-poppins font-semibold text-xs md:text-sm">
              {testimonial.productName}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <StarRating
              rating={testimonial.rating}
              size={14}
              className="md:scale-[1.14] origin-left"
            />
          </div>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 md:w-11 md:h-11 rounded-full bg-[#FFDA8C]/20 border-[1.6px] border-[#FFDA8C] flex items-center justify-center text-[#F7A503]">
              <CircleUserRound className="w-5 h-5 md:w-6 md:h-6" strokeWidth={1.5} />
            </div>
            <div>
              <h4 className="text-brand-green font-poppins font-semibold text-sm md:text-base">
                {testimonial.author}
              </h4>
              <p className="text-brand-green-light font-poppins text-[10px] md:text-xs">
                {testimonial.role}, {testimonial.location}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Section bg="cream" overflowHidden={true}>
      <SectionHeader
        tag={homeData.testimonials.tag}
        tagVariant="primary-light"
        tagClassName="text-brand-brown"
        title={<span className="-tracking-[0.04em]">{homeData.testimonials.title}</span>}
        actions={
          <div className="flex items-center justify-start md:justify-end gap-4 md:gap-6 w-full md:w-auto">
            <button
              onClick={prevTestimonial}
              className="w-12 h-12 md:w-14 md:h-14 rounded-full border-[1.6px] border-brand-green-light flex items-center justify-center text-brand-green-light hover:bg-brand-green-light hover:text-white transition-all cursor-pointer"
            >
              <ChevronLeft size={20} className="md:w-6 md:h-6" />
            </button>
            <button
              onClick={nextTestimonial}
              className="w-12 h-12 md:w-14 md:h-14 rounded-full border-[1.6px] border-brand-green-light flex items-center justify-center text-brand-green-light hover:bg-brand-green-light hover:text-white transition-all cursor-pointer"
            >
              <ChevronRight size={20} className="md:w-6 md:h-6" />
            </button>
          </div>
        }
      />

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
        {testimonialsList.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > activeIndex ? 1 : -1);
              setActiveIndex(index);
            }}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === activeIndex ? "bg-brand-brown-dark" : "bg-[#FFDA8C]"
            }`}
          />
        ))}
      </div>
    </Section>
  );
};

export default Testimonials;
