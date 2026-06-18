"use client";

import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface PortalDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  triggerRef: React.RefObject<HTMLElement | null>;
  children: React.ReactNode;
  className?: string;
  width?: number; // width in pixels
  align?: "left" | "right";
}

export const PortalDropdown: React.FC<PortalDropdownProps> = ({
  isOpen,
  onClose,
  triggerRef,
  children,
  className = "",
  width = 192,
  align = "right",
}) => {
  const [mounted, setMounted] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    const updateCoords = () => {
      if (triggerRef.current) {
        const rect = triggerRef.current.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const menuHeight = menuRef.current ? menuRef.current.getBoundingClientRect().height : 245;

        const spaceBelow = viewportHeight - rect.bottom;

        let top = rect.bottom + window.scrollY;

        if (spaceBelow < menuHeight && rect.top > spaceBelow) {
          top = rect.top + window.scrollY - menuHeight - 4;
        }

        const left =
          align === "right" ? rect.right - width + window.scrollX : rect.left + window.scrollX;
        setCoords({ top, left });
      }
    };

    if (isOpen) {
      const handle = requestAnimationFrame(updateCoords);
      window.addEventListener("scroll", updateCoords, true);
      window.addEventListener("resize", updateCoords);

      return () => {
        cancelAnimationFrame(handle);
        window.removeEventListener("scroll", updateCoords, true);
        window.removeEventListener("resize", updateCoords);
      };
    }
  }, [isOpen, triggerRef, width, align]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        isOpen &&
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(e.target as Node)
      ) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose, triggerRef]);

  if (!isOpen || !mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-[90] pointer-events-none">
      <div className="absolute inset-0 pointer-events-auto" onClick={onClose} />

      <motion.div
        ref={menuRef}
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 5 }}
        transition={{ duration: 0.15 }}
        style={{
          position: "absolute",
          top: `${coords.top}px`,
          left: `${coords.left}px`,
          width: `${width}px`,
        }}
        className={cn(
          "bg-[#FDFAF3] border border-[#C4A482]/20 rounded-xl py-2 shadow-premium pointer-events-auto border-b-2",
          className
        )}
      >
        {children}
      </motion.div>
    </div>,
    document.body
  );
};

export default PortalDropdown;
