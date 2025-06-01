"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { IconHome, IconShoppingBag, IconBuildingStore, IconCoffee, IconPill, IconCat, IconColorSwatch, IconPackage, IconSearch, IconUserCircle, IconX, IconChevronDown } from '@tabler/icons-react';
import { usePathname, useRouter } from 'next/navigation';

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  href: string;
  onClick?: () => void;
}

function NavItem({ icon, label, active = false, href, onClick }: NavItemProps) {
  return (
    <Link href={href} onClick={onClick} className={`flex items-center px-4 py-2.5 ${active ? 'bg-[#FFF1F0] text-[#FF3008]' : 'text-black hover:bg-gray-50'} rounded-md`}>
      <div className={`mr-3 ${active ? 'text-[#FF3008]' : 'text-black'}`}>
        {icon}
      </div>
      <span className="text-sm font-semibold">{label}</span>
    </Link>
  );
}

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const isHomePage = pathname === '/';

  // Listen for toggle-sidebar event from header
  useEffect(() => {
    const handleToggleSidebar = (e: CustomEvent) => {
      setIsOpen(e.detail.isOpen);
    };

    document.addEventListener('toggle-sidebar', handleToggleSidebar as EventListener);
    return () => {
      document.removeEventListener('toggle-sidebar', handleToggleSidebar as EventListener);
    };
  }, []);

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const sidebar = document.getElementById('mobile-sidebar');
      if (isOpen && sidebar && !sidebar.contains(e.target as Node) && !(e.target as Element).closest('button[aria-label="Toggle menu"]')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen]);

  const handleHomeClick = () => {
    // Navigate to home without category parameter
    router.push('/');
  };

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="w-[220px] fixed top-[57px] left-0 bottom-0 bg-white border-r border-gray-100 shadow-sm overflow-y-auto hidden md:block">
        <div className="flex flex-col h-full p-2">
          <div className="space-y-0.5">
            <NavItem icon={<IconHome size={20} strokeWidth={1.5} />} label="Home" active={isHomePage} href="/" onClick={handleHomeClick} />
            <NavItem icon={<IconShoppingBag size={20} strokeWidth={1.5} />} label="Grocery" href="#" />
            <NavItem icon={<IconBuildingStore size={20} strokeWidth={1.5} />} label="Retail" href="#" />
            <NavItem icon={<IconCoffee size={20} strokeWidth={1.5} />} label="Convenience" href="#" />
            <NavItem icon={<IconPill size={20} strokeWidth={1.5} />} label="Drugstore" href="#" />
            <NavItem icon={<IconCat size={20} strokeWidth={1.5} />} label="Pets" href="#" />
            <NavItem icon={<IconColorSwatch size={20} strokeWidth={1.5} />} label="Beauty" href="#" />
            <NavItem icon={<IconPackage size={20} strokeWidth={1.5} />} label="Home Goods" href="#" />
            <NavItem icon={<IconSearch size={20} strokeWidth={1.5} />} label="Browse All" href="/restaurants" onClick={()=>{router.push('/restaurants')}}/>
          </div>
          
          <div className="mt-auto border-t border-gray-100 pt-3 mb-1">
            <NavItem icon={<IconUserCircle size={20} strokeWidth={1.5} />} label="Sign up or Login" href="#" />
          </div>
        </div>
      </aside>

      {/* Mobile sidebar/drawer */}
      <div 
        id="mobile-sidebar"
        className={`fixed inset-0 bg-white z-50 transform transition-transform duration-300 ease-in-out md:hidden ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="flex flex-col h-full">
          {/* Mobile sidebar header */}
          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close menu"
              className="p-1 rounded-full hover:bg-gray-100"
            >
              <IconX className="h-5 w-5 text-gray-700" />
            </button>
          </div>

          {/* Mobile navigation */}
          <div className="overflow-y-auto">
            <div className="p-4">
              <Link href="/signin" className="flex items-center gap-3 py-3 px-4 bg-gray-100 rounded-lg">
                <IconUserCircle size={24} strokeWidth={1.5} className="text-gray-700" />
                <div>
                  <h3 className="font-semibold text-[15px]">Sign Up or Sign In</h3>
                </div>
              </Link>
            </div>

            <nav className="p-2">
              <ul>
                <li>
                  <Link href="/" onClick={handleHomeClick} className="flex items-center py-3 px-4 text-[#FF3008] font-medium">
                    <IconHome size={20} className="mr-4 text-[#FF3008]" />
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/pickup" className="flex items-center py-3 px-4 text-gray-800 font-medium">
                    <IconShoppingBag size={20} className="mr-4 text-gray-700" />
                    Pickup
                  </Link>
                </li>
                <li>
                  <Link href="/restaurants" className="flex items-center py-3 px-4 text-gray-800 font-medium">
                    <IconBuildingStore size={20} className="mr-4 text-gray-700" />
                    Restaurants
                  </Link>
                </li>
                <li>
                  <Link href="/help" className="flex items-center py-3 px-4 text-gray-800 font-medium">
                    <IconCoffee size={20} className="mr-4 text-gray-700" />
                    Help
                  </Link>
                </li>
              </ul>
            </nav>

            <div className="border-t border-gray-200 py-4 px-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-gray-900 font-semibold">English (US)</span>
                <IconChevronDown size={18} className="text-gray-600" />
              </div>

              <ul className="space-y-3 text-[15px]">
                <li><Link href="#" className="text-gray-900">About Us</Link></li>
                <li><Link href="#" className="text-gray-900">Careers</Link></li>
                <li><Link href="#" className="text-gray-900">DoorDash Newsroom</Link></li>
                <li><Link href="#" className="text-gray-900">About Engineering</Link></li>
                <li><Link href="#" className="text-gray-900">Engineering Blog</Link></li>
                <li><Link href="#" className="text-gray-900">Accessibility</Link></li>
                <li><Link href="#" className="text-gray-900">Be a Dasher</Link></li>
                <li><Link href="#" className="text-gray-900">Be a Partner Restaurant</Link></li>
                <li><Link href="#" className="text-gray-900">Dashers for Deliveries</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay when mobile sidebar is open */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}