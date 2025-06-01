"use client";

import Image from 'next/image';
import Link from 'next/link';
import { SeeAllButton } from './ui/see-all-button';

interface RestaurantCard {
  id: number;
  name: string;
  imageUrl: string;
  rating: number;
  reviewCount: string;
  distance: string;
  deliveryTime: string;
  deliveryFee: string;
  partnerBadge?: boolean;
}

const restaurantCards: RestaurantCard[] = [
  {
    id: 1,
    name: "Big R",
    imageUrl: "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?ixlib=rb-1.2.1&auto=format&fit=crop&w=2160&q=80",
    rating: 4.2,
    reviewCount: "(200+)",
    distance: "4.0 mi",
    deliveryTime: "30 min",
    deliveryFee: "$0 delivery fee, first order",
    partnerBadge: true
  },
  {
    id: 2,
    name: "Crepaulie",
    imageUrl: "https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-1.2.1&auto=format&fit=crop&w=2160&q=80",
    rating: 4.8,
    reviewCount: "(200+)",
    distance: "3.9 mi",
    deliveryTime: "29 min",
    deliveryFee: "$0 delivery fee, first order",
    partnerBadge: true
  },
  {
    id: 3,
    name: "Sugar Mama's",
    imageUrl: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?ixlib=rb-1.2.1&auto=format&fit=crop&w=2160&q=80",
    rating: 4.8,
    reviewCount: "(200+)",
    distance: "1.2 mi",
    deliveryTime: "17 min",
    deliveryFee: "$0 delivery fee, first order",
    partnerBadge: true
  },
  {
    id: 4,
    name: "Rocket Bakery",
    imageUrl: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=2160&q=80",
    rating: 4.5,
    reviewCount: "(200+)",
    distance: "2.0 mi",
    deliveryTime: "23 min",
    deliveryFee: "$0 delivery fee, first order",
    partnerBadge: true
  },
  {
    id: 5,
    name: "Sandwich Spot",
    imageUrl: "https://images.unsplash.com/photo-1509722747041-616f39b57569?ixlib=rb-1.2.1&auto=format&fit=crop&w=2160&q=80",
    rating: 4.6,
    reviewCount: "(200+)",
    distance: "1.8 mi",
    deliveryTime: "25 min",
    deliveryFee: "$0 delivery fee, first order",
    partnerBadge: true
  }
];

function RestaurantCard({ restaurant, rank }: { restaurant: RestaurantCard, rank: number }) {
  return (
    <Link href="#" className="min-w-[220px] sm:min-w-[280px] md:min-w-0 relative block">
      <div className="relative rounded-lg overflow-hidden mb-2">
        <div className="w-full h-36 sm:h-48 relative">
          <div className="absolute inset-0">
            <Image 
              src={restaurant.imageUrl} 
              alt={restaurant.name}
              className="object-cover"
              fill
              sizes="(max-width: 640px) 220px, (max-width: 768px) 280px, (max-width: 1024px) 33vw, 20vw"
              priority
            />
          </div>
          {/* Overlay rank number */}
          <div className="absolute inset-0 flex items-start justify-start">
            <div className="text-white text-[70px] sm:text-[100px] font-bold leading-none opacity-90 pl-4 pt-1">
              {rank}
            </div>
          </div>
        </div>
      </div>
      
      <h3 className="font-semibold text-base flex items-center truncate pr-2">
        {restaurant.name}
        {restaurant.partnerBadge && (
          <span className="ml-1 text-cyan-500 flex-shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-9.618 5.04C2.127 12.077 4.557 18.22 8.95 20.95c1.755 1.088 3.346 1.088 5.101 0 4.394-2.73 6.824-8.873 6.568-13.006z" />
            </svg>
          </span>
        )}
      </h3>
      
      <div className="flex items-center text-sm gap-1 text-gray-700 flex-wrap">
        <span className="flex items-center">
          {restaurant.rating} ★ {restaurant.reviewCount}
        </span>
        <span className="mx-1">•</span>
        <span>{restaurant.distance}</span>
        <span className="mx-1">•</span>
        <span>{restaurant.deliveryTime}</span>
      </div>
      
      <div className="text-sm text-gray-700">
        {restaurant.deliveryFee}
      </div>
    </Link>
  );
}

export default function TopLocalSpots() {
  return (
    <div className="mb-10">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-xl font-semibold">Top 5 local spots</h2>
          <p className="text-gray-600 text-sm">Based on orders placed in the past week</p>
        </div>
        <SeeAllButton href="/local-spots" />
      </div>
      
      {/* Mobile: Horizontal scroll, Desktop: Grid layout */}
      <div className="md:hidden overflow-x-auto scrollbar-hide">
        <div className="flex gap-4 pb-2">
          {restaurantCards.slice(0, 5).map((restaurant, index) => (
            <RestaurantCard 
              key={restaurant.id} 
              restaurant={restaurant} 
              rank={index + 1}
            />
          ))}
        </div>
      </div>
      
      {/* Desktop grid layout */}
      <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {restaurantCards.slice(0, 5).map((restaurant, index) => (
          <RestaurantCard 
            key={restaurant.id} 
            restaurant={restaurant} 
            rank={index + 1}
          />
        ))}
      </div>
    </div>
  );
} 