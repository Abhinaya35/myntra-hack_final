import { useContext } from 'react';
import { ShortlistContext } from '../context/ShortlistContext';

export const useShortlist = () => {
  const context = useContext(ShortlistContext);
  if (!context) {
    throw new Error('useShortlist must be used within a ShortlistProvider');
  }
  return context;
};

export default useShortlist;
