import React from 'react';
import { cn } from '../../utils/cn';

/**
 * Reusable Loading Spinner & Skeleton loader component
 */
export const LoadingSpinner = ({
  size = 'md',
  message = 'Exploring regional fashion details...',
  fullScreen = false,
  className = '',
}) => {
  const sizes = {
    sm: 'w-5 h-5 border-2',
    md: 'w-8 h-8 border-3',
    lg: 'w-12 h-12 border-4',
  };

  const container = (
    <div className={cn("flex flex-col items-center justify-center p-8 text-center space-y-3", className)}>
      <div
        className={cn(
          "border-primary border-t-transparent rounded-full animate-spin",
          sizes[size]
        )}
      />
      {message && (
        <p className="text-xs uppercase tracking-widest text-text-muted font-medium animate-pulse">
          {message}
        </p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        {container}
      </div>
    );
  }

  return container;
};

export default LoadingSpinner;
