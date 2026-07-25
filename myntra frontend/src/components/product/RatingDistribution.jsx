import React from 'react';
import { Star } from 'lucide-react';
import SectionHeader from '../common/SectionHeader';

/**
 * RatingDistribution Component
 * Displays average rating summary and 5-star to 1-star horizontal rating breakdown bars.
 */
export const RatingDistribution = ({ ratings }) => {
  if (!ratings || !ratings.rating_distribution) return null;

  const avgRating = ratings.average_rating || 4.5;
  const totalReviews = ratings.review_count || 0;
  const dist = ratings.rating_distribution || {};

  // Calculate sum of distribution if totalReviews not given
  const calculatedTotal = Object.values(dist).reduce((acc, val) => acc + (val || 0), 0) || totalReviews || 1;

  const starLevels = ['5', '4', '3', '2', '1'];

  return (
    <div className="space-y-6">
      <SectionHeader
        tagline="Customer Reviews"
        title="Ratings & Reviews Summary"
        subtitle="Verified buyer ratings and customer feedback breakdown."
      />

      <div className="bg-surface border border-border/80 rounded-3xl p-6 sm:p-8 shadow-card grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        
        {/* Overall Score */}
        <div className="md:col-span-4 text-center md:text-left space-y-2 border-b md:border-b-0 md:border-r border-border/60 pb-6 md:pb-0 md:pr-8">
          <div className="font-editorial text-5xl font-bold text-text-primary flex items-center justify-center md:justify-start gap-2">
            <span>{avgRating}</span>
            <Star className="w-8 h-8 fill-amber-400 text-amber-400" />
          </div>
          <p className="text-sm font-semibold text-text-primary">Out of 5 Stars</p>
          <p className="text-xs text-text-muted">Based on {calculatedTotal.toLocaleString('en-IN')} verified ratings</p>
        </div>

        {/* Rating Breakdown Bars */}
        <div className="md:col-span-8 space-y-3">
          {starLevels.map((star) => {
            const count = dist[star] || 0;
            const percentage = Math.round((count / calculatedTotal) * 100);

            return (
              <div key={star} className="flex items-center gap-3 text-xs font-semibold">
                <div className="w-10 flex items-center gap-1 shrink-0 text-text-primary">
                  <span>{star}</span>
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                </div>

                {/* Progress Bar Container */}
                <div className="flex-1 h-3 rounded-full bg-background border border-border/60 overflow-hidden">
                  <div
                    className="h-full bg-amber-400 rounded-full transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                  />
                </div>

                <div className="w-16 text-right shrink-0 text-text-muted font-medium">
                  <span>{count} ({percentage}%)</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};

export default RatingDistribution;
