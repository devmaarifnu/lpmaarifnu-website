'use client';

import { useState, useEffect } from 'react';
import { MapPin, Phone, Mail, Facebook, Twitter, Instagram, Youtube, ArrowUp } from 'lucide-react';
import { menuConfig } from '@/data/menu-config';
import { getSettings } from '@/lib/api';

/**
 * Footer Component
 */
export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [settings, setSettings] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const data = await getSettings();
        setSettings(data);
      } catch (error) {
        console.error('Error fetching settings:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSettings();
  }, []);

  // Only use API data
  const contact = settings?.contact || {};
  const socialMedia = settings?.social_media || {};
  const siteName = settings?.site_name || 'LP Ma\'arif NU PBNU';
  const siteDescription = settings?.site_description || '';
  const logo = settings?.logo;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Show loading skeleton
  if (isLoading || !settings) {
    return (
      <footer className="bg-neutral-900 text-neutral-300">
        <div className="container mx-auto py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="space-y-4">
                <div className="h-6 bg-neutral-800 rounded animate-pulse w-32"></div>
                <div className="h-4 bg-neutral-800 rounded animate-pulse"></div>
                <div className="h-4 bg-neutral-800 rounded animate-pulse w-3/4"></div>
              </div>
            ))}
          </div>
        </div>
        <div className="border-t border-neutral-800">
          <div className="container mx-auto py-6">
            <div className="h-4 bg-neutral-800 rounded animate-pulse w-64"></div>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="bg-neutral-900 text-neutral-300">
      {/* Main Footer Content */}
      <div className="container mx-auto py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {/* Column 1: About */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              {logo ? (
                <div className="w-12 h-12 flex items-center justify-center">
                  <img
                    src={logo}
                    alt={siteName}
                    className="w-full h-full object-contain"
                  />
                </div>
              ) : (
                <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-xl">LP</span>
                </div>
              )}
              <div className="flex flex-col">
                <span className="font-bold text-white text-lg">
                  {siteName}
                </span>
              </div>
            </div>
            {siteDescription && (
              <p className="text-sm text-neutral-400 leading-relaxed">
                {siteDescription}
              </p>
            )}
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4 font-poppins">
              Link Cepat
            </h3>
            <ul className="space-y-2">
              {menuConfig.slice(0, 6).map((item, idx) => (
                <li key={idx}>
                  <a
                    href={item.href || '#'}
                    className="text-sm text-neutral-400 hover:text-primary-400 transition-colors duration-200"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4 font-poppins">
              Kontak Kami
            </h3>
            <ul className="space-y-3">
              {contact.address && (
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary-400 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-neutral-400">
                    {contact.address}
                  </span>
                </li>
              )}
              {contact.phone && (
                <li className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-primary-400 flex-shrink-0" />
                  <a
                    href={`tel:${contact.phone.replace(/\s/g, '')}`}
                    className="text-sm text-neutral-400 hover:text-primary-400 transition-colors"
                  >
                    {contact.phone}
                  </a>
                </li>
              )}
              {contact.email && (
                <li className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-primary-400 flex-shrink-0" />
                  <a
                    href={`mailto:${contact.email}`}
                    className="text-sm text-neutral-400 hover:text-primary-400 transition-colors"
                  >
                    {contact.email}
                  </a>
                </li>
              )}
            </ul>
          </div>

          {/* Column 4: Social Media */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4 font-poppins">
              Media Sosial
            </h3>
            <p className="text-sm text-neutral-400 mb-4">
              Ikuti kami di media sosial untuk mendapatkan informasi terbaru
            </p>
            <div className="flex gap-3">
              {socialMedia.facebook && (
                <a
                  href={socialMedia.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-neutral-800 rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors duration-200"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </a>
              )}
              {socialMedia.twitter && (
                <a
                  href={socialMedia.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-neutral-800 rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors duration-200"
                  aria-label="Twitter"
                >
                  <Twitter className="w-5 h-5" />
                </a>
              )}
              {socialMedia.instagram && (
                <a
                  href={socialMedia.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-neutral-800 rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors duration-200"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
              )}
              {socialMedia.youtube && (
                <a
                  href={socialMedia.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-neutral-800 rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors duration-200"
                  aria-label="YouTube"
                >
                  <Youtube className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-neutral-800">
        <div className="container mx-auto py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-neutral-400 text-center md:text-left">
              &copy; {currentYear} {siteName}. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <a
                href="/kebijakan-privasi"
                className="text-sm text-neutral-400 hover:text-primary-400 transition-colors"
              >
                Kebijakan Privasi
              </a>
              <a
                href="/syarat-ketentuan"
                className="text-sm text-neutral-400 hover:text-primary-400 transition-colors"
              >
                Syarat & Ketentuan
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 w-12 h-12 bg-primary-600 text-white rounded-full shadow-lg hover:bg-primary-700 transition-all duration-200 flex items-center justify-center z-40 hover:scale-110"
        aria-label="Back to top"
      >
        <ArrowUp className="w-6 h-6" />
      </button>
    </footer>
  );
}
