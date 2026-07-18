'use client';

import { useState, useEffect } from 'react';
import { getFeaturedNews } from '@/lib/api';
import NewsCard from '@/components/shared/NewsCard';
import { Newspaper } from 'lucide-react';
import toast from 'react-hot-toast';

export default function BeritaUtamaContent() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await getFeaturedNews(12);
        const list = Array.isArray(data) ? data : (data?.data || data?.articles || []);

        const transformed = list.map(article => ({
          id: article.id,
          title: article.title,
          excerpt: article.excerpt,
          image: article.image,
          date: article.published_at,
          category: article.category?.name || 'Berita',
          slug: article.slug,
        }));

        setArticles(transformed);
      } catch (error) {
        console.error('Error fetching featured news:', error);
        toast.error('Gagal memuat berita');
        setArticles([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto">
        {/* Category Links */}
        <div className="flex flex-wrap gap-3 mb-8">
          <span className="px-4 py-2 bg-primary-600 text-white text-sm font-semibold rounded-full">
            Semua Berita
          </span>
          <a
            href="/berita/nasional"
            className="px-4 py-2 bg-white border border-neutral-300 text-neutral-700 text-sm font-medium rounded-full hover:border-primary-400 hover:text-primary-600 transition-colors"
          >
            Nasional
          </a>
          <a
            href="/berita/daerah"
            className="px-4 py-2 bg-white border border-neutral-300 text-neutral-700 text-sm font-medium rounded-full hover:border-primary-400 hover:text-primary-600 transition-colors"
          >
            Daerah
          </a>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="text-center py-16">
            <div className="animate-spin w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full mx-auto mb-4" />
            <p className="text-neutral-600">Memuat berita...</p>
          </div>
        ) : articles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {articles.map((article) => (
              <NewsCard key={article.id} {...article} href={`/berita/${article.slug}`} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Newspaper className="w-16 h-16 text-neutral-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-neutral-900 mb-2">
              Belum Ada Berita
            </h3>
            <p className="text-neutral-600">
              Berita akan segera ditampilkan di sini
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
