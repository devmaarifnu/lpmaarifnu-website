'use client';

import PropTypes from 'prop-types';
import { MapPin, Phone, Mail } from 'lucide-react';
import { contactInfo, organizationInfo } from '@/data/menu-config';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

/**
 * Header Component with logo and contact information
 * @param {Object} props - Component props
 * @param {boolean} props.transparent - Transparent background (default: false)
 * @param {boolean} props.fixed - Fixed position (default: false)
 */
export default function Header({ transparent = false, fixed = false }) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'w-full transition-all duration-300 z-40',
        fixed && 'sticky top-0',
        isScrolled && fixed && 'backdrop-blur-md shadow-md',
        !transparent ? 'bg-primary-600' : isScrolled ? 'bg-primary-600/95' : 'bg-transparent'
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
                {organizationInfo.name}
              </span>
              <span className="text-xs md:text-sm text-primary-100 hidden sm:block">
                Lembaga Pendidikan Ma&apos;arif NU
              </span>
            </div>
          </a>

          {/* Contact Information */}
          <div className="flex flex-col sm:flex-row items-center gap-3 md:gap-6 text-white text-sm">
            <div className="flex items-center gap-2 group">
              <MapPin className="w-4 h-4 text-primary-100 group-hover:text-white transition-colors" />
              <span className="text-primary-50 group-hover:text-white transition-colors hidden lg:block">
                {contactInfo.alamat}
              </span>
              <span className="text-primary-50 group-hover:text-white transition-colors lg:hidden">
                Jakarta Pusat
              </span>
            </div>

            <div className="flex items-center gap-2 group">
              <Phone className="w-4 h-4 text-primary-100 group-hover:text-white transition-colors" />
              <a
                href={`tel:${contactInfo.telepon.replace(/\s/g, '')}`}
                className="text-primary-50 group-hover:text-white transition-colors"
              >
                {contactInfo.telepon}
              </a>
            </div>

            <div className="flex items-center gap-2 group">
              <Mail className="w-4 h-4 text-primary-100 group-hover:text-white transition-colors" />
              <a
                href={`mailto:${contactInfo.email}`}
                className="text-primary-50 group-hover:text-white transition-colors"
              >
                {contactInfo.email}
              </a>
            </div>
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
