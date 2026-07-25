import React from 'react';
import SectionHeader from '../common/SectionHeader';

/**
 * Component 6: ProductOptions
 * Premium option selectors (Color, Size, Quantity) using simple elegant chips.
 */
export const ProductOptions = ({
  options,
  selectedColor,
  selectedSize,
  selectedQuantity,
  onSelectColor,
  onSelectSize,
  onSelectQuantity,
}) => {
  if (!options) return null;

  const { colors = [], sizes = [], quantities = [1, 2, 3] } = options;

  return (
    <div className="bg-surface border border-border/80 rounded-3xl p-6 sm:p-8 shadow-card space-y-6">
      <SectionHeader
        tagline="Tailoring & Preferences"
        title="Select Options"
        subtitle="Choose your preferred color drape, sizing specification, and order quantity."
      />

      {/* 1. Color Selector */}
      {colors.length > 0 && (
        <div className="space-y-3">
          <label className="text-xs font-semibold text-text-primary uppercase tracking-wider block">
            Select Color Variant
          </label>
          <div className="flex flex-wrap gap-3">
            {colors.map((c) => {
              const isSelected = selectedColor === c.name;
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => onSelectColor(c.name)}
                  className={`px-4 py-2.5 rounded-2xl text-xs font-semibold border transition-all flex items-center gap-2.5 cursor-pointer ${
                    isSelected
                      ? 'bg-primary text-white border-primary shadow-subtle ring-2 ring-primary/20'
                      : 'bg-background border-border/80 text-text-primary hover:border-primary/40'
                  }`}
                >
                  {c.hex && (
                    <span
                      className="w-3.5 h-3.5 rounded-full border border-white/40 shadow-inner shrink-0"
                      style={{ backgroundColor: c.hex }}
                    />
                  )}
                  <span>{c.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* 2. Size Selector */}
      {sizes.length > 0 && (
        <div className="space-y-3 pt-2">
          <label className="text-xs font-semibold text-text-primary uppercase tracking-wider block">
            Select Size / Stitching Option
          </label>
          <div className="flex flex-wrap gap-3">
            {sizes.map((sz, idx) => {
              const isSelected = selectedSize === sz;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => onSelectSize(sz)}
                  className={`px-4 py-2.5 rounded-2xl text-xs font-semibold border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-primary text-white border-primary shadow-subtle ring-2 ring-primary/20'
                      : 'bg-background border-border/80 text-text-primary hover:border-primary/40'
                  }`}
                >
                  {sz}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* 3. Quantity Selector */}
      <div className="space-y-3 pt-2">
        <label className="text-xs font-semibold text-text-primary uppercase tracking-wider block">
          Quantity
        </label>
        <div className="flex items-center gap-2">
          {quantities.map((q) => {
            const isSelected = selectedQuantity === q;
            return (
              <button
                key={q}
                type="button"
                onClick={() => onSelectQuantity(q)}
                className={`w-11 h-11 rounded-xl text-xs font-semibold border transition-all flex items-center justify-center cursor-pointer ${
                  isSelected
                    ? 'bg-primary text-white border-primary shadow-subtle'
                    : 'bg-background border-border/80 text-text-primary hover:border-primary/40'
                }`}
              >
                {q}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProductOptions;
