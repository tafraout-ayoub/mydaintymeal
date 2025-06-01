import React, { useState, useEffect } from 'react';
import { Search, ChevronLeft, ChevronRight, BadgeCheck } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

interface RestaurantHeaderProps {
  restaurantName: string;
  bannerImages: string[];
  bannerVideos?: string[];
  logoImage: string;
}

const RestaurantHeader: React.FC<RestaurantHeaderProps> = ({
  restaurantName,
  bannerImages,
  bannerVideos = [],
  logoImage
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = bannerImages.length + bannerVideos.length;
  const isMobile = useIsMobile();
  
  // Auto-advance slider every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 5000);
    
    return () => clearInterval(timer);
  }, [totalSlides]);
  
  const goToSlide = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
    } else {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }
  };
  
  // Determine if current slide is a video or image
  const isCurrentVideo = currentSlide >= bannerImages.length;
  const currentMedia = isCurrentVideo 
    ? bannerVideos[currentSlide - bannerImages.length] 
    : bannerImages[currentSlide];
  
  return (
    <div className="mb-6">
      {/* Breadcrumbs */}
      <div className="text-sm text-gray-500 mb-2 hidden sm:block">
        <nav className="flex">
          <a href="#" className="hover:text-red-500">Home</a>
          <span className="mx-2">/</span>
          <a href="#" className="hover:text-red-500">Restaurants</a>
          <span className="mx-2">/</span>
          <a href="#" className="hover:text-red-500">Agadir</a>
          <span className="mx-2">/</span>
          <span className="text-gray-700 font-medium">{restaurantName}</span>
        </nav>
      </div>

      {/* Banner with Logo */}
      <div className="relative w-full h-48 md:h-64 bg-gray-200 rounded-lg overflow-visible mb-16">
        {/* Slider for banner */}
        <div className="w-full h-full">
          {isCurrentVideo ? (
            <video 
              src={currentMedia} 
              className="w-full h-full object-cover"
              autoPlay 
              muted 
              loop
            />
          ) : (
            <img 
              src={currentMedia} 
              alt={`${restaurantName} banner ${currentSlide + 1}`}
              className="w-full h-full object-cover"
            />
          )}
        </div>
        
        {/* Slider controls */}
        <div className="absolute inset-0 flex items-center justify-between px-4">
          <button 
            onClick={() => goToSlide('prev')}
            className="bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all duration-300"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button 
            onClick={() => goToSlide('next')}
            className="bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all duration-300"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
        
        {/* Slide indicators */}
        <div className="absolute bottom-2 left-0 right-0 flex justify-center space-x-2">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              className={cn(
                "w-2 h-2 rounded-full transition-all duration-300",
                index === currentSlide ? "bg-white" : "bg-white/50"
              )}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
        
        {/* Fixed logo positioning to ensure it's fully visible */}
        <div className="absolute -bottom-12 left-6">
          <div className="w-24 h-24 rounded-full border-4 border-white bg-white shadow-md overflow-visible">
            <img 
              src={logoImage} 
              alt={`${restaurantName} logo`}
              className="w-full h-full object-cover rounded-full"
            />
          </div>
        </div>
      </div>

      {/* Restaurant Name with Search */}
      <div className="flex flex-wrap items-center justify-between mb-4 mt-6">
        <div className="flex items-center gap-1">
          <h1 className="text-2xl sm:text-3xl font-bold">{restaurantName}</h1>
          <BadgeCheck className="h-5 w-5 sm:h-6 sm:w-6 text-blue-500" />
        </div>
        
        {/* Only show search on non-mobile */}
        {!isMobile && (
          <div className="relative mt-2 sm:mt-0">
            <Input 
              type="text" 
              placeholder={`Search ${restaurantName}`} 
              className="w-full sm:w-60 pl-10 py-2 rounded-full"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        )}
      </div>
    </div>
  );
};

export default RestaurantHeader;
