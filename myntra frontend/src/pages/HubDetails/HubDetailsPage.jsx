import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, ShieldCheck, Calendar, ArrowRight, Sparkles, Star, Store, Layers } from 'lucide-react';

// Layout & Component Imports
import PageContainer from '../../components/layout/PageContainer';
import SectionHeader from '../../components/common/SectionHeader';
import StateBreadcrumb from '../../components/state/StateBreadcrumb';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ErrorState from '../../components/common/ErrorState';

// Service & Route Imports
import shoppingHubService from '../../services/shoppingHubService';
import { getStoreDetailsPath } from '../../constants/routes';

/**
 * HubDetailsPage Component (Route: /hub/:hubId)
 * Fetches Shopping Hub details and store directory from FastAPI backend:
 * - GET /shopping-hubs/{hubId}
 * - GET /shopping-hubs/{hubId}/stores
 */
export const HubDetailsPage = () => {
  const { hubId } = useParams();

  const [hub, setHub] = useState(null);
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Scroll to top and fetch hub details & store list
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    fetchHubData();
  }, [hubId]);

  const fetchHubData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Execute GET /shopping-hubs/{hubId} and GET /shopping-hubs/{hubId}/stores in parallel
      const [hubRes, storesRes] = await Promise.all([
        shoppingHubService.getHubById(hubId),
        shoppingHubService.getHubStores(hubId),
      ]);

      setHub(hubRes);
      setStores(storesRes || []);
    } catch (err) {
      console.error(`[HubDetailsPage] Failed to fetch data for hub '${hubId}':`, err);
      setError(err.message || `Failed to load Shopping Hub details for ID '${hubId}'. Please try again.`);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <PageContainer maxWidth="max-w-7xl" padding="px-4 sm:px-6 lg:px-8 py-16">
        <div className="py-20 flex justify-center">
          <LoadingSpinner size="lg" message="Loading Shopping Hub details & store directory..." />
        </div>
      </PageContainer>
    );
  }

  if (error || !hub) {
    return (
      <PageContainer maxWidth="max-w-7xl" padding="px-4 sm:px-6 lg:px-8 py-16">
        <ErrorState
          title="Shopping Hub Not Found"
          message={error || `Could not find details for Shopping Hub ID '${hubId}'.`}
          onRetry={fetchHubData}
        />
      </PageContainer>
    );
  }

  // Cover image fallback URL
  const coverImageUrl = hub.cover_image || hub.banner_image || 'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&q=80&w=1200';

  return (
    <PageContainer maxWidth="max-w-7xl" padding="px-4 sm:px-6 lg:px-8 py-6 md:py-10 pb-24 md:pb-28">
      <div className="space-y-12 sm:space-y-16">
        
        {/* Breadcrumb Navigation */}
        <StateBreadcrumb stateName={`${hub.name}, ${hub.state}`} />

        {/* Hero Banner & Hub Details Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="relative rounded-3xl bg-surface border border-border/80 overflow-hidden shadow-card"
        >
          {/* Cover Header Image */}
          <div className="relative h-64 sm:h-80 md:h-96 w-full overflow-hidden bg-slate-950">
            <img
              src={coverImageUrl}
              alt={hub.name}
              className="w-full h-full object-cover opacity-85"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

            {/* Badges Overlay */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10 flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <span className="px-3.5 py-1.5 rounded-full bg-surface/90 backdrop-blur-md text-xs font-semibold text-primary shadow-subtle flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{hub.state}</span>
                </span>

                {hub.featured && (
                  <span className="px-3.5 py-1.5 rounded-full bg-amber-500/20 backdrop-blur-md text-xs font-semibold text-amber-400 border border-amber-500/30 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Featured Destination</span>
                  </span>
                )}
              </div>

              <span className="px-3.5 py-1.5 rounded-full bg-slate-950/80 backdrop-blur-md text-xs font-semibold text-white border border-white/20 flex items-center gap-1.5">
                <Store className="w-3.5 h-3.5 text-primary" />
                <span>{hub.store_count || stores.length} Verified Retailers</span>
              </span>
            </div>

            {/* Title Overlay */}
            <div className="absolute bottom-6 left-6 right-6 text-white z-10 space-y-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                Regional Fashion Shopping Hub
              </span>
              <h1 className="font-editorial text-3xl sm:text-5xl font-bold tracking-tight">
                {hub.name}
              </h1>
            </div>
          </div>

          {/* Description & Categories Details */}
          <div className="p-6 sm:p-8 space-y-6">
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-text-muted uppercase tracking-wider">
                Destination Overview
              </h3>
              <p className="text-sm sm:text-base text-text-primary font-normal leading-relaxed max-w-4xl">
                {hub.description}
              </p>
            </div>

            {/* Categories */}
            {hub.categories && hub.categories.length > 0 && (
              <div className="pt-4 border-t border-border/60 space-y-2.5">
                <span className="text-xs font-semibold text-text-muted uppercase tracking-wider block">
                  Fashion Specialties & Categories:
                </span>
                <div className="flex flex-wrap gap-2">
                  {hub.categories.map((cat, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-xl bg-background border border-border/80 text-xs font-semibold text-text-primary flex items-center gap-1.5"
                    >
                      <Layers className="w-3.5 h-3.5 text-primary" />
                      <span>{cat}</span>
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Store Directory Section */}
        <div className="space-y-8">
          <SectionHeader
            tagline="Verified Retail Partners"
            title={`Retail Stores & Boutiques in ${hub.name}`}
            subtitle={`Explore verified multi-generational boutiques, handloom weavers, and fashion houses in ${hub.name}.`}
          />

          {stores.length === 0 ? (
            <div className="p-12 text-center bg-surface border border-dashed border-border rounded-3xl text-text-muted space-y-2">
              <Store className="w-8 h-8 mx-auto text-text-muted/60" />
              <p className="text-sm font-semibold">No registered retail stores found for {hub.name} yet.</p>
              <p className="text-xs text-text-muted/80">Check back soon as new verified fashion icons are added.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {stores.map((store, index) => {
                const storeId = store._id || store.id;
                const logoUrl = store.logo_image || 'https://dummyimage.com/150x150/000/fff&text=Store';

                return (
                  <motion.div
                    key={storeId || index}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -6 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="group bg-surface border border-border/80 rounded-3xl overflow-hidden shadow-card hover:shadow-elevated hover:border-primary/40 transition-all duration-300 flex flex-col justify-between"
                  >
                    {/* Header Banner & Logo */}
                    <div className="relative p-6 bg-gradient-to-br from-slate-900 to-slate-950 text-white flex items-center gap-4">
                      <img
                        src={logoUrl}
                        alt={store.name}
                        className="w-16 h-16 rounded-2xl object-cover border-2 border-white/20 shadow-subtle shrink-0"
                      />

                      <div className="space-y-1 min-w-0">
                        <div className="flex items-center gap-1 text-[11px] font-semibold text-primary">
                          <MapPin className="w-3 h-3 shrink-0" />
                          <span className="truncate">{store.city}, {store.state}</span>
                        </div>

                        <h4 className="font-editorial text-xl font-bold tracking-tight text-white group-hover:text-primary transition-colors truncate">
                          {store.name}
                        </h4>
                      </div>

                      {store.is_verified && (
                        <div className="absolute top-4 right-4 bg-primary/20 text-primary border border-primary/30 p-1 rounded-full">
                          <ShieldCheck className="w-4 h-4" />
                        </div>
                      )}
                    </div>

                    {/* Content Body */}
                    <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                      {/* Trust Score & Legacy */}
                      <div className="flex items-center justify-between text-xs font-semibold text-text-primary pt-1">
                        {store.years_in_business > 0 && (
                          <span className="flex items-center gap-1 text-accent">
                            <Calendar className="w-3.5 h-3.5" />
                            <span>Trusted {store.years_in_business} Years</span>
                          </span>
                        )}

                        {store.trust_score && (
                          <span className="flex items-center gap-1 text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-500/20">
                            <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                            <span>{store.trust_score} Trust Rating</span>
                          </span>
                        )}
                      </div>

                      {/* Specialties Tags */}
                      {store.specialties && store.specialties.length > 0 && (
                        <div className="space-y-1.5">
                          <span className="text-[11px] font-semibold text-text-muted uppercase tracking-wider block">
                            Specialties:
                          </span>
                          <div className="flex flex-wrap gap-1">
                            {store.specialties.slice(0, 3).map((spec, i) => (
                              <span
                                key={i}
                                className="px-2 py-0.5 rounded-md bg-background border border-border/60 text-[10px] font-semibold text-text-muted"
                              >
                                {spec}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Action CTA */}
                      <div className="pt-2 border-t border-border/60">
                        <Link
                          to={getStoreDetailsPath(storeId)}
                          className="w-full py-3 px-4 rounded-2xl bg-primary text-white text-xs font-semibold hover:bg-primary-hover shadow-subtle transition-all duration-200 flex items-center justify-center gap-2 group/btn"
                        >
                          <span>Explore Retailer Store</span>
                          <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover/btn:translate-x-1" />
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>

      </div>
    </PageContainer>
  );
};

export default HubDetailsPage;
