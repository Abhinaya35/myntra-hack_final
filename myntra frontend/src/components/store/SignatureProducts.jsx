import React from 'react';
import ProductCard from '../cards/ProductCard';

/**
 * SignatureProducts - Redesigned product grid closer to Myntra.
 * Desktop: 4, Tablet: 3, Mobile: 2. Clean cards with simple borders/radii,
 * containing only: image, name, pricing tags, and wishlist heart.
 * Reuses the unified ProductCard component.
 */
export const SignatureProducts = ({ products = [] }) => {
  const filteredProducts = products ?? [];

  if (!filteredProducts || filteredProducts.length === 0) return null;

  return (
    <div className="space-y-6">
      <div className="flex flex-col pb-2 border-b border-border/40">
        <h3 className="font-editorial text-2xl font-bold text-text-primary">
          Signature Products
        </h3>
        <p className="mt-2 text-sm text-text-muted max-w-2xl">
          Discover the signature pieces that define this regional retailer's craftsmanship and heritage.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {filteredProducts.map((item, index) => (
          <ProductCard key={item.id || index} product={item} />
        ))}
      </div>
    </div>
  );
};

export default SignatureProducts;
