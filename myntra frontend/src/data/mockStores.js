/**
 * Comprehensive Mock Data for Regional Store Details
 */
export const MOCK_STORES = {
  'dest-1': {
    id: 'dest-1',
    name: 'Rajkamal Sarees',
    hubId: 'hub-1',
    hubName: 'Abids Heritage Fashion District',
    city: 'Hyderabad',
    state: 'Telangana',
    isVerified: true,
    badgeText: 'Verified Regional Icon',
    trustedSince: '1968',
    yearsInBusiness: 58,
    tagline: 'Preserving Six Decades of Kanjeevaram & Handloom Silk Masterpiece Weaving',
    heroBanner: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1600&q=85',
    logoImage: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=200&q=80',
    distance: '1.8 km away',
    
    // Story & Heritage
    story: {
      headline: 'A Heritage Woven in Pure Gold & Silk Since 1968',
      summary: 'Founded by Shri Rajkamal Agarwal in the historic lanes of Abids, Rajkamal Sarees began as a humble sanctuary for authentic South Indian handloom weaving. Over three generations, the family master weavers have guarded traditional Kanjeevaram motifs, sourcing mulberry silk directly from Weavers Cooperatives in Kanchipuram and Pochampally.',
      fullText: 'Every saree crafted under the Rajkamal seal undergoes a rigorous 40-point quality verification process. The store is world-renowned for its signature heavy zari bridal silk sarees, woven with certified 24k gold leaf thread using double-warp technique that takes master artisans up to 90 days per piece. Beyond luxury silks, Rajkamal actively supports over 450 rural weaver families across Telangana and Andhra Pradesh, ensuring ancient weaves like Telia Rumal and Uppada Jamdani remain vibrant for future generations.',
      artisanCount: 450,
      generation: '3rd Generation Family Enterprise',
    },

    // 2. Heritage Timeline
    timeline: [
      {
        year: '1968',
        title: 'Store Founded',
        description: 'Shri Rajkamal Agarwal established the first flagship handloom sanctuary in Abids.',
      },
      {
        year: '1988',
        title: 'Bridal Heritage Expansion',
        description: 'Pioneered custom 24k gold zari bridal Kanjeevaram drapes for royal families.',
      },
      {
        year: '2007',
        title: 'Second Generation Leadership',
        description: 'Expanded weaver cooperative partnerships to 450+ rural artisan families.',
      },
      {
        year: '2026',
        title: 'Verified Regional Fashion Icon',
        description: 'Formally authenticated as a premier Heritage Fashion Destination by Myntra.',
      },
    ],

    // 3. Heritage Metrics
    metrics: [
      { id: 'm1', value: '58+', label: 'Years of Legacy', subtext: 'Continuous excellence since 1968' },
      { id: 'm2', value: '450+', label: 'Local Artisans', subtext: 'Supporting weaver families directly' },
      { id: 'm3', value: '500+', label: 'Exclusive Weaves', subtext: 'GI Tagged & Silk Mark certified' },
      { id: 'm4', value: '50K+', label: 'Happy Connoisseurs', subtext: 'Across three generations of patrons' },
    ],

    // 4. Regional Heritage Banner
    heritageBanner: {
      title: "Preserving Telangana's Handloom Heritage",
      subtitle: "Supporting Local Weaver Cooperatives & Traditional Artisans for Generations.",
      description: "From Pochampally double ikats to diaphanous Uppada Jamdani silks, our looms keep ancient Indian weaving wisdom alive.",
      image: "https://images.unsplash.com/photo-1606744837616-56c9a5c6a6eb?auto=format&fit=crop&w=1400&q=80",
    },

    // Trust Elements
    trustHighlights: [
      { id: 't1', title: 'Verified Regional Icon', desc: 'Authenticated brick-and-mortar flagship store in Abids' },
      { id: 't2', title: 'Authentic Regional Fashion', desc: '100% genuine Silk Mark certified handloom weaves' },
      { id: 't3', title: 'Traditional Craftsmanship', desc: 'Hand-dyed & hand-woven by master artisan families' },
      { id: 't4', title: 'Trusted by Thousands', desc: 'Over 50,000+ satisfied heritage saree patrons worldwide' },
      { id: 't5', title: 'Decades of Heritage', desc: 'Serving royal families and silk connoisseurs since 1968' },
      { id: 't6', title: 'Curated by Myntra', desc: 'Specially selected for Regional Fashion Icons platform' },
    ],

    // Regional Specialties
    specialties: [
      { name: 'Kanchipuram Pure Silk', desc: 'Heavy weight double-warp zari bridal weaves', badge: 'GI Tagged' },
      { name: 'Pochampally Ikat', desc: 'Precision geometric double ikat handlooms', badge: 'Heritage Weave' },
      { name: 'Uppada Jamdani', desc: 'Featherlight diaphanous tissue silk sarees', badge: 'Master Craft' },
      { name: 'Gadwal Zari', desc: 'Kutas cotton body with rich pure silk borders', badge: 'Regional Classic' },
      { name: 'Telia Rumal', desc: 'Oil-treated natural dyed heirloom textiles', badge: 'Rare Art' },
      { name: 'Tussar Hand-painted', desc: 'Kalamkari hand-painted silk drapes', badge: 'Artisanal' },
    ],

    // Featured Collections
    collections: [
      {
        id: 'col-1',
        title: 'The Royal Kanjeevaram Bridal Collection',
        description: 'Crafted for timeless celebrations with 24k gold leaf zari and temple motifs.',
        itemCount: 125,
        coverImage: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
        tag: 'Bridal Elegance',
      },
      {
        id: 'col-2',
        title: 'Pochampally Geometric Ikat Series',
        description: 'Mathematical ikat precision in vibrant natural mineral dyed drapes.',
        itemCount: 84,
        coverImage: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80',
        tag: 'Heritage Art',
      },
      {
        id: 'col-3',
        title: 'Festive Organza & Tissue Silks',
        description: 'Lightweight metallic shimmer drapes designed for modern celebrations.',
        itemCount: 62,
        coverImage: 'https://images.unsplash.com/photo-1596783074918-c84cb06531ca?auto=format&fit=crop&w=800&q=80',
        tag: 'Festive Edit',
      },
      {
        id: 'col-4',
        title: 'Heirloom Uppada Jamdani weaves',
        description: 'Ultra-refined silk drapes woven using non-mechanical traditional shuttles.',
        itemCount: 45,
        coverImage: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=800&q=80',
        tag: 'Collector Series',
      },
    ],

    // Signature Products (4 to 8 curated items)
    signatureProducts: [
      {
        id: 'prod-101',
        name: 'Crimson Gold Kanjivaram Bridal Silk Saree',
        price: '₹34,999',
        originalPrice: '₹42,000',
        regionalBadge: 'Kanchipuram Handloom',
        giTag: 'GI Certified',
        artisanTag: 'Crafted by Master Artisans',
        image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80',
      },
      {
        id: 'prod-102',
        name: 'Royal Blue & Emerald Pochampally Double Ikat',
        price: '₹18,500',
        originalPrice: '₹22,000',
        regionalBadge: 'Pochampally Craft',
        giTag: 'GI Certified',
        artisanTag: 'Woven by Guild Weavers',
        image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=600&q=80',
      },
      {
        id: 'prod-103',
        name: 'Hand-painted Kalamkari Tussar Silk Saree',
        price: '₹14,200',
        originalPrice: '₹16,500',
        regionalBadge: 'Srikalahasti Art',
        giTag: 'Authentic Craft',
        artisanTag: 'Natural Mineral Dyes',
        image: 'https://images.unsplash.com/photo-1596783074918-c84cb06531ca?auto=format&fit=crop&w=600&q=80',
      },
      {
        id: 'prod-104',
        name: 'Gadwal Pure Cotton-Silk Zari Border Saree',
        price: '₹11,800',
        originalPrice: '₹13,900',
        regionalBadge: 'Gadwal Weave',
        giTag: 'GI Certified',
        artisanTag: 'Traditional Frame Loom',
        image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=600&q=80',
      },
      {
        id: 'prod-105',
        name: 'Champagne Tissue Uppada Jamdani Saree',
        price: '₹28,600',
        originalPrice: '₹32,500',
        regionalBadge: 'Uppada Mastercraft',
        giTag: 'GI Certified',
        artisanTag: 'Featherlight Jamdani',
        image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=600&q=80',
      },
      {
        id: 'prod-106',
        name: 'Mustard Yellow Telia Rumal Handloom Saree',
        price: '₹16,400',
        originalPrice: '₹19,000',
        regionalBadge: 'Telangana Heritage',
        giTag: 'Heritage Art',
        artisanTag: 'Oil-dyed Yarn Weave',
        image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80',
      },
    ],

    // Store Experience Gallery with categories
    gallery: [
      {
        id: 'g1',
        title: 'Main Showroom Heritage Lounge',
        category: 'Showroom',
        caption: 'Spacious brass-accented display lounge housing 500+ handloom weaves',
        image: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?auto=format&fit=crop&w=800&q=80',
      },
      {
        id: 'g2',
        title: 'Master Weaver at Pit Loom',
        category: 'Master Weaver',
        caption: 'Artisan weaving real gold zari border on a 100-year-old wooden frame loom',
        image: 'https://images.unsplash.com/photo-1606744837616-56c9a5c6a6eb?auto=format&fit=crop&w=800&q=80',
      },
      {
        id: 'g3',
        title: 'Silk Mark Verification Counter',
        category: 'Craftsmanship',
        caption: 'On-site silk purity testing counter for complete buyer assurance',
        image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
      },
      {
        id: 'g4',
        title: 'Private Bridal Styling Suite',
        category: 'Private Bridal Lounge',
        caption: 'Dedicated trial lounge for bridal saree drape consultations',
        image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80',
      },
    ],

    // Location Experience
    location: {
      address: 'Plot 42, Abids Main Road, Opposite Palace Heights, Hyderabad, Telangana 500001',
      district: 'Abids Heritage Fashion District',
      landmark: 'Adjacent to Historic Palace Theatre & GPO',
      travelNote: '15 mins from Nampally Railway Station | Valet parking available',
      hours: 'Mon - Sat: 10:30 AM – 9:00 PM | Sun: 11:00 AM – 7:00 PM',
      phone: '+91 40 2473 8890',
      delivery: 'Insured express shipping across 19,000+ Indian pincodes & worldwide',
      mapCoordinates: { lat: 17.4319, lng: 78.4071 },
    },

    // Customer Moments
    customerMoments: [
      {
        id: 'cm1',
        title: 'Bridal Trousseau Selection',
        momentType: 'Bridal Shopping',
        description: 'Generations of brides choosing their sacred wedding silk saree under the guidance of our master drapers.',
        image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
      },
      {
        id: 'cm2',
        title: 'Family Festival Visits',
        momentType: 'Festival Traditions',
        description: 'Families gathering before Diwali and Sankranti to select matching silk weaves for holiday rituals.',
        image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80',
      },
      {
        id: 'cm3',
        title: 'Grandmother to Granddaughter Legacy',
        momentType: 'Generations of Patrons',
        description: 'Passing down handloom drapes woven 40 years ago, still radiant with pure silk luster.',
        image: 'https://images.unsplash.com/photo-1596783074918-c84cb06531ca?auto=format&fit=crop&w=800&q=80',
      },
    ],

    // Continue Your Heritage Journey
    nearbyStores: [
      {
        id: 'dest-2',
        name: "Neeru's Couture",
        knownFor: 'Bridal Lehengas & Designer Ethnic',
        distance: '2.4 km away',
        image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=400&q=80',
        badgeText: 'Verified Regional',
      },
      {
        id: 'dest-3',
        name: 'Kalanjali Silks',
        knownFor: 'Authentic Zardozi & Heritage Weaving',
        distance: '3.1 km away',
        image: 'https://images.unsplash.com/photo-1596783074918-c84cb06531ca?auto=format&fit=crop&w=400&q=80',
        badgeText: 'Verified Regional',
      },
      {
        id: 'dest-4',
        name: "Singhania's Fine Fabrics",
        knownFor: 'Bespoke Raw Silks & Custom Tailoring',
        distance: '4.2 km away',
        image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=400&q=80',
        badgeText: 'Verified Regional',
      },
    ],
  },
};

