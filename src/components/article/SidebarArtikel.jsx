import { formatDate } from '@/lib/utils';

function ArticleList({ title, articles, basePath }) {
  if (!articles || articles.length === 0) return null;

  return (
    <div>
      <h3 className="font-bold text-neutral-900 text-base mb-4 pb-2 border-b-2 border-primary-500">
        {title}
      </h3>
      <ul className="space-y-3">
        {articles.map((article, idx) => (
          <li key={article.id || idx}>
            <a
              href={`${basePath}/${article.slug}`}
              className="group block"
            >
              <span className="flex gap-2">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-100 text-primary-700 text-xs font-bold flex items-center justify-center group-hover:bg-primary-600 group-hover:text-white transition-colors">
                  {idx + 1}
                </span>
                <span className="min-w-0">
                  <span className="text-sm text-neutral-700 group-hover:text-primary-600 transition-colors line-clamp-2 leading-snug font-medium">
                    {article.title}
                  </span>
                  {article.published_at?.Time && (
                    <span className="text-xs text-neutral-400 mt-0.5 block">
                      {formatDate(article.published_at.Time, { day: 'numeric', month: 'short', year: 'numeric' })}
                    </span>
                  )}
                </span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function SidebarArtikel({ popularArticles, latestArticles, basePath }) {
  return (
    <aside className="space-y-8">
      <ArticleList title="Terpopuler" articles={popularArticles} basePath={basePath} />
      <ArticleList title="Terkini" articles={latestArticles} basePath={basePath} />
    </aside>
  );
}
