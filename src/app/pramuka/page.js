import Image from 'next/image';
import { Award, Calendar, Users, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import BatikPattern from '@/components/shared/BatikPattern';
import { getPage } from '@/lib/api';

export const metadata = {
  title: 'Pramuka Ma\'arif',
  description: 'Gerakan Pramuka di lingkungan satuan pendidikan LP Ma\'arif NU',
};

// Icon mapping for programs
const iconMap = {
  'target': Target,
  'users': Users,
  'award': Award,
  'calendar': Calendar,
};

// Fallback data
const fallbackAchievements = [
  {
    title: 'Juara Umum Jambore Nasional 2023',
    description: 'Kontingen LP Ma\'arif NU meraih juara umum dalam Jambore Nasional Pramuka 2023',
    image: 'https://images.unsplash.com/photo-1519995451813-39e29e054914?w=800&h=600&fit=crop',
    date: '2023-08-15',
  },
  {
    title: 'Pelatihan Instruktur Nasional',
    description: 'Mengadakan pelatihan instruktur pramuka tingkat nasional dengan 500 peserta',
    image: 'https://images.unsplash.com/photo-1529390079861-591de354faf5?w=800&h=600&fit=crop',
    date: '2023-10-20',
  },
  {
    title: 'Bakti Sosial Lingkungan',
    description: 'Program tanam 10.000 pohon oleh gerakan pramuka Ma\'arif se-Indonesia',
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&h=600&fit=crop',
    date: '2024-03-12',
  },
];

const fallbackPrograms = [
  {
    icon: 'target',
    title: 'Pembinaan Karakter',
    description: 'Program pembinaan karakter melalui kegiatan kepramukaan yang terintegrasi dengan nilai-nilai Islam',
  },
  {
    icon: 'users',
    title: 'Pelatihan Kepemimpinan',
    description: 'Mengembangkan jiwa kepemimpinan dan kemampuan organisasi siswa',
  },
  {
    icon: 'award',
    title: 'Kompetisi & Lomba',
    description: 'Mengikuti berbagai kompetisi kepramukaan tingkat daerah hingga nasional',
  },
  {
    icon: 'calendar',
    title: 'Kegiatan Rutin',
    description: 'Latihan rutin, perkemahan, dan kegiatan sosial berkelanjutan',
  },
];

export default async function PramukaPage() {
  // Fetch pramuka data from API
  const pageData = await getPage('pramuka');

  // Extract data from API with fallbacks
  const heroTitle = pageData?.content?.hero?.title || 'Gerakan Pramuka Ma\'arif NU';
  const heroDescription = pageData?.content?.hero?.description || 'Membentuk karakter pemuda yang berakhlak mulia, cinta tanah air, dan berwawasan keislaman';

  // About section
  const aboutTitle = pageData?.content?.about?.title || 'Tentang Pramuka Ma\'arif';
  const aboutParagraphs = pageData?.content?.about?.paragraphs || [
    'Gerakan Pramuka di lingkungan satuan pendidikan LP Ma\'arif NU merupakan wadah pembinaan karakter dan kepribadian siswa yang berlandaskan nilai-nilai Pancasila dan Ahlussunnah Wal Jama\'ah an-Nahdliyyah.',
    'Melalui berbagai kegiatan kepramukaan, kami membentuk generasi muda yang memiliki jiwa kepemimpinan, tanggung jawab, dan kepedulian terhadap sesama dan lingkungan.',
    'Dengan jaringan lebih dari 5.000 gugus depan di seluruh Indonesia, Pramuka Ma\'arif aktif dalam berbagai kegiatan nasional dan internasional.'
  ];
  const aboutImage = pageData?.content?.about?.image || 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&h=600&fit=crop';

  // Programs section
  const programsTitle = pageData?.content?.programs?.title || 'Program Unggulan';
  const programsDescription = pageData?.content?.programs?.description || 'Berbagai program pembinaan yang dirancang untuk mengembangkan potensi siswa';
  const programsList = pageData?.content?.programs?.list?.map(program => ({
    icon: iconMap[program.icon] || Target,
    title: program.title,
    description: program.description,
  })) || fallbackPrograms.map(p => ({ ...p, icon: iconMap[p.icon] }));

  // Achievements section
  const achievementsTitle = pageData?.content?.achievements?.title || 'Prestasi & Kegiatan';
  const achievementsDescription = pageData?.content?.achievements?.description || 'Pencapaian membanggakan dari gerakan pramuka Ma\'arif NU';
  const achievementsList = pageData?.content?.achievements?.list || fallbackAchievements;

  // CTA section
  const ctaTitle = pageData?.content?.cta?.title || 'Bergabung dengan Pramuka Ma\'arif NU';
  const ctaDescription = pageData?.content?.cta?.description || 'Mari bersama membangun karakter generasi muda yang berakhlak mulia dan cinta tanah air';

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-amber-700 to-amber-600 text-white py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <BatikPattern opacity={0.2} />

        <div className="container mx-auto relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl font-bold mb-6">
              {heroTitle}
            </h1>
            <p className="text-lg md:text-xl text-amber-100 mb-8">
              {heroDescription}
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#program">
                <Button size="lg" className="bg-white text-amber-700 hover:bg-amber-50">
                  Lihat Program
                </Button>
              </a>
              <a href="#prestasi">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  Prestasi Kami
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">
                  {aboutTitle}
                </h2>
                <div className="space-y-4 text-neutral-700 leading-relaxed">
                  {aboutParagraphs.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              </div>

              <div className="relative h-96 rounded-xl overflow-hidden shadow-xl">
                <Image
                  src={aboutImage}
                  alt="Pramuka Ma'arif"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section id="program" className="py-16 md:py-20 bg-neutral-50">
        <div className="container mx-auto">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
                {programsTitle}
              </h2>
              <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                {programsDescription}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {programsList.map((program, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl p-6 hover:shadow-lg transition-shadow border border-neutral-200"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <program.icon className="w-6 h-6 text-amber-700" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                        {program.title}
                      </h3>
                      <p className="text-neutral-700">
                        {program.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section id="prestasi" className="py-16 md:py-20 bg-white">
        <div className="container mx-auto">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
                {achievementsTitle}
              </h2>
              <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                {achievementsDescription}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {achievementsList.map((achievement, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow"
                >
                  <div className="relative h-48">
                    <Image
                      src={achievement.image}
                      alt={achievement.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-sm text-neutral-500 mb-3">
                      <Calendar className="w-4 h-4" />
                      {new Date(achievement.date).toLocaleDateString('id-ID', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </div>
                    <h3 className="text-lg font-bold text-neutral-900 mb-2">
                      {achievement.title}
                    </h3>
                    <p className="text-neutral-700 text-sm">
                      {achievement.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-amber-700 to-amber-600 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {ctaTitle}
          </h2>
          <p className="text-lg text-amber-100 mb-8 max-w-2xl mx-auto">
            {ctaDescription}
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="/kontak">
              <Button size="lg" className="bg-white text-amber-700 hover:bg-amber-50">
                Hubungi Kami
              </Button>
            </a>
            <a href="/tentang/visi-misi">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Pelajari Lebih Lanjut
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
