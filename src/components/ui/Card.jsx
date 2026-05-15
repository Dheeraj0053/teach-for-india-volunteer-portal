export default function Card({ children, className = '', hover = false }) {
  return (
    <div
      className={`
        rounded-2xl bg-card p-6 card-shadow
        dark:bg-slate-800 dark:border dark:border-slate-700
        ${hover ? 'transition-all duration-300 hover:-translate-y-1 hover:shadow-xl' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
}

