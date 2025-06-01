
import React, { useRef, useEffect, useState } from 'react';
import { Menu } from 'lucide-react';

interface MobileMenuProps {
  menuItems: Array<{
    id: string;
    name: string; 
    active: boolean;
  }>;
  onMenuItemClick: (id: string) => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ menuItems, onMenuItemClick }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isSticky, setIsSticky] = useState(false);
  
  useEffect(() => {
    const checkIfSticky = () => {
      if (scrollContainerRef.current) {
        const rect = scrollContainerRef.current.getBoundingClientRect();
        setIsSticky(rect.top <= 0);
      }
    };
    
    window.addEventListener('scroll', checkIfSticky);
    return () => window.removeEventListener('scroll', checkIfSticky);
  }, []);
  
  return (
    <div 
      ref={scrollContainerRef}
      // className={`sm:hidden mb-4 ${isSticky ? 'sticky top-16 z-10' : ''}`}
      className={`sm:hidden mb-4 sticky top-[177px] z-10`}
    >
      <div className="bg-white shadow-sm rounded-md p-2">
        <div className="flex items-center overflow-x-auto scrollbar-hide">
          <div className="flex-shrink-0 p-2 mr-2">
            <Menu className="h-5 w-5" />
          </div>
          
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onMenuItemClick(item.id)}
              className={`flex-shrink-0 px-4 py-2 mx-1 whitespace-nowrap rounded-md text-sm ${
                item.active 
                  ? 'bg-gray-100 font-medium border-l-4 border-black' 
                  : 'hover:bg-gray-50'
              }`}
            >
              {item.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
