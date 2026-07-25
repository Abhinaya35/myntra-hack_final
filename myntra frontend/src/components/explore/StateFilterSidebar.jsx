import React, { useState } from 'react';
import { Filter, Check, RotateCcw, Search } from 'lucide-react';

/**
 * StateFilterSidebar Component for Explore Page
 * Provides a clean checkbox list of Indian States to filter Shopping Hubs dynamically.
 */
export const StateFilterSidebar = ({
  availableStates = [],
  selectedStates = [],
  onStateToggle,
  onSelectAll,
  onClearAll,
  totalHubsCount = 0,
  filteredHubsCount = 0,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Filter state options by search query
  const filteredStatesList = availableStates.filter((st) =>
    st.name.toLowerCase().includes(searchTerm.toLowerCase().trim())
  );

  return (
    <div className="bg-surface border border-border/80 rounded-2xl p-5 shadow-card space-y-5 sticky top-24">
      {/* Sidebar Header */}
      <div className="flex items-center justify-between pb-3 border-b border-border/60">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-primary" />
          <h3 className="font-editorial text-lg font-bold text-text-primary">
            Filters
          </h3>
        </div>

        {selectedStates.length > 0 && (
          <button
            type="button"
            onClick={onClearAll}
            className="text-[11px] font-semibold text-primary hover:text-primary-hover flex items-center gap-1 transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>
        )}
      </div>

      {/* STATE Filter Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-text-muted">
            State
          </span>
          <span className="text-[11px] font-semibold text-text-muted">
            {selectedStates.length === 0
              ? 'All States'
              : `${selectedStates.length} Selected`}
          </span>
        </div>

        {/* Search State Input */}
        {availableStates.length > 6 && (
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
            <input
              type="text"
              placeholder="Search state..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-background border border-border/70 text-xs font-normal text-text-primary placeholder:text-text-muted/60 focus:outline-none focus:border-primary/50 transition-all"
            />
          </div>
        )}

        {/* Quick Select Buttons */}
        <div className="flex items-center gap-2 pt-1">
          <button
            type="button"
            onClick={onSelectAll}
            className="text-[11px] font-semibold text-text-muted hover:text-primary transition-colors underline"
          >
            Select All
          </button>
          <span className="text-text-muted/40">•</span>
          <button
            type="button"
            onClick={onClearAll}
            className="text-[11px] font-semibold text-text-muted hover:text-primary transition-colors underline"
          >
            Clear
          </button>
        </div>

        {/* Checkbox List */}
        <div className="space-y-1.5 max-h-72 overflow-y-auto custom-scrollbar pr-1 pt-1">
          {filteredStatesList.map((stateObj) => {
            const isChecked = selectedStates.includes(stateObj.name);

            return (
              <label
                key={stateObj.id || stateObj.name}
                className={`flex items-center justify-between p-2 rounded-xl border text-xs font-medium cursor-pointer transition-all ${
                  isChecked
                    ? 'bg-primary/10 border-primary/40 text-primary font-semibold'
                    : 'bg-background/50 border-transparent hover:border-border/80 text-text-primary hover:bg-background'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div
                    className={`w-4 h-4 rounded-md border flex items-center justify-center transition-all ${
                      isChecked
                        ? 'bg-primary border-primary text-white'
                        : 'border-border/80 bg-surface'
                    }`}
                  >
                    {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => onStateToggle(stateObj.name)}
                    className="sr-only"
                  />
                  <span className="truncate">{stateObj.name}</span>
                </div>

                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-md ${
                    isChecked
                      ? 'bg-primary/20 text-primary font-semibold'
                      : 'bg-border/40 text-text-muted'
                  }`}
                >
                  {stateObj.hubCount}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Summary Footer */}
      <div className="pt-3 border-t border-border/60 text-center">
        <span className="text-[11px] font-medium text-text-muted">
          Showing <strong className="text-text-primary">{filteredHubsCount}</strong> of {totalHubsCount} Shopping Hubs
        </span>
      </div>
    </div>
  );
};

export default StateFilterSidebar;
