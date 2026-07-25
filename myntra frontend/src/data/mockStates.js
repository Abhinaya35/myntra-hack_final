/**
 * Comprehensive Mock Data Provider for States & Explore India Page
 */
export const STATES_LIST = [
  {
    id: 'telangana',
    name: 'Telangana',
    region: 'South India',
    tagline: 'Iconic Pochampally ikats, Gadwal gold zari weaves, and Hyderabadi pearl markets.',
    hubCount: 8,
    storeCount: 42,
    craftCount: 15,
    crafts: ['Pochampally Ikat', 'Gadwal Sarees', 'Narayanpet Cotton'],
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'rajasthan',
    name: 'Rajasthan',
    region: 'North India',
    tagline: 'Royal Bandhani drapes, Kota Doria silks, and historic Jaipur bazaars.',
    hubCount: 10,
    storeCount: 56,
    craftCount: 18,
    crafts: ['Bandhani Silk', 'Kota Doria', 'Block Print Handlooms'],
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'gujarat',
    name: 'Gujarat',
    region: 'West India',
    tagline: 'Master Patan Patola double ikats, Kutchi mirrorwork, and festive Ghagra Cholis.',
    hubCount: 7,
    storeCount: 38,
    craftCount: 14,
    crafts: ['Patan Patola', 'Kutchi Embroidery', 'Ajrakh Block Print'],
    image: 'https://images.unsplash.com/photo-1596783074918-c84cb06531ca?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'west-bengal',
    name: 'West Bengal',
    region: 'East India',
    tagline: 'Featherlight Jamdani cottons, Kantha stitch embroidery, and Baluchari silk drapes.',
    hubCount: 6,
    storeCount: 34,
    craftCount: 12,
    crafts: ['Dhakai Jamdani', 'Kantha Stitch', 'Baluchari Silk'],
    image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'tamil-nadu',
    name: 'Tamil Nadu',
    region: 'South India',
    tagline: 'Royal Kanchipuram mulberry silks, Chettinad cottons, and temple zari borders.',
    hubCount: 9,
    storeCount: 48,
    craftCount: 16,
    crafts: ['Kanchipuram Silk', 'Chettinad Cotton', 'Madurai Sungudi'],
    image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'maharashtra',
    name: 'Maharashtra',
    region: 'West India',
    tagline: 'Traditional Paithani peacock border silks, Kolhapuri crafts, and Mumbai couture.',
    hubCount: 8,
    storeCount: 45,
    craftCount: 13,
    crafts: ['Paithani Silk', 'Himroo Weaves', 'Karvath Kati'],
    image: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'andhra-pradesh',
    name: 'Andhra Pradesh',
    region: 'South India',
    tagline: 'Freehand Kalamkari art, Uppada Jamdani tissue drapes, and Mangalagiri cottons.',
    hubCount: 6,
    storeCount: 32,
    craftCount: 11,
    crafts: ['Kalamkari Art', 'Uppada Jamdani', 'Mangalagiri Weave'],
    image: 'https://images.unsplash.com/photo-1606744837616-56c9a5c6a6eb?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'karnataka',
    name: 'Karnataka',
    region: 'South India',
    tagline: 'Mysore mulberry silk, Ilkal handlooms with Kasuti embroidery, and Bangalore boutiques.',
    hubCount: 7,
    storeCount: 36,
    craftCount: 12,
    crafts: ['Mysore Silk', 'Ilkal Saree', 'Kasuti Embroidery'],
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
  },
];

