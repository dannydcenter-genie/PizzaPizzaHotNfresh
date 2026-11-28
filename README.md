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

## 📱 Mobile App (PWA) & Native Android APKs

### 1. Ready-to-Install Android APKs (Pre-built & Hosted)
Official, release-signed APKs with direct high-speed download links:

* **🍕 Customer App APK** (10 MB):
  - **[Direct GitHub Release Download](https://github.com/dannydcenter-genie/PizzaPizzaHotNfresh/releases/download/v1.0.0/PizzaPizza-Customer.apk)**
  - Local Path: [`release-apks/PizzaPizza-Customer.apk`](file:///c:/Users/amdan/Downloads/PizzaPizzaHotNfresh/release-apks/PizzaPizza-Customer.apk)
  - Package: `com.pizzapizza.customer` • Version 1.0 (Release)
  - Features: Gen-Z dark neon UI, pizza customizer, WhatsApp & COD checkout, live order tracker, VIP promotional updates.
* **👨‍🍳 Admin & KDS App APK** (10 MB):
  - **[Direct GitHub Release Download](https://github.com/dannydcenter-genie/PizzaPizzaHotNfresh/releases/download/v1.0.0/PizzaPizza-KDS-Admin.apk)**
  - Local Path: [`release-apks/PizzaPizza-KDS-Admin.apk`](file:///c:/Users/amdan/Downloads/PizzaPizzaHotNfresh/release-apks/PizzaPizza-KDS-Admin.apk)
  - Package: `com.pizzapizza.admin` • Version 1.0 (Release)
  - Features: Boots directly into the Kitchen Display System (KDS), menu availability switches, rate editing, and guest customer database.

### 2. How to Sideload & Install APK on Android:
1. Tap the direct release download link above in Chrome or your phone browser.
2. Wait for download to complete (~10 MB).
3. Open your phone's native **Files** or **Downloads** app and tap the `.apk`.
4. Allow "Install unknown apps" from this source if prompted, then tap **Install**.

### 3. Rebuilding APKs via CLI:
```bash
# Rebuild web bundle and sync to Android
npm run build
npx cap sync

# Build both flavors in one command
cd android
.\gradlew assembleDebug

# Or build individually:
.\gradlew assembleCustomerDebug   # Builds Customer APK
.\gradlew assembleAdminDebug      # Builds KDS Admin APK
```
Output APKs:
* `android/app/build/outputs/apk/customer/debug/app-customer-debug.apk`
* `android/app/build/outputs/apk/admin/debug/app-admin-debug.apk`

### 4. Progressive Web App (Instant Zero-Install):
1. Open the website on Chrome (Android) or Safari (iOS).
2. Tap the **"Get App"** button in the header or tap browser menu (⋮) -> **"Install App"** / **"Add to Home Screen"**.

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
