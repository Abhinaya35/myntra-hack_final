import React from 'react';
import { SlidersHorizontal } from 'lucide-react';

/**
 * Component 9: StickyCollectionFilter
 * Floating quick filter widget (sticky bottom bar on mobile / floating widget on desktop).
 */
export const StickyCollectionFilter = ({
  departments = [],
  activeDepartment,
  onSelectDepartment,
}) => {
  const availableDepartments = departments.filter((d) => d.available);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 p-3 bg-surface/90 backdrop-blur-xl border-t border-border/80 shadow-elevated md:bottom-6 md:right-6 md:left-auto md:max-w-md md:rounded-2xl md:border">
      <div className="flex items-center justify-between gap-2 overflow-x-auto custom-scrollbar">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-text-muted shrink-0 pr-2 border-r border-border/60">
          <SlidersHorizontal className="w-3.5 h-3.5 text-primary" />
          <span className="hidden sm:inline">Filter:</span>
        </div>

        <div className="flex items-center gap-1.5 w-full">
          {availableDepartments.map((dept) => {
            const isSelected = activeDepartment === dept.id;

            return (
              <button
                key={dept.id}
                type="button"
                onClick={() => onSelectDepartment(dept.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all shrink-0 cursor-pointer flex items-center gap-1 ${
                  isSelected
                    ? 'bg-primary text-white shadow-subtle'
                    : 'bg-surface border border-border/80 text-text-primary hover:bg-background'
                }`}
              >
                <span>{dept.icon}</span>
                <span>{dept.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default StickyCollectionFilter;
