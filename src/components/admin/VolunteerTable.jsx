import Avatar from '../ui/Avatar';

function formatDate(timestamp) {
  if (!timestamp) return '—';
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
  return date.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

function formatList(items) {
  if (!items?.length) return '—';
  return items.join(', ');
}

const columns = [
  { key: 'name', label: 'Name', minW: 'min-w-[160px]' },
  { key: 'email', label: 'Email', minW: 'min-w-[200px]' },
  { key: 'phone', label: 'Phone', minW: 'min-w-[130px]' },
  { key: 'dob', label: 'Date of Birth', minW: 'min-w-[120px]' },
  { key: 'location', label: 'Location', minW: 'min-w-[120px]' },
  { key: 'languages', label: 'Languages', minW: 'min-w-[160px]' },
  { key: 'availability', label: 'Availability', minW: 'min-w-[140px]' },
  { key: 'createdAt', label: 'Registered', minW: 'min-w-[110px]' },
];

export default function VolunteerTable({ volunteers }) {
  return (
    <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-card card-shadow dark:border-slate-700 dark:bg-slate-800">
      <div className="border-b border-slate-200 bg-navy/5 px-4 py-3 dark:border-slate-700 dark:bg-slate-900/50 sm:px-6">
        <p className="text-sm font-medium text-navy dark:text-slate-200">
          Volunteer records — table view
        </p>
        <p className="text-xs text-muted mt-0.5">
          One row per volunteer · scroll horizontally on smaller screens
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[1100px] border-collapse text-left text-sm">
          <thead>
            <tr className="bg-navy text-white dark:bg-slate-900">
              {columns.map((col) => (
                <th
                  key={col.key}
                  scope="col"
                  className={`whitespace-nowrap px-4 py-3.5 font-semibold first:pl-6 last:pr-6 ${col.minW}`}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {volunteers.map((v, index) => (
              <tr
                key={v.id}
                className={`
                  border-b border-slate-100 transition-colors hover:bg-secondary/5
                  dark:border-slate-700 dark:hover:bg-slate-700/40
                  ${index % 2 === 0 ? 'bg-white dark:bg-slate-800' : 'bg-slate-50/80 dark:bg-slate-800/60'}
                `}
              >
                <td className="whitespace-nowrap px-4 py-3.5 first:pl-6">
                  <div className="flex items-center gap-3">
                    <Avatar name={v.name} size="sm" />
                    <span className="font-medium text-text dark:text-slate-100">{v.name}</span>
                  </div>
                </td>
                <td className="whitespace-nowrap px-4 py-3.5 text-muted">{v.email}</td>
                <td className="whitespace-nowrap px-4 py-3.5">{v.phone}</td>
                <td className="whitespace-nowrap px-4 py-3.5">{v.dob}</td>
                <td className="whitespace-nowrap px-4 py-3.5">{v.location}</td>
                <td className="px-4 py-3.5 max-w-[200px]">
                  <span className="line-clamp-2" title={formatList(v.languages)}>
                    {formatList(v.languages)}
                  </span>
                </td>
                <td className="whitespace-nowrap px-4 py-3.5">
                  {formatList(v.availability)}
                </td>
                <td className="whitespace-nowrap px-4 py-3.5 last:pr-6 text-muted">
                  {formatDate(v.createdAt)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
