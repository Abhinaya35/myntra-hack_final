import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, ArrowRight } from 'lucide-react';
import IndiaBackdrop from './IndiaBackdrop';
import PageContainer from '../../components/layout/PageContainer';
import { ROUTES } from '../../constants/routes';

/**
 * Onboarding Screen (Route: /)
 * Minimalist, editorial introduction focused on instant location discovery or manual exploration.
 */
export const LandingPage = () => {
  const navigate = useNavigate();

  const handleUseLocation = () => {
    navigate(ROUTES.LOCATION_PERMISSION);
  };

  const handleExploreByState = () => {
    navigate(ROUTES.EXPLORE);
  };

  return (
    <PageContainer maxWidth="max-w-4xl" padding="px-4 py-6 md:py-12 flex items-center justify-center">
      {/* India-inspired ambient backdrop */}
      <IndiaBackdrop />

      {/* Main Viewport Centered Content Card */}
      <div className="relative z-10 w-full max-w-[700px] mx-auto text-center flex flex-col items-center justify-center min-h-[calc(100vh-14rem)]">

        {/* 1. Small Minimal Myntra Brand Badge */}


        {/* 2. Large Editorial Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
          className="text-4xl sm:text-5xl md:text-6xl font-editorial font-bold text-text-primary tracking-tight leading-[1.15] mb-6"
        >
          Discover India's <br />
          <span className="text-primary italic font-normal">Trusted Fashion Destinations</span>
        </motion.h1>

        {/* 3. Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25, ease: 'easeOut' }}
          className="text-base sm:text-lg text-text-muted leading-relaxed max-w-[540px] mb-10 font-normal"
        >
          Find authentic fashion stores, iconic shopping hubs, and regional styles near your location.
        </motion.p>

        {/* 4. Primary CTA: "Use My Location" Button */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4, ease: 'easeOut' }}
          className="w-full flex justify-center mb-6"
        >
          <motion.button
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleUseLocation}
            className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-primary text-white text-base font-semibold rounded-full shadow-lg hover:shadow-xl hover:bg-primary-hover transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-primary/20"
          >
            <MapPin className="w-5 h-5 text-accent shrink-0 transition-transform group-hover:scale-110" />
            <span>Use My Location</span>
          </motion.button>
        </motion.div>

        {/* 5. Secondary CTA: "Explore by State →" Text Link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.55, ease: 'easeOut' }}
        >
          <button
            onClick={handleExploreByState}
            className="group inline-flex items-center gap-1.5 text-sm font-semibold text-text-primary hover:text-primary transition-colors py-2 px-4 focus:outline-none"
          >
            <span>Explore by State</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </motion.div>

      </div>
    </PageContainer>
  );
};

export default LandingPage;
