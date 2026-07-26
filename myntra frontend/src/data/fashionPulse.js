/**
 * Bharat Fashion Pulse - Isolated Mock Data File
 * 
 * BACKEND CONTRACT REFERENCE:
 * GET /recommendations/fashion-pulse
 * GET /recommendations/fashion-pulse/{categoryId}
 * 
 * Note: Do not mix this mock data with existing project mock files.
 * This structure matches the exact schema expected from the backend API.
 */

export const MOCK_FASHION_PULSE_TRENDS = [
  {
    id: 'pulse_001',
    state: 'Telangana',
    category: 'Temple Jewellery',
    categoryId: 'temple-jewellery',
    growth_percentage: 35,
    reason: 'Bonalu shopping has increased demand this week.',
    icon: 'Sparkles',
    image: 'https://i.postimg.cc/j5Yf0rMH/Screenshot-2026-07-26-113930.png',
  },
  {
    id: 'pulse_002',
    state: 'Rajasthan',
    category: 'Bandhani Sarees',
    categoryId: 'bandhani-sarees',
    growth_percentage: 28,
    reason: 'Trending because of seasonal festival shopping.',
    icon: 'TrendingUp',
    image: 'https://i.postimg.cc/90651Jmf/Screenshot-2026-07-26-114943.png',
  },
  {
    id: 'pulse_003',
    state: 'Telangana',
    category: 'Traditional Kurtas',
    categoryId: 'traditional-kurtas',
    growth_percentage: 18,
    reason: 'Popular among festive shoppers and cultural events.',
    icon: 'ShoppingBag',
    image: 'https://i.postimg.cc/N0p3Zgsx/Screenshot-2026-07-26-115100.png',
  },
  {
    id: 'pulse_004',
    state: 'Tamil Nadu',
    category: 'Kanjivaram Silks',
    categoryId: 'kanjivaram-silks',
    growth_percentage: 32,
    reason: 'High surge driven by wedding season preparations.',
    icon: 'Flame',
    image: 'https://i.postimg.cc/fT1Tgf2x/Screenshot-2026-07-26-114608.png',
  },
  {
    id: 'pulse_005',
    state: 'Madhya Pradesh',
    category: 'Chanderi Silks',
    categoryId: 'chanderi-silks',
    growth_percentage: 22,
    reason: 'Summer weaving showcases boosting lightweight silk demand.',
    icon: 'Award',
    image: 'https://i.postimg.cc/1zhX4rDt/Screenshot-2026-07-26-114307.png',
  },
  {
    id: 'pulse_006',
    state: 'West Bengal',
    category: 'Jamdani Weaves',
    categoryId: 'jamdani-weaves',
    growth_percentage: 26,
    reason: 'Artisan pop-ups highlighting handcrafted cotton drapes.',
    icon: 'Compass',
    image: 'https://i.postimg.cc/Y9XtN6Lg/Screenshot-2026-07-26-114735.png',
  },
];

