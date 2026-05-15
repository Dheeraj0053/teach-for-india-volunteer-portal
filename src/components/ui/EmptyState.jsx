export default function EmptyState({ icon: Icon, title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center animate-fade-in">
      {Icon && (
        <div className="mb-4 rounded-2xl bg-navy/5 p-4 dark:bg-slate-800">
          <Icon className="h-10 w-10 text-secondary" aria-hidden />
        </div>
      )}
      <h3 className="font-display text-xl font-semibold text-text dark:text-slate-100">
        {title}
      </h3>
      {description && (
        <p className="mt-2 max-w-md text-muted">{description}</p>
      )}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}

