import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';
import Button from './Button';
import { cn } from '../../utils/cn';

/**
 * Reusable Error State component
 */
export const ErrorState = ({
  title = 'Something went wrong',
  message = 'Unable to connect to the regional fashion directory.',
  onRetry,
  className = '',
}) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center p-8 text-center bg-rose-50/50 border border-rose-200/80 rounded-2xl max-w-md mx-auto my-6",
        className
      )}
    >
      <div className="p-3 bg-rose-100 text-rose-600 rounded-xl mb-3">
        <AlertCircle className="w-6 h-6" />
      </div>
      <h4 className="text-base font-semibold text-rose-950 mb-1">
        {title}
      </h4>
      <p className="text-xs text-rose-700 mb-4 leading-relaxed max-w-xs">
        {message}
      </p>
      {onRetry && (
        <Button
          variant="outline"
          size="sm"
          leftIcon={RefreshCw}
          onClick={onRetry}
          className="border-rose-200 text-rose-800 hover:bg-rose-100/60"
        >
          Try Again
        </Button>
      )}
    </div>
  );
};

export default ErrorState;
