import { MapPin, Phone, Mail, Globe, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

export default function ContactInfo({ settings }) {
  const contact = settings?.contact || {};
  const socialMedia = settings?.social_media || {};

  // Build contact items array - hanya tampilkan item yang ada datanya
  const contactItems = [
    contact.address && {
      icon: MapPin,
      label: 'Alamat',
      value: contact.address,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    contact.phone && {
      icon: Phone,
      label: 'Telepon',
      value: contact.phone,
      href: `tel:${contact.phone.replace(/\D/g, '')}`,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    contact.email && {
      icon: Mail,
      label: 'Email',
      value: contact.email,
      href: `mailto:${contact.email}`,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
    },
    contact.website && {
      icon: Globe,
      label: 'Website',
      value: contact.website,
      href: contact.website.startsWith('http') ? contact.website : `https://${contact.website}`,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
  ].filter(Boolean); // Filter out undefined/null items

  // Build social media items array - hanya tampilkan item yang ada datanya
  const socialMediaItems = [
    socialMedia.facebook && {
      icon: Facebook,
      name: 'Facebook',
      url: socialMedia.facebook,
      color: 'hover:bg-blue-600',
    },
    socialMedia.twitter && {
      icon: Twitter,
      name: 'Twitter',
      url: socialMedia.twitter,
      color: 'hover:bg-sky-500',
    },
    socialMedia.instagram && {
      icon: Instagram,
      name: 'Instagram',
      url: socialMedia.instagram,
      color: 'hover:bg-pink-600',
    },
    socialMedia.youtube && {
      icon: Youtube,
      name: 'YouTube',
      url: socialMedia.youtube,
      color: 'hover:bg-red-600',
    },
  ].filter(Boolean); // Filter out undefined/null items

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
      </div>
    </div>
  );
}
