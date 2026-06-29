"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
  flexRowDirection?: "row" | "row-reverse";
  isSplit?: boolean;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  className = "",
  flexRowDirection = "row-reverse",
  isSplit = true,
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

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

  if (!isOpen || !mounted) return null;

  const flexClasses = isSplit
    ? `${flexRowDirection === "row-reverse" ? "lg:flex-row-reverse" : "lg:flex-row"}`
    : "flex-col";

  const sizeClasses = isSplit ? "max-w-md md:max-w-2xl lg:max-w-5xl xl:max-w-6xl" : "max-w-md";

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-10 select-none">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={onClose}
        className="absolute inset-0 bg-[#2C3A1A]/40 backdrop-blur-md cursor-pointer"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: "spring", duration: 0.5, bounce: 0.12 }}
        className={cn(
          "relative z-10 w-full max-h-[85vh] md:max-h-[96vh] bg-white rounded-2xl overflow-y-auto shadow-premium flex flex-col border border-[#F2EADA] select-text",
          sizeClasses,
          flexClasses,
          className
        )}
      >
        {children}
      </motion.div>
    </div>,
    document.body
  );
};

export default Modal;
