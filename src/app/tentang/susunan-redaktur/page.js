import Image from 'next/image';
import { Mail, Phone, Newspaper, Users, PenTool } from 'lucide-react';
import BatikPattern from '@/components/shared/BatikPattern';
import { getEditorialTeam } from '@/lib/api';

export const metadata = {
  title: 'Susunan Redaktur',
  description: 'Susunan tim redaksi website dan publikasi LP Ma\'arif NU',
};

export default async function SusunanRedakturPage() {
  // Fetch editorial team from API
  let editorial = null;

  try {
    editorial = await getEditorialTeam();
  } catch (error) {
    console.error('Error fetching editorial team:', error);
  }

  if (!editorial) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-center">
          <Newspaper className="w-16 h-16 text-neutral-400 mx-auto mb-4" />
          <p className="text-neutral-600">Gagal memuat data tim redaksi. Silakan coba lagi nanti.</p>
        </div>
      </div>
    );
  }

  const CompactCard = ({ person, position, photo, name }) => {
    const displayName = name || person?.name || '';
    const displayPosition = position || person?.position || '';
    const displayPhoto = photo || person?.photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=1a6b3a&color=fff&size=400`;
    return (
      <div className="bg-white rounded-lg shadow-sm border border-primary-100 p-3 flex flex-col items-center text-center min-w-[130px] max-w-[170px]">
        <div className="w-14 h-14 relative rounded-full overflow-hidden border-2 border-primary-500 mb-2 flex-shrink-0">
          <Image src={displayPhoto} alt={displayName} fill className="object-cover" />
        </div>
        <p className="text-xs font-bold text-neutral-900 leading-tight mb-0.5">{displayName}</p>
        <p className="text-[11px] text-primary-600 font-semibold leading-tight">{displayPosition}</p>
      </div>
    );
  };

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
      {editorial.pemimpin_redaksi && (
        <section className="py-16 md:py-20 bg-white">
          <div className="container mx-auto">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-10">
                <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
                  Pimpinan Redaksi
                </h2>
              </div>

              <div className="flex flex-col items-center">
                {/* Pemimpin Redaksi */}
                <CompactCard
                  name={editorial.pemimpin_redaksi.name}
                  position={editorial.pemimpin_redaksi.position}
                  photo={editorial.pemimpin_redaksi.photo}
                />

                {/* Arrow to Wakil */}
                {editorial.wakil_pemimpin_redaksi?.length > 0 && <Arrow />}

                {/* Wakil Pemimpin Redaksi */}
                {editorial.wakil_pemimpin_redaksi?.length > 0 && (
                  <div className="flex flex-col items-center w-full">
                    <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-3">Wakil Pemimpin Redaksi</p>
                    <div className="flex flex-wrap justify-center gap-3">
                      {editorial.wakil_pemimpin_redaksi.map((wakil, index) => (
                        <CompactCard
                          key={index}
                          name={wakil.name}
                          position={wakil.position}
                          photo={wakil.photo}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Arrow to Redaktur Pelaksana */}
                {editorial.redaktur_pelaksana && <Arrow />}

                {/* Redaktur Pelaksana */}
                {editorial.redaktur_pelaksana && (
                  <div className="flex flex-col items-center">
                    <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-3">Redaktur Pelaksana</p>
                    <CompactCard
                      name={editorial.redaktur_pelaksana.name}
                      position={editorial.redaktur_pelaksana.position}
                      photo={editorial.redaktur_pelaksana.photo}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Dewan Redaksi */}
      {editorial.dewan_redaksi && editorial.dewan_redaksi.length > 0 && (
        <section className="py-12 bg-neutral-50">
          <div className="container mx-auto">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-6">
                <div className="inline-flex items-center gap-2 mb-2">
                  <Users className="w-5 h-5 text-primary-600" />
                  <h2 className="text-xl font-bold text-neutral-900">
                    Dewan Redaksi
                  </h2>
                </div>
                <p className="text-xs text-neutral-600 max-w-2xl mx-auto">
                  Para pakar dan akademisi yang memberikan arahan editorial dan menjaga kualitas konten
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {editorial.dewan_redaksi.map((dewan, index) => (
                  <div
                    key={dewan.id || index}
                    className="bg-white rounded-lg shadow-sm border border-primary-100 p-3 flex items-start gap-3"
                  >
                    <div className="relative w-14 h-14 flex-shrink-0 rounded-full overflow-hidden border-2 border-primary-300">
                      <Image
                        src={dewan.photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(dewan.name)}&background=0891B2&color=fff&size=400`}
                        alt={dewan.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-neutral-900 leading-tight mb-0.5">
                        {dewan.name}
                      </h4>
                      {dewan.institution && (
                        <p className="text-primary-600 text-[11px] font-semibold leading-tight mb-0.5">
                          {dewan.institution}
                        </p>
                      )}
                      {dewan.expertise && (
                        <p className="text-neutral-600 text-[11px] leading-tight">
                          <span className="font-medium">Keahlian:</span> {dewan.expertise}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Tim Redaksi */}
      {editorial.tim_redaksi && editorial.tim_redaksi.length > 0 && (
        <section className="py-12 bg-white">
          <div className="container mx-auto">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-6">
                <div className="inline-flex items-center gap-2 mb-2">
                  <PenTool className="w-5 h-5 text-primary-600" />
                  <h2 className="text-xl font-bold text-neutral-900">
                    Tim Redaksi
                  </h2>
                </div>
                <p className="text-xs text-neutral-600 max-w-2xl mx-auto">
                  Tim profesional yang bekerja setiap hari untuk menghadirkan konten berkualitas
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {editorial.tim_redaksi.map((tim, index) => (
                  <div
                    key={tim.id || index}
                    className="bg-white rounded-lg shadow-sm border border-primary-100 p-3 flex flex-col items-center text-center"
                  >
                    <div className="relative w-14 h-14 mx-auto mb-2 rounded-full overflow-hidden border-2 border-primary-300">
                      <Image
                        src={tim.photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(tim.name)}&background=6366F1&color=fff&size=400`}
                        alt={tim.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <h4 className="text-xs font-bold text-neutral-900 leading-tight mb-0.5">
                      {tim.name}
                    </h4>
                    <p className="text-primary-600 text-[11px] font-semibold leading-tight">
                      {tim.position}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Contact Section */}
      {editorial.contact && (
        <section className="py-16 bg-primary-600 text-white">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Hubungi Redaksi
            </h2>
            <p className="text-lg text-primary-100 mb-8 max-w-2xl mx-auto">
              Untuk informasi, kritik, atau saran terkait konten website LP Ma&apos;arif NU
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              {editorial.contact.email && (
                <a
                  href={`mailto:${editorial.contact.email}`}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white text-primary-600 rounded-lg hover:bg-primary-50 transition-colors font-semibold"
                >
                  <Mail className="w-5 h-5" />
                  {editorial.contact.email}
                </a>
              )}
              {editorial.contact.phone && (
                <a
                  href={`tel:${editorial.contact.phone}`}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary-700 text-white rounded-lg hover:bg-primary-800 transition-colors font-semibold border-2 border-white"
                >
                  <Phone className="w-5 h-5" />
                  {editorial.contact.phone}
                </a>
              )}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
