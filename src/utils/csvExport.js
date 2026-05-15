export function exportVolunteersToCSV(volunteers, filename = 'volunteers.csv') {
  if (!volunteers.length) return;

  const headers = [
    'Name',
    'Email',
    'Phone',
    'Date of Birth',
    'Location',
    'Languages',
    'Availability',
    'Registered At',
  ];

  const rows = volunteers.map((v) => [
    v.name,
    v.email,
    v.phone,
    v.dob,
    v.location,
    (v.languages || []).join('; '),
    (v.availability || []).join('; '),
    v.createdAt?.toDate?.()
      ? v.createdAt.toDate().toISOString()
      : v.createdAt || '',
  ]);

  const escape = (cell) => {
    const str = String(cell ?? '');
    if (str.includes(',') || str.includes('"') || str.includes('\n')) {
      return `"${str.replace(/"/g, '""')}"`;
    }
    return str;
  };

  const csv = [headers, ...rows].map((row) => row.map(escape).join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}
