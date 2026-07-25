import React, { useState } from 'react';
import CatalogProductCard from './CatalogProductCard';
import QuickViewModal from './QuickViewModal';

/**
 * Component 6: CatalogProductGrid
 * Primary content grid displaying large product cards with dynamic sorting, filtering & quick view modal.
 */
export const CatalogProductGrid = ({
  products = [],
  activeDepartment,
  activeCategory,
  selectedFabric,
  selectedColor,
  sortBy,
}) => {
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  // Filter products by department and category
  let filtered = products.filter((p) => {
    if (p.department !== activeDepartment) return false;
    if (activeCategory && activeCategory !== 'all' && activeCategory !== 'all-m' && p.category !== activeCategory) {
      return false;
    }
    if (selectedFabric && p.fabric !== selectedFabric) return false;
    if (selectedColor && p.color !== selectedColor) return false;
    return true;
  });

  // Sort products
  filtered.sort((a, b) => {
    if (sortBy === 'price-asc') return a.priceNumber - b.priceNumber;
    if (sortBy === 'price-desc') return b.priceNumber - a.priceNumber;
    if (sortBy === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
    return (b.popularity || 0) - (a.popularity || 0);
  });

  if (filtered.length === 0) {
    return (
      <div className="p-12 bg-surface border border-dashed border-border/80 rounded-3xl text-center text-text-muted space-y-2">
        <p className="text-base font-semibold text-text-primary">No products match your active selection.</p>
        <p className="text-xs text-text-muted">Try selecting another category or clearing your active filters.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Product Card Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {filtered.map((product) => (
          <CatalogProductCard
            key={product.id}
            product={product}
            onQuickView={setQuickViewProduct}
          />
        ))}
      </div>

      {/* Quick View Modal Overlay */}
      {quickViewProduct && (
        <QuickViewModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
        />
      )}
    </div>
  );
};

export default CatalogProductGrid;
