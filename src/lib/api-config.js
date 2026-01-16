/**
 * API Configuration
 * Manages multiple base URLs for different endpoints
 */

// Base URLs Configuration
// CORS sudah dikonfigurasi di server, jadi bisa langsung akses tanpa proxy
// NOTE: Gunakan HTTP karena SSL certificate untuk api.maarifnu.or.id belum ready
// Setelah SSL diperbaiki, ganti ke HTTPS
const API_CONFIGS = {
  // Default API base URL for most endpoints
  site: process.env.NEXT_PUBLIC_API_URL_SITE || 'https://api.maarifnu.or.id/site/api/v1',

  // Satpen-specific API base URL
  satpen: process.env.NEXT_PUBLIC_API_URL_SATPEN || 'https://api.maarifnu.or.id/sipinter/api/v1',
};

/**
 * Get the appropriate base URL for a given endpoint
 * @param {string} endpoint - The API endpoint
 * @returns {string} The base URL to use
 */
export function getBaseURL(endpoint) {
  // Satpen-related endpoints use the satpen base URL
  if (endpoint.startsWith('/satpen') ||
      endpoint.startsWith('/provinsi') ||
      endpoint.startsWith('/kabupaten')) {
    return API_CONFIGS.satpen;
  }

  // All other endpoints use the site base URL
  return API_CONFIGS.site;
}

/**
 * Get raw API config object
 * @returns {Object} API configuration object
 */
export function getAPIConfig() {
  return API_CONFIGS;
}

export default API_CONFIGS;