// Aliases for slug routes
MOCK_STORES['rajkamal-sarees'] = MOCK_STORES['dest-1'];
MOCK_STORES['kalamandir-heritage-studio'] = {
  ...MOCK_STORES['dest-1'],
  id: 'kalamandir-heritage-studio',
  name: 'Kalamandir Heritage Studio',
  tagline: 'Luxury Destination Specializing in Gadwal Zari Weaves & Hand-Embroidered Sherwanis',
  hubName: 'Banjara Hills Royal Fashion Hub',
};
MOCK_STORES['siddharth-weaver-guild'] = {
  ...MOCK_STORES['dest-1'],
  id: 'siddharth-weaver-guild',
  name: 'Siddharth Weaver Guild',
  tagline: 'Direct Artisan Cooperative Offering Hand-Painted Kalamkari Silks & Natural Dyes',
  hubName: 'Charminar Historic Pearl & Silk Market',
};
MOCK_STORES['vanya-silk-house'] = {
  ...MOCK_STORES['dest-1'],
  id: 'vanya-silk-house',
  name: 'Vanya Silk House',
  tagline: 'Contemporary Atelier Focused on Tissue Organza & Uppada Jamdani Drapes',
  hubName: 'Jubilee Hills Designer Quarter',
};

/**
 * Fallback generator for dynamically requested store IDs
 */
