import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Tag, ShieldCheck, Bookmark, ArrowRight } from 'lucide-react';
import { useShortlist } from '../../hooks/useShortlist';
import { getProductDetailsPath } from '../../constants/routes';
import { cn } from '../../utils/cn';

/**
 * Component: QuickViewModal
 * Modal overlay for inspecting product details without navigating away from the catalogue.
 */
export const QuickViewModal = ({ product, onClose }) => {
  const { isProductSaved, toggleSaveProduct } = useShortlist();

  if (!product) return null;
  const saved = isProductSaved(product.id);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 16 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-2xl bg-surface border border-border/80 rounded-3xl overflow-hidden shadow-elevated p-6 sm:p-8"
        >
          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full text-text-muted hover:text-text-primary hover:bg-background transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
            {/* Image Preview */}
            <div className="relative h-64 sm:h-72 w-full rounded-2xl overflow-hidden bg-slate-900">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.regionalBadge && (
                <div className="absolute top-3 left-3 bg-surface/90 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-semibold text-primary shadow-subtle flex items-center gap-1">
                  <Tag className="w-3 h-3" />
                  <span>{product.regionalBadge}</span>
                </div>
              )}
            </div>

            {/* Details & Actions */}
            <div className="space-y-4">
              <div className="space-y-1">
                <span className="text-xs font-semibold text-primary">
                  {product.fabric} • Handcrafted
                </span>
                <h3 className="font-editorial text-2xl font-bold text-text-primary leading-snug">
                  {product.name}
                </h3>
                <div className="flex items-center gap-2 pt-1">
                  <span className="text-xl font-bold text-text-primary">{product.price}</span>
                  {product.originalPrice && (
                    <span className="text-xs text-text-muted line-through font-normal">
                      {product.originalPrice}
                    </span>
                  )}
                </div>
              </div>

              <p className="text-xs sm:text-sm text-text-muted leading-relaxed font-normal">
                {product.description || 'Authentic regional weave handcrafted by traditional master artisans.'}
              </p>

              <div className="pt-3 border-t border-border/60 space-y-2">
                <Link
                  to={getProductDetailsPath(product.id)}
                  onClick={onClose}
                  className="w-full py-3 px-4 rounded-xl bg-primary text-white text-xs font-semibold hover:bg-primary-hover transition-colors shadow-subtle flex items-center justify-center gap-2 group"
                >
                  <span>Go to Full Product Details</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                </Link>

                <button
                  type="button"
                  onClick={() => toggleSaveProduct(product)}
                  className={cn(
                    "w-full py-2.5 px-4 rounded-xl border text-xs font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer",
                    saved
                      ? "bg-primary/10 border-primary/30 text-primary"
                      : "bg-surface border-border/80 text-text-primary hover:bg-background"
                  )}
                >
                  <Bookmark className={cn("w-4 h-4", saved && "fill-current text-primary")} />
                  <span>{saved ? 'Saved in Wishlist' : 'Add to Wishlist'}</span>
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default QuickViewModal;
