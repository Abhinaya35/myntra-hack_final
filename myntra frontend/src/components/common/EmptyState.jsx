import React from 'react';
import { Compass } from 'lucide-react';
import Button from './Button';
import { cn } from '../../utils/cn';

/**
 * Reusable Empty State component with editorial styling
 */
export const EmptyState = ({
  icon: Icon = Compass,
  title = 'No regional fashion found',
  description = 'Try searching in a different city or exploring featured iconic hubs.',
  actionLabel,
  onAction,
  className = '',
}) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center p-12 text-center bg-surface border border-border/60 rounded-3xl shadow-subtle my-6 max-w-md mx-auto",
        className
      )}
    >
      <div className="p-4 bg-primary-light/40 text-primary rounded-2xl mb-4">
        <Icon className="w-8 h-8" />
      </div>
      <h3 className="text-xl font-editorial font-semibold text-text-primary mb-2">
        {title}
      </h3>
      <p className="text-sm text-text-muted mb-6 leading-relaxed max-w-xs">
        {description}
      </p>
      {actionLabel && onAction && (
        <Button variant="outline" size="sm" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;
