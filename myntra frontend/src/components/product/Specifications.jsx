import React from 'react';
import SectionHeader from '../common/SectionHeader';

/**
 * Component 8: Specifications
 * Essential product specifications presented using elegant cards instead of tables.
 */
export const Specifications = ({ specifications = [] }) => {
  if (!specifications || !Array.isArray(specifications) || specifications.length === 0) return null;

  return (
    <div className="space-y-6">
      <SectionHeader
        tagline="Essential Overview"
        title="Product Specifications"
        subtitle="Key details regarding fiber composition, garment care, and regional craftsmanship."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {specifications.map((spec, index) => (
          <div
            key={index}
            className="p-4 sm:p-5 rounded-2xl bg-surface border border-border/80 shadow-subtle space-y-1"
          >
            <p className="text-[11px] font-semibold text-text-muted uppercase tracking-wider">
              {spec.label}
            </p>
            <p className="font-editorial text-base font-bold text-text-primary">
              {spec.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Specifications;
