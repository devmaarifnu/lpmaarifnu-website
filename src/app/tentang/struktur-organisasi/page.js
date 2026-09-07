import BatikPattern from '@/components/shared/BatikPattern';
import OrgChart from '@/components/organization/OrgChart';

export const metadata = {
  title: 'Struktur Organisasi',
  description: 'Struktur organisasi hierarki LP Ma\'arif NU dari PBNU hingga Satuan Pendidikan',
};

export default function StrukturOrganisasiPage() {
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
            Hierarki organisasi LP Ma&apos;arif NU dari tingkat pusat hingga satuan pendidikan
          </p>
        </div>
      </section>

      {/* Organization Chart Section */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8 md:p-12">
            <div className="mb-8 text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-4">
                Bagan Struktur Organisasi
              </h2>
              <p className="text-neutral-600 max-w-3xl mx-auto">
                Struktur organisasi LP Ma&apos;arif NU menunjukkan hierarki dari Pengurus Besar Nahdlatul Ulama (PBNU)
                hingga ke tingkat satuan pendidikan di seluruh Indonesia.
              </p>
            </div>

            {/* Organization Chart */}
            <OrgChart />
          </div>
        </div>
      </section>

      {/* Information Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-neutral-900 mb-6 text-center">
              Penjelasan Struktur
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-neutral-50 rounded-lg p-6">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white font-bold text-sm">1</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-neutral-900 mb-2">PBNU</h3>
                    <p className="text-sm text-neutral-600">
                      Pengurus Besar Nahdlatul Ulama sebagai induk organisasi di tingkat nasional.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-neutral-50 rounded-lg p-6">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white font-bold text-sm">2</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-neutral-900 mb-2">LP Ma&apos;arif NU PBNU</h3>
                    <p className="text-sm text-neutral-600">
                      Lembaga Pendidikan Ma&apos;arif NU di tingkat pusat yang membawahi seluruh kegiatan pendidikan.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-neutral-50 rounded-lg p-6">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white font-bold text-sm">3</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-neutral-900 mb-2">PWNU & LP Ma&apos;arif NU PWNU</h3>
                    <p className="text-sm text-neutral-600">
                      Pengurus Wilayah NU dan LP Ma&apos;arif NU di tingkat provinsi.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-neutral-50 rounded-lg p-6">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white font-bold text-sm">4</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-neutral-900 mb-2">PCNU & LP Ma&apos;arif NU PCNU</h3>
                    <p className="text-sm text-neutral-600">
                      Pengurus Cabang NU dan LP Ma&apos;arif NU di tingkat kabupaten/kota.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-neutral-50 rounded-lg p-6 md:col-span-2">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white font-bold text-sm">5</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-neutral-900 mb-2">Satuan Pendidikan</h3>
                    <p className="text-sm text-neutral-600">
                      Sekolah dan madrasah di bawah naungan LP Ma&apos;arif NU yang tersebar di seluruh Indonesia,
                      meliputi PAUD, RA, MI, MTs, MA, SMK, dan Pesantren.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
