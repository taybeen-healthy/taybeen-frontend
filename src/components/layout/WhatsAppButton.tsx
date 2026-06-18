import React from "react";
import { FaWhatsapp } from "react-icons/fa";

export const WhatsAppButton: React.FC = () => {
  const msg = "Hii can you share details for the products";
  const whatsappUrl = `https://wa.me/919958544930?text=${encodeURIComponent(msg)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-start w-14 hover:w-44 h-14 bg-[#25D366] text-white rounded-full shadow-[0_8px_30px_rgba(37,211,102,0.4)] hover:shadow-[0_12px_36px_rgba(37,211,102,0.55)] transition-all duration-300 ease-in-out group cursor-pointer overflow-hidden"
    >
      <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-40 animate-ping group-hover:animate-none pointer-events-none" />

      <div className="w-14 h-14 flex items-center justify-center flex-shrink-0 relative z-10">
        <FaWhatsapp size={32} />
      </div>

      <span className="relative z-10 pr-6 text-sm font-semibold tracking-wide whitespace-nowrap transition-all duration-300 ease-in-out opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 font-poppins">
        Chat with us
      </span>
    </a>
  );
};

export default WhatsAppButton;