export const MOCK_FASHION_PULSE_CATEGORY_DETAILS = {
  'temple-jewellery': {
    categoryId: 'temple-jewellery',
    category: 'Temple Jewellery',
    state: 'Telangana',
    growth_percentage: 35,
    reason: 'Bonalu celebrations have increased demand for traditional temple jewellery.',
    description: 'Intricately handcrafted antique gold and silver temple jewellery inspired by divine motifs, sacred temple architecture, and Telangana festive heritage.',
    products: [
      {
        id: 'prod-pulse-101',
        title: 'Antique Nakshi Gold Plated Goddess Lakshmi Choker',
        craftName: 'Nakshi Temple Craft',
        region: 'Hyderabad, Telangana',
        price: 12499,
        storeId: 'dest-1',
        storeName: 'Rajkamal Jewellers & Heritage Crafts',
        image: 'https://i.postimg.cc/j5Yf0rMH/Screenshot-2026-07-26-113930.png',
        availableOffline: true,
        availableOnline: true,
      },
      {
        id: 'prod-pulse-102',
        title: 'Heritage Ruby Kemp Temple Haram Set',
        craftName: 'Kemp Stone Craft',
        region: 'Secunderabad, Telangana',
        price: 18999,
        storeId: 'dest-1',
        storeName: 'Sri Venkateshwara Heritage Jewels',
        image: 'https://i.postimg.cc/Y9VCKN22/Screenshot-2026-07-26-120945.png',
        availableOffline: true,
        availableOnline: true,
      },
      {
        id: 'prod-pulse-103',
        title: 'Handcrafted Temple Coin (Jhumka) Earrings',
        craftName: 'Guttapusalu Weave',
        region: 'Hyderabad, Telangana',
        price: 6499,
        storeId: 'dest-1',
        storeName: 'Deccan Heritage Crafts',
        image: 'https://i.postimg.cc/13Z43Kp2/Screenshot-2026-07-26-121022.png',
        availableOffline: true,
        availableOnline: true,
      },
      {
        id: 'prod-pulse-104',
        title: '22k Gold Finish Guttapusalu Pearl Necklace',
        craftName: 'Guttapusalu Craft',
        region: 'Hyderabad, Telangana',
        price: 24500,
        storeId: 'dest-1',
        storeName: 'Rajkamal Jewellers & Heritage Crafts',
        image: 'https://i.postimg.cc/vmYBWH2W/Screenshot-2026-07-26-121007.png',
        availableOffline: true,
        availableOnline: true,
      },
    ],
  },

  'bandhani-sarees': {
    categoryId: 'bandhani-sarees',
    category: 'Bandhani Sarees',
    state: 'Rajasthan',
    growth_percentage: 28,
    reason: 'Trending because of seasonal festival shopping and traditional celebrations.',
    description: 'Authentic tie-and-dye handcrafted Bandhani sarees featuring vibrant hues, intricate dot patterns, and festive Gota Patti work.',
    products: [
      {
        id: 'prod-pulse-201',
        title: 'Royal Red & Yellow Jhankaar Bandhani Georgette Saree',
        craftName: 'Bandhej Tie-Dye',
        region: 'Jaipur, Rajasthan',
        price: 8999,
        storeId: 'dest-2',
        storeName: 'Jaipur Bandhej Emporium',
        image: 'https://i.postimg.cc/0yJGLZ9T/Screenshot-2026-07-26-120337.png',
        availableOffline: true,
        availableOnline: true,
      },
      {
        id: 'prod-pulse-202',
        title: 'Hand-tied Pure Silk Bandhani Saree with Gota Border',
        craftName: 'Gota Patti & Bandhej',
        region: 'Jodhpur, Rajasthan',
        price: 14500,
        storeId: 'dest-2',
        storeName: 'Marwar Heritage Textiles',
        image: 'https://i.postimg.cc/90651Jmf/Screenshot-2026-07-26-114943.png',
        availableOffline: true,
        availableOnline: true,
      },
    ],
  },

  'traditional-kurtas': {
    categoryId: 'traditional-kurtas',
    category: 'Traditional Kurtas',
    state: 'Telangana',
    growth_percentage: 18,
    reason: 'Popular among festive shoppers and cultural event attendees.',
    description: 'Contemporary and traditional handloom cotton and silk kurtas tailored for comfort and festive elegance.',
    products: [
      {
        id: 'prod-pulse-301',
        title: 'Raw Silk Festive Kurta with Zardosi Embroidery',
        craftName: 'Handloom Silk',
        region: 'Hyderabad, Telangana',
        price: 4999,
        storeId: 'dest-1',
        storeName: 'Charminar Ethnic Wear',
        image: 'https://i.postimg.cc/3rsX5Vwx/Screenshot-2026-07-26-121345.png',
        availableOffline: true,
        availableOnline: true,
      },
      {
        id: 'prod-pulse-302',
        title: 'Pochampally Ikat Pattern Men’s Short Kurta',
        craftName: 'Ikat Weave',
        region: 'Pochampally, Telangana',
        price: 3299,
        storeId: 'dest-1',
        storeName: 'Deccan Weavers Guild',
        image: 'https://i.postimg.cc/hvdVQb2F/Screenshot-2026-07-26-121414.png',
        availableOffline: true,
        availableOnline: true,
      },
    ],
  },

  'kanjivaram-silks': {
    categoryId: 'kanjivaram-silks',
    category: 'Kanjivaram Silks',
    state: 'Tamil Nadu',
    growth_percentage: 32,
    reason: 'High surge driven by wedding season preparations across South India.',
    description: 'World-famous Kanchipuram mulberry silk sarees woven with pure zari threads and classic temple borders.',
    products: [
      {
        id: 'prod-pulse-401',
        title: 'Crimson Gold Pure Kanjivaram Bridal Silk Saree',
        craftName: 'Kanchipuram Silk',
        region: 'Kanchipuram, Tamil Nadu',
        price: 34999,
        storeId: 'dest-3',
        storeName: 'Temple Weavers Guild',
        image: 'https://i.postimg.cc/fT1Tgf2x/Screenshot-2026-07-26-114608.png',
        availableOffline: true,
        availableOnline: true,
      },
    ],
  },
};

/**
 * Fallback details getter for dynamically requested categories
 */
export const getCategoryDetailsMock = (categoryId) => {
  if (MOCK_FASHION_PULSE_CATEGORY_DETAILS[categoryId]) {
    return MOCK_FASHION_PULSE_CATEGORY_DETAILS[categoryId];
  }

  // Generic fallback if categoryId is not explicitly matched
  const matchedTrend = MOCK_FASHION_PULSE_TRENDS.find((t) => t.categoryId === categoryId);

  return {
    categoryId: categoryId || 'general-trend',
    category: matchedTrend ? matchedTrend.category : 'Regional Fashion Trend',
    state: matchedTrend ? matchedTrend.state : 'Pan-India',
    growth_percentage: matchedTrend ? matchedTrend.growth_percentage : 25,
    reason: matchedTrend ? matchedTrend.reason : 'Increased regional demand driven by seasonal festivities and local fashion icons.',
    description: 'Authentic regional fashion items trending among style-conscious shoppers across the state.',
    products: [
      {
        id: `prod-fallback-${categoryId}-1`,
        title: `Authentic ${matchedTrend ? matchedTrend.category : 'Handcrafted Item'}`,
        craftName: 'Regional Handloom',
        region: matchedTrend ? matchedTrend.state : 'India',
        price: 8499,
        storeId: 'dest-1',
        storeName: 'Regional Heritage Store',
        image: matchedTrend ? matchedTrend.image : 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80',
        availableOffline: true,
        availableOnline: true,
      },
    ],
  };
};
