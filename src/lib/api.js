/**
 * API Client for LP Ma'arif NU Website
 * Connects to the backend Go API
 */

// API Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';
const API_VERSION = '/api/v1';
const BASE_URL = `${API_BASE_URL}${API_VERSION}`;

/**
 * Generic fetch wrapper with error handling
 * @param {string} endpoint - API endpoint
 * @param {Object} options - Fetch options
 * @returns {Promise<Object>} API response data
 */
async function apiFetch(endpoint, options = {}) {
  try {
    const url = `${BASE_URL}${endpoint}`;
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.message || 'API request failed');
    }

    return data.data;
  } catch (error) {
    console.error('API Fetch Error:', error);
    throw error;
  }
}

/**
 * Build query string from params object
 * @param {Object} params - Query parameters
 * @returns {string} Query string
 */
function buildQueryString(params) {
  const filtered = Object.entries(params)
    .filter(([_, value]) => value !== undefined && value !== null && value !== '')
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&');

  return filtered ? `?${filtered}` : '';
}

// ============================================
// NEWS ARTICLES APIs
// ============================================

/**
 * Fetch news articles with optional filters
 * @param {Object} params - Query parameters
 * @param {number} params.page - Page number (default: 1)
 * @param {number} params.limit - Items per page (default: 10, max: 100)
 * @param {string} params.category - Filter by category slug
 * @param {string} params.search - Search in title and excerpt
 * @param {boolean} params.featured - Filter featured articles
 * @param {string} params.sort - Sort field (default: -published_at)
 * @returns {Promise<Object>} Object with articles array and pagination
 */
export async function getNewsArticles(params = {}) {
  const queryString = buildQueryString(params);
  const response = await apiFetch(`/news${queryString}`);

  // API structure: { success, message, data: { data: {...}, pagination: {...} } }
  // apiFetch returns data.data, so response = { data: {...}, pagination: {...} }
  // response.data contains the actual articles
  return {
    articles: response.data?.articles || response.articles || [],
    pagination: response.pagination || {},
  };
}

/**
 * Fetch featured news articles
 * @param {number} limit - Number of items (default: 5)
 * @returns {Promise<Array>} Array of featured news articles
 */
export async function getFeaturedNews(limit = 5) {
  const data = await apiFetch(`/news/featured?limit=${limit}`);
  return data || [];
}

/**
 * Fetch single news article by slug
 * @param {string} slug - Article slug
 * @returns {Promise<Object|null>} Article object or null
 */
export async function getNewsArticle(slug) {
  try {
    const data = await apiFetch(`/news/${slug}`);
    return data;
  } catch (error) {
    console.error('Error fetching news article:', error);
    return null;
  }
}

// ============================================
// OPINION ARTICLES APIs
// ============================================

/**
 * Fetch opinion articles with pagination
 * @param {Object} params - Query parameters
 * @param {number} params.page - Page number
 * @param {number} params.limit - Items per page
 * @param {string} params.search - Search in title
 * @returns {Promise<Object>} Object with articles array and pagination
 */
export async function getOpinionArticles(params = {}) {
  const queryString = buildQueryString(params);
  const response = await apiFetch(`/opinions${queryString}`);

  // API structure: { success, message, data: { data: {...}, pagination: {...} } }
  // apiFetch returns data.data, so response = { data: {...}, pagination: {...} }
  return {
    articles: response.data?.articles || response.articles || [],
    pagination: response.pagination || {},
  };
}

/**
 * Fetch single opinion article by slug
 * @param {string} slug - Article slug
 * @returns {Promise<Object|null>} Article object or null
 */
export async function getOpinionArticle(slug) {
  try {
    const data = await apiFetch(`/opinions/${slug}`);
    return data;
  } catch (error) {
    console.error('Error fetching opinion article:', error);
    return null;
  }
}

// ============================================
// DOCUMENTS APIs
// ============================================

/**
 * Fetch documents with filters
 * @param {Object} params - Query parameters
 * @param {number} params.page - Page number
 * @param {number} params.limit - Items per page (default: 20)
 * @param {string} params.category - Filter by category slug
 * @param {string} params.search - Search in title and description
 * @param {string} params.sort - Sort field (default: -created_at)
 * @returns {Promise<Object>} Object with documents array and pagination
 */
export async function getDocuments(params = {}) {
  const queryString = buildQueryString(params);
  const data = await apiFetch(`/documents${queryString}`);

  // apiFetch already returns data.data, so data should have documents and pagination directly
  return {
    documents: data.data.documents || [],
    pagination: data.pagination || {},
  };
}

/**
 * Fetch single document by ID
 * @param {number} id - Document ID
 * @returns {Promise<Object|null>} Document object or null
 */
export async function getDocument(id) {
  try {
    const data = await apiFetch(`/documents/${id}`);
    return data;
  } catch (error) {
    console.error('Error fetching document:', error);
    return null;
  }
}

// ============================================
// HERO SLIDES APIs
// ============================================

/**
 * Fetch active hero slides for homepage
 * @returns {Promise<Array>} Array of hero slides
 */
