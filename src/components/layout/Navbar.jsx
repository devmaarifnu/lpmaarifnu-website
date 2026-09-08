'use client';

import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Menu, X, ChevronDown, LogIn } from 'lucide-react';
import { menuConfig } from '@/data/menu-config';
import { cn } from '@/lib/utils';

/**
 * Desktop Navigation Item Component
 */
function DesktopNavItem({ item, isActive }) {
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = item.children && item.children.length > 0;

  if (!hasChildren) {
    return (
      <a
        href={item.href}
        className={cn(
          'px-4 py-2 text-sm font-medium transition-colors duration-200 rounded-md',
          'hover:text-primary-600 hover:bg-primary-50',
          isActive
            ? 'text-primary-600 border-b-2 border-primary-600'
            : 'text-neutral-700'
        )}
      >
        {item.label}
      </a>
    );
  }

  return (
    <div
      className="relative before:absolute before:content-[''] before:inset-x-0 before:top-full before:h-3"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        className={cn(
          'px-4 py-2 text-sm font-medium transition-colors duration-200 rounded-md flex items-center gap-1',
          'hover:text-primary-600 hover:bg-primary-50',
          isActive
            ? 'text-primary-600 border-b-2 border-primary-600'
            : 'text-neutral-700'
        )}
      >
        {item.label}
        <ChevronDown
          className={cn(
            'w-4 h-4 transition-transform duration-200',
            isOpen && 'rotate-180'
          )}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-lg shadow-lg border border-neutral-200 py-2 z-50">
          {item.children.map((child, idx) => (
            <a
              key={idx}
              href={child.href}
              className="block px-4 py-2 text-sm text-neutral-700 hover:bg-primary-50 hover:text-primary-600 transition-colors duration-150"
            >
              {child.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

DesktopNavItem.propTypes = {
  item: PropTypes.shape({
    label: PropTypes.string.isRequired,
    href: PropTypes.string,
    children: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        href: PropTypes.string.isRequired,
      })
    ),
  }).isRequired,
  isActive: PropTypes.bool.isRequired,
};

/**
 * Mobile Navigation Item Component
 */
function MobileNavItem({ item, isActive, onItemClick }) {
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = item.children && item.children.length > 0;

  if (!hasChildren) {
    return (
      <a
        href={item.href}
        onClick={onItemClick}
        className={cn(
          'block px-4 py-3 text-base font-medium transition-colors duration-200',
          isActive
            ? 'text-primary-600 bg-primary-50'
            : 'text-neutral-700 hover:bg-neutral-50'
        )}
      >
        {item.label}
      </a>
    );
  }

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'w-full flex items-center justify-between px-4 py-3 text-base font-medium transition-colors duration-200',
          isActive
            ? 'text-primary-600 bg-primary-50'
            : 'text-neutral-700 hover:bg-neutral-50'
        )}
      >
        {item.label}
        <ChevronDown
          className={cn(
            'w-5 h-5 transition-transform duration-200',
            isOpen && 'rotate-180'
          )}
        />
      </button>

      {isOpen && (
        <div className="bg-neutral-50">
          {item.children.map((child, idx) => (
            <a
              key={idx}
              href={child.href}
              onClick={onItemClick}
              className="block px-8 py-2.5 text-sm text-neutral-700 hover:bg-primary-50 hover:text-primary-600 transition-colors duration-150"
            >
              {child.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

MobileNavItem.propTypes = {
  item: PropTypes.shape({
    label: PropTypes.string.isRequired,
    href: PropTypes.string,
    children: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        href: PropTypes.string.isRequired,
      })
    ),
  }).isRequired,
  isActive: PropTypes.bool.isRequired,
  onItemClick: PropTypes.func.isRequired,
};

/**
 * Main Navbar Component
 */
export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState('');

  useEffect(() => {
    // Normalize path: remove trailing slash (except for root path "/")
    let path = window.location.pathname;
    if (path !== '/' && path.endsWith('/')) {
      path = path.slice(0, -1);
    }
    setCurrentPath(path);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const isActiveRoute = (item) => {
    // Exact match for item with direct href
    if (item.href && item.href === currentPath) {
      return true;
    }

    // Check if any child matches the current path
    if (item.children && item.children.length > 0) {
      return item.children.some((child) => child.href === currentPath);
    }

    return false;
  };

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Add padding to body when navbar is fixed to prevent content jump
  useEffect(() => {
    if (isScrolled) {
      document.body.style.paddingTop = '64px'; // navbar height
    } else {
      document.body.style.paddingTop = '0';
    }
    return () => {
      document.body.style.paddingTop = '0';
    };
  }, [isScrolled]);

  return (
    <nav className={cn(
      "bg-white border-b border-neutral-200 transition-all duration-300 z-50",
      isScrolled ? "fixed top-0 left-0 right-0 shadow-lg" : "relative shadow-sm"
    )}>
      <div className="container mx-auto">
        <div className="flex items-center justify-between h-16">
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {menuConfig.map((item, idx) => (
              <DesktopNavItem
                key={idx}
                item={item}
                isActive={isActiveRoute(item)}
              />
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-md text-neutral-700 hover:bg-neutral-100 transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>

          {/* Login Button (Desktop) */}
          <div className="hidden md:block">
            <a
              href="https://site-admin.maarifnu.or.id"
              className={cn(
                'inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium',
                'bg-primary-600 text-white hover:bg-primary-700',
                'transition-colors duration-200 shadow-sm'
              )}
            >
              Login
              <LogIn className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Drawer */}
          <div className="fixed top-16 left-0 right-0 bottom-0 bg-white z-50 overflow-y-auto md:hidden">
            <div className="py-2">
              {menuConfig.map((item, idx) => (
                <MobileNavItem
                  key={idx}
                  item={item}
                  isActive={isActiveRoute(item)}
                  onItemClick={() => setIsMobileMenuOpen(false)}
                />
              ))}

              {/* Login Button (Mobile) */}
              <div className="px-4 py-4 border-t border-neutral-200 mt-2">
                <a
                  href="https://site-admin.maarifnu.or.id"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    'flex items-center justify-center gap-2 w-full px-4 py-3 rounded-md',
                    'bg-primary-600 text-white font-medium text-base',
                    'hover:bg-primary-700 transition-colors duration-200'
                  )}
                >
                  <LogIn className="w-5 h-5" />
                  Login
                </a>
              </div>
            </div>
          </div>
        </>
      )}
    </nav>
  );
}
