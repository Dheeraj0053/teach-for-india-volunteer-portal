import { useState } from 'react';
import { Users, LayoutGrid, Table2 } from 'lucide-react';
import { useVolunteers } from '../hooks/useVolunteers';
import AdminFilters from '../components/admin/AdminFilters';
import VolunteerTable from '../components/admin/VolunteerTable';
import VolunteerTableSkeleton from '../components/admin/VolunteerTableSkeleton';
import VolunteerCard from '../components/admin/VolunteerCard';
import EmptyState from '../components/ui/EmptyState';
import { exportVolunteersToCSV } from '../utils/csvExport';
import toast from 'react-hot-toast';

export default function AdminDashboard() {
  const [viewMode, setViewMode] = useState('table');
  const {
    volunteers,
    allCount,
    loading,
    error,
    search,
    setSearch,
    languageFilter,
    setLanguageFilter,
    dayFilter,
    setDayFilter,
    refetch,
  } = useVolunteers();

  const handleExport = () => {
    if (!volunteers.length) {
      toast.error('No volunteers to export');
      return;
    }
    exportVolunteersToCSV(volunteers);
    toast.success(`Exported ${volunteers.length} volunteers`);
  };

  if (error) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-12 text-center">
        <p className="text-red-600">{error}</p>
        <button
          type="button"
          onClick={refetch}
          className="mt-4 text-secondary font-semibold hover:underline"
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-navy dark:text-slate-100">
          Admin Dashboard
        </h1>
        <p className="mt-2 text-muted">
          View volunteers in table format (like a spreadsheet) or as cards.
        </p>
      </div>

      <AdminFilters
        search={search}
        onSearchChange={setSearch}
        languageFilter={languageFilter}
        onLanguageChange={setLanguageFilter}
        dayFilter={dayFilter}
        onDayChange={setDayFilter}
        onExport={handleExport}
        count={volunteers.length}
        total={allCount}
      />

      {!loading && volunteers.length > 0 && (
        <div className="mt-6 flex gap-2">
          <button
            type="button"
            onClick={() => setViewMode('table')}
            className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition-colors ${
              viewMode === 'table'
                ? 'bg-navy text-white dark:bg-secondary'
                : 'bg-slate-100 text-muted hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700'
            }`}
          >
            <Table2 className="h-4 w-4" aria-hidden />
            Table view
          </button>
          <button
            type="button"
            onClick={() => setViewMode('cards')}
            className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition-colors ${
              viewMode === 'cards'
                ? 'bg-navy text-white dark:bg-secondary'
                : 'bg-slate-100 text-muted hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700'
            }`}
          >
            <LayoutGrid className="h-4 w-4" aria-hidden />
            Card view
          </button>
        </div>
      )}

      {loading ? (
        <VolunteerTableSkeleton rows={6} />
      ) : volunteers.length === 0 ? (
        <EmptyState
          icon={Users}
          title="No volunteers found"
          description={
            search || languageFilter || dayFilter
              ? 'Try adjusting your search or filters.'
              : 'Volunteer registrations will appear here once submitted.'
          }
        />
      ) : viewMode === 'table' ? (
        <VolunteerTable volunteers={volunteers} />
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {volunteers.map((v) => (
            <VolunteerCard key={v.id} volunteer={v} />
          ))}
        </div>
      )}
    </div>
  );
}
