import { MapPin, Mail, Phone, Calendar } from 'lucide-react';
import Avatar from '../ui/Avatar';
import Card from '../ui/Card';

function formatDate(timestamp) {
  if (!timestamp) return '—';
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
  return date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export default function VolunteerCard({ volunteer }) {
  return (
    <Card hover className="animate-fade-in">
      <div className="flex items-start gap-4">
        <Avatar name={volunteer.name} size="lg" />
        <div className="min-w-0 flex-1">
          <h3 className="font-display text-lg font-semibold text-text dark:text-slate-100 truncate">
            {volunteer.name}
          </h3>
          <p className="text-sm text-muted flex items-center gap-1 mt-0.5">
            <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden />
            {volunteer.location}
          </p>
        </div>
      </div>

      <div className="mt-4 space-y-2 text-sm text-muted">
        <p className="flex items-center gap-2">
          <Mail className="h-4 w-4 shrink-0 text-secondary" aria-hidden />
          <span className="truncate">{volunteer.email}</span>
        </p>
        <p className="flex items-center gap-2">
          <Phone className="h-4 w-4 shrink-0 text-secondary" aria-hidden />
          {volunteer.phone}
        </p>
        <p className="flex items-center gap-2">
          <Calendar className="h-4 w-4 shrink-0 text-secondary" aria-hidden />
          DOB: {volunteer.dob} · Joined {formatDate(volunteer.createdAt)}
        </p>
      </div>

      <div className="mt-4">
        <p className="text-xs font-medium text-muted uppercase tracking-wide mb-2">Languages</p>
        <div className="flex flex-wrap gap-1.5">
          {(volunteer.languages || []).map((lang) => (
            <span
              key={lang}
              className="rounded-full bg-navy/5 px-2.5 py-0.5 text-xs font-medium text-navy dark:bg-slate-700 dark:text-slate-200"
            >
              {lang}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-3">
        <p className="text-xs font-medium text-muted uppercase tracking-wide mb-2">Available</p>
        <div className="flex flex-wrap gap-1.5">
          {(volunteer.availability || []).map((day) => (
            <span
              key={day}
              className="rounded-full bg-accent/20 px-2.5 py-0.5 text-xs font-medium text-navy dark:text-accent"
            >
              {day.slice(0, 3)}
            </span>
          ))}
        </div>
      </div>
    </Card>
  );
}
