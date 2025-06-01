"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useState, useRef } from 'react';
import { IconThumbUp } from '@tabler/icons-react';
import { SeeAllButton } from './ui/see-all-button';

interface RestaurantImage {
  id: number;
  url: string;
}

interface Restaurant {
  id: number;
  name: string;
  images: RestaurantImage[]; // Changed from single image to multiple images
  rating: number;
  ratings: string;
  distance: string;
  time: string;
  deliveryFee: string;
  partnerBadge?: boolean;
  tag?: string;
  promo?: string;
}

const cheapDeliveryRestaurants: Restaurant[] = [
  {
    id: 1,
    name: "McDonald's",
    images: [
      { id: 1, url: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80" },
      { id: 2, url: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=800&q=80" },
      { id: 3, url: "https://images.unsplash.com/photo-1552895638-f7fe08d2f7d5?auto=format&fit=crop&w=800&q=80" }
    ],
    rating: 4.2,
    ratings: "(200+)",
    distance: "1.1 mi",
    time: "13 min",
    deliveryFee: "$0 delivery fee, first order",
    partnerBadge: true,
    tag: "Dave's Double® with Cheese Combo"
  },
  {
    id: 2,
    name: "Little Caesars",
    images: [
      { id: 1, url: "https://images.unsplash.com/photo-1551615593-ef5fe247e8f7?auto=format&fit=crop&w=800&q=80" },
      { id: 2, url: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=800&q=80" },
      { id: 3, url: "https://images.unsplash.com/photo-1528137871618-79d2761e3fd5?auto=format&fit=crop&w=800&q=80" }
    ],
    rating: 4.6,
    ratings: "(200+)",
    distance: "2.0 mi",
    time: "27 min",
    deliveryFee: "$0 delivery fee, first order",
    partnerBadge: true,
    tag: "Chili Cheese Nachos (Cals: 3... CA$4.67"
  },
  {
    id: 3,
    name: "Wendy's",
    images: [
      { id: 1, url: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80" },
      { id: 2, url: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&w=800&q=80" },
      { id: 3, url: "https://images.unsplash.com/photo-1610614819513-58e34989e4aa?auto=format&fit=crop&w=800&q=80" }
    ],
    rating: 4.5,
    ratings: "(200+)",
    distance: "1.0 mi",
    time: "15 min",
    deliveryFee: "$0 delivery fee, first order",
    partnerBadge: true
  },
  {
    id: 4,
    name: "Ches's Fish and Chips",
    images: [
      { id: 1, url: "https://images.unsplash.com/photo-1613514785940-daed07799d9b?auto=format&fit=crop&w=800&q=80" },
      { id: 2, url: "https://images.unsplash.com/photo-1530046339160-ce3e530c7d2f?auto=format&fit=crop&w=800&q=80" },
      { id: 3, url: "https://images.unsplash.com/photo-1484980972926-edee96e0960d?auto=format&fit=crop&w=800&q=80" }
    ],
    rating: 4.4,
    ratings: "(200+)",
    distance: "1.2 mi",
    time: "28 min",
    deliveryFee: "$0 delivery fee, first order",
    partnerBadge: true
  },
  {
    id: 5,
    name: "Thai Express",
    images: [
      { id: 1, url: "https://images.unsplash.com/photo-1509722747041-616f39b57569?auto=format&fit=crop&w=800&q=80" },
      { id: 2, url: "https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?auto=format&fit=crop&w=800&q=80" },
      { id: 3, url: "https://images.unsplash.com/photo-1562565652-a0d8f0c59eb4?auto=format&fit=crop&w=800&q=80" }
    ],
    rating: 4.7,
    ratings: "(200+)",
    distance: "3.8 mi",
    time: "39 min",
    deliveryFee: "$0 delivery fee, first order",
    partnerBadge: true
  },
  // New restaurants from the screenshot
  {
    id: 6,
    name: "Rustler's Family Restaurant",
    images: [
      { id: 1, url: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d?auto=format&fit=crop&w=800&q=80" },
      { id: 2, url: "https://images.unsplash.com/photo-1583032015879-e5022cb87c3b?auto=format&fit=crop&w=800&q=80" },
      { id: 3, url: "https://images.unsplash.com/photo-1550748656-30b776b6df22?auto=format&fit=crop&w=800&q=80" }
    ],
    rating: 4.2,
    ratings: "(200+)",
    distance: "1.4 mi",
    time: "28 min",
    deliveryFee: "$0 delivery fee, first order",
    partnerBadge: true
  },
  {
    id: 7,
    name: "Cora",
    images: [
      { id: 1, url: "https://images.unsplash.com/photo-1608897013039-887f21d8c804?auto=format&fit=crop&w=800&q=80" },
      { id: 2, url: "https://images.unsplash.com/photo-1533089860892-a7c6f10a5103?auto=format&fit=crop&w=800&q=80" },
      { id: 3, url: "https://images.unsplash.com/photo-1600803907087-f56d462fd26b?auto=format&fit=crop&w=800&q=80" }
    ],
    rating: 4.3,
    ratings: "(200+)",
    distance: "2.4 mi",
    time: "33 min",
    deliveryFee: "$0 delivery fee, first order",
    partnerBadge: true
  },
  {
    id: 8,
    name: "Rocket Bakery",
    images: [
      { id: 1, url: "https://images.unsplash.com/photo-1499028344343-cd173ffc68a9?auto=format&fit=crop&w=800&q=80" },
      { id: 2, url: "https://images.unsplash.com/photo-1568376794508-ae52c6ab3929?auto=format&fit=crop&w=800&q=80" },
      { id: 3, url: "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?auto=format&fit=crop&w=800&q=80" }
    ],
    rating: 4.5,
    ratings: "(200+)",
    distance: "2.0 mi",
    time: "23 min",
    deliveryFee: "$0 delivery fee, first order",
    partnerBadge: true
  },
  {
    id: 9,
    name: "Robin's Donuts",
    images: [
      { id: 1, url: "https://images.unsplash.com/photo-1556745753-b2904692b3cd?auto=format&fit=crop&w=800&q=80" },
      { id: 2, url: "https://images.unsplash.com/photo-1558326567-98166e4a8854?auto=format&fit=crop&w=800&q=80" },
      { id: 3, url: "https://images.unsplash.com/photo-1556741533-6e6a62bd8b49?auto=format&fit=crop&w=800&q=80" }
    ],
    rating: 4.4,
    ratings: "(30+)",
    distance: "0.5 mi",
    time: "18 min",
    deliveryFee: "$0 delivery fee, first order",
    partnerBadge: true,
    promo: "20% off, up to CA$5"
  }
];

function RestaurantCard({ restaurant }: { restaurant: Restaurant }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  const goToImage = (index: number, e: React.MouseEvent) => {
    e.preventDefault(); // Prevent link navigation
    e.stopPropagation();
    setCurrentImageIndex(index);
  };

  const goToPrevious = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? restaurant.images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prevIndex) => 
      prevIndex === restaurant.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <Link 
      href="#" 
      className="block min-w-[280px] relative group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative rounded-lg overflow-hidden mb-2">
        <div className="w-full h-40 relative">
          {/* Carousel of images */}
          {restaurant.images.map((image, index) => (
            <div 
              key={image.id}
              className={`absolute inset-0 transition-all duration-300 ${
                index === currentImageIndex 
                  ? 'opacity-100 z-10 scale-100' 
                  : 'opacity-0 z-0 scale-105'
              }`}
            >
              <Image 
                src={image.url} 
                alt={`${restaurant.name} - image ${index + 1}`}
                className="object-cover transform transition-transform duration-300"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority={index === 0}
              />
              
              {/* Tag positioned on the image but only on the second image (index 1) */}
              {restaurant.tag && index === 1 && (
                <div className="absolute top-2 left-2 z-30 bg-white rounded-md shadow-sm flex items-center w-[90%] max-w-[280px]">
                  <div className="py-1 px-2 flex-1 overflow-hidden">
                    <div className="text-xs font-medium text-black whitespace-nowrap overflow-hidden text-ellipsis">
                      {restaurant.id === 1 ? "Dave's Double® with Cheese ..." : "Chili Cheese Nachos ..."}
                    </div>
                  </div>
                  <div className="py-1 px-2 text-xs font-semibold text-blue-600 flex items-center whitespace-nowrap border-l border-gray-100">
                    {restaurant.id === 1 ? "85% (73)" : "85% (97)"}
                    <IconThumbUp size={12} className="ml-1 text-blue-600" stroke={2} />
                  </div>
                </div>
              )}
            </div>
          ))}
          
          {/* Left and right arrow controls - only shown when hovering */}
          {isHovering && restaurant.images.length > 1 && (
            <>
              {/* Left arrow */}
              <button
                onClick={goToPrevious}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-1 shadow-md z-20 transition-all"
                aria-label="Previous image"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              {/* Right arrow */}
              <button
                onClick={goToNext}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-1 shadow-md z-20 transition-all"
                aria-label="Next image"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}
          
          {/* Carousel indicators - only shown when hovering */}
          {isHovering && restaurant.images.length > 1 && (
            <div className="absolute bottom-2 left-0 right-0 flex justify-center z-20">
              <div className="px-2 py-1 bg-black/20 backdrop-blur-md rounded-full flex gap-1.5 items-center">
                {restaurant.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={(e) => goToImage(index, e)}
                    className={`h-1.5 w-1.5 rounded-full transition-all duration-200 ${
                      index === currentImageIndex 
                        ? 'bg-white' 
                        : 'bg-white/50'
                    }`}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      
      <h3 className="font-semibold text-base flex items-center">
        {restaurant.name}
        {restaurant.partnerBadge && (
          <span className="ml-1 text-cyan-500">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-9.618 5.04C2.127 12.077 4.557 18.22 8.95 20.95c1.755 1.088 3.346 1.088 5.101 0 4.394-2.73 6.824-8.873 6.568-13.006z" />
            </svg>
          </span>
        )}
      </h3>
      
      <div className="flex items-center text-sm gap-1 text-gray-700">
        <span className="flex items-center">
          {restaurant.rating} ★ {restaurant.ratings}
        </span>
        <span className="mx-1">•</span>
        <span>{restaurant.distance}</span>
        <span className="mx-1">•</span>
        <span>{restaurant.time}</span>
      </div>
      
      <div className="text-sm text-gray-700 mt-0.5">
        {restaurant.deliveryFee}
      </div>
      
      {restaurant.promo && (
        <div className="text-sm text-red-500 font-medium mt-0.5">
          {restaurant.promo}
        </div>
      )}
    </Link>
  );
}

export default function DeliveryFeeSection() {
  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollPrevious = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollNext = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Under $2 delivery fee</h2>
        <SeeAllButton 
          href="#" 
          onPrevious={scrollPrevious}
          onNext={scrollNext}
        />
      </div>
      
      <div 
        ref={carouselRef}
        className="flex overflow-x-auto pb-4 gap-4 scrollbar-hide"
      >
        {cheapDeliveryRestaurants.map((restaurant) => (
          <RestaurantCard key={restaurant.id} restaurant={restaurant} />
        ))}
      </div>
    </div>
  );
} 