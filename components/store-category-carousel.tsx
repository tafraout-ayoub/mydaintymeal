import Image from 'next/image';
import Link from 'next/link';

interface StoreCard {
  id: number;
  name: string;
  logoUrl: string;
  backgroundUrl: string;
  rating: number;
  reviewCount: string;
  distance: string;
  deliveryTime: string;
  pricingNote?: string;
}

const storeCards: StoreCard[] = [
  {
    id: 1,
    name: "Dominion",
    logoUrl: "https://via.placeholder.com/100x40/e32319/ffffff?text=Dominion",
    backgroundUrl: "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80",
    rating: 4.7,
    reviewCount: "(200+)",
    distance: "1.2 mi",
    deliveryTime: "46 min",
    pricingNote: "Dominion stores in Newfoundland and Labrador."
  },
  {
    id: 2,
    name: "No Frills",
    logoUrl: "https://via.placeholder.com/100x40/ffde00/000000?text=NoFrills",
    backgroundUrl: "https://images.unsplash.com/photo-1573246123716-6b1782bfc499?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2160&q=80",
    rating: 4.8,
    reviewCount: "(200+)",
    distance: "5.8 mi",
    deliveryTime: "50 min",
    pricingNote: "Features In-store Pricing"
  },
  {
    id: 3,
    name: "Shoppers Drug Mart",
    logoUrl: "https://via.placeholder.com/100x40/e32319/ffffff?text=Shoppers",
    backgroundUrl: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2160&q=80",
    rating: 4.8,
    reviewCount: "(200+)",
    distance: "0.4 mi",
    deliveryTime: "19 min"
  },
  {
    id: 4,
    name: "Beauty by Shoppers Drug Mart",
    logoUrl: "https://via.placeholder.com/100x40/e32319/ffffff?text=Beauty",
    backgroundUrl: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2160&q=80",
    rating: 4.8,
    reviewCount: "(70+)",
    distance: "0.4 mi",
    deliveryTime: "19 min"
  },
  {
    id: 5,
    name: "Walmart",
    logoUrl: "https://via.placeholder.com/100x40/0071ce/ffffff?text=Walmart",
    backgroundUrl: "https://images.unsplash.com/photo-1607082350899-7e105aa886ae?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2160&q=80",
    rating: 4.8,
    reviewCount: "(200+)",
    distance: "2.8 mi",
    deliveryTime: "41 min"
  }
];

export default function StoreCategoryCarousel() {
  return (
    <div className="my-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">Grocery, convenience, drugstores & more</h2>
        <div className="flex items-center gap-4">
          <Link href="#" className="text-sm font-medium text-gray-800">
            See All
          </Link>
          <div className="flex gap-2">
            <button className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
              </svg>
            </button>
            <button className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      <div className="flex gap-4 overflow-x-auto pb-4">
        {storeCards.map((store) => (
          <div 
            key={store.id}
            className="rounded-lg overflow-hidden min-w-[230px] flex-shrink-0 shadow-sm"
          >
            <div className="relative w-full h-[150px]">
              <Image
                src={store.backgroundUrl}
                alt={store.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white p-2 rounded-md">
                  <Image
                    src={store.logoUrl}
                    alt={`${store.name} logo`}
                    width={100}
                    height={40}
                    className="object-contain"
                  />
                </div>
              </div>
              {store.pricingNote && (
                <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-90 px-2 py-1 text-xs">
                  {store.pricingNote}
                </div>
              )}
            </div>
            <div className="p-3 bg-white">
              <div className="flex items-center">
                <h3 className="font-medium text-gray-900">{store.name}</h3>
                <svg className="w-4 h-4 text-teal-500 ml-1" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
              </div>
              <div className="flex items-center gap-1 text-sm mt-1">
                <span className="font-bold">{store.rating}</span>
                <span className="text-gray-500">{store.reviewCount}</span>
                <span className="text-gray-500">•</span>
                <span className="text-gray-500">{store.distance}</span>
                <span className="text-gray-500">•</span>
                <span className="text-gray-500">{store.deliveryTime}</span>
              </div>
              <div className="flex items-center mt-2">
                <p className="text-sm">$0 delivery fee, first order</p>
              </div>
              <div className="flex items-center mt-1">
                <svg className="w-4 h-4 text-gray-500 mr-1" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3 17h18v2H3v-2zm0-7h18v5H3v-5zm0-4h18v2H3V6z" />
                </svg>
                <p className="text-xs text-gray-500">In-store prices</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 