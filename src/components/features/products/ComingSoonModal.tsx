"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { X, Star, ArrowRight } from "lucide-react";
import { LiaWhatsapp } from "react-icons/lia";
import { motion } from "framer-motion";
import { Product } from "@/types";
import comingSoonImage from "../../../../public/ComingSoon Dates.png";

interface ComingSoonModalProps {
  product: Product;
  onClose: () => void;
}

export const ComingSoonModal: React.FC<ComingSoonModalProps> = ({
  product,
  onClose,
}) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  const messageText = `Hi Taybeen, I'm interested in ordering ${product.name} (${product.weight}) for ₹${product.price}.`;
  const whatsappUrl = `https://wa.me/919867805123?text=${encodeURIComponent(messageText)}`;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-10">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={onClose}
        className="absolute inset-0 bg-[#2C3A1A]/40 backdrop-blur-md"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: "spring", duration: 0.5, bounce: 0.12 }}
        className="relative w-full max-w-md md:max-w-4xl lg:max-w-5xl max-h-[96vh] md:h-[660px] bg-white rounded-2xl overflow-hidden shadow-premium flex flex-col md:flex-row-reverse z-10 border border-[#F2EADA]"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 md:top-6 md:right-6 z-50 w-8 h-8 sm:w-10 sm:h-10 bg-white/80 hover:bg-white text-brand-brown hover:text-black rounded-full flex items-center justify-center border border-[#F2EADA] transition-all cursor-pointer shadow-sm active:scale-95 focus:outline-none focus:ring-2 focus:ring-brand-primary"
          aria-label="Close modal"
        >
          <X size={18} className="sm:w-5 sm:h-5" />
        </button>

        <div className="relative w-full md:w-[50%] h-[200px] sm:h-[240px] md:h-full flex-shrink-0 overflow-hidden border-b md:border-b-0 md:border-l border-[#F2EADA] p-4 md:p-8 flex items-center justify-center bg-white">
          <Image
            src={comingSoonImage}
            alt="Taybeen Premium Dates"
            className="max-w-full max-h-full object-contain select-none pointer-events-none"
            priority
          />
        </div>

        <div className="flex-1 p-5 sm:p-8 md:p-10 lg:p-14 overflow-y-auto flex flex-col justify-center items-center text-center h-auto md:h-full select-text">
          <Image
            src="https://s3-alpha-sig.figma.com/img/aef5/42bb/91997904de2c2fba272a345f8e640566?Expires=1781481600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=FkHOx1DQ9tCpg2LfaGWPEahyYclX5a07TKu8PWLxLk3iSdpazH8XGXMYe8TpS23YZfpwXmAz-AZkM9jf3WSWFX3VM7Aol9uKZzY~iTeh~XLi7tXNle78G63lxxLQsPO5qF8O6dnYVoDlAuoYEhEHcTABf7RhrrYHPEjF-NOwpyfzVfQpmobUjFvJamM7vfxxCNehvQ3s5ioKA0OXGibBcUyQ7xhKg4IL70pP9yeI4c5N~6yvjoAM2Qw-6rj2rMslOTohfYJjBMV~ghZpoHtXxEAcXfXSM5Vz00H93O0yHKZ915D0kFsATfjYNighrCUBoONcchwDqXihkU0x1-M4ug__"
            alt="Taybeen Logo"
            width={140}
            height={40}
            className="h-8 md:h-10 w-auto mb-3 md:mb-8 select-none mx-auto object-contain"
            priority
          />

          <h2 className="text-2xl sm:text-3xl lg:text-[2.75rem] font-serif font-bold text-brand-green leading-tight text-center mb-2 md:mb-4">
            {(() => {
              const parts = product.name.split(" ");
              const firstPart = parts.slice(0, -1).join(" ");
              const lastWord = parts[parts.length - 1];
              return (
                <>
                  {firstPart}{" "}
                  <span className="text-brand-primary">{lastWord}</span>
                </>
              );
            })()}
          </h2>

          <p className="text-[#7D6B5E] font-poppins text-xs sm:text-sm md:text-sm lg:text-base leading-relaxed max-w-md mx-auto mb-4 md:mb-5 text-center line-clamp-3 md:line-clamp-none">
            {product.description}
          </p>

          <div className="flex flex-col items-center mb-4 md:mb-6">
            <p className="text-brand-brown/90 font-poppins text-xs sm:text-sm font-semibold tracking-wide mb-1 md:mb-2">
              Pack Size: {product.weight} · Price: ₹{product.price}
            </p>

            <div className="flex items-center gap-1.5 text-brand-primary">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  className="w-3.5 h-3.5"
                  fill={i < Math.floor(product.rating) ? "#F7A503" : "transparent"}
                  stroke="#F7A503"
                  strokeWidth={1.5}
                />
              ))}
              <span className="text-xs font-poppins text-[#8D7F75] font-normal ml-1">
                ({product.reviewsCount.toLocaleString()} reviews)
              </span>
            </div>
          </div>

          <p className="text-brand-brown font-poppins text-[10px] md:text-xs font-bold tracking-[0.15em] uppercase mb-3 md:mb-4 text-center select-none">
            Want to know more?
          </p>

          <div className="flex justify-center w-full max-w-sm mx-auto">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto border border-brand-green text-brand-green hover:bg-brand-green hover:text-white font-poppins font-semibold text-xs sm:text-sm rounded-full py-3.5 px-10 transition-all duration-300 flex items-center justify-center gap-2.5 cursor-pointer group shadow-sm hover:shadow"
            >
              <LiaWhatsapp size={22} className="group-hover:scale-105 transition-transform" />
              Chat on WhatsApp
              <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>

        </div>
      </motion.div>
    </div>
  );
};
