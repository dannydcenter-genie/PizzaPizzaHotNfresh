import React from 'react';
import { Phone, MapPin, Heart, ShieldCheck, Download, Star, ExternalLink, ArrowUp } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantInfo';

export const Footer = ({ onOpenApkModal, onOpenPhotoModal }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#080A0E] text-gray-400 border-t border-white/10 pt-12 pb-24 md:pb-12 text-xs relative overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-64 bg-pizza-red/10 rounded-full filter blur-3xl pointer-events-none -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 lg:px-8 space-y-10">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 items-start">
          
          {/* Brand Info */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-pizza-red to-cheese-500 p-0.5 flex items-center justify-center">
                <div className="w-full h-full bg-[#11141C] rounded-[14px] flex items-center justify-center text-xl">
                  🍕
                </div>
              </div>
              <div>
                <h3 className="font-display font-black text-lg text-white tracking-tight">
                  PIZZA PIZZA <span className="text-pizza-red font-bold text-xs uppercase ml-1">(HOT & FRESH)</span>
                </h3>
                <p className="text-[11px] text-gray-400">{RESTAURANT_INFO.tagline}</p>
              </div>
            </div>

            <p className="text-gray-400 leading-relaxed text-xs max-w-sm">
              Your favorite neighborhood pizzeria in Dehradun serving molten cheese burst pizzas, budget combos, crispy burgers, quesadillas, and rich desserts. 100% pure vegetarian.
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-1">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-fresh-green/10 text-fresh-green border border-fresh-green/20 font-bold text-[11px]">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>100% Pure Vegetarian Kitchen</span>
              </div>

              <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-yellow-400/10 text-yellow-300 border border-yellow-400/20 font-bold text-[11px]">
                <Star className="w-3.5 h-3.5 fill-yellow-400" />
                <span>4.9 / 5.0 Google Rating</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-display font-extrabold text-sm text-white uppercase tracking-wider">
              Quick Menu Links
            </h4>
            <ul className="space-y-2 text-gray-400 text-xs">
              <li>
                <a href="#menu" className="hover:text-pizza-red transition-colors">🔥 Hot Value Combos (from ₹135)</a>
              </li>
              <li>
                <a href="#menu" className="hover:text-pizza-red transition-colors">🧀 Molten Cheese Burst Pizzas</a>
              </li>
              <li>
                <a href="#menu" className="hover:text-pizza-red transition-colors">🌶️ Smoky Tandoori Pizzas</a>
              </li>
              <li>
                <a href="#menu" className="hover:text-pizza-red transition-colors">🍔 Crispy Burgers & Quesadillas</a>
              </li>
              <li>
                <a href="#menu" className="hover:text-pizza-red transition-colors">🥖 Stuffed Garlic Breads & Dips</a>
              </li>
              <li>
                <a href="#menu" className="hover:text-pizza-red transition-colors">🍫 Warm Choco Lava Cake</a>
              </li>
            </ul>
          </div>

          {/* Contact & Store Info */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="font-display font-extrabold text-sm text-white uppercase tracking-wider">
              Visit or Call Us
            </h4>

            <div className="space-y-2.5 text-xs text-gray-300">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-pizza-red shrink-0 mt-0.5" />
                <span>{RESTAURANT_INFO.address}</span>
              </p>

              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-cheese-neon shrink-0" />
                <span className="font-mono">{RESTAURANT_INFO.phones.join(' / ')}</span>
              </p>

              <p className="text-[11px] text-gray-400 pl-6">
                Hours: {RESTAURANT_INFO.openingHours}
              </p>

              <div className="flex items-center gap-2 pt-2">
                <a
                  href={RESTAURANT_INFO.googleMapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold text-xs border border-white/10 flex items-center gap-1.5 transition-all"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Google Maps Link</span>
                </a>

                <button
                  onClick={onOpenApkModal}
                  className="px-3 py-1.5 rounded-xl bg-cheese-500/10 text-cheese-neon font-bold text-xs border border-cheese-500/20 hover:bg-cheese-500/20 flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Get APK</span>
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-gray-500 text-[11px]">
          <div className="text-center sm:text-left">
            <p>© {new Date().getFullYear()} PIZZA PIZZA (HOT & FRESH). All Rights Reserved. Pure Veg Pizzeria, Dehradun.</p>
            <p className="text-gray-400 mt-1 flex items-center justify-center sm:justify-start gap-1">
              <span>Site is built and managed by</span>
              <span className="text-cheese-neon font-bold tracking-wide">Stella Merkatus</span>
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <button
              onClick={scrollToTop}
              className="hover:text-white flex items-center gap-1 transition-colors"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3 h-3" />
            </button>
          </div>
        </div>

      </div>

      {/* Mobile Floating Sticky Action Bar */}
      <div className="fixed bottom-0 inset-x-0 z-30 md:hidden bg-[#0A0C10]/95 backdrop-blur-lg border-t border-white/10 p-2.5 flex items-center justify-around gap-2 shadow-2xl">
        <a
          href={`https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=${encodeURIComponent('Hi Pizza Pizza! I would like to order hot & fresh pizza.')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 py-2.5 px-3 rounded-xl bg-fresh-green text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-fresh-green/30"
        >
          <span className="text-base">💬</span>
          <span>WhatsApp</span>
        </a>

        <a
          href={`tel:${RESTAURANT_INFO.phones[0].replace(/\s+/g, '')}`}
          className="flex-1 py-2.5 px-3 rounded-xl bg-white/10 text-white font-bold text-xs flex items-center justify-center gap-1.5 border border-white/10"
        >
          <Phone className="w-3.5 h-3.5 text-cheese-neon" />
          <span>Call Store</span>
        </a>

        <button
          onClick={onOpenApkModal}
          className="py-2.5 px-3 rounded-xl bg-cheese-neon text-black font-extrabold text-xs flex items-center justify-center gap-1 shadow-md shadow-cheese-neon/20"
        >
          <Download className="w-3.5 h-3.5 stroke-[3]" />
          <span>APK</span>
        </button>
      </div>

    </footer>
  );
};
