import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Calendar } from 'lucide-react';
import SectionHeader from '../common/SectionHeader';

/**
 * Component 5: OccasionExplorer
 * Interactive occasion selection cards (Wedding, Office, Festival, Party, Travel, Daily Wear).
 */
export const OccasionExplorer = ({ occasions = [], activeOccasion, onSelectOccasion }) => {
  if (!occasions || occasions.length === 0) return null;

  return (
    <div className="space-y-6">
      <SectionHeader
        tagline="Lifestyle & Events"
        title="Shop By Occasion"
        subtitle="Filter handloom collections crafted specifically for life's memorable celebrations."
      />

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {occasions.map((occ) => {
          const isSelected = activeOccasion === occ.id;

          return (
            <motion.button
              key={occ.id}
              type="button"
              onClick={() => onSelectOccasion(isSelected ? null : occ.id)}
              whileHover={{ y: -3, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`p-4 rounded-2xl border text-center transition-all duration-300 cursor-pointer flex flex-col items-center justify-center space-y-2 ${
                isSelected
                  ? 'bg-primary text-white border-primary shadow-card ring-2 ring-primary/20'
                  : 'bg-surface border-border/80 text-text-primary hover:border-primary/40 hover:shadow-subtle'
              }`}
            >
              <span className="text-2xl sm:text-3xl">{occ.icon}</span>
              <div>
                <p className="font-editorial text-base sm:text-lg font-bold">
                  {occ.label}
                </p>
                <p className={`text-[11px] ${isSelected ? 'text-white/80' : 'text-text-muted'}`}>
                  {occ.count} Designs
                </p>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default OccasionExplorer;
