import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import PageContainer from '../../components/layout/PageContainer';
import LocationCard from '../../components/location/LocationCard';
import LocationIllustration from '../../components/location/LocationIllustration';
import LoadingIndicator from '../../components/location/LoadingIndicator';
import IndiaBackdrop from '../Landing/IndiaBackdrop';
import { ROUTES } from '../../constants/routes';
import { LocationContext } from '../../context/LocationContext';

/**
 * LocatingPage Component (Route: /locating)
 * Calm loading screen showing animated location pin and status indicators
 * before automatically redirecting to /nearby after ~2.2s.
 */
export const LocatingPage = () => {
  const navigate = useNavigate();
  const { location } = useContext(LocationContext);

  useEffect(() => {
    // Automatically navigate to /nearby after 2.2 seconds
    const timer = setTimeout(() => {
      navigate(ROUTES.NEARBY);
    }, 2200);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <PageContainer maxWidth="max-w-4xl" padding="px-4 py-8 md:py-16 flex items-center justify-center min-h-[calc(100vh-5rem)]">
      <IndiaBackdrop />

      <div className="relative z-10 w-full flex flex-col items-center justify-center my-auto py-6">
        <LocationCard maxWidth="max-w-[500px]">
          {/* Animated Pin Illustration */}
          <LocationIllustration />

          {/* Heading */}
          <h1 className="font-editorial text-3xl sm:text-4xl font-bold text-text-primary tracking-tight leading-tight mb-3">
            Finding Fashion Destinations
          </h1>

          {/* Subtitle */}
          <p className="text-xs sm:text-sm text-text-muted font-normal max-w-sm mx-auto leading-relaxed mb-6">
            Discovering iconic regional fashion stores and verified shopping hubs near{' '}
            <span className="font-semibold text-text-primary">
              {location?.city || 'Hyderabad'}, {location?.state || 'Telangana'}
            </span>
          </p>

          {/* Location Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface border border-border shadow-subtle text-xs font-semibold text-text-primary mb-8">
            <span className="text-primary">📍</span>
            <span>{location?.city || 'Hyderabad'}, {location?.state || 'Telangana'}</span>
          </div>

          {/* Loading Indicator */}
          <LoadingIndicator duration={2200} />
        </LocationCard>
      </div>
    </PageContainer>
  );
};

export default LocatingPage;
