"use client";

import { useRef, useState, useEffect } from 'react';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';

// Categories with URL-based icons
const categories = [
  { id: 1, name: 'Trending', icon: 'https://cdn-icons-png.flaticon.com/512/2535/2535536.png', color: 'bg-orange-50' },
  { id: 2, name: 'Fast Food', icon: 'https://cdn-icons-png.flaticon.com/512/1046/1046784.png', color: 'bg-red-50' },
  { id: 3, name: 'Pizza', icon: 'https://cdn-icons-png.flaticon.com/512/599/599995.png', color: 'bg-orange-50' },
  { id: 4, name: 'Burgers', icon: 'https://cdn-icons-png.flaticon.com/512/5787/5787016.png', color: 'bg-yellow-50' },
  { id: 5, name: 'Breakfast', icon: 'https://cdn-icons-png.flaticon.com/512/3480/3480823.png', color: 'bg-yellow-50' },
  { id: 6, name: 'Chinese', icon: 'https://cdn-icons-png.flaticon.com/512/2548/2548213.png', color: 'bg-red-50' },
  { id: 7, name: 'Coffee', icon: 'https://cdn-icons-png.flaticon.com/512/751/751621.png', color: 'bg-brown-50' },
  { id: 8, name: 'Chicken', icon: 'https://cdn-icons-png.flaticon.com/512/6978/6978255.png', color: 'bg-yellow-50' },
  { id: 9, name: 'Indian', icon: 'https://cdn-icons-png.flaticon.com/512/5142/5142217.png', color: 'bg-orange-50' },
  { id: 10, name: 'Healthy', icon: 'https://cdn-icons-png.flaticon.com/512/2515/2515183.png', color: 'bg-green-50' },
  { id: 11, name: 'Sandwiches', icon: 'https://cdn-icons-png.flaticon.com/512/5617/5617424.png', color: 'bg-yellow-50' },
  { id: 12, name: 'Mexican', icon: 'https://cdn-icons-png.flaticon.com/512/5026/5026537.png', color: 'bg-red-50' },
  { id: 13, name: 'Sushi', icon: 'https://cdn-icons-png.flaticon.com/512/2252/2252075.png', color: 'bg-pink-50' },
  { id: 14, name: 'Soup', icon: 'https://cdn-icons-png.flaticon.com/512/2276/2276931.png', color: 'bg-red-50' },
  { id: 15, name: 'Desserts', icon: 'https://cdn-icons-png.flaticon.com/512/3081/3081967.png', color: 'bg-yellow-50' },
  { id: 16, name: 'Thai', icon: 'https://cdn-icons-png.flaticon.com/512/4139/4139551.png', color: 'bg-green-50' },
  { id: 17, name: 'Noodles', icon: 'https://cdn-icons-png.flaticon.com/512/2718/2718224.png', color: 'bg-yellow-50' },
  { id: 18, name: 'Smoothie', icon: 'https://cdn-icons-png.flaticon.com/512/2405/2405596.png', color: 'bg-red-50' },
  { id: 19, name: 'Asian', icon: 'https://cdn-icons-png.flaticon.com/512/4139/4139467.png', color: 'bg-green-50' },
  { id: 20, name: 'Salad', icon: 'https://cdn-icons-png.flaticon.com/512/2515/2515217.png', color: 'bg-green-50' },
];

export default function CategoryCarousel() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  // Update selected category whenever URL changes
  useEffect(() => {
    const category = searchParams.get('category');
    if (category) {
      setSelectedCategory(category);
    } else {
      // Clear selection when no category in URL
      setSelectedCategory(null);
    }
  }, [searchParams]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const { current: container } = scrollContainerRef;
      const scrollAmount = 300;
      
      if (direction === 'left') {
        container.scrollLeft -= scrollAmount;
      } else {
        container.scrollLeft += scrollAmount;
      }
    }
  };

  const handleCategoryClick = (categoryName: string) => {
    setSelectedCategory(categoryName);
    router.push(`?category=${encodeURIComponent(categoryName)}`);
  };

  return (
    <div 
      className="relative mt-2" 
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div 
        ref={scrollContainerRef} 
        className="flex overflow-x-auto no-scrollbar py-3 space-x-7 scroll-smooth"
      >
        {categories.map((category) => (
          <div 
            key={category.id} 
            className={cn(
              "flex flex-col items-center justify-center flex-shrink-0 gap-3 cursor-pointer",
              selectedCategory === category.name && "scale-105"
            )}
            onClick={() => handleCategoryClick(category.name)}
          >
            <div className={cn(
              `w-20 h-20 rounded-full flex items-center justify-center ${category.color} relative shadow-md`,
              selectedCategory === category.name && "ring-2 ring-offset-2 ring-red-500"
            )}>
              <Image 
                src={category.icon}
                alt={category.name}
                width={40}
                height={40}
                className="w-10 h-10"
              />
            </div>
            <span className={cn(
              "text-base font-medium text-gray-800",
              selectedCategory === category.name && "font-bold text-red-600"
            )}>
              {category.name}
            </span>
          </div>
        ))}
      </div>

      <button
        onClick={() => scroll('left')}
        className={cn(
          "absolute left-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full shadow-md p-1.5",
          "hover:bg-gray-100 transition-all duration-300 z-10",
          isHovering ? "opacity-100" : "opacity-0"
        )}
      >
        <IconChevronLeft className="h-7 w-7" />
      </button>

      <button
        onClick={() => scroll('right')}
        className={cn(
          "absolute right-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full shadow-md p-1.5",
          "hover:bg-gray-100 transition-all duration-300 z-10",
          isHovering ? "opacity-100" : "opacity-0"
        )}
      >
        <IconChevronRight className="h-7 w-7" />
      </button>
    </div>
  );
}