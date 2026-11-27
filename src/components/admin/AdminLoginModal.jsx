import React, { useState } from 'react';
import { X, Lock, KeyRound, ShieldAlert, ArrowRight, Sparkles } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const AdminLoginModal = ({ isOpen, onClose, onSuccess }) => {
  const { adminLogin, adminDefaultPin } = useStore();
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = adminLogin(pin);
    if (result.success) {
      setError('');
      setPin('');
      if (onSuccess) onSuccess();
    } else {
      setError(result.error);
    }
  };

  const handleQuickKey = (digit) => {
    if (pin.length < 8) {
      setPin(prev => prev + digit);
      setError('');
    }
  };

  const handleBackspace = () => {
    setPin(prev => prev.slice(0, -1));
  };

  const handleDemoFill = () => {
    setPin(adminDefaultPin);
    setError('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div 
        className="glass-panel w-full max-w-sm rounded-3xl border border-white/10 shadow-2xl p-6 bg-[#0E1119] space-y-5 text-white"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 rounded-xl bg-pizza-red/15 text-pizza-red border border-pizza-red/30">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-black text-lg text-white">Store Admin Portal</h3>
              <p className="text-[11px] text-gray-400">KDS, Menu Rates & Guest Database</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-300 mb-1.5 text-center">
              Enter Manager PIN / Password
            </label>

            <div className="relative">
              <input
                type="password"
                maxLength={8}
                placeholder="••••"
                value={pin}
                onChange={(e) => { setPin(e.target.value); setError(''); }}
                className="w-full bg-[#151924] border border-white/15 rounded-2xl py-3 text-center font-mono font-black text-2xl tracking-widest text-cheese-neon focus:outline-none focus:border-pizza-red shadow-inner"
                autoFocus
              />
            </div>

            {error && (
              <p className="text-xs text-red-400 mt-2 text-center flex items-center justify-center gap-1">
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>{error}</span>
              </p>
            )}
          </div>

          {/* Keypad */}
          <div className="grid grid-cols-3 gap-2 pt-1">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((digit) => (
              <button
                key={digit}
                type="button"
                onClick={() => handleQuickKey(String(digit))}
                className="py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-mono font-bold text-lg active:scale-95 transition-all border border-white/5"
              >
                {digit}
              </button>
            ))}
            <button
              type="button"
              onClick={() => setPin('')}
              className="py-3 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 font-bold text-xs active:scale-95 transition-all border border-white/5"
            >
              C
            </button>
            <button
              type="button"
              onClick={() => handleQuickKey('0')}
              className="py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-mono font-bold text-lg active:scale-95 transition-all border border-white/5"
            >
              0
            </button>
            <button
              type="button"
              onClick={handleBackspace}
              className="py-3 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 font-bold text-sm active:scale-95 transition-all border border-white/5"
            >
              ⌫
            </button>
          </div>

          {/* Quick Demo Hint */}
          <div className="text-center pt-1">
            <button
              type="button"
              onClick={handleDemoFill}
              className="text-[11px] text-gray-400 hover:text-cheese-neon font-medium underline flex items-center justify-center gap-1 mx-auto"
            >
              <Sparkles className="w-3 h-3 text-cheese-neon" />
              <span>Click to auto-fill default PIN ({adminDefaultPin})</span>
            </button>
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-pizza-red to-pizza-600 hover:from-pizza-600 hover:to-pizza-red text-white font-display font-black text-sm shadow-xl shadow-pizza-red/30 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            <span>Unlock Admin Dashboard</span>
            <ArrowRight className="w-4 h-4 stroke-[3]" />
          </button>
        </form>

      </div>
    </div>
  );
};
