import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

const COUPONS = {
  'HOTFRESH50': { discount: 50, minOrder: 250, desc: '₹50 OFF on orders above ₹250' },
  'PIZZAPARTY': { percent: 15, maxDiscount: 100, minOrder: 400, desc: '15% OFF (up to ₹100) on orders above ₹400' },
  'FIRSTCRUST': { discount: 30, minOrder: 200, desc: 'Flat ₹30 OFF on your craving' }
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('pizza_pizza_cart');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedCustomizeItem, setSelectedCustomizeItem] = useState(null);
  const [orderType, setOrderType] = useState('delivery'); // 'delivery' or 'takeaway'
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState('');
  
  const [customerInfo, setCustomerInfo] = useState(() => {
    try {
      const saved = localStorage.getItem('pizza_pizza_customer');
      return saved ? JSON.parse(saved) : { name: '', phone: '', address: '', instructions: '' };
    } catch (e) {
      return { name: '', phone: '', address: '', instructions: '' };
    }
  });

  // Save cart to local storage
  useEffect(() => {
    try {
      localStorage.setItem('pizza_pizza_cart', JSON.stringify(cart));
    } catch (e) {}
  }, [cart]);

  // Save customer info
  useEffect(() => {
    try {
      localStorage.setItem('pizza_pizza_customer', JSON.stringify(customerInfo));
    } catch (e) {}
  }, [customerInfo]);

  const addToCart = (item, options = {}) => {
    const size = options.size || (item.isPizza ? 'Regular' : 'Standard');
    const crust = options.crust || (item.isPizza ? 'Thin Crust' : null);
    const addons = options.addons || [];
    const hasCheese = !!options.hasCheese;
    
    // Calculate final unit price
    let unitPrice = item.price || (size === 'Large' ? item.largePrice : item.regularPrice);
    
    if (options.crustExtra) {
      unitPrice += options.crustExtra;
    }
    if (hasCheese && item.cheesePrice) {
      unitPrice = item.cheesePrice;
    }
    if (addons.length > 0) {
      const addonCost = addons.reduce((sum, a) => sum + (size === 'Large' ? a.largePrice : a.regularPrice), 0);
      unitPrice += addonCost;
    }

    const cartKey = `${item.id}-${size}-${crust || 'base'}-${hasCheese ? 'cheese' : 'plain'}-${addons.map(a => a.id).sort().join(',')}`;

    setCart(prev => {
      const existing = prev.find(i => i.cartKey === cartKey);
      if (existing) {
        return prev.map(i => i.cartKey === cartKey ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [
        ...prev,
        {
          cartKey,
          id: item.id,
          name: item.name,
          category: item.category,
          unitPrice,
          quantity: 1,
          size,
          crust,
          addons,
          hasCheese,
          image: item.image,
          isPizza: item.isPizza,
          isCombo: item.isCombo
        }
      ];
    });

    setIsCartOpen(true);
  };

  const updateQuantity = (cartKey, delta) => {
    setCart(prev => {
      return prev
        .map(i => {
          if (i.cartKey === cartKey) {
            const newQty = i.quantity + delta;
            return newQty > 0 ? { ...i, quantity: newQty } : null;
          }
          return i;
        })
        .filter(Boolean);
    });
  };

  const removeFromCart = (cartKey) => {
    setCart(prev => prev.filter(i => i.cartKey !== cartKey));
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  const applyCoupon = (codeToApply) => {
    const code = (codeToApply || couponCode).trim().toUpperCase();
    setCouponError('');
    if (!COUPONS[code]) {
      setCouponError('Invalid coupon code. Try HOTFRESH50 or PIZZAPARTY!');
      return false;
    }
    const c = COUPONS[code];
    if (subtotal < c.minOrder) {
      setCouponError(`Minimum order amount of ₹${c.minOrder} required for ${code}.`);
      return false;
    }
    setAppliedCoupon({ code, ...c });
    setCouponCode(code);
    return true;
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode('');
    setCouponError('');
  };

  // Calculations
  const subtotal = cart.reduce((sum, item) => sum + (item.unitPrice * item.quantity), 0);
  const totalItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  let discount = 0;
  if (appliedCoupon && subtotal >= appliedCoupon.minOrder) {
    if (appliedCoupon.discount) {
      discount = appliedCoupon.discount;
    } else if (appliedCoupon.percent) {
      discount = Math.min(appliedCoupon.maxDiscount || 9999, Math.round((subtotal * appliedCoupon.percent) / 100));
    }
  }

  // Free delivery threshold: ₹500
  const freeDeliveryThreshold = 500;
  const isDelivery = orderType === 'delivery';
  const deliveryFee = (!isDelivery || subtotal >= freeDeliveryThreshold || subtotal === 0) ? 0 : 40;
  const amountNeededForFreeDelivery = Math.max(0, freeDeliveryThreshold - subtotal);
  const finalTotal = Math.max(0, subtotal - discount + deliveryFee);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        subtotal,
        discount,
        deliveryFee,
        finalTotal,
        totalItemsCount,
        isCartOpen,
        setIsCartOpen,
        selectedCustomizeItem,
        setSelectedCustomizeItem,
        orderType,
        setOrderType,
        couponCode,
        setCouponCode,
        appliedCoupon,
        couponError,
        applyCoupon,
        removeCoupon,
        availableCoupons: COUPONS,
        customerInfo,
        setCustomerInfo,
        freeDeliveryThreshold,
        amountNeededForFreeDelivery,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
