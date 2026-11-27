import React from 'react';

const STORIES = [
  {
    id: 'combos',
    title: 'Hot Combos',
    badge: '₹135+',
    emoji: '🔥',
    category: 'combos',
    gradient: 'from-orange-500 via-pizza-red to-pink-500'
  },
  {
    id: 'cheese-burst',
    title: 'Cheese Burst',
    badge: 'Molten',
    emoji: '🧀',
    category: 'cheese-burst',
    gradient: 'from-yellow-400 via-amber-500 to-orange-500'
  },
  {
    id: 'tandoori',
    title: 'Tandoori Slices',
    badge: 'Smoky',
    emoji: '🌶️',
    category: 'tandoori',
    gradient: 'from-red-600 via-orange-600 to-amber-600'
  },
  {
    id: 'burgers-wraps',
    title: 'Burgers & Wraps',
    badge: 'From ₹60',
    emoji: '🍔',
    category: 'burgers-wraps',
    gradient: 'from-emerald-400 via-teal-500 to-green-600'
  },
  {
    id: 'store',
    title: 'Dehradun Store',
    badge: '4.9 ★',
    emoji: '📍',
    action: 'store',
    gradient: 'from-blue-500 via-indigo-500 to-purple-600'
  },
  {
    id: 'offers',
    title: 'Coupons',
    badge: '₹50 OFF',
    emoji: '🎁',
    action: 'offers',
    gradient: 'from-fuchsia-500 via-rose-500 to-pizza-red'
  }
];

export const StoryHighlights = ({ activeCategory, onSelectCategory, onOpenStoreSection, onApplyCoupon }) => {
  return (
    <section className="py-4 border-y border-white/5 bg-[#0e1118]/60 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex items-center gap-4 sm:gap-6 overflow-x-auto no-scrollbar py-2">
          {STORIES.map(story => {
            const isActive = story.category && activeCategory === story.category;
            return (
              <button
                key={story.id}
                onClick={() => {
                  if (story.category) {
                    onSelectCategory(story.category);
                    const el = document.getElementById('menu');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  } else if (story.action === 'store') {
                    onOpenStoreSection();
                  } else if (story.action === 'offers') {
                    onApplyCoupon('HOTFRESH50');
                  }
                }}
                className="flex flex-col items-center gap-1.5 shrink-0 group focus:outline-none"
              >
                {/* Gradient ring */}
                <div className={`p-0.5 rounded-full bg-gradient-to-tr ${story.gradient} ${isActive ? 'scale-110 shadow-lg shadow-pizza-red/40' : 'opacity-90 group-hover:scale-105'} transition-all duration-200`}>
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#11141C] p-0.5 flex items-center justify-center relative overflow-hidden">
                    <span className="text-2xl sm:text-3xl transform group-hover:scale-110 transition-transform">
                      {story.emoji}
                    </span>
                    {/* Badge pill */}
                    <span className="absolute -bottom-0.5 inset-x-0 mx-auto w-fit text-[9px] font-black uppercase tracking-wider px-1.5 py-0.2 rounded-full bg-pizza-red text-white">
                      {story.badge}
                    </span>
                  </div>
                </div>

                <span className={`text-xs font-semibold tracking-tight transition-colors ${isActive ? 'text-cheese-neon font-bold' : 'text-gray-300 group-hover:text-white'}`}>
                  {story.title}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
