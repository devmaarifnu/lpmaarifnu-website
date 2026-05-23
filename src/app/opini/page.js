import { Suspense } from 'react';
import OpiniContent from '@/components/opini/OpiniContent';
import { MessageSquare } from 'lucide-react';
import BatikPattern from '@/components/shared/BatikPattern';

export const metadata = {
  title: 'Opini',
  description: 'Artikel opini dan pemikiran seputar pendidikan Islam dari para pakar',
};

export default function OpiniPage() {

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
      <Suspense fallback={
        <section className="py-12 md:py-16">
          <div className="container mx-auto">
            <div className="text-center py-16">
              <div className="animate-spin w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full mx-auto mb-4" />
              <p className="text-neutral-600">Memuat artikel...</p>
            </div>
          </div>
        </section>
      }>
        <OpiniContent />
      </Suspense>
    </div>
  );
}
