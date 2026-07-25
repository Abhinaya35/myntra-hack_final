/**
 * Formats a number as Indian Currency (INR)
 * @param {number} amount 
 * @returns {string}
 */
export const formatCurrency = (amount) => {
  if (typeof amount !== 'number' || isNaN(amount)) return '₹0';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
};

/**
 * Formats distance in kilometers or meters
 * @param {number} distanceInKm 
 * @returns {string}
 */
export const formatDistance = (distanceInKm) => {
  if (typeof distanceInKm !== 'number' || isNaN(distanceInKm)) return 'N/A';
  if (distanceInKm < 1) {
    return `${Math.round(distanceInKm * 1000)} m away`;
  }
  return `${distanceInKm.toFixed(1)} km away`;
};

/**
 * Formats rating score with one decimal place
 * @param {number} rating 
 * @returns {string}
 */
export const formatRating = (rating) => {
  if (typeof rating !== 'number' || isNaN(rating)) return '0.0';
  return rating.toFixed(1);
};
