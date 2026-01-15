import Image from 'next/image';
import BatikPattern from '@/components/shared/BatikPattern';
import { getPengurus } from '@/lib/api';

export const metadata = {
  title: 'Susunan Pengurus',
  description: 'Susunan pengurus LP Ma\'arif NU PBNU periode 2024-2029',
};

export default async function SusunanPengurusPage() {
  // Fetch pengurus from API
  let pengurusData = null;

  try {
    pengurusData = await getPengurus({ periode: '2024-2029' });
  } catch (error) {
    console.error('Error fetching pengurus:', error);
  }

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
            LP Ma&apos;arif NU PBNU Periode {pengurusData?.periode || '2024-2029'}
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto">
          <div className="max-w-6xl mx-auto">
            {pengurusData && pengurusData.pengurus && pengurusData.pengurus.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pengurusData.pengurus.map((person) => (
                  <div
                    key={person.id}
                    className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
                  >
                    <div className="relative h-64 overflow-hidden bg-neutral-100">
                      <Image
                        src={person.foto || `https://ui-avatars.com/api/?name=${encodeURIComponent(person.nama)}&background=059669&color=fff&size=400`}
                        alt={person.nama}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-6 text-center">
                      <h3 className="text-lg font-bold text-neutral-900 mb-2">
                        {person.nama}
                      </h3>
                      <p className="text-primary-600 font-semibold mb-3">
                        {person.jabatan}
                      </p>
                      {person.bio && (
                        <p className="text-sm text-neutral-600 line-clamp-3">
                          {person.bio}
                        </p>
                      )}
                      {person.email && (
                        <p className="text-xs text-neutral-500 mt-2">
                          {person.email}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-neutral-600">Gagal memuat data pengurus. Silakan coba lagi nanti.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
