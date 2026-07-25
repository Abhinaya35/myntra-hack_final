import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, useMap, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, MapPin, ArrowRight, Sparkles, X } from 'lucide-react';
import { cn } from '../../utils/cn';

// Mock dataset for destination stores with map coordinates & display info
export const DESTINATION_STORES = [
  {
    id: 'dest-1',
    name: 'Rajkamal Sarees',
    hubName: 'Abids Fashion Hub',
    distance: '1.8 km away',
    isVerified: true,
    badgeText: 'Verified Regional',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=400&q=80',
    fallbackGradient: 'from-amber-100/80 via-rose-100/60 to-purple-100/80',
    lat: 17.4319,
    lng: 78.4071,
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
    lat: 17.4156,
    lng: 78.4347,
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
    lat: 17.3616,
    lng: 78.4747,
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
    lat: 17.4447,
    lng: 78.4664,
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
    lat: 17.4486,
    lng: 78.3808,
  },
];

// Custom User Location Pin Icon (Primary color #C2185B with slow pulsing halo)
const createUserLocationIcon = () =>
  L.divIcon({
    className: 'custom-user-marker',
    html: `
      <div class="relative flex items-center justify-center w-9 h-9">
        <div class="absolute w-9 h-9 rounded-full bg-[#C2185B]/20 animate-ping" style="animation-duration: 3s;"></div>
        <div class="absolute w-6 h-6 rounded-full bg-[#C2185B]/30 border border-[#C2185B]/40"></div>
        <div class="w-3.5 h-3.5 rounded-full bg-[#C2185B] border-2 border-white shadow-md z-10"></div>
      </div>
    `,
    iconSize: [36, 36],
    iconAnchor: [18, 18],
  });

// Custom Store Destination Marker Icon with Native Floating Pill Label
const createDestinationIcon = (name, isHighlighted = false, isSelected = false) => {
  const activeState = isHighlighted || isSelected;
  return L.divIcon({
    className: `custom-destination-marker ${activeState ? 'is-active' : ''}`,
    html: `
      <div class="relative flex items-center group transition-all duration-300 pointer-events-auto select-none ${isSelected ? 'z-[200]' : isHighlighted ? 'z-[100]' : 'z-10'
      }">
        <!-- 1. Circular Pin Marker -->
        <div class="relative flex items-center justify-center shrink-0 transition-all duration-300 ${activeState ? 'scale-125' : 'scale-100'
      }">
          ${activeState
        ? `<div class="absolute ${isSelected ? 'w-10 h-10 bg-[#C2185B]/40' : 'w-8 h-8 bg-[#C2185B]/25'} rounded-full animate-ping" style="animation-duration: 2s;"></div>`
        : ''
      }
          <div class="w-6 h-6 rounded-full ${activeState
        ? 'bg-[#C2185B] border-2 border-white shadow-elevated'
        : 'bg-white border-2 border-[#C2185B] shadow-subtle'
      } flex items-center justify-center transition-all duration-300">
            <div class="w-2 h-2 rounded-full ${activeState ? 'bg-white' : 'bg-[#C2185B]'}"></div>
          </div>
        </div>

        <!-- 2. Native Floating Store Pill Label -->
        <div class="ml-2 px-3 py-1.5 rounded-full whitespace-nowrap flex items-center gap-1.5 transition-all duration-300 border ${activeState
        ? 'bg-slate-900 text-white border-slate-700 shadow-elevated scale-105 -translate-y-0.5'
        : 'bg-white/95 backdrop-blur-sm text-slate-800 border-slate-200/90 shadow-card hover:border-slate-300'
      }">
          <span class="text-xs ${activeState ? 'text-[#F6C453]' : 'text-[#C2185B]'}">📍</span>
          <span class="text-xs font-semibold tracking-tight ${activeState ? 'text-white' : 'text-slate-800'}">${name}</span>
        </div>
      </div>
    `,
    iconSize: [220, 40],
    iconAnchor: [12, 20],
  });
};

/**
 * Controller component to handle smooth map panning when a store card is hovered or clicked
 */
const MapPanController = ({ targetStoreId, markers }) => {
  const map = useMap();

  useEffect(() => {
    if (targetStoreId) {
      const activeMarker = markers.find((m) => m.id === targetStoreId);
      if (activeMarker) {
        map.panTo([activeMarker.lat, activeMarker.lng], {
          animate: true,
          duration: 0.8,
        });
      }
    }
  }, [targetStoreId, markers, map]);

  return null;
};

/**
 * Click handler on map canvas to dismiss selected store card
 */
const MapEventsHandler = ({ onMapClick }) => {
  useMapEvents({
    click: () => {
      onMapClick();
    },
  });
  return null;
};

/**
 * Custom Floating Information Card component (rendered on map selection)
 */
