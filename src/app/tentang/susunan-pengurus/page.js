import Image from 'next/image';
import BatikPattern from '@/components/shared/BatikPattern';
import { getOrganizationStructure } from '@/lib/api';

export const dynamic = 'force-dynamic';

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

  const anggota = (orgData?.anggota || []).map((p) => p?.name || '');

  // Compact card for org-chart display
  const CompactCard = ({ person }) => (
    <div className="bg-white rounded-lg shadow-sm border border-primary-100 p-3 flex flex-col items-center text-center min-w-[130px] max-w-[160px]">
      <div className="w-14 h-14 relative rounded-full overflow-hidden border-2 border-primary-500 mb-2 flex-shrink-0">
        <Image src={person.image} alt={person.nama} fill className="object-cover" />
      </div>
      <p className="text-xs font-bold text-neutral-900 leading-tight mb-0.5">{person.nama}</p>
      <p className="text-[11px] text-primary-600 font-semibold leading-tight">{person.jabatan}</p>
    </div>
  );

  // Vertical arrow connector between hierarchy levels
  const Arrow = () => (
    <div className="flex flex-col items-center my-2">
      <div className="w-px h-5 bg-primary-300" />
      <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-t-[8px] border-l-transparent border-r-transparent border-t-primary-400" />
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
              <h2 className="text-3xl font-bold text-center text-neutral-900 mb-10">Pimpinan Utama</h2>

              <div className="flex flex-col items-center">
                {/* Ketua */}
                {transformedStruktur.ketua && (
                  <div className="flex justify-center">
                    <CompactCard person={transformedStruktur.ketua} />
                  </div>
                )}

                {/* Arrow to Wakil Ketua */}
                {transformedStruktur.wakil_ketua.length > 0 && <Arrow />}

                {/* Wakil Ketua */}
                {transformedStruktur.wakil_ketua.length > 0 && (
                  <div className="flex flex-wrap justify-center gap-3">
                    {transformedStruktur.wakil_ketua.map((item, index) => (
                      <CompactCard key={index} person={item} />
                    ))}
                  </div>
                )}

                {/* Arrow to Sekretariat */}
                {(transformedStruktur.sekretaris || transformedStruktur.wakil_sekretaris.length > 0) && <Arrow />}

                {/* Sekretariat */}
                {(transformedStruktur.sekretaris || transformedStruktur.wakil_sekretaris.length > 0) && (
                  <div className="w-full max-w-2xl">
                    <p className="text-center text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-3">Sekretariat</p>
                    <div className="flex flex-wrap justify-center gap-3">
                      {transformedStruktur.sekretaris && <CompactCard person={transformedStruktur.sekretaris} />}
                      {transformedStruktur.wakil_sekretaris.map((item, index) => (
                        <CompactCard key={index} person={item} />
                      ))}
                    </div>
                  </div>
                )}

                {/* Arrow to Keuangan */}
                {(transformedStruktur.bendahara || transformedStruktur.wakil_bendahara.length > 0) && <Arrow />}

                {/* Keuangan */}
                {(transformedStruktur.bendahara || transformedStruktur.wakil_bendahara.length > 0) && (
                  <div className="w-full max-w-2xl">
                    <p className="text-center text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-3">Keuangan</p>
                    <div className="flex flex-wrap justify-center gap-3">
                      {transformedStruktur.bendahara && <CompactCard person={transformedStruktur.bendahara} />}
                      {transformedStruktur.wakil_bendahara.map((item, index) => (
                        <CompactCard key={index} person={item} />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Anggota */}
            {anggota.length > 0 && (
              <div className="mt-16">
                <h2 className="text-xl font-bold text-center text-neutral-900 mb-6">
                  Anggota
                </h2>
                <div className="bg-white rounded-xl shadow-sm border border-primary-100 p-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {anggota.map((nama, index) => (
                      <div key={index} className="flex items-center gap-2 p-2 rounded-lg bg-neutral-50">
                        <span className="w-5 h-5 rounded-full bg-primary-100 text-primary-700 font-bold text-[11px] flex items-center justify-center flex-shrink-0">
                          {index + 1}
                        </span>
                        <span className="text-xs text-neutral-800 font-medium leading-tight">{nama}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Bidang-Bidang */}
            {bidang.length > 0 && (
              <div className="mt-16">
                <h2 className="text-xl font-bold text-center text-neutral-900 mb-6">
                  Bidang-Bidang
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {bidang.map((item, index) => (
                    <div
                      key={item.id ?? index}
                      className="bg-white rounded-lg shadow-sm border border-primary-100 p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="w-8 h-8 bg-primary-100 rounded-md flex items-center justify-center mb-3">
                        <span className="text-sm font-bold text-primary-600">
                          {index + 1}
                        </span>
                      </div>
                      <h3 className="text-xs font-bold text-neutral-900 mb-2">
                        {item.nama}
                      </h3>
                      {item.members.length > 0 && (
                        <ul className="space-y-0.5">
                          {item.members.map((member, mIdx) => (
                            <li key={mIdx} className="text-[11px] text-neutral-700 flex items-start gap-1.5">
                              <span className="mt-1 w-1 h-1 rounded-full bg-primary-400 flex-shrink-0" />
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
