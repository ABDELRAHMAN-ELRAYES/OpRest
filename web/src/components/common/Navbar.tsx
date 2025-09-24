import React, { useState, useEffect } from "react";
import {
  Menu,
  X,
  Utensils,
  MessageCircle,
  LogIn,
  UserPlus,
  ChevronDown,
  Search,
  ShoppingCart,
  User,
} from "lucide-react";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    if (isSearchOpen) setIsSearchOpen(false);
  };

  const handleDropdown = (dropdown: string) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (isOpen) setIsOpen(false);
  };

  const navItems = [
    {
      name: "الرئيسية",
      href: "#home",
      icon: null,
    },
    {
      name: "الخدمات",
      href: "#services",
      icon: ChevronDown,
      submenu: [
        { name: "تصميم المنيو", href: "#menu-design" },
        { name: "إدارة الطلبات", href: "#order-management" },
        { name: "التحليلات", href: "#analytics" },
        { name: "الدعم الفني", href: "#support" },
      ],
    },
    {
      name: "شاركني موظف",
      href: "#share-employee",
      icon: null,
    },
    {
      name: "المدونة",
      href: "#blog",
      icon: null,
    },
    {
      name: "الفيديوهات",
      href: "#videos",
      icon: null,
    },
  ];

  return (
    <div className="relative w-full">
      <div className="absolute w-full top-[1rem] z-[10000]">
        <nav
          className={` w-full z-50 transition-all duration-500 border-none`}
          dir="rtl"
        >
          {/* ${
          isScrolled
            ? "bg-white/98 backdrop-blur-2xl shadow-2xl border-b border-gray-100"
            : "bg-white/95 backdrop-blur-lg"
        }  */}
          <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-18 lg:py-6">
            <div className="flex justify-between items-center h-20 p-4 ">
              {/* Right Side: Desktop Navigation */}
              <div className="hidden lg:flex items-center space-x-reverse space-x-1">
                {navItems.map((item, index) => (
                  <div key={index} className="relative group">
                    <a
                      href={item.href}
                      className="flex items-center space-x-reverse space-x-1 px-5 py-3 rounded-xl text-gray-700 hover:text-orange-600 transition-all duration-300 font-medium group-hover:bg-orange-50/80 relative overflow-hidden"
                      onMouseEnter={() =>
                        item.icon && handleDropdown(item.name)
                      }
                    >
                      <span className="relative z-10">{item.name}</span>
                      {item.icon && (
                        <item.icon className="w-4 h-4 transition-transform duration-300" />
                      )}
                      <div className="absolute bottom-0 right-0 w-0 h-0.5 bg-gradient-to-r from-orange-500 to-red-500 transition-all duration-300 group-hover:w-full"></div>
                    </a>

                    {/* Dropdown Menu */}
                    {item.submenu && (
                      <div className="absolute top-full left-0 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                        <div className="mt-2 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
                          {item.submenu.map((subItem, subIndex) => (
                            <a
                              key={subIndex}
                              href={subItem.href}
                              className="block px-6 py-4 text-gray-700 hover:text-orange-600 hover:bg-orange-50/50 transition-all duration-200 border-b border-gray-100/50 last:border-b-0"
                            >
                              {subItem.name}
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="flex items-center space-x-reverse space-x-4">
                {/* Search Bar */}
                <div
                  className={`hidden lg:flex items-center transition-all duration-500 ${
                    isSearchOpen ? "w-80 opacity-100" : "w-12 opacity-90"
                  }`}
                >
                  <div className="relative w-full">
                    <input
                      type="text"
                      placeholder="ابحث في الخدمات..."
                      className={`w-full bg-gray-100/80 border-0 rounded-2xl py-3 pr-12 pl-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-200 focus:bg-white transition-all duration-300 ${
                        isSearchOpen
                          ? "opacity-100"
                          : "opacity-0 pointer-events-none"
                      }`}
                    />
                    <button
                      onClick={toggleSearch}
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 p-2 text-gray-500 hover:text-orange-600 transition-colors duration-200 outline-0"
                    >
                      <Search className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Icons Group */}
                <div className="flex items-center space-x-reverse space-x-2">
                  {/* Cart Icon */}
                  <button className="relative p-3 rounded-xl text-gray-600 hover:text-orange-600 hover:bg-orange-50 transition-all duration-200 group">
                    <ShoppingCart className="w-6 h-6" />
                    {/* Cart Badge */}
                    <span className="absolute -top-1 -left-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                      3
                    </span>
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-orange-500/10 to-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                  </button>

                  {/* User Icon */}
                  <button className="p-3 rounded-xl text-gray-600 hover:text-orange-600 hover:bg-orange-50 transition-all duration-200 group relative">
                    <User className="w-6 h-6" />
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-orange-500/10 to-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                  </button>

                  {/* WhatsApp Icon (Mobile visible only) */}
                  <a
                    href="https://wa.me/966123456789"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="lg:hidden flex items-center p-3 rounded-xl text-green-600 hover:text-green-700 hover:bg-green-50 transition-all duration-200 group"
                  >
                    <MessageCircle className="w-6 h-6" />
                  </a>
                </div>
              </div>
              {/* Left Side: Search, Cart, User */}
              {/* Center: Logo */}

              <div className="flex items-center space-x-reverse space-x-4 absolute left-1/2 transform -translate-x-1/2">
                <img src="/images/logo/white.png" alt="OpeRest" className="w-[13rem]"/>
              </div>

              {/* Mobile Actions */}
              <div className="flex lg:hidden items-center space-x-reverse space-x-3">
                <button
                  onClick={toggleSearch}
                  className="p-2 rounded-xl text-gray-600 hover:text-orange-600 hover:bg-orange-50 transition-colors duration-200 border-none"
                >
                  <Search className="w-5 h-5" />
                </button>

                <button
                  onClick={toggleMenu}
                  className="p-2 rounded-xl text-gray-600 hover:text-orange-600 hover:bg-orange-50 transition-colors duration-200"
                >
                  {isOpen ? (
                    <X className="w-6 h-6" />
                  ) : (
                    <Menu className="w-6 h-6" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div
            className={`lg:hidden transition-all duration-500 overflow-hidden ${
              isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="bg-white/98 backdrop-blur-2xl border-t border-gray-100 shadow-2xl">
              {/* Mobile Search */}
              <div className="px-4 py-3 border-b border-gray-100">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="ابحث في الخدمات..."
                    className="w-full bg-gray-100/80 border-0 rounded-2xl py-3 pr-12 pl-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-200 focus:bg-white"
                  />
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
              </div>

              <div className="px-4 py-6 space-y-2">
                {navItems.map((item, index) => (
                  <div key={index}>
                    <a
                      href={item.href}
                      className="flex items-center justify-between px-4 py-4 text-gray-700 hover:text-orange-600 hover:bg-orange-50/50 rounded-xl transition-all duration-200 font-medium"
                      onClick={() => item.submenu && handleDropdown(item.name)}
                    >
                      <span>{item.name}</span>
                      {item.submenu && (
                        <ChevronDown
                          className={`w-4 h-4 transition-transform duration-300 ${
                            activeDropdown === item.name ? "rotate-180" : ""
                          }`}
                        />
                      )}
                    </a>

                    {/* Mobile Submenu */}
                    {item.submenu && activeDropdown === item.name && (
                      <div className="mr-4 mt-2 bg-gray-50/80 rounded-xl space-y-1">
                        {item.submenu.map((subItem, subIndex) => (
                          <a
                            key={subIndex}
                            href={subItem.href}
                            className="block px-6 py-3 text-gray-600 hover:text-orange-600 hover:bg-orange-50/50 transition-all duration-200"
                          >
                            {subItem.name}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ))}

                {/* Mobile Auth & Actions */}
                <div className="pt-4 border-t border-gray-100 space-y-3">
                  <a
                    href="https://wa.me/966123456789"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center space-x-reverse space-x-2 w-full px-4 py-4 text-green-600 hover:text-green-700 bg-green-50 hover:bg-green-100 rounded-xl transition-all duration-200"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span className="font-medium">تواصل عبر واتساب</span>
                  </a>

                  <button className="flex items-center justify-center space-x-reverse space-x-2 w-full px-4 py-4 text-gray-600 hover:text-orange-600 bg-gray-50 hover:bg-orange-50 rounded-xl transition-all duration-200">
                    <User className="w-5 h-5" />
                    <span className="font-medium">حسابي</span>
                  </button>

                  <button className="flex items-center justify-center space-x-reverse space-x-2 w-full px-4 py-4 text-gray-600 hover:text-orange-600 bg-gray-50 hover:bg-orange-50 rounded-xl transition-all duration-200">
                    <ShoppingCart className="w-5 h-5" />
                    <span className="font-medium">سلة التسوق (3)</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
