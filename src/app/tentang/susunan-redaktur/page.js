import Image from 'next/image';
import { Mail, Phone, Newspaper, Users, PenTool } from 'lucide-react';
import BatikPattern from '@/components/shared/BatikPattern';

export const metadata = {
  title: 'Susunan Redaktur',
  description: 'Susunan tim redaksi website dan publikasi LP Ma\'arif NU',
};

// Mock data untuk redaktur
// TODO: Nanti akan diganti dengan data dari API
const editorial = {
  pemimpin_redaksi: {
    name: 'Dr. H. Muhammad Fadhil, M.Pd',
    title: 'Pemimpin Redaksi',
    photo: 'https://ui-avatars.com/api/?name=Muhammad+Fadhil&background=059669&color=fff&size=400',
    bio: 'Pakar pendidikan Islam dengan pengalaman lebih dari 15 tahun di bidang jurnalistik pendidikan.',
    email: 'fadhil@lpmaarifnu.or.id',
    phone: '021-12345678',
  },

  wakil_pemimpin_redaksi: [
    {
      name: 'Dra. Hj. Nur Azizah, M.Si',
      title: 'Wakil Pemimpin Redaksi I',
      photo: 'https://ui-avatars.com/api/?name=Nur+Azizah&background=7C3AED&color=fff&size=400',
      bio: 'Spesialis media dan komunikasi publik.',
      email: 'azizah@lpmaarifnu.or.id',
    },
    {
      name: 'H. Abdul Malik, S.Pd.I, M.M',
      title: 'Wakil Pemimpin Redaksi II',
      photo: 'https://ui-avatars.com/api/?name=Abdul+Malik&background=DC2626&color=fff&size=400',
      bio: 'Praktisi media dengan fokus pada jurnalisme pendidikan.',
      email: 'malik@lpmaarifnu.or.id',
    },
  ],

  redaktur_pelaksana: {
    name: 'Ahmad Syarif, S.Sos, M.I.Kom',
    title: 'Redaktur Pelaksana',
    photo: 'https://ui-avatars.com/api/?name=Ahmad+Syarif&background=2563EB&color=fff&size=400',
    bio: 'Koordinator harian tim redaksi dengan pengalaman di berbagai media nasional.',
    email: 'syarif@lpmaarifnu.or.id',
  },

  dewan_redaksi: [
    {
      name: 'Prof. Dr. KH. Abdullah Shiddiq, MA',
      institution: 'UIN Syarif Hidayatullah Jakarta',
      expertise: 'Pendidikan Islam & Budaya',
      photo: 'https://ui-avatars.com/api/?name=Abdullah+Shiddiq&background=0891B2&color=fff&size=400',
    },
    {
      name: 'Dr. Hj. Fatimah Zahra, M.Pd',
      institution: 'Universitas Nahdlatul Ulama',
      expertise: 'Kurikulum & Pembelajaran',
      photo: 'https://ui-avatars.com/api/?name=Fatimah+Zahra&background=DB2777&color=fff&size=400',
    },
    {
      name: 'Dr. Muhammad Ridwan, M.A',
      institution: 'IAIN Surakarta',
      expertise: 'Media & Komunikasi Islam',
      photo: 'https://ui-avatars.com/api/?name=Muhammad+Ridwan&background=EA580C&color=fff&size=400',
    },
    {
      name: 'Dr. Hj. Siti Nurjanah, M.Si',
      institution: 'UIN Maulana Malik Ibrahim Malang',
      expertise: 'Manajemen Pendidikan',
      photo: 'https://ui-avatars.com/api/?name=Siti+Nurjanah&background=16A34A&color=fff&size=400',
    },
  ],

  tim_redaksi: [
    {
      name: 'Rizki Aulia Rahman, S.Pd',
      position: 'Editor Berita',
      photo: 'https://ui-avatars.com/api/?name=Rizki+Rahman&background=6366F1&color=fff&size=400',
    },
    {
      name: 'Dewi Kusuma Wardani, S.Sos',
      position: 'Editor Opini',
      photo: 'https://ui-avatars.com/api/?name=Dewi+Wardani&background=EC4899&color=fff&size=400',
    },
    {
      name: 'Faisal Akbar, S.Kom',
      position: 'Web Administrator',
      photo: 'https://ui-avatars.com/api/?name=Faisal+Akbar&background=8B5CF6&color=fff&size=400',
    },
    {
      name: 'Rina Melati, S.Ds',
      position: 'Desainer Grafis',
      photo: 'https://ui-avatars.com/api/?name=Rina+Melati&background=F59E0B&color=fff&size=400',
    },
    {
      name: 'Hendra Gunawan, S.I.Kom',
      position: 'Reporter',
      photo: 'https://ui-avatars.com/api/?name=Hendra+Gunawan&background=10B981&color=fff&size=400',
    },
    {
      name: 'Laila Nur Hidayah, S.Pd',
      position: 'Content Writer',
      photo: 'https://ui-avatars.com/api/?name=Laila+Hidayah&background=F43F5E&color=fff&size=400',
    },
  ],
};

