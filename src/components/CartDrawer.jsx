import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, Tag, Bike, Store, Sparkles, CheckCircle2, QrCode } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { RESTAURANT_INFO } from '../data/restaurantInfo';

export const CartDrawer = ({ onOrderPlaced }) => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    clearCart,
    subtotal,
    discount,
    deliveryFee,
    finalTotal,
    orderType,
    setOrderType,
    couponCode,
    setCouponCode,
    appliedCoupon,
    couponError,
    applyCoupon,
    removeCoupon,
    customerInfo,
    setCustomerInfo,
    freeDeliveryThreshold,
    amountNeededForFreeDelivery
  } = useCart();

  const [paymentMethod, setPaymentMethod] = useState('whatsapp'); // 'whatsapp', 'cod', 'upi'
  const [formErrors, setFormErrors] = useState({});
  const [showUpiQr, setShowUpiQr] = useState(false);

  if (!isCartOpen) return null;

  const validateForm = () => {
    const errors = {};
    if (!customerInfo.name.trim()) errors.name = 'Please enter your name';
    if (!customerInfo.phone.trim() || customerInfo.phone.replace(/\D/g, '').length < 10) {
      errors.phone = 'Please enter a valid 10-digit mobile number';
    }
    if (orderType === 'delivery' && !customerInfo.address.trim()) {
      errors.address = 'Please enter your complete delivery address & locality';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const generateWhatsAppMessage = () => {
    const itemsList = cart.map(i => {
      let desc = `• ${i.quantity}x ${i.name}`;
      if (i.size && i.size !== 'Standard') desc += ` (${i.size})`;
      if (i.crust) desc += ` [${i.crust}]`;
      if (i.addons && i.addons.length > 0) desc += ` + ${i.addons.map(a => a.name).join(', ')}`;
      desc += ` = ₹${i.unitPrice * i.quantity}`;
      return desc;
    }).join('\n');

    const msg = `🍕 *NEW ORDER - PIZZA PIZZA (HOT & FRESH)* 🍕
-----------------------------------------
👤 *Customer:* ${customerInfo.name}
📱 *Phone:* ${customerInfo.phone}
🛵 *Order Mode:* ${orderType.toUpperCase()}
📍 *Address:* ${orderType === 'delivery' ? customerInfo.address : 'Takeaway from Store (Canal Rd)'}
${customerInfo.instructions ? `📝 *Notes:* ${customerInfo.instructions}\n` : ''}
*ITEMS ORDERED:*
${itemsList}

-----------------------------------------
Subtotal: ₹${subtotal}
${discount > 0 ? `Coupon Discount (${appliedCoupon?.code}): -₹${discount}\n` : ''}Delivery Fee: ${deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
*FINAL TOTAL: ₹${finalTotal}*
-----------------------------------------
💳 *Payment Mode:* ${paymentMethod.toUpperCase()}

Please confirm my order and share the estimated preparation time. Thank you!`;

    return encodeURIComponent(msg);
  };

  const handleCheckout = () => {
    if (!validateForm()) return;

    if (paymentMethod === 'upi') {
      setShowUpiQr(true);
      return;
    }

    if (paymentMethod === 'whatsapp') {
      const waUrl = `https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=${generateWhatsAppMessage()}`;
      window.open(waUrl, '_blank');
    }

    const orderSummary = {
      orderId: 'PP-' + Math.floor(100000 + Math.random() * 900000),
      cart,
      subtotal,
      discount,
      deliveryFee,
      finalTotal,
      orderType,
      customerInfo,
      paymentMethod,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    onOrderPlaced(orderSummary);
    clearCart();
    setIsCartOpen(false);
  };

  const handleUpiConfirmed = () => {
    const waUrl = `https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=${generateWhatsAppMessage()}%0A%0A*UPI%20PAYMENT%20COMPLETED*%20✅`;
    window.open(waUrl, '_blank');

    const orderSummary = {
      orderId: 'PP-' + Math.floor(100000 + Math.random() * 900000),
      cart,
      subtotal,
      discount,
      deliveryFee,
      finalTotal,
      orderType,
      customerInfo,
      paymentMethod: 'UPI Paid',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setShowUpiQr(false);
    onOrderPlaced(orderSummary);
    clearCart();
    setIsCartOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/75 backdrop-blur-md animate-fade-in flex justify-end">
      <div 
        className="w-full max-w-lg bg-[#0E1118] border-l border-white/10 h-full flex flex-col shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between glass-header">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🛒</span>
            <div>
              <h2 className="font-display font-black text-lg text-white">Your Pizza Cravings</h2>
              <p className="text-xs text-gray-400">
                {cart.length === 0 ? 'Cart is empty' : `${cart.length} unique item${cart.length > 1 ? 's' : ''}`}
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsCartOpen(false)}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Delivery Bar */}
        {cart.length > 0 && orderType === 'delivery' && (
          <div className="px-4 py-2.5 bg-gradient-to-r from-pizza-red/15 via-orange-500/10 to-cheese-500/15 border-b border-white/5">
            <div className="flex items-center justify-between text-xs mb-1.5">
              {amountNeededForFreeDelivery > 0 ? (
                <span className="text-gray-300 font-medium">
                  Add <strong className="text-cheese-neon font-bold">₹{amountNeededForFreeDelivery}</strong> more for <strong className="text-white font-bold">FREE Delivery</strong>
                </span>
              ) : (
                <span className="text-fresh-green font-bold flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" /> Congratulations! FREE Delivery unlocked 🚀
                </span>
              )}
              <span className="text-gray-400 font-mono text-[11px]">Target: ₹{freeDeliveryThreshold}</span>
            </div>

            <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-pizza-red to-cheese-neon transition-all duration-300 rounded-full"
                style={{ width: `${Math.min(100, (subtotal / freeDeliveryThreshold) * 100)}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Scrollable Cart Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-6">
          
          {/* Order Type Toggle: Delivery vs Takeaway */}
          <div className="bg-[#141722] p-1.5 rounded-2xl border border-white/5 grid grid-cols-2 gap-1">
            <button
              type="button"
              onClick={() => setOrderType('delivery')}
              className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                orderType === 'delivery'
                  ? 'bg-pizza-red text-white shadow-md shadow-pizza-red/30'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Bike className="w-4 h-4" />
              <span>Home Delivery</span>
            </button>

            <button
              type="button"
              onClick={() => setOrderType('takeaway')}
              className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                orderType === 'takeaway'
                  ? 'bg-cheese-500 text-black shadow-md shadow-cheese-500/30'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Store className="w-4 h-4" />
              <span>Takeaway / Pickup</span>
            </button>
          </div>

          {/* Cart Items List */}
          {cart.length === 0 ? (
            <div className="py-12 text-center space-y-3">
              <span className="text-6xl block">🍕</span>
              <p className="font-display font-extrabold text-lg text-white">Your cart is hungry!</p>
              <p className="text-xs text-gray-400 max-w-xs mx-auto">
                Explore our hot combos, loaded pizzas, garlic bread and sweet lava cakes to fill it up.
              </p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="mt-4 px-6 py-2.5 rounded-xl bg-pizza-red text-white text-xs font-bold"
              >
                Browse Menu
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold uppercase tracking-wider text-gray-400">Order Items</span>
                <button
                  onClick={clearCart}
                  className="text-xs text-red-400 hover:text-red-300 font-medium"
                >
                  Clear All
                </button>
              </div>

              {cart.map((item) => (
                <div
                  key={item.cartKey}
                  className="glass-card p-3 rounded-2xl border border-white/5 flex items-center justify-between gap-3"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 border border-green-500 rounded-sm flex items-center justify-center shrink-0">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                      </span>
                      <h4 className="font-bold text-sm text-white truncate">{item.name}</h4>
                    </div>

                    <div className="text-[11px] text-gray-400 mt-0.5 space-x-1.5">
                      {item.size && item.size !== 'Standard' && (
                        <span className="text-cheese-neon font-medium">{item.size}</span>
                      )}
                      {item.crust && <span>• {item.crust}</span>}
                      {item.addons && item.addons.length > 0 && (
                        <span className="text-green-400">
                          • {item.addons.map(a => a.name).join(', ')}
                        </span>
                      )}
                    </div>

                    <p className="font-mono font-bold text-sm text-white mt-1">
                      ₹{item.unitPrice * item.quantity}
                      <span className="text-[10px] text-gray-400 font-normal ml-1">
                        (₹{item.unitPrice} each)
                      </span>
                    </p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-2 bg-[#10131B] border border-white/10 rounded-xl p-1">
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.cartKey, -1)}
                      className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-white/10"
                    >
                      {item.quantity === 1 ? <Trash2 className="w-3.5 h-3.5 text-red-400" /> : <Minus className="w-3.5 h-3.5" />}
                    </button>

                    <span className="font-mono font-bold text-xs text-white px-1.5 min-w-[20px] text-center">
                      {item.quantity}
                    </span>

                    <button
                      type="button"
                      onClick={() => updateQuantity(item.cartKey, 1)}
                      className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-white/10"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {cart.length > 0 && (
            <>
              {/* Promo Coupon Section */}
              <div className="space-y-2">
                <span className="text-xs font-extrabold uppercase tracking-wider text-gray-400">Promo Offers</span>
                
                {appliedCoupon ? (
                  <div className="p-3 rounded-2xl bg-fresh-green/10 border border-fresh-green/30 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 text-fresh-green">
                      <CheckCircle2 className="w-4 h-4" />
                      <div>
                        <p className="font-bold">{appliedCoupon.code} Applied!</p>
                        <p className="text-[10px] text-gray-300">{appliedCoupon.desc}</p>
                      </div>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-red-400 hover:underline font-bold text-xs"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="relative flex-1">
                        <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="text"
                          placeholder="Enter coupon code (e.g. HOTFRESH50)"
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value)}
                          className="w-full bg-[#141722] border border-white/10 rounded-xl pl-9 pr-3 py-2 text-xs text-white uppercase focus:outline-none focus:border-cheese-neon"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => applyCoupon(couponCode)}
                        className="px-4 py-2 rounded-xl bg-cheese-neon text-black font-extrabold text-xs hover:bg-yellow-400"
                      >
                        Apply
                      </button>
                    </div>

                    {couponError && (
                      <p className="text-xs text-red-400">{couponError}</p>
                    )}

                    <div className="flex items-center gap-2 pt-1">
                      <button
                        onClick={() => applyCoupon('HOTFRESH50')}
                        className="text-[10px] bg-white/5 hover:bg-white/10 border border-dashed border-white/20 text-gray-300 px-2 py-1 rounded-lg"
                      >
                        🏷️ HOTFRESH50 (₹50 off ₹250+)
                      </button>
                      <button
                        onClick={() => applyCoupon('PIZZAPARTY')}
                        className="text-[10px] bg-white/5 hover:bg-white/10 border border-dashed border-white/20 text-gray-300 px-2 py-1 rounded-lg"
                      >
                        🎉 PIZZAPARTY (15% off ₹400+)
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Customer Details Form */}
              <div className="space-y-3 pt-2 border-t border-white/5">
                <span className="text-xs font-extrabold uppercase tracking-wider text-gray-400">
                  Customer & Delivery Info
                </span>

                <div className="space-y-2">
                  <div>
                    <input
                      type="text"
                      placeholder="Your Full Name *"
                      value={customerInfo.name}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                      className="w-full bg-[#141722] border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-pizza-red"
                    />
                    {formErrors.name && <p className="text-[11px] text-red-400 mt-0.5">{formErrors.name}</p>}
                  </div>

                  <div>
                    <input
                      type="tel"
                      placeholder="10-digit WhatsApp Number *"
                      value={customerInfo.phone}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                      className="w-full bg-[#141722] border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-pizza-red"
                    />
                    {formErrors.phone && <p className="text-[11px] text-red-400 mt-0.5">{formErrors.phone}</p>}
                  </div>

                  {orderType === 'delivery' && (
                    <div>
                      <textarea
                        rows={2}
                        placeholder="Complete Delivery Address & Nearby Landmark *"
                        value={customerInfo.address}
                        onChange={(e) => setCustomerInfo({ ...customerInfo, address: e.target.value })}
                        className="w-full bg-[#141722] border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-pizza-red resize-none"
                      />
                      {formErrors.address && <p className="text-[11px] text-red-400 mt-0.5">{formErrors.address}</p>}
                    </div>
                  )}

                  <input
                    type="text"
                    placeholder="Cooking Notes / Special Requests (Optional)"
                    value={customerInfo.instructions}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, instructions: e.target.value })}
                    className="w-full bg-[#141722] border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-pizza-red"
                  />
                </div>
              </div>

              {/* Payment Method Selector */}
              <div className="space-y-2 pt-2 border-t border-white/5">
                <span className="text-xs font-extrabold uppercase tracking-wider text-gray-400">
                  Select Payment Option
                </span>

                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('whatsapp')}
                    className={`p-2.5 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-1 ${
                      paymentMethod === 'whatsapp'
                        ? 'border-fresh-green bg-fresh-green/15 text-white font-bold'
                        : 'border-white/10 bg-white/5 text-gray-400 hover:text-white'
                    }`}
                  >
                    <span className="text-lg">💬</span>
                    <span className="text-[11px]">WhatsApp</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cod')}
                    className={`p-2.5 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-1 ${
                      paymentMethod === 'cod'
                        ? 'border-pizza-red bg-pizza-red/15 text-white font-bold'
                        : 'border-white/10 bg-white/5 text-gray-400 hover:text-white'
                    }`}
                  >
                    <span className="text-lg">💵</span>
                    <span className="text-[11px]">Pay Cash</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('upi')}
                    className={`p-2.5 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-1 ${
                      paymentMethod === 'upi'
                        ? 'border-cheese-neon bg-cheese-500/15 text-white font-bold'
                        : 'border-white/10 bg-white/5 text-gray-400 hover:text-white'
                    }`}
                  >
                    <QrCode className="w-5 h-5 text-cheese-neon" />
                    <span className="text-[11px]">UPI QR</span>
                  </button>
                </div>
              </div>

              {/* Bill Summary */}
              <div className="glass-panel p-3.5 rounded-2xl border border-white/5 space-y-1.5 text-xs">
                <div className="flex justify-between text-gray-400">
                  <span>Item Subtotal</span>
                  <span className="font-mono text-white">₹{subtotal}</span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-fresh-green">
                    <span>Coupon Discount</span>
                    <span className="font-mono">-₹{discount}</span>
                  </div>
                )}

                <div className="flex justify-between text-gray-400">
                  <span>Delivery Charges</span>
                  <span className="font-mono text-white">
                    {orderType === 'takeaway' || deliveryFee === 0 ? (
                      <span className="text-fresh-green font-bold">FREE</span>
                    ) : (
                      `₹${deliveryFee}`
                    )}
                  </span>
                </div>

                <div className="pt-2 border-t border-white/10 flex justify-between text-sm font-bold text-white">
                  <span>Total Payable</span>
                  <span className="font-mono text-lg text-cheese-neon">₹{finalTotal}</span>
                </div>
              </div>
            </>
          )}

        </div>

        {/* Drawer Footer Checkout Button */}
        {cart.length > 0 && (
          <div className="p-4 border-t border-white/10 bg-[#0A0C10] glass-header flex items-center justify-between gap-3">
            <div>
              <span className="text-[10px] text-gray-400 block uppercase">Final Total</span>
              <span className="font-mono font-black text-2xl text-white">₹{finalTotal}</span>
            </div>

            <button
              onClick={handleCheckout}
              className="flex-1 py-3.5 px-5 rounded-2xl bg-gradient-to-r from-pizza-red to-cheese-500 hover:from-cheese-500 hover:to-pizza-red text-black font-display font-black text-sm tracking-wide shadow-xl shadow-pizza-red/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              <span>{paymentMethod === 'whatsapp' ? 'Proceed via WhatsApp 📲' : 'Confirm Order Now'}</span>
              <ArrowRight className="w-4 h-4 stroke-[3]" />
            </button>
          </div>
        )}

        {/* UPI QR Modal Popup */}
        {showUpiQr && (
          <div className="absolute inset-0 z-50 bg-black/90 backdrop-blur-md p-6 flex flex-col items-center justify-center text-center space-y-4 animate-fade-in">
            <h3 className="font-display font-black text-xl text-white">Scan & Pay ₹{finalTotal}</h3>
            <p className="text-xs text-gray-300">
              Scan with any UPI App: Google Pay, PhonePe, Paytm, or BHIM
            </p>

            <div className="p-4 bg-white rounded-3xl shadow-2xl">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=upi://pay?pa=6398454240@upi&pn=PIZZA%20PIZZA%20HOT%20AND%20FRESH&am=${finalTotal}&cu=INR`}
                alt="UPI Payment QR Code"
                className="w-48 h-48 mx-auto"
              />
              <p className="text-[10px] text-black font-mono font-bold mt-2">
                UPI ID: 6398454240@upi
              </p>
            </div>

            <p className="text-xs text-cheese-neon font-medium">
              After payment, tap the button below to confirm with store on WhatsApp!
            </p>

            <div className="flex items-center gap-2 w-full max-w-xs">
              <button
                type="button"
                onClick={() => setShowUpiQr(false)}
                className="flex-1 py-2.5 rounded-xl bg-white/10 text-xs font-bold text-gray-300"
              >
                Back
              </button>
              <button
                type="button"
                onClick={handleUpiConfirmed}
                className="flex-1 py-2.5 rounded-xl bg-fresh-green text-xs font-bold text-white shadow-lg shadow-fresh-green/40"
              >
                Payment Done ✅
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
