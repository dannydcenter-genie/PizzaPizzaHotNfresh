import React, { useState, useEffect, useMemo } from 'react';
import {
  X, LogOut, ChefHat, UtensilsCrossed, Users, History,
  ToggleLeft, ToggleRight, Edit3, Trash2, Plus, Search,
  Volume2, VolumeX, CheckCircle2, Clock, AlertCircle,
  Phone, MapPin, Download, RefreshCw, Sparkles, Filter,
  MessageCircle, Printer, ArrowRight, ShieldCheck, Flame, ExternalLink,
  Smartphone, Copy, Check, HelpCircle
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { MENU_CATEGORIES } from '../../data/menuData';
import { RESTAURANT_INFO } from '../../data/restaurantInfo';

export const AdminPortal = ({ isOpen, onClose }) => {
  const {
    adminLogout,
    menuItems,
    toggleItemAvailability,
    updateMenuItem,
    addMenuItem,
    deleteMenuItem,
    resetMenuToDefault,
    orders,
    updateOrderStatus,
    kdsSoundEnabled,
    setKdsSoundEnabled,
    playChime,
    customers
  } = useStore();

  const [activeTab, setActiveTab] = useState('kds'); // 'kds', 'menu', 'customers', 'history'
  
  // Menu Editing / Adding State
  const [editingItem, setEditingItem] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [menuSearch, setMenuSearch] = useState('');
  const [menuFilterCategory, setMenuFilterCategory] = useState('all');

  // Customer Search State
  const [customerSearch, setCustomerSearch] = useState('');

  // Orders Filter State
  const [orderStatusFilter, setOrderStatusFilter] = useState('all');

  // APK Copied link state
  const [copiedApk, setCopiedApk] = useState('');
  const copyApkLink = (url, name) => {
    const fullUrl = `${window.location.origin}${url}`;
    navigator.clipboard.writeText(fullUrl);
    setCopiedApk(name);
    setTimeout(() => setCopiedApk(''), 2500);
  };

  // New Item Form State
  const [newItemData, setNewItemData] = useState({
    name: '',
    category: 'combos',
    description: '',
    price: 150,
    regularPrice: 150,
    largePrice: 220,
    tag: '',
    isPizza: false,
    isCombo: true,
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80'
  });

  // Current time ticker for KDS elapsed timers
  const [, setTick] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setTick(t => t + 1), 10000); // tick every 10s
    return () => clearInterval(timer);
  }, []);

  if (!isOpen) return null;

  // Filtered Menu Items
  const filteredMenuItems = menuItems.filter(item => {
    const matchesCat = menuFilterCategory === 'all' || item.category === menuFilterCategory;
    const matchesSearch = !menuSearch.trim() ||
      item.name.toLowerCase().includes(menuSearch.toLowerCase()) ||
      (item.description && item.description.toLowerCase().includes(menuSearch.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  // Filtered Customers
  const filteredCustomers = customers.filter(c => {
    const q = customerSearch.toLowerCase().trim();
    return !q ||
      c.name.toLowerCase().includes(q) ||
      c.phone.includes(q) ||
      (c.email && c.email.toLowerCase().includes(q)) ||
      (c.address && c.address.toLowerCase().includes(q));
  });

  // Summary Metrics
  const totalRevenue = orders.reduce((sum, o) => sum + (o.status !== 'cancelled' ? Number(o.finalTotal || 0) : 0), 0);
  const activeOrdersCount = orders.filter(o => o.status === 'new' || o.status === 'baking').length;
  const readyOrdersCount = orders.filter(o => o.status === 'ready').length;

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (!editingItem) return;
    updateMenuItem(editingItem.id, editingItem);
    setEditingItem(null);
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!newItemData.name.trim()) return;
    addMenuItem(newItemData);
    setIsAddModalOpen(false);
    setNewItemData({
      name: '',
      category: 'combos',
      description: '',
      price: 150,
      regularPrice: 150,
      largePrice: 220,
      tag: '',
      isPizza: false,
      isCombo: true,
      image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80'
    });
  };

  const exportCustomersCSV = () => {
    const headers = 'ID,Name,Phone,Email,Address,TotalOrders,TotalSpent,MarketingOptIn,RegisteredDate\n';
    const rows = customers.map(c => 
      `"${c.id}","${c.name}","${c.phone}","${c.email || ''}","${(c.address || '').replace(/"/g, '""')}","${c.totalOrders}","${c.totalSpent}","${c.marketingOptIn ? 'Yes' : 'No'}","${c.registeredAt}"`
    ).join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `pizzapizza_guest_database_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const getElapsedTime = (createdAt) => {
    if (!createdAt) return 'Just now';
    const mins = Math.floor((Date.now() - createdAt) / 60000);
    if (mins < 1) return 'Just now';
    if (mins === 1) return '1 min ago';
    if (mins < 60) return `${mins} mins ago`;
    return `${Math.floor(mins / 60)}h ${mins % 60}m ago`;
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#0A0C11] text-white flex flex-col overflow-hidden animate-fade-in font-sans">
      
      {/* Top Admin Navbar */}
      <header className="glass-header px-4 lg:px-8 py-3 border-b border-white/10 flex items-center justify-between shrink-0 bg-[#0E121B]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pizza-red to-cheese-500 p-0.5 flex items-center justify-center">
            <div className="w-full h-full bg-[#11141C] rounded-[10px] flex items-center justify-center text-xl">
              ⚙️
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-display font-black text-base sm:text-lg text-white">
                PIZZA PIZZA MANAGEMENT
              </h2>
              <span className="text-[10px] bg-cheese-neon/20 text-cheese-neon font-black px-2 py-0.5 rounded-full border border-cheese-500/30">
                ADMIN PORTAL
              </span>
            </div>
            <p className="text-[11px] text-gray-400">
              Canal Rd, Chironwali, Dehradun • 4.9 ★ Kitchen
            </p>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="hidden md:flex items-center gap-1 bg-[#141824] p-1 rounded-2xl border border-white/10">
          <button
            onClick={() => setActiveTab('kds')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'kds'
                ? 'bg-pizza-red text-white shadow-md shadow-pizza-red/30'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <ChefHat className="w-4 h-4" />
            <span>Kitchen Display (KDS)</span>
            {activeOrdersCount > 0 && (
              <span className="bg-cheese-neon text-black font-mono font-extrabold px-1.5 py-0.2 rounded-full text-[10px] animate-pulse">
                {activeOrdersCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('menu')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'menu'
                ? 'bg-pizza-red text-white shadow-md shadow-pizza-red/30'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <UtensilsCrossed className="w-4 h-4" />
            <span>Menu & Pricing</span>
          </button>

          <button
            onClick={() => setActiveTab('customers')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'customers'
                ? 'bg-pizza-red text-white shadow-md shadow-pizza-red/30'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Guest Database</span>
            <span className="bg-white/10 text-gray-300 font-mono px-1.5 py-0.2 rounded-full text-[10px]">
              {customers.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('history')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'history'
                ? 'bg-pizza-red text-white shadow-md shadow-pizza-red/30'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <History className="w-4 h-4" />
            <span>Orders History</span>
          </button>

          <button
            onClick={() => setActiveTab('apks')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'apks'
                ? 'bg-pizza-red text-white shadow-md shadow-pizza-red/30'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Smartphone className="w-4 h-4 text-cheese-neon" />
            <span>Download APKs</span>
            <span className="bg-cheese-500/20 text-cheese-neon border border-cheese-500/30 text-[10px] font-black px-1.5 py-0.2 rounded-md">
              Ready
            </span>
          </button>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          {/* Sound Toggle */}
          <button
            onClick={() => {
              setKdsSoundEnabled(!kdsSoundEnabled);
              if (!kdsSoundEnabled) playChime();
            }}
            className={`p-2.5 rounded-xl border transition-colors ${
              kdsSoundEnabled
                ? 'bg-fresh-green/10 text-fresh-green border-fresh-green/30'
                : 'bg-white/5 text-gray-500 border-white/10'
            }`}
            title={kdsSoundEnabled ? 'New Order Sound Alerts ON' : 'New Order Sound Alerts OFF'}
          >
            {kdsSoundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Logout */}
          <button
            onClick={() => {
              adminLogout();
              onClose();
            }}
            className="px-3 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-bold border border-red-500/20 flex items-center gap-1.5 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Logout</span>
          </button>

          {/* Close Portal View */}
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/10"
            title="Return to store front"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Mobile Tab Pills Bar */}
      <div className="md:hidden flex items-center justify-between p-2 bg-[#121622] border-b border-white/10 overflow-x-auto no-scrollbar gap-1 text-xs">
        <button
          onClick={() => setActiveTab('kds')}
          className={`px-3 py-2 rounded-xl font-bold whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'kds' ? 'bg-pizza-red text-white' : 'text-gray-400'
          }`}
        >
          <ChefHat className="w-3.5 h-3.5" />
          <span>KDS ({activeOrdersCount})</span>
        </button>

        <button
          onClick={() => setActiveTab('menu')}
          className={`px-3 py-2 rounded-xl font-bold whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'menu' ? 'bg-pizza-red text-white' : 'text-gray-400'
          }`}
        >
          <UtensilsCrossed className="w-3.5 h-3.5" />
          <span>Menu</span>
        </button>

        <button
          onClick={() => setActiveTab('customers')}
          className={`px-3 py-2 rounded-xl font-bold whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'customers' ? 'bg-pizza-red text-white' : 'text-gray-400'
          }`}
        >
          <Users className="w-3.5 h-3.5" />
          <span>Guests ({customers.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('history')}
          className={`px-3 py-2 rounded-xl font-bold whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'history' ? 'bg-pizza-red text-white' : 'text-gray-400'
          }`}
        >
          <History className="w-3.5 h-3.5" />
          <span>History</span>
        </button>

        <button
          onClick={() => setActiveTab('apks')}
          className={`px-3 py-2 rounded-xl font-bold whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'apks' ? 'bg-pizza-red text-white' : 'text-gray-400'
          }`}
        >
          <Smartphone className="w-3.5 h-3.5 text-cheese-neon" />
          <span>APKs</span>
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto p-4 lg:p-6">
        
        {/* ============================================================== */}
        {/* TAB 1: KITCHEN DISPLAY SYSTEM (KDS)                           */}
        {/* ============================================================== */}
        {activeTab === 'kds' && (
          <div className="space-y-6 max-w-7xl mx-auto">
            
            {/* Top Bar with Metrics & Chime button */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-display font-black text-xl sm:text-2xl text-white flex items-center gap-2">
                  <span>Live Kitchen Display System (KDS)</span>
                  <span className="w-2.5 h-2.5 rounded-full bg-fresh-green animate-ping"></span>
                </h3>
                <p className="text-xs text-gray-400">
                  Real-time ticket display for chefs & delivery coordinators
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={playChime}
                  className="px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 text-xs font-bold border border-white/10 flex items-center gap-1.5"
                >
                  <Volume2 className="w-3.5 h-3.5 text-cheese-neon" />
                  <span>Test Kitchen Alert Chime</span>
                </button>

                <div className="px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-mono">
                  <span>Active Tickets: </span>
                  <strong className="text-cheese-neon font-black text-sm">{activeOrdersCount}</strong>
                </div>
              </div>
            </div>

            {/* Kanban Columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-start">
              
              {/* Column 1: NEW / PENDING */}
              <div className="bg-[#12151F] rounded-2xl border border-yellow-500/30 p-3.5 space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-400"></span>
                    <h4 className="font-display font-bold text-sm text-yellow-300 uppercase tracking-wide">
                      1. New / Pending
                    </h4>
                  </div>
                  <span className="bg-yellow-400/20 text-yellow-300 font-mono font-bold text-xs px-2 py-0.5 rounded-full">
                    {orders.filter(o => o.status === 'new').length}
                  </span>
                </div>

                <div className="space-y-3">
                  {orders.filter(o => o.status === 'new').length === 0 ? (
                    <p className="text-xs text-gray-500 text-center py-8 italic">No pending orders</p>
                  ) : (
                    orders.filter(o => o.status === 'new').map(order => (
                      <KdsOrderCard
                        key={order.orderId}
                        order={order}
                        elapsed={getElapsedTime(order.createdAt)}
                        onAdvance={() => updateOrderStatus(order.orderId, 'baking')}
                        advanceLabel="🔥 Start Baking"
                        advanceColor="bg-orange-500 hover:bg-orange-600 text-black"
                        onCancel={() => updateOrderStatus(order.orderId, 'cancelled')}
                      />
                    ))
                  )}
                </div>
              </div>

              {/* Column 2: IN OVEN / BAKING */}
              <div className="bg-[#12151F] rounded-2xl border border-orange-500/30 p-3.5 space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-pulse"></span>
                    <h4 className="font-display font-bold text-sm text-orange-400 uppercase tracking-wide">
                      2. In Oven (Baking)
                    </h4>
                  </div>
                  <span className="bg-orange-500/20 text-orange-400 font-mono font-bold text-xs px-2 py-0.5 rounded-full">
                    {orders.filter(o => o.status === 'baking').length}
                  </span>
                </div>

                <div className="space-y-3">
                  {orders.filter(o => o.status === 'baking').length === 0 ? (
                    <p className="text-xs text-gray-500 text-center py-8 italic">No pizzas baking</p>
                  ) : (
                    orders.filter(o => o.status === 'baking').map(order => (
                      <KdsOrderCard
                        key={order.orderId}
                        order={order}
                        elapsed={getElapsedTime(order.createdAt)}
                        onAdvance={() => updateOrderStatus(order.orderId, 'ready')}
                        advanceLabel="📦 Mark Ready & Boxed"
                        advanceColor="bg-cheese-neon hover:bg-yellow-400 text-black"
                        onCancel={() => updateOrderStatus(order.orderId, 'cancelled')}
                      />
                    ))
                  )}
                </div>
              </div>

              {/* Column 3: READY / PACKED */}
              <div className="bg-[#12151F] rounded-2xl border border-fresh-green/30 p-3.5 space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-fresh-green"></span>
                    <h4 className="font-display font-bold text-sm text-green-400 uppercase tracking-wide">
                      3. Ready & Packed
                    </h4>
                  </div>
                  <span className="bg-fresh-green/20 text-green-400 font-mono font-bold text-xs px-2 py-0.5 rounded-full">
                    {orders.filter(o => o.status === 'ready').length}
                  </span>
                </div>

                <div className="space-y-3">
                  {orders.filter(o => o.status === 'ready').length === 0 ? (
                    <p className="text-xs text-gray-500 text-center py-8 italic">No ready orders</p>
                  ) : (
                    orders.filter(o => o.status === 'ready').map(order => (
                      <KdsOrderCard
                        key={order.orderId}
                        order={order}
                        elapsed={getElapsedTime(order.createdAt)}
                        onAdvance={() => updateOrderStatus(order.orderId, 'delivered')}
                        advanceLabel={order.orderType === 'delivery' ? '🛵 Dispatch / Delivered' : '🎉 Handed Over'}
                        advanceColor="bg-fresh-green hover:bg-emerald-600 text-black"
                        onCancel={() => updateOrderStatus(order.orderId, 'cancelled')}
                      />
                    ))
                  )}
                </div>
              </div>

              {/* Column 4: COMPLETED / RECENT DELIVERIES */}
              <div className="bg-[#12151F] rounded-2xl border border-white/10 p-3.5 space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-400" />
                    <h4 className="font-display font-bold text-sm text-gray-300 uppercase tracking-wide">
                      Completed Today
                    </h4>
                  </div>
                  <span className="bg-white/10 text-gray-400 font-mono font-bold text-xs px-2 py-0.5 rounded-full">
                    {orders.filter(o => o.status === 'delivered').length}
                  </span>
                </div>

                <div className="space-y-3 max-h-[500px] overflow-y-auto">
                  {orders.filter(o => o.status === 'delivered').length === 0 ? (
                    <p className="text-xs text-gray-500 text-center py-8 italic">No completed orders yet</p>
                  ) : (
                    orders.filter(o => o.status === 'delivered').slice(0, 5).map(order => (
                      <div key={order.orderId} className="p-3 rounded-xl bg-white/5 border border-white/5 text-xs space-y-1 opacity-75">
                        <div className="flex justify-between items-center font-bold">
                          <span className="font-mono text-cheese-neon">{order.orderId}</span>
                          <span className="text-green-400">Delivered ✅</span>
                        </div>
                        <p className="text-gray-300 truncate">{order.customerInfo.name}</p>
                        <p className="text-[11px] text-gray-400">
                          {order.cart.map(c => `${c.quantity}x ${c.name}`).join(', ')}
                        </p>
                        <p className="font-mono font-bold text-white pt-1">₹{order.finalTotal}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 2: MENU MANAGEMENT & AVAILABILITY (ON / OFF)              */}
        {/* ============================================================== */}
        {activeTab === 'menu' && (
          <div className="space-y-6 max-w-7xl mx-auto">
            
            {/* Header + Add Item Button */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-display font-black text-xl sm:text-2xl text-white">
                  Menu Items & Rates Management
                </h3>
                <p className="text-xs text-gray-400">
                  Turn items ON/OFF based on kitchen stock, modify rates, and add new combos.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={resetMenuToDefault}
                  className="px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white text-xs font-bold border border-white/10 flex items-center gap-1.5 transition-colors"
                  title="Reset all prices and items to original factory menu"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Reset Menu</span>
                </button>

                <button
                  onClick={() => setIsAddModalOpen(true)}
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-pizza-red to-cheese-500 hover:from-cheese-500 hover:to-pizza-red text-black font-display font-black text-xs shadow-lg shadow-pizza-red/20 flex items-center gap-2 transition-all"
                >
                  <Plus className="w-4 h-4 stroke-[3]" />
                  <span>Add New Dish / Combo</span>
                </button>
              </div>
            </div>

            {/* Filter Bar & Category Tabs */}
            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search menu item to edit or toggle..."
                    value={menuSearch}
                    onChange={(e) => setMenuSearch(e.target.value)}
                    className="w-full bg-[#141824] border border-white/10 rounded-xl pl-10 pr-3 py-2 text-xs text-white focus:outline-none focus:border-pizza-red"
                  />
                </div>

                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <span>Total Dishes: <strong className="text-white">{menuItems.length}</strong></span>
                  <span>•</span>
                  <span>In Stock: <strong className="text-fresh-green">{menuItems.filter(i => i.isAvailable !== false).length}</strong></span>
                  <span>•</span>
                  <span>Sold Out: <strong className="text-red-400">{menuItems.filter(i => i.isAvailable === false).length}</strong></span>
                </div>
              </div>

              {/* Category Filter Pills */}
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
                <button
                  onClick={() => setMenuFilterCategory('all')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap ${
                    menuFilterCategory === 'all'
                      ? 'bg-pizza-red text-white'
                      : 'bg-white/5 text-gray-400 hover:text-white'
                  }`}
                >
                  All Categories
                </button>
                {MENU_CATEGORIES.map(c => (
                  <button
                    key={c.id}
                    onClick={() => setMenuFilterCategory(c.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap flex items-center gap-1 ${
                      menuFilterCategory === c.id
                        ? 'bg-pizza-red text-white'
                        : 'bg-white/5 text-gray-400 hover:text-white'
                    }`}
                  >
                    <span>{c.icon}</span>
                    <span>{c.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Menu Items Table / Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredMenuItems.map(item => {
                const isAvailable = item.isAvailable !== false;
                return (
                  <div
                    key={item.id}
                    className={`glass-card p-4 rounded-2xl border transition-all flex flex-col justify-between gap-3 ${
                      isAvailable ? 'border-white/10' : 'border-red-500/30 bg-red-950/10 opacity-80'
                    }`}
                  >
                    <div>
                      {/* Top status bar */}
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 border border-green-500 rounded-sm flex items-center justify-center shrink-0">
                            <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                          </span>
                          <h4 className="font-display font-extrabold text-sm text-white">
                            {item.name}
                          </h4>
                        </div>

                        {/* Live Availability Toggle Switch (ON / OFF) */}
                        <button
                          type="button"
                          onClick={() => toggleItemAvailability(item.id)}
                          className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider transition-all ${
                            isAvailable
                              ? 'bg-fresh-green/20 text-fresh-green border border-fresh-green/40 hover:bg-fresh-green/30'
                              : 'bg-red-500/20 text-red-400 border border-red-500/40 hover:bg-red-500/30'
                          }`}
                          title="Click to toggle availability on the customer web app"
                        >
                          {isAvailable ? (
                            <>
                              <span className="w-1.5 h-1.5 rounded-full bg-fresh-green animate-pulse"></span>
                              <span>IN STOCK</span>
                            </>
                          ) : (
                            <>
                              <span className="w-1.5 h-1.5 rounded-full bg-red-400"></span>
                              <span>SOLD OUT</span>
                            </>
                          )}
                        </button>
                      </div>

                      <p className="text-xs text-gray-400 mt-1 line-clamp-2">
                        {item.description}
                      </p>

                      {item.tag && (
                        <span className="inline-block mt-2 text-[10px] bg-white/5 border border-white/10 text-cheese-neon px-2 py-0.5 rounded-md font-bold">
                          {item.tag}
                        </span>
                      )}
                    </div>

                    {/* Rates & Actions */}
                    <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-gray-400 block font-medium">Pricing</span>
                        {item.isPizza ? (
                          <div className="font-mono text-xs font-bold text-white space-x-2">
                            <span>Reg: <strong className="text-cheese-neon">₹{item.regularPrice}</strong></span>
                            <span>•</span>
                            <span>Lrg: <strong className="text-cheese-neon">₹{item.largePrice}</strong></span>
                          </div>
                        ) : (
                          <div className="font-mono text-sm font-black text-cheese-neon">
                            ₹{item.price}
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => setEditingItem({ ...item })}
                          className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/10 text-xs font-bold flex items-center gap-1"
                          title="Edit details & rates"
                        >
                          <Edit3 className="w-3.5 h-3.5 text-cheese-neon" />
                          <span>Edit</span>
                        </button>

                        <button
                          onClick={() => {
                            if (window.confirm(`Delete ${item.name} from menu?`)) {
                              deleteMenuItem(item.id);
                            }
                          }}
                          className="p-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20"
                          title="Delete item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 3: GUEST & CUSTOMER DATABASE                              */}
        {/* ============================================================== */}
        {activeTab === 'customers' && (
          <div className="space-y-6 max-w-7xl mx-auto">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-display font-black text-xl sm:text-2xl text-white">
                  Guest & Customer Database
                </h3>
                <p className="text-xs text-gray-400">
                  Guest profiles, order history, contact numbers and promo offer subscribers
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={exportCustomersCSV}
                  className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-bold border border-white/10 flex items-center gap-2 transition-colors shadow-sm"
                >
                  <Download className="w-4 h-4 text-cheese-neon" />
                  <span>Export CSV / Phone Numbers</span>
                </button>
              </div>
            </div>

            {/* Customer Search */}
            <div className="relative max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search guest by name, mobile number, or address..."
                value={customerSearch}
                onChange={(e) => setCustomerSearch(e.target.value)}
                className="w-full bg-[#141824] border border-white/10 rounded-xl pl-10 pr-3 py-2 text-xs text-white focus:outline-none focus:border-pizza-red"
              />
            </div>

            {/* Customers Table / Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredCustomers.map(cust => (
                <div key={cust.id} className="glass-card p-4 rounded-2xl border border-white/10 space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-pizza-red to-cheese-500 text-black font-extrabold text-xs flex items-center justify-center shrink-0">
                          {cust.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                        </div>
                        <div>
                          <h4 className="font-display font-bold text-sm text-white">{cust.name}</h4>
                          <a
                            href={`tel:${cust.phone}`}
                            className="font-mono text-xs text-cheese-neon hover:underline block"
                          >
                            +91 {cust.phone}
                          </a>
                        </div>
                      </div>

                      {cust.marketingOptIn ? (
                        <span className="text-[10px] bg-fresh-green/20 text-fresh-green px-2 py-0.5 rounded-full font-bold">
                          Promo Opted In 📢
                        </span>
                      ) : (
                        <span className="text-[10px] bg-white/5 text-gray-400 px-2 py-0.5 rounded-full">
                          Standard
                        </span>
                      )}
                    </div>

                    {cust.email && (
                      <p className="text-xs text-gray-400">
                        ✉️ {cust.email}
                      </p>
                    )}

                    {cust.address && (
                      <p className="text-xs text-gray-300 flex items-start gap-1.5 pt-1">
                        <MapPin className="w-3.5 h-3.5 text-pizza-red shrink-0 mt-0.5" />
                        <span className="line-clamp-2">{cust.address}</span>
                      </p>
                    )}
                  </div>

                  {/* Order metrics & 1-click WhatsApp promo */}
                  <div className="pt-3 border-t border-white/5 space-y-2.5">
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="bg-[#11141E] p-2 rounded-xl text-center border border-white/5">
                        <span className="text-[10px] text-gray-400 block">Orders</span>
                        <span className="font-mono font-bold text-white">{cust.totalOrders}</span>
                      </div>
                      <div className="bg-[#11141E] p-2 rounded-xl text-center border border-white/5">
                        <span className="text-[10px] text-gray-400 block">Lifetime Spend</span>
                        <span className="font-mono font-bold text-cheese-neon">₹{cust.totalSpent}</span>
                      </div>
                    </div>

                    <a
                      href={`https://wa.me/91${cust.phone.replace(/\D/g, '')}?text=${encodeURIComponent(`Hi ${cust.name}! Pizza Pizza (Hot & Fresh) Dehradun has a special treat for you today. Use code HOTFRESH50 for flat ₹50 OFF on your favorite pizza!`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2 px-3 rounded-xl bg-fresh-green/10 hover:bg-fresh-green/20 text-fresh-green text-xs font-bold border border-fresh-green/30 flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>Send WhatsApp Offer</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 4: ORDERS HISTORY & ANALYTICS                             */}
        {/* ============================================================== */}
        {activeTab === 'history' && (
          <div className="space-y-6 max-w-7xl mx-auto">
            
            <div>
              <h3 className="font-display font-black text-xl sm:text-2xl text-white">
                Orders Database & Revenue Analytics
              </h3>
              <p className="text-xs text-gray-400">
                Complete log of online, takeaway and WhatsApp orders
              </p>
            </div>

            {/* Quick Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="glass-card p-4 rounded-2xl border border-white/10 space-y-1">
                <span className="text-xs text-gray-400 font-medium">Total Orders</span>
                <p className="font-display font-black text-2xl text-white">{orders.length}</p>
                <p className="text-[11px] text-gray-400">All recorded orders</p>
              </div>

              <div className="glass-card p-4 rounded-2xl border border-white/10 space-y-1">
                <span className="text-xs text-gray-400 font-medium">Gross Revenue</span>
                <p className="font-display font-black text-2xl text-cheese-neon">₹{totalRevenue}</p>
                <p className="text-[11px] text-gray-400">Total bills processed</p>
              </div>

              <div className="glass-card p-4 rounded-2xl border border-white/10 space-y-1">
                <span className="text-xs text-gray-400 font-medium">Average Order Value (AOV)</span>
                <p className="font-display font-black text-2xl text-fresh-green">
                  ₹{orders.length > 0 ? Math.round(totalRevenue / orders.length) : 0}
                </p>
                <p className="text-[11px] text-gray-400">Per ticket average</p>
              </div>
            </div>

            {/* Orders Table */}
            <div className="glass-card rounded-2xl border border-white/10 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#141824] text-gray-400 uppercase text-[10px] tracking-wider border-b border-white/10">
                    <tr>
                      <th className="p-3.5">Order ID</th>
                      <th className="p-3.5">Customer</th>
                      <th className="p-3.5">Items Ordered</th>
                      <th className="p-3.5">Mode</th>
                      <th className="p-3.5">Total</th>
                      <th className="p-3.5">Status</th>
                      <th className="p-3.5">Time</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {orders.map(o => (
                      <tr key={o.orderId} className="hover:bg-white/[0.02]">
                        <td className="p-3.5 font-mono font-bold text-cheese-neon">
                          {o.orderId}
                        </td>
                        <td className="p-3.5">
                          <p className="font-bold text-white">{o.customerInfo.name}</p>
                          <p className="text-[11px] text-gray-400 font-mono">{o.customerInfo.phone}</p>
                        </td>
                        <td className="p-3.5 max-w-xs">
                          <p className="text-gray-300 truncate">
                            {o.cart.map(c => `${c.quantity}x ${c.name} ${c.size ? `(${c.size})` : ''}`).join(', ')}
                          </p>
                        </td>
                        <td className="p-3.5 uppercase font-bold text-[10px]">
                          <span className={o.orderType === 'delivery' ? 'text-pizza-red' : 'text-cheese-neon'}>
                            {o.orderType}
                          </span>
                        </td>
                        <td className="p-3.5 font-mono font-bold text-white">
                          ₹{o.finalTotal}
                        </td>
                        <td className="p-3.5">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                            o.status === 'delivered' ? 'bg-green-500/20 text-green-400' :
                            o.status === 'baking' ? 'bg-orange-500/20 text-orange-400' :
                            o.status === 'ready' ? 'bg-yellow-400/20 text-yellow-300' :
                            o.status === 'cancelled' ? 'bg-red-500/20 text-red-400' :
                            'bg-blue-500/20 text-blue-400'
                          }`}>
                            {o.status}
                          </span>
                        </td>
                        <td className="p-3.5 text-gray-400 font-mono">
                          {o.timestamp}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 5: ANDROID APK DISTRIBUTION & DOWNLOAD HUB                 */}
        {/* ============================================================== */}
        {activeTab === 'apks' && (
          <div className="space-y-6 max-w-7xl mx-auto animate-fade-in">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="font-display font-black text-xl sm:text-2xl text-white flex items-center gap-2">
                  <Smartphone className="w-6 h-6 text-cheese-neon" />
                  <span>Android APK Distribution & Download Hub</span>
                </h3>
                <p className="text-xs text-gray-400">
                  Pre-compiled, release-signed standalone Android APKs ready for instant download, kitchen tablets, or customer sharing.
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs">
                <span className="px-3 py-1.5 rounded-xl bg-fresh-green/10 text-fresh-green border border-fresh-green/30 font-bold flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Release Signed (v1 + v2)</span>
                </span>
                <span className="px-3 py-1.5 rounded-xl bg-white/5 text-gray-300 border border-white/10 font-mono">
                  minSdk 22 • Android 5.1 - 15
                </span>
              </div>
            </div>

            {/* Troubleshooting Parse Error Alert */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 via-yellow-500/5 to-transparent border border-amber-500/30 flex items-start gap-3">
              <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 shrink-0 mt-0.5">
                <HelpCircle className="w-5 h-5" />
              </div>
              <div className="space-y-1 text-xs">
                <h4 className="font-black text-white text-sm">
                  Got "There was a problem parsing the package"? Here is how to install smoothly:
                </h4>
                <p className="text-gray-300 leading-relaxed">
                  This happens if the file was opened before the 3.6 MB download finished, or opened inside WhatsApp's built-in chat viewer instead of the Android Package Installer.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 pt-1 text-[11px] text-gray-300">
                  <div className="p-2.5 rounded-xl bg-black/40 border border-white/10">
                    <strong className="text-cheese-neon block mb-0.5">1. Complete Download</strong>
                    Wait until the notification says "Download complete" (exact size ~3.6 MB).
                  </div>
                  <div className="p-2.5 rounded-xl bg-black/40 border border-white/10">
                    <strong className="text-cheese-neon block mb-0.5">2. Open from "Files" App</strong>
                    Open your device's native <strong>Files</strong> or <strong>Downloads</strong> app, then tap the `.apk`.
                  </div>
                  <div className="p-2.5 rounded-xl bg-black/40 border border-white/10">
                    <strong className="text-cheese-neon block mb-0.5">3. Allow Unknown Apps</strong>
                    When prompted, tap <em>Settings &gt; Allow from this source</em>, then tap <strong>Install</strong>.
                  </div>
                </div>
              </div>
            </div>

            {/* Two APK Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* CARD 1: CUSTOMER ORDERING APP */}
              <div className="glass-card p-6 rounded-3xl border border-cheese-500/30 bg-gradient-to-b from-[#161a29] to-[#0f121c] flex flex-col justify-between space-y-5">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-black uppercase tracking-wider text-cheese-neon bg-cheese-500/20 px-2.5 py-1 rounded-lg border border-cheese-500/30">
                      CUSTOMER APP
                    </span>
                    <span className="text-xs text-gray-400 font-mono">Size: ~3.6 MB</span>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pizza-red to-cheese-500 p-0.5 shrink-0 flex items-center justify-center shadow-lg shadow-pizza-red/20">
                      <div className="w-full h-full bg-[#11141C] rounded-[14px] flex items-center justify-center text-3xl">
                        🍕
                      </div>
                    </div>
                    <div>
                      <h4 className="font-display font-black text-xl text-white">
                        Pizza Pizza (Customer App)
                      </h4>
                      <p className="text-xs text-gray-400 font-mono">
                        com.pizzapizza.customer • Version 1.0 (Release)
                      </p>
                      <p className="text-xs text-gray-300 mt-2 leading-relaxed">
                        Full online ordering experience with dark Gen-Z styling, pizza customizer, live 4-stage order tracker, 1-tap WhatsApp checkout, and VIP deals.
                      </p>
                    </div>
                  </div>

                  <div className="p-3 rounded-2xl bg-black/50 border border-white/10 space-y-1.5 text-xs text-gray-300">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Direct File Path:</span>
                      <code className="text-cheese-neon font-mono text-[11px]">/downloads/PizzaPizza-Customer.apk</code>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Signature:</span>
                      <span className="text-fresh-green font-bold">APK Signature Scheme v1 + v2</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Target Devices:</span>
                      <span className="text-white">Android 5.1 up to Android 15</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  {/* Direct Download Button */}
                  <a
                    href="/downloads/PizzaPizza-Customer.apk"
                    download="PizzaPizza-Customer.apk"
                    className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-pizza-red to-cheese-500 hover:from-cheese-500 hover:to-pizza-red text-black font-display font-black text-sm shadow-xl shadow-pizza-red/30 transition-all flex items-center justify-center gap-2 group active:scale-98"
                  >
                    <Download className="w-4 h-4 stroke-[3] group-hover:translate-y-0.5 transition-transform" />
                    <span>Download Customer APK (~3.6 MB)</span>
                  </a>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {/* Copy Link Button */}
                    <button
                      onClick={() => copyApkLink('/downloads/PizzaPizza-Customer.apk', 'customer')}
                      className="py-2.5 px-3 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/10 flex items-center justify-center gap-2 transition-colors font-bold"
                    >
                      {copiedApk === 'customer' ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-fresh-green stroke-[3]" />
                          <span className="text-fresh-green">Link Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Link</span>
                        </>
                      )}
                    </button>

                    {/* WhatsApp Share Button */}
                    <a
                      href={`https://wa.me/?text=${encodeURIComponent(`🍕 Download the official Pizza Pizza (Hot & Fresh) App for direct ordering, hot deals, and live order tracking! Download APK here: ${window.location.origin}/downloads/PizzaPizza-Customer.apk`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2.5 px-3 rounded-xl bg-[#25D366]/15 hover:bg-[#25D366]/25 text-[#25D366] border border-[#25D366]/30 flex items-center justify-center gap-1.5 transition-colors font-bold"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>Share on WhatsApp</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* CARD 2: KITCHEN DISPLAY SYSTEM & ADMIN APP */}
              <div className="glass-card p-6 rounded-3xl border border-pizza-red/40 bg-gradient-to-b from-[#1a141e] to-[#0f121c] flex flex-col justify-between space-y-5">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-black uppercase tracking-wider text-pizza-red bg-pizza-red/20 px-2.5 py-1 rounded-lg border border-pizza-red/30">
                      ADMIN & KITCHEN KDS APP
                    </span>
                    <span className="text-xs text-gray-400 font-mono">Size: ~3.6 MB</span>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pizza-red to-orange-500 p-0.5 shrink-0 flex items-center justify-center shadow-lg shadow-pizza-red/20">
                      <div className="w-full h-full bg-[#11141C] rounded-[14px] flex items-center justify-center text-3xl">
                        👨‍🍳
                      </div>
                    </div>
                    <div>
                      <h4 className="font-display font-black text-xl text-white">
                        Pizza Pizza KDS Admin
                      </h4>
                      <p className="text-xs text-gray-400 font-mono">
                        com.pizzapizza.admin • Version 1.0 (Release)
                      </p>
                      <p className="text-xs text-gray-300 mt-2 leading-relaxed">
                        Dedicated kitchen tablet app. Boots directly into the Kitchen Display System (KDS), audio chime alerts for incoming orders, live menu availability ON/OFF toggle, and guest database.
                      </p>
                    </div>
                  </div>

                  <div className="p-3 rounded-2xl bg-black/50 border border-white/10 space-y-1.5 text-xs text-gray-300">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Direct File Path:</span>
                      <code className="text-pizza-red font-mono text-[11px]">/downloads/PizzaPizza-KDS-Admin.apk</code>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Signature:</span>
                      <span className="text-fresh-green font-bold">APK Signature Scheme v1 + v2</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Target Devices:</span>
                      <span className="text-white">Kitchen Tablets & Manager Phones</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  {/* Direct Download Button */}
                  <a
                    href="/downloads/PizzaPizza-KDS-Admin.apk"
                    download="PizzaPizza-KDS-Admin.apk"
                    className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-orange-500 to-pizza-red hover:from-pizza-red hover:to-orange-500 text-white font-display font-black text-sm shadow-xl shadow-pizza-red/30 transition-all flex items-center justify-center gap-2 group active:scale-98"
                  >
                    <Download className="w-4 h-4 stroke-[3] group-hover:translate-y-0.5 transition-transform" />
                    <span>Download Admin KDS APK (~3.6 MB)</span>
                  </a>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {/* Copy Link Button */}
                    <button
                      onClick={() => copyApkLink('/downloads/PizzaPizza-KDS-Admin.apk', 'admin')}
                      className="py-2.5 px-3 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/10 flex items-center justify-center gap-2 transition-colors font-bold"
                    >
                      {copiedApk === 'admin' ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-fresh-green stroke-[3]" />
                          <span className="text-fresh-green">Link Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Link</span>
                        </>
                      )}
                    </button>

                    {/* WhatsApp Share Button */}
                    <a
                      href={`https://wa.me/?text=${encodeURIComponent(`👨‍🍳 Pizza Pizza Kitchen Display System (KDS) & Admin APK download link for kitchen tablet: ${window.location.origin}/downloads/PizzaPizza-KDS-Admin.apk`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2.5 px-3 rounded-xl bg-[#25D366]/15 hover:bg-[#25D366]/25 text-[#25D366] border border-[#25D366]/30 flex items-center justify-center gap-1.5 transition-colors font-bold"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>Send to Kitchen Staff</span>
                    </a>
                  </div>
                </div>
              </div>

            </div>

            {/* Quick Setup for Kitchen Tablets */}
            <div className="glass-card p-5 rounded-2xl border border-white/10 bg-[#12151F] space-y-3">
              <h4 className="font-display font-black text-sm text-white flex items-center gap-2">
                <ChefHat className="w-4 h-4 text-cheese-neon" />
                <span>Recommended Kitchen Tablet Setup</span>
              </h4>
              <p className="text-xs text-gray-300 leading-relaxed">
                For optimal kitchen performance, install <strong>PizzaPizza-KDS-Admin.apk</strong> on an inexpensive Android tablet mounted near the oven or pizza preparation counter. Keep device screen timeout set to <em>"Never"</em> or <em>"Stay awake while charging"</em> (in Android Developer Options) so orders chime and remain visible continuously during rush hours.
              </p>
            </div>
          </div>
        )}

      </div>

      {/* ============================================================== */}
      {/* MODAL: EDIT MENU ITEM & RATES                                 */}
      {/* ============================================================== */}
      {editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in overflow-y-auto">
          <div className="glass-panel w-full max-w-lg rounded-3xl border border-white/10 p-6 bg-[#11141E] space-y-4 my-8 text-white">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h4 className="font-display font-black text-lg text-white">Edit Dish & Rates</h4>
              <button
                onClick={() => setEditingItem(null)}
                className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-gray-300 font-bold mb-1">Item Name</label>
                <input
                  type="text"
                  value={editingItem.name}
                  onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                  className="w-full bg-[#161922] border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-pizza-red"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-300 font-bold mb-1">Description</label>
                <textarea
                  rows={2}
                  value={editingItem.description}
                  onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                  className="w-full bg-[#161922] border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-pizza-red resize-none"
                />
              </div>

              {/* Rates / Prices */}
              {editingItem.isPizza ? (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-gray-300 font-bold mb-1">Regular Size Price (₹)</label>
                    <input
                      type="number"
                      value={editingItem.regularPrice}
                      onChange={(e) => setEditingItem({ ...editingItem, regularPrice: Number(e.target.value) })}
                      className="w-full bg-[#161922] border border-white/10 rounded-xl px-3 py-2 text-white font-mono focus:outline-none focus:border-pizza-red"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 font-bold mb-1">Large Size Price (₹)</label>
                    <input
                      type="number"
                      value={editingItem.largePrice}
                      onChange={(e) => setEditingItem({ ...editingItem, largePrice: Number(e.target.value) })}
                      className="w-full bg-[#161922] border border-white/10 rounded-xl px-3 py-2 text-white font-mono focus:outline-none focus:border-pizza-red"
                      required
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <label className="block text-gray-300 font-bold mb-1">Item / Combo Price (₹)</label>
                  <input
                    type="number"
                    value={editingItem.price}
                    onChange={(e) => setEditingItem({ ...editingItem, price: Number(e.target.value) })}
                    className="w-full bg-[#161922] border border-white/10 rounded-xl px-3 py-2 text-white font-mono focus:outline-none focus:border-pizza-red"
                    required
                  />
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-300 font-bold mb-1">Category</label>
                  <select
                    value={editingItem.category}
                    onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
                    className="w-full bg-[#161922] border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-pizza-red"
                  >
                    {MENU_CATEGORIES.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-gray-300 font-bold mb-1">Tag (e.g. Bestseller, Spicy 🔥)</label>
                  <input
                    type="text"
                    value={editingItem.tag || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, tag: e.target.value })}
                    className="w-full bg-[#161922] border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-pizza-red"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-300 font-bold mb-1">Image URL</label>
                <input
                  type="text"
                  value={editingItem.image || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, image: e.target.value })}
                  className="w-full bg-[#161922] border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-pizza-red"
                />
              </div>

              <div className="flex items-center gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="flex-1 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-pizza-red hover:bg-pizza-600 text-white font-bold shadow-lg shadow-pizza-red/30"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* MODAL: ADD NEW MENU ITEM                                      */}
      {/* ============================================================== */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in overflow-y-auto">
          <div className="glass-panel w-full max-w-lg rounded-3xl border border-white/10 p-6 bg-[#11141E] space-y-4 my-8 text-white">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h4 className="font-display font-black text-lg text-white">Add New Dish or Combo</h4>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-gray-300 font-bold mb-1">Dish / Combo Name *</label>
                <input
                  type="text"
                  placeholder="e.g. Tandoori Special Pizza or Mega Feast Combo"
                  value={newItemData.name}
                  onChange={(e) => setNewItemData({ ...newItemData, name: e.target.value })}
                  className="w-full bg-[#161922] border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-pizza-red"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-300 font-bold mb-1">Description *</label>
                <textarea
                  rows={2}
                  placeholder="Fresh mozzarella, hand-stretched dough, crispy toppings..."
                  value={newItemData.description}
                  onChange={(e) => setNewItemData({ ...newItemData, description: e.target.value })}
                  className="w-full bg-[#161922] border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-pizza-red resize-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-300 font-bold mb-1">Category</label>
                  <select
                    value={newItemData.category}
                    onChange={(e) => {
                      const cat = e.target.value;
                      const isP = cat === 'classic' || cat === 'signature' || cat === 'cheese-burst' || cat === 'tandoori';
                      setNewItemData({
                        ...newItemData,
                        category: cat,
                        isPizza: isP,
                        isCombo: cat === 'combos'
                      });
                    }}
                    className="w-full bg-[#161922] border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-pizza-red"
                  >
                    {MENU_CATEGORIES.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-gray-300 font-bold mb-1">Tag (Optional)</label>
                  <input
                    type="text"
                    placeholder="e.g. Chef Special, Hot Deal"
                    value={newItemData.tag}
                    onChange={(e) => setNewItemData({ ...newItemData, tag: e.target.value })}
                    className="w-full bg-[#161922] border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-pizza-red"
                  />
                </div>
              </div>

              {newItemData.isPizza ? (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-gray-300 font-bold mb-1">Regular Size Price (₹) *</label>
                    <input
                      type="number"
                      value={newItemData.regularPrice}
                      onChange={(e) => setNewItemData({ ...newItemData, regularPrice: Number(e.target.value) })}
                      className="w-full bg-[#161922] border border-white/10 rounded-xl px-3 py-2 text-white font-mono focus:outline-none focus:border-pizza-red"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 font-bold mb-1">Large Size Price (₹) *</label>
                    <input
                      type="number"
                      value={newItemData.largePrice}
                      onChange={(e) => setNewItemData({ ...newItemData, largePrice: Number(e.target.value) })}
                      className="w-full bg-[#161922] border border-white/10 rounded-xl px-3 py-2 text-white font-mono focus:outline-none focus:border-pizza-red"
                      required
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <label className="block text-gray-300 font-bold mb-1">Item / Combo Price (₹) *</label>
                  <input
                    type="number"
                    value={newItemData.price}
                    onChange={(e) => setNewItemData({ ...newItemData, price: Number(e.target.value) })}
                    className="w-full bg-[#161922] border border-white/10 rounded-xl px-3 py-2 text-white font-mono focus:outline-none focus:border-pizza-red"
                    required
                  />
                </div>
              )}

              <div>
                <label className="block text-gray-300 font-bold mb-1">Image URL</label>
                <input
                  type="text"
                  value={newItemData.image}
                  onChange={(e) => setNewItemData({ ...newItemData, image: e.target.value })}
                  className="w-full bg-[#161922] border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-pizza-red"
                />
              </div>

              <div className="flex items-center gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="flex-1 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-pizza-red to-cheese-500 text-black font-extrabold shadow-lg shadow-pizza-red/30"
                >
                  Add to Live Menu
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

// Sub-component: KDS Order Card
const KdsOrderCard = ({ order, elapsed, onAdvance, advanceLabel, advanceColor, onCancel }) => {
  return (
    <div className="glass-card p-3.5 rounded-2xl border border-white/10 space-y-3 shadow-lg bg-[#151926]">
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-white/10">
        <div>
          <span className="font-mono font-black text-sm text-cheese-neon block">
            {order.orderId}
          </span>
          <span className="text-[10px] text-gray-400 flex items-center gap-1">
            <Clock className="w-3 h-3 text-pizza-red" />
            <span>{elapsed}</span>
          </span>
        </div>

        <div className="text-right">
          <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
            order.orderType === 'delivery'
              ? 'bg-pizza-red/20 text-pizza-red border border-pizza-red/30'
              : 'bg-cheese-500/20 text-cheese-neon border border-cheese-500/30'
          }`}>
            {order.orderType === 'delivery' ? '🛵 Delivery' : '🏪 Takeaway'}
          </span>
          <span className="block text-[10px] text-gray-400 font-mono mt-0.5">
            {order.paymentMethod}
          </span>
        </div>
      </div>

      {/* Customer Info */}
      <div className="text-xs space-y-0.5">
        <p className="font-bold text-white flex items-center justify-between">
          <span>{order.customerInfo.name}</span>
          <a
            href={`tel:${order.customerInfo.phone}`}
            className="text-cheese-neon font-mono hover:underline text-[11px]"
          >
            {order.customerInfo.phone}
          </a>
        </p>

        {order.customerInfo.address && order.orderType === 'delivery' && (
          <p className="text-[11px] text-gray-300 leading-tight">
            📍 {order.customerInfo.address}
          </p>
        )}

        {order.customerInfo.instructions && (
          <p className="text-[11px] text-yellow-300 bg-yellow-500/10 p-1 rounded font-medium mt-1">
            ⚠️ Note: {order.customerInfo.instructions}
          </p>
        )}
      </div>

      {/* Itemized Order List */}
      <div className="bg-[#0D0F17] p-2.5 rounded-xl border border-white/5 space-y-1.5 text-xs">
        {order.cart.map((item, idx) => (
          <div key={idx} className="flex justify-between items-start gap-1">
            <div>
              <span className="font-bold text-white">
                {item.quantity}x {item.name}
              </span>
              <div className="text-[10px] text-gray-400">
                {item.size && item.size !== 'Standard' && <span className="text-cheese-neon mr-1">{item.size}</span>}
                {item.crust && <span>• {item.crust}</span>}
                {item.addons && item.addons.length > 0 && (
                  <span className="text-green-400 ml-1">
                    (+{item.addons.map(a => a.name).join(', ')})
                  </span>
                )}
              </div>
            </div>
            <span className="font-mono text-white text-[11px]">
              ₹{item.unitPrice * item.quantity}
            </span>
          </div>
        ))}

        <div className="pt-1.5 border-t border-white/10 flex justify-between font-bold text-xs">
          <span>Total:</span>
          <span className="font-mono text-cheese-neon">₹{order.finalTotal}</span>
        </div>
      </div>

      {/* Status Advance Action Button */}
      <div className="flex items-center gap-2 pt-1">
        <button
          onClick={onAdvance}
          className={`flex-1 py-2 px-3 rounded-xl font-display font-black text-xs shadow-md transition-all active:scale-95 flex items-center justify-center gap-1.5 ${advanceColor}`}
        >
          <span>{advanceLabel}</span>
          <ArrowRight className="w-3.5 h-3.5 stroke-[3]" />
        </button>

        <button
          onClick={() => {
            if (window.confirm(`Cancel order ${order.orderId}?`)) {
              onCancel();
            }
          }}
          className="p-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20"
          title="Cancel order"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
