import BeritaNasionalContent from '@/components/berita/BeritaNasionalContent';
import { Newspaper } from 'lucide-react';
import BatikPattern from '@/components/shared/BatikPattern';

export const metadata = {
  title: 'Berita Nasional - LP Ma\'arif NU',
  description: 'Berita dan informasi terkini tingkat nasional dari LP Ma\'arif NU',
};

export default function BeritaNasionalPage() {

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
      <BeritaNasionalContent />
    </div>
  );
}
