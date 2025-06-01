import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ReviewCard from './ReviewCard';

interface ReviewSectionProps {
  averageRating: number;
  reviewCount: string;
  reviews: Array<{
    id: string;
    reviewer: {
      initial: string;
      name: string;
    };
    date: string;
    rating: number;
    reviewText: string;
    color?: string;
  }>;
}

const ReviewSection: React.FC<ReviewSectionProps> = ({ 
  averageRating, 
  reviewCount, 
  reviews 
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const { current } = scrollContainerRef;
      const scrollAmount = 300;
      
      if (direction === 'left') {
        current.scrollLeft -= scrollAmount;
      } else {
        current.scrollLeft += scrollAmount;
      }
    }
  };

  const colors = [
    'bg-green-500',
    'bg-red-500', 
    'bg-blue-500', 
    'bg-purple-500',
    'bg-yellow-500'
  ];

  // Calculate percentage for circular progress
  const ratingPercentage = (averageRating / 5) * 100;

  return (
    <div id="reviews" className="mb-10 pt-4">
      <div className="flex justify-between items-center mb-1">
        <h2 className="text-xl font-bold">Reviews</h2>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="icon" 
            className="rounded-full transition-all duration-300"
            onClick={() => scroll('left')}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            className="rounded-full transition-all duration-300"
            onClick={() => scroll('right')}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {/* Reduced spacing between title and info */}
      <div className="flex text-sm text-gray-500 mb-4">
        <span>{reviewCount}</span>
        <span className="mx-1">•</span>
        <span>60+ public reviews</span>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-4">
        {/* Rating box with circular progress */}
        <div className="bg-amber-50 p-4 rounded-lg md:w-1/4 flex flex-col justify-center items-center">
          <div className="relative flex items-center justify-center w-24 h-24">
            {/* Custom circular progress ring */}
            <div className="absolute inset-0 rounded-full bg-gray-100"></div>
            <div className="absolute inset-0" style={{
              background: `conic-gradient(#FEF7CD ${ratingPercentage}%, #F1F0FB ${ratingPercentage}% 100%)`,
              borderRadius: "50%"
            }}></div>
            <div className="absolute inset-2 bg-amber-50 rounded-full"></div>
            <div className="flex flex-col items-center justify-center z-10">
              <div className="text-3xl font-bold text-gray-800">{averageRating}</div>
              <Star className="h-4 w-4 text-gray-600 mb-0.5" />
            </div>
          </div>
          <div className="mt-2 text-sm text-gray-500">of 5 stars</div>
        </div>

        {/* Reviews list */}
        <div 
          ref={scrollContainerRef}
          className="flex-1 flex gap-4 overflow-x-auto pb-4 scrollbar-none snap-x"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {reviews.map((review, index) => (
            <div key={review.id} className="min-w-[300px] max-w-[350px] snap-start">
              <ReviewCard 
                {...review} 
                color={review.color || colors[index % colors.length]}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReviewSection;
