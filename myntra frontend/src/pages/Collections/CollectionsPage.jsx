import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, Sparkles, Layers, Star, ArrowRight, Store, ShoppingBag } from 'lucide-react';

// Layout & Component Imports
import PageContainer from '../../components/layout/PageContainer';
import SectionHeader from '../../components/common/SectionHeader';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ErrorState from '../../components/common/ErrorState';

// Service & Route Imports
import storeService from '../../services/storeService';
import { getStoreDetailsPath, getProductDetailsPath } from '../../constants/routes';

/**
 * Dedicated Store Collections Page Component (Route: /store/:storeId/collections)
 * Integrated with FastAPI Backend:
 * - GET /stores/{storeId}
 * - GET /stores/{storeId}/collections
 * - GET /stores/{storeId}/products?occasion={collection_name}
 */
export const CollectionsPage = () => {
  const { storeId } = useParams();

  const [store, setStore] = useState(null);
  const [collections, setCollections] = useState([]);
  const [selectedCollection, setSelectedCollection] = useState(null);
  const [products, setProducts] = useState([]);
  const [loadingStore, setLoadingStore] = useState(true);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [error, setError] = useState(null);

  // Scroll to top on mount / storeId change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    fetchStoreAndCollections();
  }, [storeId]);

  /**
   * Fetch Store profile and list of collections for the store
   */
  const fetchStoreAndCollections = async () => {
    try {
      setLoadingStore(true);
      setError(null);

      // Execute GET /stores/{storeId} and GET /stores/{storeId}/collections in parallel
      const [storeRes, collectionsRes] = await Promise.all([
        storeService.getStoreById(storeId),
        storeService.getStoreCollections(storeId),
      ]);

      setStore(storeRes);

      const collectionsList = collectionsRes || [];
      setCollections(collectionsList);

      // Default selected collection to the first collection name if available
      if (collectionsList.length > 0) {
        const firstColName = collectionsList[0].collection_name;
        setSelectedCollection(firstColName);
        await fetchProductsForCollection(firstColName);
      }
    } catch (err) {
      console.error(`[CollectionsPage] Failed to fetch data for store '${storeId}':`, err);
      setError(err.message || `Failed to load collections for store ID '${storeId}'. Please try again.`);
    } finally {
      setLoadingStore(false);
    }
  };

  /**
   * Fetch products for a specific collection / occasion
   * GET /stores/{storeId}/products?occasion={collection_name}
   */
  const fetchProductsForCollection = async (collectionName) => {
    try {
      setLoadingProducts(true);
      const productsRes = await storeService.getStoreProducts(storeId, {
        occasion: collectionName,
      });
      setProducts(productsRes || []);
    } catch (err) {
      console.error(`[CollectionsPage] Failed to fetch products for collection '${collectionName}':`, err);
      setProducts([]);
    } finally {
      setLoadingProducts(false);
    }
  };

  /**
   * Handle Collection Card Click
   */
  const handleCollectionSelect = async (colName) => {
    if (selectedCollection === colName) return;
    setSelectedCollection(colName);
    await fetchProductsForCollection(colName);
  };

  if (loadingStore) {
    return (
      <PageContainer maxWidth="max-w-7xl" padding="px-4 sm:px-6 lg:px-8 py-16">
        <div className="py-20 flex justify-center">
          <LoadingSpinner size="lg" message="Loading store collections & fashion edits..." />
        </div>
      </PageContainer>
    );
  }

  if (error || !store) {
    return (
      <PageContainer maxWidth="max-w-7xl" padding="px-4 sm:px-6 lg:px-8 py-16">
        <ErrorState
          title="Store Collections Not Found"
          message={error || `Could not find collections for Store ID '${storeId}'.`}
          onRetry={fetchStoreAndCollections}
        />
      </PageContainer>
    );
  }

  return (
    <PageContainer maxWidth="max-w-7xl" padding="px-4 sm:px-6 lg:px-8 py-6 md:py-10 pb-24 md:pb-28">
      <div className="space-y-12 sm:space-y-16">

        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-1.5 text-xs text-text-muted font-medium overflow-x-auto py-1" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3 text-border shrink-0" />
          <Link to="/explore" className="hover:text-primary transition-colors">Explore</Link>
          <ChevronRight className="w-3 h-3 text-border shrink-0" />
          <Link to={getStoreDetailsPath(storeId)} className="hover:text-primary transition-colors">
            {store.name}
          </Link>
          <ChevronRight className="w-3 h-3 text-border shrink-0" />
          <span className="text-text-primary font-semibold">Collections</span>
        </nav>

        {/* Store Collections Header Banner */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="relative rounded-3xl bg-surface border border-border/80 p-6 sm:p-10 shadow-card overflow-hidden"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Curated Store Collections</span>
              </div>

              <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary tracking-tight">
                {store.name} Collections
              </h1>

              <p className="text-xs sm:text-sm text-text-muted font-normal leading-relaxed">
                Explore handpicked occasion edits, bridal drapes, and heritage fashion series from {store.name} in {store.city}, {store.state}.
              </p>
            </div>

            <Link
              to={getStoreDetailsPath(storeId)}
              className="px-4 py-2.5 rounded-xl bg-background border border-border/80 text-text-primary hover:text-primary hover:border-primary/40 text-xs font-semibold shadow-subtle transition-all flex items-center gap-2 shrink-0"
            >
              <Store className="w-4 h-4 text-primary" />
              <span>Back to Store Profile</span>
            </Link>
          </div>
        </motion.div>

        {/* SECTION 1: Collections Cards Showcase Grid */}
        <div className="space-y-6">
          <SectionHeader
            tagline="Browse by Occasion"
            title="Curated Collections"
            subtitle="Click any collection card below to filter and view exclusive products belonging to that edit."
          />

          {collections.length === 0 ? (
            <div className="p-12 text-center bg-surface border border-dashed border-border rounded-3xl text-text-muted space-y-2">
              <Layers className="w-8 h-8 mx-auto text-text-muted/60" />
              <p className="text-sm font-semibold text-text-primary">No collections available yet</p>
              <p className="text-xs text-text-muted">Check back soon for new curated edits from {store.name}.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {collections.map((col, index) => {
                const isSelected = selectedCollection === col.collection_name;
                const coverUrl = col.cover_image || 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=800';

                return (
                  <motion.div
                    key={col.collection_name || index}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    whileHover={{ y: -6 }}
                    onClick={() => handleCollectionSelect(col.collection_name)}
                    className={`group cursor-pointer bg-surface border rounded-3xl overflow-hidden shadow-card transition-all duration-300 flex flex-col justify-between ${isSelected
                        ? 'border-primary ring-2 ring-primary/20 shadow-elevated'
                        : 'border-border/80 hover:border-primary/50'
                      }`}
                  >
                    {/* Cover Image */}
                    <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-900">
                      <img
                        src={coverUrl}
                        alt={col.collection_name}
                        className="w-full h-full object-cover opacity-90 transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />

                      {/* Product Count Badge */}
                      <span className="absolute top-3 right-3 px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-[11px] font-semibold text-white border border-white/20">
                        {col.product_count} {col.product_count === 1 ? 'Product' : 'Products'}
                      </span>

                      {/* Selection Status Badge */}
                      {isSelected && (
                        <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-primary text-white text-[11px] font-bold shadow-subtle flex items-center gap-1">
                          <Sparkles className="w-3 h-3" />
                          <span>Active Collection</span>
                        </span>
                      )}

                      {/* Title Overlay */}
                      <div className="absolute bottom-3 left-3 right-3 text-white space-y-0.5">
                        <h4 className="font-editorial text-2xl font-bold tracking-tight">
                          {col.collection_name}
                        </h4>
                      </div>
                    </div>

                    {/* Card Content & Action */}
                    <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                      <p className="text-xs text-text-muted font-normal line-clamp-2 leading-relaxed">
                        {col.description}
                      </p>

                      <div className="pt-2 border-t border-border/60">
                        <button
                          type="button"
                          className={`w-full py-2.5 px-3 rounded-xl text-xs font-semibold transition-all duration-200 flex items-center justify-center gap-1.5 ${isSelected
                              ? 'bg-primary text-white shadow-subtle'
                              : 'bg-background border border-border/80 text-text-primary group-hover:bg-primary group-hover:text-white group-hover:border-primary'
                            }`}
                        >
                          <span>{isSelected ? 'Viewing Products' : 'View Products'}</span>
                          <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>

        {/* SECTION 2: Collection Products Catalog Grid */}
        <div className="space-y-6 pt-4 border-t border-border/60">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-semibold text-primary uppercase tracking-wider block">
                Collection Inventory
              </span>
              <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-text-primary tracking-tight">
                {selectedCollection ? `${selectedCollection} Products` : 'Collection Products'}
              </h2>
            </div>

            <span className="text-xs font-semibold text-text-muted bg-surface border border-border/80 px-3 py-1.5 rounded-full self-start sm:self-auto">
              {products.length} {products.length === 1 ? 'Product Available' : 'Products Available'}
            </span>
          </div>

          {/* Loading Products Spinner */}
          {loadingProducts && (
            <div className="py-16 flex justify-center">
              <LoadingSpinner size="md" message={`Fetching products for ${selectedCollection}...`} />
            </div>
          )}

          {/* Products Grid */}
          {!loadingProducts && (
            products.length === 0 ? (
              <div className="p-12 text-center bg-surface border border-dashed border-border rounded-3xl text-text-muted space-y-2">
                <ShoppingBag className="w-8 h-8 mx-auto text-text-muted/60" />
                <p className="text-sm font-semibold text-text-primary">No products found in this collection</p>
                <p className="text-xs text-text-muted">Select another collection above to view available fashion items.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((p, index) => {
                  const prodId = p.id || p._id;
                  const thumbUrl = p.thumbnail || p.image || 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=800';
                  const mainPrice = p.discount_price ?? p.price;
                  const origPrice = p.price && p.discount_price && p.price > p.discount_price ? p.price : null;

                  return (
                    <motion.div
                      key={prodId || index}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      whileHover={{ y: -5 }}
                      className="group bg-surface border border-border/80 rounded-2xl overflow-hidden shadow-card hover:shadow-elevated hover:border-primary/40 transition-all duration-300 flex flex-col justify-between"
                    >
                      {/* Image Thumbnail */}
                      <div className="relative h-60 w-full overflow-hidden bg-slate-900">
                        <img
                          src={thumbUrl}
                          alt={p.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />

                        {/* Discount Badge */}
                        {p.discount_percentage > 0 && (
                          <div className="absolute top-3 left-3 bg-red-500 text-white font-bold text-[10px] px-2 py-0.5 rounded-md shadow-subtle">
                            {Math.round(p.discount_percentage)}% OFF
                          </div>
                        )}

                        {/* Rating Badge */}
                        {p.rating && (
                          <div className="absolute top-3 right-3 bg-slate-950/80 backdrop-blur-md px-2 py-0.5 rounded-md text-[11px] font-semibold text-amber-400 border border-amber-500/30 flex items-center gap-1">
                            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                            <span>{p.rating} | {p.review_count ?? 0}</span>
                          </div>
                        )}
                      </div>

                      {/* Product Content Details */}
                      <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                        <div className="space-y-1.5">
                          <span className="text-[10px] font-semibold uppercase tracking-wider text-primary">
                            {p.category || selectedCollection}
                          </span>

                          <h4 className="font-editorial text-lg font-bold text-text-primary group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                            {p.name}
                          </h4>

                          <div className="flex items-center gap-2 pt-1">
                            <span className="text-base font-bold text-text-primary">
                              ₹{mainPrice?.toLocaleString('en-IN')}
                            </span>
                            {origPrice && (
                              <span className="text-xs text-text-muted line-through font-normal">
                                ₹{origPrice?.toLocaleString('en-IN')}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Action CTA */}
                        <div className="pt-2 border-t border-border/60">
                          <Link
                            to={getProductDetailsPath(prodId)}
                            className="w-full py-2.5 px-3 rounded-xl bg-background border border-border/80 text-text-primary text-xs font-semibold hover:bg-primary hover:text-white hover:border-primary transition-all duration-200 flex items-center justify-center gap-1.5 group/btn"
                          >
                            <span>View Product Details</span>
                            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/btn:translate-x-1" />
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )
          )}
        </div>

      </div>
    </PageContainer>
  );
};

export default CollectionsPage;
