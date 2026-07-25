import React from 'react';
import FashionPulseCard from './FashionPulseCard';
import { Flame } from 'lucide-react';

/**
 * FashionPulseGrid - Grid container for trend cards with loading skeleton & empty state
 */
export const FashionPulseGrid = ({ trends = [], loading = false, error = null }) => {
  // Skeleton Loading State
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((n) => (
          <div
            key={n}
            className="bg-surface border border-border/80 rounded-3xl overflow-hidden shadow-card p-5 space-y-4 animate-pulse"
          >
            <div className="h-44 w-full bg-slate-200/80 rounded-2xl" />
            <div className="h-4 w-1/3 bg-slate-200/80 rounded-full" />
            <div className="h-14 w-full bg-slate-100 rounded-2xl" />
            <div className="h-5 w-1/4 bg-slate-200/80 rounded-full ml-auto" />
          </div>
        ))}
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="p-8 text-center bg-rose-50/50 border border-rose-200/80 rounded-3xl text-rose-700 space-y-2">
        <p className="text-sm font-semibold">Unable to load regional fashion trends</p>
        <p className="text-xs text-rose-600">{error}</p>
      </div>
    );
  }

  // Empty State
  if (!trends || trends.length === 0) {
    return (
      <div className="p-12 text-center bg-surface border border-dashed border-border rounded-3xl text-text-muted space-y-3">
        <Flame className="w-8 h-8 mx-auto text-primary/40" />
        <p className="text-sm font-semibold text-text-primary">No regional trends found for this filter</p>
        <p className="text-xs text-text-muted">
          Try selecting "All Regions" to discover trending fashion items across India.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {trends.map((trend, index) => (
        <FashionPulseCard key={trend.id || trend.categoryId || index} trend={trend} index={index} />
      ))}
    </div>
  );
};

export default FashionPulseGrid;
