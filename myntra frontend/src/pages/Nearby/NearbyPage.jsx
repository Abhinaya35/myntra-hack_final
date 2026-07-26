import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, RefreshCw, AlertCircle } from 'lucide-react';
import PageContainer from '../../components/layout/PageContainer';
import NearbyMap from '../../components/map/NearbyMap';
import StoreDiscoveryPanel from '../../components/nearby/StoreDiscoveryPanel';
import { LocationContext } from '../../context/LocationContext';
import { ROUTES } from '../../constants/routes';
import storeService from '../../services/storeService';

/**
 * Nearby Discovery Screen (Route: /nearby)
 * Features an interactive editorial map on the left and a store panel on the right.
 */
export const NearbyPage = () => {
  const [hoveredStoreId, setHoveredStoreId] = useState(null);
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(null);
  const { location, error: locationError } = useContext(LocationContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (location?.latitude && location?.longitude) {
      setLoading(true);
      setApiError(null);
      // radius=150 as the default value whenever the frontend calls the Nearby Stores API
      console.log('Nearby API URL will be built with radius=150');
      console.log('Latitude being sent:', location.latitude);
      console.log('Longitude being sent:', location.longitude);
      storeService.getNearbyStores(location.latitude, location.longitude, 150)
        .then((data) => {
          // Map to structure expected by NearbyMap and StoreDiscoveryPanel
          const mappedStores = data.map((apiStore) => {
            const dist = Number(apiStore.distance_km);
            const distance = isNaN(dist) ? '' : `${dist.toFixed(1).replace(/\.0$/, '')} km away`;
            return {
              id: apiStore.id || apiStore._id,
              name: apiStore.name,
              image: apiStore.logo_image || 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=400&q=80',
              lat: apiStore.latitude,
              lng: apiStore.longitude,
              isVerified: apiStore.is_verified,
              distance,
              city: apiStore.city,
              state: apiStore.state,
              fallbackGradient: 'from-amber-100/80 via-rose-100/60 to-purple-100/80',
              link: `/store/${apiStore.id || apiStore._id}`
            };
          });
          setStores(mappedStores);
          setLoading(false);
        })
        .catch((err) => {
          console.error('[NearbyPage] Failed to fetch nearby stores:', err);
          setApiError(err.message || 'Failed to fetch nearby stores.');
          setLoading(false);
          setStores([]);
        });
    }
  }, [location?.latitude, location?.longitude]);

  const handleChangeLocation = () => {
    navigate(ROUTES.LOCATION_PERMISSION);
  };

  const hasError = locationError || apiError;

  return (
    <PageContainer maxWidth="max-w-7xl" padding="px-4 sm:px-6 lg:px-8 py-6 md:py-10">

      {/* 1. Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="mb-8 space-y-3"
      >
        {/* Location Pill & Change Location Action */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface border border-border shadow-subtle text-xs font-semibold text-text-primary">
            <span className="text-primary">📍</span>
            <span>{location?.city || 'Detecting Location...'}, {location?.state || ''}</span>
          </div>

          <button
            type="button"
            onClick={handleChangeLocation}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-background border border-border/80 text-xs font-semibold text-primary hover:bg-surface hover:border-primary/40 transition-colors shadow-subtle cursor-pointer"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Change Location</span>
          </button>
        </div>

        {/* Page Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-editorial font-bold text-text-primary tracking-tight leading-tight">
          Trusted Fashion Near You
        </h1>

        {/* Page Subtitle */}
        <p className="text-sm sm:text-base text-text-muted max-w-2xl font-normal leading-relaxed">
          Discover verified regional fashion stores and iconic shopping hubs around{' '}
          <span className="font-semibold text-text-primary">
            {location?.city || 'your location'}
          </span>.
        </p>

        {/* Error Block */}
        {hasError && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-3.5 rounded-2xl bg-red-500/10 border border-red-500/30 text-xs font-medium text-red-500 flex items-center gap-2 text-left max-w-2xl"
          >
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{locationError || apiError}</span>
          </motion.div>
        )}
      </motion.div>

      {/* 2. Main Content Grid: Responsive Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

        {/* Left Column (Desktop 65% / 8 Cols): Interactive Map Container */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15, ease: 'easeOut' }}
          className="lg:col-span-8 w-full h-[380px] sm:h-[450px] md:h-[540px]"
        >
          <NearbyMap
            activeStoreId={hoveredStoreId}
            center={location?.latitude && location?.longitude ? [location.latitude, location.longitude] : [17.3850, 78.4867]}
            zoom={10}
            stores={stores}
          />
        </motion.div>

        {/* Right Column (Desktop 35% / 4 Cols): Nearby Stores Panel */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3, ease: 'easeOut' }}
          className="lg:col-span-4 w-full h-[380px] sm:h-[450px] md:h-[540px]"
        >
          {loading ? (
            <div className="w-full h-full bg-surface border border-border/80 rounded-3xl shadow-card p-6 flex flex-col items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              <p className="text-xs text-text-muted mt-3">Loading nearby destinations...</p>
            </div>
          ) : (
            <StoreDiscoveryPanel
              stores={stores}
              hoveredStoreId={hoveredStoreId}
              onHoverStore={setHoveredStoreId}
            />
          )}
        </motion.div>

      </div>

    </PageContainer>
  );
};

export default NearbyPage;
