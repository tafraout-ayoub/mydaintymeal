"use client";

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { IconSearch, IconMapPin, IconBell, IconChevronDown, IconShoppingCart, IconMenu2, IconMap } from '@tabler/icons-react';

export default function Header() {
  const [cartCount] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [addressDropdownOpen, setAddressDropdownOpen] = useState(false);
  const [notificationDropdownOpen, setNotificationDropdownOpen] = useState(false);
  const [deliveryMode, setDeliveryMode] = useState<'delivery' | 'pickup'>('delivery');
  
  // Separate refs for desktop and mobile
  const desktopButtonRef = useRef<HTMLButtonElement>(null);
  const desktopContentRef = useRef<HTMLDivElement>(null);
  const mobileButtonRef = useRef<HTMLButtonElement>(null);
  const mobileContentRef = useRef<HTMLDivElement>(null);
  
  // Notification dropdown refs
  const notificationDesktopButtonRef = useRef<HTMLButtonElement>(null);
  const notificationDesktopContentRef = useRef<HTMLDivElement>(null);
  const notificationMobileButtonRef = useRef<HTMLButtonElement>(null);
  const notificationMobileContentRef = useRef<HTMLDivElement>(null);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
    // Dispatch custom event for sidebar to listen to
    document.dispatchEvent(new CustomEvent('toggle-sidebar', { detail: { isOpen: !sidebarOpen } }));
  };

  const toggleAddressDropdown = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent event from propagating
    setAddressDropdownOpen(!addressDropdownOpen);
    if (notificationDropdownOpen) setNotificationDropdownOpen(false);
  };

  const toggleNotificationDropdown = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent event from propagating
    setNotificationDropdownOpen(!notificationDropdownOpen);
    if (addressDropdownOpen) setAddressDropdownOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Check address dropdown elements
      const isAddressDesktopButtonClick = desktopButtonRef.current && desktopButtonRef.current.contains(event.target as Node);
      const isAddressDesktopContentClick = desktopContentRef.current && desktopContentRef.current.contains(event.target as Node);
      const isAddressMobileButtonClick = mobileButtonRef.current && mobileButtonRef.current.contains(event.target as Node);
      const isAddressMobileContentClick = mobileContentRef.current && mobileContentRef.current.contains(event.target as Node);
      
      // Check notification dropdown elements
      const isNotificationDesktopButtonClick = notificationDesktopButtonRef.current && 
        notificationDesktopButtonRef.current.contains(event.target as Node);
      const isNotificationDesktopContentClick = notificationDesktopContentRef.current && 
        notificationDesktopContentRef.current.contains(event.target as Node);
      const isNotificationMobileButtonClick = notificationMobileButtonRef.current && 
        notificationMobileButtonRef.current.contains(event.target as Node);
      const isNotificationMobileContentClick = notificationMobileContentRef.current && 
        notificationMobileContentRef.current.contains(event.target as Node);
      
      // If click is outside all of address dropdown elements, close it
      if (!isAddressDesktopButtonClick && !isAddressDesktopContentClick && 
          !isAddressMobileButtonClick && !isAddressMobileContentClick) {
        setAddressDropdownOpen(false);
      }
      
      // If click is outside all of notification dropdown elements, close it
      if (!isNotificationDesktopButtonClick && !isNotificationDesktopContentClick && 
          !isNotificationMobileButtonClick && !isNotificationMobileContentClick) {
        setNotificationDropdownOpen(false);
      }
    };

    // Add event listener
    document.addEventListener('click', handleClickOutside, true);
    
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);

  // Handle clicks inside dropdown content
  const handleDropdownContentClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Critical - prevent bubbling to document
  };

  return (
    <header className="bg-white sticky top-0 z-50 border-b border-gray-200">
      {/* Desktop Header */}
      <div className="hidden md:block">
        <div className="max-w-[1920px] mx-auto flex flex-wrap items-center justify-between px-4 py-2">
          <div className="flex items-center w-full lg:w-auto lg:flex-1 mb-2 lg:mb-0">
            <Link href="/" className="flex items-center flex-shrink-0 w-[120px] sm:w-[150px] md:w-[180px] lg:w-[200px]">
              <div className="w-28 h-5 relative">
                
              </div>
            </Link>
            
            <div className="flex-grow max-w-[1050px] w-full ml-4">
              <div className="relative">
                <IconSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-[18px] w-[18px] z-10" />
                <input
                  type="text"
                  placeholder="Search DoorDash"
                  className="bg-gray-100 hover:bg-gray-200 pl-10 pr-4 py-[7px] rounded-[22px] w-full text-[15px] focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 md:gap-3 w-full lg:w-auto justify-between lg:justify-end">
            <div className="relative">
              <button 
                className="flex items-center gap-1 bg-gray-100 px-2 sm:px-3 py-[6px] rounded-full truncate max-w-[140px] md:max-w-none"
                onClick={toggleAddressDropdown}
                ref={desktopButtonRef}
              >
                <IconMapPin className="h-[18px] w-[18px] min-w-[18px] text-black" />
                <span className="text-[13px] font-semibold text-black truncate">102 Newtown Rd</span>
                <IconChevronDown className="h-[14px] w-[14px] min-w-[14px] text-black" />
              </button>

              {/* Address Dropdown */}
              {addressDropdownOpen && (
                <div 
                  className="absolute top-full right-0 sm:right-auto sm:left-0 mt-2 w-[calc(100vw-2rem)] sm:w-80 bg-white rounded-lg shadow-lg z-50 overflow-hidden border border-gray-200 max-w-sm"
                  ref={desktopContentRef}
                  onClick={handleDropdownContentClick}
                >
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-3">Enter Your Address</h3>
                    <div className="relative mb-3">
                      <div className="flex items-center border border-gray-300 rounded-md px-3 py-2">
                        <IconMapPin className="h-5 w-5 text-gray-400 mr-2" />
                        <input 
                          type="text" 
                          placeholder="Address" 
                          className="w-full outline-none text-sm"
                        />
                      </div>
                    </div>
                    <button className="flex items-center text-sm mb-4">
                      <div className="flex items-center bg-gray-100 px-2 py-1 rounded-full">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2">
                          <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 5C13.66 5 15 6.34 15 8C15 9.66 13.66 11 12 11C10.34 11 9 9.66 9 8C9 6.34 10.34 5 12 5ZM6 15.98C7.29 17.92 9.5 19 12 19C14.5 19 16.71 17.92 18 15.98C17.99 13.99 13.99 12.9 12 12.9C10 12.9 6.01 13.99 6 15.98Z" fill="#1F1F1F" />
                        </svg>
                        Sign in for saved address
                      </div>
                    </button>
                  </div>
                  <div className="border-t border-gray-200">
                    <div className="p-4 hover:bg-gray-50 cursor-pointer flex items-start">
                      <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center mr-2">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                      <div>
                        <div className="text-red-500 font-bold text-sm">14 Newfoundland Dr</div>
                        <div className="text-gray-600 text-sm">St. John's, NL A1A 3E7, Canada</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="flex border border-gray-300 rounded-full overflow-hidden h-8">
              <button 
                className={`px-2 sm:px-3 py-[6px] font-semibold text-[13px] whitespace-nowrap transition-colors duration-200 ${deliveryMode === 'delivery' ? 'bg-black text-white' : 'bg-gray-100 text-black'}`}
                onClick={() => setDeliveryMode('delivery')}
              >
                Delivery
              </button>
              <button 
                className={`px-2 sm:px-3 py-[6px] font-semibold text-[13px] whitespace-nowrap transition-colors duration-200 ${deliveryMode === 'pickup' ? 'bg-black text-white' : 'bg-gray-100 text-black'}`}
                onClick={() => setDeliveryMode('pickup')}
              >
                Pickup
              </button>
            </div>

            <div className="relative">
              <button 
                className="flex items-center justify-center w-8 h-8 min-w-[32px]"
                onClick={toggleNotificationDropdown}
                ref={notificationDesktopButtonRef}
              >
                <IconBell className="h-5 w-5 text-black" />
              </button>

              {/* Notification Dropdown */}
              {notificationDropdownOpen && (
                <div 
                  className="absolute top-full right-0 mt-2 w-[380px] bg-white rounded-lg shadow-lg z-50 overflow-hidden border border-gray-200"
                  ref={notificationDesktopContentRef}
                  onClick={handleDropdownContentClick}
                  style={{ marginRight: "-80px" }}
                >
                  <div className="p-5">
                    <h3 className="text-xl font-bold mb-5">Notifications</h3>
                    
                    <div className="flex items-start p-5 bg-gray-50 rounded-xl relative border border-gray-100 shadow-sm">
                      <div className="flex-1 pr-12">
                        <h4 className="font-bold text-[15px] mb-2">CA$0 delivery fee on your first order</h4>
                        <p className="text-sm text-gray-700 mb-5 leading-relaxed">Sign up to get this deal or sign in to use your available deals and credits</p>
                        
                        <button className="bg-[#FF3008] text-white font-medium text-sm px-5 py-2.5 rounded-full hover:bg-[#e02b07] shadow-sm transition-all">
                          Sign up or sign in
                        </button>
                      </div>
                      
                      <div className="absolute bottom-5 right-5">
                        <div className="relative">
                          <div className="w-12 h-12 bg-[#FF3008] rounded-full flex items-center justify-center shadow-md">
                            <span className="text-white font-bold text-base">%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Link href="/cart" className="relative flex items-center justify-center min-w-[64px]">
              <div className="h-9 w-16 bg-[#FF3008] text-white rounded-full flex items-center justify-center gap-1.5 px-3 py-1.5 transition-all hover:bg-[#e02b07]">
                <IconShoppingCart className="h-5 w-5" strokeWidth={2} />
                <span className="text-sm font-bold">0</span>
              </div>
            </Link>

            <div className="hidden sm:flex items-center gap-3">
              <Link href="/signin" className="text-[13px] font-semibold text-black whitespace-nowrap">
                Sign In
              </Link>
              <Link href="/signup" className="text-[13px] font-semibold text-black bg-gray-100 px-3 py-[6px] rounded-full hover:bg-gray-200 whitespace-nowrap">
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Header - Two Row Layout */}
      <div className="md:hidden">
        {/* App Promotion Banner */}
        <div className="flex items-center justify-between px-4 py-2 bg-gray-50 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#FF3008] rounded-full flex items-center justify-center">
              <svg viewBox="0 0 126 126" className="w-5 h-5 fill-white">
                <path d="M39.1,53.8c-1.9-1.9-1.9-5.1,0-7.1l9.9-9.9c1.9-1.9,5.1-1.9,7.1,0l7.1,7.1l7.1-7.1c1.9-1.9,5.1-1.9,7.1,0l9.9,9.9 c1.9,1.9,1.9,5.1,0,7.1L70.1,70.9c-1.9,1.9-5.1,1.9-7.1,0L39.1,53.8z" />
              </svg>
            </div>
            <div>
              <div className="font-semibold text-sm">Browse faster in the app</div>
              <div className="text-xs text-gray-600">CA$0 delivery fee on first order</div>
              <div className="flex items-center text-xs text-gray-600">
                <div className="flex items-center">
                  <span className="text-yellow-500">★★★★★</span>
                  <span className="ml-1">18.2M ratings</span>
                </div>
              </div>
            </div>
          </div>
          <div>
            <a href="#" className="px-4 py-1 bg-[#FF3008] text-white text-sm font-medium rounded-full">Open</a>
          </div>
        </div>
        
        {/* Top Row with Menu, Logo, Login, App buttons */}
        <div className="flex items-center justify-between px-4 py-2">
          <div className="flex items-center">
            <button 
              className="mr-3" 
              onClick={toggleSidebar}
              aria-label="Toggle menu"
            >
              <IconMenu2 className="h-5 w-5 text-black" />
            </button>
            
            <Link href="/" className="flex items-center">
              <div className="w-8 h-8 relative">
                <svg viewBox="0 0 126 126" className="w-full h-full">
                  <path 
                    d="M39.1,53.8c-1.9-1.9-1.9-5.1,0-7.1l9.9-9.9c1.9-1.9,5.1-1.9,7.1,0l7.1,7.1l7.1-7.1c1.9-1.9,5.1-1.9,7.1,0l9.9,9.9 c1.9,1.9,1.9,5.1,0,7.1L70.1,70.9c-1.9,1.9-5.1,1.9-7.1,0L39.1,53.8z" 
                    fill="#FF3008" 
                  />
                </svg>
              </div>
            </Link>
          </div>
          
          <div className="flex items-center gap-2">
            <Link href="/login" className="text-[15px] font-semibold text-black">
              Login
            </Link>
            <Link href="/app" className="text-[15px] font-semibold text-white bg-[#FF3008] px-3 py-[6px] rounded-full">
              Open App
            </Link>
          </div>
        </div>
        
        {/* Bottom Row with Location and Icons */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100">
          <div className="relative">
            <button 
              className="flex items-center"
              onClick={toggleAddressDropdown}
              ref={mobileButtonRef}
            >
              <span className="text-[15px] font-medium text-black mr-2 max-w-[100px] truncate">New York F...</span>
              <IconChevronDown className="h-4 w-4 text-black" />
            </button>
            
            {/* Mobile Address Dropdown */}
            {addressDropdownOpen && (
              <div 
                className="absolute top-full left-0 mt-2 w-[calc(100vw-2rem)] max-w-sm bg-white rounded-lg shadow-lg z-50 overflow-hidden border border-gray-200"
                ref={mobileContentRef}
                onClick={handleDropdownContentClick}
                style={{ maxHeight: '80vh', overflowY: 'auto' }}
              >
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-3">Enter Your Address</h3>
                  <div className="relative mb-3">
                    <div className="flex items-center border border-gray-300 rounded-md px-3 py-2">
                      <IconMapPin className="h-5 w-5 text-gray-400 mr-2" />
                      <input 
                        type="text" 
                        placeholder="Address" 
                        className="w-full outline-none text-sm"
                      />
                    </div>
                  </div>
                  <button className="flex items-center text-sm mb-4">
                    <div className="flex items-center bg-gray-100 px-2 py-1 rounded-full">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2">
                        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 5C13.66 5 15 6.34 15 8C15 9.66 13.66 11 12 11C10.34 11 9 9.66 9 8C9 6.34 10.34 5 12 5ZM6 15.98C7.29 17.92 9.5 19 12 19C14.5 19 16.71 17.92 18 15.98C17.99 13.99 13.99 12.9 12 12.9C10 12.9 6.01 13.99 6 15.98Z" fill="#1F1F1F" />
                      </svg>
                      Sign in for saved address
                    </div>
                  </button>
                </div>
                <div className="border-t border-gray-200">
                  <div className="p-4 hover:bg-gray-50 cursor-pointer flex items-start">
                    <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center mr-2">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <div>
                      <div className="text-red-500 font-bold text-sm">14 Newfoundland Dr</div>
                      <div className="text-gray-600 text-sm">St. John's, NL A1A 3E7, Canada</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-5">
              <button className="flex items-center justify-center w-8 h-8">
                <IconSearch className="h-5 w-5 text-black" />
              </button>
              <button className="flex items-center justify-center w-8 h-8">
                <IconMapPin className="h-5 w-5 text-black" />
              </button>
              <div className="relative">
                <button 
                  className="flex items-center justify-center relative w-8 h-8"
                  onClick={toggleNotificationDropdown}
                  ref={notificationMobileButtonRef}
                >
                  <IconBell className="h-5 w-5 text-black" />
                  <span className="absolute -top-1 -right-1 bg-red-500 rounded-full w-2 h-2"></span>
                </button>
                
                {/* Mobile Notification Dropdown */}
                {notificationDropdownOpen && (
                  <div 
                    className="absolute top-full right-0 mt-2 w-[calc(100vw-2rem)] max-w-[380px] bg-white rounded-lg shadow-lg z-50 overflow-hidden border border-gray-200"
                    ref={notificationMobileContentRef}
                    onClick={handleDropdownContentClick}
                    style={{ maxHeight: '80vh', overflowY: 'auto', right: '-16px' }}
                  >
                    <div className="p-5">
                      <h3 className="text-xl font-bold mb-5">Notifications</h3>
                      
                      <div className="flex items-start p-5 bg-gray-50 rounded-xl relative border border-gray-100 shadow-sm">
                        <div className="flex-1 pr-12">
                          <h4 className="font-bold text-[15px] mb-2">CA$0 delivery fee on your first order</h4>
                          <p className="text-sm text-gray-700 mb-5 leading-relaxed">Sign up to get this deal or sign in to use your available deals and credits</p>
                          
                          <button className="bg-[#FF3008] text-white font-medium text-sm px-5 py-2.5 rounded-full hover:bg-[#e02b07] shadow-sm transition-all">
                            Sign up or sign in
                          </button>
                        </div>
                        
                        <div className="absolute bottom-5 right-5">
                          <div className="relative">
                            <div className="w-12 h-12 bg-[#FF3008] rounded-full flex items-center justify-center shadow-md">
                              <span className="text-white font-bold text-base">%</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <Link href="/cart" className="relative flex items-center justify-center ml-1">
                <div className="h-8 w-14 bg-[#FF3008] text-white rounded-full flex items-center justify-center gap-1.5 px-3 py-1">
                  <IconShoppingCart className="h-4 w-4" strokeWidth={2} />
                  <span className="text-sm font-bold">0</span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}