export const MOCK_STATES_DATA = {
  telangana: {
    id: 'telangana',
    name: 'Telangana',
    tagline: 'Discover the rich heritage of Telangana through its iconic shopping hubs, authentic regional fashion, and timeless craftsmanship.',
    bannerImage: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1600&q=85',
    stats: {
      verifiedStores: 42,
      shoppingHubs: 8,
      totalProducts: 1200,
      traditionalCrafts: 15,
    },
    heritage: {
      title: 'Centuries of Woven Royalty & Fashion Legacy',
      paragraphs: [
        'Telangana’s fashion identity is deeply rooted in royal patronage and master handloom traditions. From the intricate resist-dyeing precision of Pochampally double ikats to the ethereal gold zari frame-looms of Gadwal, the state stands as a beacon of artisanal weaving.',
        'Over generations, historic shopping hubs across Hyderabad have preserved these living traditions. Today, legendary master weavers and multi-generational boutiques offer authentic heirloom drapes crafted for modern connoisseurs of regional fashion.',
      ],
    },
    specialties: [
      {
        id: 'sp-1',
        name: 'Pochampally Ikat',
        description: 'Intricate geometric double-ikat weaving crafted with natural mineral dyes.',
        image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=600&q=80',
      },
      {
        id: 'sp-2',
        name: 'Gadwal Sarees',
        description: 'Pure cotton body seamlessly woven with rich silk zari borders.',
        image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=600&q=80',
      },
      {
        id: 'sp-3',
        name: 'Narayanpet Cotton',
        description: 'Lightweight breathable handlooms adorned with classic zardozi borders.',
        image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=600&q=80',
      },
      {
        id: 'sp-4',
        name: 'Handloom Dupattas',
        description: 'Fine silk organza and Chanderi dupattas with gold thread motifs.',
        image: 'https://images.unsplash.com/photo-1596783074918-c84cb06531ca?auto=format&fit=crop&w=600&q=80',
      },
    ],
    shoppingHubs: [
      {
        id: 'hub-1',
        name: 'Abids Heritage Fashion District',
        description: 'Hyderabad’s premier historic destination for grand bridal trousseaus, pure silk sarees, and multi-generational regional fashion houses.',
        verifiedStoresCount: 18,
        popularCategories: ['Bridal Sarees', 'Gold Zari Kanjeevaram', 'Festive Kurtis'],
        heroImage: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
      },
      {
        id: 'hub-2',
        name: 'Banjara Hills Royal Fashion Hub',
        description: 'Modern luxury enclave featuring exclusive master weaver studios, bespoke bridal lounges, and contemporary handloom couturiers.',
        verifiedStoresCount: 12,
        popularCategories: ['Bespoke Sherwanis', 'Designer Lehengas', 'Organza Tissue'],
        heroImage: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80',
      },
      {
        id: 'hub-3',
        name: 'Charminar Historic Pearl & Silk Market',
        description: 'The ancient heart of Hyderabadi craftsmanship, renowned for royal zardozi embroidery, natural pearls, and heritage textiles.',
        verifiedStoresCount: 8,
        popularCategories: ['Pochampally Ikat', 'Hyderabadi Zardozi', 'Raw Silk Kurtas'],
        heroImage: 'https://images.unsplash.com/photo-1596783074918-c84cb06531ca?auto=format&fit=crop&w=800&q=80',
      },
      {
        id: 'hub-4',
        name: 'Jubilee Hills Designer Quarter',
        description: 'High-end artisanal boutiques curated for contemporary ethnic couture, fusion drapes, and handcrafted accessories.',
        verifiedStoresCount: 4,
        popularCategories: ['Couture Suit Sets', 'Hand-painted Kalamkari', 'Linen Silks'],
        heroImage: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=800&q=80',
      },
    ],
    featuredStores: [
      {
        id: 'rajkamal-sarees',
        name: 'Rajkamal Sarees',
        logo: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=200&q=80',
        image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80',
        hubName: 'Abids Heritage Fashion District',
        trustedSince: '1968',
        isVerified: true,
        description: '58-year-old family boutique known for authentic Kanchipuram bridal drapes and Pochampally double ikats.',
      },
      {
        id: 'kalamandir-heritage-studio',
        name: 'Kalamandir Heritage Studio',
        logo: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=200&q=80',
        image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=600&q=80',
        hubName: 'Banjara Hills Royal Fashion Hub',
        trustedSince: '1984',
        isVerified: true,
        description: 'Luxury destination specializing in Gadwal zari weaves and hand-embroidered wedding sherwanis.',
      },
      {
        id: 'siddharth-weaver-guild',
        name: 'Siddharth Weaver Guild',
        logo: 'https://images.unsplash.com/photo-1596783074918-c84cb06531ca?auto=format&fit=crop&w=200&q=80',
        image: 'https://images.unsplash.com/photo-1596783074918-c84cb06531ca?auto=format&fit=crop&w=600&q=80',
        hubName: 'Charminar Historic Pearl & Silk Market',
        trustedSince: '1975',
        isVerified: true,
        description: 'Direct artisan cooperative offering hand-painted Kalamkari silks and natural dyed cottons.',
      },
      {
        id: 'vanya-silk-house',
        name: 'Vanya Silk House',
        logo: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=200&q=80',
        image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=600&q=80',
        hubName: 'Jubilee Hills Designer Quarter',
        trustedSince: '1998',
        isVerified: true,
        description: 'Contemporary atelier focused on tissue organza, Uppada Jamdani drapes, and festive suit sets.',
      },
    ],
  },

  rajasthan: {
    id: 'rajasthan',
    name: 'Rajasthan',
    tagline: 'Discover the royal grandeur of Rajasthan through iconic pink city bazaars, Bandhani silk tie-dyes, and heritage block prints.',
    bannerImage: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1600&q=85',
    stats: {
      verifiedStores: 56,
      shoppingHubs: 10,
      totalProducts: 1600,
      traditionalCrafts: 18,
    },
    heritage: {
      title: 'A Royal Tapestry of Colors & Imperial Artisans',
      paragraphs: [
        'Rajasthan’s royal heritage is reflected in every thread of its vibrant textiles. From hand-dyed Bandhani patterns crafted in Jaipur to featherlight Kota Doria weaves, the state represents centuries of royal patronage.',
        'Historic bazaars across Jaipur, Jodhpur, and Udaipur have nurtured generations of master block-printers and royal embroiderers.',
      ],
    },
    specialties: [
      {
        id: 'sp-raj-1',
        name: 'Royal Bandhani Silk',
        description: 'Hand-tied resist dyed silk drapes featuring intricate royal dots.',
        image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=600&q=80',
      },
      {
        id: 'sp-raj-2',
        name: 'Kota Doria Handloom',
        description: 'Featherlight square check drapes woven with pure cotton and silk zari.',
        image: 'https://images.unsplash.com/photo-1596783074918-c84cb06531ca?auto=format&fit=crop&w=600&q=80',
      },
    ],
    shoppingHubs: [
      {
        id: 'hub-raj-1',
        name: 'Johari Bazaar Heritage District',
        description: 'Jaipur’s world-renowned historic market famous for royal Bandhani sarees, Kundan jewelry, and traditional bridal lehengas.',
        verifiedStoresCount: 22,
        popularCategories: ['Bandhani Sarees', 'Gota Patti Work', 'Kundhan Jewelry'],
        heroImage: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80',
      },
    ],
    featuredStores: [
      {
        id: 'jaipur-royal-weavers',
        name: 'Jaipur Royal Weavers',
        logo: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=200&q=80',
        image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=600&q=80',
        hubName: 'Johari Bazaar Heritage District',
        trustedSince: '1952',
        isVerified: true,
        description: 'Iconic heritage store specializing in authentic Gota Patti sarees and Kota Doria drapes.',
      },
    ],
  },
};

