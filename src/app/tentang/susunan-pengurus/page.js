import Image from 'next/image';
import BatikPattern from '@/components/shared/BatikPattern';
import { getOrganizationBoardMembers, getOrganizationStructure } from '@/lib/api';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Susunan Pengurus',
  description: 'Susunan pengurus LP Ma\'arif NU PBNU',
};

export default async function SusunanPengurusPage() {
  // Fetch organization structure from API
  const [orgData, boardData] = await Promise.all([
    getOrganizationStructure(),
    getOrganizationBoardMembers(),
  ]);

  // Default placeholder image using ui-avatars
  const defaultImage = (name) =>
    `https://ui-avatars.com/api/?name=${encodeURIComponent(name || 'Unknown')}&background=1a6b3a&color=fff&size=400`;

  // Position metadata can be embedded in a person or returned as a separate catalog.
  const boardMemberList = Array.isArray(boardData)
    ? boardData
    : boardData?.board_members || boardData?.members || boardData?.pengurus || [];
  const boardMembers = Array.isArray(boardMemberList)
    ? boardMemberList
    : boardMemberList ? [boardMemberList] : [];

  if (!orgData && boardMembers.length === 0) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-neutral-900 mb-4">Data tidak tersedia</h2>
          <p className="text-neutral-600">Silakan hubungi administrator untuk informasi lebih lanjut.</p>
        </div>
      </div>
    );
  }

  const positionCatalog = [
    ...(orgData?.positions || []),
    ...(orgData?.organization_positions || []),
    ...(orgData?.organizationPositions || []),
    ...(boardData?.positions || []),
    ...(boardData?.organization_positions || []),
    ...(boardData?.organizationPositions || []),
  ];

  const getPositionData = (person) => {
    const embeddedPosition = typeof person?.position === 'object' ? person.position : null;
    const positionId = person?.position_id ?? embeddedPosition?.id;
    return person?.organization_position || embeddedPosition ||
      positionCatalog.find((position) => String(position.id) === String(positionId)) || {};
  };

  // Accept the current position catalog fields and the older API fields.
  const getPositionName = (person, fallback) => {
    const positionData = getPositionData(person);
    return person?.position_name || positionData.position_name ||
      (typeof person?.position === 'string' ? person.position : '') || person?.jabatan || fallback;
  };

  const sortByOrderNumber = (people) =>
    [...(people || [])].sort((a, b) => {
      const aOrder = a?.order_number ?? getPositionData(a).order_number ?? 0;
      const bOrder = b?.order_number ?? getPositionData(b).order_number ?? 0;
      return aOrder - bOrder;
    });

  const collectPeople = (value, inheritedPosition = null) => {
    if (Array.isArray(value)) return value.flatMap((item) => collectPeople(item, inheritedPosition));
    if (!value || typeof value !== 'object') return [];
    const currentPosition = value.position_type || value.position_name ? value : inheritedPosition;
    const person = value.name || value.nama
      ? { ...value, organization_position: value.organization_position || currentPosition }
      : null;
    return [
      ...(person ? [person] : []),
      ...Object.values(value).flatMap((child) => collectPeople(child, currentPosition)),
    ];
  };

  const allPeople = [...new Map(
    collectPeople([orgData, boardMembers])
      .map((person) => [person.id ?? `${person.name || person.nama}-${person.position_id ?? getPositionName(person, '')}`, person])
  ).values()];

  const getPositionType = (person) => {
    const positionData = getPositionData(person);
    const type = person?.position_type || positionData.position_type;
    if (type) return String(type).toLowerCase();
    const name = getPositionName(person, '').toLowerCase();
    if (name.includes('wakil ketua')) return 'wakil';
    if (name.includes('ketua')) return 'ketua';
    if (name.includes('sekretaris')) return 'sekretaris';
    if (name.includes('bendahara')) return 'bendahara';
    return '';
  };

  const hasParentPosition = (person) => {
    const parentId = person?.parent_id ?? getPositionData(person).parent_id;
    return parentId !== null && parentId !== undefined;
  };

  const findPeopleByPosition = (predicate) =>
    sortByOrderNumber(allPeople.filter(predicate));

  const firstPerson = (value) => Array.isArray(value) ? sortByOrderNumber(value)[0] : value;

  // Helper to build a single person card object
  const transformPerson = (person, jabatan) => {
    if (!person) return null;
    const nama = person.name || person.nama || '';
    return {
      nama,
      jabatan: getPositionName(person, jabatan),
      image: person.photo || person.image || defaultImage(nama),
    };
  };

  // Helper to build an array of person card objects
  const transformPersonArray = (arr, fallbackJabatan) =>
    sortByOrderNumber(arr).map((p) => {
      const nama = p?.name || p?.nama || '';
      const jabatan = getPositionName(p, fallbackJabatan);
      const tanpaNomor = ['Wakil Ketua', 'Wakil Sekretaris'].includes(fallbackJabatan);
      return {
        nama,
        jabatan: tanpaNomor ? jabatan.replace(/\s+(?:\d+|[IVXLCDM]+)$/i, '') : jabatan,
        image: p?.photo || p?.image || defaultImage(nama),
      };
    });

  // Transform pimpinan data
  const transformedStruktur = {
    ketua: transformPerson(
      firstPerson(orgData?.ketua || orgData?.ketua_lembaga || orgData?.ketuaLembaga || orgData?.ketua_umum) ||
        findPeopleByPosition((person) => getPositionType(person) === 'ketua' && !hasParentPosition(person))[0],
      'Ketua Lembaga'
    ),
    wakil_ketua: transformPersonArray(
      orgData?.wakil_ketua?.length ? orgData.wakil_ketua : orgData?.wakil?.length ? orgData.wakil :
        findPeopleByPosition((person) => getPositionType(person) === 'wakil' ||
          getPositionName(person, '').toLowerCase().includes('wakil ketua')),
      'Wakil Ketua'
    ),
    sekretaris: transformPerson(
      firstPerson(orgData?.sekretaris || orgData?.sekretaris_lembaga || orgData?.sekretarisLembaga || orgData?.sekretaris_umum) ||
        findPeopleByPosition((person) => getPositionType(person) === 'sekretaris' &&
          !hasParentPosition(person) && !getPositionName(person, '').toLowerCase().includes('wakil'))[0],
      'Sekretaris Lembaga'
    ),
    wakil_sekretaris: transformPersonArray(
      orgData?.wakil_sekretaris?.length ? orgData.wakil_sekretaris :
        findPeopleByPosition((person) => getPositionType(person) === 'sekretaris' &&
          (hasParentPosition(person) || getPositionName(person, '').toLowerCase().includes('wakil'))),
      'Wakil Sekretaris'
    ),
    bendahara: transformPerson(
      firstPerson(orgData?.bendahara || orgData?.bendahara_lembaga || orgData?.bendaharaLembaga || orgData?.bendahara_umum) ||
        findPeopleByPosition((person) => getPositionType(person) === 'bendahara' &&
          !hasParentPosition(person) && !getPositionName(person, '').toLowerCase().includes('wakil'))[0],
      'Bendahara Lembaga'
    ),
    wakil_bendahara: transformPersonArray(
      orgData?.wakil_bendahara?.length ? orgData.wakil_bendahara :
        findPeopleByPosition((person) => getPositionType(person) === 'bendahara' &&
          (hasParentPosition(person) || getPositionName(person, '').toLowerCase().includes('wakil'))),
      'Wakil Bendahara'
    ),
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

            {/* Ketua */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-center text-neutral-900 mb-2">Susunan Pengurus</h2>
              <p className="text-center text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-8">Masa Khidmat 2022 - 2027</p>
              
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

                {/* Arrow to Sekretaris */}
                {(transformedStruktur.sekretaris || transformedStruktur.wakil_sekretaris.length > 0) && <Arrow />}

                {/* Sekretaris */}
                {(transformedStruktur.sekretaris || transformedStruktur.wakil_sekretaris.length > 0) && (
                  <div className="w-full max-w-2xl">
                    <p className="text-center text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-3">Sekretaris</p>
                    <div className="flex flex-wrap justify-center gap-3">
                      {transformedStruktur.sekretaris && <CompactCard person={transformedStruktur.sekretaris} />}
                      {transformedStruktur.wakil_sekretaris.map((item, index) => (
                        <CompactCard key={index} person={item} />
                      ))}
                    </div>
                  </div>
                )}

                {/* Arrow to Bendahara */}
                {(transformedStruktur.bendahara || transformedStruktur.wakil_bendahara.length > 0) && <Arrow />}

                {/* Bendahara */}
                {(transformedStruktur.bendahara || transformedStruktur.wakil_bendahara.length > 0) && (
                  <div className="w-full max-w-2xl">
                    <p className="text-center text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-3">Bendahara</p>
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
                  Susunan Anggota Divisi
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
