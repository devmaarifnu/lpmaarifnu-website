import Image from 'next/image';
import BatikPattern from '@/components/shared/BatikPattern';
import { getOrganizationStructure } from '@/lib/api';

export const metadata = {
  title: 'Susunan Pengurus',
  description: 'Susunan pengurus LP Ma\'arif NU PBNU',
};

export default async function SusunanPengurusPage() {
  // Fetch organization structure from API
  const orgData = await getOrganizationStructure();
  console.log('Fetched organization structure:', orgData);

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

  // Default placeholder image using ui-avatars
  const defaultImage = (name) =>
    `https://ui-avatars.com/api/?name=${encodeURIComponent(name || 'Unknown')}&background=1a6b3a&color=fff&size=400`;

  // Helper to build a single person card object
  const transformPerson = (person, fallbackJabatan) => {
    if (!person) return null;
    const nama = person.name || person.nama || '';
    return {
      nama,
      jabatan: person.position_name || fallbackJabatan,
      image: person.photo || person.image || defaultImage(nama),
    };
  };

  // Helper to build an array of person card objects
  const transformPersonArray = (arr, fallbackJabatan) =>
    (arr || []).map((p, idx) => {
      const nama = p?.name || p?.nama || '';
      return {
        nama,
        jabatan: p?.position_name || `${fallbackJabatan} ${idx + 1}`,
        image: p?.photo || p?.image || defaultImage(nama),
      };
    });

  // Transform pimpinan data
  const transformedStruktur = {
    ketua: transformPerson(orgData?.ketua, 'Ketua Umum'),
    wakil_ketua: transformPersonArray(orgData?.wakil_ketua, 'Wakil Ketua'),
    sekretaris: transformPerson(orgData?.sekretaris, 'Sekretaris Umum'),
    wakil_sekretaris: transformPersonArray(orgData?.wakil_sekretaris, 'Wakil Sekretaris'),
    bendahara: transformPerson(orgData?.bendahara, 'Bendahara Umum'),
    wakil_bendahara: transformPersonArray(orgData?.wakil_bendahara, 'Wakil Bendahara'),
  };

  // Transform department data — members list, no head_name
  const bidang = (orgData?.departments || []).map((dept) => ({
    id: dept.id,
    nama: dept.name,
    members: (dept.members || []).slice().sort((a, b) => (a.order_number ?? 0) - (b.order_number ?? 0)),
  }));

  // Reusable person card component (inline)
  const PersonCard = ({ person, sizeLg = false }) => (
    <div className={`bg-white rounded-xl shadow-lg ${sizeLg ? 'p-8' : 'p-6'} text-center`}>
      <div
        className={`${sizeLg ? 'w-32 h-32' : 'w-24 h-24'} mx-auto mb-4 relative rounded-full overflow-hidden border-4 border-primary-600`}
      >
        <Image
          src={person.image}
          alt={person.nama}
          fill
          className="object-cover"
        />
      </div>
      <h3 className={`${sizeLg ? 'text-xl' : 'text-lg'} font-bold text-neutral-900 mb-1`}>
        {person.nama}
      </h3>
      <p className="text-primary-600 font-semibold">
        {person.jabatan}
      </p>
    </div>
  );

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
            Susunan kepemimpinan dan pengurus LP Ma&apos;arif NU PBNU
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

              {/* Ketua */}
              {transformedStruktur.ketua && (
                <div className="mb-10">
                  <h3 className="text-xl font-semibold text-center text-neutral-700 mb-6">Ketua</h3>
                  <div className="flex justify-center">
                    <div className="max-w-md w-full">
                      <PersonCard person={transformedStruktur.ketua} sizeLg={true} />
                    </div>
                  </div>
                </div>
              )}

              {/* Wakil Ketua */}
              {transformedStruktur.wakil_ketua.length > 0 && (
                <div className="mb-10">
                  <h3 className="text-xl font-semibold text-center text-neutral-700 mb-6">Wakil Ketua</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {transformedStruktur.wakil_ketua.map((item, index) => (
                      <PersonCard key={index} person={item} />
                    ))}
                  </div>
                </div>
              )}

              {/* Sekretariat */}
              {(transformedStruktur.sekretaris || transformedStruktur.wakil_sekretaris.length > 0) && (
                <div className="mb-10">
                  <h3 className="text-xl font-semibold text-center text-neutral-700 mb-6">Sekretariat</h3>
                  {transformedStruktur.sekretaris && (
                    <div className="flex justify-center mb-6">
                      <div className="max-w-sm w-full">
                        <PersonCard person={transformedStruktur.sekretaris} />
                      </div>
                    </div>
                  )}
                  {transformedStruktur.wakil_sekretaris.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {transformedStruktur.wakil_sekretaris.map((item, index) => (
                        <PersonCard key={index} person={item} />
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Keuangan */}
              {(transformedStruktur.bendahara || transformedStruktur.wakil_bendahara.length > 0) && (
                <div className="mb-10">
                  <h3 className="text-xl font-semibold text-center text-neutral-700 mb-6">Keuangan</h3>
                  {transformedStruktur.bendahara && (
                    <div className="flex justify-center mb-6">
                      <div className="max-w-sm w-full">
                        <PersonCard person={transformedStruktur.bendahara} />
                      </div>
                    </div>
                  )}
                  {transformedStruktur.wakil_bendahara.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {transformedStruktur.wakil_bendahara.map((item, index) => (
                        <PersonCard key={index} person={item} />
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Bidang-Bidang */}
            {bidang.length > 0 && (
              <div>
                <h2 className="text-3xl font-bold text-center text-neutral-900 mb-12">
                  Bidang-Bidang
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {bidang.map((item, index) => (
                    <div
                      key={item.id ?? index}
                      className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow"
                    >
                      <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                        <span className="text-xl font-bold text-primary-600">
                          {index + 1}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-neutral-900 mb-3">
                        {item.nama}
                      </h3>
                      {item.members.length > 0 && (
                        <ul className="space-y-1">
                          {item.members.map((member, mIdx) => (
                            <li key={mIdx} className="text-sm text-neutral-700 flex items-start gap-2">
                              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary-400 flex-shrink-0" />
                              {member.name}
                            </li>
                          ))}
                        </ul>
                      )}
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
