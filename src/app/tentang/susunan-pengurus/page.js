import Image from 'next/image';
import BatikPattern from '@/components/shared/BatikPattern';

export const metadata = {
  title: 'Susunan Pengurus',
  description: 'Susunan pengurus LP Ma\'arif NU PBNU periode 2024-2029',
};

const pengurus = [
  {
    nama: 'Prof. Dr. KH. Said Aqil Siradj, MA',
    jabatan: 'Ketua Umum',
    foto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
  },
  {
    nama: 'Dr. H. Ahmad Lutfi, M.Pd',
    jabatan: 'Wakil Ketua I',
    foto: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
  },
  {
    nama: 'Drs. H. Mahfudz Siddiq, M.Si',
    jabatan: 'Wakil Ketua II',
    foto: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop',
  },
  {
    nama: 'Dr. Hj. Siti Aisyah, M.Pd',
    jabatan: 'Sekretaris Umum',
    foto: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
  },
  {
    nama: 'H. Abdul Rahman, SE, M.Ak',
    jabatan: 'Bendahara Umum',
    foto: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
  },
  {
    nama: 'Dr. Muhammad Yusuf, M.Pd',
    jabatan: 'Kepala Bidang Pendidikan Dasar',
    foto: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop',
  },
  {
    nama: 'Dra. Hj. Nur Aini, M.Pd',
    jabatan: 'Kepala Bidang Pendidikan Menengah',
    foto: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop',
  },
  {
    nama: 'Prof. Dr. Ahmad Syahid, M.A',
    jabatan: 'Kepala Bidang Pendidikan Tinggi',
    foto: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop',
  },
  {
    nama: 'Dr. Hj. Fatimah Azzahra, M.Pd',
    jabatan: 'Kepala Bidang Kurikulum',
    foto: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop',
  },
  {
    nama: 'H. Zainuddin Maliki, M.M',
    jabatan: 'Kepala Bidang SDM dan Kemitraan',
    foto: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=400&h=400&fit=crop',
  },
  {
    nama: 'Dr. Ir. Habiburrahman, M.T',
    jabatan: 'Kepala Bidang Litbang',
    foto: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=400&h=400&fit=crop',
  },
  {
    nama: 'Drs. H. Miftahul Huda, M.Pd.I',
    jabatan: 'Kepala Bidang Humas & Publikasi',
    foto: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400&h=400&fit=crop',
  },
];

export default function SusunanPengurusPage() {
  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary-700 to-primary-500 text-white py-16 md:py-20 overflow-hidden">
        <BatikPattern opacity={0.15} />

        <div className="container mx-auto relative z-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Susunan Pengurus
          </h1>
          <p className="text-lg md:text-xl text-primary-100 max-w-3xl">
            LP Ma&apos;arif NU PBNU Periode 2024-2029
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pengurus.map((person, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
                >
                  <div className="relative h-64 overflow-hidden bg-neutral-100">
                    <Image
                      src={person.foto}
                      alt={person.nama}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6 text-center">
                    <h3 className="text-lg font-bold text-neutral-900 mb-2">
                      {person.nama}
                    </h3>
                    <p className="text-primary-600 font-semibold">
                      {person.jabatan}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
