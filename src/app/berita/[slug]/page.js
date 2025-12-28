import { getNewsArticle, getNewsArticles } from '@/lib/api';
import Image from 'next/image';

import { Calendar, User, Tag, ArrowLeft, Share2 } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import { notFound } from 'next/navigation';
import NewsCard from '@/components/shared/NewsCard';

export async function generateStaticParams() {
  const articles = await getNewsArticles();

  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }) {
  const article = await getNewsArticle(params.slug);

  if (!article) {
    return {
      title: 'Berita Tidak Ditemukan',
    };
  }

  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: [article.image],
    },
  };
}

export default async function BeritaDetailPage({ params }) {
  const article = await getNewsArticle(params.slug);

  if (!article) {
    notFound();
  }

  // Get related articles (same category)
  const relatedArticles = await getNewsArticles({
    category: article.categorySlug,
    limit: 3
  });
  const filteredRelated = relatedArticles.filter(a => a.slug !== article.slug);

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Back Button */}
      <div className="bg-white border-b border-neutral-200">
        <div className="container mx-auto py-4">
          <a
            href="/berita"
            className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali ke Berita
          </a>
        </div>
      </div>

      <article className="py-12 md:py-16">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            {/* Article Header */}
            <div className="mb-8">
              <div className="mb-4">
                <span className="inline-block px-4 py-1.5 bg-primary-600 text-white text-sm font-semibold rounded-full">
                  {article.category}
                </span>
              </div>

              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-neutral-900 mb-6 leading-tight">
                {article.title}
              </h1>

              <div className="flex flex-wrap items-center gap-6 text-neutral-600">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  <span>{formatDate(article.date)}</span>
                </div>
                {article.author && (
                  <div className="flex items-center gap-2">
                    <User className="w-5 h-5" />
                    <span>{article.author}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Featured Image */}
            <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-8 bg-neutral-100">
              <Image
                src={article.image}
                alt={article.title}
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Article Content */}
            <div className="bg-white rounded-xl shadow-sm p-8 md:p-12 mb-8">
              <div
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />
            </div>

            {/* Tags */}
            {article.tags && article.tags.length > 0 && (
              <div className="mb-8">
                <div className="flex items-center gap-2 flex-wrap">
                  <Tag className="w-5 h-5 text-neutral-600" />
                  {article.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-neutral-100 text-neutral-700 text-sm rounded-full hover:bg-neutral-200 transition-colors cursor-pointer"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Share Buttons */}
            <div className="bg-neutral-100 rounded-xl p-6 mb-12">
              <div className="flex items-center gap-4">
                <Share2 className="w-5 h-5 text-neutral-600" />
                <span className="font-semibold text-neutral-900">Bagikan:</span>
                <div className="flex gap-2">
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                    Facebook
                  </button>
                  <button className="px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors text-sm">
                    Twitter
                  </button>
                  <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm">
                    WhatsApp
                  </button>
                </div>
              </div>
            </div>

            {/* Related Articles */}
            {filteredRelated.length > 0 && (
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-6">
                  Berita Terkait
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredRelated.map((related) => (
                    <NewsCard key={related.id} {...related} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </article>
    </div>
  );
}
