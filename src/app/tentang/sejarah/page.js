import Image from 'next/image';
import { Clock } from 'lucide-react';

export const metadata = {
  title: 'Sejarah LP Ma\'arif NU',
  description: 'Sejarah perjalanan LP Ma\'arif NU dalam mengembangkan pendidikan Islam di Indonesia',
};

const timeline = [
  {
    year: '1916',
    title: 'Berdirinya Nahdlatul Ulama',
    description: 'Nahdlatul Ulama (NU) didirikan di Surabaya sebagai organisasi keagamaan yang kemudian menjadi cikal bakal gerakan pendidikan Ma\'arif.',
  },
  {
    year: '1926',
    title: 'Pembentukan Ma\'arif',
    description: 'Lembaga Pendidikan Ma\'arif dibentuk sebagai badan otonom NU yang mengelola pendidikan Islam.',
  },
  {
    year: '1950-an',
    title: 'Ekspansi Pendidikan',
    description: 'Mulai berkembang pesat dengan mendirikan madrasah dan pesantren di berbagai daerah di Indonesia.',
  },
  {
    year: '1980-an',
    title: 'Modernisasi Sistem',
    description: 'Modernisasi sistem pendidikan dengan mengintegrasikan kurikulum nasional dan nilai-nilai keislaman.',
  },
  {
    year: '2000-an',
    title: 'Era Digital',
    description: 'Adaptasi dengan perkembangan teknologi dan digitalisasi pendidikan.',
  },
  {
    year: '2024',
    title: 'Transformasi Berkelanjutan',
    description: 'Terus berinovasi dalam menyediakan pendidikan berkualitas yang relevan dengan kebutuhan zaman.',
  },
];

export default function SejarahPage() {
  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Section */}
      <section className="bg-primary-600 text-white py-16 md:py-20">
        <div className="container mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Sejarah LP Ma&apos;arif NU
          </h1>
          <p className="text-lg md:text-xl text-primary-100 max-w-3xl">
            Perjalanan panjang dalam mengembangkan pendidikan Islam berkualitas di Indonesia
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            {/* Introduction */}
            <div className="bg-white rounded-lg shadow-sm p-8 mb-12">
              <h2 className="text-3xl font-bold text-neutral-900 mb-6">
                Tentang Sejarah Kami
              </h2>
              <div className="prose prose-lg max-w-none text-neutral-700 leading-relaxed">
                <p>
                  Lembaga Pendidikan Ma&apos;arif Nahdlatul Ulama (LP Ma&apos;arif NU) merupakan salah satu lembaga pendidikan Islam terbesar di Indonesia yang telah berdiri sejak tahun 1926. Sejarah panjang LP Ma&apos;arif NU tidak dapat dipisahkan dari sejarah berdirinya organisasi Nahdlatul Ulama (NU) pada tahun 1926.
                </p>
                <p>
                  Berawal dari kesadaran para ulama akan pentingnya pendidikan sebagai sarana dakwah dan pemberdayaan umat, Ma&apos;arif NU terus berkembang menjadi jaringan pendidikan yang tersebar di seluruh Indonesia. Dari madrasah diniyah hingga perguruan tinggi, LP Ma&apos;arif NU telah melahirkan jutaan alumni yang berkontribusi bagi kemajuan bangsa.
                </p>
                <p>
                  Hingga saat ini, LP Ma&apos;arif NU mengelola lebih dari 14.000 satuan pendidikan di seluruh Indonesia, mulai dari tingkat PAUD, Pendidikan Dasar, Pendidikan Menengah, hingga Pendidikan Tinggi. Komitmen LP Ma&apos;arif NU adalah menghadirkan pendidikan yang tidak hanya unggul secara akademik, tetapi juga kuat dalam pembentukan karakter dan nilai-nilai keislaman yang moderat.
                </p>
              </div>
            </div>

            {/* Timeline */}
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
          </div>
        </div>
      </section>
    </div>
  );
}
