import Image from 'next/image';
import BatikPattern from '@/components/shared/BatikPattern';
import { getOrganizationStructure } from '@/lib/api';

export const metadata = {
  title: 'Struktur Organisasi',
  description: 'Struktur organisasi LP Ma\'arif NU PBNU',
};

export default async function StrukturOrganisasiPage() {
  // Fetch organization structure from API
  const orgData = await getOrganizationStructure();

  // Use API data if available, otherwise use fallback
  const struktur = {
    ketua: orgData?.ketua || {
      nama: 'Prof. Dr. KH. Said Aqil Siradj, MA',
      jabatan: 'Ketua Umum',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    },
    wakil: orgData?.wakil || [
      {
        nama: 'Dr. H. Ahmad Lutfi, M.Pd',
        jabatan: 'Wakil Ketua I',
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
      },
      {
        nama: 'Drs. H. Mahfudz Siddiq, M.Si',
        jabatan: 'Wakil Ketua II',
        image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop',
      },
    ],
    sekretaris: orgData?.sekretaris || {
      nama: 'Dr. Hj. Siti Aisyah, M.Pd',
      jabatan: 'Sekretaris Umum',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    },
    bendahara: orgData?.bendahara || {
      nama: 'H. Abdul Rahman, SE, M.Ak',
      jabatan: 'Bendahara Umum',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
    },
  };

  // Transform department data
  const bidang = orgData?.departments?.map((dept, index) => ({
    nama: dept.name,
    ketua: dept.head_name || 'Belum ditentukan',
    deskripsi: dept.description || '',
  })) || [
    {
      nama: 'Bidang Pendidikan Dasar',
      ketua: 'Dr. Muhammad Yusuf, M.Pd',
      deskripsi: 'Mengelola pengembangan pendidikan tingkat SD/MI',
    },
    {
      nama: 'Bidang Pendidikan Menengah',
      ketua: 'Dra. Hj. Nur Aini, M.Pd',
      deskripsi: 'Mengelola pengembangan pendidikan tingkat SMP/MTs dan SMA/MA',
    },
    {
      nama: 'Bidang Pendidikan Tinggi',
      ketua: 'Prof. Dr. Ahmad Syahid, M.A',
      deskripsi: 'Mengelola perguruan tinggi di bawah LP Ma\'arif NU',
    },
    {
      nama: 'Bidang Kurikulum',
      ketua: 'Dr. Hj. Fatimah Azzahra, M.Pd',
      deskripsi: 'Mengembangkan kurikulum berbasis Ma\'arif NU',
    },
    {
      nama: 'Bidang SDM dan Kemitraan',
      ketua: 'H. Zainuddin Maliki, M.M',
      deskripsi: 'Mengembangkan SDM dan kerjasama kelembagaan',
    },
    {
      nama: 'Bidang Penelitian dan Pengembangan',
      ketua: 'Dr. Ir. Habiburrahman, M.T',
      deskripsi: 'Melakukan penelitian dan pengembangan pendidikan',
    },
  ];

  // Transform to get the position title from API or use default
  const getPositionTitle = (person, defaultTitle) => {
    if (person.position_name) return person.position_name;
    if (person.title && defaultTitle.includes(person.title)) return defaultTitle;
    return defaultTitle;
  };

  // Transform image/photo field names for API compatibility
  const transformedStruktur = {
    ketua: {
      nama: struktur.ketua?.name || struktur.ketua?.nama,
      jabatan: struktur.ketua?.position_name || 'Ketua Umum',
      image: struktur.ketua?.photo || struktur.ketua?.image || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    },
    wakil: (struktur.wakil || []).map((w, idx) => ({
      nama: w?.name || w?.nama,
      jabatan: w?.position_name || `Wakil Ketua ${idx + 1}`,
      image: w?.photo || w?.image || `https://images.unsplash.com/photo-${idx === 0 ? '1500648767791-00dcc994a43e' : '1519085360753-af0119f7cbe7'}?w=400&h=400&fit=crop`,
    })),
    sekretaris: {
      nama: struktur.sekretaris?.name || struktur.sekretaris?.nama,
      jabatan: struktur.sekretaris?.position_name || 'Sekretaris Umum',
      image: struktur.sekretaris?.photo || struktur.sekretaris?.image || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    },
    bendahara: {
      nama: struktur.bendahara?.name || struktur.bendahara?.nama,
      jabatan: struktur.bendahara?.position_name || 'Bendahara Umum',
      image: struktur.bendahara?.photo || struktur.bendahara?.image || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
    },
  };
  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary-700 to-primary-500 text-white py-16 md:py-20 overflow-hidden">
        <BatikPattern opacity={0.15} />

        <div className="container mx-auto relative z-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Struktur Organisasi
          </h1>
          <p className="text-lg md:text-xl text-primary-100 max-w-3xl">
            Susunan kepemimpinan dan struktur organisasi LP Ma&apos;arif NU PBNU
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto">
          <div className="max-w-6xl mx-auto">
            {/* Pimpinan Utama */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-center text-neutral-900 mb-12">
                Pimpinan Utama
              </h2>

              {/* Ketua Umum */}
              <div className="flex justify-center mb-8">
                <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
                  <div className="w-32 h-32 mx-auto mb-4 relative rounded-full overflow-hidden border-4 border-primary-600">
                    <Image
                      src={transformedStruktur.ketua.image}
                      alt={transformedStruktur.ketua.nama}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-neutral-900 mb-1">
                    {transformedStruktur.ketua.nama}
                  </h3>
                  <p className="text-primary-600 font-semibold">
                    {transformedStruktur.ketua.jabatan}
                  </p>
                </div>
              </div>

              {/* Wakil Ketua */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {transformedStruktur.wakil.map((item, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-xl shadow-lg p-6 text-center"
                  >
                    <div className="w-24 h-24 mx-auto mb-4 relative rounded-full overflow-hidden border-4 border-primary-400">
                      <Image
                        src={item.image}
                        alt={item.nama}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <h3 className="text-lg font-bold text-neutral-900 mb-1">
                      {item.nama}
                    </h3>
                    <p className="text-primary-600 font-semibold">
                      {item.jabatan}
                    </p>
                  </div>
                ))}
              </div>

              {/* Sekretaris & Bendahara */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                  <div className="w-24 h-24 mx-auto mb-4 relative rounded-full overflow-hidden border-4 border-primary-300">
                    <Image
                      src={transformedStruktur.sekretaris.image}
                      alt={transformedStruktur.sekretaris.nama}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h3 className="text-lg font-bold text-neutral-900 mb-1">
                    {transformedStruktur.sekretaris.nama}
                  </h3>
                  <p className="text-primary-600 font-semibold">
                    {transformedStruktur.sekretaris.jabatan}
                  </p>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                  <div className="w-24 h-24 mx-auto mb-4 relative rounded-full overflow-hidden border-4 border-primary-300">
                    <Image
                      src={transformedStruktur.bendahara.image}
                      alt={transformedStruktur.bendahara.nama}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h3 className="text-lg font-bold text-neutral-900 mb-1">
                    {transformedStruktur.bendahara.nama}
                  </h3>
                  <p className="text-primary-600 font-semibold">
                    {transformedStruktur.bendahara.jabatan}
                  </p>
                </div>
              </div>
            </div>

            {/* Bidang-Bidang */}
            <div>
              <h2 className="text-3xl font-bold text-center text-neutral-900 mb-12">
                Bidang-Bidang
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {bidang.map((item, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow"
                  >
                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                      <span className="text-xl font-bold text-primary-600">
                        {index + 1}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-neutral-900 mb-2">
                      {item.nama}
                    </h3>
                    <p className="text-sm text-primary-600 font-semibold mb-2">
                      Ketua: {item.ketua}
                    </p>
                    <p className="text-sm text-neutral-600">
                      {item.deskripsi}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
