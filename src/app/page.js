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

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-primary-600 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Daftarkan Satuan Pendidikan Anda
          </h2>
          <p className="text-lg text-primary-100 mb-8 max-w-2xl mx-auto">
            Bergabunglah dengan ribuan satuan pendidikan Ma&apos;arif NU di seluruh Indonesia. Daftarkan lembaga Anda melalui SIPINTER untuk mendapatkan akses layanan dan data resmi LP Ma&apos;arif NU.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="https://sipinter.maarifnu.or.id/ceknpsn" target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="secondary">
                Daftar Sekarang
              </Button>
            </a>
            <a href="https://sipinter.maarifnu.or.id/informasi/panduan-pendataan-satuan-pendidikan" target="_blank" rel="noopener noreferrer">
              <Button
                size="lg"
                className="bg-white text-primary-600 hover:bg-neutral-100"
              >
                Mekanisme Pendaftaran
              </Button>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
