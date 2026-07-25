import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, RefreshCw } from 'lucide-react';
import PageContainer from '../../components/layout/PageContainer';
import NearbyMap from '../../components/map/NearbyMap';
import StoreDiscoveryPanel from '../../components/nearby/StoreDiscoveryPanel';
import { LocationContext } from '../../context/LocationContext';
import { ROUTES } from '../../constants/routes';

/**
 * Nearby Discovery Screen (Route: /nearby)
 * Features an interactive editorial map on the left and a store panel on the right.
 */
export const NearbyPage = () => {
  const [hoveredStoreId, setHoveredStoreId] = useState(null);
  const { location } = useContext(LocationContext);
  const navigate = useNavigate();

  const handleChangeLocation = () => {
    navigate(ROUTES.LOCATION_PERMISSION);
  };

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
            <span>{location?.city || 'Hyderabad'}, {location?.state || 'Telangana'}</span>
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
            {location?.city || 'Hyderabad'}
          </span>.
        </p>
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
          <NearbyMap activeStoreId={hoveredStoreId} />
        </motion.div>

        {/* Right Column (Desktop 35% / 4 Cols): Nearby Stores Panel */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3, ease: 'easeOut' }}
          className="lg:col-span-4 w-full h-[380px] sm:h-[450px] md:h-[540px]"
        >
          <StoreDiscoveryPanel
            hoveredStoreId={hoveredStoreId}
            onHoverStore={setHoveredStoreId}
          />
        </motion.div>

      </div>

    </PageContainer>
  );
};

export default NearbyPage;
