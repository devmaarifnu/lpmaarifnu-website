import PropTypes from 'prop-types';
import { cn } from '@/lib/utils';

/**
 * Organization Chart Node Component
 * Displays a single node in the organization chart
 */
export default function OrgNode({ title, subtitle, variant = 'default', className }) {
  const variants = {
    default: 'bg-white border-primary-600 text-neutral-900',
    primary: 'bg-primary-600 border-primary-700 text-white',
    secondary: 'bg-green-500 border-green-600 text-white',
    tertiary: 'bg-teal-500 border-teal-600 text-white',
    quaternary: 'bg-blue-500 border-blue-600 text-white',
  };

  return (
    <div
      className={cn(
        'relative rounded-lg border-2 shadow-md hover:shadow-lg transition-all duration-300',
        'px-6 py-4 min-w-[200px] max-w-[280px]',
        variants[variant],
        className
      )}
    >
      <div className="text-center">
        <h3 className="font-bold text-base md:text-lg leading-tight mb-1">
          {title}
        </h3>
        {subtitle && (
          <p className={cn(
            'text-xs md:text-sm',
            variant === 'default' ? 'text-neutral-600' : 'text-white/90'
          )}>
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}

OrgNode.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  variant: PropTypes.oneOf(['default', 'primary', 'secondary', 'tertiary', 'quaternary']),
  className: PropTypes.string,
};
