import React, { useState, useMemo } from 'react';
import { CartProvider, useCart } from './context/CartContext';
import { StoreProvider, useStore } from './context/StoreContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { StoryHighlights } from './components/StoryHighlights';
import { CategoryNav } from './components/CategoryNav';
import { MenuItemCard } from './components/MenuItemCard';
import { CustomizeModal } from './components/CustomizeModal';
import { CartDrawer } from './components/CartDrawer';
import { OrderSuccessModal } from './components/OrderSuccessModal';
import { StoreSection } from './components/StoreSection';
import { ApkModal } from './components/ApkModal';
import { PhotoModal } from './components/PhotoModal';
import { Footer } from './components/Footer';
import { CustomerAuthModal } from './components/CustomerAuthModal';
import { AdminLoginModal } from './components/admin/AdminLoginModal';
import { AdminPortal } from './components/admin/AdminPortal';
import { MENU_CATEGORIES } from './data/menuData';
import { Sparkles, Flame, Check, ArrowRight } from 'lucide-react';

const MainContent = () => {
  const [activeCategory, setActiveCategory] = useState('combos');
  const [searchQuery, setSearchQuery] = useState('');
  const [activePhoto, setActivePhoto] = useState(null);
  const [isApkModalOpen, setIsApkModalOpen] = useState(false);
  const [placedOrder, setPlacedOrder] = useState(null);
  
  const { applyCoupon, setIsCartOpen } = useCart();
  const { menuItems, isAdminLoggedIn, setIsAdminLoggedIn, isAdminModalOpen, setIsAdminModalOpen } = useStore();

  // Auto-detect Admin / KDS App Mode
  useEffect(() => {
    const checkAdminMode = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const isCookieAdmin = typeof document !== 'undefined' && document.cookie.includes('pizza_app_mode=admin');
      const isParamAdmin = urlParams.get('mode') === 'admin' || urlParams.get('app') === 'admin';
      const isGlobalAdmin = typeof window !== 'undefined' && window.__PIZZA_APP_MODE__ === 'admin';

      if (isCookieAdmin || isParamAdmin || isGlobalAdmin) {
        setIsAdminLoggedIn(true);
        setIsAdminModalOpen(true);
      }
    };

    checkAdminMode();
    window.addEventListener('pizza-mode-change', checkAdminMode);
    return () => window.removeEventListener('pizza-mode-change', checkAdminMode);
  }, [setIsAdminLoggedIn, setIsAdminModalOpen]);

  // Filtered menu items based on category and search query
  const filteredItems = useMemo(() => {
    let items = menuItems;

    if (activeCategory !== 'all') {
      items = items.filter(item => item.category === activeCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      items = items.filter(item => 
        item.name.toLowerCase().includes(q) ||
        (item.description && item.description.toLowerCase().includes(q)) ||
        (item.tag && item.tag.toLowerCase().includes(q))
      );
    }

    return items;
  }, [menuItems, activeCategory, searchQuery]);

  // Featured combos from menu items
  const hotCombos = useMemo(() => {
    return menuItems.filter(i => i.isCombo);
  }, [menuItems]);

  const openStoreSection = () => {
    const el = document.getElementById('store-info');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const openPhotoModal = (url, title) => {
    setActivePhoto({ url, title });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0B0D13]">
      {/* Header */}
      <Header
        onOpenApkModal={() => setIsApkModalOpen(true)}
        onOpenPhotoModal={openPhotoModal}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onOpenPhotoModal={openPhotoModal}
          onOpenApkModal={() => setIsApkModalOpen(true)}
        />

        {/* Story Highlights (Instagram / Gen-Z bubbles) */}
        <StoryHighlights
          activeCategory={activeCategory}
          onSelectCategory={(catId) => setActiveCategory(catId)}
          onOpenStoreSection={openStoreSection}
          onApplyCoupon={(code) => {
            applyCoupon(code);
            setIsCartOpen(true);
          }}
        />

        {/* Featured Combos Showcase Section (#specials) */}
        <section id="specials" className="py-10 bg-gradient-to-b from-[#10131B] to-[#0B0D13] border-b border-white/5">
          <div className="max-w-7xl mx-auto px-4 lg:px-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-pizza-red bg-pizza-red/10 border border-pizza-red/20 px-3 py-1 rounded-full inline-flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-pizza-red" />
                  <span>OFFICIAL VALUE COMBOS</span>
                </span>
                <h2 className="font-display font-black text-2xl sm:text-3xl text-white mt-2">
                  Hot Combos Starting @ ₹135
                </h2>
                <p className="text-xs sm:text-sm text-gray-400">
                  Straight from the front banner! Small size pizzas with crispy fries, burgers & soft drinks.
                </p>
              </div>

              <button
                onClick={() => {
                  setActiveCategory('combos');
                  const el = document.getElementById('menu');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-xs text-cheese-neon hover:underline font-bold flex items-center gap-1 shrink-0"
              >
                <span>View all combos ({hotCombos.length})</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Combos Grid Preview */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {hotCombos.slice(0, 3).map(combo => (
                <MenuItemCard key={combo.id} item={combo} />
              ))}
            </div>

            {/* Banner Notice */}
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <span className="text-gray-300">
                ✨ <strong className="text-white">Customize any combo:</strong> Add any Veg Toppings @ <strong className="text-cheese-neon">₹15</strong> & Extra Cheese @ <strong className="text-cheese-neon">₹20</strong>!
              </span>
              <span className="text-fresh-green font-bold shrink-0">
                ⚡ Free Home Delivery on ₹500+
              </span>
            </div>
          </div>
        </section>

        {/* Category Navigation Bar */}
        <div id="menu">
          <CategoryNav
            activeCategory={activeCategory}
            onSelectCategory={(id) => setActiveCategory(id)}
            searchQuery={searchQuery}
            onSearchChange={(q) => setSearchQuery(q)}
          />
        </div>

        {/* Menu Items Grid */}
        <section className="py-10 px-4 lg:px-8 max-w-7xl mx-auto">
          
          {/* Category Header Label */}
          <div className="flex items-center justify-between pb-6">
            <div>
              <h2 className="font-display font-black text-2xl sm:text-3xl text-white flex items-center gap-2">
                <span>
                  {activeCategory === 'all'
                    ? 'All Menu Items'
                    : MENU_CATEGORIES.find(c => c.id === activeCategory)?.name || 'Menu'}
                </span>
                <span className="text-xs font-mono font-bold text-gray-400 bg-white/5 px-2 py-0.5 rounded-full border border-white/10">
                  {filteredItems.length}
                </span>
              </h2>
              <p className="text-xs text-gray-400 mt-1">
                {activeCategory === 'all'
                  ? 'Showing our complete pure veg collection'
                  : MENU_CATEGORIES.find(c => c.id === activeCategory)?.description}
              </p>
            </div>

            {searchQuery && (
              <span className="text-xs text-cheese-neon font-medium">
                Results for "{searchQuery}"
              </span>
            )}
          </div>

          {/* Grid or Empty Search State */}
          {filteredItems.length === 0 ? (
            <div className="py-16 text-center space-y-3 glass-card rounded-3xl p-8 border border-white/5">
              <span className="text-5xl block">🔍</span>
              <h3 className="font-display font-extrabold text-lg text-white">No items found</h3>
              <p className="text-xs text-gray-400 max-w-xs mx-auto">
                We couldn't find any dish matching "{searchQuery}". Try searching for Margherita, Burger, Garlic Bread or Cheese Burst.
              </p>
              <button
                onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}
                className="mt-2 px-5 py-2 rounded-xl bg-pizza-red text-white text-xs font-bold"
              >
                Reset Search
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filteredItems.map(item => (
                <MenuItemCard key={item.id} item={item} />
              ))}
            </div>
          )}

        </section>

        {/* Store Info, Location, Real Photos & Reviews */}
        <StoreSection onOpenPhotoModal={openPhotoModal} />
      </main>

      {/* Footer */}
      <Footer
        onOpenApkModal={() => setIsApkModalOpen(true)}
        onOpenPhotoModal={openPhotoModal}
      />

      {/* Slide-out Cart Drawer */}
      <CartDrawer onOrderPlaced={(order) => setPlacedOrder(order)} />

      {/* Pizza Customization Modal */}
      <CustomizeModal />

      {/* Order Success / Live Tracker Modal */}
      <OrderSuccessModal
        order={placedOrder}
        onClose={() => setPlacedOrder(null)}
      />

      {/* APK & App Installation Modal */}
      <ApkModal
        isOpen={isApkModalOpen}
        onClose={() => setIsApkModalOpen(false)}
      />

      {/* Full Screen Photo Zoom Modal */}
      <PhotoModal
        photo={activePhoto}
        onClose={() => setActivePhoto(null)}
      />

      {/* Customer Registration & Profile Modal */}
      <CustomerAuthModal />

      {/* Admin Login Modal */}
      <AdminLoginModal
        isOpen={isAdminModalOpen && !isAdminLoggedIn}
        onClose={() => setIsAdminModalOpen(false)}
      />

      {/* Fullscreen Admin Dashboard & KDS */}
      <AdminPortal
        isOpen={isAdminModalOpen && isAdminLoggedIn}
        onClose={() => setIsAdminModalOpen(false)}
      />
    </div>
  );
};

export const App = () => {
  return (
    <StoreProvider>
      <CartProvider>
        <MainContent />
      </CartProvider>
    </StoreProvider>
  );
};

export default App;
