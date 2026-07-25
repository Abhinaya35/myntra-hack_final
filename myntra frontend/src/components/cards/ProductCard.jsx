import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { getProductDetailsPath } from '../../constants/routes';
import { cn } from '../../utils/cn';
import { useShortlist } from '../../hooks/useShortlist';

/**
 * Reusable ProductCard component for authentic regional collections.
 * Standardizes styling across "Signature Products" and "You May Also Like" layouts.
 */
export const ProductCard = ({
  product = {},
  className = '',
}) => {
  const { isProductSaved, toggleSaveProduct } = useShortlist();

  // Extract with support for both snake_case and camelCase keys
  const productId = product.id || product._id;
  const productTitle = product.name || product.title || 'Authentic Craft Product';
  const displayStoreName = product.store_name || product.brand || product.storeName || '';
  const displayPriceValue = product.discount_price ?? product.price ?? 0;
  const displayOriginalPrice = product.original_price ?? product.originalPrice ?? (product.discount_price ? product.price : null);
  const displayDiscountPct = product.discount_percentage ?? product.discountPercentage ?? null;
  const displayRating = product.rating || 4.5;
  const displayReviewCount = product.review_count ?? product.reviewCount ?? 120;
  const displayImage = product.thumbnail || product.image || '';

  const saved = isProductSaved(productId);

  const toggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleSaveProduct({
      id: productId,
      title: productTitle,
      price: displayPriceValue,
      image: displayImage,
      storeName: displayStoreName,
    });
  };

  const formatPrice = (val) => {
    if (val === null || val === undefined) return '';
    if (typeof val === 'number') {
      return `₹${val.toLocaleString('en-IN')}`;
    }
    const str = String(val);
    return str.startsWith('₹') ? str : `₹${str}`;
  };

  return (
    <Link
      to={getProductDetailsPath(productId)}
      className={cn(
        "group relative bg-white border border-gray-200 rounded-[10px] overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full",
        className
      )}
    >
      {/* Image Container */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-slate-50">
        {displayImage ? (
          <img
            src={displayImage}
            alt={productTitle}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-rose-50/40 via-amber-50/40 to-slate-100 flex items-center justify-center">
            <span className="font-editorial text-sm italic text-text-muted/60">
              Regional Craft
            </span>
          </div>
        )}

        {/* Wishlist Heart Icon */}
        <button
          type="button"
          onClick={toggleWishlist}
          className="absolute top-2.5 right-2.5 p-1.5 rounded-full bg-white/95 backdrop-blur-sm border border-border/40 hover:bg-white transition-all duration-300 transform hover:scale-110 active:scale-90 shadow-sm cursor-pointer z-10"
          aria-label="Wishlist"
        >
          <Heart
            className={cn(
              "w-4 h-4 transition-all duration-300 active:scale-125",
              saved ? "fill-primary text-primary" : "text-text-muted hover:text-primary"
            )}
          />
        </button>

        {/* Rating Badge Overlay */}
        <div className="absolute bottom-2 left-2 bg-white/90 text-[10px] sm:text-xs font-semibold text-black rounded px-2 py-0.5 flex items-center space-x-1 shadow-sm">
          <span>{displayRating} | {displayReviewCount}</span>
        </div>
      </div>

      {/* Details */}
      <div className="p-3 flex flex-col space-y-1">
        {/* Store Name */}
        {displayStoreName && (
          <p className="text-xs text-text-muted font-bold tracking-tight">{displayStoreName}</p>
        )}
        {/* Product Title */}
        <h4 className="text-xs sm:text-sm font-medium text-text-primary line-clamp-1 leading-snug">
          {productTitle}
        </h4>
        {/* Price Section */}
        <div className="flex items-baseline gap-2">
          <span className="text-sm font-bold text-text-primary">
            {formatPrice(displayPriceValue)}
          </span>
          {displayOriginalPrice && (
            <span className="text-xs text-text-muted line-through font-normal">
              {formatPrice(displayOriginalPrice)}
            </span>
          )}
          {displayDiscountPct && (
            <span className="text-[10px] sm:text-xs text-primary font-semibold">
              {Math.round(displayDiscountPct)}% OFF
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
