import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Layers, ArrowLeft } from 'lucide-react';
import { getStoreDetailsPath } from '../../constants/routes';

/**
 * Component 1: CollectionsHero
 * Editorial hero header for the Collections Explorer page.
 */
export const CollectionsHero = ({ collectionsData }) => {
  if (!collectionsData) return null;

  const {
    storeId,
    storeName,
    hubName,
    location,
    storeLogo,
    heroBanner,
    totalCategoriesCount,
  } = collectionsData;

  return (
    <div className="relative w-full rounded-3xl overflow-hidden shadow-elevated border border-border/80 bg-surface">
      {/* Immersive Banner Background */}
      <div className="relative h-64 sm:h-80 md:h-96 w-full overflow-hidden bg-slate-950">
        <img
          src={heroBanner}
          alt={storeName}
          className="w-full h-full object-cover opacity-80 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />

        {/* Back Link to Store Profile */}
        <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-10">
          <Link
            to={getStoreDetailsPath(storeId)}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-surface/90 backdrop-blur-md border border-border/80 text-xs font-semibold text-text-primary hover:bg-surface transition-all shadow-subtle"
          >
            <ArrowLeft className="w-4 h-4 text-primary" />
            <span>Back to {storeName}</span>
          </Link>
        </div>
      </div>

      {/* Hero Details Block */}
      <div className="relative p-6 sm:p-8 md:p-10 -mt-20 sm:-mt-24 z-10">
        <div className="bg-surface/95 backdrop-blur-xl border border-border/80 rounded-3xl p-6 sm:p-8 shadow-card space-y-4">
          
          {/* Top Meta Row */}
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-medium text-text-muted pb-3 border-b border-border/60">
            <div className="flex items-center gap-2">
              {storeLogo && (
                <img
                  src={storeLogo}
                  alt={storeName}
                  className="w-7 h-7 rounded-full object-cover border border-primary/30"
                />
              )}
              <span className="font-bold text-text-primary text-sm">{storeName}</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1 text-primary font-semibold">
                <MapPin className="w-3.5 h-3.5" />
                <span>{hubName} • {location}</span>
              </span>
              <span className="text-border">•</span>
              <span className="inline-flex items-center gap-1 text-accent font-semibold bg-accent/15 px-2.5 py-0.5 rounded-full border border-accent/30 text-amber-800">
                <Layers className="w-3.5 h-3.5" />
                <span>{totalCategoriesCount} Categories Available</span>
              </span>
            </div>
          </div>

          {/* Explorer Title & Subtitle */}
          <div className="space-y-2">
            <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary tracking-tight leading-tight">
              Collection Explorer
            </h1>
            <p className="text-sm sm:text-base text-text-muted max-w-2xl font-normal leading-relaxed">
              Discover every handloom weave, bridal edit, and regional drape handcrafted by <span className="font-semibold text-text-primary">{storeName}</span>.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CollectionsHero;
