import Image from 'next/image';
import Link from 'next/link';
import { SeeAllButton } from './ui/see-all-button';

interface DealCard {
  id: number;
  name: string;
  partnerBadge: boolean;
  imageUrl: string;
  dealText: string;
  fullName?: string;
}

const dealCards: DealCard[] = [
  {
    id: 1,
    name: "McDonald's",
    partnerBadge: true,
    imageUrl: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    dealText: "Free item on CA$25+"
  },
  {
    id: 2,
    name: "Starbucks",
    partnerBadge: true,
    imageUrl: "https://images.unsplash.com/photo-1541167760496-1628856ab772?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    dealText: "30% off, up to CA$10"
  },
  {
    id: 3,
    name: "KFC",
    partnerBadge: true,
    imageUrl: "https://images.unsplash.com/photo-1513639776629-7b61b0ac49cb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    dealText: "Buy 1, get 1 free"
  },
  {
    id: 4,
    name: "Fat Bastard Burrito",
    partnerBadge: true,
    imageUrl: "https://images.unsplash.com/photo-1618040996337-56904b7850b9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    dealText: "Free item on CA$35+"
  },
  {
    id: 5,
    name: "Burger King",
    partnerBadge: true,
    imageUrl: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    dealText: "Buy 1, get 1 free"
  },
  {
    id: 6,
    name: "Pizza Hut",
    partnerBadge: true,
    imageUrl: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    dealText: "CA$3 off on CA$20+"
  },
  {
    id: 7,
    name: "Casablanca Bakery",
    fullName: "Casablanca Bakery & Catering",
    partnerBadge: true,
    imageUrl: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    dealText: "Buy 1, get 1 free"
  },
  {
    id: 8,
    name: "Mr. Souvlaki",
    partnerBadge: true,
    imageUrl: "https://images.unsplash.com/photo-1600628421055-4d30de868b8f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    dealText: "CA$0 delivery fee"
  }
];

export default function DealsCarousel() {
  return (
    <div className="my-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-900">Deals for you</h2>
        <SeeAllButton href="#" />
      </div>
      
      <div className="flex gap-3 overflow-x-auto pb-4 -mx-4 px-4 no-scrollbar">
        {dealCards.map((deal) => (
          <div 
            key={deal.id}
            className="rounded-xl overflow-hidden min-w-[175px] w-[175px] flex-shrink-0 shadow-sm bg-white"
          >
            <div className="relative w-full h-[175px]">
              <Image
                src={deal.imageUrl}
                alt={deal.name}
                fill
                className="object-cover"
                sizes="175px"
                priority
              />
            </div>
            <div className="p-3 bg-white">
              <div className="text-sm font-semibold text-red-600 mb-1">
                {deal.dealText}
              </div>
              <div className="flex items-center">
                <h3 className="font-semibold text-gray-900 truncate pr-1">
                  {deal.fullName || deal.name}
                </h3>
                {deal.partnerBadge && (
                  <svg className="w-4 h-4 text-teal-500 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                  </svg>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 