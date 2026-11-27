import React, { useState } from 'react';
import { X, Check, Plus, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { CRUST_OPTIONS, PIZZA_ADD_ONS } from '../data/menuData';

export const CustomizeModal = () => {
  const { selectedCustomizeItem, setSelectedCustomizeItem, addToCart } = useCart();
  
  if (!selectedCustomizeItem) return null;

  const item = selectedCustomizeItem;
  const [size, setSize] = useState(item.defaultSize || 'Regular');
  const [crust, setCrust] = useState(CRUST_OPTIONS[0]); // default Thin Crust
  const [selectedAddons, setSelectedAddons] = useState([]);

  const isLarge = size === 'Large';
  const basePrice = isLarge ? item.largePrice : item.regularPrice;
  const crustPrice = isLarge ? crust.largeExtra : crust.regularExtra;
  const addonsTotal = selectedAddons.reduce((sum, a) => sum + (isLarge ? a.largePrice : a.regularPrice), 0);
  const totalPrice = basePrice + crustPrice + addonsTotal;

  const toggleAddon = (addon) => {
    if (selectedAddons.some(a => a.id === addon.id)) {
      setSelectedAddons(selectedAddons.filter(a => a.id !== addon.id));
    } else {
      setSelectedAddons([...selectedAddons, addon]);
    }
  };

  const handleAdd = () => {
    addToCart(item, {
      size,
      crust: crust.name,
      crustExtra: crustPrice,
      addons: selectedAddons
    });
    setSelectedCustomizeItem(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div 
        className="glass-panel w-full max-w-lg rounded-3xl border border-white/10 shadow-2xl overflow-hidden flex flex-col max-h-[90vh] bg-[#12151E]"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🍕</span>
            <div>
              <h3 className="font-display font-black text-lg text-white">
                Customize {item.name}
              </h3>
              <p className="text-xs text-gray-400">Tailor crust & toppings to your craving</p>
            </div>
          </div>

          <button
            onClick={() => setSelectedCustomizeItem(null)}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Customization Content */}
        <div className="p-5 overflow-y-auto space-y-6 flex-1">
          
          {/* 1. Size Choice */}
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-xs font-extrabold uppercase tracking-wider text-gray-400">
                1. Select Size (Required)
              </span>
              <span className="text-xs text-cheese-neon font-bold">Choose 1</span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setSize('Regular')}
                className={`p-3 rounded-2xl border text-left transition-all flex items-center justify-between ${
                  size === 'Regular'
                    ? 'border-pizza-red bg-pizza-red/10 text-white shadow-md shadow-pizza-red/20'
                    : 'border-white/10 bg-white/5 text-gray-300 hover:border-white/20'
                }`}
              >
                <div>
                  <p className="font-bold text-sm">Regular</p>
                  <p className="text-[11px] text-gray-400">Serves 1–2</p>
                </div>
                <div className="text-right">
                  <span className="font-mono font-bold text-sm">₹{item.regularPrice}</span>
                  {size === 'Regular' && <Check className="w-4 h-4 text-pizza-red ml-auto mt-0.5" />}
                </div>
              </button>

              <button
                type="button"
                onClick={() => setSize('Large')}
                className={`p-3 rounded-2xl border text-left transition-all flex items-center justify-between ${
                  size === 'Large'
                    ? 'border-pizza-red bg-pizza-red/10 text-white shadow-md shadow-pizza-red/20'
                    : 'border-white/10 bg-white/5 text-gray-300 hover:border-white/20'
                }`}
              >
                <div>
                  <p className="font-bold text-sm">Large</p>
                  <p className="text-[11px] text-gray-400">Serves 2–3</p>
                </div>
                <div className="text-right">
                  <span className="font-mono font-bold text-sm">₹{item.largePrice}</span>
                  {size === 'Large' && <Check className="w-4 h-4 text-pizza-red ml-auto mt-0.5" />}
                </div>
              </button>
            </div>
          </div>

          {/* 2. Crust Choice */}
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-xs font-extrabold uppercase tracking-wider text-gray-400">
                2. Choose Crust (All Pizzas in Thin Crust by Default)
              </span>
              <span className="text-xs text-cheese-neon font-bold">Pick Your Crust</span>
            </div>

            <div className="space-y-2">
              {CRUST_OPTIONS.map((c) => {
                const isSelected = crust.id === c.id;
                const extra = isLarge ? c.largeExtra : c.regularExtra;
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setCrust(c)}
                    className={`w-full p-3 rounded-2xl border text-left transition-all flex items-center justify-between ${
                      isSelected
                        ? 'border-cheese-neon bg-cheese-500/10 text-white shadow-md'
                        : 'border-white/10 bg-white/5 text-gray-300 hover:border-white/20'
                    }`}
                  >
                    <div>
                      <p className="font-bold text-sm flex items-center gap-2">
                        <span>{c.name}</span>
                        {extra > 0 ? (
                          <span className="text-xs font-mono font-bold text-cheese-neon">
                            +₹{extra}
                          </span>
                        ) : (
                          <span className="text-[10px] text-fresh-green bg-fresh-green/10 px-1.5 py-0.2 rounded font-bold">
                            Included
                          </span>
                        )}
                      </p>
                      <p className="text-[11px] text-gray-400">{c.desc}</p>
                    </div>

                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${isSelected ? 'border-cheese-neon bg-cheese-neon text-black' : 'border-white/20'}`}>
                      {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Enrich Your Pizza (Add-ons) */}
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-xs font-extrabold uppercase tracking-wider text-gray-400">
                3. Enrich Your Pizza (Optional Add-ons)
              </span>
              <span className="text-xs text-gray-400">Multiple allowed</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {PIZZA_ADD_ONS.map((addon) => {
                const isSelected = selectedAddons.some(a => a.id === addon.id);
                const price = isLarge ? addon.largePrice : addon.regularPrice;
                return (
                  <button
                    key={addon.id}
                    type="button"
                    onClick={() => toggleAddon(addon)}
                    className={`p-3 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                      isSelected
                        ? 'border-fresh-green bg-fresh-green/10 text-white'
                        : 'border-white/10 bg-white/5 text-gray-300 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <p className="font-bold text-xs">{addon.name}</p>
                      <div className={`w-4 h-4 rounded-md border flex items-center justify-center ${isSelected ? 'border-fresh-green bg-fresh-green text-black' : 'border-white/20'}`}>
                        {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                    </div>
                    <p className="text-xs font-mono font-bold text-cheese-neon mt-2">
                      +₹{price}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* Footer with Price & Add to Cart */}
        <div className="p-4 border-t border-white/10 bg-[#0E1118] flex items-center justify-between gap-4">
          <div>
            <span className="text-[11px] text-gray-400 block font-medium">Calculated Price</span>
            <span className="font-mono font-black text-2xl text-white">₹{totalPrice}</span>
          </div>

          <button
            type="button"
            onClick={handleAdd}
            className="flex-1 py-3 px-6 rounded-2xl bg-gradient-to-r from-pizza-red to-pizza-600 hover:from-pizza-600 hover:to-pizza-red text-white font-display font-extrabold text-sm shadow-xl shadow-pizza-red/30 hover:shadow-pizza-red/50 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-cheese-neon" />
            <span>Add Customized Pizza to Cart</span>
          </button>
        </div>

      </div>
    </div>
  );
};
