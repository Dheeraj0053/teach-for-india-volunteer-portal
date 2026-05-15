const variants = {
  primary:
    'bg-accent text-navy hover:bg-yellow-400 focus:ring-accent/50 shadow-md hover:shadow-lg',
  secondary:
    'bg-secondary text-white hover:bg-blue-600 focus:ring-secondary/50 shadow-md',
  outline:
    'border-2 border-navy text-navy hover:bg-navy hover:text-white dark:border-slate-300 dark:text-slate-100 dark:hover:bg-slate-700',
  ghost:
    'text-navy hover:bg-navy/5 dark:text-slate-200 dark:hover:bg-slate-800',
  danger: 'bg-red-600 text-white hover:bg-red-700',
};

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-2.5 text-base',
  lg: 'px-8 py-3 text-lg',
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  loading = false,
  disabled,
  type = 'button',
  ...props
}) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={`
        inline-flex items-center justify-center gap-2 rounded-xl font-semibold
        transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2
        disabled:opacity-60 disabled:cursor-not-allowed
        ${variants[variant]} ${sizes[size]} ${className}
      `}
      {...props}
    >
      {loading && (
        <span
          className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
          aria-hidden
        />
      )}
      {children}
    </button>
  );
}

