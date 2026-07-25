import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShieldCheck, MapPin, ArrowRight, Sparkles } from 'lucide-react';
import { cn } from '../../utils/cn';

/**
 * Temporary mock data for 5 trusted nearby fashion stores.
 * Matches coordinates defined in NearbyMap (dest-1 to dest-5).
 */
export const MOCK_NEARBY_STORES = [
  {
    id: 'dest-1',
    name: 'Rajkamal Sarees',
    hubName: 'Abids Fashion Hub',
    distance: '1.8 km away',
    isVerified: true,
    badgeText: 'Verified Regional',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=400&q=80',
    fallbackGradient: 'from-amber-100/80 via-rose-100/60 to-purple-100/80',
    link: '/store/dest-1',
  },
  {
    id: 'dest-2',
    name: "Neeru's Couture",
    hubName: 'Banjara Hills Hub',
    distance: '2.4 km away',
    isVerified: true,
    badgeText: 'Verified Regional',
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=400&q=80',
    fallbackGradient: 'from-rose-100/80 via-purple-100/60 to-pink-100/80',
    link: '/store/dest-2',
  },
  {
    id: 'dest-3',
    name: 'Kalanjali Silks',
    hubName: 'Charminar Cultural Hub',
    distance: '3.1 km away',
    isVerified: true,
    badgeText: 'Verified Regional',
    image: 'https://images.unsplash.com/photo-1596783074918-c84cb06531ca?auto=format&fit=crop&w=400&q=80',
    fallbackGradient: 'from-orange-100/80 via-amber-100/60 to-red-100/80',
    link: '/store/dest-3',
  },
  {
    id: 'dest-4',
    name: "Singhania's Fine Fabrics",
    hubName: 'Jubilee Hills Fashion District',
    distance: '4.2 km away',
    isVerified: true,
    badgeText: 'Verified Regional',
    image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=400&q=80',
    fallbackGradient: 'from-emerald-100/80 via-teal-100/60 to-cyan-100/80',
    link: '/store/dest-4',
  },
  {
    id: 'dest-5',
    name: 'Taruni Ethnic Studio',
    hubName: 'Madhapur Fashion Hub',
    distance: '5.0 km away',
    isVerified: true,
    badgeText: 'Verified Regional',
    image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=400&q=80',
    fallbackGradient: 'from-purple-100/80 via-indigo-100/60 to-rose-100/80',
    link: '/store/dest-5',
  },
];

/**
 * Single Store Card Component with editorial layout & smooth hover animations
 */
const DiscoveryStoreCard = ({ store, isHovered, onHoverStart, onHoverEnd }) => {
  const [imgError, setImgError] = React.useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      onMouseEnter={() => onHoverStart(store.id)}
      onMouseLeave={() => onHoverEnd()}
      className={cn(
        "group relative bg-surface border rounded-2xl p-4 transition-all duration-300 flex items-stretch gap-4 cursor-pointer overflow-hidden shrink-0",
        isHovered
          ? "border-primary/50 shadow-elevated bg-surface ring-1 ring-primary/20"
          : "border-border/80 shadow-subtle hover:shadow-card hover:border-border"
      )}
    >
      {/* 1. Small Preview Image / Neutral Gradient (No Logos) */}
      <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden shrink-0 bg-slate-100">
        {!imgError ? (
          <img
            src={store.image}
            alt={store.name}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className={cn("w-full h-full bg-gradient-to-br flex items-center justify-center p-2 text-center", store.fallbackGradient)}>
            <Sparkles className="w-5 h-5 text-primary/40" />
          </div>
        )}

        {/* Subtle overlay gradient on image */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* 2. Store Details */}
      <div className="flex-1 flex flex-col justify-between py-0.5 min-w-0">
        <div className="space-y-1.5">
          {/* Top Badges: Trust Badge & Distance */}
          <div className="flex items-center justify-between gap-2 text-xs flex-wrap">
            {/* Trust Badge */}
            {store.isVerified && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-[11px] font-semibold text-primary">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Verified Regional</span>
              </span>
            )}

            {/* Distance Indicator */}
            <span className="inline-flex items-center gap-1 text-[11px] font-medium text-text-muted shrink-0">
              <MapPin className="w-3 h-3 text-primary/70" />
              <span>{store.distance}</span>
            </span>
          </div>

          {/* Store Name */}
          <h3 className="font-editorial text-lg sm:text-xl font-bold text-text-primary group-hover:text-primary transition-colors line-clamp-1 leading-snug">
            {store.name}
          </h3>

          {/* City, State */}
          <p className="text-xs text-text-muted font-medium line-clamp-1">
            {store.city}, {store.state}
          </p>
        </div>

        {/* Bottom CTA */}
        <div className="pt-2 flex items-center justify-between">
          <Link
            to={store.link}
            className="inline-flex items-center gap-1 text-xs font-semibold text-primary group-hover:underline underline-offset-4"
          >
            <span>View Store</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

/**
 * Premium Store Discovery Panel (Right Column)
 */
export const StoreDiscoveryPanel = ({
  stores = MOCK_NEARBY_STORES,
  hoveredStoreId,
  onHoverStore,
  className = '',
}) => {
  return (
    <div
      className={cn(
        "w-full h-full bg-surface border border-border/80 rounded-3xl shadow-card p-5 sm:p-6 flex flex-col justify-between overflow-hidden",
        className
      )}
    >
      {/* Panel Header */}
      <div className="pb-4 mb-4 border-b border-border/60 shrink-0">
        <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-text-primary tracking-tight">
          Nearby Fashion Destinations
        </h2>
        <p className="text-xs sm:text-sm font-medium text-text-muted mt-1 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse inline-block" />
          <span>{stores.length} trusted stores found near you</span>
        </p>
      </div>

      {/* Scrollable Store Cards Container */}
      <div className="flex-1 overflow-y-auto pr-1 space-y-3.5 custom-scrollbar flex flex-col">
        {stores.length > 0 ? (
          stores.map((store) => (
            <DiscoveryStoreCard
              key={store.id}
              store={store}
              isHovered={hoveredStoreId === store.id}
              onHoverStart={(id) => onHoverStore && onHoverStore(id)}
              onHoverEnd={() => onHoverStore && onHoverStore(null)}
            />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center my-auto py-8 px-4 text-center">
            <MapPin className="w-8 h-8 text-primary/40 mb-3" />
            <p className="text-sm font-semibold text-text-primary mb-1">No Fashion Stores Found</p>
            <p className="text-xs text-text-muted leading-relaxed">
              We couldn't find any regional fashion stores within 250km of your location. Try changing your permissions or checking back later.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StoreDiscoveryPanel;
