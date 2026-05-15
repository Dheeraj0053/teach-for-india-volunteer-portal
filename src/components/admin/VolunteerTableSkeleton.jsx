import { Skeleton } from '../ui/Skeleton';

export default function VolunteerTableSkeleton({ rows = 5 }) {
  return (
    <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-card dark:border-slate-700 dark:bg-slate-800">
      <div className="border-b border-slate-200 px-6 py-3 dark:border-slate-700">
        <Skeleton className="h-4 w-48" />
      </div>
      <div className="space-y-0 p-4">
        <Skeleton className="mb-3 h-10 w-full rounded-lg" />
        {Array.from({ length: rows }).map((_, i) => (
          <Skeleton key={i} className="mb-2 h-12 w-full rounded-lg" />
        ))}
      </div>
    </div>
  );
}
