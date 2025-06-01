import Link from 'next/link';
import React from 'react';

interface SeeAllButtonProps {
  href: string;
  className?: string;
  showArrows?: boolean;
  onPrevious?: () => void;
  onNext?: () => void;
}

export function SeeAllButton({ 
  href, 
  className = '', 
  showArrows = true, 
  onPrevious, 
  onNext 
}: SeeAllButtonProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <Link 
        href={href} 
        className="text-black font-medium text-base whitespace-nowrap hover:underline"
      >
        <span>See All</span>
      </Link>
      {showArrows && (
        <div className="flex">
          <button 
            onClick={onPrevious}
            className="p-1.5 rounded-full border border-gray-300 mr-2 flex items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors"
            aria-label="Previous items"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button 
            onClick={onNext}
            className="p-1.5 rounded-full border border-gray-300 flex items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors"
            aria-label="Next items"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
} 