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
  try {
    const queryString = buildQueryString(params);
    const response = await apiFetch(`/news${queryString}`);

    // API structure: { success, message, data: { data: {...}, pagination: {...} } }
    // apiFetch returns data.data, so response = { data: {...}, pagination: {...} }
    // response.data contains the actual articles
    return {
      articles: response.data?.articles || response.articles || [],
      pagination: response.pagination || {},
    };
  } catch (error) {
    console.error('Error fetching news articles, using mock data:', error);
    // Return mock data for testing pagination
    return getMockNewsArticles(params);
  }
}

function getMockNewsArticles(params = {}) {
  const page = params.page || 1;
  const limit = params.limit || 12;
  const category = params.category || 'nasional';

  // Generate 50 mock articles
  const totalArticles = 50;
  const startIndex = (page - 1) * limit;
  const endIndex = Math.min(startIndex + limit, totalArticles);

  const articles = [];
  for (let i = startIndex; i < endIndex; i++) {
    articles.push({
      id: i + 1,
      title: `Berita ${category.charAt(0).toUpperCase() + category.slice(1)} #${i + 1}`,
      excerpt: `Ini adalah excerpt dari berita ${category} nomor ${i + 1}. Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
      image: `https://placehold.co/600x400/059669/ffffff?text=Berita+${i + 1}`,
      published_at: new Date(Date.now() - i * 86400000).toISOString(),
      slug: `berita-${category}-${i + 1}`,
      category: { name: category.charAt(0).toUpperCase() + category.slice(1) }
    });
  }

  return {
    articles,
    pagination: {
      current_page: page,
      total_pages: Math.ceil(totalArticles / limit),
      per_page: limit,
      total: totalArticles,
      has_next: page < Math.ceil(totalArticles / limit),
      has_prev: page > 1
    }
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
  try {
    const queryString = buildQueryString(params);
    const response = await apiFetch(`/opinions${queryString}`);

    // API structure: { success, message, data: { data: {...}, pagination: {...} } }
    // apiFetch returns data.data, so response = { data: {...}, pagination: {...} }
    return {
      articles: response.data?.articles || response.articles || [],
      pagination: response.pagination || {},
    };
  } catch (error) {
    console.error('Error fetching opinion articles, using mock data:', error);
    return getMockOpinionArticles(params);
  }
}

function getMockOpinionArticles(params = {}) {
  const page = params.page || 1;
  const limit = params.limit || 10;

  const totalArticles = 35;
  const startIndex = (page - 1) * limit;
  const endIndex = Math.min(startIndex + limit, totalArticles);

  const authors = [
    { name: 'Dr. Ahmad Syafi\'i', title: 'Pakar Pendidikan Islam' },
    { name: 'Prof. Siti Mahmudah', title: 'Guru Besar UIN Jakarta' },
    { name: 'KH. Abdul Ghofur', title: 'Ketua LP Ma\'arif NU' }
  ];

  const articles = [];
  for (let i = startIndex; i < endIndex; i++) {
    const author = authors[i % authors.length];
    articles.push({
      id: i + 1,
      title: `Opini Pendidikan Islam #${i + 1}: Membangun Karakter Generasi Muda`,
      excerpt: `Pendapat dan pandangan tentang pendidikan Islam dari perspektif pakar. Artikel opini nomor ${i + 1}.`,
      image: `https://placehold.co/800x600/059669/ffffff?text=Opini+${i + 1}`,
      published_at: new Date(Date.now() - i * 86400000).toISOString(),
      slug: `opini-pendidikan-${i + 1}`,
      author_name: author.name,
      author_title: author.title,
      author_image: `https://ui-avatars.com/api/?name=${encodeURIComponent(author.name)}&background=059669&color=fff`
    });
  }

  return {
    articles,
    pagination: {
      current_page: page,
      total_pages: Math.ceil(totalArticles / limit),
      per_page: limit,
      total: totalArticles,
      has_next: page < Math.ceil(totalArticles / limit),
      has_prev: page > 1
    }
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
  try {
    const queryString = buildQueryString(params);
    const data = await apiFetch(`/documents${queryString}`);

    // apiFetch already returns data.data, so data should have documents and pagination directly
    return {
      documents: data.data.documents || [],
      pagination: data.pagination || {},
    };
  } catch (error) {
    console.error('Error fetching documents, using mock data:', error);
    return getMockDocuments(params);
  }
}

function getMockDocuments(params = {}) {
  const page = params.page || 1;
  const limit = params.limit || 12;
  const search = params.search || '';
  const category = params.category || '';

  const categories = ['Pedoman', 'Kurikulum', 'Regulasi', 'Panduan', 'Formulir'];
  const fileTypes = ['pdf', 'docx', 'xlsx'];

  let allDocuments = [];
  for (let i = 0; i < 45; i++) {
    const cat = categories[i % categories.length];
    const fileType = fileTypes[i % fileTypes.length];
    allDocuments.push({
      id: i + 1,
      title: `Dokumen ${cat} #${i + 1}`,
      description: `Deskripsi untuk dokumen ${cat.toLowerCase()} nomor ${i + 1}. Berisi informasi penting terkait ${cat.toLowerCase()}.`,
      category: { name: cat },
      file_type: fileType,
      file_size_formatted: `${Math.floor(Math.random() * 5) + 1}.${Math.floor(Math.random() * 10)} MB`,
      file_size: (Math.floor(Math.random() * 5) + 1) * 1024 * 1024,
      uploaded_at: new Date(Date.now() - i * 86400000).toISOString(),
      created_at: new Date(Date.now() - i * 86400000).toISOString(),
      download_url: `#download-${i + 1}`
    });
  }

  // Filter by search
  if (search) {
    allDocuments = allDocuments.filter(doc =>
      doc.title.toLowerCase().includes(search.toLowerCase()) ||
      doc.description.toLowerCase().includes(search.toLowerCase())
    );
  }

  // Filter by category
  if (category) {
    allDocuments = allDocuments.filter(doc => doc.category.name === category);
  }

  const totalDocuments = allDocuments.length;
  const startIndex = (page - 1) * limit;
  const endIndex = Math.min(startIndex + limit, totalDocuments);
  const documents = allDocuments.slice(startIndex, endIndex);

  return {
    documents,
    pagination: {
      current_page: page,
      total_pages: Math.ceil(totalDocuments / limit),
      per_page: limit,
      total: totalDocuments,
      has_next: page < Math.ceil(totalDocuments / limit),
      has_prev: page > 1
    }
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
  try {
    const data = await apiFetch('/settings');
    return data;
  } catch (error) {
    console.error('Error fetching settings:', error);
    return {
      site_name: 'LP Ma\'arif NU',
      site_description: 'Lembaga Pendidikan Ma\'arif Nahdlatul Ulama',
      contact: {},
      social_media: {},
    };
  }
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
  try {
    const queryString = buildQueryString(params);
    const data = await apiFetch(`/events/flayers${queryString}`);
    return data || [];
  } catch (error) {
    console.error('Error fetching event flayers (endpoint might not exist yet):', error);
    // Return mock data as fallback
    return getMockEventFlayers();
  }
}

/**
 * Mock data for event flayers (fallback when API not ready)
 * @returns {Array} Array of mock event flayers
 */
function getMockEventFlayers() {
  return [
    {
      id: 1,
      title: 'Seminar Nasional Pendidikan Islam 2024',
      description: 'Seminar nasional membahas masa depan pendidikan Islam di Indonesia dengan menghadirkan para pakar pendidikan terkemuka.',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=3000&h=900&fit=crop',
      link: '/kegiatan/seminar-nasional-2024',
      event_date: '2024-03-15',
      location: 'Jakarta Convention Center',
      is_active: true,
      order_number: 1,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: 2,
      title: 'Workshop Kurikulum Merdeka Ma\'arif',
      description: 'Workshop intensif implementasi Kurikulum Merdeka khusus untuk guru-guru di lingkungan LP Ma\'arif NU.',
      image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=3000&h=900&fit=crop',
      link: '/kegiatan/workshop-kurikulum-merdeka',
      event_date: '2024-03-20',
      location: 'Surabaya',
      is_active: true,
      order_number: 2,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: 3,
      title: 'Festival Kreativitas Siswa Madrasah',
      description: 'Festival tahunan yang menampilkan berbagai karya kreatif siswa madrasah dari seluruh Indonesia.',
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=3000&h=900&fit=crop',
      link: '/kegiatan/festival-kreativitas-siswa',
      event_date: '2024-04-10',
      location: 'Bandung',
      is_active: true,
      order_number: 3,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: 4,
      title: 'Pelatihan Kepemimpinan Guru Muda',
      description: 'Program pelatihan kepemimpinan bagi guru muda untuk mempersiapkan generasi pemimpin pendidikan masa depan.',
      image: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=3000&h=900&fit=crop',
      link: '/kegiatan/pelatihan-kepemimpinan-guru',
      event_date: '2024-04-25',
      location: 'Yogyakarta',
      is_active: true,
      order_number: 4,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  ];
}

// ============================================
// LEGACY COMPATIBILITY (for gradual migration)
// ============================================

/**
 * Legacy: Fetch satuan pendidikan data
 * Note: This endpoint might not exist in the API yet
 * @param {Object} params - Query parameters
 * @returns {Promise<Array>} Array of satpen data
 */
export async function getSatpenData(params = {}) {
  try {
    const queryString = buildQueryString(params);
    const data = await apiFetch(`/satpen${queryString}`);
    return data || [];
  } catch (error) {
    console.error('Error fetching satpen data (endpoint might not exist):', error);
    // Return empty array if endpoint doesn't exist yet
    return [];
  }
}
