"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, MapPin, Truck } from "lucide-react";
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
            className="relative z-10 w-full max-w-[420px] bg-[#FDFAF3] rounded-3xl overflow-hidden shadow-2xl border border-[#F2EADA] flex flex-col items-center text-center select-text scrollbar-none"
          >
            <div className="w-full bg-[#F6EFE3] py-5 px-6 relative flex items-center justify-center border-b border-[#EAE1D1]">
              <button
                onClick={onClose}
                className="absolute top-3.5 right-3.5 w-8 h-8 bg-white text-gray-400 hover:text-black rounded-full flex items-center justify-center border border-[#E8DFC8] transition-all cursor-pointer shadow-sm active:scale-95 focus:outline-none"
                aria-label="Close modal"
              >
                <X size={16} />
              </button>

              <div className="flex items-center justify-center gap-2 opacity-90 py-1">
                <div className="h-[2px] w-8 bg-[#D8C7B0]/60 rounded-full" />
                <div className="w-10 h-10 rounded-full bg-white/70 border border-[#E8DFC8] flex items-center justify-center shadow-xs">
                  <Truck size={22} className="text-[#C47D15] transform -scale-x-100" />
                </div>
                <div className="h-[2px] w-12 bg-[#D8C7B0]/60 rounded-full" />
              </div>
            </div>

            <div className="p-6 sm:p-8 flex flex-col items-center w-full">
              <div className="w-12 h-12 bg-[#5A3E2B] rounded-full flex items-center justify-center mb-3.5 shadow-sm">
                <MapPin size={22} className="text-white" strokeWidth={2.2} />
              </div>

              <h3 className="font-serif font-bold text-3xl text-[#3D2E24] leading-tight mb-1">
                Oops!
              </h3>

              <p className="font-poppins text-sm sm:text-base text-[#6E5D4F] mb-4">
                Looks like you&apos;re in <strong className="font-bold text-[#3D2E24] capitalize">{displayLocation}</strong>
              </p>

              <div className="w-full max-w-[260px] h-[1px] bg-[#E5DAC8] mb-5" />

              <p className="font-poppins text-sm sm:text-base text-[#3D2E24] mb-2 font-medium">
                We currently deliver only within <strong className="font-bold text-[#708238]">Delhi NCR</strong>
              </p>

              <p className="font-poppins text-xs sm:text-sm text-[#7D6B5E] max-w-[290px] mb-6 leading-relaxed">
                If you&apos;re ordering from another location, drop us a message and we&apos;ll sort it out!
              </p>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#708238] hover:bg-[#5E6F2D] text-white font-poppins font-semibold text-sm sm:text-base py-3.5 rounded-xl shadow-md transition-colors cursor-pointer flex items-center justify-center gap-2.5 no-underline active:scale-[0.98]"
              >
                <FaWhatsapp size={22} />
                <span>Chat on WhatsApp</span>
              </a>

              <button
                onClick={onClose}
                className="mt-4 font-poppins font-medium text-xs sm:text-sm text-[#5A3E2B] underline hover:opacity-80 transition-opacity cursor-pointer focus:outline-none"
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