export const getStoreData = (storeId) => {
  if (!storeId) return MOCK_STORES['dest-1'];

  const normalizedId = storeId.toLowerCase().trim();
  if (MOCK_STORES[normalizedId]) {
    return MOCK_STORES[normalizedId];
  }
  if (MOCK_STORES[storeId]) {
    return MOCK_STORES[storeId];
  }

  // Generic fallback store profile populated cleanly
  const formattedName = storeId
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return {
    id: storeId,
    name: formattedName,
    hubId: 'hub-2',
    hubName: 'Banjara Hills Heritage District',
    city: 'Hyderabad',
    state: 'Telangana',
    isVerified: true,
    badgeText: 'Verified Regional Icon',
    trustedSince: '1985',
    yearsInBusiness: 41,
    tagline: 'Curating Authentic Regional Textiles & Fine Craftsmanship for Over Four Decades',
    heroBanner: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1600&q=85',
    logoImage: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=200&q=80',
    distance: '2.4 km away',
    
    story: {
      headline: 'Four Decades of Artisanal Craftsmanship & Timeless Heritage',
      summary: 'Established as a boutique weaving destination, this store represents the finest traditions of regional textile weaving and hand-curated festive wear.',
      fullText: 'Partnering directly with regional artisan guilds, every garment in this studio is selected for its purity of weave, thread quality, and cultural authenticity. Customers experience non-commercialized fashion storytelling rooted deeply in Indian heritage.',
      artisanCount: 200,
      generation: 'Family Owned & Operated',
    },

    timeline: [
      { year: '1985', title: 'Studio Inception', description: 'Founded as an artisan textile collective.' },
      { year: '2000', title: 'Designer Heritage', description: 'Introduced hand-carved block prints and zari weaves.' },
      { year: '2015', title: 'Guild Expansion', description: 'Partnered directly with 200+ rural weaving families.' },
      { year: '2026', title: 'Verified Fashion Icon', description: 'Authenticated regional destination.' },
    ],

    metrics: [
      { id: 'm1', value: '40+', label: 'Years of Heritage', subtext: 'Serving since 1985' },
      { id: 'm2', value: '200+', label: 'Master Artisans', subtext: 'Handloom guild weavers' },
      { id: 'm3', value: '350+', label: 'Curated Silks', subtext: '100% Silk Mark certified' },
      { id: 'm4', value: '30K+', label: 'Patrons Worldwide', subtext: 'Trusted regional destination' },
    ],

    heritageBanner: {
      title: "Handmade Regional Traditions",
      subtitle: "Supporting Telangana's Rural Weavers & Master Craftsmen",
      description: "Celebrating pure handlooms, natural vegetable dyes, and intricate gold thread embroidery.",
      image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1400&q=80",
    },

    trustHighlights: [
      { id: 't1', title: 'Verified Regional Icon', desc: 'Verified regional store location' },
      { id: 't2', title: 'Authentic Regional Fashion', desc: '100% genuine regional handloom certified' },
      { id: 't3', title: 'Traditional Craftsmanship', desc: 'Woven by master artisan cooperatives' },
      { id: 't4', title: 'Trusted by Thousands', desc: 'Loved by fashion patrons across South India' },
      { id: 't5', title: 'Decades of Heritage', desc: 'Four decades of unblemished textile trust' },
      { id: 't6', title: 'Curated by Myntra', desc: 'Curated for Regional Fashion Icons' },
    ],

    specialties: [
      { name: 'Banarasi Brocade', desc: 'Heavy metallic gold weave', badge: 'GI Tagged' },
      { name: 'Chikankari Handwork', desc: 'Hand embroidered shadow threadwork', badge: 'Master Work' },
      { name: 'Bandhani Silk', desc: 'Hand-tied intricate tie & dye', badge: 'Heritage' },
      { name: 'Patola Double Ikat', desc: 'Geometrically aligned rare weave', badge: 'Iconic' },
    ],

    collections: [
      {
        id: 'col-gen-1',
        title: 'Festive Heritage Collection',
        description: 'Opulent festive drapes crafted for grand celebrations.',
        itemCount: 95,
        coverImage: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80',
        tag: 'Bestseller',
      },
      {
        id: 'col-gen-2',
        title: 'Contemporary Handloom Edit',
        description: 'Modern silhouettes preserving traditional weaving techniques.',
        itemCount: 60,
        coverImage: 'https://images.unsplash.com/photo-1596783074918-c84cb06531ca?auto=format&fit=crop&w=800&q=80',
        tag: 'New Release',
      },
    ],

    signatureProducts: [
      {
        id: 'prod-gen-1',
        name: 'Handcrafted Banarasi Silk Saree',
        price: '₹22,500',
        originalPrice: '₹26,000',
        regionalBadge: 'Banarasi Craft',
        giTag: 'GI Certified',
        artisanTag: 'Crafted by Master Artisans',
        image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=600&q=80',
      },
      {
        id: 'prod-gen-2',
        name: 'Pure Chanderi Silk Dupatta Set',
        price: '₹12,800',
        originalPrice: '₹14,900',
        regionalBadge: 'Chanderi Weave',
        giTag: 'Authentic Craft',
        artisanTag: 'Handwoven Threadwork',
        image: 'https://images.unsplash.com/photo-1596783074918-c84cb06531ca?auto=format&fit=crop&w=600&q=80',
      },
    ],

    gallery: [
      {
        id: 'g-gen-1',
        title: 'Boutique Store Interior',
        category: 'Showroom',
        caption: 'Warm wooden aesthetic showcasing artisanal collections',
        image: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?auto=format&fit=crop&w=800&q=80',
      },
    ],

    location: {
      address: 'Road No. 10, Jubilee Hills, Hyderabad, Telangana 500033',
      district: 'Banjara Hills Heritage District',
      landmark: 'Near Jubilee Hills Checkpost',
      travelNote: '10 mins from Hitec City | Valet parking available',
      hours: 'Mon - Sat: 10:30 AM – 8:30 PM | Sun: 11:00 AM – 6:00 PM',
      phone: '+91 40 2355 4410',
      delivery: 'Pan-India insured shipping & international delivery',
      mapCoordinates: { lat: 17.4156, lng: 78.4347 },
    },

    customerMoments: [
      {
        id: 'cm-gen-1',
        title: 'Festive Shopping Rituals',
        momentType: 'Family Traditions',
        description: 'Selecting handloom drapes for regional festival celebrations.',
        image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80',
      },
    ],

    nearbyStores: [
      {
        id: 'dest-1',
        name: 'Rajkamal Sarees',
        knownFor: 'Kanjeevaram & Handloom Silk',
        distance: '1.8 km away',
        image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=400&q=80',
        badgeText: 'Verified Regional',
      },
    ],
  };
};
