import React from 'react';
import { ArrowDown, Flame, Sparkles, MapPin, Phone, Star, ShieldCheck, HeartHandshake } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantInfo';

export const Hero = ({ onOpenPhotoModal, onOpenApkModal }) => {
  return (
    <section className="relative overflow-hidden pt-6 pb-12 lg:py-16">
      {/* Background Decorative Blobs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-pizza-red/15 rounded-full filter blur-3xl pointer-events-none -z-10 animate-pulse"></div>
      <div className="absolute bottom-0 right-10 w-96 h-96 bg-cheese-500/10 rounded-full filter blur-3xl pointer-events-none -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Headlines & Action */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Gen-Z Trending Badges Pill Row */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-gradient-to-r from-pizza-red/20 to-cheese-500/20 text-cheese-neon border border-cheese-500/30 shadow-sm">
                <Flame className="w-3.5 h-3.5 text-pizza-red animate-bounce" />
                <span>FRESH OUT THE OVEN</span>
              </span>

              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-green-500/10 text-green-400 border border-green-500/20">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>100% Pure Veg</span>
              </span>

              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-yellow-400/10 text-yellow-300 border border-yellow-400/20">
                <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                <span>4.9 / 5.0 (24 Reviews)</span>
              </span>
            </div>

            {/* Main Punchy Title */}
            <div className="space-y-2">
              <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl tracking-tight text-white leading-none">
                TOP QUALITY PIZZA. <br />
                <span className="bg-gradient-to-r from-pizza-red via-orange-500 to-cheese-neon bg-clip-text text-transparent">
                  UNBEATABLE PRICES.
                </span>
              </h1>
              <p className="text-gray-300 text-base sm:text-lg max-w-xl font-normal leading-relaxed pt-2">
                Craving crazy cheesy crusts, loaded combos & fiery tandoori slices? Welcome to <strong className="text-white font-bold">PIZZA PIZZA (HOT & FRESH)</strong>. Dehradun's ultimate pure-veg pizza hub where every bite hits different!
              </p>
            </div>

            {/* Highlights Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-1">
              <div className="glass-card p-3 rounded-2xl border border-white/5">
                <p className="text-xs text-gray-400 font-medium">Combos Starting At</p>
                <p className="font-display font-extrabold text-2xl text-cheese-neon">₹135</p>
                <p className="text-[11px] text-gray-400">Burger + Fries + Drink</p>
              </div>

              <div className="glass-card p-3 rounded-2xl border border-white/5">
                <p className="text-xs text-gray-400 font-medium">Classic Pizza From</p>
                <p className="font-display font-extrabold text-2xl text-pizza-red">₹110</p>
                <p className="text-[11px] text-gray-400">100% Mozzarella</p>
              </div>

              <div className="col-span-2 sm:col-span-1 glass-card p-3 rounded-2xl border border-white/5 bg-fresh-green/5 border-fresh-green/20">
                <p className="text-xs text-green-400 font-medium">Home Delivery</p>
                <p className="font-display font-extrabold text-2xl text-white">FREE</p>
                <p className="text-[11px] text-green-300">On Orders ₹500 & Above</p>
              </div>
            </div>

            {/* Main Action CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#menu"
                className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-pizza-red to-pizza-600 hover:from-pizza-600 hover:to-pizza-red text-white font-display font-extrabold text-base shadow-xl shadow-pizza-red/30 hover:shadow-pizza-red/50 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 group"
              >
                <span>Explore Full Menu</span>
                <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
              </a>

              <a
                href={`https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=${encodeURIComponent('Hi Pizza Pizza! I would like to order hot & fresh pizza.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3.5 rounded-2xl bg-white/5 hover:bg-white/10 text-white font-semibold text-sm border border-white/10 hover:border-fresh-green/50 transition-all flex items-center gap-2 shadow-sm"
              >
                <span className="text-lg">💬</span>
                <span>WhatsApp Order</span>
              </a>

              <button
                onClick={onOpenApkModal}
                className="px-4 py-3.5 rounded-2xl bg-cheese-500/10 hover:bg-cheese-500/20 text-cheese-neon font-bold text-sm border border-cheese-500/30 transition-all flex items-center gap-1.5"
              >
                <span>📲</span>
                <span>Install APK / Web App</span>
              </button>
            </div>

            {/* Quick Micro Info */}
            <div className="pt-2 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-gray-400">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-pizza-red" />
                <span>Canal Rd, Chironwali, Dehradun 248013</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-fresh-green"></span>
                <span className="text-gray-300">Open Daily: 12:00 PM – 11:00 PM</span>
              </span>
            </div>

          </div>

          {/* Right Column: Visual Interactive Collage */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Visual Card: Actual Combos Menu Banner */}
              <div 
                onClick={() => onOpenPhotoModal('/images/menu_combos.jpg', 'Pizza Pizza Combos Banner')}
                className="relative rounded-3xl overflow-hidden glass-panel border border-white/10 shadow-2xl group cursor-pointer transform hover:-rotate-1 transition-all duration-300"
              >
                <img
                  src="/images/menu_combos.jpg"
                  alt="Pizza Pizza Hot & Fresh Combos Banner"
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-5">
                  <div className="flex items-center justify-between w-full">
                    <div>
                      <span className="bg-pizza-red text-white text-[11px] font-black px-2 py-0.5 rounded uppercase tracking-wider">
                        Official Menu
                      </span>
                      <h3 className="font-display font-black text-lg text-white mt-1">
                        Hot & Fresh Combos
                      </h3>
                      <p className="text-xs text-gray-300">Tap to view full resolution</p>
                    </div>
                    <span className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white text-sm group-hover:scale-110 transition-transform">
                      🔍
                    </span>
                  </div>
                </div>
              </div>

              {/* Floating Floating Storefront Picture Pill */}
              <div 
                onClick={() => onOpenPhotoModal('/images/storefront.jpg', 'Pizza Pizza Dehradun Storefront')}
                className="absolute -bottom-6 -left-4 sm:-left-6 glass-card p-2.5 rounded-2xl border border-white/15 shadow-2xl flex items-center gap-3 cursor-pointer hover:scale-105 transition-all max-w-[260px] bg-[#161922]/95"
              >
                <img
                  src="/images/storefront.jpg"
                  alt="Pizza Pizza Storefront Canal Rd Dehradun"
                  className="w-14 h-14 rounded-xl object-cover shrink-0 border border-white/10"
                />
                <div>
                  <div className="flex items-center gap-1">
                    <span className="text-[10px] bg-fresh-green/20 text-fresh-green font-extrabold px-1.5 py-0.2 rounded uppercase">
                      Storefront
                    </span>
                    <span className="text-[11px] text-cheese-neon font-bold">4.9 ★</span>
                  </div>
                  <p className="font-bold text-xs text-white truncate">Canal Rd, Chironwali</p>
                  <p className="text-[10px] text-gray-400">Tap to see real photos</p>
                </div>
              </div>

              {/* Floating Pure Veg Sticker */}
              <div className="absolute -top-4 -right-2 bg-gradient-to-br from-green-500 to-emerald-700 text-white px-3 py-1.5 rounded-2xl shadow-xl flex items-center gap-1.5 border border-white/20 transform rotate-6 animate-bounce-subtle">
                <span className="w-3 h-3 rounded-full border border-white flex items-center justify-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
                </span>
                <span className="text-xs font-black tracking-wide">100% PURE VEG</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