const MapStorePopupCard = ({ store, onClose }) => {
  const [imgError, setImgError] = useState(false);

  if (!store) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 18, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 12, scale: 0.96 }}
      transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
      onClick={(e) => e.stopPropagation()}
      className="absolute bottom-4 left-4 right-4 sm:left-6 sm:right-auto sm:w-80 z-30 bg-surface/95 backdrop-blur-md border border-border/80 rounded-2xl p-4 shadow-elevated overflow-hidden"
    >
      {/* Header Row */}
      <div className="relative flex items-start gap-3 mb-3">
        {/* Store Thumbnail */}
        <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-slate-100 border border-border/60">
          {!imgError && store.image ? (
            <img
              src={store.image}
              alt={store.name}
              onError={() => setImgError(true)}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className={cn("w-full h-full bg-gradient-to-br flex items-center justify-center", store.fallbackGradient || 'from-rose-100 to-amber-100')}>
              <Sparkles className="w-4 h-4 text-primary/50" />
            </div>
          )}
        </div>

        {/* Details */}
        <div className="flex-1 min-w-0 pr-6">
          <div className="flex items-center gap-1 text-[11px] font-semibold text-primary mb-0.5">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{store.badgeText || 'Verified Regional'}</span>
          </div>
          <h4 className="font-editorial text-lg font-bold text-text-primary truncate leading-tight">
            {store.name}
          </h4>
          <p className="text-xs text-text-muted truncate font-medium mt-0.5">
            {store.hubName}
          </p>
        </div>

        {/* Dismiss Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-0 right-0 p-1.5 rounded-full text-text-muted hover:text-text-primary hover:bg-background transition-colors"
          aria-label="Dismiss details"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Meta Row */}
      <div className="flex items-center justify-between py-2 border-t border-border/60 text-xs">
        <span className="text-text-muted font-medium">Distance</span>
        <span className="inline-flex items-center gap-1 font-semibold text-text-primary">
          <MapPin className="w-3.5 h-3.5 text-primary" />
          <span>{store.distance}</span>
        </span>
      </div>

      {/* Action CTA */}
      <div className="mt-3">
        <Link
          to={`/store/${store.id}`}
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="w-full py-2.5 px-4 rounded-xl bg-primary text-white text-xs font-semibold flex items-center justify-center gap-2 hover:bg-primary-hover shadow-subtle transition-all duration-200 group"
        >
          <span>Explore Store</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
        </Link>
      </div>
    </motion.div>
  );
};

/**
 * Reusable Nearby Map Component for Hyderabad Location Discovery
 */
export const NearbyMap = ({
  center = [17.3850, 78.4867], // Hyderabad, Telangana
  zoom = 11,
  activeStoreId = null,
  className = '',
  stores = DESTINATION_STORES,
}) => {
  const [selectedStoreId, setSelectedStoreId] = useState(null);

  const selectedStore = stores.find((s) => s.id === selectedStoreId);
  const activeTargetId = selectedStoreId || activeStoreId;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={cn(
        "relative w-full h-full rounded-3xl overflow-hidden shadow-card border border-border/80 bg-[#FAFAF8]",
        className
      )}
    >
      <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom={true}
        zoomControl={false}
        className="w-full h-full z-10"
      >
        {/* Dismiss selection when clicking map background */}
        <MapEventsHandler onMapClick={() => setSelectedStoreId(null)} />

        {/* Smooth Map Pan Controller on Hover/Click */}
        <MapPanController targetStoreId={activeTargetId} markers={stores} />

        {/* CartoDB Light Tile Layer - Minimal editorial map theme */}
        <TileLayer
          attribution='&copy; <a href="https://carto.com/">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          subdomains="abcd"
          maxZoom={19}
        />

        {/* 1. Custom User Location Marker */}
        <Marker
          position={center}
          icon={createUserLocationIcon()}
        />

        {/* 2. Custom Store Destination Markers with Native Floating Labels */}
        {stores.map((dest) => {
          const isHighlighted = activeStoreId === dest.id;
          const isSelected = selectedStoreId === dest.id;

          return (
            <Marker
              key={dest.id}
              position={[dest.lat, dest.lng]}
              icon={createDestinationIcon(dest.name, isHighlighted, isSelected)}
              zIndexOffset={isSelected ? 2000 : isHighlighted ? 1000 : 0}
              eventHandlers={{
                click: (e) => {
                  L.DomEvent.stopPropagation(e.originalEvent);
                  setSelectedStoreId(dest.id);
                },
              }}
            />
          );
        })}
      </MapContainer>

      {/* Custom Floating Store Information Card Overlay */}
      <AnimatePresence>
        {selectedStore && (
          <MapStorePopupCard
            key={selectedStore.id}
            store={selectedStore}
            onClose={() => setSelectedStoreId(null)}
          />
        )}
      </AnimatePresence>

      {/* Map Attribution Badge Overlay */}
      <div className="absolute bottom-3 left-3 z-20 px-3 py-1 bg-surface/90 backdrop-blur-md rounded-full border border-border/60 shadow-subtle text-[11px] font-semibold text-text-muted">
        📍 {stores.length} Destinations Discovered Nearby
      </div>
    </motion.div>
  );
};

export default NearbyMap;
