
import React from 'react';
import StarRating from './StarRating';

interface ReviewCardProps {
  reviewer: {
    initial: string;
    name: string;
  };
  date: string;
  rating: number;
  reviewText: string;
  color?: string;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ 
  reviewer, 
  date, 
  rating, 
  reviewText,
  color = 'bg-blue-500' 
}) => {
  return (
    <div className="p-4 border border-gray-100 rounded-lg shadow-sm h-full flex flex-col">
      <div className="flex items-center space-x-3 mb-2">
        <div className={`${color} text-white font-medium rounded-full w-8 h-8 flex items-center justify-center`}>
          {reviewer.initial}
        </div>
        <div>
          <div className="font-medium">{reviewer.name}</div>
          <div className="text-xs text-gray-500">{date}</div>
        </div>
      </div>

      <div className="mb-2">
        <StarRating rating={rating} />
      </div>

      <p className="text-sm text-gray-700 line-clamp-3 flex-grow">{reviewText}</p>
    </div>
  );
};

export default ReviewCard;
