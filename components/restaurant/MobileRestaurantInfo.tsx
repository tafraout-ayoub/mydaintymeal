
import React, { useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Info, Star, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import StarRating from './StarRating';

interface MobileRestaurantInfoProps {
  restaurant: {
    name: string;
    rating: number;
    ratingCount: string;
    distance: string;
    priceRange: string;
    cuisine: string;
    isDashPass: boolean;
    description?: string;
  };
  expandedDescription: boolean;
  setExpandedDescription: (value: boolean) => void;
}

const MobileRestaurantInfo: React.FC<MobileRestaurantInfoProps> = ({ 
  restaurant,
  expandedDescription,
  setExpandedDescription
}) => {
  const [showInfoDialog, setShowInfoDialog] = useState(false);
  const restaurantDescription = restaurant.description || 
    "We're a family-owned restaurant serving delicious meals made with fresh ingredients. Our focus is on quality food and great service to ensure you have the best dining experience.";

  return (
    <div className="mb-4 sm:hidden">
      {/* Restaurant Info Line */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <span className="font-medium">{restaurant.rating}</span>
          <StarRating rating={restaurant.rating} size="sm" />
          <span className="ml-1 text-sm">({restaurant.ratingCount})</span>
          <span className="mx-1">•</span>
          <span className="text-sm">{restaurant.distance}</span>
          <span className="mx-1">•</span>
          <span className="text-sm">{restaurant.priceRange}</span>
          <span className="mx-1">•</span>
          <span className="text-sm">{restaurant.cuisine}</span>
        </div>
        <button 
          className="text-gray-500 hover:text-black" 
          onClick={() => setShowInfoDialog(true)}
          aria-label="More information"
        >
          <Info className="h-5 w-5" />
        </button>
      </div>

      {/* Restaurant Description */}
      <div className="mb-4">
        <p className={`text-sm text-gray-600 ${expandedDescription ? '' : 'line-clamp-3'}`}>
          {restaurantDescription}
        </p>
        <button 
          className="text-sm text-gray-700 font-medium mt-1"
          onClick={() => setExpandedDescription(!expandedDescription)}
        >
          {expandedDescription ? 'See less' : '...See more'}
        </button>
      </div>

      {/* Search Input - Fixed when scrolling */}
      <div className="sticky top-0 bg-gray-50 py-2 z-10 w-full">
        <div className="relative w-[90%] mx-auto">
          <Input 
            type="text" 
            placeholder={`Search ${restaurant.name}`} 
            className="pl-10 py-2 rounded-full w-full"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
      </div>

      {/* Full Screen Restaurant Info Dialog */}
      <Dialog open={showInfoDialog} onOpenChange={setShowInfoDialog}>
        <DialogContent className="w-full h-full max-w-full max-h-full m-0 p-4 sm:p-6 rounded-none flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">{restaurant.name}</h2>
            <button 
              onClick={() => setShowInfoDialog(false)}
              className="p-2 rounded-full hover:bg-gray-100"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          
          <div className="flex-1 overflow-auto">
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">About</h3>
              <p className="text-gray-600 mb-4">
                {restaurantDescription}
              </p>
              
              <div className="flex items-center mb-2">
                <span className="font-medium mr-1">{restaurant.rating}</span>
                <StarRating rating={restaurant.rating} size="sm" />
                <span className="ml-1 text-sm">({restaurant.ratingCount} ratings)</span>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {restaurant.isDashPass && (
                  <Badge className="bg-teal-500">DashPass</Badge>
                )}
                <Badge variant="outline">{restaurant.cuisine}</Badge>
                <Badge variant="outline">{restaurant.priceRange}</Badge>
                <Badge variant="outline">{restaurant.distance}</Badge>
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Hours</h3>
              <p className="text-gray-600">Monday - Friday: 9:00 AM - 10:00 PM</p>
              <p className="text-gray-600">Saturday - Sunday: 8:00 AM - 11:00 PM</p>
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Address</h3>
              <p className="text-gray-600">123 Main Street</p>
              <p className="text-gray-600">Anytown, CA 12345</p>
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Contact</h3>
              <p className="text-gray-600">Phone: (555) 123-4567</p>
              <p className="text-gray-600">Email: info@restaurant.com</p>
            </div>
            
            <div className="bg-gray-100 rounded-lg p-4 flex items-center justify-center h-64 mb-6">
              <div className="text-center">
                <p className="text-gray-500">Map Placeholder</p>
                <p className="text-sm text-gray-400">Restaurant Location</p>
              </div>
            </div>
          </div>
          
          <div className="mt-4">
            <Button 
              onClick={() => setShowInfoDialog(false)}
              className="w-full bg-gray-900 hover:bg-gray-800 text-white"
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MobileRestaurantInfo;
