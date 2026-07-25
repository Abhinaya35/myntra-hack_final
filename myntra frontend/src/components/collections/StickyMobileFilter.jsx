import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SlidersHorizontal, X, Check } from 'lucide-react';

/**
 * Component 7: StickyMobileFilter
 * Floating bottom filter button on mobile viewports opening a clean bottom sheet.
 */
export const StickyMobileFilter = ({
  departments = [],
  activeDepartment,
  onSelectDepartment,
  categories = [],
  activeCategory,
  onSelectCategory,
  sortBy,
  onSortChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const availableDepartments = departments.filter((d) => d.available);

  return (
    <>
      {/* Floating Bottom Button on Mobile */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 sm:hidden">
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="px-5 py-3 rounded-full bg-slate-950 text-white text-xs font-semibold shadow-elevated border border-slate-700 flex items-center gap-2 cursor-pointer"
        >
          <SlidersHorizontal className="w-4 h-4 text-accent" />
          <span>Filter & Sort Catalog</span>
        </button>
      </div>

      {/* Mobile Bottom Sheet Overlay */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/60 backdrop-blur-sm sm:hidden">
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="w-full bg-surface border-t border-border/80 rounded-t-3xl p-6 shadow-elevated max-h-[85vh] overflow-y-auto space-y-6"
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-border/60">
                <h3 className="font-editorial text-xl font-bold text-text-primary">
                  Filter & Sort Catalogue
                </h3>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-full text-text-muted hover:text-text-primary"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Department Selection */}
              <div className="space-y-2">
                <p className="text-xs font-semibold text-text-muted uppercase tracking-wider">
                  Select Department
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {availableDepartments.map((dept) => (
                    <button
                      key={dept.id}
                      type="button"
                      onClick={() => onSelectDepartment(dept.id)}
                      className={`p-3 rounded-xl text-xs font-semibold text-left flex items-center justify-between border ${
                        activeDepartment === dept.id
                          ? 'bg-primary text-white border-primary'
                          : 'bg-background border-border/80 text-text-primary'
                      }`}
                    >
                      <span>{dept.label}</span>
                      {activeDepartment === dept.id && <Check className="w-3.5 h-3.5" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Category Pills */}
              <div className="space-y-2">
                <p className="text-xs font-semibold text-text-muted uppercase tracking-wider">
                  Select Category
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => onSelectCategory(cat.id)}
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold border ${
                        activeCategory === cat.id
                          ? 'bg-primary text-white border-primary'
                          : 'bg-background border-border/80 text-text-primary'
                      }`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sort Selection */}
              <div className="space-y-2">
                <p className="text-xs font-semibold text-text-muted uppercase tracking-wider">
                  Sort By
                </p>
                <select
                  value={sortBy}
                  onChange={(e) => onSortChange(e.target.value)}
                  className="w-full p-3 rounded-xl bg-background border border-border/80 text-xs font-semibold text-text-primary focus:outline-none"
                >
                  <option value="popularity">Popularity</option>
                  <option value="newest">New Arrivals</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </select>
              </div>

              {/* Apply Button */}
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="w-full py-3.5 rounded-xl bg-primary text-white text-xs font-semibold shadow-subtle"
              >
                Apply Filters & View Catalogue
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default StickyMobileFilter;
