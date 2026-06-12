import React from "react";

interface CheckoutGiftMessageProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  message: string;
  onMessageChange: (msg: string) => void;
}

export const CheckoutGiftMessage: React.FC<CheckoutGiftMessageProps> = ({
  isOpen,
  onOpenChange,
  message,
  onMessageChange,
}) => {
  const maxChars = 250;
  const remaining = maxChars - message.length;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    if (val.length <= maxChars) {
      onMessageChange(val);
    }
  };

  return (
    <div className="pt-5 border-t border-[#C4A482]/15 flex flex-col items-start w-full">
      {isOpen ? (
        <div className="space-y-1.5 text-left w-full animate-fadeIn font-poppins">
          <div className="flex justify-between items-center">
            <label className="text-xs sm:text-sm font-semibold text-brand-brown/85 block">
              Gift Message (Optional)
            </label>
            <span className={`text-[10px] font-semibold ${remaining < 20 ? "text-red-500" : "text-[#7D6B5E]"}`}>
              {remaining} characters left
            </span>
          </div>
          <textarea
            value={message}
            onChange={handleChange}
            placeholder="Enter your message for the recipient..."
            rows={3}
            className="w-full bg-white border border-[#C4A482]/40 rounded-lg p-3 text-sm font-poppins text-[#3A2418] focus:outline-none focus:border-[#F7A503] focus:ring-1 focus:ring-[#F7A503]/20 resize-none"
          />
        </div>
      ) : (
        <button
          type="button"
          onClick={() => onOpenChange(true)}
          className="border border-[#C4A482]/60 hover:bg-[#FDFBF7] text-[#7D6B5E] text-xs sm:text-sm font-bold tracking-wider rounded-lg py-2.5 px-6 uppercase transition-all active:scale-95 cursor-pointer font-poppins focus:outline-none"
        >
          ADD A GIFT MESSAGE
        </button>
      )}
    </div>
  );
};

export default CheckoutGiftMessage;
