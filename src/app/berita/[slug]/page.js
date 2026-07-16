import { getNewsArticle, getNewsArticles } from '@/lib/api';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, User, Tag, ArrowLeft, Clock } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import { notFound } from 'next/navigation';
import NewsCard from '@/components/shared/NewsCard';
import ShareButtons from '@/components/article/ShareButtons';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }) {
  const { slug } = await params;

  try {
    const article = await getNewsArticle(slug);

    if (!article) {
      return {
        title: 'Berita Tidak Ditemukan',
      };
    }

    return {
      title: article.title,
      description: article.excerpt || article.meta?.description,
      keywords: article.meta?.keywords,
      openGraph: {
        title: article.meta?.title || article.title,
        description: article.meta?.description || article.excerpt,
        images: article.image ? [article.image] : [],
        type: 'article',
        publishedTime: article.published_at?.Time,
        authors: [article.author?.name],
      },
    };
  } catch (error) {
    return {
      title: 'Berita',
    };
  }
}

export default async function BeritaDetailPage({ params }) {
  const { slug } = await params;
  const article = await getNewsArticle(slug);

  if (!article) {
    notFound();
  }

  // Get related articles from API response or fallback to fetch
  let relatedArticles = [];
  if (article.related_articles && article.related_articles.length > 0) {
    relatedArticles = article.related_articles
      .slice(0, 3)
      .map(related => ({
        id: related.id,
        title: related.title,
        excerpt: related.excerpt || '',
        image: related.image,
        date: related.published_at,
        category: article.category?.name || 'Berita',
        slug: related.slug,
      }));
  } else {
    // Fallback: fetch latest articles and filter
    try {
      const { articles: allArticles } = await getNewsArticles({ limit: 10 });
      if (allArticles && allArticles.length > 0) {
        relatedArticles = allArticles
          .filter(a => a.slug !== slug)
          .slice(0, 3)
          .map(a => ({
            id: a.id,
            title: a.title,
            excerpt: a.excerpt || '',
            image: a.image,
            date: a.published_at,
            category: a.category?.name || 'Berita',
            slug: a.slug,
          }));
      }
    } catch (error) {
      console.error('Error fetching related articles:', error);
    }
  }

  // Calculate reading time (rough estimate: 200 words per minute)
  const wordCount = article.content ? article.content.split(/\s+/).length : 0;
  const readingTime = Math.ceil(wordCount / 200);

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Breadcrumb & Back Navigation */}
      <section className="bg-white border-b border-neutral-200">
        <div className="container mx-auto py-4">
          <div className="flex items-center gap-4">
            <Link
              href="/berita"
              className="flex items-center gap-2 text-primary-600 hover:text-primary-700 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm font-medium">Kembali ke Berita</span>
            </Link>
            <span className="text-neutral-300">/</span>
            <span className="text-sm text-neutral-600 line-clamp-1">{article.title}</span>
          </div>
        </div>
      </section>

      <article className="py-12 md:py-16">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            {/* Category Badge */}
            {article.category && (
              <Link
                href={`/berita/${article.category.slug}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary-100 text-primary-700 rounded-full text-sm font-semibold hover:bg-primary-200 transition-colors mb-4"
              >
                <Tag className="w-3.5 h-3.5" />
                {article.category.name}
              </Link>
            )}

            {/* Title */}
            <h1 className="font-bold text-neutral-900 mb-4 leading-tight" style={{ fontSize: 'clamp(1.75rem, 5vw, 2.25rem)' }}>
              {article.title}
            </h1>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-4 md:gap-6 py-4 border-y border-neutral-200 mb-8">
              {article.author && (
                <div className="flex items-center gap-2 text-neutral-700">
                  <User className="w-4 h-4" />
                  <span className="text-sm font-medium">{article.author.name}</span>
                </div>
              )}
              {article.published_at?.Time && (
                <div className="flex items-center gap-2 text-neutral-600">
                  <Calendar className="w-4 h-4" />
                  <time className="text-sm">{formatDate(article.published_at.Time)}</time>
                </div>
              )}
              <div className="flex items-center gap-2 text-neutral-600">
                <Clock className="w-4 h-4" />
                <span className="text-sm">{readingTime} menit baca</span>
              </div>
              {article.views !== undefined && (
                <div className="flex items-center gap-2 text-neutral-600">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  <span className="text-sm">{article.views.toLocaleString()} views</span>
                </div>
              )}
            </div>

            {/* Featured Image */}
            {article.image && (
              <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden bg-neutral-200">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}

            {/* Excerpt */}
            {article.excerpt && (
              <div className="text-center mt-6 mb-8">
                <p className="text-base text-neutral-500 italic leading-relaxed">
                  {article.excerpt}
                </p>
              </div>
            )}

            {/* Article Content */}
            <div
              className="prose prose-lg max-w-none
                  prose-headings:font-bold prose-headings:!text-neutral-900
                  prose-h1:!text-neutral-900 prose-h2:!text-neutral-900 prose-h3:!text-neutral-900
                  prose-h4:!text-neutral-900 prose-h5:!text-neutral-900 prose-h6:!text-neutral-900
                  prose-p:!text-neutral-900 prose-p:!text-[1.05rem] prose-p:!leading-[1.75] prose-p:!tracking-[-0.01em] prose-p:!mb-4
                  prose-a:!text-primary-600 prose-a:no-underline hover:prose-a:underline
                  prose-img:rounded-lg
                  prose-strong:!text-neutral-900
                  prose-ul:!text-neutral-900 prose-ul:!text-[1.05rem] prose-ul:!leading-[1.9]
                  prose-ol:!text-neutral-900 prose-ol:!text-[1.05rem] prose-ol:!leading-[1.9]
                  prose-li:!text-neutral-900 prose-li:!tracking-[-0.01em] prose-li:!mb-2
                  [&_h1]:!text-neutral-900 [&_h2]:!text-neutral-900 [&_h3]:!text-neutral-900
                  [&_h4]:!text-neutral-900 [&_h5]:!text-neutral-900 [&_h6]:!text-neutral-900
                  [&_p]:!text-neutral-900 [&_p]:!text-[1.05rem] [&_p]:!leading-[1.75] [&_p]:!tracking-[-0.01em] [&_p]:!mb-4 [&_p]:!text-justify
                  [&_ul]:!text-neutral-900 [&_ol]:!text-neutral-900 [&_li]:!text-neutral-900"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />

            {/* Tags */}
            {article.tags && article.tags.length > 0 && (
              <div className="mt-8 mb-8">
                <div className="flex items-center gap-2 flex-wrap">
                  <Tag className="w-5 h-5 text-neutral-600" />
                  {article.tags.map((tag) => (
                    <span
                      key={tag.id}
                      className="px-3 py-1 bg-neutral-100 text-neutral-700 text-sm rounded-full hover:bg-neutral-200 transition-colors cursor-pointer"
                    >
                      #{tag.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Share Section */}
            <div className="mt-12 pt-8 border-t border-neutral-200 mb-12">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-neutral-900">Bagikan Artikel</h3>
                <ShareButtons
                  title={article.title}
                  excerpt={article.excerpt}
                />
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <section className="py-12 md:py-16 bg-white border-t border-neutral-200">
          <div className="container mx-auto">
            <div className="mb-8">
              <h2 className="font-bold text-neutral-900 mb-2" style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)' }}>
                Berita Terkait
              </h2>
              <p className="text-neutral-600">
                Artikel lainnya yang mungkin Anda minati
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedArticles.map((related) => (
                <NewsCard
                  key={related.id}
                  {...related}
                  href={`/berita/${related.slug}`}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
