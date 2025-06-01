
import React from 'react';
import { Search, BadgeCheck } from 'lucide-react';
import { Input } from '@/components/ui/input';
import StarRating from './StarRating';

interface StickyHeaderProps {
  restaurantName: string;
  rating: number;
  ratingCount: string;
  cuisine: string;
  distance: string;
  isDashPass: boolean;
  isVisible: boolean;
}

const StickyHeader: React.FC<StickyHeaderProps> = ({
  restaurantName,
  rating,
  ratingCount,
  cuisine,
  distance,
  isDashPass,
  isVisible
}) => {
  if (!isVisible) return null;
  
  return (
    // 53.17px is the height of the sticky navigation bar but this value is not dynamic as just hard coded for development
    <div className="fixed top-[53.17px] left-0 right-0 bg-white shadow-md z-50 py-2 px-4 transition-transform duration-300">
      <div className="container mx-auto max-w-7xl flex justify-between items-center">
        <div>
          <div className="flex items-center gap-1">
            <h2 className="font-bold text-xl">{restaurantName}</h2>
            <BadgeCheck className="h-5 w-5 text-blue-500" />
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <span className="font-medium">{rating}</span>
            <StarRating rating={rating} size="sm" />
            <span className="ml-1">({ratingCount})</span>
            <span className="mx-1">•</span>
            {isDashPass && (
              <>
                <span className="bg-teal-500 text-white text-xs px-1 rounded">DashPass</span>
                <span className="mx-1">•</span>
              </>
            )}
            <span>{cuisine}</span>
            <span className="mx-1">•</span>
            <span>{distance}</span>
          </div>
        </div>
        
        <div className="relative">
          <Input 
            type="text" 
            placeholder={`Search ${restaurantName}`}
            className="w-60 pl-10 py-1 h-9 rounded-full"
          />
          <Search className="absolute left-3 top-2 h-5 w-5 text-gray-400" />
        </div>
      </div>
    </div>
  );
};

export default StickyHeader;
