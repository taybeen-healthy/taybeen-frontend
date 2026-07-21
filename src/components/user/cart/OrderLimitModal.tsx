"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, AlertTriangle } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { CartItem, Product } from "@/types";

export interface AttemptedOrderInfo {
  cartItems?: CartItem[];
  attemptedProduct?: Product;
  attemptedWeight?: string;
  attemptedQuantity?: number;
}

interface OrderLimitModalProps {
  isOpen: boolean;
  onClose: () => void;
  attemptedInfo?: AttemptedOrderInfo;
}

export const OrderLimitModal: React.FC<OrderLimitModalProps> = ({
  isOpen,
  onClose,
  attemptedInfo,
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

  const buildWhatsAppMessage = () => {
    let message = "Hi Taybeen, I would like to place an order above 2kg.";

    if (attemptedInfo) {
      const itemsList: string[] = [];

      if (attemptedInfo.cartItems && attemptedInfo.cartItems.length > 0) {
        attemptedInfo.cartItems.forEach((item) => {
          itemsList.push(`• ${item.product.name} (${item.selectedWeight}) x ${item.quantity}`);
        });
      }

      if (attemptedInfo.attemptedProduct) {
        const weight = attemptedInfo.attemptedWeight || attemptedInfo.attemptedProduct.weight;
        const qty = attemptedInfo.attemptedQuantity || 1;
        itemsList.push(`• [Selected] ${attemptedInfo.attemptedProduct.name} (${weight}) x ${qty}`);
      }

      if (itemsList.length > 0) {
        message += `\n\nItems in my order:\n${itemsList.join("\n")}`;
      }
    }

    return message;
  };

  const whatsappUrl = `https://wa.me/919958544930?text=${encodeURIComponent(buildWhatsAppMessage())}`;

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
            className="relative z-10 w-full max-w-[400px] bg-[#FDFAF3] rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#F2EADA] flex flex-col items-center text-center select-text overflow-hidden"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 bg-white text-gray-400 hover:text-black rounded-full flex items-center justify-center border border-[#F2EADA] transition-all cursor-pointer shadow-sm active:scale-95 focus:outline-none"
              aria-label="Close modal"
            >
              <X size={16} />
            </button>

            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#FEF6E6] rounded-full flex items-center justify-center mb-5 mt-2">
              <AlertTriangle className="w-8 h-8 sm:w-10 sm:h-10 text-[#E6A100]" strokeWidth={2} />
            </div>

            <h3 className="font-serif font-semibold text-2xl sm:text-3xl text-[#5A3E2B] leading-tight mb-3">
              Order Limit Reached
            </h3>

            <p className="font-poppins text-sm sm:text-base text-[#6E5D4F] mb-1">
              Maximum order: <strong className="font-bold text-[#4A3B32]">2 kg</strong>.
            </p>

            <p className="font-poppins text-xs sm:text-sm text-[#7D6B5E] max-w-[280px] mb-6 leading-relaxed">
              For orders above 2 kg, please contact us on WhatsApp.
            </p>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-[#708238] hover:bg-[#5E6F2D] text-white font-poppins font-semibold text-sm sm:text-base py-3.5 rounded-xl shadow-md transition-colors cursor-pointer flex items-center justify-center gap-2.5 no-underline active:scale-[0.98]"
            >
              <FaWhatsapp size={22} />
              <span>Contact on WhatsApp</span>
            </a>

            <button
              onClick={onClose}
              className="mt-4 font-poppins font-medium text-xs sm:text-sm text-[#5A3E2B] underline hover:opacity-80 transition-opacity cursor-pointer focus:outline-none"
            >
              Go back
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default OrderLimitModal;
