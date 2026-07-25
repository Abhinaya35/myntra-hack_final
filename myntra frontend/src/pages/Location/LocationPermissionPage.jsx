import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Navigation,
  Compass,
  AlertCircle,
  Loader2,
  MapPin,
  Home,
  Briefcase,
  HelpCircle,
  X
} from 'lucide-react';
import PageContainer from '../../components/layout/PageContainer';
import LocationCard from '../../components/location/LocationCard';
import LocationIllustration from '../../components/location/LocationIllustration';
import LocationButton from '../../components/location/LocationButton';
import IndiaBackdrop from '../Landing/IndiaBackdrop';
import { ROUTES } from '../../constants/routes';
import { LocationContext } from '../../context/LocationContext';
import addressService from '../../services/addressService';
import locationService from '../../services/locationService';

/**
 * LocationPermissionPage Component (Route: /location-permission)
 * Prompts user to grant location access or choose from saved addresses.
 */
export const LocationPermissionPage = () => {
  const navigate = useNavigate();
  const { requestCurrentLocation, loadNearbyStores, loading, error: contextError } = useContext(LocationContext);

  // Saved addresses state
  const [addresses, setAddresses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fetchingAddresses, setFetchingAddresses] = useState(false);
  const [geocoding, setGeocoding] = useState(false);
  const [geocodingError, setGeocodingError] = useState(null);

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

  const handleOpenSavedAddresses = async () => {
    setFetchingAddresses(true);
    setGeocodingError(null);
    try {
      const data = await addressService.fetchAddresses();
      // Ensure data is array
      setAddresses(Array.isArray(data) ? data : []);
      setIsModalOpen(true);
    } catch (err) {
      console.error('Failed to load saved addresses:', err);
      const errMsg = err?.message || err?.detail || 'Failed to fetch saved addresses. Please ensure you are logged in.';
      setGeocodingError(errMsg);
      // Briefly show error on permission card if modal isn't open yet
      setIsModalOpen(true); // Open modal anyway to show error view/feedback
    } finally {
      setFetchingAddresses(false);
    }
  };

  const formatAddress = (addr) => {
    const parts = [
      addr.houseNumber,
      addr.street,
      addr.landmark,
      addr.city,
      addr.state,
      addr.pincode,
      addr.country
    ];
    return parts.filter(pt => pt && pt.trim() !== '').join(', ');
  };

  const getLabelIcon = (label) => {
    switch (label?.toLowerCase()) {
      case 'home':
        return Home;
      case 'work':
      case 'office':
        return Briefcase;
      default:
        return HelpCircle;
    }
  };

  const handleSelectAddress = async (addr) => {
    const addressStr = formatAddress(addr);
    if (!addressStr) {
      setGeocodingError("Address is empty. Please select another saved address.");
      return;
    }

    setGeocoding(true);
    setGeocodingError(null);

    try {
      // 1. Geocode raw address string using the updated POST /address/geocode backend
      const response = await locationService.geocode(addressStr);

      const { latitude, longitude } = response;
      if (!latitude || !longitude) {
        throw new Error("Could not extract coordinates from address.");
      }

      // 2. Call the shared loadNearbyStores function on context
      await loadNearbyStores(
        latitude,
        longitude,
        () => {
          // On success, navigate to the unified locating screen (which redirects to /nearby)
          navigate(ROUTES.LOCATING);
        },
        (err) => {
          console.warn('[LocationPermissionPage] loadNearbyStores failed:', err);
          setGeocodingError("We couldn't locate this address. Please choose another saved address.");
          setGeocoding(false);
        }
      );
    } catch (err) {
      console.error('Geocoding error:', err);
      setGeocodingError("We couldn't locate this address. Please choose another saved address.");
      setGeocoding(false);
    }
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
            Detect your location or pick a saved delivery address to discover regional fashion collections and trusted store hubs around you.
          </p>

          {/* Error Banner Callout for GPS lookup failures */}
          {contextError && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-3.5 rounded-2xl bg-red-500/10 border border-red-500/30 text-xs font-medium text-red-500 flex items-center gap-2 text-left"
            >
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{contextError}</span>
            </motion.div>
          )}

          {/* Actions */}
          <div className="space-y-3.5 max-w-xs sm:max-w-sm mx-auto w-full">
            <LocationButton
              onClick={handleUseCurrentLocation}
              variant="primary"
              icon={loading ? Loader2 : Navigation}
              disabled={loading || fetchingAddresses || geocoding}
            >
              {loading ? 'Detecting Location...' : 'Use Current Location'}
            </LocationButton>

            {/* OR styling */}
            <div className="flex items-center justify-center py-1">
              <div className="border-t border-border/80 flex-grow"></div>
              <span className="px-3.5 text-[10px] sm:text-xs uppercase font-bold text-text-muted tracking-widest select-none">OR</span>
              <div className="border-t border-border/80 flex-grow"></div>
            </div>

            <LocationButton
              onClick={handleOpenSavedAddresses}
              variant="primary"
              icon={fetchingAddresses ? Loader2 : MapPin}
              disabled={loading || fetchingAddresses || geocoding}
            >
              {fetchingAddresses ? 'Fetching Saved Addresses...' : 'Choose from Saved Addresses'}
            </LocationButton>
          </div>
        </LocationCard>
      </div>

      {/* Saved Addresses Modal popup */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="bg-surface border border-border/85 rounded-3xl w-full max-w-md overflow-hidden flex flex-col shadow-2xl relative"
            >
              {/* Modal Header */}
              <div className="px-6 py-5 border-b border-border/60 flex items-center justify-between">
                <div>
                  <h3 className="font-editorial text-xl font-bold text-text-primary">
                    Select Saved Address
                  </h3>
                  <p className="text-[11px] text-text-muted mt-0.5 font-normal">
                    Choose one to extract coordinates and scan nearby stores
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="p-1.5 rounded-full hover:bg-neutral-100 text-text-muted hover:text-text-primary transition-colors cursor-pointer"
                  disabled={geocoding}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6 max-h-[350px] overflow-y-auto space-y-3.5">
                {geocodingError && (
                  <div className="p-3.5 rounded-2xl bg-red-500/10 border border-red-500/30 text-xs font-medium text-red-500 flex items-center gap-2 mb-2 text-left animate-pulse">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{geocodingError}</span>
                  </div>
                )}

                {addresses.length === 0 ? (
                  <div className="py-10 text-center text-text-muted text-xs font-normal">
                    <MapPin className="w-8 h-8 mx-auto text-neutral-300 mb-3" />
                    <p className="font-semibold text-text-primary">No addresses registered</p>
                    <p className="mt-1 text-[11px]">Add store delivery addresses in your Profile to use this flow.</p>
                  </div>
                ) : (
                  addresses.map((addr) => {
                    const fullAddress = formatAddress(addr);
                    const IconComponent = getLabelIcon(addr.label);
                    return (
                      <button
                        key={addr.id || addr._id}
                        type="button"
                        onClick={() => handleSelectAddress(addr)}
                        className="w-full p-4 rounded-2xl border border-border/80 hover:border-primary/50 bg-background text-left transition-all hover:bg-stone-50/50 flex gap-3 relative cursor-pointer group"
                        disabled={geocoding}
                      >
                        <div className="p-2 rounded-xl bg-neutral-100 shrink-0 text-text-muted mt-0.5 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                          <IconComponent className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0 pr-4">
                          <div className="flex items-center gap-2 mb-1.5">
                            <span className="text-xs font-bold text-text-primary group-hover:text-primary transition-colors">
                              {addr.label || 'Address'}
                            </span>
                            {addr.isDefault && (
                              <span className="inline-flex items-center px-1.5 py-0.5 rounded-md text-[9px] font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-200/60 leading-none">
                                Default
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] leading-relaxed text-text-muted break-words">
                            {fullAddress}
                          </p>
                        </div>
                      </button>
                    );
                  })
                )}
              </div>

              {/* Geocoding Overlay Loading State */}
              {geocoding && (
                <div className="absolute inset-0 bg-surface/90 flex flex-col items-center justify-center z-10 transition-opacity">
                  <div className="p-4 rounded-full bg-primary/10 animate-bounce mb-3">
                    <Loader2 className="w-8 h-8 text-primary animate-spin" />
                  </div>
                  <p className="text-xs font-bold text-text-primary">
                    Finding nearby fashion destinations...
                  </p>
                  <p className="text-[10px] text-text-muted mt-1 leading-normal">
                    Scanning regional retail stores & shopping hubs
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </PageContainer>
  );
};

export default LocationPermissionPage;
