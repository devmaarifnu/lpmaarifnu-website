import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge Tailwind CSS classes with clsx
 * @param {...any} inputs - Class names to merge
 * @returns {string} Merged class names
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/**
 * Format date to Indonesian locale
 * @param {Date|string} date - The date to format
 * @param {Intl.DateTimeFormatOptions} options - Format options
 * @returns {string} Formatted date string
 */
export function formatDate(date, options = { dateStyle: 'long' }) {
  // Handle null, undefined, or empty string
  if (!date) {
    return 'Tanggal tidak tersedia';
  }

  try {
    // Convert to Date object if string
    let dateObj;

    if (date instanceof Date) {
      dateObj = date;
    } else if (typeof date === 'object' && date.Time) {
      // Handle Go's sql.NullTime format: {Time: "2026-01-12T14:22:18+07:00", Valid: true}
      dateObj = new Date(date.Time);
    } else if (typeof date === 'string' || typeof date === 'number') {
      dateObj = new Date(date);
    } else {
      console.warn('Invalid date type provided to formatDate:', typeof date, date);
      return 'Tanggal tidak valid';
    }

    // Check if date is valid
    if (!dateObj || isNaN(dateObj.getTime()) || !dateObj.getTime) {
      console.warn('Invalid date provided to formatDate:', date);
      return 'Tanggal tidak valid';
    }

    return new Intl.DateTimeFormat('id-ID', options).format(dateObj);
  } catch (error) {
    console.error('Error formatting date:', error, 'Input:', date);
    return 'Tanggal tidak valid';
  }
}

/**
 * Truncate text to specified length
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length
 * @returns {string} Truncated text with ellipsis
 */
export function truncateText(text, maxLength = 150) {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
}

/**
 * Generate slug from title
 * @param {string} title - Title to convert to slug
 * @returns {string} URL-friendly slug
 */
export function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

/**
 * Safely transform article data from API
 * @param {Object} article - Raw article data from API
 * @param {string} defaultCategory - Default category if not provided
 * @returns {Object} Transformed article data
 */
export function transformArticle(article, defaultCategory = 'Berita') {
  if (!article) return null;

  return {
    id: article.id || Math.random().toString(),
    title: article.title || 'Untitled',
    excerpt: article.excerpt || '',
    image: article.image || '/placeholder-image.jpg',
    date: article.published_at || article.date || new Date().toISOString(),
    category: article.category?.name || article.category || defaultCategory,
    author: article.author?.name || article.author || 'Admin',
    slug: article.slug || 'untitled',
  };
}

/**
 * Safely transform multiple articles
 * @param {Array} articles - Array of raw article data from API
 * @param {string} defaultCategory - Default category if not provided
 * @returns {Array} Array of transformed article data
 */
export function transformArticles(articles, defaultCategory = 'Berita') {
  if (!Array.isArray(articles)) return [];
  return articles.map(article => transformArticle(article, defaultCategory)).filter(Boolean);
}

/**
 * Split HTML content into segments with promo slots inserted evenly.
 * Min 1 promo, max 3 promos, based on paragraph count.
 * @param {string} html - HTML content string
 * @returns {Array<{ type: 'content', value: string } | { type: 'promo' }>}
 */
export function splitHtmlForPromos(html) {
  if (!html) return [{ type: 'content', value: '' }];

  const closingP = '</p>';
  const indices = [];
  let pos = html.indexOf(closingP);

  while (pos !== -1) {
    indices.push(pos + closingP.length);
    pos = html.indexOf(closingP, pos + 1);
  }

  const pCount = indices.length;

  if (pCount < 2) return [{ type: 'content', value: html }];

  let promoCount;
  if (pCount >= 16) {
    promoCount = 3;
  } else if (pCount >= 7) {
    promoCount = 2;
  } else {
    promoCount = 1;
  }

  const segmentCount = promoCount + 1;
  const splitPoints = [];

  for (let i = 1; i <= promoCount; i++) {
    const targetIdx = Math.round((pCount * i) / segmentCount) - 1;
    const clampedIdx = Math.max(0, Math.min(indices.length - 1, targetIdx));
    splitPoints.push(indices[clampedIdx]);
  }

  const segments = [];
  let lastIdx = 0;

  for (const splitIdx of splitPoints) {
    segments.push({ type: 'content', value: html.slice(lastIdx, splitIdx) });
    segments.push({ type: 'promo' });
    lastIdx = splitIdx;
  }

  segments.push({ type: 'content', value: html.slice(lastIdx) });

  return segments;
}

/**
 * @deprecated Use splitHtmlForPromos instead.
 */
export function splitHtmlAtMiddle(html) {
  if (!html) return { firstHalf: '', secondHalf: '' };

  const segments = splitHtmlForPromos(html);
  const parts = segments.filter(s => s.type === 'content').map(s => s.value);

  return {
    firstHalf: parts[0] || '',
    secondHalf: parts.slice(1).join('') || '',
  };
}
