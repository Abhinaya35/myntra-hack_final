import React from 'react';
import PageTransition from '../animations/PageTransition';
import { cn } from '../../utils/cn';

/**
 * Reusable PageContainer component wrapping page views
 */
export const PageContainer = ({
  children,
  className = '',
  maxWidth = 'max-w-7xl',
  padding = 'px-4 sm:px-6 lg:px-8 py-8 md:py-12',
}) => {
  return (
    <PageTransition className={cn("w-full mx-auto flex-1 min-h-[calc(100vh-5rem)]", maxWidth, padding, className)}>
      {children}
    </PageTransition>
  );
};

export default PageContainer;
