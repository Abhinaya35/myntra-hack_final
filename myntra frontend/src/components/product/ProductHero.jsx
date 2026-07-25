import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldCheck, Sparkles, Award, Heart, ShoppingBag, ArrowRight, ArrowLeft, Star, Check } from 'lucide-react';
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

  const goPrev = () => {
    setActiveImageIndex((i) => (i - 1 + images.length) % images.length);
  };

  const goNext = () => {
    setActiveImageIndex((i) => (i + 1) % images.length);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

      {/* LEFT COLUMN (60%): Immersive Image Showcase & Gallery */}
      <div className="lg:col-span-7 space-y-4">
        <div className="relative w-full h-[450px] sm:h-[550px] lg:h-[620px] rounded-3xl overflow-hidden bg-slate-950 border border-border/80 shadow-card group">
          {/* Main Image */}
          <motion.img
            key={activeImageIndex}
            src={images[activeImageIndex] || product.image}
            alt={product.name}
            initial={{ opacity: 0.8 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />

          {/* Navigation Arrows */}
          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={goPrev}
                className="absolute inset-y-0 left-0 flex items-center justify-center w-12 text-white hover:bg-black/30 transition"
                aria-label="Previous image"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
              <button
                type="button"
                onClick={goNext}
                className="absolute inset-y-0 right-0 flex items-center justify-center w-12 text-white hover:bg-black/30 transition"
                aria-label="Next image"
              >
                <ArrowRight className="w-6 h-6" />
              </button>
            </>
          )}

          {/* Wishlist Button Overlay */}
          <button
            type="button"
            onClick={() => toggleSaveProduct(product)}
            className="absolute top-4 right-4 p-3 rounded-full bg-white/95 backdrop-blur-sm border border-border/40 hover:bg-white transition-all duration-300 transform hover:scale-110 active:scale-95 shadow-subtle z-10 cursor-pointer text-text-primary"
            aria-label="Wishlist"
          >
            <Heart
              className={cn(
                "w-5 h-5 transition-all duration-300 active:scale-125",
                saved ? "fill-primary text-primary" : "text-text-muted hover:text-primary"
              )}
            />
          </button>
        </div>
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
              <span>{store.name || ''}</span>
              <span className="text-text-muted font-normal">• {store.hubName || store.city}</span>
            </Link>
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
            <span>{product.availability || ''}</span>
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

        {/* Authenticity Trust Row */}
        {(product.giCertified || product.origin) && (
          <div className="flex flex-wrap items-center gap-2.5 pt-2 pb-1">
            {product.giCertified && (
              <span className="inline-flex items-center h-8 px-4 rounded-full bg-slate-50 border border-border/80 text-xs font-medium text-text-primary gap-1">
                <span className="text-emerald-600 font-bold">✓</span> GI Certified Craft
              </span>
            )}
            {product.origin && (
              <span className="inline-flex items-center h-8 px-4 rounded-full bg-slate-50 border border-border/80 text-xs font-medium text-text-primary">
                {product.origin}
              </span>
            )}
          </div>
        )}

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
