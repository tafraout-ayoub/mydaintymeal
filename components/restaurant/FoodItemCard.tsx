import React from 'react';
import { PlusCircle } from 'lucide-react';

const FoodItemCard = ({ name, image, price, tag }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden w-[280px] hover:shadow-md transition-shadow duration-300">
      <div className="relative h-40">
        <img 
          src={image} 
          alt={name}
          className="w-full h-full object-cover"
        />
        {tag && (
          <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
            {tag}
          </span>
        )}
        <button className="absolute bottom-2 right-2 bg-white rounded-full p-1 shadow-md hover:bg-gray-100 transition-colors duration-300">
          <PlusCircle className="h-6 w-6 text-red-500" />
        </button>
      </div>
      
      <div className="p-3">
        <h3 className="font-bold text-gray-800 mb-1 truncate">{name}</h3>
        
        {/* Note: 'description' is not in your props but appears in the JSX */}
        {false && ( // Disabled since description isn't a prop
          <p className="text-gray-600 text-sm mb-2 line-clamp-2">desc</p>
        )}
        
        <div className="flex justify-between items-center">
          <span className="font-bold text-gray-800">{price}</span>
          
          <div className="flex items-center">
            <span className="text-sm font-medium text-gray-700 mr-1">
              88%
            </span>
            <span className="text-sm text-gray-500">
              (99+)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodItemCard;
