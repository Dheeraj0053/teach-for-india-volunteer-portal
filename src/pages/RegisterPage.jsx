import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { saveVolunteer, getVolunteerByUid } from '../firebase/firestore';
import { validateStep1, validateStep2 } from '../utils/validation';
import { useAutosave, loadAutosave, clearAutosave } from '../hooks/useAutosave';
import StepIndicator from '../components/ui/StepIndicator';
import RegistrationStep1 from '../components/forms/RegistrationStep1';
import RegistrationStep2 from '../components/forms/RegistrationStep2';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { ROUTES } from '../utils/constants';
import toast from 'react-hot-toast';
import { Save } from 'lucide-react';

const emptyForm = {
  name: '',
  email: '',
  phone: '',
  dob: '',
  location: '',
  languages: [],
  availability: [],
};

export default function RegisterPage() {
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [checking, setChecking] = useState(true);
  const [draftRestored, setDraftRestored] = useState(false);

  useAutosave(formData);

  useEffect(() => {
    async function init() {
      if (!user) return;
      if (isAdmin) {
        navigate(ROUTES.ADMIN, { replace: true });
        return;
      }
      try {
        const existing = await getVolunteerByUid(user.uid);
        if (existing) {
          toast('You have already registered as a volunteer.');
          navigate(ROUTES.SUCCESS, { replace: true });
          return;
        }
        const saved = loadAutosave();
        if (saved) {
          setFormData((prev) => ({
            ...prev,
            ...saved,
            email: user.email || saved.email,
            name: user.displayName || saved.name,
          }));
          setDraftRestored(true);
        } else {
          setFormData((prev) => ({
            ...prev,
            email: user.email || '',
            name: user.displayName || '',
          }));
        }
      } catch {
        toast.error('Could not verify registration status');
      } finally {
        setChecking(false);
      }
    }
    init();
  }, [user, isAdmin, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleToggleArray = (field, value) => {
    setFormData((prev) => {
      const arr = prev[field];
      const next = arr.includes(value)
        ? arr.filter((v) => v !== value)
        : [...arr, value];
      return { ...prev, [field]: next };
    });
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleNext = () => {
    const stepErrors = validateStep1(formData);
    setErrors(stepErrors);
    if (Object.keys(stepErrors).length) {
      toast.error('Please fix the errors before continuing');
      return;
    }
    setStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    setStep(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const stepErrors = validateStep2(formData);
    setErrors(stepErrors);
    if (Object.keys(stepErrors).length) {
      toast.error('Please complete all required fields');
      return;
    }

    setSubmitting(true);
    try {
      await saveVolunteer({
        uid: user.uid,
        ...formData,
      });
      clearAutosave();
      toast.success('Registration submitted successfully!');
      navigate(ROUTES.SUCCESS);
    } catch (err) {
      toast.error(err.message || 'Failed to submit registration');
    } finally {
      setSubmitting(false);
    }
  };

  if (checking) return <LoadingSpinner message="Loading your profile..." />;

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
      <div className="text-center mb-8">
        <h1 className="font-display text-3xl font-bold text-navy dark:text-slate-100">
          Volunteer Registration
        </h1>
        <p className="mt-2 text-muted">
          Tell us about yourself so we can match you with the right opportunities.
        </p>
        {draftRestored && (
          <p className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-accent/20 px-3 py-1 text-sm text-navy dark:text-accent">
            <Save className="h-4 w-4" aria-hidden />
            Draft restored from autosave
          </p>
        )}
      </div>

      <StepIndicator currentStep={step} />

      <Card>
        <form onSubmit={step === 2 ? handleSubmit : (e) => e.preventDefault()} noValidate>
          {step === 1 ? (
            <RegistrationStep1 formData={formData} errors={errors} onChange={handleChange} />
          ) : (
            <RegistrationStep2
              formData={formData}
              errors={errors}
              onChange={handleChange}
              onToggleArray={handleToggleArray}
            />
          )}

          <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
            {step === 2 ? (
              <Button type="button" variant="outline" onClick={handleBack}>
                Back
              </Button>
            ) : (
              <span />
            )}
            {step === 1 ? (
              <Button type="button" onClick={handleNext}>
                Continue
              </Button>
            ) : (
              <Button type="submit" loading={submitting}>
                Submit registration
              </Button>
            )}
          </div>
        </form>
      </Card>
    </div>
  );
}
