import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';
import SectionHeader from '../common/SectionHeader';

/**
 * Section 9B: CustomerMoments Component
 * Emotional storytelling section celebrating real customer milestones and family traditions.
 */
export const CustomerMoments = ({ moments = [] }) => {
  if (!moments || moments.length === 0) return null;

  return (
    <div className="space-y-6">
      <SectionHeader
        tagline="Cherished Traditions"
        title="Customer Moments"
        subtitle="Stories of celebrations, wedding trousseaus, and memories passed down across generations."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {moments.map((item, i) => (
          <div
            key={item.id || i}
            className="group relative bg-surface border border-border/80 rounded-3xl overflow-hidden shadow-card hover:shadow-elevated transition-all duration-300 flex flex-col justify-between"
          >
            {/* Image */}
            <div className="relative h-60 w-full overflow-hidden bg-slate-900">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

              <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-surface/90 backdrop-blur-md text-[11px] font-semibold text-primary shadow-subtle flex items-center gap-1">
                <Heart className="w-3 h-3 text-primary fill-primary/20" />
                <span>{item.momentType}</span>
              </span>
            </div>

            {/* Description Details */}
            <div className="p-6 flex-1 flex flex-col justify-between space-y-2">
              <h4 className="font-editorial text-xl font-bold text-text-primary group-hover:text-primary transition-colors">
                {item.title}
              </h4>
              <p className="text-xs sm:text-sm text-text-muted font-normal leading-relaxed">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerMoments;
