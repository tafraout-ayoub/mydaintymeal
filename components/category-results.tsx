'use client';

import { useEffect, useState, useRef } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { restaurants, popularDishes, Restaurant, Dish } from '@/lib/data';
import { cn } from '@/lib/utils';
import { IconThumbUp } from '@tabler/icons-react';
import { SeeAllButton } from './ui/see-all-button';

interface CategoryResultsProps {
  searchParams?: { [key: string]: string | string[] | undefined };
}

export default function CategoryResults({ searchParams }: CategoryResultsProps) {
  const [filteredRestaurants, setFilteredRestaurants] = useState<Restaurant[]>([]);
  const [filteredDishes, setFilteredDishes] = useState<Dish[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const params = useSearchParams();
  const router = useRouter();
  const restaurantCarouselRef = useRef<HTMLDivElement>(null);
  const dishesCarouselRef = useRef<HTMLDivElement>(null);
  
  // Get category from props or URL
  const category = searchParams?.category 
    ? String(searchParams.category)
    : params?.get('category') || null;

  useEffect(() => {
    setSelectedCategory(category);

    if (category && (category === 'Burgers' || category === 'Pizza')) {
      // Filter restaurants by category
      const filtered = restaurants.filter(restaurant => 
        restaurant.categories.includes(category)
      );
      
      // Add example tags to the first two restaurants
      if (filtered.length >= 2) {
        filtered[0] = {
          ...filtered[0],
          tag: `${filtered[0].name} Special`
        };
        filtered[1] = {
          ...filtered[1],
          tag: `${category} Combo`
        };
      }
      
      setFilteredRestaurants(filtered);

      // Filter dishes by category
      const filteredDishes = popularDishes.filter(dish => 
        dish.categories.includes(category)
      );
      setFilteredDishes(filteredDishes);
    } else {
      // Default to showing all restaurants and dishes
      setFilteredRestaurants(restaurants);
      setFilteredDishes(popularDishes);
    }
  }, [category, params]);

  const scrollPrevious = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      ref.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollNext = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      ref.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  const handleReset = () => {
    router.push('/');
  };

  if (!selectedCategory || (selectedCategory !== 'Burgers' && selectedCategory !== 'Pizza')) {
    return null; // Don't show any results if no valid category is selected
  }

  return (
    <div className="mt-4 px-1 sm:px-2 md:px-3">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-3 sm:mb-4">
        <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-0">
          <h2 className="text-lg sm:text-xl font-bold">{selectedCategory} Restaurants</h2>
          <span className="text-xs sm:text-sm text-gray-500">({filteredRestaurants.length} results)</span>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <button 
            onClick={handleReset} 
            className="px-2 sm:px-3 py-1 text-xs sm:text-sm bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
          >
            Reset
          </button>
          <div className="hidden sm:block">
            <SeeAllButton 
              href="#" 
              onPrevious={() => scrollPrevious(restaurantCarouselRef)}
              onNext={() => scrollNext(restaurantCarouselRef)}
            />
          </div>
        </div>
      </div>
      
      {/* Restaurant Carousel */}
      <div 
        ref={restaurantCarouselRef}
        className="flex overflow-x-auto pb-3 sm:pb-4 gap-3 sm:gap-4 scrollbar-hide -mx-1 px-1 sm:-mx-2 sm:px-2"
      >
        {filteredRestaurants.map((restaurant) => (
          <RestaurantCard key={restaurant.id} restaurant={restaurant} />
        ))}
      </div>

      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-3 sm:mb-4 mt-6 sm:mt-8">
        <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-0">
          <h2 className="text-lg sm:text-xl font-bold">Popular {selectedCategory}</h2>
          <span className="text-xs sm:text-sm text-gray-500">({filteredDishes.length} results)</span>
        </div>
        <div className="hidden sm:block">
          <SeeAllButton 
            href="#" 
            onPrevious={() => scrollPrevious(dishesCarouselRef)}
            onNext={() => scrollNext(dishesCarouselRef)}
          />
        </div>
      </div>
      
      {/* Popular Dishes - Grid on larger screens, horizontal scroll on mobile */}
      <div 
        ref={dishesCarouselRef}
        className="flex md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 overflow-x-auto pb-3 sm:pb-4 scrollbar-hide -mx-1 px-1 sm:-mx-2 sm:px-2 md:mx-0 md:px-0"
      >
        {filteredDishes.map((dish) => (
          <DishCard key={dish.id} dish={dish} />
        ))}
      </div>
    </div>
  );
}

// Restaurant Card Component
function RestaurantCard({ restaurant }: { restaurant: Restaurant }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  
  // Create a mock array of images based on the single image for the carousel
  const restaurantImages = [
    { id: 1, url: restaurant.image },
    { id: 2, url: restaurant.image },
    { id: 3, url: restaurant.image }
  ];

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
      prevIndex === 0 ? restaurantImages.length - 1 : prevIndex - 1
    );
  };

  const goToNext = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prevIndex) => 
      prevIndex === restaurantImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <Link 
      href="#" 
      className="block min-w-[250px] sm:min-w-[280px] w-[250px] sm:w-[280px] flex-shrink-0 relative group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative rounded-lg overflow-hidden mb-2">
        <div className="w-full h-32 sm:h-40 relative">
          {/* Carousel of images */}
          {restaurantImages.map((image, index) => (
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
                      {restaurant.tag.length > 22 ? `${restaurant.tag.slice(0, 22)}...` : restaurant.tag}
                    </div>
                  </div>
                  <div className="py-1 px-2 text-xs font-semibold text-blue-600 flex items-center whitespace-nowrap border-l border-gray-100">
                    85% ({Math.floor(Math.random() * 100) + 50})
                    <IconThumbUp size={12} className="ml-1 text-blue-600" stroke={2} />
                  </div>
                </div>
              )}
            </div>
          ))}
          
          {/* Left and right arrow controls - only shown when hovering */}
          {isHovering && restaurantImages.length > 1 && (
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
          {isHovering && restaurantImages.length > 1 && (
            <div className="absolute bottom-2 left-0 right-0 flex justify-center z-20">
              <div className="px-2 py-1 bg-black/20 backdrop-blur-md rounded-full flex gap-1.5 items-center">
                {restaurantImages.map((_, index) => (
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
          
          {/* Add to cart button */}
          <div className="absolute top-2 right-2 z-30">
            <button className="bg-white shadow-md rounded-full p-1.5">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 8v8M8 12h8" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      <h3 className="font-semibold text-sm sm:text-base flex items-center line-clamp-1">
        {restaurant.name}
        {restaurant.partnerBadge && (
          <span className="ml-1 text-cyan-500">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-9.618 5.04C2.127 12.077 4.557 18.22 8.95 20.95c1.755 1.088 3.346 1.088 5.101 0 4.394-2.73 6.824-8.873 6.568-13.006z" />
            </svg>
          </span>
        )}
      </h3>
      
      <div className="flex items-center text-xs sm:text-sm gap-1 text-gray-700">
        <span className="flex items-center">
          {restaurant.rating} ★ {restaurant.ratings}
        </span>
        <span className="mx-1">•</span>
        <span>{restaurant.distance}</span>
        <span className="mx-1">•</span>
        <span>{restaurant.time}</span>
      </div>
      
      <div className="text-xs sm:text-sm text-gray-700 mt-0.5">
        {restaurant.deliveryFee}
      </div>
      
      {restaurant.isSponsored && (
        <div className="text-xs text-gray-500 mt-0.5">
          Sponsored
        </div>
      )}
    </Link>
  );
}

// Dish Card Component
function DishCard({ dish }: { dish: Dish }) {
  return (
    <div className="relative min-w-[250px] sm:min-w-[280px] w-[250px] sm:w-[280px] md:w-auto flex-shrink-0">
      <div className="relative rounded-lg overflow-hidden mb-2 shadow-sm">
        <div className="aspect-w-16 aspect-h-9 w-full h-32 sm:h-40 relative overflow-hidden">
          <Image 
            src={dish.image}
            alt={dish.name}
            className="object-cover transition-transform hover:scale-105 duration-300"
            fill
            sizes="(max-width: 640px) 250px, (max-width: 768px) 280px, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
          />
        </div>
      </div>

      <button className="absolute top-2 right-2 bg-white shadow-md rounded-full p-1.5 z-10">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
        </svg>
      </button>

      <div className="flex flex-col h-[80px] sm:h-[90px]">
        <div className="mb-0.5 sm:mb-1">
          <h3 className="font-semibold text-sm sm:text-base line-clamp-1">{dish.name}</h3>
          <div className="flex justify-between items-center mt-0.5">
            <div className="flex items-center gap-1">
              <span className="text-xs sm:text-sm text-gray-600">
                👍 {dish.likes}
              </span>
              <span className="text-xs text-gray-400">•</span>
              <span className="text-xs sm:text-sm text-gray-400 line-clamp-1 max-w-[100px]">{dish.restaurant}</span>
            </div>
            <span className="text-xs sm:text-sm font-medium">{dish.price}</span>
          </div>
        </div>
        <div className="mt-auto flex justify-end">
          <button className="bg-white shadow-md rounded-lg px-3 sm:px-4 py-1 sm:py-1.5 font-medium text-xs sm:text-sm z-10 hover:bg-gray-50 transition-colors">
            Add
          </button>
        </div>
      </div>
    </div>
  );
} 