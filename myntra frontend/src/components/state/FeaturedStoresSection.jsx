import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldCheck, Calendar, MapPin, ArrowRight } from 'lucide-react';
import SectionHeader from '../common/SectionHeader';
import { getStoreDetailsPath } from '../../constants/routes';

/**
 * Component 6: FeaturedStoresSection
 * Highlight flagship stores across the state.
 */
export const FeaturedStoresSection = ({ stores = [], stateName = 'Telangana' }) => {
  if (!stores || stores.length === 0) return null;

  return (
    <div className="space-y-8">
      <SectionHeader
        tagline="Flagship Boutiques"
        title={`Featured Regional Fashion Icons in ${stateName}`}
        subtitle="Explore multi-generational boutiques, master weaver studios, and heritage fashion houses."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stores.map((item, index) => (
          <motion.div
            key={item.id || index}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -6 }}
            transition={{ duration: 0.3, delay: index * 0.06 }}
            className="group bg-surface border border-border/80 rounded-3xl overflow-hidden shadow-card hover:shadow-elevated hover:border-primary/40 transition-all duration-300 flex flex-col justify-between"
          >
            {/* Image Thumbnail */}
            <div className="relative h-56 w-full overflow-hidden bg-slate-900">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {item.isVerified && (
                <div className="absolute top-3 left-3 bg-surface/90 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-semibold text-primary shadow-subtle flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-primary" />
                  <span>Verified Icon</span>
                </div>
              )}
            </div>

            {/* Content Details */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
              <div className="space-y-1.5">
                <div className="flex items-center gap-1 text-[11px] font-semibold text-primary">
                  <MapPin className="w-3 h-3" />
                  <span className="truncate">{item.hubName}</span>
                </div>

                <h4 className="font-editorial text-xl font-bold text-text-primary group-hover:text-primary transition-colors">
                  {item.name}
                </h4>

                <p className="text-xs text-text-muted font-normal line-clamp-2 leading-relaxed">
                  {item.description}
                </p>

                <div className="pt-1 flex items-center gap-1 text-[11px] text-accent font-semibold">
                  <Calendar className="w-3 h-3 text-accent" />
                  <span>Trusted Since {item.trustedSince}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-border/60">
                <Link
                  to={getStoreDetailsPath(item.id)}
                  className="w-full py-2 px-3 rounded-xl bg-background border border-border/80 text-text-primary text-xs font-semibold hover:bg-primary hover:text-white hover:border-primary transition-all duration-200 flex items-center justify-center gap-1.5 group/btn"
                >
                  <span>View Store Profile</span>
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

export default FeaturedStoresSection;