/**
 * Fallback generator for dynamically requested state IDs
 */
export const getStateData = (stateId) => {
  const normalizedId = stateId ? stateId.toLowerCase().trim() : 'telangana';
  
  if (MOCK_STATES_DATA[normalizedId]) {
    return MOCK_STATES_DATA[normalizedId];
  }

  // Check if matching item exists in STATES_LIST
  const listItem = STATES_LIST.find((s) => s.id === normalizedId || s.name.toLowerCase() === normalizedId);
  const stateTitle = listItem ? listItem.name : (stateId ? stateId.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') : 'Regional Fashion Icon');

  return {
    id: normalizedId,
    name: stateTitle,
    tagline: `Discover the rich fashion heritage of ${stateTitle} through its iconic shopping hubs, authentic regional fashion, and timeless craftsmanship.`,
    bannerImage: listItem ? listItem.image : 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1600&q=85',

    stats: {
      verifiedStores: listItem ? listItem.storeCount : 35,
      shoppingHubs: listItem ? listItem.hubCount : 6,
      totalProducts: 950,
      traditionalCrafts: listItem ? listItem.craftCount : 12,
    },

    heritage: {
      title: `The Artisanal Legacy of ${stateTitle}`,
      paragraphs: [
        `Discover traditional handloom weaving, royal embroidery techniques, and generational craft heritage preserved across ${stateTitle}.`,
        `Explore verified regional stores located within the state's most iconic shopping destinations.`,
      ],
    },

    specialties: [
      {
        id: 'sp-gen-1',
        name: `${stateTitle} Heritage Weaves`,
        description: 'Traditional pure silk and handloom drapes woven on artisanal pit looms.',
        image: listItem ? listItem.image : 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=600&q=80',
      },
      {
        id: 'sp-gen-2',
        name: 'Artisan Cotton Handlooms',
        description: 'Breathable natural dyed cottons crafted by local weaver guilds.',
        image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=600&q=80',
      },
    ],

    shoppingHubs: [
      {
        id: 'hub-1',
        name: `${stateTitle} Central Fashion District`,
        description: `The primary historic destination for regional sarees, ethnic wear, and trusted stores in ${stateTitle}.`,
        verifiedStoresCount: listItem ? listItem.storeCount : 16,
        popularCategories: ['Bridal Sarees', 'Handloom Cotton', 'Festive Ethnic'],
        heroImage: listItem ? listItem.image : 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
      },
    ],

    featuredStores: [
      {
        id: 'rajkamal-sarees',
        name: 'Rajkamal Sarees',
        logo: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=200&q=80',
        image: listItem ? listItem.image : 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80',
        hubName: `${stateTitle} Central Fashion District`,
        trustedSince: '1968',
        isVerified: true,
        description: 'Iconic regional store specializing in authentic handloom sarees.',
      },
    ],
  };
};
