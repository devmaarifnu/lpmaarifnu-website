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
