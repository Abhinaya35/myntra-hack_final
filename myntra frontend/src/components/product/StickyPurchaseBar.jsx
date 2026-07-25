import React, { useState } from 'react';
import { ShoppingBag, ShieldCheck } from 'lucide-react';

/**
 * Component 12: StickyPurchaseBar
 * Sticky bottom purchase bar for mobile & floating widget for desktop while scrolling.
 */
export const StickyPurchaseBar = ({ product, selectedSize }) => {
  const [addedToBag, setAddedToBag] = useState(false);

  if (!product) return null;

  const handleAddToBag = () => {
    setAddedToBag(true);
    setTimeout(() => setAddedToBag(false), 2000);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 p-4 bg-surface/95 backdrop-blur-xl border-t border-border/80 shadow-elevated md:bottom-6 md:right-6 md:left-auto md:max-w-md md:rounded-2xl md:border">
      <div className="flex items-center justify-between gap-3">
        
        {/* Price & Selected Size */}
        <div className="min-w-0 pr-2">
          <div className="flex items-baseline gap-2">
            <span className="font-editorial text-lg sm:text-xl font-bold text-text-primary">
              {product.price}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-text-muted line-through font-normal">
                {product.originalPrice}
              </span>
            )}
          </div>
          <p className="text-[11px] text-text-muted truncate">
            {selectedSize || 'Unstitched Saree (6.3m)'}
          </p>
        </div>

        {/* Primary Action Button */}
        <button
          type="button"
          onClick={handleAddToBag}
          className="px-6 py-3 rounded-xl bg-primary text-white text-xs sm:text-sm font-semibold hover:bg-primary-hover shadow-subtle transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shrink-0"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>{addedToBag ? 'Added to Bag ✓' : 'Add to Bag'}</span>
        </button>

      </div>
    </div>
  );
};

export default StickyPurchaseBar;
