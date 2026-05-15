import { Check } from 'lucide-react';

export default function StepIndicator({ currentStep, totalSteps = 2 }) {
  const steps = Array.from({ length: totalSteps }, (_, i) => i + 1);

  return (
    <nav aria-label="Registration progress" className="w-full max-w-md mx-auto mb-10">
      <ol className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isComplete = step < currentStep;
          const isActive = step === currentStep;

          return (
            <li key={step} className="flex flex-1 items-center">
              <div className="flex flex-col items-center flex-1">
                <div
                  className={`
                    flex h-10 w-10 items-center justify-center rounded-full border-2 font-semibold
                    transition-all duration-300
                    ${isComplete ? 'border-accent bg-accent text-navy' : ''}
                    ${isActive ? 'border-secondary bg-secondary text-white scale-110' : ''}
                    ${!isComplete && !isActive ? 'border-slate-300 text-muted dark:border-slate-600' : ''}
                  `}
                  aria-current={isActive ? 'step' : undefined}
                >
                  {isComplete ? <Check className="h-5 w-5" aria-hidden /> : step}
                </div>
                <span
                  className={`mt-2 text-xs font-medium sm:text-sm ${
                    isActive ? 'text-secondary' : 'text-muted'
                  }`}
                >
                  {step === 1 ? 'Personal' : 'Preferences'}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`mx-2 h-0.5 flex-1 transition-colors duration-300 ${
                    step < currentStep ? 'bg-accent' : 'bg-slate-200 dark:bg-slate-700'
                  }`}
                  aria-hidden
                />
              )}
            </li>
          );
        })}
      </ol>
      <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
        <div
          className="h-full rounded-full bg-secondary transition-all duration-500"
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          role="progressbar"
          aria-valuenow={currentStep}
          aria-valuemin={1}
          aria-valuemax={totalSteps}
        />
      </div>
    </nav>
  );
}

