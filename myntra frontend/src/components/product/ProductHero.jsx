import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldCheck, Sparkles, Award, Bookmark, ShoppingBag, ArrowRight, Star, Check } from 'lucide-react';
import { useShortlist } from '../../hooks/useShortlist';
import { getStoreDetailsPath } from '../../constants/routes';
import { cn } from '../../utils/cn';

/**
 * Component 2: ProductHero
 * Render product details including Ratings Summary, Available Colors swatches, Available Sizes chips, and Product Gallery.
 */
export const ProductHero = ({
  product,
  selectedColor,
  selectedSize,
  onSelectColor,
  onSelectSize,
}) => {
  const images = product.images && product.images.length > 0 ? product.images : [product.image];
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [addedToBag, setAddedToBag] = useState(false);

  const { isProductSaved, toggleSaveProduct } = useShortlist();
  const saved = isProductSaved(product.id);
  const store = product.store || {};
  const options = product.options || {};

  const handleAddToBag = () => {
    setAddedToBag(true);
    setTimeout(() => setAddedToBag(false), 2000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
      
      {/* LEFT COLUMN (60%): Immersive Image Showcase & Gallery */}
      <div className="lg:col-span-7 space-y-4">
        <div className="relative w-full h-[450px] sm:h-[550px] lg:h-[620px] rounded-3xl overflow-hidden bg-slate-950 border border-border/80 shadow-card group">
          <motion.img
            key={activeImageIndex}
            src={images[activeImageIndex] || product.image}
            alt={product.name}
            initial={{ opacity: 0.8 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />

          {/* Regional Badge Overlay */}
          {product.trustBadges?.[0] && (
            <div className="absolute top-4 left-4 bg-surface/90 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-semibold text-primary shadow-subtle flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-primary" />
              <span>{product.trustBadges[0].label}</span>
            </div>
          )}

          {/* Wishlist Button Overlay */}
          <button
            type="button"
            onClick={() => toggleSaveProduct(product)}
            className={cn(
              "absolute top-4 right-4 p-3 rounded-full backdrop-blur-md transition-all shadow-subtle z-10 cursor-pointer",
              saved
                ? "bg-primary text-white"
                : "bg-surface/80 text-text-primary hover:bg-surface border border-border/60"
            )}
            aria-label="Bookmark item"
          >
            <Bookmark className={cn("w-5 h-5", saved && "fill-current")} />
          </button>
        </div>

        {/* Thumbnail Switcher (Product Gallery) */}
        {images.length > 1 && (
          <div className="flex items-center gap-3 pt-1 overflow-x-auto custom-scrollbar no-scrollbar">
            {images.map((img, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveImageIndex(idx)}
                className={cn(
                  "relative w-20 h-24 rounded-xl overflow-hidden border-2 transition-all shrink-0 cursor-pointer",
                  activeImageIndex === idx
                    ? "border-primary ring-2 ring-primary/20 scale-102"
                    : "border-border/80 opacity-70 hover:opacity-100"
                )}
              >
                <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* RIGHT COLUMN (40%): Purchase, Ratings & Variants Panel */}
      <div className="lg:col-span-5 space-y-6 bg-surface/80 backdrop-blur-xl p-6 sm:p-8 rounded-3xl border border-border/80 shadow-card">
        
        {/* Store Header & Category Tag */}
        <div className="space-y-2 pb-4 border-b border-border/60">
          <div className="flex items-center justify-between">
            <Link
              to={getStoreDetailsPath(store.id || 'dest-1')}
              className="text-xs font-bold text-primary hover:underline underline-offset-4 flex items-center gap-1"
            >
              <span>{store.name || 'Regional Retailer'}</span>
              <span className="text-text-muted font-normal">• {store.hubName || store.city}</span>
            </Link>

            <span className="px-2.5 py-0.5 rounded-full bg-accent/15 border border-accent/30 text-[10px] font-semibold text-amber-800">
              {product.category || 'Regional Wear'}
            </span>
          </div>

          {/* Product Title */}
          <h1 className="font-editorial text-2xl sm:text-3xl lg:text-4xl font-bold text-text-primary tracking-tight leading-tight">
            {product.name}
          </h1>

          {/* 1. Ratings Summary */}
          {product.rating && (
            <div className="flex items-center gap-2 pt-1">
              <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-amber-500/15 border border-amber-500/30 text-amber-800 text-xs font-bold">
                <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                <span>{product.rating}</span>
              </div>
              {product.reviewCount && (
                <span className="text-xs text-text-muted font-medium">
                  ({product.reviewCount} customer reviews)
                </span>
              )}
            </div>
          )}

          {/* Pricing */}
          <div className="flex items-baseline gap-3 pt-2">
            <span className="text-2xl sm:text-3xl font-bold text-text-primary">{product.price}</span>
            {product.originalPrice && (
              <span className="text-sm text-text-muted line-through">{product.originalPrice}</span>
            )}
            {product.discount && (
              <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-700 text-xs font-bold">
                {product.discount}
              </span>
            )}
          </div>

          <p className="text-xs font-medium text-emerald-700 flex items-center gap-1.5 pt-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>{product.availability || 'In Stock • Handcrafted & Ready to Ship'}</span>
          </p>
        </div>

        {/* 4. Available Colors Swatches */}
        {options.colors && options.colors.length > 0 && (
          <div className="space-y-2.5">
            <label className="text-xs font-semibold text-text-primary block">
              Color Variant: <span className="text-primary font-normal">{selectedColor}</span>
            </label>
            <div className="flex flex-wrap items-center gap-2.5">
              {options.colors.map((col, idx) => {
                const colorName = typeof col === 'string' ? col : col.name;
                const hexColor = col.hex || '#E34234';
                const isSelected = selectedColor === colorName;

                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => onSelectColor && onSelectColor(colorName)}
                    className={cn(
                      "group relative flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-medium transition-all cursor-pointer",
                      isSelected
                        ? "bg-primary/10 border-primary text-primary ring-2 ring-primary/20"
                        : "bg-background border-border/80 text-text-primary hover:border-primary/50"
                    )}
                  >
                    <span
                      className="w-3.5 h-3.5 rounded-full border border-black/10 shrink-0"
                      style={{ backgroundColor: hexColor }}
                    />
                    <span>{colorName}</span>
                    {isSelected && <Check className="w-3 h-3 text-primary" />}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* 3. Available Sizes Chips */}
        {options.sizes && options.sizes.length > 0 && (
          <div className="space-y-2.5">
            <label className="text-xs font-semibold text-text-primary block">
              Select Size: <span className="text-primary font-normal">{selectedSize}</span>
            </label>
            <div className="flex flex-wrap items-center gap-2">
              {options.sizes.map((sz, idx) => {
                const sizeLabel = typeof sz === 'string' ? sz : sz.size;
                const isSelected = selectedSize === sizeLabel;

                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => onSelectSize && onSelectSize(sizeLabel)}
                    className={cn(
                      "min-w-[44px] py-2 px-3 rounded-xl border text-xs font-semibold transition-all cursor-pointer",
                      isSelected
                        ? "bg-primary text-white border-primary shadow-subtle"
                        : "bg-background border-border/80 text-text-primary hover:border-primary/50"
                    )}
                  >
                    {sizeLabel}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Small Trust Badges */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className="px-3 py-1 rounded-full bg-background border border-border/80 text-xs font-medium text-text-primary flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-primary" />
            <span>GI Certified Craft</span>
          </span>
          <span className="px-3 py-1 rounded-full bg-background border border-border/80 text-xs font-medium text-text-primary flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span>100% Handwoven</span>
          </span>
        </div>

        {/* Action CTAs */}
        <div className="space-y-3 pt-2">
          <button
            type="button"
            onClick={handleAddToBag}
            className="w-full py-4 px-6 rounded-2xl bg-primary text-white text-sm font-semibold hover:bg-primary-hover shadow-subtle hover:shadow-elevated transition-all duration-200 flex items-center justify-center gap-2.5 cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>{addedToBag ? 'Added to Bag ✓' : 'Add to Bag'}</span>
          </button>

          <button
            type="button"
            className="w-full py-3.5 px-6 rounded-2xl bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Buy Now</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>

    </div>
  );
};

export default ProductHero;
