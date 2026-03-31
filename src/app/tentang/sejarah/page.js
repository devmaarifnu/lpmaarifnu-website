import Image from 'next/image';
import { Clock } from 'lucide-react';
import BatikPattern from '@/components/shared/BatikPattern';
import { getPage } from '@/lib/api';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Sejarah LP Ma\'arif NU',
  description: 'Sejarah perjalanan LP Ma\'arif NU dalam mengembangkan pendidikan Islam di Indonesia',
};

export default async function SejarahPage() {
  // Fetch page data from API
  const pageData = await getPage('sejarah');

  if (!pageData) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-neutral-900 mb-4">Data tidak tersedia</h2>
          <p className="text-neutral-600">Silakan hubungi administrator untuk informasi lebih lanjut.</p>
        </div>
      </div>
    );
  }

  const timeline = pageData?.content?.timeline || [];
  const introduction = pageData?.content?.introduction || '';
  const title = pageData?.title || 'Sejarah LP Ma\'arif NU';
  const description = pageData?.description || 'Perjalanan panjang dalam mengembangkan pendidikan Islam berkualitas di Indonesia';
  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary-700 to-primary-500 text-white py-16 md:py-20 overflow-hidden">
        <BatikPattern opacity={0.15} />

        <div className="container mx-auto relative z-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            {title}
          </h1>
          <p className="text-lg md:text-xl text-primary-100 max-w-3xl">
            {description}
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            {/* Introduction */}
            {introduction && (
              <div className="bg-white rounded-lg shadow-sm p-8 mb-12">
                <h2 className="text-3xl font-bold text-neutral-900 mb-6">
                  Tentang Sejarah Kami
                </h2>
                <div className="prose prose-lg max-w-none text-neutral-700 leading-relaxed">
                  {typeof introduction === 'string' ? (
                    <div dangerouslySetInnerHTML={{ __html: introduction }} />
                  ) : (
                    introduction.map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* Timeline */}
            {timeline && timeline.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm p-8">
                <h2 className="text-3xl font-bold text-neutral-900 mb-8">
                  Perjalanan Sejarah
                </h2>
                <div className="relative">
                  {/* Timeline Line */}
                  <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-primary-200" />

                  {/* Timeline Items */}
                  <div className="space-y-8">
                    {timeline.map((item, index) => (
                      <div key={index} className="relative pl-20">
                        {/* Timeline Dot */}
                        <div className="absolute left-0 w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center shadow-lg">
                          <Clock className="w-8 h-8 text-white" />
                        </div>

                        {/* Content */}
                        <div className="bg-neutral-50 rounded-lg p-6 hover:shadow-md transition-shadow">
                          <div className="text-2xl font-bold text-primary-600 mb-2">
                            {item.year}
                          </div>
                          <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                            {item.title}
                          </h3>
                          <p className="text-neutral-700">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
