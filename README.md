# 🍕 PIZZA PIZZA (HOT & FRESH) - Online Ordering Web App & Android APK

> **"Top Quality Pizza • Unbeatable Prices"**  
> 100% Pure Vegetarian Pizzeria in Dehradun, Uttarakhand.  
> Google Rating: **4.9 ★ (24 Reviews)**

---

## 📍 Store & Business Details (Extracted from Google Link & Menu)
* **Official Google Link**: [Google Search & Location](https://share.google/frGz9pj5m7D0cg9Wv)
* **Address**: Body Guard, 1D, Canal Rd, Saundhon wali, Chironwali, Dehradun, Uttarakhand 248013
* **Google Rating**: 4.9 ★ / 5.0 (24 Google Reviews)
* **Timing**: Open Daily, 12:00 PM – 11:00 PM
* **Phone / WhatsApp**: `+91 6398454240` / `+91 7051386137`
* **Delivery Offer**: Free Home Delivery on Orders ₹500 & Above!
* **100% Pure Veg**: All pizzas, burgers, quesadillas, garlic breads, sides, and desserts are 100% vegetarian.

---

## 🌟 Key Features (Gen-Z Trending & User Friendly)

1. **Aesthetic & High-Energy Gen-Z UI**:
   - Dark mode pizza-lounge aesthetic with flaming scarlet red, molten cheddar gold, and fresh herb green neon accents.
   - Micro-interactions, squircle buttons, floating badge stickers (`FRESH OUT THE OVEN 🔥`, `100% PURE VEG 🌿`, `4.9 ★ RATED`).
   - Instagram/Snapchat-style circular **Story Highlights** (Hot Combos, Cheese Burst, Tandoori, Burgers, Storefront, Coupons).

2. **Complete Authentic Menu**:
   - **Hot Combos** (Small Size Pizzas with Fries, Burgers & Drinks starting at ₹135).
   - **Classic Pizzas** (Margherita ₹110, Cheese Loaded, Daily Veggie, Sweet Corn, Garden Veggie, Desi Tadka).
   - **Signature Pizzas** (Veg Delicacy, Spinach Mushroom Florentine, Mediterranean Veggie, Farm Harvest, Paneer Supreme, Paneer Paradise).
   - **Molten Cheese Burst Pizzas** (Blasted Margherita, Blasted Florentine, Fun Paneer Supreme, Jolly Paneer Paradise).
   - **Tandoori Pizzas** (Tandoori Garden Veggie, Farm Harvest, Paneer Supreme).
   - **Burgers, Quesadillas & Wraps** (Aloo Patty Burger ₹60, Veggie Cheesy ₹90, Traditional Quesadilla ₹140, Veg Wrap ₹95).
   - **Sides & Snacks** (French Fries, Potato Wedges, Potato Cheese Shots, Cheese & Jalapeño Pops, Stuffed Garlic Breads, Veg & Paneer Pizza Parcels, 4 Dips @ ₹25).
   - **Desserts & Beverages** (Choco Lava Cake ₹75, Brownie ₹75, Coke, Sprite, Lahori Jeera, Water).

3. **Interactive Customization Engine**:
   - Pick Size: **Regular** (serves 1–2) or **Large** (serves 2–3).
   - Pick Crust: **Thin Crust** (Included), **Pan Crust** (+₹10 Reg / +₹15 Lrg), **Cheese Crust** (+₹60 Reg / +₹90 Lrg).
   - Add-ons: Extra Cheese (+₹30/₹50), Extra Veggies (+₹15/₹20), Tandoori Sauce (+₹15/₹20).

4. **Cart & Multi-Payment Checkout**:
   - Free Delivery Meter (shows progress towards ₹500 for Free Home Delivery).
   - Order Mode Toggle: **Home Delivery** vs **Takeaway / Pickup**.
   - Promo Coupon codes: `HOTFRESH50` (₹50 off ₹250+), `PIZZAPARTY` (15% off up to ₹100).
   - **WhatsApp 1-Tap Ordering**: Automatically formats an itemized ticket with delivery address and launches WhatsApp directly to `+91 6398454240`.
   - **Cash on Delivery (COD)** with confetti celebration & live simulated 4-stage Pizza Tracker.
   - **Dynamic UPI QR Code**: Pay via Google Pay, PhonePe, Paytm, BHIM with auto-filled amount!

5. **Actual Photos & Location Map**:
   - Storefront exterior photo from Canal Rd, Dehradun.
   - High-res zoomable menu cards and combo banners.
   - Embedded interactive Google Map and 1-click Google Directions.

---

## 📱 Mobile App (PWA) & Native Android APK

### Option A: Install Progressive Web App (Instant)
1. Open the website on Chrome (Android) or Safari (iOS).
2. Tap the **"Get APK App"** button in the header or tap browser menu (⋮) -> **"Install App"** / **"Add to Home Screen"**.
3. The app is installed directly with an app icon, standalone fullscreen window, and offline caching.

### Option B: Native Android APK (Capacitor 7.0)
The repository contains the ready native Android project in the `android/` directory.

To build the APK:
```bash
# 1. Build the web app
npm run build

# 2. Sync web assets to Android project
npx cap sync

# 3. Open Android Studio
npx cap open android
```
In Android Studio:
* Click **Build > Build Bundle(s) / APK(s) > Build APK(s)**.
* Output file: `android/app/build/outputs/apk/debug/app-debug.apk`.

Or build directly via CLI:
```bash
cd android
./gradlew assembleDebug
```

---

## 🚀 Running Locally

```bash
# Install dependencies
npm install

# Start Vite development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```
