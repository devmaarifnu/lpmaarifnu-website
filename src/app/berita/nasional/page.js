import { getNewsArticles } from '@/lib/api';
import NewsCard from '@/components/shared/NewsCard';
import { Newspaper } from 'lucide-react';
import BatikPattern from '@/components/shared/BatikPattern';

export const metadata = {
  title: 'Berita Nasional',
  description: 'Berita dan informasi terkini tingkat nasional dari LP Ma\'arif NU',
};

export default async function BeritaNasionalPage() {
  const articles = await getNewsArticles({ category: 'nasional' });

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary-700 to-primary-500 text-white py-16 md:py-20 overflow-hidden">
        <BatikPattern opacity={0.15} />

        <div className="container mx-auto relative z-10">
          <div className="flex items-center gap-4 mb-4">
            <Newspaper className="w-12 h-12" />
            <h1 className="text-3xl md:text-4xl font-bold">
              Berita Nasional
            </h1>
          </div>
          <p className="text-lg md:text-xl text-primary-100 max-w-3xl">
            Informasi dan berita terkini tingkat nasional dari LP Ma&apos;arif NU
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto">
          {articles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {articles.map((article) => (
                <NewsCard key={article.id} {...article} />
              ))}
            </div>
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
        </div>
      </section>
    </div>
  );
}
