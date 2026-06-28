"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { ToastItem } from "@/context/ToastContext";

interface ToastProps {
  toast: ToastItem;
  onClose: (id: string) => void;
}

export const Toast: React.FC<ToastProps> = ({ toast, onClose }) => {
  const { id, message, type, duration = 4000 } = toast;

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(id);
    }, duration);
    return () => clearTimeout(timer);
  }, [id, duration, onClose]);

  const styles = {
    success: {
      bg: "bg-white/95 backdrop-blur-md",
      border: "border-[#4A5E28]/35",
      title: "Success",
      indicatorBg: "bg-[#4A5E28]",
      dotIcon: "✓",
      progressBar: "bg-[#4A5E28]",
    },
    error: {
      bg: "bg-white/95 backdrop-blur-md",
      border: "border-red-200",
      title: "Error",
      indicatorBg: "bg-red-500",
      dotIcon: "!",
      progressBar: "bg-red-500",
    },
    warning: {
      bg: "bg-white/95 backdrop-blur-md",
      border: "border-amber-200",
      title: "Warning",
      indicatorBg: "bg-amber-500",
      dotIcon: "⚠",
      progressBar: "bg-amber-500",
    },
    info: {
      bg: "bg-white/95 backdrop-blur-md",
      border: "border-[#C4A482]/30",
      title: "Notification",
      indicatorBg: "bg-[#5A3E2B]",
      dotIcon: "i",
      progressBar: "bg-[#5A3E2B]",
    },
  }[type];

  return (
    <motion.div
      initial={{ opacity: 0, y: -20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 15, scale: 0.95, transition: { duration: 0.2 } }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      className={`relative overflow-hidden flex items-start gap-4 p-4 pr-5 rounded-2xl border shadow-premium max-w-sm w-full font-poppins text-sm ${styles.bg} ${styles.border}`}
      role="alert"
    >
      <div className="relative shrink-0 w-10 h-10 flex items-center justify-center rounded-xl bg-[#FDFAF3] border border-[#C4A482]/20 shadow-sm select-none">
        <img src="/LogoInitial.svg" className="w-7 h-7 object-contain" alt="Taybeen Logo" />
        <span
          className={`absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full border border-white flex items-center justify-center text-[7px] text-white font-bold font-sans ${styles.indicatorBg}`}
        >
          {styles.dotIcon}
        </span>
      </div>

      <div className="flex-1 min-w-0 pt-0.5 select-text text-left">
        <p className="font-bold text-[#3A2418] text-2xs uppercase tracking-wider mb-0.5">
          {styles.title}
        </p>
        <p className="text-xs text-brand-brown/95 font-medium leading-relaxed">{message}</p>
      </div>
      <button
        onClick={() => onClose(id)}
        className="shrink-0 text-[#8D7F75] hover:text-[#3A2418] p-1 hover:bg-[#F6F1E9] rounded-lg transition-colors cursor-pointer"
        aria-label="Close notification"
      >
        <svg
          className="w-3.5 h-3.5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <motion.div
        initial={{ width: "100%" }}
        animate={{ width: "0%" }}
        transition={{ duration: duration / 1000, ease: "linear" }}
        className={`absolute bottom-0 left-0 h-[3px] ${styles.progressBar}`}
      />
    </motion.div>
  );
};
