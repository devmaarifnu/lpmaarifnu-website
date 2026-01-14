import { Lightbulb, GraduationCap, Users, BookOpen, Award, Globe } from 'lucide-react';
import BatikPattern from '@/components/shared/BatikPattern';
import { getPage } from '@/lib/api';

export const metadata = {
  title: 'Program Strategis',
  description: 'Program-program strategis LP Ma\'arif NU untuk pengembangan pendidikan',
};

// Icon mapping for programs
const iconMap = {
  'teaching': GraduationCap,
  'digital': Globe,
  'curriculum': BookOpen,
  'scholarship': Award,
  'innovation': Lightbulb,
  'hr': Users,
};

// Color mapping for programs
const colorMap = {
  'teaching': 'blue',
  'digital': 'cyan',
  'curriculum': 'green',
  'scholarship': 'yellow',
  'innovation': 'orange',
  'hr': 'purple',
};

const getColorClasses = (color) => {
  const colors = {
    blue: 'bg-blue-100 text-blue-700',
    green: 'bg-green-100 text-green-700',
    purple: 'bg-purple-100 text-purple-700',
    cyan: 'bg-cyan-100 text-cyan-700',
    yellow: 'bg-yellow-100 text-yellow-700',
    orange: 'bg-orange-100 text-orange-700',
  };
  return colors[color] || colors.blue;
};

export default async function ProgramStrategisPage() {
  // Fetch program data from API
  const pageData = await getPage('program-strategis');

  // Extract introduction text from API
  const introductionText = pageData?.content?.introduction ||
    'LP Ma\'arif NU memiliki komitmen kuat untuk terus mengembangkan dan meningkatkan kualitas pendidikan Islam di Indonesia melalui berbagai program strategis yang terencana dan berkelanjutan. Program-program ini dirancang untuk menjawab tantangan pendidikan di era modern sambil tetap mempertahankan nilai-nilai luhur keislaman.';

  // Transform API data or use fallback
  const programs = pageData?.content?.programs?.map((program, index) => {
    const iconKey = program.icon || 'teaching';
    const colorKey = colorMap[iconKey] || ['blue', 'green', 'purple', 'cyan', 'yellow', 'orange'][index % 6];

    return {
      icon: iconMap[iconKey] || GraduationCap,
      title: program.title,
      description: program.description,
      goals: program.goals || program.targets || [],
      status: program.status || 'Ongoing',
      color: colorKey,
    };
  }) || [
    {
      icon: GraduationCap,
      title: 'Peningkatan Mutu Pendidikan',
      description: 'Program komprehensif untuk meningkatkan kualitas pembelajaran di seluruh satuan pendidikan Ma\'arif',
      goals: [
        'Meningkatkan kompetensi guru melalui pelatihan berkelanjutan',
        'Mengembangkan metode pembelajaran inovatif',
        'Meningkatkan fasilitas dan sarana pembelajaran',
        'Implementasi teknologi pendidikan terkini',
      ],
      status: 'Ongoing',
      color: 'blue',
    },
    {
      icon: BookOpen,
      title: 'Kurikulum Berbasis Ma\'arif',
      description: 'Pengembangan kurikulum yang mengintegrasikan nilai-nilai Islam Ahlussunnah dengan kurikulum nasional',
      goals: [
        'Menyusun kurikulum Ma\'arif yang komprehensif',
        'Integrasi nilai-nilai keislaman moderat',
        'Pengembangan bahan ajar dan modul pembelajaran',
        'Pelatihan guru dalam implementasi kurikulum',
      ],
      status: 'Ongoing',
      color: 'green',
    },
  ];

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary-700 to-primary-500 text-white py-16 md:py-20 overflow-hidden">
        <BatikPattern opacity={0.15} />

        <div className="container mx-auto relative z-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Program Strategis
          </h1>
          <p className="text-lg md:text-xl text-primary-100 max-w-3xl">
            Program-program unggulan LP Ma&apos;arif NU untuk mewujudkan pendidikan Islam yang berkualitas dan modern
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-12 bg-white">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-lg text-neutral-700 leading-relaxed">
              LP Ma&apos;arif NU memiliki komitmen kuat untuk terus mengembangkan dan meningkatkan kualitas pendidikan Islam di Indonesia melalui berbagai program strategis yang terencana dan berkelanjutan. Program-program ini dirancang untuk menjawab tantangan pendidikan di era modern sambil tetap mempertahankan nilai-nilai luhur keislaman.
            </p>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto">
          <div className="max-w-6xl mx-auto space-y-8">
            {programs.map((program, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow p-8 border border-neutral-200"
              >
                <div className="flex items-start gap-6">
                  {/* Icon */}
                  <div className={`w-16 h-16 rounded-xl ${getColorClasses(program.color)} flex items-center justify-center flex-shrink-0`}>
                    <program.icon className="w-8 h-8" />
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-neutral-900 mb-2">
                          {program.title}
                        </h3>
                        <p className="text-neutral-700 mb-4">
                          {program.description}
                        </p>
                      </div>
                      <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-semibold rounded-full flex-shrink-0 ml-4">
                        {program.status}
                      </span>
                    </div>

                    {/* Goals */}
                    <div>
                      <h4 className="font-semibold text-neutral-900 mb-3">
                        Target & Sasaran:
                      </h4>
                      <ul className="space-y-2">
                        {program.goals.map((goal, goalIndex) => (
                          <li
                            key={goalIndex}
                            className="flex items-start gap-3 text-neutral-700"
                          >
                            <span className="w-1.5 h-1.5 bg-primary-600 rounded-full mt-2 flex-shrink-0" />
                            <span>{goal}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Bergabung dalam Program Kami
          </h2>
          <p className="text-lg text-primary-100 mb-8 max-w-2xl mx-auto">
            Mari bersama-sama mewujudkan pendidikan Islam yang berkualitas untuk masa depan Indonesia
          </p>
        </div>
      </section>
    </div>
  );
}
