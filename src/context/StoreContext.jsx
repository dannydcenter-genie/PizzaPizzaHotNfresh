import React, { createContext, useContext, useState, useEffect } from 'react';
import { MENU_ITEMS as DEFAULT_MENU_ITEMS } from '../data/menuData';

const StoreContext = createContext();

const ADMIN_CREDENTIALS = {
  pin: '6398',
  password: 'admin'
};

// Initial sample guest customers
const INITIAL_CUSTOMERS = [
  {
    id: 'cust-1',
    name: 'Aditi Sharma',
    phone: '9876543210',
    email: 'aditi.sharma@gmail.com',
    address: 'Flat 402, Green Valley Apts, Rajpur Rd, Dehradun',
    totalOrders: 6,
    totalSpent: 2150,
    marketingOptIn: true,
    registeredAt: '2026-10-15',
    lastOrderAt: '2026-11-20'
  },
  {
    id: 'cust-2',
    name: 'Rohan Negi',
    phone: '9897123456',
    email: 'rohan.negi@outlook.com',
    address: 'Hostel Block C, DIT University, Mussoorie Diversion Rd, Dehradun',
    totalOrders: 11,
    totalSpent: 4890,
    marketingOptIn: true,
    registeredAt: '2026-09-02',
    lastOrderAt: '2026-11-26'
  },
  {
    id: 'cust-3',
    name: 'Pooja Rawat',
    phone: '9412098765',
    email: 'pooja.rawat@yahoo.com',
    address: 'House 14B, Saundhon wali, Canal Rd, Chironwali, Dehradun',
    totalOrders: 4,
    totalSpent: 1320,
    marketingOptIn: false,
    registeredAt: '2026-11-01',
    lastOrderAt: '2026-11-24'
  }
];

// Initial sample live orders for the KDS
const INITIAL_ORDERS = [
  {
    orderId: 'PP-849201',
    customerInfo: {
      name: 'Rohan Negi',
      phone: '9897123456',
      email: 'rohan.negi@outlook.com',
      address: 'Hostel Block C, DIT University, Mussoorie Diversion Rd',
      instructions: 'Please bring extra oregano & chilli flakes sachets!'
    },
    cart: [
      {
        cartKey: 'combo-4',
        name: 'Mega Squad Party Combo',
        quantity: 1,
        unitPrice: 440,
        size: 'Small',
        crust: null,
        addons: []
      },
      {
        cartKey: 'dessert-choco-lava',
        name: 'Choco Lava Cake',
        quantity: 2,
        unitPrice: 75,
        size: 'Standard',
        crust: null,
        addons: []
      }
    ],
    orderType: 'delivery',
    paymentMethod: 'COD',
    subtotal: 590,
    discount: 50,
    deliveryFee: 0,
    finalTotal: 540,
    status: 'baking', // 'new', 'baking', 'ready', 'delivered', 'cancelled'
    timestamp: '12:18 PM',
    createdAt: Date.now() - 14 * 60 * 1000
  },
  {
    orderId: 'PP-849202',
    customerInfo: {
      name: 'Aditi Sharma',
      phone: '9876543210',
      email: 'aditi.sharma@gmail.com',
      address: 'Takeaway from Store',
      instructions: 'Make crust well done crispy'
    },
    cart: [
      {
        cartKey: 'cb-blasted-margherita',
        name: 'Blasted Margherita',
        quantity: 1,
        unitPrice: 170,
        size: 'Regular',
        crust: 'Thin Crust',
        addons: [{ id: 'extra-cheese', name: 'Extra Cheese', regularPrice: 30 }]
      },
      {
        cartKey: 'gb-veggies',
        name: 'Garlic Bread with Veggies',
        quantity: 1,
        unitPrice: 130,
        size: 'Standard',
        crust: null,
        addons: []
      }
    ],
    orderType: 'takeaway',
    paymentMethod: 'UPI Paid',
    subtotal: 330,
    discount: 0,
    deliveryFee: 0,
    finalTotal: 330,
    status: 'new',
    timestamp: '12:28 PM',
    createdAt: Date.now() - 4 * 60 * 1000
  }
];

