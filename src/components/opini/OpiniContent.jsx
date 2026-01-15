'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { getOpinionArticles } from '@/lib/api';
import Image from 'next/image';
import Pagination from '@/components/shared/Pagination';
import { MessageSquare, Calendar } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import toast from 'react-hot-toast';

export default function OpiniContent() {
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;
  const limit = 10;

  const [articles, setArticles] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const { articles: data, pagination: paginationData } = await getOpinionArticles({
          page: currentPage,
          limit: limit
        });

        // Transform API data
        const transformedArticles = data.map(article => ({
          id: article.id,
          title: article.title,
          excerpt: article.excerpt,
          image: article.image,
          date: article.published_at,
          slug: article.slug,
          author: article.author_name || article.author?.name,
          authorTitle: article.author_title || article.author?.title,
          authorImage: article.author_image || article.author?.image || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(article.author_name || 'Author'),
        }));

        setArticles(transformedArticles);
        setPagination(paginationData);
      } catch (error) {
        console.error('Error fetching opini articles:', error);
        toast.error('Gagal memuat artikel opini');
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
        <div className="max-w-5xl mx-auto">
          {/* Loading State */}
          {isLoading ? (
            <div className="text-center py-16">
              <div className="animate-spin w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full mx-auto mb-4" />
              <p className="text-neutral-600">Memuat artikel...</p>
            </div>
          ) : (
            <>
              {/* Showing info */}
              {pagination && pagination.total > 0 && (
                <div className="mb-6 text-sm text-neutral-600">
                  Menampilkan {((currentPage - 1) * limit) + 1} - {Math.min(currentPage * limit, pagination.total)} dari {pagination.total} artikel
                </div>
              )}

              {articles.length > 0 ? (
                <>
                  <div className="space-y-8">
                    {articles.map((article) => (
                      <a
                        key={article.id}
                        href={`/opini/${article.slug}`}
                        className="group block bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
                      >
                        <div className="flex flex-col md:flex-row gap-6 p-6 md:p-8">
                          {/* Image */}
                          {article.image && (
                            <div className="relative w-full md:w-80 h-48 md:h-64 flex-shrink-0 rounded-lg overflow-hidden bg-neutral-100">
                              <Image
                                src={article.image}
                                alt={article.title}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                            </div>
                          )}

                          {/* Content */}
                          <div className="flex-1 flex flex-col justify-between">
                            <div>
                              <h2 className="text-xl md:text-2xl font-bold text-neutral-900 mb-3 group-hover:text-primary-600 transition-colors">
                                {article.title}
                              </h2>
                              <p className="text-neutral-700 mb-4 line-clamp-3">
                                {article.excerpt}
                              </p>
                            </div>

                            {/* Author Info */}
                            <div className="flex items-center gap-4 pt-4 border-t border-neutral-100">
                              {article.authorImage && (
                                <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                                  <Image
                                    src={article.authorImage}
                                    alt={article.author}
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                              )}
                              <div className="flex-1">
                                <p className="font-semibold text-neutral-900">
                                  {article.author}
                                </p>
                                {article.authorTitle && (
                                  <p className="text-sm text-neutral-600">
                                    {article.authorTitle}
                                  </p>
                                )}
                              </div>
                              {article.date && (
                                <div className="flex items-center gap-2 text-sm text-neutral-500">
                                  <Calendar className="w-4 h-4" />
                                  {formatDate(article.date)}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>

                    
                  {/* Pagination */}
                  {pagination && pagination.total_pages > 1 && (
                    <div className="mt-12">
                      <Pagination
                        currentPage={currentPage}
                        totalPages={pagination.total_pages}
                        baseUrl="/opini"
                      />
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-16">
                  <MessageSquare className="w-16 h-16 text-neutral-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                    Belum Ada Artikel Opini
                  </h3>
                  <p className="text-neutral-600">
                    Artikel opini akan segera ditampilkan di sini
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
