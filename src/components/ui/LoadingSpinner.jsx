export default function LoadingSpinner({ message = 'Loading...' }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-20" role="status">
      <div
        className="h-12 w-12 animate-spin rounded-full border-4 border-secondary/30 border-t-secondary"
        aria-hidden
      />
      <p className="text-muted text-sm">{message}</p>
    </div>
  );
}

