import PropTypes from 'prop-types';

import Image from 'next/image';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { formatDate, truncateText } from '@/lib/utils';
import { cn } from '@/lib/utils';

/**
 * News Card Component
 * @param {Object} props - Component props
 * @param {string} props.title - Article title
 * @param {string} props.excerpt - Article excerpt
 * @param {string} props.image - Article image URL
 * @param {string} props.date - Publication date
 * @param {string} props.category - Article category
 * @param {string} props.author - Article author
 * @param {string} props.slug - Article slug for URL
 * @param {('default'|'horizontal'|'compact'|'minimal')} props.variant - Card layout variant
 */
export default function NewsCard({
  title,
  excerpt,
  image,
  date,
  category,
  author,
  slug,
  variant = 'default',
}) {
  const formattedDate = formatDate(date, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  if (variant === 'horizontal') {
    return (
      <a
        href={`/berita/${slug}`}
        className="group flex flex-col bg-white rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 border border-neutral-200 h-full"
      >
        <div className="relative w-full aspect-[16/9] flex-shrink-0 overflow-hidden bg-neutral-100">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="p-4 flex-1 flex flex-col">
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-block px-3 py-1 bg-primary-100 text-primary-700 text-xs font-semibold rounded-full">
              {category}
            </span>
          </div>
          <h3 className="text-base font-semibold text-neutral-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
            {title}
          </h3>
          <p className="text-sm text-neutral-600 line-clamp-2 mb-3 flex-1">
            {truncateText(excerpt, 100)}
          </p>
          <div className="flex items-center gap-4 text-xs text-neutral-500 mt-auto pt-2 border-t border-neutral-100">
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {formattedDate}
            </span>
            {author && (
              <span className="flex items-center gap-1">
                <User className="w-3 h-3" />
                {author}
              </span>
            )}
          </div>
        </div>
      </a>
    );
  }

  if (variant === 'compact') {
    return (
      <a
        href={`/berita/${slug}`}
        className="group flex flex-col bg-white rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 border border-neutral-200 h-full"
      >
        <div className="relative w-full aspect-square overflow-hidden bg-neutral-100">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute top-2 left-2">
            <span className="inline-block px-2 py-0.5 bg-primary-600 text-white text-[10px] font-semibold rounded-full">
              {category}
            </span>
          </div>
        </div>
        <div className="p-3 flex-1 flex flex-col">
          <h3 className="text-sm font-bold text-neutral-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors leading-tight">
            {title}
          </h3>
          <p className="text-xs text-neutral-600 line-clamp-2 mb-2 flex-1">
            {truncateText(excerpt, 60)}
          </p>
          <div className="flex items-center gap-1 text-[10px] text-neutral-500 mt-auto pt-2 border-t border-neutral-100">
            <Calendar className="w-3 h-3" />
            <time className="truncate">{formatDate(date, { month: 'short', day: 'numeric' })}</time>
          </div>
        </div>
      </a>
    );
  }

  if (variant === 'minimal') {
    return (
      <a
        href={`/berita/${slug}`}
        className="group flex gap-3 hover:bg-neutral-50 p-2 rounded-lg transition-colors duration-200"
      >
        <div className="relative w-20 h-20 flex-shrink-0 rounded overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-semibold text-neutral-900 line-clamp-2 mb-1 group-hover:text-primary-600 transition-colors">
            {title}
          </h4>
          <p className="text-xs text-neutral-500 flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {formattedDate}
          </p>
        </div>
      </a>
    );
  }

  // Default variant
  return (
    <a
      href={`/berita/${slug}`}
      className="group block bg-white rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-neutral-200 h-full"
    >
      {/* Image */}
      <div className="relative w-full aspect-video overflow-hidden bg-neutral-100">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {/* Category Badge */}
        <div className="absolute top-3 left-3 z-10">
          <span className="inline-block px-3 py-1 bg-primary-600 text-white text-xs font-semibold rounded-full shadow-lg">
            {category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-xl font-semibold text-neutral-900 mb-3 line-clamp-2 group-hover:text-primary-600 transition-colors leading-tight">
          {title}
        </h3>

        <p className="text-sm text-neutral-600 mb-4 line-clamp-3 leading-relaxed">
          {truncateText(excerpt, 150)}
        </p>

        {/* Meta Information */}
        <div className="flex items-center justify-between pt-3 border-t border-neutral-100">
          <div className="flex flex-col gap-1 text-xs text-neutral-500">
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {formattedDate}
            </span>
            {author && (
              <span className="flex items-center gap-1">
                <User className="w-3 h-3" />
                {author}
              </span>
            )}
          </div>

          <div className="flex items-center gap-1 text-primary-600 text-sm font-medium group-hover:gap-2 transition-all">
            Baca Selengkapnya
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </a>
  );
}

NewsCard.propTypes = {
  title: PropTypes.string.isRequired,
  excerpt: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  author: PropTypes.string,
  slug: PropTypes.string.isRequired,
  variant: PropTypes.oneOf(['default', 'horizontal', 'compact', 'minimal']),
};
