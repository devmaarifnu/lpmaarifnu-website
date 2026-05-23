import ContactForm from '@/components/contact/ContactForm';
import ContactInfo from '@/components/contact/ContactInfo';
import { getSettings } from '@/lib/api';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export const metadata = {
  title: 'Kontak',
  description: 'Hubungi LP Ma\'arif NU untuk informasi lebih lanjut mengenai pendidikan Islam di Indonesia.',
};

// Force dynamic rendering to always fetch fresh data from API at runtime
export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const fetchCache = 'force-no-store';
export const runtime = 'nodejs';

export default async function KontakPage() {
  // Fetch settings for contact information from API
  let settings = null;

  try {
    settings = await getSettings();
  } catch (error) {
    console.error('Error fetching settings:', error);
    // If API fails, settings will be null and we'll show appropriate fallback UI
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-600 via-primary-500 to-green-500 text-white py-16 md:py-20">
        {/* Batik Pattern Background */}
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="batik-contact" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
                <circle cx="50" cy="50" r="30" fill="none" stroke="white" strokeWidth="2" />
                <circle cx="50" cy="50" r="20" fill="none" stroke="white" strokeWidth="1.5" />
                <circle cx="150" cy="150" r="30" fill="none" stroke="white" strokeWidth="2" />
                <circle cx="150" cy="150" r="20" fill="none" stroke="white" strokeWidth="1.5" />
                <path d="M 0 100 Q 50 80 100 100 T 200 100" fill="none" stroke="white" strokeWidth="1.5" />
                <path d="M 100 0 Q 120 50 100 100 T 100 200" fill="none" stroke="white" strokeWidth="1.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#batik-contact)" />
          </svg>
        </div>

        <div className="container mx-auto relative z-10">
          <div className="max-w-3xl">
            <h1 className="font-bold mb-4" style={{ fontSize: 'clamp(1.5rem, 5vw, 2.25rem)' }}>
              Hubungi Kami
            </h1>
            <p className="text-lg md:text-xl text-primary-50">
              Kami siap membantu Anda. Jangan ragu untuk menghubungi kami untuk informasi lebih lanjut tentang pendidikan Islam dan layanan LP Ma&apos;arif NU.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Information - Left Side */}
            <div className="lg:col-span-1 space-y-6">
              {settings ? (
                <ContactInfo settings={settings} />
              ) : (
                <div className="bg-white rounded-lg shadow-md p-6">
                  <p className="text-neutral-600">Gagal memuat informasi kontak. Silakan coba lagi nanti.</p>
                </div>
              )}
            </div>

            {/* Contact Form - Right Side */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-neutral-900 mb-2">
                    Kirim Pesan
                  </h2>
                  <p className="text-neutral-600">
                    Isi formulir di bawah ini dan kami akan segera merespons pesan Anda.
                  </p>
                </div>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto">
          <div className="mb-8">
            <h2 className="font-bold text-neutral-900 mb-2" style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)' }}>
              Lokasi Kami
            </h2>
            <p className="text-neutral-600">
              Kunjungi kantor kami untuk konsultasi langsung
            </p>
          </div>

          {/* Google Maps Embed */}
          <div className="rounded-lg overflow-hidden shadow-lg">
            <div className="w-full h-96 bg-neutral-200 relative">
              {settings?.contact?.maps_embed ? (
                <iframe
                  src={settings.contact.maps_embed}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Lokasi LP Ma'arif NU"
                ></iframe>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <MapPin className="w-16 h-16 text-neutral-400 mx-auto mb-4" />
                    <p className="text-neutral-500">{settings ? 'Map will be displayed here' : 'Gagal memuat peta'}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Office Hours Section */}
      {settings?.contact?.office_hours && (
        <section className="py-12 md:py-16 bg-neutral-50">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
                <div className="flex items-start gap-4 mb-6">
                  <div className="bg-primary-100 p-3 rounded-lg">
                    <Clock className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h2 className="font-bold text-neutral-900 mb-2" style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)' }}>
                      Jam Operasional
                    </h2>
                    <p className="text-neutral-600">
                      Kantor kami buka pada jam kerja berikut
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-neutral-50 rounded-lg">
                    <div className="font-semibold text-neutral-900 mb-2">
                      Senin - Kamis
                    </div>
                    <div className="text-neutral-600">
                      {settings.contact?.office_hours?.weekdays}
                    </div>
                  </div>
                  <div className="p-4 bg-neutral-50 rounded-lg">
                    <div className="font-semibold text-neutral-900 mb-2">
                      Jumat
                    </div>
                    <div className="text-neutral-600">
                      {settings.contact?.office_hours?.friday}
                    </div>
                  </div>
                  <div className="p-4 bg-neutral-50 rounded-lg">
                    <div className="font-semibold text-neutral-900 mb-2">
                      Sabtu
                    </div>
                    <div className="text-neutral-600">
                      {settings.contact?.office_hours?.saturday}
                    </div>
                  </div>
                  <div className="p-4 bg-neutral-50 rounded-lg">
                    <div className="font-semibold text-neutral-900 mb-2">
                      Minggu & Hari Libur
                    </div>
                    <div className="text-neutral-600">
                      {settings.contact?.office_hours?.sunday}
                    </div>
                  </div>
                </div>

                {settings.contact?.office_notes && (
                  <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                    <p className="text-sm text-amber-800">
                      <strong>Catatan:</strong> {settings.contact.office_notes}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
