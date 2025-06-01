// Restaurant types
export interface Restaurant {
    id: number;
    name: string;
    image: string;
    rating: number;
    ratings: string;
    distance: string;
    time: string;
    deliveryFee: string;
    isSponsored?: boolean;
    partnerBadge?: boolean;
    categories: string[];
    tag?: string;
    promo?: string;
}

// Dish types
export interface Dish {
    id: number;
    name: string;
    image: string;
    price: string;
    restaurant: string;
    likes: number | string;
    categories: string[];
}

// Mock restaurants data
export const restaurants: Restaurant[] = [
    {
        id: 1,
        name: "Burger King",
        image: "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
        rating: 4.3,
        ratings: "(200+)",
        distance: "500 ft",
        time: "12 min",
        deliveryFee: "CA$0 delivery fee",
        isSponsored: true,
        partnerBadge: true,
        categories: ["Burgers", "Fast Food"]
    },
    {
        id: 2,
        name: "McDonald's",
        image: "https://images.unsplash.com/photo-1619881590738-a111d176d906?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
        rating: 4.1,
        ratings: "(200+)",
        distance: "500 ft",
        time: "16 min",
        deliveryFee: "$0 delivery fee, first order",
        isSponsored: true,
        partnerBadge: true,
        categories: ["Burgers", "Fast Food"]
    },
    {
        id: 3,
        name: "Wendy's",
        image: "https://images.unsplash.com/photo-1561758033-d89a9ad46330?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
        rating: 4.4,
        ratings: "(200+)",
        distance: "800 ft",
        time: "12 min",
        deliveryFee: "$0 delivery fee, first order",
        partnerBadge: true,
        categories: ["Burgers", "Fast Food"]
    },
    {
        id: 4,
        name: "Pizza Hut",
        image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
        rating: 4.2,
        ratings: "(200+)",
        distance: "1.2 mi",
        time: "25 min",
        deliveryFee: "$0 delivery fee, first order",
        partnerBadge: true,
        categories: ["Pizza", "Fast Food"]
    },
    {
        id: 5,
        name: "Domino's Pizza",
        image: "https://images.unsplash.com/photo-1590947132387-155cc02f3212?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
        rating: 4.0,
        ratings: "(200+)",
        distance: "0.8 mi",
        time: "20 min",
        deliveryFee: "$0 delivery fee, first order",
        partnerBadge: true,
        categories: ["Pizza", "Fast Food"]
    },
    {
        id: 6,
        name: "Papa John's",
        image: "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
        rating: 4.3,
        ratings: "(200+)",
        distance: "1.5 mi",
        time: "30 min",
        deliveryFee: "$0 delivery fee, first order",
        isSponsored: true,
        partnerBadge: true,
        categories: ["Pizza", "Fast Food"]
    }
];

// Mock popular dishes data
export const popularDishes: Dish[] = [
    {
        id: 1,
        name: "Roadhouse Burger",
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
        price: "CA$3.00",
        restaurant: "Burger King",
        likes: "100% (8)",
        categories: ["Burgers"]
    },
    {
        id: 2,
        name: "Double Cheeseburger",
        image: "https://images.unsplash.com/photo-1586816001966-79b736744398?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
        price: "CA$5.09",
        restaurant: "McDonald's",
        likes: "84% (95)",
        categories: ["Burgers"]
    },
    {
        id: 3,
        name: "Burger Combo",
        image: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
        price: "CA$16.49",
        restaurant: "Ches's Fish and Chips",
        likes: "100% (6)",
        categories: ["Burgers"]
    },
    {
        id: 4,
        name: "Bacon Cheeseburger",
        image: "https://images.unsplash.com/photo-1550317138-10000687a72b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
        price: "CA$19.49",
        restaurant: "Smoke's Poutinerie",
        likes: "90% (11)",
        categories: ["Burgers"]
    },
    {
        id: 5,
        name: "Teen Burger®",
        image: "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
        price: "CA$10.95",
        restaurant: "A&W",
        likes: "80% (50)",
        categories: ["Burgers"]
    },
    {
        id: 6,
        name: "Double Cheese Burger with Fries",
        image: "https://images.unsplash.com/photo-1610614081038-b2c0b0c4b1fe?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
        price: "CA$21.89",
        restaurant: "Casablanca Bakery & Cafe",
        likes: "(50+)",
        categories: ["Burgers"]
    },
    {
        id: 7,
        name: "Bacon Bourbon BBQ Burger",
        image: "https://images.unsplash.com/photo-1584178639036-613ba57e5e39?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
        price: "CA$26.39",
        restaurant: "Kelsey's Original Roadhouse",
        likes: "83% (60)",
        categories: ["Burgers"]
    },
    {
        id: 8,
        name: "Chipotle Firecracker Burger",
        image: "https://images.unsplash.com/photo-1594728468201-1b449646a75d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
        price: "CA$23.99",
        restaurant: "Montana's BBQ & Bar",
        likes: "91% (68)",
        categories: ["Burgers"]
    },
    {
        id: 9,
        name: "Pepperoni Pizza",
        image: "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
        price: "CA$14.99",
        restaurant: "Pizza Hut",
        likes: "92% (78)",
        categories: ["Pizza"]
    },
    {
        id: 10,
        name: "Cheese Pizza",
        image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
        price: "CA$12.99",
        restaurant: "Domino's Pizza",
        likes: "88% (65)",
        categories: ["Pizza"]
    },
    {
        id: 11,
        name: "Supreme Pizza",
        image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
        price: "CA$18.99",
        restaurant: "Papa John's",
        likes: "95% (82)",
        categories: ["Pizza"]
    },
    {
        id: 12,
        name: "Hawaiian Pizza",
        image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
        price: "CA$16.99",
        restaurant: "Pizza Hut",
        likes: "80% (45)",
        categories: ["Pizza"]
    }
]; 