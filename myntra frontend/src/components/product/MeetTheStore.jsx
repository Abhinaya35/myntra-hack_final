import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, MapPin, Calendar, ArrowRight, Store } from 'lucide-react';
import { getStoreDetailsPath } from '../../constants/routes';

/**
 * Component 4: MeetTheStore
 * Reinforces authenticity by introducing the verified regional fashion icon store behind the product.
 */
export const MeetTheStore = ({ store }) => {
  if (!store) return null;

  return (
    <div className="bg-surface border border-border/80 rounded-3xl p-6 sm:p-8 shadow-card flex flex-col md:flex-row md:items-center justify-between gap-6">
      
      {/* Store Logo & Details */}
      <div className="flex items-center gap-4 sm:gap-6">
        {store.logo && (
          <img
            src={store.logo}
            alt={store.name}
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-primary/30 shrink-0 shadow-subtle"
          />
        )}

        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{store.badgeText || 'Verified Regional Fashion Icon'}</span>
          </div>

          <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-text-primary">
            {store.name}
          </h3>

          <div className="flex flex-wrap items-center gap-3 text-xs text-text-muted font-medium">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-primary" />
              <span>{store.hubName} • {store.city}, {store.state}</span>
            </span>
            <span className="text-border">•</span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-accent" />
              <span>Trusted Since {store.trustedSince || '1968'}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className="shrink-0">
        <Link
          to={getStoreDetailsPath(store.id || 'dest-1')}
          className="px-6 py-3.5 rounded-2xl bg-background border border-border/80 text-text-primary text-xs sm:text-sm font-semibold hover:bg-primary hover:text-white hover:border-primary transition-all duration-200 flex items-center justify-center gap-2 group"
        >
          <Store className="w-4 h-4" />
          <span>View Store Profile</span>
          <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
        </Link>
      </div>

    </div>
  );
};

export default MeetTheStore;
