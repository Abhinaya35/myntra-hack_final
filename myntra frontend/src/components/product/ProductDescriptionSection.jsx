import React from 'react';
import { Tag, Sparkles } from 'lucide-react';
import SectionHeader from '../common/SectionHeader';

/**
 * ProductDescriptionSection Component
 * Displays product category/sub-category breadcrumb and description text.
 */
export const ProductDescriptionSection = ({ description, category, subCategory, gender, occasion, material }) => {
  if (!description) return null;

  return (
    <div className="space-y-6">
      <SectionHeader
        tagline="Garment Overview"
        title="Product Description"
        subtitle="Detailed craft narrative, material composition, and styling overview."
      />

      <div className="bg-surface border border-border/80 rounded-3xl p-6 sm:p-8 shadow-card space-y-6">
        
        {/* Category & Sub-category Pills */}
        <div className="flex flex-wrap items-center gap-2 pb-4 border-b border-border/60">
          {category && (
            <span className="px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 text-xs font-semibold flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5 text-primary" />
              <span>Category: {category}</span>
            </span>
          )}

          {subCategory && (
            <span className="px-3 py-1 rounded-full bg-surface/90 border border-border/80 text-text-primary text-xs font-semibold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-accent" />
              <span>Sub-category: {subCategory}</span>
            </span>
          )}

          {gender && (
            <span className="px-3 py-1 rounded-full bg-background border border-border/60 text-text-muted text-xs font-medium">
              Department: {gender}
            </span>
          )}

          {occasion && (
            <span className="px-3 py-1 rounded-full bg-accent/15 border border-accent/30 text-amber-900 text-xs font-semibold">
              Occasion: {occasion}
            </span>
          )}

          {material && (
            <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-800 border border-emerald-500/20 text-xs font-semibold">
              Fabric: {material}
            </span>
          )}
        </div>

        {/* Main Description Text */}
        <div className="space-y-3">
          <p className="text-sm sm:text-base text-text-primary font-normal leading-relaxed whitespace-pre-line">
            {description}
          </p>
        </div>

      </div>
    </div>
  );
};

export default ProductDescriptionSection;
