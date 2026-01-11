import { getOpinionArticles } from '@/lib/api';
import Image from 'next/image';

import { MessageSquare, Calendar } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import BatikPattern from '@/components/shared/BatikPattern';

export const metadata = {
  title: 'Opini',
  description: 'Artikel opini dan pemikiran seputar pendidikan Islam dari para pakar',
};

export default async function OpiniPage() {
  const articles = await getOpinionArticles();

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary-700 to-primary-500 text-white py-16 md:py-20 overflow-hidden">
        <BatikPattern opacity={0.15} />

        <div className="container mx-auto relative z-10">
          <div className="flex items-center gap-4 mb-4">
            <MessageSquare className="w-12 h-12" />
            <h1 className="text-3xl md:text-4xl font-bold">
              Opini
            </h1>
          </div>
          <p className="text-lg md:text-xl text-primary-100 max-w-3xl">
            Pemikiran dan pandangan seputar pendidikan Islam dari para pakar dan praktisi
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto">
          <div className="max-w-5xl mx-auto">
            {articles.length > 0 ? (
              <div className="space-y-8">
                {articles.map((article) => (
                  <a
                    key={article.id}
                    href={`/opini/${article.slug}`}
                    className="group block bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
                  >
                    <div className="flex flex-col md:flex-row gap-6 p-6 md:p-8">
                      {/* Image */}
                      <div className="relative w-full md:w-80 h-48 md:h-64 flex-shrink-0 rounded-lg overflow-hidden bg-neutral-100">
                        <Image
                          src={article.image}
                          alt={article.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>

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
                          <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                            <Image
                              src={article.authorImage}
                              alt={article.author}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <p className="font-semibold text-neutral-900">
                              {article.author}
                            </p>
                            <p className="text-sm text-neutral-600">
                              {article.authorTitle}
                            </p>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-neutral-500">
                            <Calendar className="w-4 h-4" />
                            {formatDate(article.date)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
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
          </div>
        </div>
      </section>
    </div>
  );
}
