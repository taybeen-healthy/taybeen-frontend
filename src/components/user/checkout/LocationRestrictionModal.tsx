"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, MapPin } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

interface LocationRestrictionModalProps {
  isOpen: boolean;
  onClose: () => void;
  locationName?: string;
}

export const LocationRestrictionModal: React.FC<LocationRestrictionModalProps> = ({
  isOpen,
  onClose,
  locationName = "your location",
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !mounted) return null;

  const displayLocation = locationName.trim().toLowerCase();
  const whatsappMessage = `Hi Taybeen, I'm trying to order from ${locationName}, but noticed you currently deliver only within Delhi NCR. Could you please help me with delivery?`;
  const whatsappUrl = `https://wa.me/919958544930?text=${encodeURIComponent(whatsappMessage)}`;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6 select-none">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm cursor-pointer"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: "spring", duration: 0.4, bounce: 0.1 }}
            className="relative z-10 w-full max-w-[420px] bg-[#FDFAF3] rounded-[28px] overflow-hidden shadow-2xl border border-[#F2EADA] flex flex-col items-center text-center select-text scrollbar-none"
          >
            <div className="w-full bg-[#F4EBDC] pt-6 pb-5 px-6 relative flex flex-col items-center justify-center border-b border-[#EADFCF]">
              <button
                onClick={onClose}
                className="absolute top-3.5 right-3.5 w-8 h-8 bg-white text-gray-500 hover:text-black rounded-full flex items-center justify-center border border-[#E4D9C8] transition-all cursor-pointer shadow-xs active:scale-95 focus:outline-none"
                aria-label="Close modal"
              >
                <X size={16} />
              </button>

              <div className="relative w-full flex flex-col items-center justify-center pt-1">
                <div className="flex items-center justify-center gap-2">
                  <motion.div
                    animate={{ opacity: [0.2, 0.8, 0.2], x: [-3, 0, -3] }}
                    transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                    className="flex flex-col gap-0.5 text-[#CBB99E] font-mono text-xs font-bold leading-none select-none tracking-tighter"
                  >
                    <span>≡</span>
                  </motion.div>

                  <motion.div
                    animate={{
                      x: [-14, 14, -14],
                      y: [0, -2.5, 0, 1, 0],
                    }}
                    transition={{
                      x: { duration: 2.8, repeat: Infinity, ease: "easeInOut" },
                      y: { duration: 0.5, repeat: Infinity, ease: "easeInOut" },
                    }}
                    className="text-4xl sm:text-[42px] leading-none select-none filter drop-shadow-sm"
                  >
                    🚚
                  </motion.div>
                </div>

                <div className="w-40 h-[2.5px] bg-[#E2D2BC] rounded-full mt-1 opacity-80" />
              </div>
            </div>

            <div className="p-6 sm:p-8 flex flex-col items-center w-full">
              <div className="w-12 h-12 bg-[#4B3F05] rounded-full flex items-center justify-center mb-3.5 shadow-sm">
                <MapPin size={22} className="text-white" strokeWidth={2.5} />
              </div>

              <h3 className="font-serif font-bold text-3xl sm:text-[32px] text-[#4B3F05] leading-tight mb-1">
                Oops!
              </h3>

              <p className="font-poppins text-sm sm:text-base text-[#78883B] mb-4">
                Looks like you&apos;re in{" "}
                <strong className="font-bold text-[#4B3F05] uppercase">{displayLocation}</strong>
              </p>

              <div className="flex items-center justify-center gap-3 w-full max-w-[260px] my-1">
                <div className="flex-1 h-[1px] bg-[#E8DEC8]" />
                <div className="flex-1 h-[1px] bg-[#E8DEC8]" />
              </div>

              <p className="font-poppins text-sm sm:text-base text-[#4B3F05] mt-4 mb-1.5 font-medium">
                We currently deliver only within{" "}
                <strong className="font-bold text-[#6B7D2F]">Delhi NCR</strong>
              </p>

              <p className="font-poppins text-xs sm:text-sm text-[#8C7D6D] max-w-[280px] mb-6 leading-relaxed">
                If you&apos;re ordering from another location, drop us a message and we&apos;ll sort
                it out!
              </p>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#708434] hover:bg-[#5D6F2C] text-white font-poppins font-semibold text-sm sm:text-base py-3.5 rounded-xl shadow-md transition-colors cursor-pointer flex items-center justify-center gap-2.5 no-underline active:scale-[0.98]"
              >
                <FaWhatsapp size={22} />
                <span>Chat on WhatsApp</span>
              </a>

              <button
                onClick={onClose}
                className="mt-4 font-poppins font-medium text-xs sm:text-sm text-[#9C8B76] underline hover:text-[#4B3F05] transition-colors cursor-pointer focus:outline-none"
              >
                Continue browsing
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default LocationRestrictionModal;
