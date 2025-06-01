import React, { useState } from 'react';
import { Separator } from '@/components/ui/separator';
import StarRating from './StarRating';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Info } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface MenuSidebarProps {
  rating: number;
  ratingCount: string;
  distance: string;
  cuisine: string;
  priceRange: string;
  menuItems: Array<{
    id: string;
    name: string; 
    active: boolean;
  }>;
  onMenuItemClick: (id: string) => void;
  hidInfo: boolean
}

const MenuSidebar: React.FC<MenuSidebarProps> = ({
  rating,
  ratingCount,
  distance,
  cuisine,
  priceRange,
  menuItems,
  onMenuItemClick,
  hidInfo
}) => {
  const [showServiceFeeDialog, setShowServiceFeeDialog] = useState(false);
  const [showMoreDialog, setShowMoreDialog] = useState(false);

  return (
    <div className="w-full max-w-xs bg-white">
      {!hidInfo && <><div className="p-4">
        <h2 className="text-lg font-bold mb-2">Store Info</h2>
        
        <div className="flex items-center">
          <div className="bg-teal-500 text-white text-xs font-semibold px-2 py-0.5 rounded">
            DashPass
          </div>
        </div>
        
        <div className="flex items-center my-2">
          <span className="font-medium mr-1">{rating}</span>
          <StarRating rating={rating} size="sm" />
          <span className="ml-1 text-sm text-gray-600">({ratingCount})</span>
          <span className="mx-2 text-gray-400">•</span>
          <span className="text-sm text-gray-600">{distance}</span>
        </div>
        
        <div className="flex items-center text-sm text-gray-600">
          <span>{priceRange}</span>
          <span className="mx-2">•</span>
          <span>{cuisine}</span>
        </div>
        
        <div className="flex items-center mt-2 text-sm cursor-pointer" onClick={() => setShowServiceFeeDialog(true)}>
          <span className="text-gray-600">Service fees apply</span>
          <Info className="h-4 w-4 ml-1 text-gray-500" />
        </div>
        
        <button 
          className="w-full mt-4 py-2 text-center text-sm font-medium border border-gray-300 rounded-md hover:bg-gray-50"
          onClick={() => setShowMoreDialog(true)}
        >
          See More
        </button>
      </div>
      
      <Separator /></>}
      
      <div className="p-4">
        <h2 className="text-lg font-bold">Menu</h2>
        <p className="text-sm text-gray-600 mb-4">10:20 am - 11:29 pm</p>
        
        <ScrollArea className="h-[calc(100vh-280px)]">
          <div className="space-y-1 pr-4">
            {menuItems.map((item) => (
              <div 
                key={item.id}
                className={`px-4 py-2 rounded-md transition-colors cursor-pointer ${
                  item.active 
                    ? 'bg-gray-100 font-medium border-l-4 border-black' 
                    : 'hover:bg-gray-50'
                }`}
                onClick={() => onMenuItemClick(item.id)}
              >
                {item.name}
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Service Fees Dialog */}
      <Dialog open={showServiceFeeDialog} onOpenChange={setShowServiceFeeDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Service Fee Information</DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            <p className="mb-2 text-lg font-medium">DoorDash service fee applies to every delivery order</p>
            <p className="text-sm text-gray-600">
              This 11% service fee (minimum $1.99) helps us operate DoorDash. A reduced service 
              fee applies to eligible orders from DashPass merchants that meet the minimum subtotal. 
              Sign up for DashPass today!
            </p>
          </div>
        </DialogContent>
      </Dialog>

      {/* See More Dialog */}
      <Dialog open={showMoreDialog} onOpenChange={setShowMoreDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold flex items-center gap-1">
              Restaurant Information
            </DialogTitle>
          </DialogHeader>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">About</h3>
              <p className="text-gray-600 mb-4">
                We are a family-owned restaurant serving delicious meals since 1985. 
                Our focus is on quality ingredients and great service.
              </p>
              
              <h3 className="text-lg font-semibold mb-2">Contact</h3>
              <p className="text-gray-600">Phone: (555) 123-4567</p>
              <p className="text-gray-600">Email: info@restaurant.com</p>
              
              <h3 className="text-lg font-semibold mt-4 mb-2">Address</h3>
              <p className="text-gray-600">123 Main Street</p>
              <p className="text-gray-600">Anytown, CA 12345</p>
              
              <h3 className="text-lg font-semibold mt-4 mb-2">Hours</h3>
              <p className="text-gray-600">Monday - Friday: 9:00 AM - 10:00 PM</p>
              <p className="text-gray-600">Saturday - Sunday: 8:00 AM - 11:00 PM</p>
            </div>
            
            <div className="bg-gray-100 rounded-lg p-4 flex items-center justify-center min-h-[250px]">
              <div className="text-center">
                <p className="text-gray-500">Map Placeholder</p>
                <p className="text-sm text-gray-400">Restaurant Location</p>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end mt-4">
            <Button 
              onClick={() => setShowMoreDialog(false)}
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MenuSidebar;
