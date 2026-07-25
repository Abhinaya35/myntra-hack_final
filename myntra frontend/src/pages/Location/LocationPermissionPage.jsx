import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Navigation, Compass, AlertCircle, Loader2 } from 'lucide-react';
import PageContainer from '../../components/layout/PageContainer';
import LocationCard from '../../components/location/LocationCard';
import LocationIllustration from '../../components/location/LocationIllustration';
import LocationButton from '../../components/location/LocationButton';
import IndiaBackdrop from '../Landing/IndiaBackdrop';
import { ROUTES } from '../../constants/routes';
import { LocationContext } from '../../context/LocationContext';

/**
 * LocationPermissionPage Component (Route: /location-permission)
 * Prompts user to grant location access or pick a city manually.
 * Connects directly to browser Geolocation API and POST /address/reverse-geocode.
 */
export const LocationPermissionPage = () => {
  const navigate = useNavigate();
  const { requestCurrentLocation, loading, error } = useContext(LocationContext);

  const handleUseCurrentLocation = () => {
    requestCurrentLocation(
      () => {
        // On successful location resolution, navigate to Locating loading screen
        navigate(ROUTES.LOCATING);
      },
      (errMessage) => {
        console.warn('[LocationPermissionPage] Geolocation error:', errMessage);
      }
    );
  };

  const handleChooseCity = () => {
    navigate(ROUTES.CHOOSE_CITY);
  };

  return (
    <PageContainer maxWidth="max-w-4xl" padding="px-4 py-8 md:py-16 flex items-center justify-center min-h-[calc(100vh-5rem)]">
      <IndiaBackdrop />

      <div className="relative z-10 w-full flex flex-col items-center justify-center my-auto py-6">
        <LocationCard maxWidth="max-w-[520px]">
          {/* Animated Pin Illustration */}
          <LocationIllustration />

          {/* Heading */}
          <h1 className="font-editorial text-3xl sm:text-4xl font-bold text-text-primary tracking-tight leading-tight mb-3">
            Find Fashion Near You
          </h1>

          {/* Subtitle */}
          <p className="text-xs sm:text-sm text-text-muted font-normal max-w-md mx-auto leading-relaxed mb-6">
            Allow location access to discover trusted regional fashion stores, iconic shopping hubs, and authentic collections around you.
          </p>

          {/* Error Banner Callout (Permission Denied / Geolocation Unavailable) */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-3.5 rounded-2xl bg-red-500/10 border border-red-500/30 text-xs font-medium text-red-500 flex items-center gap-2 text-left"
            >
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </motion.div>
          )}

          {/* Actions */}
          <div className="space-y-3 max-w-sm mx-auto">
            <LocationButton
              onClick={handleUseCurrentLocation}
              variant="primary"
              icon={loading ? Loader2 : Navigation}
              disabled={loading}
            >
              {loading ? 'Detecting Location...' : 'Use Current Location'}
            </LocationButton>

            <LocationButton
              onClick={handleChooseCity}
              variant="secondary"
              icon={Compass}
              disabled={loading}
            >
              Choose City Instead
            </LocationButton>
          </div>
        </LocationCard>
      </div>
    </PageContainer>
  );
};

export default LocationPermissionPage;
