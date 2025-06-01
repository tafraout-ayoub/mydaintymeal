'use client'

import React from 'react';
import Link from 'next/link';
import { Star, MapPin, DollarSign } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import restaurantsData from '@/data/restaurantsData.json';
import glovoRestaurantsData from '@/data/scraped-data/data.json';


const Restaurants = () => {
  const { restaurants } = restaurantsData;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Choose Your Restaurant
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover delicious meals from your favorite restaurants in {glovoRestaurantsData[0].city}. 
            Fast delivery, great taste, and quality service guaranteed.
          </p>
        </div>

        {/* Restaurant Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {glovoRestaurantsData[0].data.map((restaurantData) => {
            const { meal_image_link} = restaurantData;
            
            return (
              <Link
                key={restaurantData.meal_id}
                href={`/restaurants/${restaurantData.meal_id}`}
                className="block group"
              >
                <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 group-hover:border-gray-200">
                  {/* Restaurant Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={restaurantData.meal_image_link}
                      alt={`${restaurantData.meal_name} banner`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {restaurantData && (
                      <div className="absolute top-3 left-3">
                        <Badge className="bg-teal-500 text-white">{restaurantData.meal_category}</Badge>
                      </div>
                    )}
                  </div>

                  {/* Restaurant Info */}
                  <div className="p-5">
                    {/* Logo and Name */}
                    <div className="flex items-center mb-3">
                      <div className="w-12 h-12 rounded-full border-2 border-white shadow-sm overflow-hidden bg-white mr-3 flex-shrink-0">
                        <img
                          src={restaurantData.meal_image_link}
                          alt={`${restaurantData.meal_name} logo`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-red-600 transition-colors">
                          {restaurantData.meal_name}
                        </h3>
                        <p className="text-sm text-gray-600">{restaurantData.meal_category}</p>
                      </div>
                    </div>

                    {/* Rating and Details */}
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                        <span className="font-medium">{restaurantData.meal_rating_value}</span>
                        <span className="ml-1">{restaurantData.meal_rating_number}</span>
                      </div>
                      
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span>{restaurantData.distance || '0 - KM'}</span>
                      </div>
                      
                      <div className="flex items-center">
                        <DollarSign className="h-4 w-4 mr-1" />
                        <span>{restaurantData.priceRange || '- DH'}</span>
                      </div>
                    </div>

                    {/* Call to Action */}
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <span className="text-red-600 font-medium group-hover:text-red-700 transition-colors">
                        View Menu →
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-gray-500">
          <p>More restaurants coming soon!</p>
        </div>
      </div>
    </div>
  );
};

export default Restaurants;
