import HomeContent from '@/components/home/HomeContent';
import { Newspaper, GraduationCap, Users, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Features data
const features = [
  {
    icon: Newspaper,
    title: 'Berita Terkini',
    description: 'Update informasi dan kegiatan terbaru LP Ma\'arif NU',
    href: '/berita',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
  },
  {
    icon: GraduationCap,
    title: 'Program Pendidikan',
    description: 'Berbagai program strategis pengembangan pendidikan',
    href: '/tentang/program-strategis',
    color: 'text-green-600',
    bgColor: 'bg-green-50',
  },
  {
    icon: Users,
    title: 'Data Satpen',
    description: 'Informasi satuan pendidikan Ma\'arif di Indonesia',
    href: '/data-satpen',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
  },
  {
    icon: FileText,
    title: 'Dokumen',
    description: 'Repository dokumen dan panduan pendidikan',
    href: '/dokumen',
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
  },
];

export default function Home() {
  return (
    <>
      {/* Home Content - Client-side rendered */}
      <HomeContent />

      {/* Features Section */}
      <section className="py-12 md:py-16 bg-neutral-50">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, idx) => (
              <a
                key={idx}
                href={feature.href}
                className="group bg-white p-6 rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 border border-neutral-200"
              >
                <div className={`w-12 h-12 rounded-lg ${feature.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <feature.icon className={`w-6 h-6 ${feature.color}`} />
                </div>
                <h3 className="text-lg font-semibold text-neutral-900 mb-2 group-hover:text-primary-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-sm text-neutral-600">
                  {feature.description}
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-primary-600 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Bergabung dengan Keluarga Besar LP Ma&apos;arif NU
          </h2>
          <p className="text-lg text-primary-100 mb-8 max-w-2xl mx-auto">
            Mari bersama-sama membangun pendidikan Islam yang berkualitas untuk generasi masa depan Indonesia
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="/tentang/visi-misi">
              <Button size="lg" variant="secondary">
                Tentang Kami
              </Button>
            </a>
            <a href="/kontak">
              <Button
                size="lg"
                className="bg-white text-primary-600 hover:bg-neutral-100"
              >
                Hubungi Kami
              </Button>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
