import React, { createContext, useState, useEffect } from 'react';
import { getStoredItem, setStoredItem, STORAGE_KEYS } from '../utils/storage';

export const ShortlistContext = createContext({
  shortlist: { products: [], stores: [] },
  toggleSaveProduct: () => {},
  toggleSaveStore: () => {},
  isProductSaved: () => false,
  isStoreSaved: () => false,
  totalSavedCount: 0,
});

export const ShortlistProvider = ({ children }) => {
  const [shortlist, setShortlist] = useState(() => {
    return getStoredItem(STORAGE_KEYS.SHORTLIST, { products: [], stores: [] });
  });

  useEffect(() => {
    setStoredItem(STORAGE_KEYS.SHORTLIST, shortlist);
  }, [shortlist]);

  const toggleSaveProduct = (product) => {
    setShortlist((prev) => {
      const exists = prev.products.some((p) => p.id === product.id);
      const updatedProducts = exists
        ? prev.products.filter((p) => p.id !== product.id)
        : [...prev.products, product];
      return { ...prev, products: updatedProducts };
    });
  };

  const toggleSaveStore = (store) => {
    setShortlist((prev) => {
      const exists = prev.stores.some((s) => s.id === store.id);
      const updatedStores = exists
        ? prev.stores.filter((s) => s.id !== store.id)
        : [...prev.stores, store];
      return { ...prev, stores: updatedStores };
    });
  };

  const isProductSaved = (productId) => {
    return shortlist.products.some((p) => p.id === productId);
  };

  const isStoreSaved = (storeId) => {
    return shortlist.stores.some((s) => s.id === storeId);
  };

  const totalSavedCount = shortlist.products.length + shortlist.stores.length;

  return (
    <ShortlistContext.Provider
      value={{
        shortlist,
        toggleSaveProduct,
        toggleSaveStore,
        isProductSaved,
        isStoreSaved,
        totalSavedCount,
      }}
    >
      {children}
    </ShortlistContext.Provider>
  );
};
