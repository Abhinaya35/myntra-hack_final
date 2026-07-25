import React from 'react';
import IndiaBackdrop from '../../pages/Landing/IndiaBackdrop';
import PageContainer from '../layout/PageContainer';

/**
 * AuthLayout Component
 * Provides a responsive, centered page framework with ambient backdrop styling.
 */
export const AuthLayout = ({ children }) => {
  return (
    <PageContainer maxWidth="max-w-4xl" padding="px-4 py-8 md:py-12 flex items-center justify-center min-h-[calc(100vh-5rem)]">
      {/* India-inspired ambient background animation */}
      <IndiaBackdrop />

      {/* Main Viewport Centered Container */}
      <div className="relative z-10 w-full flex flex-col items-center justify-center my-auto py-6">
        {children}
      </div>
    </PageContainer>
  );
};

export default AuthLayout;
