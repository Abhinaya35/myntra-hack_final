import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Layers, ArrowLeft } from 'lucide-react';
import { getStoreDetailsPath } from '../../constants/routes';

/**
 * Component 1: CompactHero
 * Ultra-compact hero section occupying minimal vertical height (<50% of previous hero).
 */
export const CompactHero = ({ collectionsData }) => {
  if (!collectionsData) return null;

  const {
    storeId,
    storeName,
    hubName,
    location,
    storeLogo,
    totalCategoriesCount,
  } = collectionsData;

  return (
    <div className="relative w-full rounded-2xl overflow-hidden bg-surface border border-border/80 p-4 sm:p-5 shadow-subtle flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      {/* Left Details: Store Info & Collection Title */}
      <div className="space-y-1.5 min-w-0">
        <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-text-muted">
          <Link
            to={getStoreDetailsPath(storeId)}
            className="inline-flex items-center gap-1 font-semibold text-primary hover:underline underline-offset-4"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{storeName}</span>
          </Link>
          <span className="text-border">•</span>
          <span className="inline-flex items-center gap-1 text-text-muted">
            <MapPin className="w-3 h-3 text-primary/70" />
            <span>{hubName} • {location}</span>
          </span>
        </div>

        <div className="flex items-center gap-3">
          {storeLogo && (
            <img
              src={storeLogo}
              alt={storeName}
              className="w-8 h-8 rounded-full object-cover border border-primary/30 shrink-0"
            />
          )}
          <h1 className="font-editorial text-2xl sm:text-3xl font-bold text-text-primary tracking-tight">
            Collection Explorer
          </h1>
        </div>
      </div>

      {/* Right Details: Total Available Categories Pill & Quick Back CTA */}
      <div className="flex items-center gap-3 shrink-0">
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-semibold text-primary">
          <Layers className="w-3.5 h-3.5" />
          <span>{totalCategoriesCount} Categories</span>
        </span>

        <Link
          to={getStoreDetailsPath(storeId)}
          className="px-3.5 py-1.5 rounded-full bg-background border border-border/80 text-xs font-medium text-text-primary hover:bg-surface transition-colors"
        >
          View Store Profile
        </Link>
      </div>
    </div>
  );
};

export default CompactHero;
