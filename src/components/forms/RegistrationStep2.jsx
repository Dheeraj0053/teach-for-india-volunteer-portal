import Input from '../ui/Input';
import { LANGUAGES, WEEKDAYS } from '../../utils/constants';

function ChipSelect({ label, options, selected, onToggle, error }) {
  return (
    <fieldset className="space-y-3">
      <legend className="text-sm font-medium text-text dark:text-slate-200">{label}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const isSelected = selected.includes(option);
          return (
            <button
              key={option}
              type="button"
              onClick={() => onToggle(option)}
              className={`
                rounded-full px-4 py-2 text-sm font-medium transition-all duration-200
                ${isSelected
                  ? 'bg-secondary text-white shadow-md'
                  : 'bg-slate-100 text-text hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600'}
              `}
              aria-pressed={isSelected}
            >
              {option}
            </button>
          );
        })}
      </div>
      {error && <p className="text-sm text-red-600" role="alert">{error}</p>}
    </fieldset>
  );
}

export default function RegistrationStep2({ formData, errors, onChange, onToggleArray }) {
  return (
    <div className="space-y-8 animate-fade-in">
      <Input
        label="Location (City)"
        name="location"
        value={formData.location}
        onChange={onChange}
        error={errors.location}
        placeholder="e.g. Mumbai, Delhi, Bengaluru"
        required
      />
      <ChipSelect
        label="Languages Spoken"
        options={LANGUAGES}
        selected={formData.languages}
        onToggle={(lang) => onToggleArray('languages', lang)}
        error={errors.languages}
      />
      <ChipSelect
        label="Availability (Weekdays)"
        options={WEEKDAYS}
        selected={formData.availability}
        onToggle={(day) => onToggleArray('availability', day)}
        error={errors.availability}
      />
    </div>
  );
}
