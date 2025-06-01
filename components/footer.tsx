import Link from 'next/link';
import { IconBrandGooglePlay, IconBrandApple } from '@tabler/icons-react';

export default function Footer() {
  return (
    <footer className="w-full bg-white border-t border-gray-200 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Get to Know Us */}
          <div>
            <h3 className="font-medium text-gray-700 mb-4">Get to Know Us</h3>
            <ul className="space-y-3">
              <li><Link href="#" className="text-gray-500 hover:text-gray-700 text-sm">About Us</Link></li>
              <li><Link href="#" className="text-gray-500 hover:text-gray-700 text-sm">Careers</Link></li>
              <li><Link href="#" className="text-gray-500 hover:text-gray-700 text-sm">Investors</Link></li>
              <li><Link href="#" className="text-gray-500 hover:text-gray-700 text-sm">Company Blog</Link></li>
              <li><Link href="#" className="text-gray-500 hover:text-gray-700 text-sm">Engineering Blog</Link></li>
              <li><Link href="#" className="text-gray-500 hover:text-gray-700 text-sm">Merchant Blog</Link></li>
              <li><Link href="#" className="text-gray-500 hover:text-gray-700 text-sm">Gift Cards</Link></li>
              <li><Link href="#" className="text-gray-500 hover:text-gray-700 text-sm">Package Pickup</Link></li>
              <li><Link href="#" className="text-gray-500 hover:text-gray-700 text-sm">Promotions</Link></li>
              <li><Link href="#" className="text-gray-500 hover:text-gray-700 text-sm">Dasher Central</Link></li>
              <li><Link href="#" className="text-gray-500 hover:text-gray-700 text-sm">LinkedIn</Link></li>
              <li><Link href="#" className="text-gray-500 hover:text-gray-700 text-sm">Glassdoor</Link></li>
              <li><Link href="#" className="text-gray-500 hover:text-gray-700 text-sm">Accessibility</Link></li>
              <li><Link href="#" className="text-gray-500 hover:text-gray-700 text-sm">Newsroom</Link></li>
            </ul>
          </div>

          {/* Let Us Help You */}
          <div>
            <h3 className="font-medium text-gray-700 mb-4">Let Us Help You</h3>
            <ul className="space-y-3">
              <li><Link href="#" className="text-gray-500 hover:text-gray-700 text-sm">Account Details</Link></li>
              <li><Link href="#" className="text-gray-500 hover:text-gray-700 text-sm">Order History</Link></li>
              <li><Link href="#" className="text-gray-500 hover:text-gray-700 text-sm">Help</Link></li>
            </ul>
          </div>

          {/* Doing Business */}
          <div>
            <h3 className="font-medium text-gray-700 mb-4">Doing Business</h3>
            <ul className="space-y-3">
              <li><Link href="#" className="text-gray-500 hover:text-gray-700 text-sm">Become a Dainty</Link></li>
              <li><Link href="#" className="text-gray-500 hover:text-gray-700 text-sm">Daintymeal Merchant</Link></li>
              <li><Link href="#" className="text-gray-500 hover:text-gray-700 text-sm">Get Dashers for Deliveries</Link></li>
              <li><Link href="#" className="text-gray-500 hover:text-gray-700 text-sm">Get Daintymeal for Business</Link></li>
            </ul>
          </div>

          {/* App Download Links */}
          <div>
            <Link href="#" className="block mb-4">
              <div className="bg-black text-white rounded-md h-[53px] w-[160px] flex items-center justify-center px-2">
                <div className="mr-2">
                  <IconBrandApple size={24} />
                </div>
                <div>
                  <div className="text-[8px] leading-tight">Available on the</div>
                  <div className="text-sm font-semibold leading-tight">App Store</div>
                </div>
              </div>
            </Link>
            <Link href="#" className="block">
              <div className="bg-black text-white rounded-md h-[53px] w-[160px] flex items-center justify-center px-2">
                <div className="mr-2">
                  <IconBrandGooglePlay size={20} />
                </div>
                <div>
                  <div className="text-[8px] leading-tight">ANDROID APP ON</div>
                  <div className="text-sm font-semibold leading-tight">Google Play</div>
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* Bottom Links and Social */}
        <div className="flex flex-col md:flex-row justify-between items-center mt-10 pt-6 border-t border-gray-200">
          <div className="flex flex-col md:flex-row items-center mb-4 md:mb-0">
            <Link href="/" className="mr-4">
              {/* Logo */}
            </Link>
            <div className="flex flex-wrap justify-center md:justify-start">
              <Link href="#" className="text-gray-500 hover:text-gray-700 text-sm mr-4 mb-2 md:mb-0">Terms of Service</Link>
              <Link href="#" className="text-gray-500 hover:text-gray-700 text-sm mr-4 mb-2 md:mb-0">Privacy</Link>
              <Link href="#" className="text-gray-500 hover:text-gray-700 text-sm mr-4 mb-2 md:mb-0">Delivery Locations</Link>
              <Link href="#" className="text-gray-500 hover:text-gray-700 text-sm">Do Not Sell or Share My Personal Information</Link>
            </div>
          </div>
          
          <div className="flex space-x-4 items-center">
            <p className="text-gray-500 text-sm">© 2025 Daintymeal</p>
            <Link href="#" aria-label="Facebook">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500 hover:text-gray-700 h-5 w-5">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </Link>
            <Link href="#" aria-label="Twitter">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500 hover:text-gray-700 h-5 w-5">
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
              </svg>
            </Link>
            <Link href="#" aria-label="Instagram">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500 hover:text-gray-700 h-5 w-5">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
} 