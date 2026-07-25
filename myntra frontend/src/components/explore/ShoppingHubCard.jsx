import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';
import { getHubDetailsPath } from '../../constants/routes';

/**
 * Compact & Elegant Shopping Hub Card Component for Explore Page
 * Renders backend attributes: name, state, cover_image, description, featured, store_count, categories, id.
 */
export const ShoppingHubCard = ({ hub, index = 0 }) => {
  if (!hub) return null;

  const hubId = hub.id || hub._id;
  const imageUrl =
    hub.cover_image ||
    hub.coverImage ||
    hub.banner_image ||
    hub.bannerImage ||
    hub.heroImage ||
    'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&q=80&w=800';

  const storeCount = hub.store_count ?? hub.storeCount ?? hub.verifiedStoresCount ?? 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: Math.min(index * 0.04, 0.3) }}
      whileHover={{ y: -5 }}
      className="group bg-surface border border-border/80 rounded-2xl overflow-hidden shadow-card hover:shadow-elevated hover:border-primary/40 transition-all duration-300 flex flex-col justify-between"
    >
      {/* Cover Image (Reduced height, 16:10 aspect ratio) */}
      <div className="relative h-44 w-full overflow-hidden bg-slate-950">
        <img
          src={imageUrl}
          alt={hub.name}
          className="w-full h-full object-cover opacity-85 transition-transform duration-500 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />

        {/* Verified Store Count & Featured Overlay Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
          <span className="px-2.5 py-1 rounded-full bg-surface/90 backdrop-blur-md text-[11px] font-semibold text-primary shadow-subtle flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-primary shrink-0" />
            <span>{storeCount} {storeCount === 1 ? 'Store' : 'Stores'}</span>
          </span>

          {hub.featured && (
            <span className="px-2 py-0.5 rounded-full bg-amber-500/20 backdrop-blur-md text-[10px] font-semibold text-amber-400 border border-amber-500/30 flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5" />
              <span>Featured</span>
            </span>
          )}
        </div>

        {/* Title & Location Overlay */}
        <div className="absolute bottom-3 left-3 right-3 text-white z-10 space-y-0.5">
          <div className="flex items-center gap-1 text-[11px] font-medium text-primary-light/90">
            <MapPin className="w-3 h-3 shrink-0" />
            <span className="truncate">{hub.state}</span>
          </div>
          <h3 className="font-editorial text-xl font-bold tracking-tight group-hover:text-primary-light transition-colors truncate">
            {hub.name}
          </h3>
        </div>
      </div>

      {/* Card Content & Action */}
      <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
        {/* Short Description (Max 2 lines) */}
        <p className="text-xs text-text-muted font-normal line-clamp-2 leading-relaxed">
          {hub.description}
        </p>

        {/* Direct Link Button */}
        <div className="pt-2 border-t border-border/60">
          <Link
            to={getHubDetailsPath(hubId)}
            className="w-full py-2.5 px-3 rounded-xl bg-primary text-white text-xs font-semibold hover:bg-primary-hover shadow-subtle transition-all duration-200 flex items-center justify-center gap-1.5 group/btn"
          >
            <span>Explore Shopping Hub</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/btn:translate-x-1" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default ShoppingHubCard;
