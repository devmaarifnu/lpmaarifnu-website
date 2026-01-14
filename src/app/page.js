import HeroSlider from '@/components/home/HeroSlider';
import BeritaTerbaruSection from '@/components/home/BeritaTerbaruSection';
import FlayerSection from '@/components/home/FlayerSection';
import NewsCard from '@/components/shared/NewsCard';
import { Button } from '@/components/ui/button';
import { getHeroSlides, getFeaturedNews, getOpinionArticles, getEventFlayers } from '@/lib/api';
import { transformArticles } from '@/lib/utils';

import { Newspaper, GraduationCap, Users, FileText } from 'lucide-react';

// Features data
const features = [
  {
    icon: Newspaper,
    title: 'Berita Terkini',
    description: 'Update informasi dan kegiatan terbaru LP Ma\'arif NU',
    href: '/berita',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
  },
  {
    icon: GraduationCap,
    title: 'Program Pendidikan',
    description: 'Berbagai program strategis pengembangan pendidikan',
    href: '/tentang/program-strategis',
    color: 'text-green-600',
    bgColor: 'bg-green-50',
  },
  {
    icon: Users,
    title: 'Data Satpen',
    description: 'Informasi satuan pendidikan Ma\'arif di Indonesia',
    href: '/data-satpen',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
  },
  {
    icon: FileText,
    title: 'Dokumen',
    description: 'Repository dokumen dan panduan pendidikan',
    href: '/dokumen',
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
  },
];

export default async function Home() {
  // Fetch data from API with error handling
  let heroSlides = [];
  let featuredNews = [];
  let opinionArticles = [];
  let flayerData = [];

  try {
    heroSlides = await getHeroSlides();
    featuredNews = await getFeaturedNews(4);
    const opinionData = await getOpinionArticles({ limit: 5 });
    opinionArticles = opinionData.articles || [];
    flayerData = await getEventFlayers({ limit: 10, active: true });
  } catch (error) {
    console.error('Error fetching home page data:', error);
  }

  // Transform API data using utility function for safe transformation
  const headlineNews = transformArticles(featuredNews, 'Berita');
  const latestNews = transformArticles(opinionArticles, 'Opini');

  return (
    <>
      {/* Hero Slider */}
      <HeroSlider slides={heroSlides} />

      {/* Features Section */}
      <section className="py-12 md:py-16 bg-neutral-50">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, idx) => (
              <a
                key={idx}
                href={feature.href}
                className="group bg-white p-6 rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 border border-neutral-200"
              >
                <div className={`w-12 h-12 rounded-lg ${feature.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <feature.icon className={`w-6 h-6 ${feature.color}`} />
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

      {/* Berita Terbaru Section - Enhanced with Batik Pattern */}
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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {latestNews.map((news) => (
              <NewsCard key={news.id} {...news} variant="compact" />
            ))}
          </div>
        </div>
      </section>

      {/* Flayer Kegiatan Section */}
      <FlayerSection flayers={flayerData} />

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-primary-600 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Bergabung dengan Keluarga Besar LP Ma&apos;arif NU
          </h2>
          <p className="text-lg text-primary-100 mb-8 max-w-2xl mx-auto">
            Mari bersama-sama membangun pendidikan Islam yang berkualitas untuk generasi masa depan Indonesia
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="/tentang/visi-misi">
              <Button size="lg" variant="secondary">
                Tentang Kami
              </Button>
            </a>
            <a href="/kontak">
              <Button
                size="lg"
                className="bg-white text-primary-600 hover:bg-neutral-100"
              >
                Hubungi Kami
              </Button>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
