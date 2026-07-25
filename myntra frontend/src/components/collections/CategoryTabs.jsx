import React from 'react';
import { motion } from 'framer-motion';

/**
 * Component 3: CategoryTabs
 * Sticky category navigation pill bar immediately beneath department tabs (Nykaa-style horizontal navigation).
 */
export const CategoryTabs = ({ categories = [], activeCategory, onSelectCategory }) => {
  if (!categories || categories.length === 0) return null;

  return (
    <div className="sticky top-[49px] z-20 bg-background/95 backdrop-blur-md border-b border-border/60 py-2.5 shadow-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 overflow-x-auto custom-scrollbar no-scrollbar">
          {categories.map((cat) => {
            const isSelected = activeCategory === cat.id;

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => onSelectCategory(cat.id)}
                className={`relative px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all shrink-0 cursor-pointer flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-primary text-white shadow-subtle'
                    : 'bg-surface border border-border/80 text-text-primary hover:border-primary/40 hover:bg-background'
                }`}
              >
                <span>{cat.name}</span>
                {cat.productCount !== undefined && (
                  <span className={`text-[10px] ${isSelected ? 'text-white/80' : 'text-text-muted'}`}>
                    ({cat.productCount})
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CategoryTabs;
