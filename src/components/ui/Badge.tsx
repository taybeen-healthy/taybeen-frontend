import React from "react";

interface BadgeProps {
  text: string;
  variant?: "best-seller" | "new" | "rare" | "default" | "success" | "pending" | "error" | "info";
  className?: string;
  style?: React.CSSProperties;
}

export const Badge: React.FC<BadgeProps> = ({
  text,
  variant = "default",
  className = "",
  style,
}) => {
  const getBadgeStyle = () => {
    switch (variant) {
      case "best-seller":
        return { backgroundColor: "#F7A503" };
      case "new":
        return { backgroundColor: "#4A5E28" };
      case "rare":
        return { backgroundColor: "#5A3E2B" };
      case "success":
        return { backgroundColor: "#4A5E28" }; // Matches brand-green
      case "pending":
        return { backgroundColor: "#F59E0B" }; // Matches amber-500
      case "error":
        return { backgroundColor: "#EF4444" }; // Matches red-500
      case "info":
        return { backgroundColor: "#3B82F6" }; // Matches blue-500
      default:
        return { backgroundColor: "#768C3A" };
    }
  };

  return (
    <div
      className={`px-3 py-1 rounded-full text-white text-[9px] md:text-[10px] font-poppins font-bold uppercase tracking-wider shadow-sm select-none shrink-0 ${className}`}
      style={{ ...getBadgeStyle(), ...style }}
    >
      {text}
    </div>
  );
};
export default Badge;

