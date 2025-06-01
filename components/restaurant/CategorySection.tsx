
import React, { forwardRef } from 'react';
import FoodItemCard from './FoodItemCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CategorySectionProps {
  id: number | string;
  title: string;
  items: Array<{
    id: string;
    name: string;
    image: string;
    price: string;
    tag?: string;
  }>;
}

const CategorySection = forwardRef<HTMLDivElement, CategorySectionProps>(
  ({ id, title, items }, ref) => {
    const scrollContainerRef = React.useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
      if (scrollContainerRef.current) {
        const { current } = scrollContainerRef;
        const scrollAmount = 300;
        
        if (direction === 'left') {
          current.scrollLeft -= scrollAmount;
        } else {
          current.scrollLeft += scrollAmount;
        }
      }
    };

    return (
      <div ref={ref} id={id} className="mb-10 pt-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{title}</h2>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="icon" 
              className="rounded-full"
              onClick={() => scroll('left')}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              className="rounded-full"
              onClick={() => scroll('right')}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div 
          ref={scrollContainerRef}
          className="flex gap-4 overflow-x-auto pb-4 scrollbar-none snap-x"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {items.map((item) => (
            <div key={item.id} className="snap-start">
              <FoodItemCard {...item} />
            </div>
          ))}
        </div>
      </div>
    );
  }
);

CategorySection.displayName = 'CategorySection';
export default CategorySection;
