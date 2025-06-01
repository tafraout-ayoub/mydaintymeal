"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useState, useRef } from 'react';
import { SeeAllButton } from './ui/see-all-button';

interface RestaurantImage {
  id: number;
  url: string;
}

interface Restaurant {
  id: number;
  name: string;
  images: RestaurantImage[]; // Changed from single image to multiple images
  rating?: number;
  ratings?: string;
  distance: string;
  time: string;
  deliveryFee?: string;
  partnerBadge?: boolean;
}

const pastOrderRestaurants: Restaurant[] = [
  {
    id: 1,
    name: "Dominion",
    images: [
      { id: 1, url: "https://images.unsplash.com/photo-1485637701894-09ad422f6de6?auto=format&fit=crop&w=800&q=80" },
      { id: 2, url: "https://images.unsplash.com/photo-1516478177764-9fe5bd7e9717?auto=format&fit=crop&w=800&q=80" },
      { id: 3, url: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=800&q=80" }
    ],
    rating: 4.7,
    ratings: "(200+)",
    distance: "1.4 mi",
    time: "38 min",
    deliveryFee: "$0 delivery fee, first order",
    partnerBadge: true
  },
  {
    id: 2,
    name: "The Neighborhood Meals To Go - 1914",
    images: [
      { id: 1, url: "https://images.unsplash.com/photo-1564671165093-20688ff1fffa?auto=format&fit=crop&w=800&q=80" },
      { id: 2, url: "https://images.unsplash.com/photo-1564671165093-20688ff1fffa?auto=format&fit=crop&w=800&q=80" },
      { id: 3, url: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=800&q=80" }
    ],
    distance: "2.9 mi",
    time: "32 min",
    deliveryFee: "$0 delivery fee, first order"
  },
  {
    id: 3,
    name: "Sandwich by Crepaulie",
    images: [
      { id: 1, url: "https://images.unsplash.com/photo-1485451456034-3f9391c6f769?auto=format&fit=crop&w=800&q=80" },
      { id: 2, url: "https://images.unsplash.com/photo-1554433607-66b5efe9d304?auto=format&fit=crop&w=800&q=80" },
      { id: 3, url: "https://images.unsplash.com/photo-1481070414801-51fd732d7184?auto=format&fit=crop&w=800&q=80" }
    ],
    distance: "4.0 mi",
    time: "41 min",
    deliveryFee: "$0 delivery fee, first order",
    partnerBadge: true
  },
  {
    id: 4,
    name: "Jumping Bean",
    images: [
      { id: 1, url: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=800&q=80" },
      { id: 2, url: "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?auto=format&fit=crop&w=800&q=80" },
      { id: 3, url: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80" }
    ],
    rating: 4.6,
    ratings: "(30+)",
    distance: "5.2 mi",
    time: "34 min",
    deliveryFee: "$0 delivery fee, first order",
    partnerBadge: true
  },
  {
    id: 5,
    name: "Crepaulie",
    images: [
      { id: 1, url: "https://images.unsplash.com/photo-1469533778471-92a68acc3633?auto=format&fit=crop&w=800&q=80" },
      { id: 2, url: "https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=800&q=80" },
      { id: 3, url: "https://images.unsplash.com/photo-1484980972926-edee96e0960d?auto=format&fit=crop&w=800&q=80" }
    ],
    rating: 4.8,
    ratings: "(200+)",
    distance: "3.9 mi",
    time: "30 min",
    deliveryFee: "$0 delivery fee, first order",
    partnerBadge: true
  },
  {
    id: 6,
    name: "Tim Hortons",
    images: [
      { id: 1, url: "https://images.unsplash.com/photo-1567016546367-c27a0d56712e?auto=format&fit=crop&w=800&q=80" },
      { id: 2, url: "https://images.unsplash.com/photo-1550989460-0adf9ea622e2?auto=format&fit=crop&w=800&q=80" },
      { id: 3, url: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=800&q=80" }
    ],
    rating: 4.2,
    ratings: "(200+)",
    distance: "0.9 mi",
    time: "17 min",
    deliveryFee: "$0 delivery fee, first order",
    partnerBadge: true
  },
  {
    id: 7,
    name: "Ches's Fish and Chips",
    images: [
      { id: 1, url: "https://images.unsplash.com/photo-1579208030886-b937da0925dc?auto=format&fit=crop&w=800&q=80" },
      { id: 2, url: "https://images.unsplash.com/photo-1613514785940-daed07799d9b?auto=format&fit=crop&w=800&q=80" },
      { id: 3, url: "https://images.unsplash.com/photo-1484980972926-edee96e0960d?auto=format&fit=crop&w=800&q=80" }
    ],
    rating: 4.3,
    ratings: "(200+)",
    distance: "0.6 mi",
    time: "21 min",
    deliveryFee: "$0 delivery fee, first order",
    partnerBadge: true
  },
  {
    id: 8,
    name: "McDonald's",
    images: [
      { id: 1, url: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80" },
      { id: 2, url: "https://images.unsplash.com/photo-1619881585386-4f9f8a0cd585?auto=format&fit=crop&w=800&q=80" },
      { id: 3, url: "https://images.unsplash.com/photo-1552895638-f7fe08d2f7d5?auto=format&fit=crop&w=800&q=80" }
    ],
    rating: 4.1,
    ratings: "(200+)",
    distance: "1.4 mi",
    time: "18 min",
    deliveryFee: "$0 delivery fee, first order",
    partnerBadge: true
  }
];

function RestaurantCard({ restaurant }: { restaurant: Restaurant }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [isTouching, setIsTouching] = useState(false);
  const [initialTouch, setInitialTouch] = useState(true);

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    setCurrentImageIndex(0); // Reset to first image on mouse leave
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (initialTouch && restaurant.images.length > 1) {
      e.preventDefault();
      setIsTouching(true);
      setInitialTouch(false);
    }
  };

  const handleTouchEnd = () => {
    // Keep the touching state for a short period to allow interaction with controls
    setTimeout(() => {
      setIsTouching(false);
    }, 3000); // Keep controls visible for 3 seconds after touching
  };

  const goToImage = (index: number, e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault(); // Prevent link navigation
    e.stopPropagation();
    setCurrentImageIndex(index);
  };

  const goToPrevious = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? restaurant.images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prevIndex) => 
      prevIndex === restaurant.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const showControls = isHovering || isTouching;

  return (
    <Link 
      href="#" 
      className="block min-w-[280px] relative group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
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
            </div>
          ))}
          
          {/* Left and right arrow controls - shown when hovering or touching */}
          {showControls && restaurant.images.length > 1 && (
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
          
          {/* Carousel indicators - shown when hovering or touching */}
          {showControls && restaurant.images.length > 1 && (
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
        {restaurant.rating && restaurant.ratings && (
          <>
            <span className="flex items-center">
              {restaurant.rating} ★ {restaurant.ratings}
            </span>
            <span className="mx-1">•</span>
          </>
        )}
        <span>{restaurant.distance}</span>
        <span className="mx-1">•</span>
        <span>{restaurant.time}</span>
      </div>
      
      {restaurant.deliveryFee && (
        <div className="text-sm text-gray-700 mt-0.5">
          {restaurant.deliveryFee}
        </div>
      )}
    </Link>
  );
}

export default function PastOrdersSection() {
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
        <h2 className="text-xl font-bold">Your past orders</h2>
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
        {pastOrderRestaurants.map((restaurant) => (
          <RestaurantCard key={restaurant.id} restaurant={restaurant} />
        ))}
      </div>
    </div>
  );
} 