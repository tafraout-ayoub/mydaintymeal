import Image from 'next/image';
import Link from 'next/link';

interface PromoCard {
  id: number;
  title: string;
  subtitle: string;
  buttonText: string;
  buttonBgColor: string;
  bgColor: string;
  imageUrl: string;
}

const promoCards: PromoCard[] = [
  {
    id: 1,
    title: "Save $2 on select Tylenol®, Neutrogena® & more",
    subtitle: "Now - 5/19. Terms apply.",
    buttonText: "Order now",
    buttonBgColor: "#0d5331",
    bgColor: "#ebf7f2",
    imageUrl: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
  },
  {
    id: 2,
    title: "Explore offers from your favourite local and national stores",
    subtitle: "",
    buttonText: "Browse offers",
    buttonBgColor: "#e43e30",
    bgColor: "#ffffff",
    imageUrl: "https://images.unsplash.com/photo-1562967914-608f82629710?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
  },
  {
    id: 3,
    title: "Order delicious meals delivered to your door",
    subtitle: "",
    buttonText: "Order food",
    buttonBgColor: "#0d5331",
    bgColor: "#ffffff",
    imageUrl: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80"
  }
];

export default function PromotionalCarousel() {
  return (
    <div className="flex flex-row gap-3 pb-2 my-4 overflow-x-auto">
      {promoCards.map((card) => (
        <div 
          key={card.id} 
          className="min-w-[400px] md:min-w-0 md:flex-1 flex-shrink-0"
        >
          <div 
            className="rounded-lg overflow-hidden h-[132px] flex"
            style={{ backgroundColor: card.bgColor }}
          >
            <div className="w-3/5 p-6 flex flex-col justify-center">
              <h3 className="font-semibold text-gray-900 text-base leading-tight">{card.title}</h3>
              {card.subtitle && <p className="text-xs text-gray-600 mt-1">{card.subtitle}</p>}
              <div className="mt-2">
                <Link 
                  href="#" 
                  className="inline-block text-xs px-4 py-1.5 rounded-full text-white"
                  style={{ backgroundColor: card.buttonBgColor }}
                >
                  {card.buttonText}
                </Link>
              </div>
            </div>
            <div className="w-2/5 relative">
              <Image 
                src={card.imageUrl} 
                alt={card.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 40vw, 25vw"
                priority
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
} 