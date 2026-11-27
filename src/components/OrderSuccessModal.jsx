import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { CheckCircle2, Clock, Phone, MapPin, Bike, Sparkles, MessageCircle } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantInfo';

export const OrderSuccessModal = ({ order, onClose }) => {
  if (!order) return null;

  const [activeStage, setActiveStage] = useState(1);

  useEffect(() => {
    // Confetti celebration blast
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#FF2A3B', '#FFB800', '#10B981', '#FFFFFF']
    });

    // Simulate progress
    const timer = setTimeout(() => setActiveStage(2), 5000);
    return () => clearTimeout(timer);
  }, []);

  const stages = [
    { num: 1, label: 'Order Received', desc: 'Sent to Pizza Pizza kitchen', time: 'Just now' },
    { num: 2, label: 'Baking in Oven', desc: 'Fresh dough & bubbling mozzarella', time: 'In progress' },
    { num: 3, label: 'Quality Check & Packed', desc: 'Boxed hot with oregano & chilli flakes', time: '~15 mins' },
    { num: 4, label: 'Out for Delivery / Pickup', desc: 'Rider on the way', time: '~25 mins' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div 
        className="glass-panel w-full max-w-lg rounded-3xl border border-white/10 shadow-2xl p-6 bg-[#11141D] space-y-6 my-8 text-white"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Success Icon & Header */}
        <div className="text-center space-y-2">
          <div className="w-16 h-16 rounded-full bg-fresh-green/20 border-2 border-fresh-green text-fresh-green flex items-center justify-center mx-auto shadow-lg shadow-fresh-green/30 animate-bounce-subtle">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <h2 className="font-display font-black text-2xl text-white">
            Order Placed Successfully!
          </h2>
          <p className="text-xs text-gray-300">
            Thank you, <strong className="text-white">{order.customerInfo.name}</strong>! Your hot & fresh order is being baked.
          </p>
          <div className="inline-block bg-white/5 px-3 py-1 rounded-full border border-white/10 text-xs font-mono font-bold text-cheese-neon">
            Order ID: {order.orderId}
          </div>
        </div>

        {/* 4-Stage Live Tracker */}
        <div className="glass-card p-4 rounded-2xl border border-white/5 space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold flex items-center gap-1.5 text-cheese-neon">
              <Clock className="w-4 h-4" /> Estimated Delivery: 30–40 Mins
            </span>
            <span className="text-gray-400 font-mono">{order.timestamp}</span>
          </div>

          <div className="space-y-3 pt-2">
            {stages.map((st) => {
              const isDone = activeStage >= st.num;
              const isCurrent = activeStage === st.num;
              return (
                <div key={st.num} className="flex items-start gap-3">
                  <div className="flex flex-col items-center">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                      isDone 
                        ? 'bg-fresh-green text-black font-extrabold shadow-md shadow-fresh-green/40' 
                        : 'bg-white/10 text-gray-500'
                    } ${isCurrent ? 'ring-2 ring-cheese-neon ring-offset-2 ring-offset-black animate-pulse' : ''}`}>
                      {isDone ? '✓' : st.num}
                    </div>
                    {st.num < 4 && (
                      <div className={`w-0.5 h-6 ${activeStage > st.num ? 'bg-fresh-green' : 'bg-white/10'}`}></div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className={`text-xs font-bold ${isCurrent ? 'text-cheese-neon' : isDone ? 'text-white' : 'text-gray-500'}`}>
                      {st.label}
                    </p>
                    <p className="text-[11px] text-gray-400">{st.desc}</p>
                  </div>

                  <span className="text-[10px] text-gray-400 font-mono">{st.time}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Order Details Brief */}
        <div className="bg-[#151924] p-3.5 rounded-2xl border border-white/5 space-y-2 text-xs">
          <div className="flex justify-between font-bold pb-1.5 border-b border-white/10 text-gray-300">
            <span>Mode: {order.orderType.toUpperCase()}</span>
            <span className="text-cheese-neon font-mono">Paid/To Pay: ₹{order.finalTotal}</span>
          </div>

          <div className="space-y-1 text-gray-400">
            {order.cart.map((item, idx) => (
              <div key={idx} className="flex justify-between">
                <span>{item.quantity}x {item.name} {item.size && `(${item.size})`}</span>
                <span className="font-mono text-white">₹{item.unitPrice * item.quantity}</span>
              </div>
            ))}
          </div>

          {order.customerInfo.address && (
            <div className="pt-1.5 border-t border-white/10 text-[11px] text-gray-400 flex items-start gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-pizza-red shrink-0 mt-0.5" />
              <span>{order.customerInfo.address}</span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="space-y-2">
          <a
            href={`https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=${encodeURIComponent(`Hi Pizza Pizza! Checking on my order ${order.orderId} placed for ₹${order.finalTotal}.`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 px-4 rounded-2xl bg-fresh-green hover:bg-emerald-600 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-fresh-green/30 transition-all"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Chat with Store on WhatsApp</span>
          </a>

          <button
            onClick={onClose}
            className="w-full py-2.5 px-4 rounded-2xl bg-white/5 hover:bg-white/10 text-gray-300 font-semibold text-xs border border-white/10 transition-colors"
          >
            Close & Order More Pizza
          </button>
        </div>

      </div>
    </div>
  );
};
