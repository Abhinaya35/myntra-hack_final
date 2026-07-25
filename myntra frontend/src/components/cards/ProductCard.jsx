import React from 'react';
import { Link } from 'react-router-dom';
import { Bookmark, Sparkles, ShoppingBag, MapPin } from 'lucide-react';
import Badge from '../common/Badge';
import { getProductDetailsPath, getStoreDetailsPath } from '../../constants/routes';
import { formatCurrency } from '../../utils/formatters';
import { useShortlist } from '../../hooks/useShortlist';
import { cn } from '../../utils/cn';

/**
 * Reusable ProductCard component for authentic regional collections
 */
export const ProductCard = ({
  product = {},
  className = '',
}) => {
  const { isProductSaved, toggleSaveProduct } = useShortlist();
  const saved = isProductSaved(product.id);

  const {
    id,
    title = 'Authentic Craft Product',
    craftName = 'Bandhani / Chanderi',
    region = 'Rajasthan',
    price = 4500,
    storeId,
    storeName = 'Heritage Textiles',
    image,
    availableOffline = true,
    availableOnline = true,
  } = product;

  return (
    <div
      className={cn(
        "group relative bg-surface border border-border/80 rounded-3xl overflow-hidden shadow-card hover:shadow-elevated transition-all duration-300 flex flex-col",
        className
      )}
    >
      {/* Product Image */}
      <div className="relative h-64 w-full bg-slate-100 overflow-hidden">
        {image ? (
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-rose-50/40 via-amber-50/40 to-slate-100 flex items-center justify-center">
            <span className="font-editorial text-xl italic text-text-muted/60">
              Regional Craft
            </span>
          </div>
        )}

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          <Badge variant="regional" icon={Sparkles} className="shadow-sm">
            {craftName}
          </Badge>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleSaveProduct(product);
            }}
            className={cn(
              "pointer-events-auto p-2 rounded-xl backdrop-blur-md transition-colors shadow-sm",
              saved
                ? "bg-primary text-white"
                : "bg-surface/80 text-text-primary hover:bg-surface"
            )}
            aria-label="Save Item"
          >
            <Bookmark className="w-4 h-4" />
          </button>
        </div>

        {/* Availability tags */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5">
          {availableOffline && (
            <span className="bg-surface/90 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[10px] font-semibold text-text-primary flex items-center gap-1 shadow-sm">
              <MapPin className="w-3 h-3 text-primary" />
              In-Store Visit
            </span>
          )}
          {availableOnline && (
            <span className="bg-surface/90 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[10px] font-semibold text-text-primary flex items-center gap-1 shadow-sm">
              <ShoppingBag className="w-3 h-3 text-secondary" />
              Buy Online
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Store & Region */}
          <div className="flex items-center justify-between text-xs text-text-muted mb-1">
            <Link
              to={getStoreDetailsPath(storeId || '1')}
              className="hover:text-primary transition-colors truncate font-medium"
            >
              {storeName}
            </Link>
            <span className="shrink-0">{region}</span>
          </div>

          {/* Product Title */}
          <Link to={getProductDetailsPath(id)}>
            <h3 className="font-editorial text-lg font-bold text-text-primary group-hover:text-primary transition-colors line-clamp-1">
              {title}
            </h3>
          </Link>
        </div>

        {/* Price & Action */}
        <div className="pt-2 border-t border-border/60 flex items-center justify-between">
          <span className="text-base font-bold text-text-primary">
            {formatCurrency(price)}
          </span>
          <Link
            to={getProductDetailsPath(id)}
            className="text-xs font-semibold text-primary hover:underline"
          >
            View Details →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
