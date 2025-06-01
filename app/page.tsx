'use client';

import Sidebar from '@/components/sidebar';
import CategoryCarousel from '@/components/category-carousel';
import FilterOptions from '@/components/filter-options';
import PromotionalCarousel from '@/components/promotional-carousel';
import DeliveryFeeSection from '@/components/delivery-fee-section';
import PastOrdersSection from '@/components/past-orders-section';
import StoreCategoryCarousel from '@/components/store-category-carousel';
import DealsCarousel from '@/components/deals-carousel';
import QuickLunchesCarousel from '@/components/quick-lunches-carousel';
import RetailStoresCarousel from '@/components/retail-stores-carousel';
import TopLocalSpots from '@/components/top-local-spots';
import TopLunchSpots from '@/components/top-lunch-spots';
import Footer from '@/components/footer';
import CategoryResults from '@/components/category-results';

export default function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const category = searchParams.category as string | undefined;
  const isFilterActive = category !== undefined && (category === 'Pizza' || category === 'Burgers');
  
  return (
    <main className="min-h-screen bg-white flex flex-col">
      <div className="flex flex-grow">
        <Sidebar />
        <div className="flex-1 px-4 pt-3 pb-8 md:pl-[240px] overflow-x-hidden">
          <div className="md:hidden mb-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search DoorDash"
                className="bg-gray-100 hover:bg-gray-200 pl-10 pr-4 py-[9px] rounded-[22px] w-full text-[15px] focus:outline-none"
              />
              <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-[18px] w-[18px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </div>
          </div>
          <CategoryCarousel />
          <FilterOptions />
          <CategoryResults searchParams={searchParams} />
          
          {!isFilterActive && (
            <>
              <PromotionalCarousel />
              <DeliveryFeeSection />
              <PastOrdersSection />
              <StoreCategoryCarousel />
              <DealsCarousel />
              <QuickLunchesCarousel />
              <RetailStoresCarousel />
              <TopLocalSpots />
              <TopLunchSpots />
            </>
          )}
        </div>
      </div>
      <Footer />
    </main>
  );
}