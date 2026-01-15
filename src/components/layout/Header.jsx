'use client';

import PropTypes from 'prop-types';
import { MapPin, Phone, Mail } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { getSettings } from '@/lib/api';

/**
 * Header Component with logo and contact information
 * @param {Object} props - Component props
 * @param {boolean} props.transparent - Transparent background (default: false)
 * @param {boolean} props.fixed - Fixed position (default: false)
 */
export default function Header({ transparent = false, fixed = false }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [settings, setSettings] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
  const siteName = settings?.site_name || 'LP Ma\'arif NU PBNU';

  // Don't render if no settings loaded yet
  if (isLoading || !settings) {
    return (
      <header
        className={cn(
          'w-full transition-all duration-300 z-40',
          !transparent ? 'bg-primary-600' : 'bg-transparent',
          isScrolled ? 'transform -translate-y-full opacity-0' : 'transform translate-y-0 opacity-100'
        )}
      >
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between py-4 md:py-3 gap-4">
            <div className="h-14 animate-pulse bg-primary-700/50 rounded w-64"></div>
            <div className="h-8 animate-pulse bg-primary-700/50 rounded w-96"></div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header
      className={cn(
        'w-full transition-all duration-300 z-40',
        !transparent ? 'bg-primary-600' : 'bg-transparent',
        isScrolled ? 'transform -translate-y-full opacity-0' : 'transform translate-y-0 opacity-100'
      )}
    >
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between py-4 md:py-3 gap-4">
          {/* Logo and Organization Name */}
          <a href="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 md:w-14 md:h-14 bg-white rounded-full flex items-center justify-center shadow-lg transition-transform group-hover:scale-105">
              <span className="text-primary-600 font-bold text-xl md:text-2xl">LP</span>
            </div>
            <div className="flex flex-col text-white">
              <span className="font-bold text-lg md:text-xl font-poppins">
                {siteName}
              </span>
              <span className="text-xs md:text-sm text-primary-100 hidden sm:block">
                Lembaga Pendidikan Ma&apos;arif NU
              </span>
            </div>
          </a>

          {/* Contact Information */}
          <div className="flex flex-col sm:flex-row items-center gap-3 md:gap-6 text-white text-sm">
            {contact.address && (
              <div className="flex items-center gap-2 group">
                <MapPin className="w-4 h-4 text-primary-100 group-hover:text-white transition-colors" />
                <span className="text-primary-50 group-hover:text-white transition-colors hidden lg:block">
                  {contact.address}
                </span>
                <span className="text-primary-50 group-hover:text-white transition-colors lg:hidden">
                  {contact.address.split(',')[0] || contact.address}
                </span>
              </div>
            )}

            {contact.phone && (
              <div className="flex items-center gap-2 group">
                <Phone className="w-4 h-4 text-primary-100 group-hover:text-white transition-colors" />
                <a
                  href={`tel:${contact.phone.replace(/\s/g, '')}`}
                  className="text-primary-50 group-hover:text-white transition-colors"
                >
                  {contact.phone}
                </a>
              </div>
            )}

            {contact.email && (
              <div className="flex items-center gap-2 group">
                <Mail className="w-4 h-4 text-primary-100 group-hover:text-white transition-colors" />
                <a
                  href={`mailto:${contact.email}`}
                  className="text-primary-50 group-hover:text-white transition-colors"
                >
                  {contact.email}
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

Header.propTypes = {
  transparent: PropTypes.bool,
  fixed: PropTypes.bool,
};
