import React from "react";

interface BadgeProps {
  text: string;
  variant?: "best-seller" | "new" | "rare" | "default";
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
