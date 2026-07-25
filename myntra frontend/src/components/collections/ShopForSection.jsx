import React from 'react';
import { motion } from 'framer-motion';
import SectionHeader from '../common/SectionHeader';

/**
 * Component 2: ShopForSection
 * Audience department selection cards (Women, Men, Kids, Baby) filtering available sections.
 */
export const ShopForSection = ({ departments = [], activeDepartment, onSelectDepartment }) => {
  const availableDepartments = departments.filter((d) => d.available);

  if (!availableDepartments || availableDepartments.length === 0) return null;

  return (
    <div className="space-y-6">
      <SectionHeader
        tagline="Audience Navigation"
        title="Shop For"
        subtitle="Select a department to reveal handcrafted regional fashion categories."
      />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6">
        {availableDepartments.map((dept) => {
          const isSelected = activeDepartment === dept.id;

          return (
            <motion.button
              key={dept.id}
              type="button"
              onClick={() => onSelectDepartment(dept.id)}
              whileHover={{ y: -4, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className={`relative p-5 sm:p-6 rounded-3xl border text-left transition-all duration-300 shadow-subtle cursor-pointer overflow-hidden ${
                isSelected
                  ? 'bg-primary text-white border-primary shadow-elevated ring-2 ring-primary/30'
                  : 'bg-surface border-border/80 text-text-primary hover:border-primary/40 hover:shadow-card'
              }`}
            >
              {/* Active Indicator Backdrop */}
              {isSelected && (
                <motion.div
                  layoutId="activeDeptBg"
                  className="absolute inset-0 bg-primary z-0"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}

              <div className="relative z-10 flex items-center justify-between">
                <span className="text-3xl sm:text-4xl">{dept.icon}</span>
                <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                  isSelected
                    ? 'bg-white/20 text-white'
                    : 'bg-background border border-border/60 text-text-muted'
                }`}>
                  {dept.count} Categories
                </span>
              </div>

              <div className="relative z-10 mt-4 space-y-0.5">
                <h3 className="font-editorial text-xl sm:text-2xl font-bold tracking-tight">
                  {dept.label}
                </h3>
                <p className={`text-xs ${isSelected ? 'text-white/80' : 'text-text-muted'}`}>
                  Explore {dept.label}'s Weaves
                </p>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default ShopForSection;
