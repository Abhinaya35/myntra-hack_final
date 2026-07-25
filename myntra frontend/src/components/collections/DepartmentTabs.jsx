import React from 'react';
import { motion } from 'framer-motion';

/**
 * Component 2: DepartmentTabs
 * Sticky top department navigation bar (Women, Men, Kids, Baby) with animated underline indicator.
 */
export const DepartmentTabs = ({ departments = [], activeDepartment, onSelectDepartment }) => {
  const availableDepartments = departments.filter((d) => d.available);

  if (!availableDepartments || availableDepartments.length === 0) return null;

  return (
    <div className="sticky top-0 z-30 bg-surface/95 backdrop-blur-md border-b border-border/80 shadow-subtle py-1">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center gap-6 sm:gap-8 overflow-x-auto custom-scrollbar" aria-label="Departments">
          {availableDepartments.map((dept) => {
            const isSelected = activeDepartment === dept.id;

            return (
              <button
                key={dept.id}
                type="button"
                onClick={() => onSelectDepartment(dept.id)}
                className={`relative py-3 text-sm sm:text-base font-semibold transition-colors shrink-0 flex items-center gap-2 cursor-pointer ${
                  isSelected ? 'text-primary' : 'text-text-muted hover:text-text-primary'
                }`}
              >
                <span>{dept.label}</span>
                <span className="text-xs font-normal opacity-70">({dept.count})</span>

                {/* Premium Underline Animation */}
                {isSelected && (
                  <motion.div
                    layoutId="deptUnderline"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full"
                    transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                  />
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default DepartmentTabs;
