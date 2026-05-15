import { Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-200 bg-navy text-slate-300 dark:border-slate-700">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="text-center sm:text-left">
            <p className="font-display text-lg font-semibold text-white">
              Teach For India
            </p>
            <p className="mt-1 text-sm text-slate-400">
              One day all children will attain an excellent education.
            </p>
          </div>
          <p className="flex items-center gap-1 text-sm text-slate-400">
            Built with <Heart className="h-4 w-4 text-accent fill-accent" aria-hidden /> for volunteers
          </p>
        </div>
        <p className="mt-8 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} Teach For India Volunteer Portal. For demonstration purposes.
        </p>
      </div>
    </footer>
  );
}
