import React, { useState } from 'react';
import { X, Smartphone, Mail, User, MapPin, CheckCircle2, ShieldCheck, Sparkles, LogOut } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const CustomerAuthModal = () => {
  const {
    isCustomerAuthModalOpen,
    setIsCustomerAuthModalOpen,
    currentCustomer,
    registerOrLoginCustomer,
    logoutCustomer,
    orders
  } = useStore();

  const [name, setName] = useState(currentCustomer?.name || '');
  const [phone, setPhone] = useState(currentCustomer?.phone || '');
  const [email, setEmail] = useState(currentCustomer?.email || '');
  const [address, setAddress] = useState(currentCustomer?.address || '');
  const [marketingOptIn, setMarketingOptIn] = useState(currentCustomer?.marketingOptIn ?? true);
  const [errors, setErrors] = useState({});
  const [saveSuccess, setSaveSuccess] = useState(false);

  if (!isCustomerAuthModalOpen) return null;

  const handleSave = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!name.trim()) newErrors.name = 'Please enter your name';
    if (!phone.trim() || phone.replace(/\D/g, '').length < 10) {
      newErrors.phone = 'Please enter a valid 10-digit mobile number';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    registerOrLoginCustomer({
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim(),
      address: address.trim(),
      marketingOptIn
    });

    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      setIsCustomerAuthModalOpen(false);
    }, 1000);
  };

  // Find customer's recent orders
  const myOrders = currentCustomer
    ? orders.filter(o => o.customerInfo && o.customerInfo.phone && o.customerInfo.phone.replace(/\D/g, '') === currentCustomer.phone.replace(/\D/g, ''))
    : [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div 
        className="glass-panel w-full max-w-md rounded-3xl border border-white/10 shadow-2xl p-6 bg-[#11141E] space-y-5 my-8 text-white relative"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-pizza-red to-cheese-500 p-0.5 flex items-center justify-center">
              <div className="w-full h-full bg-[#11141C] rounded-[14px] flex items-center justify-center text-xl">
                👤
              </div>
            </div>
            <div>
              <h3 className="font-display font-black text-lg text-white">
                {currentCustomer ? 'My Pizza Account' : 'Guest Sign In / Register'}
              </h3>
              <p className="text-xs text-gray-400">Order updates, special promo coupons & faster checkout</p>
            </div>
          </div>

          <button
            onClick={() => setIsCustomerAuthModalOpen(false)}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Logged in state card */}
        {currentCustomer && (
          <div className="bg-gradient-to-r from-pizza-red/10 via-cheese-500/10 to-transparent p-4 rounded-2xl border border-white/10 flex items-center justify-between">
            <div>
              <p className="text-xs text-cheese-neon font-bold">Welcome back,</p>
              <h4 className="font-display font-extrabold text-base text-white">{currentCustomer.name}</h4>
              <p className="text-xs text-gray-300 font-mono">📱 +91 {currentCustomer.phone}</p>
              {currentCustomer.email && <p className="text-xs text-gray-400">✉️ {currentCustomer.email}</p>}
            </div>

            <button
              onClick={logoutCustomer}
              className="p-2.5 rounded-xl bg-white/5 hover:bg-red-500/20 text-gray-400 hover:text-red-400 text-xs font-bold border border-white/10 flex items-center gap-1.5 transition-colors"
              title="Sign out from this device"
            >
              <LogOut className="w-4 h-4" />
              <span>Switch</span>
            </button>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSave} className="space-y-4">
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-gray-300 mb-1">
                Full Name *
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="e.g. Rahul Sharma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#161922] border border-white/10 rounded-xl pl-10 pr-3 py-2 text-xs text-white focus:outline-none focus:border-pizza-red"
                />
              </div>
              {errors.name && <p className="text-[11px] text-red-400 mt-1">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-300 mb-1">
                Mobile Number (WhatsApp) *
              </label>
              <div className="relative">
                <Smartphone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="tel"
                  placeholder="10-digit mobile number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-[#161922] border border-white/10 rounded-xl pl-10 pr-3 py-2 text-xs text-white focus:outline-none focus:border-pizza-red"
                />
              </div>
              {errors.phone && <p className="text-[11px] text-red-400 mt-1">{errors.phone}</p>}
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-300 mb-1">
                Email Address (Optional)
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="email"
                  placeholder="e.g. rahul@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#161922] border border-white/10 rounded-xl pl-10 pr-3 py-2 text-xs text-white focus:outline-none focus:border-pizza-red"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-300 mb-1">
                Saved Delivery Address (Optional)
              </label>
              <div className="relative">
                <MapPin className="absolute left-3.5 top-3 w-4 h-4 text-gray-400" />
                <textarea
                  rows={2}
                  placeholder="Apartment, Street, Locality in Dehradun"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full bg-[#161922] border border-white/10 rounded-xl pl-10 pr-3 py-2 text-xs text-white focus:outline-none focus:border-pizza-red resize-none"
                />
              </div>
            </div>

            {/* Promotional Updates Checkbox */}
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-2.5">
              <input
                type="checkbox"
                id="marketing-opt"
                checked={marketingOptIn}
                onChange={(e) => setMarketingOptIn(e.target.checked)}
                className="mt-0.5 w-4 h-4 rounded text-pizza-red focus:ring-pizza-red border-white/20 bg-black/40"
              />
              <label htmlFor="marketing-opt" className="text-xs text-gray-300 cursor-pointer leading-tight">
                <span className="font-bold text-white block">Special Offers & WhatsApp Updates</span>
                Receive live order preparation updates & exclusive secret discount promo codes from Pizza Pizza.
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-pizza-red to-cheese-500 hover:from-cheese-500 hover:to-pizza-red text-black font-display font-black text-sm shadow-xl shadow-pizza-red/20 transition-all flex items-center justify-center gap-2"
          >
            {saveSuccess ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-green-900" />
                <span>Profile Saved!</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-black" />
                <span>{currentCustomer ? 'Update Profile' : 'Save & Continue'}</span>
              </>
            )}
          </button>
        </form>

        {/* Recent orders preview if any */}
        {myOrders.length > 0 && (
          <div className="pt-2 border-t border-white/10 space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 block">
              Recent Order History ({myOrders.length})
            </span>
            <div className="space-y-1.5 max-h-36 overflow-y-auto">
              {myOrders.slice(0, 3).map((ord) => (
                <div key={ord.orderId} className="p-2.5 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-mono font-bold text-cheese-neon">{ord.orderId}</span>
                    <span className="text-gray-400 text-[11px] ml-2">{ord.timestamp}</span>
                    <p className="text-[11px] text-gray-300 truncate max-w-[180px]">
                      {ord.cart.map(c => `${c.quantity}x ${c.name}`).join(', ')}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="font-mono font-bold text-white">₹{ord.finalTotal}</span>
                    <span className={`block text-[10px] uppercase font-extrabold ${
                      ord.status === 'delivered' ? 'text-green-400' : 'text-cheese-neon'
                    }`}>
                      {ord.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
