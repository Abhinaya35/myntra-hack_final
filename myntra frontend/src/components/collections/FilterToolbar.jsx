import React from 'react';
import { ArrowUpDown, Filter, Sparkles } from 'lucide-react';

/**
 * Component 4: FilterToolbar
 * Compact horizontal filter & sort bar for quick catalog sorting & refinement.
 */
export const FilterToolbar = ({
  totalCount = 0,
  sortBy,
  onSortChange,
  selectedFabric,
  onFabricChange,
  selectedColor,
  onColorChange,
}) => {
  return (
    <div className="bg-surface border border-border/80 rounded-2xl p-3 sm:p-4 shadow-subtle flex flex-wrap items-center justify-between gap-3">
      {/* Product Count Display */}
      <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-text-primary">
        <Sparkles className="w-4 h-4 text-primary" />
        <span>Showing {totalCount} Handcraft Items</span>
      </div>

      {/* Toolbar Select Dropdowns */}
      <div className="flex items-center gap-2 sm:gap-3 flex-wrap text-xs">
        {/* Fabric Selector Filter */}
        <div className="flex items-center gap-1 bg-background border border-border/80 rounded-xl px-3 py-1.5 text-text-primary">
          <Filter className="w-3.5 h-3.5 text-text-muted" />
          <select
            value={selectedFabric || 'all'}
            onChange={(e) => onFabricChange(e.target.value === 'all' ? null : e.target.value)}
            className="bg-transparent font-medium text-xs focus:outline-none cursor-pointer"
          >
            <option value="all">All Fabrics</option>
            <option value="Kanchipuram Silk">Kanchipuram Silk</option>
            <option value="Pochampally Ikat">Pochampally Ikat</option>
            <option value="Tussar Silk">Tussar Silk</option>
            <option value="Gadwal Cotton-Silk">Gadwal Cotton-Silk</option>
            <option value="Tissue Silk">Tissue Silk</option>
            <option value="Chanderi Silk">Chanderi Silk</option>
            <option value="Raw Silk">Raw Silk</option>
          </select>
        </div>

        {/* Color Filter */}
        <div className="flex items-center gap-1 bg-background border border-border/80 rounded-xl px-3 py-1.5 text-text-primary">
          <select
            value={selectedColor || 'all'}
            onChange={(e) => onColorChange(e.target.value === 'all' ? null : e.target.value)}
            className="bg-transparent font-medium text-xs focus:outline-none cursor-pointer"
          >
            <option value="all">All Colors</option>
            <option value="Crimson Red">Crimson Red</option>
            <option value="Royal Blue">Royal Blue</option>
            <option value="Mustard Yellow">Mustard Yellow</option>
            <option value="Pastel Green">Pastel Green</option>
            <option value="Champagne Gold">Champagne Gold</option>
            <option value="Powder Pink">Powder Pink</option>
          </select>
        </div>

        {/* Sort Select Dropdown */}
        <div className="flex items-center gap-1 bg-primary/10 border border-primary/20 rounded-xl px-3 py-1.5 text-primary font-semibold">
          <ArrowUpDown className="w-3.5 h-3.5" />
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="bg-transparent font-semibold text-xs focus:outline-none cursor-pointer text-primary"
          >
            <option value="popularity">Sort by: Popularity</option>
            <option value="newest">Sort by: New Arrivals</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default FilterToolbar;
