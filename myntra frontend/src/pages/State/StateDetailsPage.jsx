import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';

// Layout & Component Imports
import PageContainer from '../../components/layout/PageContainer';
import StateBreadcrumb from '../../components/state/StateBreadcrumb';
import StateHero from '../../components/state/StateHero';
import FashionHeritage from '../../components/state/FashionHeritage';
import RegionalSpecialties from '../../components/state/RegionalSpecialties';
import ShoppingHubsSection from '../../components/state/ShoppingHubsSection';
import FeaturedStoresSection from '../../components/state/FeaturedStoresSection';
import StateHighlights from '../../components/state/StateHighlights';
import ExploreCTA from '../../components/state/ExploreCTA';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ErrorState from '../../components/common/ErrorState';

// Service Imports
import exploreService from '../../services/exploreService';
import storeService from '../../services/storeService';
import { getStateData } from '../../data/mockStates';

/**
 * Helper to resolve capitalized State Name from stateId slug (e.g. 'telangana' -> 'Telangana')
 */
const resolveStateName = (stateId) => {
  if (!stateId) return 'Telangana';
  const mockData = getStateData(stateId);
  if (mockData && mockData.name) return mockData.name;

  // Format slug 'andhra-pradesh' -> 'Andhra Pradesh'
  return stateId
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

/**
 * StateDetailsPage Component (Route: /state/:stateId)
 * Fetches Shopping Hubs dynamically from FastAPI backend GET /shopping-hubs?state={StateName}.
 */
export const StateDetailsPage = () => {
  const { stateId } = useParams();
  const stateName = resolveStateName(stateId);
  const staticFallback = getStateData(stateId) || {};

  const [hubs, setHubs] = useState([]);
  const [featuredStores, setFeaturedStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [storesLoading, setStoresLoading] = useState(true);
  const [error, setError] = useState(null);

  // Scroll to top and fetch shopping hubs and stores when stateId changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    fetchStateShoppingHubs();
    fetchStateStores();
  }, [stateId]);

  const fetchStateStores = async () => {
    try {
      setStoresLoading(true);
      const allStores = await storeService.getAllStores();
      const filtered = (allStores || [])
        .filter((store) => store.state?.toLowerCase() === stateName.toLowerCase())
        .map((store) => ({
          id: store._id || store.id,
          name: store.name,
          image: store.banner_image || store.logo_image || 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80',
          hubName: store.city,
          trustedSince: store.years_in_business ? `${2026 - store.years_in_business}` : '1968',
          isVerified: store.is_verified ?? false,
          description: store.description || `${store.name} is a trusted regional fashion boutique in ${store.city}, ${store.state}.`,
        }));
      setFeaturedStores(filtered);
    } catch (err) {
      console.warn('[StateDetailsPage] Failed to fetch featured stores:', err);
    } finally {
      setStoresLoading(false);
    }
  };

  const fetchStateShoppingHubs = async () => {
    try {
      setLoading(true);
      setError(null);

      // Call GET /shopping-hubs?state=Telangana
      const data = await exploreService.getShoppingHubsByState(stateName);

      // Transform backend ShoppingHubCardResponse array for ShoppingHubsSection UI
      const transformedHubs = (data || []).map((hub) => ({
        id: hub._id || hub.id,
        name: hub.name,
        state: hub.state,
        description: hub.description,
        heroImage: hub.cover_image || hub.banner_image || 'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&q=80&w=1000',
        bannerImage: hub.banner_image,
        coverImage: hub.cover_image,
        banner_position: hub.banner_position || hub.bannerPosition,
        bannerPosition: hub.banner_position || hub.bannerPosition,
        verifiedStoresCount: hub.store_count || 0,
        popularCategories: hub.categories || [],
        latitude: hub.latitude,
        longitude: hub.longitude,
        featured: hub.featured,
      }));

      setHubs(transformedHubs);
    } catch (err) {
      console.error(`[StateDetailsPage] Failed to fetch shopping hubs for state '${stateName}':`, err);
      setError(err.message || `Failed to load shopping hubs for ${stateName}. Please try again.`);
    } finally {
      setLoading(false);
    }
  };

  const handleScrollToHubs = () => {
    const section = document.getElementById('primary-shopping-hubs');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <PageContainer maxWidth="max-w-7xl" padding="px-4 sm:px-6 lg:px-8 py-6 md:py-10 pb-24 md:pb-28">
      <div className="space-y-16 sm:space-y-20 md:space-y-24">

        {/* 1. Breadcrumb & 2. State Hero */}
        <div className="space-y-6">
          <StateBreadcrumb stateName={stateName} />
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <StateHero stateData={{ ...staticFallback, name: stateName }} />
          </motion.div>
        </div>

        {/* 3. Fashion Heritage */}
        {staticFallback.heritage && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <FashionHeritage heritage={staticFallback.heritage} stateName={stateName} />
          </motion.section>
        )}

        {/* 4. Regional Specialties */}
        {staticFallback.specialties && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <RegionalSpecialties specialties={staticFallback.specialties} />
          </motion.section>
        )}

        {/* 5. Popular Shopping Hubs (PRIMARY VISUAL FOCUS - FETCHED FROM BACKEND API) */}
        <motion.section
          id="primary-shopping-hubs"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          {loading && (
            <div className="py-16 flex justify-center">
              <LoadingSpinner size="lg" message={`Fetching verified shopping hubs for ${stateName}...`} />
            </div>
          )}

          {error && !loading && (
            <div className="py-8">
              <ErrorState
                title={`Failed to load ${stateName} Shopping Hubs`}
                message={error}
                onRetry={fetchStateShoppingHubs}
              />
            </div>
          )}

          {!loading && !error && (
            <ShoppingHubsSection hubs={hubs} stateName={stateName} />
          )}
        </motion.section>

        {/* 6. Featured Regional Fashion Icons */}
        {!storesLoading && featuredStores.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <FeaturedStoresSection stores={featuredStores} stateName={stateName} />
          </motion.section>
        )}

        {/* 7. State Highlights */}
        {staticFallback.stats && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <StateHighlights stats={staticFallback.stats} stateName={stateName} />
          </motion.section>
        )}

        {/* 8. Explore Shopping Hubs CTA */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <ExploreCTA stateName={stateName} onScrollToHubs={handleScrollToHubs} />
        </motion.section>

      </div>
    </PageContainer>
  );
};

export default StateDetailsPage;
