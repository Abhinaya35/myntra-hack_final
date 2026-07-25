import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldCheck, MapPin, ArrowRight, Compass } from 'lucide-react';
import SectionHeader from '../common/SectionHeader';
import { getStoreDetailsPath } from '../../constants/routes';

/**
 * Section 10: ContinueYourHeritageJourney Component (Polished NearbyStores)
 * Encourages exploration of neighboring verified regional fashion destinations.
 */
export const NearbyStores = ({ nearbyStores = [] }) => {
  if (!nearbyStores || nearbyStores.length === 0) return null;

  return (
    <div className="space-y-8">
      <SectionHeader
        tagline="Next Heritage Stops"
        title="Continue Your Heritage Journey"
        subtitle="Discover neighboring verified heritage boutiques and master weaving studios."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {nearbyStores.map((item, index) => (
          <motion.div
            key={item.id || index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -6 }}
            transition={{ duration: 0.35, delay: index * 0.08 }}
            className="group bg-surface border border-border/80 rounded-3xl overflow-hidden shadow-card hover:shadow-elevated hover:border-primary/40 transition-all duration-300 flex flex-col justify-between"
          >
            {/* Image Thumbnail */}
            <div className="relative h-52 w-full overflow-hidden bg-slate-900">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover opacity-90 transition-transform duration-500 group-hover:scale-105"
              />

              {/* Verified Badge */}
              <div className="absolute top-3 left-3 bg-surface/90 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-semibold text-primary shadow-subtle flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{item.badgeText || 'Verified Regional'}</span>
              </div>

              {/* Distance Pill */}
              <div className="absolute bottom-3 left-3 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] font-semibold text-white shadow-subtle flex items-center gap-1 border border-white/10">
                <MapPin className="w-3 h-3 text-accent" />
                <span>{item.distance}</span>
              </div>
            </div>

            {/* Content Details */}
            <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-1.5">
                <div className="flex items-center gap-1 text-xs font-semibold text-primary">
                  <Compass className="w-3.5 h-3.5" />
                  <span>Heritage Destination</span>
                </div>

                <h4 className="font-editorial text-2xl font-bold text-text-primary group-hover:text-primary transition-colors line-clamp-1">
                  {item.name}
                </h4>

                <p className="text-xs text-text-muted font-medium line-clamp-2">
                  <span className="font-semibold text-text-primary">Known For:</span> {item.knownFor || item.specialty}
                </p>
              </div>

              <div className="pt-3 border-t border-border/60">
                <Link
                  to={getStoreDetailsPath(item.id)}
                  className="w-full py-2.5 px-4 rounded-xl bg-background border border-border/80 text-text-primary text-xs font-semibold hover:bg-primary hover:text-white hover:border-primary transition-all duration-200 flex items-center justify-center gap-2 group/btn"
                >
                  <span>Explore Destination</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/btn:translate-x-1" />
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default NearbyStores;
