import React from "react";
import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  maxStars?: number;
  size?: number;
  className?: string;
}

export const StarRating: React.FC<StarRatingProps> = ({
  rating,
  maxStars = 5,
  size = 12,
  className = "",
}) => {
  return (
    <div className={`flex items-center gap-0.5 text-brand-primary ${className}`}>
      {[...Array(maxStars)].map((_, i) => (
        <Star
          key={i}
          size={size}
          className="shrink-0"
          style={{ width: size, height: size }}
          fill={i < Math.floor(rating) ? "#F7A503" : "transparent"}
          stroke="#F7A503"
          strokeWidth={i < Math.floor(rating) ? 0 : 1.5}
        />
      ))}
    </div>
  );
};
export default StarRating;
