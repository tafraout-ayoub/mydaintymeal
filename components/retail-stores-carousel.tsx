"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { SeeAllButton } from './ui/see-all-button';

interface StoreImage {
  id: number;
  url: string;
}

interface RetailCard {
  id: number;
  name: string;
  images: StoreImage[]; // Changed from single imageUrl to multiple images
  rating: number;
  reviewCount: string;
  distance: string;
  deliveryTime: string;
  inStorePrices?: boolean;
  partnerBadge?: boolean;
}

const retailCards: RetailCard[] = [
  {
    id: 1,
    name: "Michaels",
    images: [
      { id: 1, url: "https://images.unsplash.com/photo-1558244661-d248897f7bc4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2160&q=80" },
      { id: 2, url: "https://images.unsplash.com/photo-1515549832467-8783363e19b6?ixlib=rb-1.2.1&auto=format&fit=crop&w=2160&q=80" },
      { id: 3, url: "https://images.unsplash.com/photo-1572584642822-6f8de0243c93?ixlib=rb-1.2.1&auto=format&fit=crop&w=2160&q=80" }
    ],
    rating: 5.0,
    reviewCount: "(30+)",
    distance: "3.4 mi",
    deliveryTime: "32 min",
    partnerBadge: true
  },
  {
    id: 2,
    name: "Dollarama",
    images: [
      { id: 1, url: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2160&q=80" },
      { id: 2, url: "https://images.unsplash.com/photo-1581281664340-14fca8931d9e?ixlib=rb-1.2.1&auto=format&fit=crop&w=2160&q=80" },
      { id: 3, url: "https://images.unsplash.com/photo-1607083206968-13611e3d76db?ixlib=rb-1.2.1&auto=format&fit=crop&w=2160&q=80" }
    ],
    rating: 4.9,
    reviewCount: "(200+)",
    distance: "0.9 mi",
    deliveryTime: "28 min",
    inStorePrices: true,
    partnerBadge: true
  },
  {
    id: 3,
    name: "Sephora Canada",
    images: [
      { id: 1, url: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2160&q=80" },
      { id: 2, url: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-1.2.1&auto=format&fit=crop&w=2160&q=80" },
      { id: 3, url: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?ixlib=rb-1.2.1&auto=format&fit=crop&w=2160&q=80" }
    ],
    rating: 4.8,
    reviewCount: "(130+)",
    distance: "1.4 mi",
    deliveryTime: "26 min",
    partnerBadge: true
  },
  {
    id: 4,
    name: "Staples",
    images: [
      { id: 1, url: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2160&q=80" },
      { id: 2, url: "https://images.unsplash.com/photo-1545231027-637d2f6210f8?ixlib=rb-1.2.1&auto=format&fit=crop&w=2160&q=80" },
      { id: 3, url: "https://images.unsplash.com/photo-1619334084350-f55104388a78?ixlib=rb-1.2.1&auto=format&fit=crop&w=2160&q=80" }
    ],
    rating: 4.9,
    reviewCount: "(30+)",
    distance: "2.9 mi",
    deliveryTime: "36 min",
    partnerBadge: true
  },
  {
    id: 5,
    name: "Lush",
    images: [
      { id: 1, url: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2160&q=80" },
      { id: 2, url: "https://images.unsplash.com/photo-1633681926022-84c23e8cb3d6?ixlib=rb-1.2.1&auto=format&fit=crop&w=2160&q=80" },
      { id: 3, url: "https://images.unsplash.com/photo-1551378178-c8e7862f4c7f?ixlib=rb-1.2.1&auto=format&fit=crop&w=2160&q=80" }
    ],
    rating: 4.8,
    reviewCount: "(50+)",
    distance: "1.4 mi",
    deliveryTime: "19 min",
    inStorePrices: true,
    partnerBadge: true
  }
];

function RetailCard({ store }: { store: RetailCard }) {
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
    if (initialTouch && store.images.length > 1) {
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
      prevIndex === 0 ? store.images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prevIndex) => 
      prevIndex === store.images.length - 1 ? 0 : prevIndex + 1
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
          {store.images.map((image, index) => (
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
                alt={`${store.name} - image ${index + 1}`}
                className="object-cover transform transition-transform duration-300"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority={index === 0}
              />
            </div>
          ))}
          
          {/* Left and right arrow controls - shown when hovering or touching */}
          {showControls && store.images.length > 1 && (
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
          {showControls && store.images.length > 1 && (
            <div className="absolute bottom-2 left-0 right-0 flex justify-center z-20">
              <div className="px-2 py-1 bg-black/20 backdrop-blur-md rounded-full flex gap-1.5 items-center">
                {store.images.map((_, index) => (
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
        {store.name}
        {store.partnerBadge && (
          <span className="ml-1 text-cyan-500">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-9.618 5.04C2.127 12.077 4.557 18.22 8.95 20.95c1.755 1.088 3.346 1.088 5.101 0 4.394-2.73 6.824-8.873 6.568-13.006z" />
            </svg>
          </span>
        )}
      </h3>
      
      <div className="flex items-center text-sm gap-1 text-gray-700">
        <span className="flex items-center">
          {store.rating} ★ {store.reviewCount}
        </span>
        <span className="mx-1">•</span>
        <span>{store.distance}</span>
        <span className="mx-1">•</span>
        <span>{store.deliveryTime}</span>
      </div>
      
      <div className="text-sm text-gray-700 mt-0.5">
        $0 delivery fee, first order
      </div>
      
      {store.inStorePrices && (
        <div className="flex items-center mt-1 text-xs text-gray-500">
          <svg className="w-4 h-4 text-gray-500 mr-1" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3 17h18v2H3v-2zm0-7h18v5H3v-5zm0-4h18v2H3V6z" />
          </svg>
          <p>In-store prices</p>
        </div>
      )}
    </Link>
  );
}

export default function RetailStoresCarousel() {
  return (
    <div className="my-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">Grocery, convenience, drugstores & more</h2>
        <SeeAllButton href="#" />
      </div>
      
      <div className="flex overflow-x-auto pb-4 gap-4 scrollbar-hide">
        {retailCards.map((store) => (
          <RetailCard key={store.id} store={store} />
        ))}
      </div>
    </div>
  );
} 