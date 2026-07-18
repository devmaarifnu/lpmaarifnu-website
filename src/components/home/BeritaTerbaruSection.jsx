import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight, Calendar, Tag } from 'lucide-react';
import { formatDate } from '@/lib/utils';

// Compact News Card Component
function CompactNewsCard({ title, excerpt, image, date, category, slug }) {
  return (
    <a href={`/berita/${slug}`} className="group">
      <article className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 h-full flex flex-col">
        {/* Image */}
        <div className="relative w-full aspect-[4/3] overflow-hidden bg-neutral-100">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />
          {/* Category Badge */}
          <div className="absolute top-3 left-3">
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-600 text-white text-xs font-semibold rounded-full shadow-lg">
              <Tag className="w-3 h-3" />
              {category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 flex-1 flex flex-col">
          {/* Date */}
          <div className="flex items-center gap-1.5 text-xs text-neutral-500 mb-2">
            <Calendar className="w-3.5 h-3.5" />
            <time>{formatDate(date)}</time>
          </div>

          {/* Title */}
          <h3 className="text-base font-bold text-neutral-900 mb-2 line-clamp-2 group-hover:text-emerald-600 transition-colors leading-snug">
            {title}
          </h3>

          {/* Excerpt */}
          <p className="text-sm text-neutral-600 line-clamp-2 leading-relaxed mb-3">
            {excerpt}
          </p>

          {/* Read More Link */}
          <div className="mt-auto">
            <span className="inline-flex items-center gap-1 text-sm font-semibold text-emerald-600 group-hover:gap-2 transition-all">
              Baca Selengkapnya
              <ArrowRight className="w-4 h-4" />
            </span>
          </div>
        </div>
      </article>
    </a>
  );
}

export default function BeritaTerbaruSection({ news = [] }) {
  return (
    <section className="relative py-16 md:py-24 overflow-hidden bg-gradient-to-br from-emerald-600 via-emerald-500 to-green-500">
      {/* Top Wave Border */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none">
        <svg className="relative block w-full h-12 md:h-16" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
                opacity=".25"
                className="fill-white"></path>
          <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
                opacity=".5"
                className="fill-white"></path>
          <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
                className="fill-white"></path>
        </svg>
      </div>

      {/* Batik Pattern Background */}
      <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="batik-pattern" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
              {/* Circular motifs */}
              <circle cx="50" cy="50" r="30" fill="none" stroke="white" strokeWidth="2" />
              <circle cx="50" cy="50" r="20" fill="none" stroke="white" strokeWidth="1.5" />
              <circle cx="50" cy="50" r="10" fill="none" stroke="white" strokeWidth="1" />

              <circle cx="150" cy="150" r="30" fill="none" stroke="white" strokeWidth="2" />
              <circle cx="150" cy="150" r="20" fill="none" stroke="white" strokeWidth="1.5" />
              <circle cx="150" cy="150" r="10" fill="none" stroke="white" strokeWidth="1" />

              {/* Decorative curves */}
              <path d="M 0 100 Q 50 80 100 100 T 200 100" fill="none" stroke="white" strokeWidth="1.5" />
              <path d="M 100 0 Q 120 50 100 100 T 100 200" fill="none" stroke="white" strokeWidth="1.5" />

              {/* Small dots */}
              <circle cx="25" cy="25" r="3" fill="white" />
              <circle cx="75" cy="25" r="3" fill="white" />
              <circle cx="25" cy="75" r="3" fill="white" />
              <circle cx="75" cy="75" r="3" fill="white" />
              <circle cx="125" cy="125" r="3" fill="white" />
              <circle cx="175" cy="125" r="3" fill="white" />
              <circle cx="125" cy="175" r="3" fill="white" />
              <circle cx="175" cy="175" r="3" fill="white" />

              {/* Traditional Indonesian patterns */}
              <path d="M 100 50 L 110 60 L 100 70 L 90 60 Z" fill="white" opacity="0.5" />
              <path d="M 100 150 L 110 160 L 100 170 L 90 160 Z" fill="white" opacity="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#batik-pattern)" />
        </svg>
      </div>

      {/* Large Decorative Batik Pattern - Right Side */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/3 h-full opacity-5 pointer-events-none hidden lg:block">
        <svg width="100%" height="100%" viewBox="0 0 400 600" xmlns="http://www.w3.org/2000/svg">
          <circle cx="200" cy="300" r="150" fill="none" stroke="white" strokeWidth="4" />
          <circle cx="200" cy="300" r="120" fill="none" stroke="white" strokeWidth="3" />
          <circle cx="200" cy="300" r="90" fill="none" stroke="white" strokeWidth="2" />
          <circle cx="200" cy="300" r="60" fill="none" stroke="white" strokeWidth="1.5" />

          {/* Radial lines */}
          {Array.from({ length: 8 }).map((_, i) => {
            const angle = (i * 45 * Math.PI) / 180;
            const x1 = 200 + 60 * Math.cos(angle);
            const y1 = 300 + 60 * Math.sin(angle);
            const x2 = 200 + 150 * Math.cos(angle);
            const y2 = 300 + 150 * Math.sin(angle);
            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="white"
                strokeWidth="1.5"
              />
            );
          })}
        </svg>
      </div>

      {/* Content */}
      <div className="container mx-auto relative z-10 px-4">
        {/* Header */}
        <div className="max-w-4xl mb-8 md:mb-10">
          <div className="inline-block mb-3">
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 border border-white/30">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              <span className="text-white font-semibold text-xs uppercase tracking-wider">
                Update Terkini
              </span>
            </div>
          </div>

          <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight" style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)' }}>
            Berita Terbaru
          </h2>
        </div>

        {/* News Grid - Compact Cards for 4 Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 mb-10">
          {news.map((item) => (
            <CompactNewsCard key={item.id} {...item} />
          ))}
        </div>

        {/* CTA Button */}
        <div className="flex justify-center">
          <a href="/berita">
            <Button
              size="default"
              className="bg-white text-emerald-600 hover:bg-emerald-50 shadow-md hover:shadow-lg transition-all duration-300 group px-5 py-2 text-sm font-semibold"
            >
              Lihat Semua Berita
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </a>
        </div>
      </div>

      {/* Bottom Wave Border */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none rotate-180">
        <svg className="relative block w-full h-12 md:h-16" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
                opacity=".25"
                className="fill-white"></path>
          <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
                opacity=".5"
                className="fill-white"></path>
          <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
                className="fill-white"></path>
        </svg>
      </div>
    </section>
  );
}