export const StoreProvider = ({ children }) => {
  // 1. Menu Items State (Supports CRUD & ON/OFF Switch)
  const [menuItems, setMenuItems] = useState(() => {
    try {
      const saved = localStorage.getItem('pizza_pizza_menu_items');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    // default with isAvailable: true
    return DEFAULT_MENU_ITEMS.map(item => ({ ...item, isAvailable: item.isAvailable !== false }));
  });

  // Save menu items whenever modified
  useEffect(() => {
    try {
      localStorage.setItem('pizza_pizza_menu_items', JSON.stringify(menuItems));
    } catch (e) {}
  }, [menuItems]);

  // 2. Orders Database & KDS State
  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem('pizza_pizza_orders');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return INITIAL_ORDERS;
  });

  useEffect(() => {
    try {
      localStorage.setItem('pizza_pizza_orders', JSON.stringify(orders));
    } catch (e) {}
  }, [orders]);

  // 3. Customers / Guest Database
  const [customers, setCustomers] = useState(() => {
    try {
      const saved = localStorage.getItem('pizza_pizza_customers');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return INITIAL_CUSTOMERS;
  });

  useEffect(() => {
    try {
      localStorage.setItem('pizza_pizza_customers', JSON.stringify(customers));
    } catch (e) {}
  }, [customers]);

  // 4. Current Customer Profile (logged in customer on web app)
  const [currentCustomer, setCurrentCustomer] = useState(() => {
    try {
      const saved = localStorage.getItem('pizza_pizza_current_user');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });

  useEffect(() => {
    try {
      if (currentCustomer) {
        localStorage.setItem('pizza_pizza_current_user', JSON.stringify(currentCustomer));
      } else {
        localStorage.removeItem('pizza_pizza_current_user');
      }
    } catch (e) {}
  }, [currentCustomer]);

  // 5. Admin Authentication State
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
    try {
      return localStorage.getItem('pizza_pizza_admin_session') === 'true';
    } catch (e) {
      return false;
    }
  });

  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [isCustomerAuthModalOpen, setIsCustomerAuthModalOpen] = useState(false);
  const [kdsSoundEnabled, setKdsSoundEnabled] = useState(true);

  // --- MENU ACTIONS ---
  const toggleItemAvailability = (itemId) => {
    setMenuItems(prev =>
      prev.map(item =>
        item.id === itemId ? { ...item, isAvailable: !item.isAvailable } : item
      )
    );
  };

  const updateMenuItem = (itemId, updatedData) => {
    setMenuItems(prev =>
      prev.map(item =>
        item.id === itemId ? { ...item, ...updatedData } : item
      )
    );
  };

  const addMenuItem = (newItem) => {
    const item = {
      ...newItem,
      id: newItem.id || `custom-${Date.now()}`,
      isAvailable: true
    };
    setMenuItems(prev => [item, ...prev]);
  };

  const deleteMenuItem = (itemId) => {
    setMenuItems(prev => prev.filter(item => item.id !== itemId));
  };

  const resetMenuToDefault = () => {
    const def = DEFAULT_MENU_ITEMS.map(i => ({ ...i, isAvailable: true }));
    setMenuItems(def);
    localStorage.removeItem('pizza_pizza_menu_items');
  };

  // --- ORDER ACTIONS (KDS) ---
  const addNewOrder = (orderData) => {
    const newOrder = {
      ...orderData,
      status: 'new',
      createdAt: Date.now()
    };

    setOrders(prev => [newOrder, ...prev]);

    // Play chime sound if enabled
    if (kdsSoundEnabled) {
      playChime();
    }

    // Automatically update or register customer in guest database
    if (orderData.customerInfo && orderData.customerInfo.phone) {
      upsertCustomerFromOrder(orderData);
    }

    return newOrder;
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(prev =>
      prev.map(order =>
        order.orderId === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  const playChime = () => {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
      osc.frequency.setValueAtTime(880, ctx.currentTime + 0.15); // A5
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.6);
      osc.start();
      osc.stop(ctx.currentTime + 0.6);
    } catch (e) {}
  };

  // --- CUSTOMER ACTIONS ---
  const registerOrLoginCustomer = (customerData) => {
    const cleanPhone = (customerData.phone || '').replace(/\D/g, '');
    let existingIndex = customers.findIndex(c => c.phone.replace(/\D/g, '') === cleanPhone);
    
    let updatedProfile;
    if (existingIndex !== -1) {
      updatedProfile = {
        ...customers[existingIndex],
        ...customerData,
        lastOrderAt: new Date().toISOString().split('T')[0]
      };
      setCustomers(prev => {
        const copy = [...prev];
        copy[existingIndex] = updatedProfile;
        return copy;
      });
    } else {
      updatedProfile = {
        id: `cust-${Date.now()}`,
        name: customerData.name || 'Valued Guest',
        phone: customerData.phone,
        email: customerData.email || '',
        address: customerData.address || '',
        totalOrders: 0,
        totalSpent: 0,
        marketingOptIn: customerData.marketingOptIn !== false,
        registeredAt: new Date().toISOString().split('T')[0],
        lastOrderAt: new Date().toISOString().split('T')[0]
      };
      setCustomers(prev => [updatedProfile, ...prev]);
    }

    setCurrentCustomer(updatedProfile);
    return updatedProfile;
  };

  const upsertCustomerFromOrder = (order) => {
    const phone = order.customerInfo.phone.replace(/\D/g, '');
    const amount = Number(order.finalTotal) || 0;

    setCustomers(prev => {
      const idx = prev.findIndex(c => c.phone.replace(/\D/g, '') === phone);
      if (idx !== -1) {
        const existing = prev[idx];
        const updated = {
          ...existing,
          name: order.customerInfo.name || existing.name,
          email: order.customerInfo.email || existing.email,
          address: order.customerInfo.address || existing.address,
          totalOrders: existing.totalOrders + 1,
          totalSpent: existing.totalSpent + amount,
          lastOrderAt: new Date().toISOString().split('T')[0],
          marketingOptIn: order.customerInfo.marketingOptIn ?? existing.marketingOptIn
        };
        const copy = [...prev];
        copy[idx] = updated;
        return copy;
      } else {
        const newCust = {
          id: `cust-${Date.now()}`,
          name: order.customerInfo.name,
          phone: order.customerInfo.phone,
          email: order.customerInfo.email || '',
          address: order.customerInfo.address || '',
          totalOrders: 1,
          totalSpent: amount,
          marketingOptIn: order.customerInfo.marketingOptIn !== false,
          registeredAt: new Date().toISOString().split('T')[0],
          lastOrderAt: new Date().toISOString().split('T')[0]
        };
        return [newCust, ...prev];
      }
    });
  };

  const logoutCustomer = () => {
    setCurrentCustomer(null);
  };

  // --- ADMIN AUTH ACTIONS ---
  const adminLogin = (inputPinOrPass) => {
    const trimmed = (inputPinOrPass || '').trim();
    if (trimmed === ADMIN_CREDENTIALS.pin || trimmed === ADMIN_CREDENTIALS.password) {
      setIsAdminLoggedIn(true);
      localStorage.setItem('pizza_pizza_admin_session', 'true');
      return { success: true };
    }
    return { success: false, error: 'Incorrect Admin PIN / Password. Default PIN is 6398 or password "admin".' };
  };

  const adminLogout = () => {
    setIsAdminLoggedIn(false);
    localStorage.removeItem('pizza_pizza_admin_session');
  };

  return (
    <StoreContext.Provider
      value={{
        // Menu
        menuItems,
        toggleItemAvailability,
        updateMenuItem,
        addMenuItem,
        deleteMenuItem,
        resetMenuToDefault,
        // Orders & KDS
        orders,
        addNewOrder,
        updateOrderStatus,
        kdsSoundEnabled,
        setKdsSoundEnabled,
        playChime,
        // Customers
        customers,
        currentCustomer,
        registerOrLoginCustomer,
        logoutCustomer,
        isCustomerAuthModalOpen,
        setIsCustomerAuthModalOpen,
        // Admin
        isAdminLoggedIn,
        adminLogin,
        adminLogout,
        isAdminModalOpen,
        setIsAdminModalOpen,
        adminDefaultPin: ADMIN_CREDENTIALS.pin
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);
