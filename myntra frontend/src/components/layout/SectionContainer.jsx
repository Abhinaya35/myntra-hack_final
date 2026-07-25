import React from 'react';
import { cn } from '../../utils/cn';

/**
 * Reusable SectionContainer for consistent vertical section spacing and layouts
 */
export const SectionContainer = ({
  children,
  className = '',
  id,
  py = 'py-10 md:py-14',
}) => {
  return (
    <section id={id} className={cn("w-full relative", py, className)}>
      {children}
    </section>
  );
};

export default SectionContainer;
