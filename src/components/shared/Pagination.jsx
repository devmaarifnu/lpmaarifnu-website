'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

export default function Pagination({ currentPage, totalPages, baseUrl, className = '' }) {
  const searchParams = useSearchParams();

  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5; // Maximum number of page buttons to show

    if (totalPages <= maxVisible) {
      // Show all pages if total is less than max
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      // Calculate the range of pages to show around current page
      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);

      // Adjust range to always show maxVisible - 2 pages (excluding first and last)
      const middlePages = maxVisible - 2;
      if (end - start + 1 < middlePages) {
        if (currentPage < totalPages / 2) {
          end = Math.min(totalPages - 1, start + middlePages - 1);
        } else {
          start = Math.max(2, end - middlePages + 1);
        }
      }

      // Add ellipsis before middle pages if needed
      if (start > 2) {
        pages.push('...');
      }

      // Add middle pages
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      // Add ellipsis after middle pages if needed
      if (end < totalPages - 1) {
        pages.push('...');
      }

      // Always show last page
      if (totalPages > 1) {
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  const buildUrl = (page) => {
    if (page === currentPage) return null;

    // Preserve existing query parameters
    const params = new URLSearchParams(searchParams);
    params.set('page', page.toString());

    return `${baseUrl}?${params.toString()}`;
  };

  return (
    <nav className={`flex items-center justify-center gap-2 ${className}`} aria-label="Pagination">
      {/* First Page */}
      {currentPage > 1 && (
        <Link
          href={buildUrl(1)}
          className="p-2 rounded-lg border border-neutral-300 hover:bg-neutral-100 transition-colors"
          aria-label="First page"
        >
          <ChevronsLeft className="w-5 h-5 text-neutral-600" />
        </Link>
      )}

      {/* Previous Page */}
      {currentPage > 1 && (
        <Link
          href={buildUrl(currentPage - 1)}
          className="p-2 rounded-lg border border-neutral-300 hover:bg-neutral-100 transition-colors"
          aria-label="Previous page"
        >
          <ChevronLeft className="w-5 h-5 text-neutral-600" />
        </Link>
      )}

      {/* Page Numbers */}
      <div className="flex items-center gap-1">
        {pageNumbers.map((page, index) => {
          if (page === '...') {
            return (
              <span key={`ellipsis-${index}`} className="px-3 py-2 text-neutral-500">
                ...
              </span>
            );
          }

          const isActive = page === currentPage;
          const url = buildUrl(page);

          if (isActive) {
            return (
              <div
                key={page}
                className="min-w-[40px] px-3 py-2 bg-primary-600 text-white rounded-lg font-semibold text-center"
                aria-current="page"
              >
                {page}
              </div>
            );
          }

          return (
            <Link
              key={page}
              href={url}
              className="min-w-[40px] px-3 py-2 border border-neutral-300 hover:bg-neutral-100 rounded-lg transition-colors text-neutral-700 font-medium text-center"
              aria-label={`Page ${page}`}
            >
              {page}
            </Link>
          );
        })}
      </div>

      {/* Next Page */}
      {currentPage < totalPages && (
        <Link
          href={buildUrl(currentPage + 1)}
          className="p-2 rounded-lg border border-neutral-300 hover:bg-neutral-100 transition-colors"
          aria-label="Next page"
        >
          <ChevronRight className="w-5 h-5 text-neutral-600" />
        </Link>
      )}

      {/* Last Page */}
      {currentPage < totalPages && (
        <Link
          href={buildUrl(totalPages)}
          className="p-2 rounded-lg border border-neutral-300 hover:bg-neutral-100 transition-colors"
          aria-label="Last page"
        >
          <ChevronsRight className="w-5 h-5 text-neutral-600" />
        </Link>
      )}
    </nav>
  );
}
