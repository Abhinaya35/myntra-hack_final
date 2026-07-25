/**
 * Comprehensive Mock Data Provider for Product Details Page
 */
export const MOCK_PRODUCTS_DATA = {
  'prod-101': {
    id: 'prod-101',
    name: 'Crimson Gold Kanjivaram Bridal Silk Saree',
    priceNumber: 34999,
    price: '₹34,999',
    originalPrice: '₹42,000',
    discount: '17% OFF',
    availability: 'In Stock • Handcrafted & Insured Shipping',
    
    // Store Info
    store: {
      id: 'dest-1',
      name: 'Rajkamal Sarees',
      logo: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=200&q=80',
      hubName: 'Abids Heritage Fashion District',
      city: 'Hyderabad',
      state: 'Telangana',
      trustedSince: '1968',
      yearsInBusiness: 58,
      isVerified: true,
      badgeText: 'Verified Regional Fashion Icon',
    },

    // Hero Badges
    trustBadges: [
      { id: 'b1', label: 'GI Tag Certified', icon: 'ShieldCheck' },
      { id: 'b2', label: '100% Handwoven', icon: 'Sparkles' },
      { id: 'b3', label: 'Verified Authentic Silk', icon: 'Award' },
    ],

    // Product Images
    images: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1596783074918-c84cb06531ca?auto=format&fit=crop&w=1000&q=85',
    ],

    // Story behind the piece
    story: {
      headline: 'A Sacred Drape Woven with 24k Pure Gold Thread',
      paragraphs: [
        'Crafted using ancient Kanchipuram double-warp weaving techniques with 100% pure mulberry silk sourced directly from South Indian weaver guilds.',
        'Handwoven by master artisans whose loom expertise has been passed down for over three generations in Kanchipuram.',
        'Designed for royal weddings, grand rituals, and milestone family celebrations that demand timeless heirloom elegance.',
      ],
    },

    // Craft Details Cards
    craftDetails: [
      { id: 'cd1', label: 'Craft Origin', value: 'Kanchipuram, Tamil Nadu' },
      { id: 'cd2', label: 'Raw Material', value: '100% Mulberry Silk & Gold Zari' },
      { id: 'cd3', label: 'Weaving Technique', value: 'Double-Warp Hand Loom' },
      { id: 'cd4', label: 'Crafting Time', value: '90 Days Hand Weaving' },
      { id: 'cd5', label: 'Region & Guild', value: 'South Indian Weaver Cooperative' },
      { id: 'cd6', label: 'Artisan Community', value: '3rd Gen Master Weaver Family' },
    ],

    // Product Options
    options: {
      colors: [
        { id: 'crimson', name: 'Crimson Red & Gold', hex: '#8B0000' },
        { id: 'emerald', name: 'Royal Emerald & Gold', hex: '#046307' },
        { id: 'navy', name: 'Imperial Navy & Gold', hex: '#000080' },
      ],
      sizes: ['Unstitched Saree (6.3m with Blouse Piece)', 'Pre-Stitched Drape with Custom Blouse'],
      quantities: [1, 2, 3],
    },

    // Why You'll Love It Features
    whyLove: [
      { id: 'wl1', title: 'GI Tag Certified', desc: 'Geographical Indication authenticated Kanchipuram weave.' },
      { id: 'wl2', title: '100% Handwoven', desc: 'Woven entirely on traditional pit looms without machines.' },
      { id: 'wl3', title: 'Pure Mulberry Silk', desc: 'Silk Mark certified unadulterated high-density silk.' },
      { id: 'wl4', title: 'Royal Wedding Heritage', desc: 'Intricate temple border motifs in certified 24k gold leaf zari.' },
      { id: 'wl5', title: 'Natural Mineral Dyes', desc: 'Dyed using eco-friendly natural color extracts.' },
      { id: 'wl6', title: 'Heirloom Longevity', desc: 'Designed to retain luster across generations.' },
    ],

    // Specifications
    specifications: [
      { label: 'Fabric / Material', value: 'Pure Kanchipuram Mulberry Silk' },
      { label: 'Primary Color', value: 'Crimson Red with Gold Zari' },
      { label: 'Occasion', value: 'Bridal, Wedding Rituals, Grand Festive' },
      { label: 'Border & Pallu', value: 'Heavy 24k Gold Leaf Zari Temple Motif' },
      { label: 'Saree Length', value: '5.5 Meters + 0.8 Meter Blouse Piece' },
      { label: 'Wash & Care', value: 'Dry Clean Only • Store in Cotton Muslin Wrap' },
      { label: 'Origin Region', value: 'Kanchipuram Handloom District, India' },
    ],

    // Similar Products
    similarProducts: [
      {
        id: 'prod-102',
        name: 'Royal Blue & Emerald Pochampally Double Ikat',
        price: '₹18,500',
        originalPrice: '₹22,000',
        regionalBadge: 'Pochampally GI Craft',
        image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=600&q=80',
      },
      {
        id: 'prod-103',
        name: 'Hand-painted Kalamkari Tussar Silk Saree',
        price: '₹14,200',
        originalPrice: '₹16,500',
        regionalBadge: 'Srikalahasti Art',
        image: 'https://images.unsplash.com/photo-1596783074918-c84cb06531ca?auto=format&fit=crop&w=600&q=80',
      },
      {
        id: 'prod-104',
        name: 'Gadwal Pure Cotton-Silk Zari Border Saree',
        price: '₹11,800',
        originalPrice: '₹13,900',
        regionalBadge: 'Gadwal Weave',
        image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=600&q=80',
      },
      {
        id: 'prod-105',
        name: 'Champagne Tissue Uppada Jamdani Saree',
        price: '₹28,600',
        originalPrice: '₹32,500',
        regionalBadge: 'Uppada Mastercraft',
        image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=600&q=80',
      },
    ],

    // More from Rajkamal Sarees
    moreFromStore: [
      {
        id: 'prod-106',
        name: 'Lucknowi Chikankari Embroidered Silk Kurti Set',
        price: '₹16,400',
        originalPrice: '₹19,000',
        regionalBadge: 'Lucknow Craft',
        image: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?auto=format&fit=crop&w=600&q=80',
      },
      {
        id: 'prod-102',
        name: 'Royal Blue & Emerald Pochampally Double Ikat',
        price: '₹18,500',
        originalPrice: '₹22,000',
        regionalBadge: 'Pochampally GI Craft',
        image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=600&q=80',
      },
    ],
  },
};

