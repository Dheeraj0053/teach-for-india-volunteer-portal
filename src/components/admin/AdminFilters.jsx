import { Search, Download, Filter } from 'lucide-react';
import { LANGUAGES, WEEKDAYS } from '../../utils/constants';
import Button from '../ui/Button';

export default function AdminFilters({
  search,
  onSearchChange,
  languageFilter,
  onLanguageChange,
  dayFilter,
  onDayChange,
  onExport,
  count,
  total,
}) {
  return (
    <div className="rounded-2xl bg-card p-6 card-shadow dark:bg-slate-800 space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-display text-xl font-semibold text-text dark:text-slate-100 flex items-center gap-2">
            <Filter className="h-5 w-5 text-secondary" aria-hidden />
            Volunteer Directory
          </h2>
          <p className="text-sm text-muted mt-1">
            Showing {count} of {total} volunteers
          </p>
        </div>
        <Button onClick={onExport} variant="secondary" size="sm" disabled={count === 0}>
          <Download className="h-4 w-4" />
          Export CSV
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="relative sm:col-span-2 lg:col-span-2">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" aria-hidden />
          <input
            type="search"
            placeholder="Search by name, email, location..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-offwhite py-2.5 pl-10 pr-4 text-sm focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/20 dark:bg-slate-900 dark:border-slate-600 dark:text-slate-100"
            aria-label="Search volunteers"
          />
        </div>
        <select
          value={languageFilter}
          onChange={(e) => onLanguageChange(e.target.value)}
          className="rounded-xl border border-slate-200 bg-offwhite px-4 py-2.5 text-sm focus:border-secondary focus:outline-none dark:bg-slate-900 dark:border-slate-600 dark:text-slate-100"
          aria-label="Filter by language"
        >
          <option value="">All languages</option>
          {LANGUAGES.map((lang) => (
            <option key={lang} value={lang}>{lang}</option>
          ))}
        </select>
        <select
          value={dayFilter}
          onChange={(e) => onDayChange(e.target.value)}
          className="rounded-xl border border-slate-200 bg-offwhite px-4 py-2.5 text-sm focus:border-secondary focus:outline-none dark:bg-slate-900 dark:border-slate-600 dark:text-slate-100"
          aria-label="Filter by availability"
        >
          <option value="">All weekdays</option>
          {WEEKDAYS.map((day) => (
            <option key={day} value={day}>{day}</option>
          ))}
        </select>
      </div>
    </div>
  );
}
