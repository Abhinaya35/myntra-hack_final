import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, ShieldCheck, ArrowRight, Layers } from 'lucide-react';
import SectionHeader from '../common/SectionHeader';
import { getHubDetailsPath } from '../../constants/routes';

/**
 * Component 5: ShoppingHubsSection
 * PRIMARY SECTION OF THE STATE PAGE: Large editorial showcase cards for Shopping Hubs.
 */
export const ShoppingHubsSection = ({ hubs = [], stateName = 'Telangana' }) => {
  if (!hubs || hubs.length === 0) return null;

  return (
    <div className="space-y-8">
      <SectionHeader
        tagline="Primary Destinations"
        title={`Popular Shopping Hubs in ${stateName}`}
        subtitle="Explore the state's most iconic fashion districts, bridal quarters, and master handloom markets."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {hubs.map((hub, index) => (
          <motion.div
            key={hub.id || index}
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -8 }}
            transition={{ duration: 0.35, delay: index * 0.08, ease: 'easeOut' }}
            className="group relative bg-surface border border-border/80 rounded-3xl overflow-hidden shadow-card hover:shadow-elevated hover:border-primary/50 transition-all duration-300 flex flex-col justify-between"
          >
            {/* Hero Image Showcase */}
            <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-slate-950">
              <img
                src={hub.heroImage}
                alt={hub.name}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                style={{ objectPosition: hub.banner_position || hub.bannerPosition || 'center center' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent pointer-events-none" />

              {/* Verified Icon Count Badge */}
              <div className="absolute top-4 left-4 z-10">
                <span className="px-3.5 py-1.5 rounded-full bg-surface/90 backdrop-blur-md text-xs font-semibold text-primary shadow-subtle flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-primary" />
                  <span>{hub.verifiedStoresCount} Verified Regional Store</span>
                </span>
              </div>
            </div>

            {/* Hub Details */}
            <div className="p-6 sm:p-8 space-y-4 flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-1 text-xs font-semibold text-primary">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Shopping Hub Destination</span>
                </div>

                <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-text-primary group-hover:text-primary transition-colors">
                  {hub.name}
                </h3>

                <p className="text-xs sm:text-sm text-text-muted font-normal leading-relaxed">
                  {hub.description}
                </p>
              </div>

              {/* Popular Categories Tags */}
              {hub.popularCategories && (
                <div className="pt-3 border-t border-border/60 space-y-1.5">
                  <span className="text-[11px] font-semibold text-text-muted uppercase tracking-wider block">
                    Popular Categories:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {hub.popularCategories.map((cat, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-lg bg-background border border-border/80 text-[11px] font-semibold text-text-primary"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Explore Hub Button */}
              <div className="pt-4 border-t border-border/60">
                <Link
                  to={getHubDetailsPath(hub.id)}
                  className="w-full py-3 px-5 rounded-2xl bg-primary text-white text-xs sm:text-sm font-semibold hover:bg-primary-hover shadow-subtle transition-all duration-200 flex items-center justify-center gap-2 group/btn"
                >
                  <span>Explore Shopping Hub</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover/btn:translate-x-1" />
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ShoppingHubsSection;
