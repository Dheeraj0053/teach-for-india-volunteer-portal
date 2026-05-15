export default function Input({
  label,
  id,
  error,
  hint,
  className = '',
  ...props
}) {
  const inputId = id || props.name;

  return (
    <div className={`space-y-1.5 ${className}`}>
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-text dark:text-slate-200"
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={`
          w-full rounded-xl border bg-card px-4 py-3 text-text
          transition-all duration-200 placeholder:text-muted
          focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/20
          dark:bg-slate-800 dark:border-slate-600 dark:text-slate-100
          ${error ? 'border-red-500 focus:ring-red-200' : 'border-slate-200'}
        `}
        aria-invalid={!!error}
        aria-describedby={error ? `${inputId}-error` : undefined}
        {...props}
      />
      {hint && !error && (
        <p className="text-xs text-muted">{hint}</p>
      )}
      {error && (
        <p id={`${inputId}-error`} className="text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