export async function getHeroSlides() {
  try {
    const data = await apiFetch('/hero-slides');
    return data || [];
  } catch (error) {
    console.error('Error fetching hero slides:', error);
    return [];
  }
}

// ============================================
// ORGANIZATION APIs
// ============================================

/**
 * Fetch organization structure
 * @returns {Promise<Object>} Organization structure object
 */
export async function getOrganizationStructure() {
  try {
    const data = await apiFetch('/organization/structure');
    return data;
  } catch (error) {
    console.error('Error fetching organization structure:', error);
    return null;
  }
}

/**
 * Fetch board members with filters
 * @param {Object} params - Query parameters
 * @param {string} params.period - Filter by period (e.g., "2024-2029")
 * @param {boolean} params.active - Filter active members
 * @returns {Promise<Array>} Array of board members
 */
export async function getBoardMembers(params = {}) {
  try {
    const queryString = buildQueryString(params);
    const data = await apiFetch(`/organization/board-members${queryString}`);
    return data || [];
  } catch (error) {
    console.error('Error fetching board members:', error);
    return [];
  }
}

// ============================================
// PAGES APIs
// ============================================

/**
 * Fetch page content by slug
 * Available slugs: visi-misi, sejarah, program-strategis, pramuka
 * @param {string} slug - Page slug
 * @returns {Promise<Object|null>} Page object or null
 */
export async function getPage(slug) {
  try {
    const data = await apiFetch(`/pages/${slug}`);

    // Parse content if it's a JSON string
    if (data && typeof data.content === 'string') {
      try {
        data.content = JSON.parse(data.content);
      } catch (e) {
        console.warn('Failed to parse page content as JSON:', e);
      }
    }

    return data;
  } catch (error) {
    console.error('Error fetching page:', error);
    return null;
  }
}

// ============================================
// CATEGORIES APIs
// ============================================

/**
 * Fetch all categories
 * @param {Object} params - Query parameters
 * @param {string} params.type - Filter by type (news, opinion, document)
 * @returns {Promise<Array>} Array of categories
 */
