"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { SeeAllButton } from './ui/see-all-button';

interface RestaurantImage {
  id: number;
  url: string;
}

interface RestaurantCard {
  id: number;
  name: string;
  images: RestaurantImage[]; // Changed from single imageUrl to multiple images
  rating: number;
  reviewCount: string;
  distance: string;
  deliveryTime: string;
  deliveryFee?: string;
  partnerBadge?: boolean;
}

const restaurantCards: RestaurantCard[] = [
  {
    id: 1,
    name: "My Food by Wandebo",
    images: [
      { id: 1, url: "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2160&q=80" },
      { id: 2, url: "https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-1.2.1&auto=format&fit=crop&w=2160&q=80" },
      { id: 3, url: "https://images.unsplash.com/photo-1484980972926-edee96e0960d?ixlib=rb-1.2.1&auto=format&fit=crop&w=2160&q=80" }
    ],
    rating: 4.7,
    reviewCount: "(200+)",
    distance: "1.1 mi",
    deliveryTime: "35 min",
    partnerBadge: true
  },
  {
    id: 2,
    name: "Mr Sub",
    images: [
      { id: 1, url: "https://images.unsplash.com/photo-1509722747041-616f39b57569?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2160&q=80" },
      { id: 2, url: "https://images.unsplash.com/photo-1628840042765-356cda07504e?ixlib=rb-1.2.1&auto=format&fit=crop&w=2160&q=80" },
      { id: 3, url: "https://images.unsplash.com/photo-1619096252214-ef06c45683e3?ixlib=rb-1.2.1&auto=format&fit=crop&w=2160&q=80" }
    ],
    rating: 4.3,
    reviewCount: "(200+)",
    distance: "1.0 mi",
    deliveryTime: "18 min",
    partnerBadge: true
  },
  {
    id: 3,
    name: "Mr. Souvlaki",
    images: [
      { id: 1, url: "https://images.unsplash.com/photo-1615937657715-bc7b4b7962c1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2160&q=80" },
      { id: 2, url: "https://images.unsplash.com/photo-1545016803-77d8264459cb?ixlib=rb-1.2.1&auto=format&fit=crop&w=2160&q=80" },
      { id: 3, url: "https://images.unsplash.com/photo-1625167171750-fa3c29aa3561?ixlib=rb-1.2.1&auto=format&fit=crop&w=2160&q=80" }
    ],
    rating: 4.4,
    reviewCount: "(200+)",
    distance: "1.5 mi",
    deliveryTime: "20 min",
    deliveryFee: "CA$0 delivery fee",
    partnerBadge: true
  },
  {
    id: 4,
    name: "Rocket Bakery",
    images: [
      { id: 1, url: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2160&q=80" },
      { id: 2, url: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-1.2.1&auto=format&fit=crop&w=2160&q=80" },
      { id: 3, url: "https://images.unsplash.com/photo-1495147466023-ac5c588e2e94?ixlib=rb-1.2.1&auto=format&fit=crop&w=2160&q=80" }
    ],
    rating: 4.5,
    reviewCount: "(200+)",
    distance: "0.5 mi",
    deliveryTime: "15 min",
    partnerBadge: true
  },
  {
    id: 5,
    name: "McDonald's",
    images: [
      { id: 1, url: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2160&q=80" },
      { id: 2, url: "https://images.unsplash.com/photo-1619881585386-4f9f8a0cd585?auto=format&fit=crop&w=800&q=80" },
      { id: 3, url: "https://images.unsplash.com/photo-1552895638-f7fe08d2f7d5?auto=format&fit=crop&w=800&q=80" }
    ],
    rating: 4.1,
    reviewCount: "(200+)",
    distance: "1.4 mi",
    deliveryTime: "18 min",
    partnerBadge: true
  }
];

function RestaurantCard({ restaurant }: { restaurant: RestaurantCard }) {
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
      className="min-w-[280px] relative group block"
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
        <span className="flex items-center">
          {restaurant.rating} ★ {restaurant.reviewCount}
        </span>
        <span className="mx-1">•</span>
        <span>{restaurant.distance}</span>
        <span className="mx-1">•</span>
        <span>{restaurant.deliveryTime}</span>
      </div>
      
      {restaurant.deliveryFee && (
        <div className="text-sm text-gray-700 mt-0.5">
          {restaurant.deliveryFee}
        </div>
      )}
      {!restaurant.deliveryFee && (
        <div className="text-sm text-gray-700 mt-0.5">
          $0 delivery fee, first order
        </div>
      )}
    </Link>
  );
}

export default function QuickLunchesCarousel() {
  return (
    <div className="my-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">Quick and affordable lunches</h2>
        <SeeAllButton href="#" />
      </div>
      
      <div className="flex overflow-x-auto pb-4 gap-4 scrollbar-hide">
        {restaurantCards.map((restaurant) => (
          <RestaurantCard key={restaurant.id} restaurant={restaurant} />
        ))}
      </div>
    </div>
  );
} 