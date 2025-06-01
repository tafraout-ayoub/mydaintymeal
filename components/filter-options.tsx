"use client";

import { IconChevronDown, IconTag, IconClock, IconCheck, IconCircle } from '@tabler/icons-react';
import { useState } from 'react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuTrigger 
} from './ui/dropdown-menu';

export default function FilterOptions() {
  const [selectedDate, setSelectedDate] = useState('Monday');
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedRating, setSelectedRating] = useState(4.6);
  const [selectedPrice, setSelectedPrice] = useState<string | null>(null);

  const days = [
    { name: 'Monday', date: 'May 12' },
    { name: 'Today', date: 'May 13' },
    { name: 'Tomorrow', date: 'May 14' },
    { name: 'Friday', date: 'May 15' },
    { name: 'Saturday', date: 'May 16' },
  ];

  const times = [
    '12:00 PM',
    '12:10 PM',
    '12:20 PM',
    '12:30 PM',
    '12:40 PM'
  ];

  const ratings = [4.6, 4.7, 4.8, 4.9];
  
  const priceOptions = ['$', '$$', '$$$', '$$$$'];

  return (
    <div className="flex gap-1.5 md:gap-2 overflow-x-auto no-scrollbar py-3 md:py-4 px-1">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="px-3 md:px-4 py-1.5 md:py-2 rounded-full border border-gray-200 bg-gray-100 text-xs md:text-sm font-semibold text-black flex items-center gap-1 whitespace-nowrap">
            <IconClock className="h-3 w-3 md:h-4 md:w-4 text-black" />
            Schedule
            <IconChevronDown className="ml-1 h-3 w-3 md:h-4 md:w-4 text-black" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[400px] p-0 bg-white border border-gray-200 shadow-lg rounded-lg" align="start" sideOffset={5}>
          <div className="p-5">
            <div className="font-semibold text-lg mb-1">Schedule</div>
            <div className="text-sm text-gray-600 mb-5">Schedule your order up to 5 days later</div>
            
            {/* Date selection - scrollable */}
            <div className="mb-5">
              <div className="overflow-x-auto scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-300 py-2">
                <div className="flex gap-3 min-w-max">
                  {days.slice(0, 3).map((day, index) => (
                    <button 
                      key={day.name}
                      className={`relative py-3 px-3 min-w-[120px] rounded-md ${selectedDate === day.name ? 'border-2 border-black' : 'border border-gray-200'}`}
                      onClick={() => setSelectedDate(day.name)}
                    >
                      <div className="text-center">
                        <div className="text-sm font-semibold">{day.name}</div>
                        <div className="text-xs text-gray-500 mt-1">{day.date}</div>
                      </div>
                      {selectedDate === day.name && (
                        <IconCheck size={16} className="absolute top-2 right-2 text-white bg-black rounded-full p-0.5" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Time selection with scrollbar */}
            <div className="mb-6 max-h-44 overflow-y-auto">
              <div className="divide-y divide-gray-100">
                {times.map((time, index) => (
                  <div 
                    key={time} 
                    className={`py-3 px-1 flex items-center gap-3 cursor-pointer font-semibold ${time === '12:40 PM' ? 'text-gray-300 pointer-events-none' : ''}`}
                    onClick={() => time !== '12:40 PM' && setSelectedTime(time)}
                    aria-disabled={time === '12:40 PM'}
                  >
                    <div className="w-5 h-5 rounded-full border border-gray-300 flex items-center justify-center">
                      {selectedTime === time && <div className="w-2.5 h-2.5 rounded-full bg-black"></div>}
                    </div>
                    <span className="text-sm">{time}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Action buttons */}
            <div className="flex justify-end items-center pt-1">
              <button 
                onClick={() => {
                  setSelectedDate('Monday');
                  setSelectedTime(null);
                }}
                className="text-sm font-medium text-black mr-4"
              >
                Reset
              </button>
              <button className="px-6 py-2 text-sm font-medium bg-red-600 text-white rounded-full">
                Save
              </button>
            </div>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>

      <button className="px-3 md:px-4 py-1.5 md:py-2 rounded-full border border-gray-200 bg-gray-100 text-xs md:text-sm font-semibold text-black flex items-center gap-1 whitespace-nowrap">
        <IconTag className="h-3 w-3 md:h-4 md:w-4 text-black" />
        Deals
      </button>
      
      <button className="px-3 md:px-4 py-1.5 md:py-2 rounded-full border border-gray-200 bg-gray-100 text-xs md:text-sm font-semibold text-black whitespace-nowrap">
        Pickup
      </button>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="px-3 md:px-4 py-1.5 md:py-2 rounded-full border border-gray-200 bg-gray-100 text-xs md:text-sm font-semibold text-black flex items-center whitespace-nowrap">
            Over {selectedRating} ★ 
            <IconChevronDown className="ml-1 h-3 w-3 md:h-4 md:w-4 text-black" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[300px] p-0 bg-white border border-gray-200 shadow-lg rounded-lg" align="start" sideOffset={5}>
          <div className="p-4">
            <div className="font-semibold text-lg mb-4">Ratings</div>
            <div className="text-sm text-gray-500 mb-5">Over {selectedRating}</div>
            
            {/* Rating slider UI */}
            <div className="mb-6 relative">
              {/* Track line */}
              <div className="w-full h-[2px] bg-gray-200 absolute top-[10px]"></div>
              
              {/* Rating points */}
              <div className="flex justify-between items-center relative">
                {ratings.map((rating) => (
                  <div key={rating} className="flex flex-col items-center relative">
                    <button 
                      onClick={() => setSelectedRating(rating)}
                      className={`w-5 h-5 rounded-full ${rating === selectedRating ? 'bg-black' : 'bg-white border border-gray-300'}`}
                    />
                    <span className="text-xs mt-2 font-semibold">{rating}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Action buttons */}
            <div className="flex justify-between items-center pt-4">
              <button 
                className="text-sm font-medium text-black"
              >
                Cancel
              </button>
              <button className="px-6 py-2 text-sm font-medium bg-red-600 text-white rounded-full">
                View Results
              </button>
            </div>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
      
      <button className="px-3 md:px-4 py-1.5 md:py-2 rounded-full border border-gray-200 bg-gray-100 text-xs md:text-sm font-semibold text-black whitespace-nowrap">
        Under 30 min
      </button>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="px-3 md:px-4 py-1.5 md:py-2 rounded-full border border-gray-200 bg-gray-100 text-xs md:text-sm font-semibold text-black flex items-center whitespace-nowrap">
            Price
            <IconChevronDown className="ml-1 h-3 w-3 md:h-4 md:w-4 text-black" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[300px] p-0 bg-white border border-gray-200 shadow-lg rounded-lg" align="start" sideOffset={5}>
          <div className="p-4">
            <div className="font-semibold text-lg mb-4">Price</div>
            
            {/* Price options */}
            <div className="flex gap-2 mb-6">
              {priceOptions.map((price) => (
                <button 
                  key={price}
                  onClick={() => setSelectedPrice(price)}
                  className={`flex-1 py-2 rounded-full text-center font-semibold ${
                    selectedPrice === price 
                      ? 'bg-black text-white' 
                      : 'bg-gray-100 text-black'
                  }`}
                >
                  {price}
                </button>
              ))}
            </div>
            
            {/* Action buttons */}
            <div className="flex justify-between items-center pt-4">
              <button 
                onClick={() => setSelectedPrice(null)}
                className="text-sm font-medium text-black"
              >
                Reset
              </button>
              <button className="px-6 py-2 text-sm font-medium bg-red-600 text-white rounded-full">
                View Results
              </button>
            </div>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}