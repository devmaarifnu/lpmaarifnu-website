import { MapPin, Phone, Mail, Globe, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

export default function ContactInfo({ settings }) {
  const contact = settings?.contact || {};
  const socialMedia = settings?.social_media || {};

  // Mock/Fallback data - akan digantikan dengan data dari API Settings
  const mockContactData = {
    address: 'Jl. Kramat Raya No. 45, Jakarta Pusat 10450, DKI Jakarta',
    phone: '(021) 3920679',
    email: 'info@lpmaarifnu.or.id',
    website: 'www.lpmaarifnu.or.id',
  };

  // Mock social media - akan digantikan dengan data dari API Settings
  const mockSocialMedia = {
    facebook: 'https://facebook.com/lpmaarifnu',
    twitter: 'https://twitter.com/lpmaarifnu',
    instagram: 'https://instagram.com/lpmaarifnu',
    youtube: 'https://youtube.com/@lpmaarifnu',
  };

  const contactItems = [
    {
      icon: MapPin,
      label: 'Alamat',
      value: contact.address || mockContactData.address,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      icon: Phone,
      label: 'Telepon',
      value: contact.phone || mockContactData.phone,
      href: (contact.phone || mockContactData.phone) ? `tel:${(contact.phone || mockContactData.phone).replace(/\D/g, '')}` : null,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      icon: Mail,
      label: 'Email',
      value: contact.email || mockContactData.email,
      href: (contact.email || mockContactData.email) ? `mailto:${contact.email || mockContactData.email}` : null,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
    },
    {
      icon: Globe,
      label: 'Website',
      value: contact.website || mockContactData.website,
      href: contact.website || `https://${mockContactData.website}`,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
  ];

  const socialMediaItems = [
    {
      icon: Facebook,
      name: 'Facebook',
      url: socialMedia.facebook || mockSocialMedia.facebook,
      color: 'hover:bg-blue-600',
    },
    {
      icon: Twitter,
      name: 'Twitter',
      url: socialMedia.twitter || mockSocialMedia.twitter,
      color: 'hover:bg-sky-500',
    },
    {
      icon: Instagram,
      name: 'Instagram',
      url: socialMedia.instagram || mockSocialMedia.instagram,
      color: 'hover:bg-pink-600',
    },
    {
      icon: Youtube,
      name: 'YouTube',
      url: socialMedia.youtube || mockSocialMedia.youtube,
      color: 'hover:bg-red-600',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Contact Cards */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-bold text-neutral-900 mb-4">
          Informasi Kontak
        </h3>
        <div className="space-y-4">
          {contactItems.map((item, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className={`${item.bgColor} p-2.5 rounded-lg flex-shrink-0`}>
                <item.icon className={`w-5 h-5 ${item.color}`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-1">
                  {item.label}
                </div>
                {item.href ? (
                  <a
                    href={item.href}
                    className="text-sm text-neutral-900 hover:text-primary-600 transition-colors break-words"
                    target={item.label === 'Website' ? '_blank' : undefined}
                    rel={item.label === 'Website' ? 'noopener noreferrer' : undefined}
                  >
                    {item.value}
                  </a>
                ) : (
                  <div className="text-sm text-neutral-900 break-words">
                    {item.value}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Social Media */}
      {socialMediaItems.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold text-neutral-900 mb-4">
            Media Sosial
          </h3>
          <div className="flex flex-wrap gap-3">
            {socialMediaItems.map((item, index) => (
              <a
                key={index}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-2 px-4 py-2.5 bg-neutral-100 text-neutral-700 rounded-lg hover:text-white transition-all duration-300 ${item.color}`}
                title={item.name}
              >
                <item.icon className="w-5 h-5" />
                <span className="text-sm font-semibold">{item.name}</span>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Quick Info */}
      <div className="bg-gradient-to-br from-primary-600 to-primary-500 rounded-lg shadow-md p-6 text-white">
        <h3 className="text-xl font-bold mb-3">
          Butuh Bantuan?
        </h3>
        <p className="text-primary-50 text-sm mb-4">
          Tim kami siap membantu Anda dengan pertanyaan atau kebutuhan informasi terkait pendidikan Islam dan layanan LP Ma&apos;arif NU.
        </p>
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
            <span>Respon cepat dalam 1x24 jam</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
            <span>Layanan profesional</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
            <span>Konsultasi gratis</span>
          </div>
        </div>
      </div>
    </div>
  );
}
