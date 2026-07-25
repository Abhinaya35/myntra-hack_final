import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PageContainer from '../../components/layout/PageContainer';
import FashionPulseDetails from '../../components/FashionPulse/FashionPulseDetails';
import fashionPulseService from '../../services/fashionPulseService';

/**
 * FashionPulseCategoryPage - Route Component for /fashion-pulse/category/:categoryId
 */
export const FashionPulseCategoryPage = () => {
  const { categoryId } = useParams();
  const [categoryData, setCategoryData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    fetchCategoryDetails();
  }, [categoryId]);

  const fetchCategoryDetails = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fashionPulseService.getCategoryDetails(categoryId);
      setCategoryData(data);
    } catch (err) {
      console.error(`[FashionPulseCategoryPage] Error fetching category details for '${categoryId}':`, err);
      setError(err.message || 'Failed to load category details.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageContainer maxWidth="max-w-7xl" padding="px-4 sm:px-6 lg:px-8 py-6 md:py-10 pb-24 md:pb-28">
      <FashionPulseDetails
        categoryData={categoryData}
        loading={loading}
        error={error}
        onRetry={fetchCategoryDetails}
      />
    </PageContainer>
  );
};

export default FashionPulseCategoryPage;