/**
 * Fallback generator for dynamically requested product IDs
 */
export const getProductData = (productId) => {
  if (MOCK_PRODUCTS_DATA[productId]) {
    return MOCK_PRODUCTS_DATA[productId];
  }

  // Dynamic fallback product details
  return {
    id: productId || 'prod-generic',
    name: productId ? productId.replace('prod-', 'Handcrafted Regional Weave ').toUpperCase() : 'Pure Handloom Masterpiece',
    priceNumber: 18500,
    price: '₹18,500',
    originalPrice: '₹22,000',
    discount: '15% OFF',
    availability: 'In Stock • Handcrafted & Ready to Ship',

    store: {
      id: 'dest-1',
      name: 'Rajkamal Sarees',
      logo: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=200&q=80',
      hubName: 'Abids Heritage Fashion District',
      city: 'Hyderabad',
      state: 'Telangana',
      trustedSince: '1968',
      yearsInBusiness: 58,
      isVerified: true,
      badgeText: 'Verified Regional Fashion Icon',
    },

    trustBadges: [
      { id: 'b1', label: 'GI Tag Certified', icon: 'ShieldCheck' },
      { id: 'b2', label: '100% Handwoven', icon: 'Sparkles' },
    ],

    images: [
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1596783074918-c84cb06531ca?auto=format&fit=crop&w=1000&q=85',
    ],

    story: {
      headline: 'Artisanal Handloom Weaving Preserved Across Generations',
      paragraphs: [
        'Woven on traditional wooden frame looms by rural artisan guilds using 100% pure natural fibers.',
        'Preserving regional textile heritage with uncompromised thread quality and authentic cultural motifs.',
      ],
    },

    craftDetails: [
      { id: 'cd1', label: 'Craft Origin', value: 'Hyderabad, Telangana' },
      { id: 'cd2', label: 'Raw Material', value: '100% Pure Silk & Zari' },
      { id: 'cd3', label: 'Weaving Technique', value: 'Handloom Pit Loom' },
      { id: 'cd4', label: 'Crafting Time', value: '45 Days Hand Weaving' },
    ],

    options: {
      colors: [
        { id: 'blue', name: 'Royal Blue', hex: '#000080' },
        { id: 'emerald', name: 'Emerald Green', hex: '#046307' },
      ],
      sizes: ['Unstitched Saree (6.3m)', 'Stitched Ready to Wear'],
      quantities: [1, 2],
    },

    whyLove: [
      { id: 'wl1', title: 'GI Tag Certified', desc: 'Authenticated regional handicraft.' },
      { id: 'wl2', title: '100% Handwoven', desc: 'Woven on traditional pit looms.' },
    ],

    specifications: [
      { label: 'Fabric / Material', value: 'Pure Regional Silk' },
      { label: 'Occasion', value: 'Festive & Celebration' },
      { label: 'Wash Care', value: 'Dry Clean Only' },
    ],

    similarProducts: [
      {
        id: 'prod-101',
        name: 'Crimson Gold Kanjivaram Bridal Silk Saree',
        price: '₹34,999',
        originalPrice: '₹42,000',
        regionalBadge: 'Kanchipuram Handloom',
        image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80',
      },
    ],

    moreFromStore: [
      {
        id: 'prod-103',
        name: 'Hand-painted Kalamkari Tussar Silk Saree',
        price: '₹14,200',
        originalPrice: '₹16,500',
        regionalBadge: 'Srikalahasti Art',
        image: 'https://images.unsplash.com/photo-1596783074918-c84cb06531ca?auto=format&fit=crop&w=600&q=80',
      },
    ],
  };
};
