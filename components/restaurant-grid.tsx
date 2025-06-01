"use client";

import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

// Define the Restaurant type
interface Restaurant {
  id: number;
  name: string;
  image: string;
  rating: number;
  ratings: string;
  distance: string;
  time: string;
  deliveryFee: string;
  isFirstOrder?: boolean;
  isSponsored?: boolean;
  hasPromo?: boolean;
  promoText?: string;
  partnerBadge?: boolean;
}

// Sample data for restaurants
const restaurants: Restaurant[] = [
  {
    id: 1,
    name: "Mary Brown's Chicken",
    image: "https://images.pexels.com/photos/1893555/pexels-photo-1893555.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    rating: 4.5,
    ratings: "(200+)",
    distance: "1.0 mi",
    time: "16 min",
    deliveryFee: "CA$0 delivery fee",
    isSponsored: true,
    partnerBadge: true
  },
  {
    id: 2,
    name: "McDonald's",
    image: "https://images.pexels.com/photos/39347/food-french-fries-fryer-fast-39347.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    rating: 4.1,
    ratings: "(200+)",
    distance: "1.4 mi",
    time: "18 min",
    deliveryFee: "$0 delivery fee, first order",
    isSponsored: true,
    partnerBadge: true
  },
  {
    id: 3,
    name: "Wendy's",
    image: "https://images.pexels.com/photos/4331490/pexels-photo-4331490.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    rating: 4.4,
    ratings: "(200+)",
    distance: "1.3 mi",
    time: "17 min",
    deliveryFee: "$0 delivery fee, first order",
    partnerBadge: true
  },
  {
    id: 4,
    name: "KFC",
    image: "https://images.pexels.com/photos/60616/fried-chicken-meal-60616.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    rating: 4.1,
    ratings: "(200+)",
    distance: "1.0 mi",
    time: "19 min",
    deliveryFee: "$0 delivery fee, first order",
    partnerBadge: true
  },
  {
    id: 5,
    name: "McDonald's",
    image: "https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    rating: 4.1,
    ratings: "(200+)",
    distance: "1.4 mi",
    time: "18 min",
    deliveryFee: "CA$0 delivery fee",
    isSponsored: true,
    partnerBadge: true
  },
  {
    id: 6,
    name: "Dairy Queen",
    image: "https://images.pexels.com/photos/2983101/pexels-photo-2983101.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    rating: 4.4,
    ratings: "(200+)",
    distance: "1.5 mi",
    time: "19 min",
    deliveryFee: "CA$0 delivery fee",
    isSponsored: true,
    partnerBadge: true
  },
  {
    id: 7,
    name: "Burger King",
    image: "https://images.pexels.com/photos/551991/pexels-photo-551991.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    rating: 4.2,
    ratings: "(200+)",
    distance: "1.0 mi",
    time: "17 min",
    deliveryFee: "$0 delivery fee, first order",
    hasPromo: true,
    promoText: "20% off, up to CA$5",
    partnerBadge: true
  },
  {
    id: 8,
    name: "Dairy Queen",
    image: "https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    rating: 4.4,
    ratings: "(200+)",
    distance: "1.5 mi",
    time: "19 min",
    deliveryFee: "$0 delivery fee, first order",
    partnerBadge: true
  },
  {
    id: 9,
    name: "Ches's Fish and Chips",
    image: "https://images.pexels.com/photos/262959/pexels-photo-262959.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    rating: 4.3,
    ratings: "(200+)",
    distance: "0.6 mi",
    time: "20 min",
    deliveryFee: "$0 delivery fee, first order",
    partnerBadge: true
  },
  {
    id: 10,
    name: "A&W",
    image: "https://images.pexels.com/photos/4331486/pexels-photo-4331486.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    rating: 4.3,
    ratings: "(200+)",
    distance: "1.5 mi",
    time: "19 min",
    deliveryFee: "$0 delivery fee, first order",
    partnerBadge: true
  }
];

// Restaurant Card Component
function RestaurantCard({ restaurant }: { restaurant: Restaurant }) {
  return (
    <Link href="#" className="block group relative">
      <div className="absolute top-2 right-2 z-10">
        <button className="bg-white shadow-md rounded-full p-1.5">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 8v8M8 12h8" />
          </svg>
        </button>
      </div>
      <div className="relative rounded-lg overflow-hidden mb-2 shadow-sm">
        <div className="aspect-w-16 aspect-h-9 w-full h-40 relative overflow-hidden">
          <Image 
            src={restaurant.image} 
            alt={restaurant.name}
            className="object-cover transition-transform group-hover:scale-105 duration-300"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </div>
      
      <div className="flex justify-between items-start">
        <h3 className="font-semibold text-base">{restaurant.name}</h3>
        {restaurant.isSponsored && (
          <Badge variant="outline" className="text-[10px] px-1 py-0 h-4 rounded text-gray-500 border-gray-300 mt-1">
            Sponsored
          </Badge>
        )}
      </div>
      
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
      
      {restaurant.hasPromo && (
        <div className="text-sm text-red-500 font-medium mt-0.5">
          {restaurant.promoText}
        </div>
      )}
    </Link>
  );
}

export default function RestaurantGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8 mt-6">
      {restaurants.map((restaurant) => (
        <RestaurantCard key={restaurant.id} restaurant={restaurant} />
      ))}
    </div>
  );
}