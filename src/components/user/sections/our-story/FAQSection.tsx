"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { faqs, FaqItem } from "@/data/user/faqs";

interface FAQAccordionItemProps {
  item: FaqItem;
  isOpen: boolean;
  onToggle: () => void;
}

const FAQAccordionItem: React.FC<FAQAccordionItemProps> = ({ item, isOpen, onToggle }) => {
  return (
    <div className="border-b border-[#5A3E2B]/10">
      <button
        onClick={onToggle}
        className="w-full text-left py-5 sm:py-6 flex items-center justify-between gap-6 group transition-colors duration-200 focus:outline-none"
        aria-expanded={isOpen}
      >
        <span className="font-poppins font-semibold text-sm sm:text-base md:text-lg text-brand-brown group-hover:text-brand-brown-dark transition-colors duration-200">
          {item.question}
        </span>
        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center bg-[#F7A503]/10 text-brand-primary flex-shrink-0 transition-all duration-200 group-hover:bg-[#F7A503]/20">
          <motion.div
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="flex items-center justify-center"
          >
            <Plus className="w-4 h-4 sm:w-5 sm:h-5 text-brand-primary" strokeWidth={2.5} />
          </motion.div>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
            className="overflow-hidden"
          >
            <div className="pb-5 sm:pb-6 text-brand-green font-poppins text-xs sm:text-sm md:text-base leading-relaxed max-w-3xl">
              {item.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const FAQSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>(null);

  const handleToggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <Section bg="cream" className="py-12 sm:py-16 md:py-20 lg:py-24" id="faq">
      <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1.8fr] gap-10 lg:gap-16 xl:gap-20 items-start">
        <div className="space-y-4 text-left lg:sticky lg:top-28">
          <span className="text-[10px] sm:text-xs font-poppins font-bold tracking-[0.2em] text-[#768C3A] uppercase block">
            QUESTIONS
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-4xl xl:text-[2.75rem] font-serif font-bold text-brand-brown leading-tight">
            Things people ask us.
          </h2>
          <p className="text-[#768C3A] font-poppins text-sm md:text-base leading-relaxed max-w-sm">
            Honest answers to the questions we hear most — no corporate deflection, no vague
            reassurances.
          </p>
        </div>

        <div className="border-t border-[#5A3E2B]/10">
          {faqs.map((item) => (
            <FAQAccordionItem
              key={item.id}
              item={item}
              isOpen={openId === item.id}
              onToggle={() => handleToggle(item.id)}
            />
          ))}
        </div>
      </div>
    </Section>
  );
};

export default FAQSection;
