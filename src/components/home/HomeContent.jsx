'use client';

import { useState, useEffect } from 'react';
import HeroSlider from '@/components/home/HeroSlider';
import BeritaTerbaruSection from '@/components/home/BeritaTerbaruSection';
import FlayerSection from '@/components/home/FlayerSection';
import NewsCard from '@/components/shared/NewsCard';
import { getHeroSlides, getFeaturedNews, getOpinionArticles, getEventFlayers } from '@/lib/api';
import { transformArticles } from '@/lib/utils';

export default function HomeContent() {
  const [heroSlides, setHeroSlides] = useState([]);
  const [headlineNews, setHeadlineNews] = useState([]);
  const [latestNews, setLatestNews] = useState([]);
  const [flayerData, setFlayerData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [slides, featured, opinions, flayers] = await Promise.all([
          getHeroSlides().catch(() => []),
          getFeaturedNews(4).catch(() => []),
          getOpinionArticles({ limit: 5 }).catch(() => ({ articles: [] })),
          getEventFlayers({ limit: 10, active: true }).catch(() => []),
        ]);

        setHeroSlides(slides);
        setHeadlineNews(transformArticles(featured, 'Berita'));
        setLatestNews(transformArticles(opinions.articles || [], 'Opini'));
        setFlayerData(flayers);
      } catch (error) {
        console.error('Error fetching home page data:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-center py-16">
          <div className="animate-spin w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-neutral-600">Memuat data...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Hero Slider */}
      <HeroSlider slides={heroSlides} />

      {/* Features Section */}
      <section className="py-12 md:py-16 bg-neutral-50">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: '📰',
                title: 'Berita Terkini',
                description: 'Update informasi dan kegiatan terbaru LP Ma\'arif NU',
                href: '/berita',
                color: 'text-blue-600',
                bgColor: 'bg-blue-50',
              },
              {
                icon: '🎓',
                title: 'Program Pendidikan',
                description: 'Berbagai program strategis pengembangan pendidikan',
                href: '/tentang/program-strategis',
                color: 'text-green-600',
                bgColor: 'bg-green-50',
              },
              {
                icon: '👥',
                title: 'Data Satpen',
                description: 'Informasi satuan pendidikan Ma\'arif di Indonesia',
                href: '/data-satpen',
                color: 'text-purple-600',
                bgColor: 'bg-purple-50',
              },
              {
                icon: '📄',
                title: 'Dokumen',
                description: 'Repository dokumen dan panduan pendidikan',
                href: '/dokumen',
                color: 'text-orange-600',
                bgColor: 'bg-orange-50',
              },
            ].map((feature, idx) => (
              <a
                key={idx}
                href={feature.href}
                className="group bg-white p-6 rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 border border-neutral-200"
              >
                <div className={`w-12 h-12 rounded-lg ${feature.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <span className="text-2xl">{feature.icon}</span>
                </div>
                <h3 className="text-lg font-semibold text-neutral-900 mb-2 group-hover:text-primary-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-sm text-neutral-600">
                  {feature.description}
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Berita Terbaru Section */}
      <BeritaTerbaruSection news={headlineNews} />

      {/* Opini Section */}
      <section className="pt-12 md:pt-16 pb-8 md:pb-10 bg-neutral-50">
        <div className="container mx-auto">
          <div className="mb-8">
            <h2 className="font-bold text-neutral-900 mb-2" style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)' }}>
              Opini
            </h2>
            <p className="text-neutral-600 text-sm md:text-base">
              Pemikiran dan pandangan seputar pendidikan Islam dari para pakar dan praktisi
            </p>
          </div>
          {latestNews.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {latestNews.map((news) => (
                <NewsCard key={news.id} {...news} variant="compact" />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-neutral-500">Belum ada artikel opini</p>
            </div>
          )}
        </div>
      </section>

      {/* Flayer Kegiatan Section */}
      <FlayerSection flayers={flayerData} />
    </>
  );
}
