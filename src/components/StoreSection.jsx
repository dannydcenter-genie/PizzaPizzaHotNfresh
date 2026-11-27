import React from 'react';
import { MapPin, Phone, Star, Clock, Navigation, ExternalLink, Image as ImageIcon, ShieldCheck } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantInfo';

export const StoreSection = ({ onOpenPhotoModal }) => {
  return (
    <section id="store-info" className="py-16 bg-[#0B0D13] relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 space-y-12">
        
        {/* Section Title */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-black uppercase tracking-wider text-cheese-neon bg-cheese-500/10 border border-cheese-500/20 px-3 py-1 rounded-full inline-block">
            VISIT OUR STORE
          </span>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-white">
            Location, Photos & Google Reviews
          </h2>
          <p className="text-sm text-gray-400">
            Real photos, verified Google rating & easy directions to our pure vegetarian kitchen on Canal Road, Dehradun.
          </p>
        </div>

        {/* Real Photos Grid from the User Link */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-extrabold text-lg text-white flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-pizza-red" />
              <span>Actual Storefront & Menu Photos</span>
            </h3>
            <span className="text-xs text-gray-400">Tap any photo to zoom in high-res</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Photo 1: Storefront Exterior */}
            <div
              onClick={() => onOpenPhotoModal(RESTAURANT_INFO.photos.storefront, 'PIZZA PIZZA Storefront Exterior (Canal Rd, Dehradun)')}
              className="glass-card rounded-2xl overflow-hidden border border-white/10 group cursor-pointer relative aspect-[4/3] shadow-lg"
            >
              <img
                src={RESTAURANT_INFO.photos.storefront}
                alt="PIZZA PIZZA Storefront Dehradun"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-4">
                <div className="flex items-center justify-between w-full">
                  <div>
                    <span className="text-[10px] bg-fresh-green text-black font-extrabold px-1.5 py-0.5 rounded uppercase">
                      Exterior
                    </span>
                    <p className="font-bold text-sm text-white mt-1">Storefront Outlet</p>
                    <p className="text-xs text-gray-300">Canal Rd, Chironwali</p>
                  </div>
                  <span className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white text-xs">
                    🔍
                  </span>
                </div>
              </div>
            </div>

            {/* Photo 2: Full Menu Card */}
            <div
              onClick={() => onOpenPhotoModal(RESTAURANT_INFO.photos.menuFull, 'PIZZA PIZZA Official Full Menu Card')}
              className="glass-card rounded-2xl overflow-hidden border border-white/10 group cursor-pointer relative aspect-[4/3] shadow-lg"
            >
              <img
                src={RESTAURANT_INFO.photos.menuFull}
                alt="PIZZA PIZZA Full Menu Card"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-4">
                <div className="flex items-center justify-between w-full">
                  <div>
                    <span className="text-[10px] bg-cheese-neon text-black font-extrabold px-1.5 py-0.5 rounded uppercase">
                      Menu Card
                    </span>
                    <p className="font-bold text-sm text-white mt-1">Full In-Store Menu</p>
                    <p className="text-xs text-gray-300">Pizzas, Crusts & Sides</p>
                  </div>
                  <span className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white text-xs">
                    🔍
                  </span>
                </div>
              </div>
            </div>

            {/* Photo 3: Combos Banner */}
            <div
              onClick={() => onOpenPhotoModal(RESTAURANT_INFO.photos.menuCombos, 'PIZZA PIZZA Official Combos & Offer Banner')}
              className="glass-card rounded-2xl overflow-hidden border border-white/10 group cursor-pointer relative aspect-[4/3] shadow-lg"
            >
              <img
                src={RESTAURANT_INFO.photos.menuCombos}
                alt="PIZZA PIZZA Combos Banner"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-4">
                <div className="flex items-center justify-between w-full">
                  <div>
                    <span className="text-[10px] bg-pizza-red text-white font-extrabold px-1.5 py-0.5 rounded uppercase">
                      Combos Deal
                    </span>
                    <p className="font-bold text-sm text-white mt-1">Value Combos Banner</p>
                    <p className="text-xs text-gray-300">From ₹135 with Drinks</p>
                  </div>
                  <span className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white text-xs">
                    🔍
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Location & Map Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Left: Address, Timing & Contact Cards */}
          <div className="lg:col-span-5 space-y-4 flex flex-col justify-between">
            <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4">
              <div className="flex items-start gap-3">
                <div className="p-3 rounded-2xl bg-pizza-red/10 text-pizza-red border border-pizza-red/20 shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-display font-extrabold text-base text-white">Store Address</h4>
                  <p className="text-xs text-gray-300 mt-1 leading-relaxed">
                    {RESTAURANT_INFO.address}
                  </p>
                  <p className="text-[11px] text-gray-400 mt-1">
                    Landmark: Body Guard, Canal Rd, Chironwali, Dehradun
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-3 border-t border-white/5">
                <div className="p-3 rounded-2xl bg-cheese-500/10 text-cheese-neon border border-cheese-500/20 shrink-0">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-display font-extrabold text-base text-white">Opening Hours</h4>
                  <p className="text-xs text-gray-300 mt-1">
                    {RESTAURANT_INFO.openingHours}
                  </p>
                  <span className="inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-extrabold bg-fresh-green/20 text-fresh-green">
                    Open for Delivery & Dine-in
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-3 border-t border-white/5">
                <div className="p-3 rounded-2xl bg-fresh-green/10 text-fresh-green border border-fresh-green/20 shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-display font-extrabold text-base text-white">Phone / WhatsApp</h4>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {RESTAURANT_INFO.phones.map((p, idx) => (
                      <a
                        key={idx}
                        href={`tel:${p.replace(/\s+/g, '')}`}
                        className="text-xs font-mono font-bold text-cheese-neon hover:underline"
                      >
                        {p}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Google Directions CTA */}
            <div className="flex flex-wrap gap-3">
              <a
                href={RESTAURANT_INFO.googleMapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 px-4 rounded-2xl bg-gradient-to-r from-pizza-red to-pizza-600 hover:from-pizza-600 hover:to-pizza-red text-white font-bold text-xs shadow-lg shadow-pizza-red/30 flex items-center justify-center gap-2 transition-all"
              >
                <Navigation className="w-4 h-4" />
                <span>Get Google Directions</span>
              </a>

              <a
                href={RESTAURANT_INFO.googleMapsShareUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-4 rounded-2xl bg-white/5 hover:bg-white/10 text-gray-300 font-bold text-xs border border-white/10 flex items-center justify-center gap-1.5 transition-all"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Open Google Link</span>
              </a>
            </div>
          </div>

          {/* Right: Embedded Google Map */}
          <div className="lg:col-span-7 glass-panel rounded-3xl overflow-hidden border border-white/10 min-h-[320px] shadow-xl relative">
            <iframe
              title="Pizza Pizza Google Maps Location"
              src={RESTAURANT_INFO.googleMapsEmbedUrl}
              className="w-full h-full min-h-[320px] border-0 filter invert-[90%] hue-rotate-180 contrast-125 opacity-90 hover:opacity-100 transition-opacity"
              loading="lazy"
              allowFullScreen=""
            ></iframe>
            <div className="absolute top-3 left-3 bg-[#11141D]/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 text-xs font-bold text-white shadow-lg pointer-events-none flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-pizza-red animate-ping"></span>
              <span>PIZZA PIZZA • Canal Rd, Dehradun</span>
            </div>
          </div>

        </div>

        {/* Real Customer Google Reviews (4.9 ★) */}
        <div id="reviews" className="space-y-4 pt-6 border-t border-white/5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="font-display font-extrabold text-xl text-white flex items-center gap-2">
                <span>Verified Google Reviews</span>
                <span className="text-yellow-400 flex items-center text-base">
                  <Star className="w-4 h-4 fill-yellow-400" />
                  <strong className="ml-1 text-white">{RESTAURANT_INFO.googleRating}</strong>
                  <span className="text-gray-400 text-xs ml-1">({RESTAURANT_INFO.reviewCount} reviews)</span>
                </span>
              </h3>
              <p className="text-xs text-gray-400">What local foodies say about Pizza Pizza (Hot & Fresh)</p>
            </div>

            <a
              href={RESTAURANT_INFO.googleMapsShareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-cheese-neon hover:underline font-bold flex items-center gap-1"
            >
              <span>Write a Review on Google</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {RESTAURANT_INFO.reviews.map((rev, idx) => (
              <div key={idx} className="glass-card p-4 rounded-2xl border border-white/5 space-y-3 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-pizza-red to-cheese-500 text-black font-extrabold text-xs flex items-center justify-center">
                        {rev.avatar}
                      </div>
                      <span className="font-bold text-xs text-white">{rev.author}</span>
                    </div>
                    <span className="text-[10px] text-gray-400">{rev.date}</span>
                  </div>

                  <div className="flex text-yellow-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-yellow-400" />
                    ))}
                  </div>

                  <p className="text-xs text-gray-300 leading-relaxed italic">
                    "{rev.comment}"
                  </p>
                </div>

                <div className="flex items-center gap-1 text-[10px] text-green-400 font-medium pt-2 border-t border-white/5">
                  <ShieldCheck className="w-3 h-3" />
                  <span>Google Verified Customer</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
