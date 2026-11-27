import React, { useState } from 'react';
import { Plus, SlidersHorizontal, Flame, Sparkles, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const MenuItemCard = ({ item }) => {
  const { addToCart, setSelectedCustomizeItem } = useCart();
  const [selectedSize, setSelectedSize] = useState('Regular');
  const [addedAnimation, setAddedAnimation] = useState(false);

  const isPizza = item.isPizza;
  const isCombo = item.isCombo;

  const currentPrice = isPizza
    ? (selectedSize === 'Large' ? item.largePrice : item.regularPrice)
    : item.price;

  const handleQuickAdd = () => {
    if (isPizza) {
      addToCart(item, { size: selectedSize, crust: 'Thin Crust' });
    } else {
      addToCart(item);
    }
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 900);
  };

  return (
    <div className="glass-card rounded-2xl overflow-hidden border border-white/5 hover:border-white/20 transition-all duration-300 flex flex-col justify-between group hover:shadow-2xl hover:shadow-black/50">
      
      {/* Top Media & Tags */}
      <div className="relative overflow-hidden bg-[#161922] aspect-[16/10]">
        {item.image ? (
          <img
            src={item.image}
            alt={item.name}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#1C212E] to-[#12151D]">
            <span className="text-5xl opacity-40">🍕</span>
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20"></div>

        {/* Veg Dot Indicator (Pure Veg) */}
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm p-1 rounded-md shadow-md flex items-center justify-center">
          <div className="w-3.5 h-3.5 border-2 border-green-600 rounded-sm flex items-center justify-center">
            <div className="w-1.5 h-1.5 bg-green-600 rounded-full"></div>
          </div>
        </div>

        {/* Badges & Tags */}
        <div className="absolute top-3 right-3 flex flex-col items-end gap-1">
          {item.tag && (
            <span className="bg-pizza-red text-white text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider shadow-md flex items-center gap-1">
              {item.tag.includes('🔥') && <Flame className="w-2.5 h-2.5" />}
              {item.tag}
            </span>
          )}
          {item.badge && (
            <span className="bg-cheese-neon text-black text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider shadow-md">
              {item.badge}
            </span>
          )}
        </div>

        {/* Combo notice pill */}
        {isCombo && (
          <div className="absolute bottom-2 left-3 right-3">
            <span className="text-[10px] bg-black/70 backdrop-blur-md text-cheese-neon px-2 py-0.5 rounded font-bold border border-cheese-500/30">
              Small Size Pizza Combo
            </span>
          </div>
        )}
      </div>

      {/* Content Area */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-display font-extrabold text-base text-white group-hover:text-cheese-neon transition-colors leading-snug">
              {item.name}
            </h3>
          </div>
          <p className="text-xs text-gray-400 mt-1 line-clamp-2 leading-relaxed">
            {item.description}
          </p>
        </div>

        {/* Pizza Size Selector (Regular vs Large) */}
        {isPizza && (
          <div className="bg-[#12151D] p-1 rounded-xl flex items-center gap-1 border border-white/5">
            <button
              type="button"
              onClick={() => setSelectedSize('Regular')}
              className={`flex-1 py-1 px-2 rounded-lg text-xs font-bold transition-all flex items-center justify-between ${
                selectedSize === 'Regular'
                  ? 'bg-pizza-red text-white shadow-sm'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <span>Regular</span>
              <span className="font-mono text-[11px]">₹{item.regularPrice}</span>
            </button>

            <button
              type="button"
              onClick={() => setSelectedSize('Large')}
              className={`flex-1 py-1 px-2 rounded-lg text-xs font-bold transition-all flex items-center justify-between ${
                selectedSize === 'Large'
                  ? 'bg-pizza-red text-white shadow-sm'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <span>Large</span>
              <span className="font-mono text-[11px]">₹{item.largePrice}</span>
            </button>
          </div>
        )}

        {/* Price & Action Row */}
        <div className="pt-2 border-t border-white/5 flex items-center justify-between gap-2">
          <div>
            <span className="text-[10px] text-gray-400 block font-medium">Price</span>
            <div className="flex items-baseline gap-1">
              <span className="font-mono font-extrabold text-lg text-white">
                ₹{currentPrice}
              </span>
              {item.cheesePrice && (
                <span className="text-[10px] text-gray-400">+₹20 w/ Cheese</span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {/* Customize Crust & Toppings (if Pizza) */}
            {isPizza && (
              <button
                type="button"
                onClick={() => setSelectedCustomizeItem({ ...item, defaultSize: selectedSize })}
                className="px-2.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white text-xs font-bold border border-white/10 transition-all flex items-center gap-1"
                title="Customize Crust & Toppings"
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-cheese-neon" />
                <span className="hidden sm:inline">Customize</span>
              </button>
            )}

            {/* Quick Add Button */}
            <button
              type="button"
              onClick={handleQuickAdd}
              className={`px-3.5 py-2 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all active:scale-95 ${
                addedAnimation
                  ? 'bg-fresh-green text-white shadow-lg shadow-fresh-green/30'
                  : 'bg-gradient-to-r from-pizza-red to-pizza-600 hover:from-pizza-600 hover:to-pizza-red text-white shadow-md shadow-pizza-red/30'
              }`}
            >
              {addedAnimation ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Added!</span>
                </>
              ) : (
                <>
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add</span>
                </>
              )}
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
