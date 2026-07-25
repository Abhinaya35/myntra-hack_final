import React from 'react';
import { Search, X } from 'lucide-react';

/**
 * CitySearch Component
 * Input search bar for live city filtering with search icon and clear button.
 */
export const CitySearch = ({ value, onChange, onClear, placeholder = 'Search city or state...' }) => {
  return (
    <div className="relative w-full">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-text-muted">
        <Search className="w-4 h-4" />
      </div>

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-11 pr-10 py-3.5 rounded-2xl bg-surface border border-border/80 text-xs sm:text-sm text-text-primary placeholder:text-text-muted/60 transition-all outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 shadow-subtle"
      />

      {value && (
        <button
          type="button"
          onClick={onClear}
          className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-text-muted hover:text-text-primary transition-colors focus:outline-none"
          aria-label="Clear search query"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export default CitySearch;
