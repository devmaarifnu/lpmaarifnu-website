'use client';

import { Share2, Facebook, Twitter } from 'lucide-react';

export default function ShareButtons({ title, excerpt, url }) {
  const handleNativeShare = () => {
    if (navigator.share) {
      navigator.share({
        title: title,
        text: excerpt,
        url: url || window.location.href,
      }).catch((error) => {
        console.log('Error sharing:', error);
      });
    }
  };

  const currentUrl = url || (typeof window !== 'undefined' ? window.location.href : '');
  const encodedUrl = encodeURIComponent(currentUrl);
  const encodedTitle = encodeURIComponent(title);

  return (
    <div className="flex items-center gap-3">
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        title="Bagikan ke Facebook"
      >
        <Facebook className="w-5 h-5" />
      </a>
      <a
        href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2.5 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors"
        title="Bagikan ke Twitter"
      >
        <Twitter className="w-5 h-5" />
      </a>
      <button
        onClick={handleNativeShare}
        className="p-2.5 bg-neutral-600 text-white rounded-lg hover:bg-neutral-700 transition-colors"
        title="Bagikan"
      >
        <Share2 className="w-5 h-5" />
      </button>
    </div>
  );
}
