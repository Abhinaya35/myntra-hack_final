import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Bookmark, Eye, Tag, ArrowRight } from 'lucide-react';
import { useShortlist } from '../../hooks/useShortlist';
import { getProductDetailsPath } from '../../constants/routes';
import { cn } from '../../utils/cn';

/**
 * Component 5: CatalogProductCard
 * Premium product card with large imagery, regional badges, quick wishlist toggle & Quick View trigger.
 */
export const CatalogProductCard = ({ product, onQuickView }) => {
  const { isProductSaved, toggleSaveProduct } = useShortlist();
  const saved = isProductSaved(product.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="group bg-surface border border-border/80 rounded-3xl overflow-hidden shadow-card hover:shadow-elevated hover:border-primary/40 transition-all duration-300 flex flex-col justify-between"
    >
      {/* Large Image Container */}
      <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-slate-900">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
        />

        {/* Regional Badge Top Overlay */}
        {product.regionalBadge && (
          <div className="absolute top-3 left-3 bg-surface/90 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-semibold text-primary shadow-subtle flex items-center gap-1">
            <Tag className="w-3 h-3 text-primary" />
            <span>{product.regionalBadge}</span>
          </div>
        )}

        {/* Quick Wishlist Bookmark Button */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleSaveProduct(product);
          }}
          className={cn(
            "absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all shadow-subtle z-10 cursor-pointer",
            saved
              ? "bg-primary text-white"
              : "bg-surface/80 text-text-primary hover:bg-surface border border-border/60"
          )}
          aria-label="Save to Wishlist"
        >
          <Bookmark className={cn("w-4 h-4", saved && "fill-current")} />
        </button>

        {/* Quick View Button Hover Overlay */}
        <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onQuickView(product);
            }}
            className="px-4 py-2 rounded-xl bg-surface/90 backdrop-blur-md text-text-primary text-xs font-semibold hover:bg-primary hover:text-white transition-all shadow-card flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 duration-300 cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View</span>
          </button>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-[11px] font-medium text-text-muted">
            <span className="capitalize">{product.fabric || product.category}</span>
            {product.storeBadge && (
              <span className="text-primary font-semibold">{product.storeBadge}</span>
            )}
          </div>

          <Link to={getProductDetailsPath(product.id)}>
            <h4 className="font-editorial text-lg font-bold text-text-primary group-hover:text-primary transition-colors line-clamp-2 leading-snug">
              {product.name}
            </h4>
          </Link>

          <div className="flex items-center gap-2 pt-1">
            <span className="text-base font-bold text-text-primary">{product.price}</span>
            {product.originalPrice && (
              <span className="text-xs text-text-muted line-through font-normal">
                {product.originalPrice}
              </span>
            )}
          </div>
        </div>

        <div className="pt-2 border-t border-border/60">
          <Link
            to={getProductDetailsPath(product.id)}
            className="w-full py-2 px-3 rounded-xl bg-background border border-border/80 text-text-primary text-xs font-semibold hover:bg-primary hover:text-white hover:border-primary transition-all duration-200 flex items-center justify-center gap-1.5 group/btn"
          >
            <span>View Details</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/btn:translate-x-1" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default CatalogProductCard;
