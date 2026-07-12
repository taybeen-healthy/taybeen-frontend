"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { ToastItem } from "@/context/ToastContext";
import { Check, X as CloseIcon, AlertTriangle, Info, AlertCircle } from "lucide-react";

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

  // Premium configurations for Left Accent Strip style
  const styles = {
    success: {
      wrapper: "relative overflow-hidden flex items-start gap-4 p-4 pr-5 pl-7 rounded-r-xl rounded-l-none border border-l-0 border-[#C4A482]/20 bg-[#FDFAF3] shadow-premium",
      accentText: "text-green-700",
      messageText: "text-brand-brown/90",
      indicatorBg: "bg-green-600",
      progressBar: "bg-green-600",
      closeBtn: "text-[#8D7F75] hover:text-[#3A2418] hover:bg-[#F6F1E9]",
      badgeBg: "bg-green-50 text-green-600",
      statusIconLarge: <Check size={16} strokeWidth={2.5} />,
    },
    error: {
      wrapper: "relative overflow-hidden flex items-start gap-4 p-4 pr-5 pl-7 rounded-r-xl rounded-l-none border border-l-0 border-[#C4A482]/20 bg-[#FDFAF3] shadow-premium",
      accentText: "text-red-700",
      messageText: "text-brand-brown/90",
      indicatorBg: "bg-red-500",
      progressBar: "bg-red-500",
      closeBtn: "text-[#8D7F75] hover:text-[#3A2418] hover:bg-[#F6F1E9]",
      badgeBg: "bg-red-50 text-red-500",
      statusIconLarge: <AlertCircle size={16} strokeWidth={2.5} />,
    },
    warning: {
      wrapper: "relative overflow-hidden flex items-start gap-4 p-4 pr-5 pl-7 rounded-r-xl rounded-l-none border border-l-0 border-[#C4A482]/20 bg-[#FDFAF3] shadow-premium",
      accentText: "text-amber-700",
      messageText: "text-brand-brown/90",
      indicatorBg: "bg-amber-500",
      progressBar: "bg-amber-500",
      closeBtn: "text-[#8D7F75] hover:text-[#3A2418] hover:bg-[#F6F1E9]",
      badgeBg: "bg-amber-50 text-amber-500",
      statusIconLarge: <AlertTriangle size={16} strokeWidth={2.5} />,
    },
    info: {
      wrapper: "relative overflow-hidden flex items-start gap-4 p-4 pr-5 pl-7 rounded-r-xl rounded-l-none border border-l-0 border-[#C4A482]/20 bg-[#FDFAF3] shadow-premium",
      accentText: "text-blue-700",
      messageText: "text-brand-brown/90",
      indicatorBg: "bg-blue-500",
      progressBar: "bg-blue-500",
      closeBtn: "text-[#8D7F75] hover:text-[#3A2418] hover:bg-[#F6F1E9]",
      badgeBg: "bg-blue-50 text-blue-500",
      statusIconLarge: <Info size={16} strokeWidth={2.5} />,
    },
  }[type];

  return (
    <motion.div
      initial={{ opacity: 0, y: -20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 15, scale: 0.95, transition: { duration: 0.2 } }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      className={`${styles.wrapper} max-w-sm w-full font-poppins text-sm`}
      role="alert"
    >
      {/* Thick vertical color indicator strip on left edge */}
      <div className={`absolute left-0 top-0 bottom-0 w-[6px] ${styles.indicatorBg}`} />

      {/* Large status badge container */}
      <div className={`shrink-0 w-9 h-9 rounded-xl flex items-center justify-center ${styles.badgeBg} shadow-sm select-none`}>
        {styles.statusIconLarge}
      </div>

      {/* Message Info */}
      <div className="flex-1 min-w-0 pt-0.5 select-text text-left">
        <h4 className={`font-serif text-xs font-bold uppercase tracking-wider mb-0.5 ${styles.accentText}`}>
          {type === "info" ? "Notification" : type}
        </h4>
        <p className={`text-xs font-medium leading-relaxed ${styles.messageText}`}>{message}</p>
      </div>

      {/* Close button */}
      <button
        onClick={() => onClose(id)}
        className={`shrink-0 p-1 rounded-lg transition-colors cursor-pointer ${styles.closeBtn}`}
        aria-label="Close notification"
      >
        <CloseIcon size={14} strokeWidth={2.5} />
      </button>

      {/* Progress track line */}
      <motion.div
        initial={{ width: "100%" }}
        animate={{ width: "0%" }}
        transition={{ duration: duration / 1000, ease: "linear" }}
        className={`absolute bottom-0 left-0 h-[2.5px] ${styles.progressBar}`}
      />
    </motion.div>
  );
};
