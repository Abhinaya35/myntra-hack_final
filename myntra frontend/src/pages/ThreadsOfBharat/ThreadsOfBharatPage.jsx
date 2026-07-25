import React, { useEffect } from 'react';
import PageContainer from '../../components/layout/PageContainer';
import FashionPulseSection from '../../components/FashionPulse/FashionPulseSection';

/**
 * ThreadsOfBharatPage Component (Route: /threads-of-bharat)
 * Dedicated page displaying real-time regional fashion trends across India.
 */
export const ThreadsOfBharatPage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <PageContainer maxWidth="max-w-7xl" padding="px-4 sm:px-6 lg:px-8 py-6 md:py-10 pb-24 md:pb-28">
      <FashionPulseSection />
    </PageContainer>
  );
};

export default ThreadsOfBharatPage;
