import PropTypes from 'prop-types';
import { cn } from '@/lib/utils';

/**
 * Responsive Container Component
 * Ensures consistent padding and max-width across all pages
 */
export function ResponsiveContainer({ children, className, size = 'default' }) {
  const sizes = {
    sm: 'max-w-3xl',
    default: 'max-w-6xl',
    lg: 'max-w-7xl',
    full: 'max-w-full',
  };

  return (
    <div className={cn('mx-auto px-4 sm:px-6 lg:px-8', sizes[size], className)}>
      {children}
    </div>
  );
}

ResponsiveContainer.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  size: PropTypes.oneOf(['sm', 'default', 'lg', 'full']),
};

/**
 * Responsive Grid Component
 * Auto-responsive grid that adjusts columns based on screen size
 */
export function ResponsiveGrid({ children, className, cols = 3, gap = 6 }) {
  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
    5: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5',
    6: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6',
  };

  return (
    <div className={cn('grid', gridCols[cols], `gap-${gap}`, className)}>
      {children}
    </div>
  );
}

ResponsiveGrid.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  cols: PropTypes.oneOf([1, 2, 3, 4, 5, 6]),
  gap: PropTypes.number,
};

/**
 * Mobile Show/Hide Components
 */
export function ShowOnMobile({ children, className }) {
  return (
    <div className={cn('block md:hidden', className)}>
      {children}
    </div>
  );
}

ShowOnMobile.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export function HideOnMobile({ children, className }) {
  return (
    <div className={cn('hidden md:block', className)}>
      {children}
    </div>
  );
}

HideOnMobile.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

/**
 * Responsive Image Wrapper
 * Maintains aspect ratio and prevents layout shift
 */
export function ResponsiveImage({ src, alt, aspectRatio = '16/9', className }) {
  return (
    <div
      className={cn('relative w-full overflow-hidden', className)}
      style={{ aspectRatio }}
    >
      <img
        src={src}
        alt={alt}
        className="absolute inset-0 w-full h-full object-cover"
        loading="lazy"
      />
    </div>
  );
}

ResponsiveImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  aspectRatio: PropTypes.string,
  className: PropTypes.string,
};

/**
 * Responsive Text Component
 * Scales text size based on screen size
 */
export function ResponsiveHeading({ level = 'h2', children, className }) {
  const sizes = {
    h1: 'text-2xl sm:text-3xl md:text-4xl',
    h2: 'text-xl sm:text-2xl md:text-3xl lg:text-4xl',
    h3: 'text-lg sm:text-xl md:text-2xl lg:text-3xl',
    h4: 'text-base sm:text-lg md:text-xl lg:text-2xl',
    h5: 'text-sm sm:text-base md:text-lg lg:text-xl',
    h6: 'text-xs sm:text-sm md:text-base lg:text-lg',
  };

  const Tag = level;

  return (
    <Tag className={cn(sizes[level], 'font-bold', className)}>
      {children}
    </Tag>
  );
}

ResponsiveHeading.propTypes = {
  level: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'h6']),
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

/**
 * Responsive Section with consistent padding
 */
export function ResponsiveSection({ children, className, variant = 'default' }) {
  const variants = {
    default: 'py-12 md:py-16 lg:py-20',
    compact: 'py-8 md:py-12 lg:py-16',
    spacious: 'py-16 md:py-20 lg:py-24',
  };

  return (
    <section className={cn(variants[variant], className)}>
      {children}
    </section>
  );
}

ResponsiveSection.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  variant: PropTypes.oneOf(['default', 'compact', 'spacious']),
};
