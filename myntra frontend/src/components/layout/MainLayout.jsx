import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

/**
 * MainLayout wrapping every route with Navbar, main viewport area, and Footer
 */
export const MainLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-background text-text-primary">
      <Navbar />
      <div className="flex-1 flex flex-col">
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