export default function SusunanRedakturPage() {
  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary-700 to-primary-500 text-white py-16 md:py-20 overflow-hidden">
        <BatikPattern opacity={0.15} />

        <div className="container mx-auto relative z-10">
          <div className="flex items-center gap-4 mb-4">
            <Newspaper className="w-12 h-12" />
            <h1 className="text-3xl md:text-4xl font-bold">
              Susunan Redaktur
            </h1>
          </div>
          <p className="text-lg md:text-xl text-primary-100 max-w-3xl">
            Tim redaksi yang profesional dan berdedikasi dalam menyajikan informasi berkualitas
          </p>
        </div>
      </section>

      {/* Pemimpin Redaksi */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
                Pemimpin Redaksi
              </h2>
            </div>

            <div className="flex justify-center mb-16">
              <div className="bg-gradient-to-br from-primary-50 to-white rounded-2xl shadow-lg p-8 md:p-10 max-w-2xl w-full border border-primary-100">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                  {/* Photo */}
                  <div className="relative w-40 h-40 flex-shrink-0 rounded-full overflow-hidden border-4 border-primary-600 shadow-lg">
                    <Image
                      src={editorial.pemimpin_redaksi.photo}
                      alt={editorial.pemimpin_redaksi.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="text-2xl font-bold text-neutral-900 mb-2">
                      {editorial.pemimpin_redaksi.name}
                    </h3>
                    <p className="text-primary-600 font-semibold text-lg mb-3">
                      {editorial.pemimpin_redaksi.title}
                    </p>
                    <p className="text-neutral-700 mb-4 leading-relaxed">
                      {editorial.pemimpin_redaksi.bio}
                    </p>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-neutral-600 justify-center md:justify-start">
                        <Mail className="w-4 h-4" />
                        <a href={`mailto:${editorial.pemimpin_redaksi.email}`} className="hover:text-primary-600 transition-colors">
                          {editorial.pemimpin_redaksi.email}
                        </a>
                      </div>
                      {editorial.pemimpin_redaksi.phone && (
                        <div className="flex items-center gap-2 text-neutral-600 justify-center md:justify-start">
                          <Phone className="w-4 h-4" />
                          <span>{editorial.pemimpin_redaksi.phone}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Wakil Pemimpin Redaksi */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold text-neutral-900 mb-6 text-center">
                Wakil Pemimpin Redaksi
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {editorial.wakil_pemimpin_redaksi.map((wakil, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6 border border-neutral-200"
                  >
                    <div className="flex items-start gap-4">
                      <div className="relative w-20 h-20 flex-shrink-0 rounded-full overflow-hidden border-2 border-primary-400">
                        <Image
                          src={wakil.photo}
                          alt={wakil.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-bold text-neutral-900 mb-1">
                          {wakil.name}
                        </h4>
                        <p className="text-primary-600 font-semibold text-sm mb-2">
                          {wakil.title}
                        </p>
                        <p className="text-neutral-600 text-sm mb-2">
                          {wakil.bio}
                        </p>
                        <div className="flex items-center gap-2 text-neutral-500 text-sm">
                          <Mail className="w-3 h-3" />
                          <a href={`mailto:${wakil.email}`} className="hover:text-primary-600 transition-colors">
                            {wakil.email}
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Redaktur Pelaksana */}
            <div className="bg-neutral-100 rounded-xl p-8 mb-12">
              <h3 className="text-2xl font-bold text-neutral-900 mb-6 text-center">
                Redaktur Pelaksana
              </h3>
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6 max-w-3xl mx-auto">
                <div className="relative w-32 h-32 flex-shrink-0 rounded-full overflow-hidden border-4 border-primary-500">
                  <Image
                    src={editorial.redaktur_pelaksana.photo}
                    alt={editorial.redaktur_pelaksana.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h4 className="text-xl font-bold text-neutral-900 mb-1">
                    {editorial.redaktur_pelaksana.name}
                  </h4>
                  <p className="text-primary-600 font-semibold mb-2">
                    {editorial.redaktur_pelaksana.title}
                  </p>
                  <p className="text-neutral-700 mb-3">
                    {editorial.redaktur_pelaksana.bio}
                  </p>
                  <div className="flex items-center gap-2 text-neutral-600 justify-center md:justify-start">
                    <Mail className="w-4 h-4" />
                    <a href={`mailto:${editorial.redaktur_pelaksana.email}`} className="hover:text-primary-600 transition-colors">
                      {editorial.redaktur_pelaksana.email}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dewan Redaksi */}
      <section className="py-16 md:py-20 bg-neutral-50">
        <div className="container mx-auto">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-3 mb-4">
                <Users className="w-8 h-8 text-primary-600" />
                <h2 className="text-3xl md:text-4xl font-bold text-neutral-900">
                  Dewan Redaksi
                </h2>
              </div>
              <p className="text-neutral-600 max-w-2xl mx-auto">
                Para pakar dan akademisi yang memberikan arahan editorial dan menjaga kualitas konten
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {editorial.dewan_redaksi.map((dewan, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all p-6 border border-neutral-200"
                >
                  <div className="flex items-start gap-4">
                    <div className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden">
                      <Image
                        src={dewan.photo}
                        alt={dewan.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-bold text-neutral-900 mb-1">
                        {dewan.name}
                      </h4>
                      <p className="text-primary-600 text-sm font-semibold mb-1">
                        {dewan.institution}
                      </p>
                      <p className="text-neutral-600 text-sm">
                        <span className="font-medium">Keahlian:</span> {dewan.expertise}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tim Redaksi */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-3 mb-4">
                <PenTool className="w-8 h-8 text-primary-600" />
                <h2 className="text-3xl md:text-4xl font-bold text-neutral-900">
                  Tim Redaksi
                </h2>
              </div>
              <p className="text-neutral-600 max-w-2xl mx-auto">
                Tim profesional yang bekerja setiap hari untuk menghadirkan konten berkualitas
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {editorial.tim_redaksi.map((tim, index) => (
                <div
                  key={index}
                  className="bg-neutral-50 rounded-xl shadow-sm hover:shadow-md transition-all p-6 text-center border border-neutral-200"
                >
                  <div className="relative w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-2 border-primary-300">
                    <Image
                      src={tim.photo}
                      alt={tim.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h4 className="text-lg font-bold text-neutral-900 mb-1">
                    {tim.name}
                  </h4>
                  <p className="text-primary-600 text-sm font-semibold">
                    {tim.position}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Hubungi Redaksi
          </h2>
          <p className="text-lg text-primary-100 mb-8 max-w-2xl mx-auto">
            Untuk informasi, kritik, atau saran terkait konten website LP Ma&apos;arif NU
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="mailto:redaksi@lpmaarifnu.or.id"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-primary-600 rounded-lg hover:bg-primary-50 transition-colors font-semibold"
            >
              <Mail className="w-5 h-5" />
              redaksi@lpmaarifnu.or.id
            </a>
            <a
              href="tel:021-12345678"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary-700 text-white rounded-lg hover:bg-primary-800 transition-colors font-semibold border-2 border-white"
            >
              <Phone className="w-5 h-5" />
              021-12345678
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
