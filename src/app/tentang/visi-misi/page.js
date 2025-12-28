import { Eye, Target, Lightbulb, Users } from 'lucide-react';

export const metadata = {
  title: 'Visi & Misi',
  description: 'Visi dan Misi LP Ma\'arif NU dalam mengembangkan pendidikan Islam berkualitas',
};

const misiList = [
  {
    icon: Lightbulb,
    title: 'Pendidikan Berkualitas',
    description: 'Menyelenggarakan pendidikan yang berkualitas, berakhlak mulia, dan berkarakter Ahlussunnah Wal Jama\'ah an-Nahdliyyah.',
  },
  {
    icon: Users,
    title: 'Pemberdayaan SDM',
    description: 'Meningkatkan kualitas sumber daya manusia melalui pendidikan dan pelatihan berkelanjutan.',
  },
  {
    icon: Target,
    title: 'Inovasi Pembelajaran',
    description: 'Mengembangkan sistem pembelajaran yang inovatif dan adaptif terhadap perkembangan zaman.',
  },
  {
    icon: Users,
    title: 'Jaringan Pendidikan',
    description: 'Memperluas dan memperkuat jaringan satuan pendidikan Ma\'arif di seluruh Indonesia.',
  },
];

const nilaiNilai = [
  {
    title: 'Religius',
    description: 'Menjunjung tinggi nilai-nilai keislaman yang moderat dan rahmatan lil alamin',
  },
  {
    title: 'Integritas',
    description: 'Menjalankan tugas dengan jujur, transparan, dan bertanggung jawab',
  },
  {
    title: 'Profesional',
    description: 'Bekerja dengan standar profesional dan kompetensi yang tinggi',
  },
  {
    title: 'Inovatif',
    description: 'Terus berinovasi dalam mengembangkan pendidikan yang relevan',
  },
  {
    title: 'Kolaboratif',
    description: 'Membangun kerjasama yang sinergis dengan berbagai pihak',
  },
  {
    title: 'Inklusif',
    description: 'Terbuka dan menghargai keberagaman dalam pendidikan',
  },
];

export default function VisiMisiPage() {
  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-700 to-primary-500 text-white py-16 md:py-20">
        <div className="container mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Visi & Misi
          </h1>
          <p className="text-lg md:text-xl text-primary-100 max-w-3xl">
            Arah dan tujuan LP Ma&apos;arif NU dalam mengembangkan pendidikan Islam di Indonesia
          </p>
        </div>
      </section>

      {/* Visi Section */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto">
          <div className="max-w-5xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-primary-600 to-primary-500 p-8 md:p-12 text-white">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <Eye className="w-8 h-8" />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold">Visi</h2>
                </div>
                <p className="text-xl md:text-2xl leading-relaxed text-primary-50">
                  &quot;Terwujudnya lembaga pendidikan Islam yang unggul, moderat, dan berkarakter Ahlussunnah Wal Jama&apos;ah an-Nahdliyyah untuk mencerdaskan kehidupan bangsa dan mewujudkan masyarakat yang beriman, bertakwa, berakhlak mulia, serta menguasai ilmu pengetahuan dan teknologi.&quot;
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Misi Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                  <Target className="w-6 h-6 text-primary-600" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-neutral-900">
                  Misi
                </h2>
              </div>
              <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                Langkah-langkah strategis untuk mewujudkan visi LP Ma&apos;arif NU
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {misiList.map((item, index) => (
                <div
                  key={index}
                  className="bg-neutral-50 rounded-xl p-6 hover:shadow-lg transition-all duration-300 border-2 border-transparent hover:border-primary-500"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                        {item.title}
                      </h3>
                      <p className="text-neutral-700">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Nilai-Nilai Section */}
      <section className="py-16 md:py-20 bg-neutral-50">
        <div className="container mx-auto">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
                Nilai-Nilai Organisasi
              </h2>
              <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                Prinsip-prinsip yang menjadi landasan kerja LP Ma&apos;arif NU
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {nilaiNilai.map((item, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl p-6 text-center hover:shadow-lg transition-shadow"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-700 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-white">
                      {index + 1}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-neutral-600 text-sm">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
