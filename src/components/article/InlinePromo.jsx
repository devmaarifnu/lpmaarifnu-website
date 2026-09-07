import { ExternalLink, BookOpen } from 'lucide-react';

export default function InlinePromo({ title, href }) {
  return (
    <div className="not-prose my-8 border-l-4 border-l-green-500 bg-green-50/50 rounded-r-lg p-4 md:p-5">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 mt-0.5">
          <BookOpen className="w-5 h-5 text-green-600" />
        </div>
        <div>
          <span className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
            Baca Juga
          </span>
          <p className="text-sm md:text-base font-medium text-green-800 mt-1 mb-2">
            {title}
          </p>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm font-medium text-green-700 hover:text-green-800"
          >
            Baca selengkapnya
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}
