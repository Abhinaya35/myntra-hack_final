import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';

// Component Imports
import PageContainer from '../../components/layout/PageContainer';
import StoreHero from '../../components/store/StoreHero';
import SignatureProducts from '../../components/store/SignatureProducts';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ErrorState from '../../components/common/ErrorState';

// Service & Fallback Imports
import storeService from '../../services/storeService';
import { getStoreData } from '../../data/mockStores';
import { cn } from '../../utils/cn';

/**
 * StoreDetailsPage Component (Route: /store/:storeId)
 * Integrated with FastAPI Backend:
 * 1. GET /stores/{storeId} (Store Profile Hero & Specialties Layout)
 * 2. GET /stores/{storeId}/products?sort=rating (Featured Products with dynamic category sidebar filters)
 */
export const StoreDetailsPage = () => {
  const { storeId } = useParams();

  const [storeData, setStoreData] = useState(null);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Scroll to top and fetch store profile & products
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    fetchStoreData();
  }, [storeId]);

  const isMongoId = (id) => /^[a-f\d]{24}$/i.test(id);

  const fetchStoreData = async () => {
    try {
      setLoading(true);
      setError(null);

      // 1. Resolve store profile from backend
      // If storeId looks like a MongoDB ObjectId, use GET /stores/{id}
      // Otherwise assume it's a store name slug and use GET /stores/by-name
      let apiStore;
      if (isMongoId(storeId)) {
        apiStore = await storeService.getStoreById(storeId);
      } else {
        // Convert slug (e.g. "south-india-shopping-mall") to a store name
        const nameFromSlug = storeId
          .split('-')
          .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
          .join(' ');
        try {
          apiStore = await storeService.getStoreById(storeId);
        } catch {
          apiStore = await storeService.getStoreByName(nameFromSlug);
        }
      }

      if (!apiStore) throw new Error(`Store not found for id '${storeId}'`);

      // 2. Format Store Hero properties — banner and logo come only from backend
      const formattedStore = {
        id: apiStore._id || apiStore.id || storeId,
        name: apiStore.name,
        city: apiStore.city,
        state: apiStore.state,
        logoImage: apiStore.logo_image || null,
        heroBanner: apiStore.banner_image || null,
        bannerImage: apiStore.banner_image || null,
        tagline: apiStore.description || `${apiStore.name} is a trusted regional fashion store in ${apiStore.city}, ${apiStore.state}.`,
        description: apiStore.description,
        trustScore: apiStore.trust_score,
        yearsInBusiness: apiStore.years_in_business,
        trustedSince: apiStore.years_in_business ? `${new Date().getFullYear() - apiStore.years_in_business}` : undefined,
        isVerified: apiStore.is_verified ?? false,
        badgeText: apiStore.is_verified ? 'Verified Regional Store' : 'Regional Retailer',
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
        hubId: apiStore.city ? apiStore.city.toLowerCase() : undefined,
      };

      setStoreData(formattedStore);

      // 2. Fetch Featured Products
      try {
        const productsRes = await storeService.getStoreProducts(storeId, { sort: 'rating' });

        // Transform backend ProductCardResponse: thumbnail, product name, price, discount, rating
        const formattedProducts = (productsRes || []).map((p) => {
          const mainImg = p.thumbnail || p.image || 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=800';
          const pPrice = p.discount_price ?? p.price;
          const origPrice = p.price && p.discount_price && p.price > p.discount_price ? p.price : null;

          return {
            id: p.id || p._id,
            name: p.name,
            thumbnail: mainImg,
            image: mainImg,
            price: pPrice,
            original_price: origPrice,
            discount_percentage: p.discount_percentage,
            rating: p.rating || 4.5,
            review_count: p.review_count || 0,
            store_name: p.store_name || formattedStore.name,
            category: p.category,
          };
        });

        setProducts(formattedProducts);
      } catch (childErr) {
        console.warn('[StoreDetailsPage] Error fetching products:', childErr);
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
          <LoadingSpinner size="lg" message="Loading store profile & products..." />
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

  const filteredProducts = selectedCategory
    ? Array.isArray(selectedCategory)
      ? products.filter(p => selectedCategory.includes(p.category))
      : products.filter(p => p.category?.toLowerCase() === selectedCategory?.toLowerCase())
    : products;

  return (
    <PageContainer maxWidth="max-w-7xl" padding="px-4 sm:px-6 lg:px-8 py-6 md:py-10 pb-16">
      <div className="space-y-4 sm:space-y-6">

        {/* SECTION 1: Store Hero (Overlay with specialties chips) */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <StoreHero store={storeData} />
        </motion.section>


        {/* SECTION 2: Sidebar Filters & Products Grid Flow */}
        <div className="flex flex-col md:flex-row gap-8 pt-4">
          {/* Left Sidebar Filter Section */}
          {storeData.categories && storeData.categories.length > 0 && (
            <aside className="w-full md:w-56 shrink-0">
              <div className="bg-surface border border-border/80 rounded-2xl p-5 shadow-subtle">
                <h3 className="text-xs font-bold text-text-primary uppercase tracking-widest mb-4 pb-2 border-b border-border/60">
                  Categories
                </h3>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={selectedCategory === null}
                      onChange={() => setSelectedCategory(null)}
                      className="form-checkbox h-4 w-4 text-primary border-gray-300 rounded"
                    />
                    <span className="text-sm font-medium">All Products ({products.length})</span>
                  </label>
                  {storeData.categories.map((category) => {
                    const count = products.filter(p => p.category?.toLowerCase() === category.toLowerCase()).length;
                    const isChecked = Array.isArray(selectedCategory) ? selectedCategory.includes(category) : selectedCategory === category;
                    return (
                      <label key={category} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedCategory(prev => {
                                const arr = Array.isArray(prev) ? prev : [];
                                return [...arr, category];
                              });
                            } else {
                              setSelectedCategory(prev => {
                                const arr = Array.isArray(prev) ? prev : [];
                                return arr.filter(c => c !== category);
                              });
                            }
                          }}
                          className="form-checkbox h-4 w-4 text-primary border-gray-300 rounded"
                        />
                        <span className="text-sm font-medium">{category} ({count})</span>
                      </label>
                    );
                  })}
                </div>
              </div>
            </aside>
          )}

          {/* Right Side: Products Grid */}
          <div className="flex-1">
            <SignatureProducts products={filteredProducts} />
          </div>
        </div>

      </div>
    </PageContainer>
  );
};

export default StoreDetailsPage;
