
import React from 'react';

interface StarRatingProps {
  rating: number;
  maxStars?: number;
  size?: "sm" | "md" | "lg";
}

const StarRating: React.FC<StarRatingProps> = ({ rating, maxStars = 5, size = "md" }) => {
  const sizeClasses = {
    sm: "text-xs",
    md: "text-base",
    lg: "text-lg",
  };
  
  return (
    <div className="flex">
      {[...Array(maxStars)].map((_, i) => (
        <span key={i} className={`${i < Math.round(rating) ? 'text-yellow-500' : 'text-gray-300'} ${sizeClasses[size]}`}>
          ★
        </span>
      ))}
    </div>
  );
};

export default StarRating;
