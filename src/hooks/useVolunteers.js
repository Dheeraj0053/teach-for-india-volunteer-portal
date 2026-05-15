import { useState, useEffect, useMemo } from 'react';
import { getAllVolunteers } from '../firebase/firestore';

export function useVolunteers() {
  const [volunteers, setVolunteers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [languageFilter, setLanguageFilter] = useState('');
  const [dayFilter, setDayFilter] = useState('');

  const fetchVolunteers = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAllVolunteers();
      setVolunteers(data);
    } catch (err) {
      setError(err.message || 'Failed to load volunteers');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVolunteers();
  }, []);

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    return volunteers.filter((v) => {
      const matchesSearch =
        !term ||
        v.name?.toLowerCase().includes(term) ||
        v.email?.toLowerCase().includes(term) ||
        v.location?.toLowerCase().includes(term) ||
        v.phone?.includes(term);

      const matchesLanguage =
        !languageFilter || (v.languages || []).includes(languageFilter);

      const matchesDay =
        !dayFilter || (v.availability || []).includes(dayFilter);

      return matchesSearch && matchesLanguage && matchesDay;
    });
  }, [volunteers, search, languageFilter, dayFilter]);

  return {
    volunteers: filtered,
    allCount: volunteers.length,
    loading,
    error,
    search,
    setSearch,
    languageFilter,
    setLanguageFilter,
    dayFilter,
    setDayFilter,
    refetch: fetchVolunteers,
  };
}
