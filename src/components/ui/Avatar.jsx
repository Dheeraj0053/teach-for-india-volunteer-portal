import { getInitials } from '../../utils/validation';

const sizes = {
  sm: 'h-8 w-8 text-xs',
  md: 'h-10 w-10 text-sm',
  lg: 'h-14 w-14 text-lg',
  xl: 'h-20 w-20 text-2xl',
};

export default function Avatar({ name, size = 'md', className = '' }) {
  const initials = getInitials(name);

  return (
    <div
      className={`
        flex shrink-0 items-center justify-center rounded-full
        bg-navy font-semibold text-accent
        dark:bg-accent dark:text-navy
        ${sizes[size]} ${className}
      `}
      aria-label={name ? `Avatar for ${name}` : 'User avatar'}
      title={name}
    >
      {initials}
    </div>
  );
}

