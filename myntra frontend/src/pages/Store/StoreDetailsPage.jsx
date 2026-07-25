import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';

// Component Imports
import PageContainer from '../../components/layout/PageContainer';
import StoreHero from '../../components/store/StoreHero';
import FeaturedCollections from '../../components/store/FeaturedCollections';
import SignatureProducts from '../../components/store/SignatureProducts';
import StickyActionBar from '../../components/store/StickyActionBar';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ErrorState from '../../components/common/ErrorState';

// Service & Fallback Imports
import storeService from '../../services/storeService';
import { getStoreData } from '../../data/mockStores';

/**
 * StoreDetailsPage Component (Route: /store/:storeId)
 * Integrated with FastAPI Backend:
 * 1. GET /stores/{storeId} (Store Profile Hero)
 * 2. GET /stores/{storeId}/collections (Collections)
 * 3. GET /stores/{storeId}/products?sort=rating (Featured Products)
 */
export const StoreDetailsPage = () => {
  const { storeId } = useParams();

  const [storeData, setStoreData] = useState(null);
  const [collections, setCollections] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Scroll to top and fetch store profile, collections & products
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    fetchStoreData();
  }, [storeId]);

  const fetchStoreData = async () => {
    try {
      setLoading(true);
      setError(null);

      // 1. Fetch store profile from GET /stores/{storeId}
      const apiStore = await storeService.getStoreById(storeId);
      const staticFallback = getStoreData(storeId) || {};

      // Format Store Hero properties
      const formattedStore = {
        id: apiStore._id || apiStore.id || storeId,
        name: apiStore.name,
        city: apiStore.city,
        state: apiStore.state,
        logoImage: apiStore.logo_image || staticFallback.logoImage || 'https://dummyimage.com/150x150/000/fff&text=Store',
        heroBanner: apiStore.banner_image || staticFallback.heroBanner || 'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&q=80&w=1200',
        bannerImage: apiStore.banner_image,
        tagline: apiStore.description || `${apiStore.name} is a trusted regional fashion store in ${apiStore.city}, ${apiStore.state}.`,
        description: apiStore.description,
        trustScore: apiStore.trust_score,
        yearsInBusiness: apiStore.years_in_business,
        trustedSince: apiStore.years_in_business ? `${new Date().getFullYear() - apiStore.years_in_business}` : '1968',
        isVerified: apiStore.is_verified ?? true,
        badgeText: apiStore.is_verified ? 'Verified Regional Icon' : 'Regional Retailer',
        categories: apiStore.categories || [],
        specialties: apiStore.specialties || [],
        address: apiStore.address || `${apiStore.city}, ${apiStore.state}`,
        latitude: apiStore.latitude,
        longitude: apiStore.longitude,
        deliveryAvailable: apiStore.delivery_available ?? true,
        deliveryRadiusKm: apiStore.delivery_radius_km || 15.0,
        supportedStates: apiStore.supported_states || [],
        supportedCities: apiStore.supported_cities || [],
        hubName: apiStore.city,
        hubId: apiStore.city ? apiStore.city.toLowerCase() : 'hyd',
      };

      setStoreData(formattedStore);

      // 2. Fetch Collections and Featured Products in parallel
      try {
        const [collectionsRes, productsRes] = await Promise.all([
          storeService.getStoreCollections(storeId),
          storeService.getStoreProducts(storeId, { sort: 'rating' }),
        ]);

        // Transform backend StoreCollectionResponse: cover_image, collection_name, product_count, description
        const formattedCollections = (collectionsRes || []).map((col, idx) => ({
          id: col.collection_name ? col.collection_name.toLowerCase().replace(/\s+/g, '-') : `col-${idx}`,
          title: col.collection_name,
          collection_name: col.collection_name,
          itemCount: col.product_count,
          product_count: col.product_count,
          coverImage: col.cover_image || 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=800',
          cover_image: col.cover_image,
          description: col.description,
          tag: `${col.product_count} ${col.product_count === 1 ? 'Piece' : 'Pieces'}`,
        }));

        // Transform backend ProductCardResponse: thumbnail, product name, price, discount, rating
        const formattedProducts = (productsRes || []).map((p) => {
          const mainImg = p.thumbnail || p.image || 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=800';
          const pPrice = p.discount_price ?? p.price;
          const origPrice = p.price && p.discount_price && p.price > p.discount_price ? p.price : null;
          const discPct = p.discount_percentage ? `${Math.round(p.discount_percentage)}% OFF` : null;

          return {
            id: p.id || p._id,
            name: p.name,
            thumbnail: mainImg,
            image: mainImg,
            price: `₹${pPrice.toLocaleString('en-IN')}`,
            originalPrice: origPrice ? `₹${origPrice.toLocaleString('en-IN')}` : null,
            discount: discPct,
            rating: p.rating || 4.5,
            category: p.category,
            regionalBadge: p.category || 'Handloom Heritage',
            giTag: 'GI Certified',
            artisanTag: p.brand || 'Local Master Weavers',
          };
        });

        setCollections(formattedCollections);
        setProducts(formattedProducts);
      } catch (childErr) {
        console.warn('[StoreDetailsPage] Error fetching collections or products:', childErr);
      }
    } catch (err) {
      console.error(`[StoreDetailsPage] Failed to fetch store profile for ID '${storeId}':`, err);
      setError(err.message || `Failed to load store profile for ID '${storeId}'. Please try again.`);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <PageContainer maxWidth="max-w-7xl" padding="px-4 sm:px-6 lg:px-8 py-16">
        <div className="py-20 flex justify-center">
          <LoadingSpinner size="lg" message="Loading store profile, collections & products..." />
        </div>
      </PageContainer>
    );
  }

  if (error || !storeData) {
    return (
      <PageContainer maxWidth="max-w-7xl" padding="px-4 sm:px-6 lg:px-8 py-16">
        <ErrorState
          title="Store Profile Not Found"
          message={error || `Could not find store details for ID '${storeId}'.`}
          onRetry={fetchStoreData}
        />
      </PageContainer>
    );
  }

  return (
    <PageContainer maxWidth="max-w-7xl" padding="px-4 sm:px-6 lg:px-8 py-6 md:py-10 pb-24 md:pb-28">
      <div className="space-y-16 sm:space-y-20 md:space-y-24">
        
        {/* SECTION 1: Store Hero (Preserved unchanged) */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <StoreHero store={storeData} />
        </motion.section>

        {/* SECTION 2: Collections (GET /stores/{storeId}/collections) */}
        {collections.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <FeaturedCollections collections={collections} />
          </motion.section>
        )}

        {/* SECTION 3: Featured Products (GET /stores/{storeId}/products?sort=rating) */}
        {products.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <SignatureProducts products={products} />
          </motion.section>
        )}

      </div>

      {/* Sticky Action Bar */}
      <StickyActionBar store={storeData} />
    </PageContainer>
  );
};

export default StoreDetailsPage;
