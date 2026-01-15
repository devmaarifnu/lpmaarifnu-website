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

  if (!orgData) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-neutral-900 mb-4">Data tidak tersedia</h2>
          <p className="text-neutral-600">Silakan hubungi administrator untuk informasi lebih lanjut.</p>
        </div>
      </div>
    );
  }

  // Transform department data
  const bidang = orgData?.departments?.map((dept, index) => ({
    nama: dept.name,
    ketua: dept.head_name || 'Belum ditentukan',
    deskripsi: dept.description || '',
  })) || [];

  // Default placeholder image
  const defaultImage = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop';

  // Transform image/photo field names for API compatibility
  const transformedStruktur = {
    ketua: orgData?.ketua ? {
      nama: orgData.ketua?.name || orgData.ketua?.nama || '',
      jabatan: orgData.ketua?.position_name || 'Ketua Umum',
      image: orgData.ketua?.photo || orgData.ketua?.image || defaultImage,
    } : null,
    wakil: (orgData?.wakil || []).map((w, idx) => ({
      nama: w?.name || w?.nama || '',
      jabatan: w?.position_name || `Wakil Ketua ${idx + 1}`,
      image: w?.photo || w?.image || defaultImage,
    })),
    sekretaris: orgData?.sekretaris ? {
      nama: orgData.sekretaris?.name || orgData.sekretaris?.nama || '',
      jabatan: orgData.sekretaris?.position_name || 'Sekretaris Umum',
      image: orgData.sekretaris?.photo || orgData.sekretaris?.image || defaultImage,
    } : null,
    bendahara: orgData?.bendahara ? {
      nama: orgData.bendahara?.name || orgData.bendahara?.nama || '',
      jabatan: orgData.bendahara?.position_name || 'Bendahara Umum',
      image: orgData.bendahara?.photo || orgData.bendahara?.image || defaultImage,
    } : null,
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
              {transformedStruktur.ketua && (
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
              )}

              {/* Wakil Ketua */}
              {transformedStruktur.wakil && transformedStruktur.wakil.length > 0 && (
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
              )}

              {/* Sekretaris & Bendahara */}
              {(transformedStruktur.sekretaris || transformedStruktur.bendahara) && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {transformedStruktur.sekretaris && (
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
                  )}

                  {transformedStruktur.bendahara && (
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
                  )}
                </div>
              )}
            </div>

            {/* Bidang-Bidang */}
            {bidang && bidang.length > 0 && (
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
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
