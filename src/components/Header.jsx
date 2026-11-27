import React, { useState } from 'react';
import { ShoppingBag, Phone, MapPin, Sparkles, Download, Menu, X, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { RESTAURANT_INFO } from '../data/restaurantInfo';

export const Header = ({ onOpenApkModal, onOpenPhotoModal }) => {
  const { totalItemsCount, setIsCartOpen, subtotal } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full">
      {/* Top Gen-Z Marquee Banner */}
      <div className="bg-gradient-to-r from-pizza-red via-pizza-600 to-cheese-500 text-white text-xs font-bold py-1.5 px-4 overflow-hidden relative shadow-md">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-2 truncate">
            <span className="bg-white/20 px-2 py-0.5 rounded-full text-[10px] tracking-wider uppercase font-extrabold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-fresh-green animate-ping"></span>
              Hot Deal
            </span>
            <span className="truncate">
              ⚡ Free Home Delivery on Orders ₹500+ in Dehradun! • 100% Pure Veg 🌿
            </span>
          </div>

          <div className="hidden sm:flex items-center space-x-3 text-xs shrink-0 font-medium">
            <span className="flex items-center gap-1 text-cheese-neon bg-black/30 px-2 py-0.5 rounded-full font-bold">
              ⭐ {RESTAURANT_INFO.googleRating} Google Rating ({RESTAURANT_INFO.reviewCount} Reviews)
            </span>
            <a 
              href={`tel:${RESTAURANT_INFO.phones[0].replace(/\s+/g, '')}`} 
              className="hover:underline flex items-center gap-1"
            >
              <Phone className="w-3 h-3" /> {RESTAURANT_INFO.phones[0]}
            </a>
          </div>
        </div>
      </div>

      {/* Main Nav Bar */}
      <nav className="glass-header border-b border-white/10 px-4 lg:px-8 py-3 transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Logo & Store Info */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-pizza-red to-cheese-500 p-0.5 shadow-lg group-hover:scale-105 transition-transform flex items-center justify-center">
                <div className="w-full h-full bg-[#11141C] rounded-[14px] flex items-center justify-center overflow-hidden">
                  <span className="text-2xl transform group-hover:rotate-12 transition-transform">🍕</span>
                </div>
              </div>
              <span className="absolute -bottom-1 -right-1 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-fresh-green opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-fresh-green border-2 border-[#11141C]"></span>
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="font-display font-extrabold text-lg sm:text-xl tracking-tight text-white flex items-center">
                  PIZZA PIZZA
                </span>
                <span className="bg-pizza-red/20 text-pizza-red text-[11px] font-extrabold px-1.5 py-0.5 rounded border border-pizza-red/40 uppercase tracking-wider">
                  HOT & FRESH
                </span>
              </div>
              <p className="text-xs text-gray-400 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full border border-green-500 flex items-center justify-center">
                  <span className="w-1 h-1 rounded-full bg-green-500"></span>
                </span>
                <span>Pure Veg</span>
                <span>•</span>
                <span className="text-gray-300 truncate max-w-[150px] sm:max-w-xs">{RESTAURANT_INFO.shortAddress}</span>
              </p>
            </div>
          </a>

          {/* Center Links (Desktop) */}
          <div className="hidden md:flex items-center space-x-6 text-sm font-semibold text-gray-300">
            <a href="#menu" className="hover:text-pizza-red transition-colors flex items-center gap-1">
              Menu & Combos
            </a>
            <a href="#specials" className="hover:text-cheese-400 transition-colors flex items-center gap-1">
              <Sparkles className="w-4 h-4 text-cheese-neon" /> Hot Deals
            </a>
            <a href="#store-info" className="hover:text-pizza-red transition-colors flex items-center gap-1">
              <MapPin className="w-4 h-4 text-pizza-red" /> Location & Photos
            </a>
            <a href="#reviews" className="hover:text-cheese-400 transition-colors flex items-center gap-1">
              Reviews ({RESTAURANT_INFO.googleRating}★)
            </a>
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* APK / Install App Button */}
            <button
              onClick={onOpenApkModal}
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-bold border border-white/10 transition-all hover:border-cheese-500/50"
              title="Download Android APK / Install App"
            >
              <Download className="w-3.5 h-3.5 text-cheese-neon" />
              <span>Get APK App</span>
            </button>

            {/* Direct WhatsApp Call/Chat */}
            <a
              href={`https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=${encodeURIComponent('Hi Pizza Pizza! I would like to check your menu and place an order.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-fresh-green/10 hover:bg-fresh-green/20 text-fresh-green text-xs font-bold border border-fresh-green/30 transition-all"
            >
              <span className="text-sm">💬</span>
              <span>WhatsApp</span>
            </a>

            {/* Cart Trigger Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl bg-gradient-to-r from-pizza-red to-pizza-600 text-white text-sm font-bold shadow-lg shadow-pizza-red/30 hover:shadow-pizza-red/50 hover:scale-105 active:scale-95 transition-all"
              aria-label="Open Cart"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">Cart</span>
              {totalItemsCount > 0 && (
                <span className="bg-cheese-neon text-black font-extrabold text-xs px-2 py-0.5 rounded-full shadow-sm animate-bounce-subtle">
                  {totalItemsCount}
                </span>
              )}
              {subtotal > 0 && (
                <span className="border-l border-white/30 pl-2 font-mono text-xs hidden xs:inline">
                  ₹{subtotal}
                </span>
              )}
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl bg-white/5 text-gray-300 hover:text-white border border-white/10"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 pt-3 border-t border-white/10 flex flex-col gap-2 pb-2 text-sm font-semibold text-gray-200">
            <a 
              href="#menu" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-white/5 flex items-center justify-between"
            >
              <span>🍕 Food Menu & Combos</span>
              <ArrowRight className="w-4 h-4 text-gray-400" />
            </a>
            <a 
              href="#specials" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-white/5 flex items-center justify-between text-cheese-400"
            >
              <span>🔥 Super Combos & Deals</span>
              <ArrowRight className="w-4 h-4 text-gray-400" />
            </a>
            <a 
              href="#store-info" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-white/5 flex items-center justify-between"
            >
              <span>📍 Address & Store Photos</span>
              <ArrowRight className="w-4 h-4 text-gray-400" />
            </a>
            <button 
              onClick={() => { setMobileMenuOpen(false); onOpenApkModal(); }}
              className="px-3 py-2 rounded-lg bg-cheese-500/10 text-cheese-neon border border-cheese-500/20 flex items-center justify-between text-left font-bold"
            >
              <span className="flex items-center gap-2">
                <Download className="w-4 h-4" /> Install Android APK / Web App
              </span>
              <span className="text-xs bg-cheese-neon text-black px-1.5 py-0.5 rounded font-extrabold">NEW</span>
            </button>
          </div>
        )}
      </nav>
    </header>
  );
};
