import HeroSlider from '@/components/home/HeroSlider';
import NewsCard from '@/components/shared/NewsCard';
import { Button } from '@/components/ui/button';

import { Newspaper, GraduationCap, Users, FileText } from 'lucide-react';

// Mock data untuk Hero Slider
const heroSlides = [
  {
    id: '1',
    image: 'https://images.unsplash.com/photo-1766593896586-9c597d86faf2?q=1920&w=1080&auto=format&fit=crop',
    title: 'Membangun Pendidikan Islam Berkualitas',
    description: 'LP Ma\'arif NU berkomitmen mengembangkan sistem pendidikan Islam yang unggul dan modern di seluruh Indonesia',
    cta: {
      label: 'Pelajari Lebih Lanjut',
      href: '/tentang/visi-misi',
      secondary: {
        label: 'Hubungi Kami',
        href: '/kontak',
      },
    },
  },
  {
    id: '2',
    image: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?q=1920&w=1080&auto=format&fit=crop',
    title: 'Program Pendidikan Terpadu',
    description: 'Mengintegrasikan nilai-nilai keislaman dengan pendidikan modern untuk menghasilkan generasi yang cerdas dan berakhlak mulia',
    cta: {
      label: 'Lihat Program',
      href: '/tentang/program-strategis',
    },
  },
  {
    id: '3',
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=1920&w=1080&auto=format&fit=crop',
    title: 'Jaringan Satuan Pendidikan Terluas',
    description: 'Lebih dari ribuan satuan pendidikan di bawah naungan LP Ma\'arif NU tersebar di seluruh Indonesia',
    cta: {
      label: 'Data Satpen',
      href: '/data-satpen',
    },
  },
];

// Mock data untuk berita
const headlineNews = [
  {
    id: '1',
    title: 'Peluncuran Program Beasiswa Pendidikan 2024',
    excerpt: 'LP Ma\'arif NU meluncurkan program beasiswa untuk siswa berprestasi dari keluarga kurang mampu di seluruh Indonesia',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&h=600&fit=crop',
    date: '2024-12-15',
    category: 'Program',
    author: 'Admin LP Ma\'arif',
    slug: 'peluncuran-program-beasiswa-2024',
  },
  {
    id: '2',
    title: 'Rakernas LP Ma\'arif NU 2024 Sukses Digelar',
    excerpt: 'Rapat Kerja Nasional membahas strategi pengembangan pendidikan Ma\'arif di era digital dengan partisipasi seluruh pengurus wilayah',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop',
    date: '2024-12-10',
    category: 'Nasional',
    author: 'Tim Redaksi',
    slug: 'rakernas-lp-maarif-nu-2024',
  },
  {
    id: '3',
    title: 'Pelatihan Guru Digital Learning',
    excerpt: 'Ratusan guru dari satuan pendidikan Ma\'arif mengikuti pelatihan penggunaan teknologi dalam pembelajaran',
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&h=600&fit=crop',
    date: '2024-12-05',
    category: 'Daerah',
    author: 'Humas LP Ma\'arif',
    slug: 'pelatihan-guru-digital-learning',
  },
];

const latestNews = [
  {
    id: '4',
    title: 'Kerjasama dengan Kemendikbudristek',
    excerpt: 'Penandatanganan MoU untuk pengembangan kurikulum',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400&h=300&fit=crop',
    date: '2024-12-01',
    category: 'Nasional',
    slug: 'kerjasama-kemendikbudristek',
  },
  {
    id: '5',
    title: 'Workshop Manajemen Madrasah Modern',
    excerpt: 'Mengoptimalkan pengelolaan madrasah di era 4.0',
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400&h=300&fit=crop',
    date: '2024-11-28',
    category: 'Daerah',
    slug: 'workshop-manajemen-madrasah',
  },
  {
    id: '6',
    title: 'Lomba Kreativitas Siswa Madrasah',
    excerpt: 'Kompetisi tingkat nasional untuk mengasah bakat siswa',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop',
    date: '2024-11-25',
    category: 'Program',
    slug: 'lomba-kreativitas-siswa',
  },
];

// Mock data untuk fitur unggulan
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
      {/* Hero Slider */}
      <HeroSlider slides={heroSlides} />

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

      {/* Headline News Section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-2">
                Berita Utama
              </h2>
              <p className="text-neutral-600">
                Informasi dan kegiatan terbaru dari LP Ma&apos;arif NU
              </p>
            </div>
            <a href="/berita">
              <Button variant="outline">Lihat Semua</Button>
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {headlineNews.map((news) => (
              <NewsCard key={news.id} {...news} />
            ))}
          </div>
        </div>
      </section>

      {/* Latest News Sidebar Style */}
      <section className="py-12 md:py-16 bg-neutral-50">
        <div className="container mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-6">
            Berita Terbaru
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {latestNews.map((news) => (
              <NewsCard key={news.id} {...news} variant="horizontal" />
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
