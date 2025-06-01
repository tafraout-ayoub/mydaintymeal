'use client'

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import MenuSidebar from '@/components/restaurant/MenuSidebar';
import RestaurantHeader from '@/components/restaurant/RestaurantHeader';
import ReviewSection from '@/components/restaurant/ReviewSection';
import StickyHeader from '@/components/restaurant/StickyHeader';
import CategorySection from '@/components/restaurant/CategorySection';
import restaurantsData from '@/data/restaurantsData.json';
import { useIsMobile } from '@/hooks/use-mobile';
import MobileMenu from '@/components/restaurant/MobileMenu';
import MobileRestaurantInfo from '@/components/restaurant/MobileRestaurantInfo';
import Sidebar from '@/components/sidebar';
import profilesRestaurantsData from 'data/scraped-data/profile-data.json';
import reviews from '@/data/scraped-data/reviews.json';

const RestaurantProfile = ({ params }) => {
  const { id } = params;
  const [showStickyHeader, setShowStickyHeader] = useState(false);
  const [menuItems, setMenuItems] = useState([]);
  const contentRef = useRef(null);
  const sidebarRef = useRef(null);
  const sectionRefs = useRef({});
  const isMobile = useIsMobile();
  const [expandedDescription, setExpandedDescription] = useState(false);

  // Find the restaurant data based on the ID from URL params
  const restaurantData = profilesRestaurantsData.find(r => r.id === id);
  console.log(id, restaurantData);

  // Initialize menu items when restaurant data is loaded
  useEffect(() => {
    if (restaurantData) {
      setMenuItems(restaurantData.menuSections);
    }
  }, [restaurantData]);

  // Setup intersection observer to detect when content is scrolled into view
  useEffect(() => {
    const handleScroll = () => {
      if (contentRef.current) {
        const contentTop = contentRef.current.getBoundingClientRect().top;
        setShowStickyHeader(contentTop < 0);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Function to handle menu item clicks and scroll to appropriate section
  const handleMenuItemClick = (sectionId) => {
    // Update active state
    setMenuItems(items => 
      items.map(item => ({
        ...item,
        active: item.id === sectionId
      }))
    );

    // Scroll to section with smooth behavior
    if (sectionRefs.current[sectionId]) {
      sectionRefs.current[sectionId]?.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    }
  };

  // Show loading state while data is being fetched
  if (!restaurantData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Restaurant not found</h1>
          <p className="text-gray-600 mb-4">The restaurant you're looking for doesn't exist.</p>
          <Link 
            href="/" 
            className="inline-flex items-center text-red-600 hover:text-red-700 font-medium"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Restaurants
          </Link>
        </div>
      </div>
    );
  }

  const { store_cover, data } = restaurantData;
  const restaurant = {
    'id': restaurantData.name,
    'name': restaurantData.name, 
    'logo': restaurantData.store_logo,
    'rating': Number(restaurantData.store_rating), 
    "ratingCount": "99+",
    "cuisine": restaurantData.name,
    "priceRange": "$",
    "isDashPass": true,
    "distance": " - mi",
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back to home link */}
      <div className="container mx-auto px-2 sm:px-4 pt-4">
        <Link 
          href="/restaurants" 
          className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Restaurants
        </Link>
      </div>

      {/* Only show sticky header on desktop */}
      {!isMobile && showStickyHeader && (
        <StickyHeader 
          restaurantName={restaurantData.name}
          rating={Number(restaurantData.store_rating)}
          ratingCount={restaurantData.store_rating}
          cuisine={restaurantData.name}
          distance={restaurantData.store_delevrey_time}
          isDashPass={true}
          isVisible={showStickyHeader}
        />
      )}
      
      <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-3 max-w-7xl">
        {/* Full-width Restaurant Header */}
        <div className="w-full mb-4 sm:mb-6">
          <RestaurantHeader 
            restaurantName={restaurant.name}
            bannerImages={[restaurantData.store_cover]}
            bannerVideos={['https://videos.pexels.com/video-files/2431225/2431225-uhd_2560_1440_24fps.mp4']}
            logoImage={restaurant.logo}
          />
        </div>

        {/* Mobile Restaurant Info */}
        {isMobile && (
          <MobileRestaurantInfo 
            restaurant={restaurant}
            expandedDescription={expandedDescription}
            setExpandedDescription={setExpandedDescription}
          />
        )}
        
        {/* Mobile Menu */}
        {isMobile && (
          <MobileMenu 
            menuItems={menuItems}
            onMenuItemClick={handleMenuItemClick}
          />
        )}
                
        {/* Main content ref for intersection detection */}
        <div ref={contentRef}>
          {/* Two-column layout */}
          <div className="flex flex-col md:flex-row gap-6">
            {/* Sticky Sidebar - Only show on non-mobile */}
            {!isMobile && (
              <div className="w-full md:w-1/4 lg:w-1/5">
                <div 
                  ref={sidebarRef}
                  className={`md:sticky ${showStickyHeader ? 'md:top-[130px]' : 'md:top-6'} transition-all duration-300`}
                >
                  <MenuSidebar 
                    rating={restaurant.rating}
                    ratingCount={restaurant.ratingCount}
                    distance={restaurant.distance}
                    cuisine={restaurant.cuisine}
                    priceRange={restaurant.priceRange}
                    menuItems={menuItems}
                    onMenuItemClick={handleMenuItemClick}
                    hidInfo={showStickyHeader}
                  />
                </div>
              </div>
            )}
            
            {/* Main content */}
            <div className="w-full md:w-3/4 lg:w-4/5">
              {/* Reviews Section */}
              <div ref={el => sectionRefs.current['reviews'] = el}>
                <ReviewSection 
                  averageRating={4.5}
                  reviewCount={restaurant.ratingCount + " ratings"}
                  reviews={reviews}
                />
              </div>

              {restaurantData.menuSections.map((section, index) => {
                const name = section.name;
                return (
                  <CategorySection
                    key={name}
                    ref={(el) => {
                      if (el) {sectionRefs.current[name] = el}
                    }}
                    id={name}
                    title={name}
                    items={restaurantData.data[index][name]}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantProfile;
