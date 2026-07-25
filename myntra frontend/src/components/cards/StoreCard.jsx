import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Star, Bookmark, ExternalLink, ShieldCheck } from 'lucide-react';
import Badge from '../common/Badge';
import Button from '../common/Button';
import { getStoreDetailsPath } from '../../constants/routes';
import { formatDistance, formatRating } from '../../utils/formatters';
import { useShortlist } from '../../hooks/useShortlist';
import { cn } from '../../utils/cn';

/**
 * Reusable StoreCard component for local fashion retailers
 */
export const StoreCard = ({
  store = {},
  onSelect,
  className = '',
}) => {
  const { isStoreSaved, toggleSaveStore } = useShortlist();
  const saved = isStoreSaved(store.id);

  const {
    id,
    name = 'Store Name',
    city = 'City',
    hubName = 'Shopping Hub',
    specialties = ['Sarees', 'Handloom'],
    rating = 4.8,
    reviewCount = 120,
    distanceInKm,
    image,
    isVerified = true,
  } = store;

  return (
    <div
      className={cn(
        "group relative bg-surface border border-border/80 rounded-3xl overflow-hidden shadow-card hover:shadow-elevated transition-all duration-300 flex flex-col",
        className
      )}
    >
      {/* Image Thumbnail Placeholder */}
      <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
        {image ? (
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-slate-100 via-rose-50/30 to-purple-50/30 flex items-center justify-center text-text-muted">
            <span className="font-editorial text-lg italic tracking-wider text-text-muted/60">
              Retailer Gallery
            </span>
          </div>
        )}

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          {isVerified && (
            <Badge variant="verified" icon={ShieldCheck} className="shadow-sm">
              Verified Retailer
            </Badge>
          )}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleSaveStore(store);
            }}
            className={cn(
              "pointer-events-auto p-2 rounded-xl backdrop-blur-md transition-colors shadow-sm",
              saved
                ? "bg-primary text-white"
                : "bg-surface/80 text-text-primary hover:bg-surface"
            )}
            aria-label="Save Store"
          >
            <Bookmark className="w-4 h-4" />
          </button>
        </div>

        {/* Distance pill */}
        {distanceInKm !== undefined && (
          <div className="absolute bottom-3 left-3 bg-surface/90 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] font-semibold text-text-primary shadow-sm flex items-center gap-1">
            <MapPin className="w-3 h-3 text-primary" />
            <span>{formatDistance(distanceInKm)}</span>
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          {/* Rating & Hub */}
          <div className="flex items-center justify-between text-xs text-text-muted mb-1.5">
            <span className="font-medium truncate">{hubName}, {city}</span>
            <div className="flex items-center gap-1 font-semibold text-amber-600 shrink-0">
              <Star className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400" />
              <span>{formatRating(rating)}</span>
              <span className="text-text-muted/80 font-normal">({reviewCount})</span>
            </div>
          </div>

          {/* Store Name */}
          <Link to={getStoreDetailsPath(id)}>
            <h3 className="font-editorial text-xl font-bold text-text-primary group-hover:text-primary transition-colors line-clamp-1">
              {name}
            </h3>
          </Link>

          {/* Specialties Pills */}
          <div className="flex flex-wrap gap-1.5 mt-3">
            {specialties.map((spec, i) => (
              <span
                key={i}
                className="text-[11px] px-2.5 py-0.5 rounded-md bg-background border border-border/60 text-text-muted font-medium"
              >
                {spec}
              </span>
            ))}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-3 border-t border-border/60 flex items-center justify-between gap-2">
          <Link to={getStoreDetailsPath(id)} className="w-full">
            <Button variant="outline" size="sm" fullWidth rightIcon={ExternalLink}>
              Explore Store
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StoreCard;
