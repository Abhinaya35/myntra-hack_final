import React from 'react';
import { cn } from '../../utils/cn';

/**
 * Reusable Tab Bar component
 */
export const Tabs = ({
  tabs = [],
  activeTab,
  onChange,
  className = '',
}) => {
  return (
    <div className={cn("flex items-center gap-2 border-b border-border/80 overflow-x-auto no-scrollbar", className)}>
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={cn(
              "px-5 py-3 text-sm font-medium border-b-2 transition-all duration-200 whitespace-nowrap",
              isActive
                ? "border-primary text-primary font-semibold"
                : "border-transparent text-text-muted hover:text-text-primary hover:border-border"
            )}
          >
            {tab.label}
            {tab.count !== undefined && (
              <span className={cn(
                "ml-2 text-xs px-2 py-0.5 rounded-full font-mono",
                isActive ? "bg-primary-light text-primary" : "bg-background text-text-muted"
              )}>
                {tab.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};

export default Tabs;
