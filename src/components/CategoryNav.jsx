import React from 'react';
import { Search, Sparkles, X } from 'lucide-react';
import { MENU_CATEGORIES } from '../data/menuData';

export const CategoryNav = ({ activeCategory, onSelectCategory, searchQuery, onSearchChange }) => {
  return (
    <div className="sticky top-[69px] z-30 glass-header border-b border-white/10 py-3 px-4 lg:px-8 shadow-xl">
      <div className="max-w-7xl mx-auto space-y-3">
        
        {/* Search Bar + Pure Veg Assurance */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search pizzas, combos, garlic bread, burgers..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full bg-[#161922] border border-white/10 focus:border-pizza-red/60 text-white placeholder-gray-400 rounded-xl pl-10 pr-9 py-2 text-sm focus:outline-none transition-all shadow-inner"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-3 text-xs">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-fresh-green/10 text-fresh-green border border-fresh-green/20 font-bold">
              <span className="w-2.5 h-2.5 rounded-full border border-green-500 flex items-center justify-center">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
              </span>
              <span>100% Pure Vegetarian Kitchen</span>
            </div>

            <span className="text-gray-400 hidden md:inline">
              ⚡ Free Delivery Above ₹500
            </span>
          </div>
        </div>

        {/* Category Pills (Horizontal Scrolling) */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          <button
            onClick={() => onSelectCategory('all')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeCategory === 'all'
                ? 'bg-gradient-to-r from-pizza-red to-pizza-600 text-white shadow-lg shadow-pizza-red/30'
                : 'bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/5'
            }`}
          >
            <span>✨</span>
            <span>All Items</span>
          </button>

          {MENU_CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-gradient-to-r from-pizza-red to-pizza-600 text-white shadow-lg shadow-pizza-red/30 scale-105'
                    : 'bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/5'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>

      </div>
    </div>
  );
};
