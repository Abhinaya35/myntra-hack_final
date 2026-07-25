import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingBag, Sparkles } from 'lucide-react';
import FashionPulseHeader from './FashionPulseHeader';
import ProductCard from '../cards/ProductCard';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorState from '../common/ErrorState';
import { ROUTES } from '../../constants/routes';

/**
 * FashionPulseDetails - Component displaying details and products for a trend category
 */
export const FashionPulseDetails = ({
  categoryData = null,
  loading = false,
  error = null,
  onRetry,
}) => {
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="py-20 flex justify-center">
        <LoadingSpinner size="lg" message="Loading regional trend products..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-12">
        <ErrorState
          title="Failed to Load Category Details"
          message={error}
          onRetry={onRetry}
        />
      </div>
    );
  }

  if (!categoryData) {
    return null;
  }

  const {
    category = 'Temple Jewellery',
    state = 'Telangana',
    growth_percentage = 35,
    reason = 'Bonalu celebrations have increased demand.',
    description,
    products = [],
  } = categoryData;

  return (
    <div className="space-y-8">
      {/* Back Button */}
      <div>
        <button
          type="button"
          onClick={() => navigate(ROUTES.THREADS_OF_BHARAT)}
          className="inline-flex items-center gap-2 text-xs font-bold text-text-muted hover:text-primary transition-colors py-2 px-3 rounded-xl bg-surface border border-border/80 shadow-subtle"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Threads of Bharat</span>
        </button>
      </div>

      {/* Header Banner */}
      <FashionPulseHeader
        category={category}
        state={state}
        growth_percentage={growth_percentage}
        reason={reason}
        description={description}
      />

      {/* Product Showcase Section */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-surface border border-border/80 shadow-subtle">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-primary" />
            <h2 className="text-base font-bold text-text-primary">
              Trending Products in {category}
            </h2>
          </div>
          <div className="inline-flex items-center gap-1.5 text-xs text-text-muted font-medium">
            <Sparkles className="w-4 h-4 text-accent" />
            <span>Verified Local Artisans & Stores</span>
          </div>
        </div>

        {/* Product Grid reusing existing ProductCard component */}
        {products.length === 0 ? (
          <div className="p-12 text-center bg-surface border border-dashed border-border rounded-3xl text-text-muted space-y-2">
            <ShoppingBag className="w-8 h-8 mx-auto text-text-muted/60" />
            <p className="text-sm font-semibold text-text-primary">No products available in this category yet</p>
            <p className="text-xs text-text-muted">
              Check back soon as local artisan stores update their inventory.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FashionPulseDetails;
