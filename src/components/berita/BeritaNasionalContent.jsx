'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { getNewsArticles } from '@/lib/api';
import NewsCard from '@/components/shared/NewsCard';
import Pagination from '@/components/shared/Pagination';
import { Newspaper } from 'lucide-react';

export default function BeritaNasionalContent() {
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;
  const limit = 2;

  const [articles, setArticles] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const { articles: data, pagination: paginationData } = await getNewsArticles({
          category: 'nasional',
          page: currentPage,
          limit: limit
        });

        // Transform API data to match NewsCard props
        const transformedArticles = data.map(article => ({
          id: article.id,
          title: article.title,
          excerpt: article.excerpt,
          image: article.image,
          date: article.published_at,
          category: article.category?.name || 'Nasional',
          slug: article.slug,
        }));

        setArticles(transformedArticles);
        setPagination(paginationData);
      } catch (error) {
        console.error('Error fetching news articles:', error);
        setArticles([]);
        setPagination(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [currentPage]);

  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto">
        {/* Loading State */}
        {isLoading ? (
          <div className="text-center py-16">
            <div className="animate-spin w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full mx-auto mb-4" />
            <p className="text-neutral-600">Memuat berita...</p>
          </div>
        ) : (
          <>
            {/* Pagination Info */}
            {pagination && pagination.total > 0 && (
              <div className="mb-6 text-sm text-neutral-600">
                Menampilkan {((currentPage - 1) * limit) + 1} - {Math.min(currentPage * limit, pagination.total)} dari {pagination.total} berita
              </div>
            )}

            {articles.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                  {articles.map((article) => (
                    <NewsCard key={article.id} {...article} href={`/berita/${article.slug}`} />
                  ))}
                </div>

                {/* Pagination */}
                {pagination && pagination.total_pages > 1 && (
                  <div className="mt-12">
                    <Pagination
                      currentPage={currentPage}
                      totalPages={pagination.total_pages}
                      baseUrl="/berita/nasional"
                    />
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-16">
                <Newspaper className="w-16 h-16 text-neutral-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                  Belum Ada Berita
                </h3>
                <p className="text-neutral-600">
                  Berita nasional akan segera ditampilkan di sini
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
