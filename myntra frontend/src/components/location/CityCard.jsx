import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, ChevronRight, Building2 } from 'lucide-react';

/**
 * CityCard Component
 * Individual city card rendering city name, state, and shopping hub count with hover effects.
 */
export const CityCard = ({ city, onClick, isSelected = false }) => {
  return (
    <motion.button
      type="button"
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onClick(city)}
      className={`group relative w-full text-left p-4 rounded-2xl border transition-all duration-200 cursor-pointer flex items-center justify-between shadow-subtle ${
        isSelected
          ? 'bg-primary-light/40 border-primary text-primary shadow-card'
          : 'bg-surface border-border/80 hover:border-primary/40 hover:bg-background/80 text-text-primary'
      }`}
    >
      <div className="flex items-center gap-3.5 min-w-0">
        <div
          className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
            isSelected
              ? 'bg-primary text-white'
              : 'bg-background border border-border/60 text-primary group-hover:bg-primary group-hover:text-white'
          }`}
        >
          <Building2 className="w-4 h-4" />
        </div>

        <div className="truncate">
          <h4 className="text-xs sm:text-sm font-semibold tracking-tight truncate group-hover:text-primary transition-colors">
            {city.name}
          </h4>
          <p className="text-[11px] text-text-muted font-normal truncate">
            {city.state} · {city.hubCount || 3} Shopping Hubs
          </p>
        </div>
      </div>

      <div className="shrink-0 pl-2 text-text-muted group-hover:text-primary transition-colors">
        <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
      </div>
    </motion.button>
  );
};

export default CityCard;
