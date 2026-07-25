// Hook: useSimilarProducts
// Fetches similar product recommendations for a given productId using productService.
// Returns { data, loading, error } where data is an array of product objects.

import { useState, useEffect } from 'react';
import productService from '../services/productService';

export const useSimilarProducts = (productId, limit = 8) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!productId) return;
        let isMounted = true;
        const fetchSimilar = async () => {
            try {
                console.log('[useSimilarProducts] fetching for', productId);
                setLoading(true);
                const response = await productService.getSimilarRecommendations(productId, limit);
                // API returns { products: [...] }
                const similar = response?.products ?? [];
                console.log('[useSimilarProducts] received', similar.length, 'items');
                if (isMounted) setData(similar);
            } catch (err) {
                console.error('[useSimilarProducts] error', err);
                if (isMounted) setError(err);
            } finally {
                if (isMounted) setLoading(false);
            }
        };
        fetchSimilar();
        return () => {
            isMounted = false;
        };
    }, [productId, limit]);

    return { data, loading, error };
};