export async function getCategories(params = {}) {
  try {
    const queryString = buildQueryString(params);
    const data = await apiFetch(`/categories${queryString}`);
    return data || [];
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

/**
 * Fetch single category with latest articles
 * @param {string} slug - Category slug
 * @returns {Promise<Object|null>} Category object with latest articles
 */
export async function getCategory(slug) {
  try {
    const data = await apiFetch(`/categories/${slug}`);
    return data;
  } catch (error) {
    console.error('Error fetching category:', error);
    return null;
  }
}

// ============================================
// SETTINGS APIs
// ============================================

/**
 * Fetch public settings
 * @returns {Promise<Object>} Settings object with site info, contact, social media
 */
export async function getSettings() {
  const data = await apiFetch('/settings');
  return data;
}

// ============================================
// HEALTH CHECK
// ============================================

/**
 * Check API health status
 * @returns {Promise<Object>} Health status object
 */
export async function checkHealth() {
  try {
    const response = await fetch(`${API_BASE_URL}/health`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Health check failed:', error);
    return { status: 'ERROR', message: 'API is not available' };
  }
}

// ============================================
// EVENTS/FLAYERS APIs
// ============================================

/**
 * Fetch active event flayers/banners
 * @param {Object} params - Query parameters
 * @param {number} params.limit - Number of items to fetch
 * @param {boolean} params.active - Filter active flayers only
 * @returns {Promise<Array>} Array of event flayers
 */
export async function getEventFlayers(params = {}) {
  const queryString = buildQueryString(params);
  const data = await apiFetch(`/events/flayers${queryString}`);
  return data || [];
}

// ============================================
// LEGACY COMPATIBILITY (for gradual migration)
// ============================================

// ============================================
// SATUAN PENDIDIKAN APIs
// ============================================

/**
 * Fetch satuan pendidikan data with filters and pagination
 * @param {Object} params - Query parameters
 * @param {number} params.page - Page number (default: 1)
 * @param {number} params.limit - Items per page (default: 20, max: 100)
 * @param {string} params.jenjang - Filter by jenjang (PAUD, RA, MI, MTs, MA, SMK, Pesantren)
 * @param {string} params.provinsi - Filter by provinsi name
 * @param {string} params.kabupaten - Filter by kabupaten name
 * @param {string} params.search - Search by nama or alamat
 * @param {string} params.akreditasi - Filter by akreditasi (A, B, C, D)
 * @param {string} params.sort - Sort field (default: -created_at)
 * @returns {Promise<Object>} Object with satpen array and pagination
 */
export async function getSatpenData(params = {}) {
  try {
    const queryString = buildQueryString(params);
    const response = await apiFetch(`/satpen${queryString}`);

    return {
      satpen: response.satpen || [],
      pagination: response.pagination || {},
      statistics: response.statistics || {}
    };
  } catch (error) {
    console.error('Error fetching satpen data:', error);
    return {
      satpen: [],
      pagination: {},
      statistics: {}
    };
  }
}

/**
 * Fetch single satuan pendidikan by ID or NPSN
 * @param {string|number} id - Satpen ID or NPSN
 * @returns {Promise<Object|null>} Satpen object or null
 */
export async function getSatpenById(id) {
  try {
    const data = await apiFetch(`/satpen/${id}`);
    return data;
  } catch (error) {
    console.error('Error fetching satpen:', error);
    return null;
  }
}

/**
 * Fetch satpen statistics
 * @param {Object} params - Query parameters
 * @param {string} params.provinsi - Filter by provinsi name
 * @param {string} params.jenjang - Filter by jenjang
 * @returns {Promise<Object>} Statistics object
 */
export async function getSatpenStatistics(params = {}) {
  try {
    const queryString = buildQueryString(params);
    const data = await apiFetch(`/satpen/statistics${queryString}`);
    return data;
  } catch (error) {
    console.error('Error fetching satpen statistics:', error);
    return {};
  }
}

// ============================================
// MASTER DATA - PROVINSI APIs
// ============================================

/**
 * Fetch all provinsi
 * @param {Object} params - Query parameters
 * @param {string} params.search - Search by nama provinsi
 * @returns {Promise<Array>} Array of provinsi
 */
export async function getProvinsi(params = {}) {
  try {
    const queryString = buildQueryString(params);
    const data = await apiFetch(`/provinsi${queryString}`);
    return data || [];
  } catch (error) {
    console.error('Error fetching provinsi:', error);
    return [];
  }
}

/**
 * Fetch provinsi by ID
 * @param {number} id - Provinsi ID
 * @returns {Promise<Object|null>} Provinsi object or null
 */
export async function getProvinsiById(id) {
  try {
    const data = await apiFetch(`/provinsi/${id}`);
    return data;
  } catch (error) {
    console.error('Error fetching provinsi:', error);
    return null;
  }
}

// ============================================
// MASTER DATA - KABUPATEN APIs
// ============================================

/**
 * Fetch all kabupaten
 * @param {Object} params - Query parameters
 * @param {number} params.provinsi_id - Filter by provinsi ID
 * @param {string} params.search - Search by nama kabupaten
 * @returns {Promise<Array>} Array of kabupaten
 */
export async function getKabupaten(params = {}) {
  try {
    const queryString = buildQueryString(params);
    const data = await apiFetch(`/kabupaten${queryString}`);
    return data || [];
  } catch (error) {
    console.error('Error fetching kabupaten:', error);
    return [];
  }
}

/**
 * Fetch kabupaten by ID
 * @param {number} id - Kabupaten ID
 * @returns {Promise<Object|null>} Kabupaten object or null
 */
export async function getKabupatenById(id) {
  try {
    const data = await apiFetch(`/kabupaten/${id}`);
    return data;
  } catch (error) {
    console.error('Error fetching kabupaten:', error);
    return null;
  }
}

/**
 * Get available jenjang options from statistics
 * @returns {Promise<Array>} Array of jenjang names
 */
export async function getJenjangOptions() {
  try {
    const stats = await getSatpenStatistics();
    if (stats.by_jenjang) {
      return Object.keys(stats.by_jenjang);
    }
    return [];
  } catch (error) {
    console.error('Error fetching jenjang options:', error);
    // Fallback to default options
    return ['PAUD', 'RA', 'MI', 'MTs', 'MA', 'SMK', 'Pesantren'];
  }
}

// ============================================
// EDITORIAL TEAM APIs
// ============================================

/**
 * Fetch editorial team structure
 * @returns {Promise<Object>} Editorial team object
 */
export async function getEditorialTeam() {
  const data = await apiFetch('/editorial/team');
  return data;
}

// ============================================
// ORGANIZATION PENGURUS APIs
// ============================================

/**
 * Fetch organization pengurus list
 * @param {Object} params - Query parameters
 * @param {string} params.periode - Filter by periode (e.g., "2024-2029")
 * @param {string} params.kategori - Filter by kategori (pimpinan_utama, bidang, sekretariat, bendahara)
 * @param {boolean} params.active - Filter active members only (default: true)
 * @returns {Promise<Object>} Object with periode and pengurus array
 */
export async function getPengurus(params = {}) {
  const queryString = buildQueryString(params);
  const data = await apiFetch(`/organization/pengurus${queryString}`);
  return data;
}

// ============================================
// CONTACT FORM API
// ============================================

/**
 * Submit contact form
 * @param {Object} formData - Contact form data
 * @param {string} formData.name - Name (required, min 3 chars)
 * @param {string} formData.email - Email (required, valid email)
 * @param {string} formData.phone - Phone (optional, max 20 chars)
 * @param {string} formData.subject - Subject (required, min 5 chars)
 * @param {string} formData.message - Message (required, min 10 chars)
 * @returns {Promise<Object>} Response with ticket_id
 */
export async function submitContactForm(formData) {
  try {
    const url = `${BASE_URL}/contact/submit`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.message || 'Failed to submit contact form');
    }

    return data.data;
  } catch (error) {
    console.error('Contact Form Submit Error:', error);
    throw error;
  }
}
