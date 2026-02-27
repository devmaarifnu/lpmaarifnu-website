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
                        src={editorial.pemimpin_redaksi.photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(editorial.pemimpin_redaksi.name)}&background=059669&color=fff&size=400`}
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
                        {editorial.pemimpin_redaksi.position}
                      </p>
                      {editorial.pemimpin_redaksi.bio && (
                        <p className="text-neutral-700 mb-4 leading-relaxed">
                          {editorial.pemimpin_redaksi.bio}
                        </p>
                      )}

                      <div className="space-y-2">
                        {editorial.pemimpin_redaksi.email && (
                          <div className="flex items-center gap-2 text-neutral-600 justify-center md:justify-start">
                            <Mail className="w-4 h-4" />
                            <a href={`mailto:${editorial.pemimpin_redaksi.email}`} className="hover:text-primary-600 transition-colors">
                              {editorial.pemimpin_redaksi.email}
                            </a>
                          </div>
                        )}
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
              {editorial.wakil_pemimpin_redaksi && editorial.wakil_pemimpin_redaksi.length > 0 && (
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
                              src={wakil.photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(wakil.name)}&background=7C3AED&color=fff&size=400`}
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
                              {wakil.position}
                            </p>
                            {wakil.bio && (
                              <p className="text-neutral-600 text-sm mb-2">
                                {wakil.bio}
                              </p>
                            )}
                            {wakil.email && (
                              <div className="flex items-center gap-2 text-neutral-500 text-sm">
                                <Mail className="w-3 h-3" />
                                <a href={`mailto:${wakil.email}`} className="hover:text-primary-600 transition-colors">
                                  {wakil.email}
                                </a>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Redaktur Pelaksana */}
              {editorial.redaktur_pelaksana && (
                <div className="bg-neutral-100 rounded-xl p-8 mb-12">
                  <h3 className="text-2xl font-bold text-neutral-900 mb-6 text-center">
                    Redaktur Pelaksana
                  </h3>
                  <div className="flex flex-col md:flex-row items-center md:items-start gap-6 max-w-3xl mx-auto">
                    <div className="relative w-32 h-32 flex-shrink-0 rounded-full overflow-hidden border-4 border-primary-500">
                      <Image
                        src={editorial.redaktur_pelaksana.photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(editorial.redaktur_pelaksana.name)}&background=2563EB&color=fff&size=400`}
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
                        {editorial.redaktur_pelaksana.position}
                      </p>
                      {editorial.redaktur_pelaksana.bio && (
                        <p className="text-neutral-700 mb-3">
                          {editorial.redaktur_pelaksana.bio}
                        </p>
                      )}
                      {editorial.redaktur_pelaksana.email && (
                        <div className="flex items-center gap-2 text-neutral-600 justify-center md:justify-start">
                          <Mail className="w-4 h-4" />
                          <a href={`mailto:${editorial.redaktur_pelaksana.email}`} className="hover:text-primary-600 transition-colors">
                            {editorial.redaktur_pelaksana.email}
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Dewan Redaksi */}
      {editorial.dewan_redaksi && editorial.dewan_redaksi.length > 0 && (
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
                    key={dewan.id || index}
                    className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all p-6 border border-neutral-200"
                  >
                    <div className="flex items-start gap-4">
                      <div className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden">
                        <Image
                          src={dewan.photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(dewan.name)}&background=0891B2&color=fff&size=400`}
                          alt={dewan.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-bold text-neutral-900 mb-1">
                          {dewan.name}
                        </h4>
                        {dewan.institution && (
                          <p className="text-primary-600 text-sm font-semibold mb-1">
                            {dewan.institution}
                          </p>
                        )}
                        {dewan.expertise && (
                          <p className="text-neutral-600 text-sm">
                            <span className="font-medium">Keahlian:</span> {dewan.expertise}
                          </p>
                        )}
                      </div>
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
                    key={tim.id || index}
                    className="bg-neutral-50 rounded-xl shadow-sm hover:shadow-md transition-all p-6 text-center border border-neutral-200"
                  >
                    <div className="relative w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-2 border-primary-300">
                      <Image
                        src={tim.photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(tim.name)}&background=6366F1&color=fff&size=400`}
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
