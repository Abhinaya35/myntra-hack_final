import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';

// Layout & Component Imports
import PageContainer from '../../components/layout/PageContainer';
import ProductBreadcrumb from '../../components/product/ProductBreadcrumb';
import ProductHero from '../../components/product/ProductHero';
import ProductDescriptionSection from '../../components/product/ProductDescriptionSection';
import ProductStory from '../../components/product/ProductStory';
import MeetTheStore from '../../components/product/MeetTheStore';
import Specifications from '../../components/product/Specifications';
import RatingDistribution from '../../components/product/RatingDistribution';
import HeritagePromise from '../../components/product/HeritagePromise';
import StickyPurchaseBar from '../../components/product/StickyPurchaseBar';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ErrorState from '../../components/common/ErrorState';

// Service & Fallback Imports
import productService from '../../services/productService';
import { getProductData } from '../../data/mockProducts';

/**
 * ProductDetailsPage Component (Route: /product/:productId)
 * Integrated with FastAPI Backend GET /products/{productId}.
 * Renders all backend fields: Product Info, Gallery, Rating Summary, Rating Distribution, Variants (Colors & Sizes), Category & Sub-category.
 */
export const ProductDetailsPage = () => {
  const { productId } = useParams();

  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedColor, setSelectedColor] = useState('Default');
  const [selectedSize, setSelectedSize] = useState('FS');

  // Scroll to top on product change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    fetchProductDetails();
  }, [productId]);

  const fetchProductDetails = async () => {
    try {
      setLoading(true);
      setError(null);

      // Call GET /products/{productId}
      const apiResponse = await productService.getProductById(productId);
      const staticFallback = getProductData(productId) || {};

      const prod = apiResponse.product || {};
      const pricing = apiResponse.pricing || {};
      const ratings = apiResponse.ratings || {};
      const store = apiResponse.store || {};
      const rawSpecs = apiResponse.specifications || {};
      const variants = apiResponse.variants || {};

      const mainPrice = pricing.discount_price ?? pricing.price ?? 5999;
      const origPrice = pricing.price && pricing.discount_price && pricing.price > pricing.discount_price ? pricing.price : null;
      const discPct = pricing.discount_percentage ? `${Math.round(pricing.discount_percentage)}% OFF` : null;

      // Transform backend key-value specifications object into array of { label, value } objects
      let formattedSpecs = [];
      if (Array.isArray(rawSpecs)) {
        formattedSpecs = rawSpecs;
      } else if (rawSpecs && typeof rawSpecs === 'object') {
        formattedSpecs = Object.entries(rawSpecs).map(([label, value]) => ({
          label: String(label),
          value: String(value),
        }));
      }

      const formattedProduct = {
        id: prod.id || productId,
        name: prod.name,
        description: prod.description,
        category: prod.category,
        subCategory: prod.sub_category,
        gender: prod.gender,
        occasion: prod.occasion,
        material: prod.material,
        isAvailable: prod.is_available ?? true,
        availability: prod.is_available ? 'In Stock • Handcrafted & Ready to Ship' : 'Out of Stock',
        stockQuantity: prod.stock_quantity,
        
        // Pricing
        price: `₹${mainPrice.toLocaleString('en-IN')}`,
        originalPrice: origPrice ? `₹${origPrice.toLocaleString('en-IN')}` : null,
        discount: discPct,
        
        // Visual Assets (Gallery)
        image: prod.thumbnail || prod.image || 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=1200',
        images: prod.images && prod.images.length > 0 ? prod.images : [prod.thumbnail || 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=1200'],

        // Rating & Reviews Data
        rating: ratings.average_rating || 4.6,
        reviewCount: ratings.review_count || 120,
        ratingsRaw: ratings,

        // Store Information
        store: {
          id: store.id || prod.store_id,
          name: store.name || 'Regional Boutique Store',
          city: store.city || 'Hyderabad',
          state: store.state || 'Telangana',
          hubName: store.shopping_hub || store.city || 'Hyderabad',
          badgeText: store.is_verified ? 'Verified Regional Icon' : 'Regional Retailer',
          trustedSince: store.years_in_business ? `${new Date().getFullYear() - store.years_in_business}` : '1968',
          logo: store.logo_image || 'https://dummyimage.com/150x150/000/fff&text=Store',
          address: store.address || `${store.city}, ${store.state}`,
        },

        // Variants & Specifications Array
        options: {
          colors: variants.colors || [{ name: 'Default', hex: '#E34234' }],
          sizes: variants.sizes ? variants.sizes.map((s) => s.size || s) : ['FS'],
        },
        specifications: formattedSpecs,

        // Story narrative fallback
        story: staticFallback.story || {
          title: `Artisanal Creation of ${prod.name}`,
          content: prod.description || `Exquisite master-woven drape representing timeless craftsmanship.`,
        },
        trustBadges: [
          { label: 'GI Certified Craft' },
          { label: 'Verified Authentic Silk' },
        ],
      };

      setProductData(formattedProduct);

      if (formattedProduct.options.colors?.[0]) {
        const firstCol = formattedProduct.options.colors[0];
        setSelectedColor(typeof firstCol === 'string' ? firstCol : firstCol.name);
      }
      if (formattedProduct.options.sizes?.[0]) {
        const firstSz = formattedProduct.options.sizes[0];
        setSelectedSize(typeof firstSz === 'string' ? firstSz : firstSz.size);
      }
    } catch (err) {
      console.error(`[ProductDetailsPage] Failed to fetch product for ID '${productId}':`, err);
      setError(err.message || `Failed to load product details for ID '${productId}'. Please try again.`);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <PageContainer maxWidth="max-w-7xl" padding="px-4 sm:px-6 lg:px-8 py-16">
        <div className="py-20 flex justify-center">
          <LoadingSpinner size="lg" message="Loading product details & craftsmanship narrative..." />
        </div>
      </PageContainer>
    );
  }

  if (error || !productData) {
    return (
      <PageContainer maxWidth="max-w-7xl" padding="px-4 sm:px-6 lg:px-8 py-16">
        <ErrorState
          title="Product Not Found"
          message={error || `Could not find details for product ID '${productId}'.`}
          onRetry={fetchProductDetails}
        />
      </PageContainer>
    );
  }

  return (
    <PageContainer maxWidth="max-w-7xl" padding="px-4 sm:px-6 lg:px-8 py-6 md:py-10 pb-24 md:pb-28">
      <div className="space-y-16 sm:space-y-20 md:space-y-24">
        
        {/* 1. Breadcrumb & 2. Product Hero (Gallery, Pricing, Colors, Sizes, Ratings Summary) */}
        <div className="space-y-6">
          <ProductBreadcrumb product={productData} />
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <ProductHero
              product={productData}
              selectedColor={selectedColor}
              selectedSize={selectedSize}
              onSelectColor={setSelectedColor}
              onSelectSize={setSelectedSize}
            />
          </motion.div>
        </div>

        {/* 3. Product Description & Category / Sub-category Section */}
        {productData.description && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <ProductDescriptionSection
              description={productData.description}
              category={productData.category}
              subCategory={productData.subCategory}
              gender={productData.gender}
              occasion={productData.occasion}
              material={productData.material}
            />
          </motion.section>
        )}

        {/* 4. Specifications */}
        {productData.specifications && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <Specifications specifications={productData.specifications} />
          </motion.section>
        )}

        {/* 5. Rating Distribution (Horizontal Breakdown Bars) */}
        {productData.ratingsRaw && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <RatingDistribution ratings={productData.ratingsRaw} />
          </motion.section>
        )}

        {/* 6. Meet The Store */}
        {productData.store && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <MeetTheStore store={productData.store} />
          </motion.section>
        )}

        {/* 7. Product Story */}
        {productData.story && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <ProductStory story={productData.story} />
          </motion.section>
        )}

        {/* 8. Heritage Promise */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <HeritagePromise />
        </motion.section>

      </div>

      {/* Sticky Purchase Bar */}
      <StickyPurchaseBar product={productData} selectedSize={selectedSize} />
    </PageContainer>
  );
};

export default ProductDetailsPage;
