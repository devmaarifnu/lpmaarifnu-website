import { Suspense } from 'react';
import BeritaDaerahContent from '@/components/berita/BeritaDaerahContent';
import { MapPin } from 'lucide-react';
import BatikPattern from '@/components/shared/BatikPattern';

export const metadata = {
  title: 'Berita Daerah - LP Ma\'arif NU',
  description: 'Berita dan informasi terkini dari berbagai daerah LP Ma\'arif NU',
};

export default function BeritaDaerahPage() {

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-green-600 to-green-500 text-white py-16 md:py-20 overflow-hidden">
        <BatikPattern opacity={0.2} />

        <div className="container mx-auto relative z-10">
          <div className="flex items-center gap-4 mb-4">
            <MapPin className="w-12 h-12" />
            <h1 className="text-3xl md:text-4xl font-bold">
              Berita Daerah
            </h1>
          </div>
          <p className="text-lg md:text-xl text-green-100 max-w-3xl">
            Informasi dan kegiatan dari LP Ma&apos;arif NU di berbagai daerah
          </p>
        </div>
      </section>

      {/* Content Section */}
      <Suspense fallback={
        <section className="py-12 md:py-16">
          <div className="container mx-auto">
            <div className="text-center py-16">
              <div className="animate-spin w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full mx-auto mb-4" />
              <p className="text-neutral-600">Memuat berita...</p>
            </div>
          </div>
        </section>
      }>
        <BeritaDaerahContent />
      </Suspense>
    </div>
  );
}
