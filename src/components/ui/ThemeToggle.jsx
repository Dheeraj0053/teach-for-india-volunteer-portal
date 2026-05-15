import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export default function ThemeToggle({ className = '' }) {
  const { dark, toggle } = useTheme();

  return (
    <button
      type="button"
      onClick={toggle}
      className={`
        rounded-xl p-2.5 text-navy transition-colors
        hover:bg-navy/5 focus:outline-none focus:ring-2 focus:ring-secondary/30
        dark:text-slate-200 dark:hover:bg-slate-800
        ${className}
      `}
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {dark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </button>
  );
}

