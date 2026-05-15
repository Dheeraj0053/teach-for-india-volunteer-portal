import { useEffect, useCallback } from 'react';
import { AUTOSAVE_KEY } from '../utils/constants';

export function useAutosave(formData, enabled = true) {
  useEffect(() => {
    if (!enabled) return;
    const timer = setTimeout(() => {
      try {
        localStorage.setItem(AUTOSAVE_KEY, JSON.stringify(formData));
      } catch {
        /* storage full or unavailable */
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [formData, enabled]);
}

export function loadAutosave() {
  try {
    const raw = localStorage.getItem(AUTOSAVE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function clearAutosave() {
  localStorage.removeItem(AUTOSAVE_KEY);
}

export function useAutosaveRestore(setFormData) {
  return useCallback(() => {
    const saved = loadAutosave();
    if (saved) setFormData((prev) => ({ ...prev, ...saved }));
    return !!saved;
  }, [setFormData]);
}
