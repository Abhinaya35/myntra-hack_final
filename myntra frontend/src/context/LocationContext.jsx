import React, { createContext, useState } from 'react';
import locationService from '../services/locationService';

/**
 * LocationContext
 * Manages user geographical state, browser geolocation, and FastAPI reverse-geocoding API integration.
 */
export const LocationContext = createContext({
  location: {
    city: 'Hyderabad',
    state: 'Telangana',
    pincode: '500001',
    formattedAddress: 'Hyderabad, Telangana, India',
    latitude: 17.385044,
    longitude: 78.486671,
  },
  latitude: 17.385044,
  longitude: 78.486671,
  city: 'Hyderabad',
  state: 'Telangana',
  pincode: '500001',
  formattedAddress: 'Hyderabad, Telangana, India',
  source: 'default', // 'gps' | 'manual' | 'default'
  loading: false,
  error: null,
  permission: 'prompt', // 'prompt' | 'granted' | 'denied'
  requestCurrentLocation: () => {},
  selectCity: () => {},
  changeLocation: () => {},
  clearLocation: () => {},
});

export const LocationProvider = ({ children }) => {
  const [location, setLocationState] = useState({
    city: 'Hyderabad',
    state: 'Telangana',
    pincode: '500001',
    formattedAddress: 'Hyderabad, Telangana, India',
    latitude: 17.385044,
    longitude: 78.486671,
  });

  const [source, setSource] = useState('default');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [permission, setPermission] = useState('prompt');

  /**
   * Request browser geolocation and invoke FastAPI reverse-geocoding endpoint
   * POST /address/reverse-geocode { latitude, longitude }
   */
  const requestCurrentLocation = (onSuccess, onError) => {
    if (!navigator.geolocation) {
      const errMsg = 'Geolocation is not supported by your browser.';
      setError(errMsg);
      if (onError) onError(errMsg);
      return;
    }

    setLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        try {
          // Call FastAPI Reverse Geocoding API
          const response = await locationService.reverseGeocode(lat, lng);

          const resolvedLocation = {
            city: response.city || 'Hyderabad',
            state: response.state || 'Telangana',
            pincode: response.pincode || '',
            formattedAddress: response.formatted_address || response.display_name || `${lat.toFixed(4)}, ${lng.toFixed(4)}`,
            latitude: response.latitude ?? lat,
            longitude: response.longitude ?? lng,
          };

          setLocationState(resolvedLocation);
          setSource('gps');
          setPermission('granted');
          setError(null);
          setLoading(false);

          if (onSuccess) onSuccess(resolvedLocation);
        } catch (apiErr) {
          console.warn('[LocationContext] Reverse geocode API call returned error:', apiErr.message);

          // If unauthenticated or network error, fallback gracefully with GPS coordinates
          const fallbackLocation = {
            city: location.city || 'Hyderabad',
            state: location.state || 'Telangana',
            pincode: '',
            formattedAddress: `Lat: ${lat.toFixed(4)}, Lng: ${lng.toFixed(4)}`,
            latitude: lat,
            longitude: lng,
          };

          setLocationState(fallbackLocation);
          setSource('gps');
          setPermission('granted');
          
          // Log user-facing error message if required by unauthenticated state
          const errDetail = apiErr.status === 401
            ? 'Reverse geocoding requires login. Using coordinates.'
            : (apiErr.message || 'Reverse geocoding lookup failed.');
          setError(errDetail);
          setLoading(false);

          if (onSuccess) onSuccess(fallbackLocation);
        }
      },
      (geoError) => {
        let errMsg = 'Unable to retrieve location.';
        switch (geoError.code) {
          case geoError.PERMISSION_DENIED:
            errMsg = 'Location permission denied. Please allow location access or choose a city manually.';
            break;
          case geoError.POSITION_UNAVAILABLE:
            errMsg = 'Location information is unavailable.';
            break;
          case geoError.TIMEOUT:
            errMsg = 'Location request timed out. Please try again.';
            break;
          default:
            errMsg = geoError.message || 'Location error occurred.';
            break;
        }

        setError(errMsg);
        setPermission('denied');
        setLoading(false);

        if (onError) onError(errMsg);
      },
      { timeout: 12000, enableHighAccuracy: true }
    );
  };

  /**
   * Set user selected city manually
   */
  const selectCity = (cityData, onSuccess) => {
    const selectedLocation = {
      city: cityData.name || cityData.city,
      state: cityData.state || 'India',
      pincode: cityData.pincode || '',
      formattedAddress: `${cityData.name || cityData.city}, ${cityData.state || 'India'}`,
      latitude: cityData.latitude || 17.385044,
      longitude: cityData.longitude || 78.486671,
    };

    setLocationState(selectedLocation);
    setSource('manual');
    setPermission('granted');
    setError(null);
    setLoading(false);

    if (onSuccess) onSuccess(selectedLocation);
  };

  const changeLocation = () => {
    setPermission('prompt');
    setError(null);
  };

  const clearLocation = () => {
    setLocationState({
      city: 'Hyderabad',
      state: 'Telangana',
      pincode: '500001',
      formattedAddress: 'Hyderabad, Telangana, India',
      latitude: 17.385044,
      longitude: 78.486671,
    });
    setSource('default');
    setPermission('prompt');
    setError(null);
    setLoading(false);
  };

  return (
    <LocationContext.Provider
      value={{
        location,
        latitude: location.latitude,
        longitude: location.longitude,
        city: location.city,
        state: location.state,
        pincode: location.pincode,
        formattedAddress: location.formattedAddress,
        source,
        loading,
        error,
        permission,
        requestCurrentLocation,
        selectCity,
        changeLocation,
        clearLocation,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};

export default LocationProvider;
