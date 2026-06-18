"use client";

import React from "react";
import Image from "next/image";
import { X, ArrowRight } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { Product } from "@/types";
import { Modal } from "@/components/ui/Modal";
import { StarRating } from "@/components/ui/StarRating";
import { formatIndianNumber } from "@/lib/utils";

interface ComingSoonModalProps {
  product: Product;
  onClose: () => void;
}

export const ComingSoonModal: React.FC<ComingSoonModalProps> = ({ product, onClose }) => {
  const messageText = `Hi Taybeen, I'm interested in ordering ${product.name} (${product.weight}) for ₹${product.price}.`;
  const whatsappUrl = `https://wa.me/919958544930?text=${encodeURIComponent(messageText)}`;

  return (
    <Modal isOpen={true} onClose={onClose} className="lg:h-[660px]">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 md:top-6 md:right-6 z-50 w-8 h-8 sm:w-10 sm:h-10 bg-white/80 hover:bg-white text-brand-brown hover:text-black rounded-full flex items-center justify-center border border-[#F2EADA] transition-all cursor-pointer shadow-sm active:scale-95 focus:outline-none focus:ring-2 focus:ring-brand-primary"
        aria-label="Close modal"
      >
        <X size={18} className="sm:w-5 sm:h-5" />
      </button>

      <div className="relative w-full lg:w-[50%] h-[200px] sm:h-[240px] lg:h-full flex-shrink-0 overflow-hidden border-b lg:border-b-0 lg:border-l border-[#F2EADA] p-4 lg:p-8 flex items-center justify-center bg-white">
        <Image
          src="/ComingSoon Dates.png"
          alt="Taybeen Premium Dates"
          className="max-w-full max-h-full object-contain select-none pointer-events-none"
          priority
          width={400}
          height={400}
        />
      </div>

      <div className="flex-1 p-5 sm:p-8 lg:p-10 xl:p-14 overflow-y-auto flex flex-col justify-center items-center text-center h-auto lg:h-full select-text">
        <Image
          src="/TaybeenLogo.png"
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
                {firstPart} <span className="text-brand-primary">{lastWord}</span>
              </>
            );
          })()}
        </h2>

        <p className="text-[#7D6B5E] font-poppins text-xs sm:text-sm lg:text-base leading-relaxed max-w-md mx-auto mb-4 md:mb-5 text-center line-clamp-3 lg:line-clamp-none">
          {product.description}
        </p>

        <div className="flex flex-col items-center mb-4 md:mb-6">
          <p className="text-brand-brown/90 font-poppins text-xs sm:text-sm font-semibold tracking-wide mb-1 md:mb-2 flex items-center justify-center gap-1.5 flex-wrap">
            <span>Pack Size: {product.weight}</span>
            <span>·</span>
            <span>Price:</span>
            {product.originalPrice ? (
              <>
                <span className="line-through text-brand-brown/60">₹{product.originalPrice}</span>
                <span className="text-brand-brown">₹{product.price}</span>
                <span className="text-[#768C3A]">
                  (
                  {Math.round(
                    ((product.originalPrice - product.price) / product.originalPrice) * 100
                  )}
                  % OFF)
                </span>
              </>
            ) : (
              <span>₹{product.price}</span>
            )}
          </p>

          <div className="flex items-center gap-1.5 text-brand-primary">
            <StarRating rating={product.rating} size={14} />
            <span className="text-xs font-poppins text-[#8D7F75] font-normal ml-1">
              ({formatIndianNumber(product.reviewsCount)} reviews)
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
            className="w-full sm:w-auto bg-[#25D366] hover:bg-[#20ba5a] border border-[#25D366] hover:border-[#20ba5a] text-white font-poppins font-semibold text-xs sm:text-sm rounded-full py-3.5 px-10 transition-all duration-300 flex items-center justify-center gap-2.5 cursor-pointer group shadow-sm hover:shadow"
          >
            <FaWhatsapp size={22} className="group-hover:scale-105 transition-transform" />
            Chat on WhatsApp
            <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
          </a>
        </div>
      </div>
    </Modal>
  );
};
