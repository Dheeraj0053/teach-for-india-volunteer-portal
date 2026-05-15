import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Shield } from 'lucide-react';
import { signUp, getAuthErrorMessage } from '../firebase/auth';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { ROUTES } from '../utils/constants';
import { validateEmail } from '../utils/validation';
import {
  isAdminEmail,
  isAdminSignupCodeRequired,
  validateAdminSignupCode,
  getAdminEmails,
} from '../utils/admin';
import toast from 'react-hot-toast';

export default function AdminSignupPage() {
  const navigate = useNavigate();
  const codeRequired = isAdminSignupCodeRequired();
  const allowedEmails = getAdminEmails();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [adminCode, setAdminCode] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!name.trim()) newErrors.name = 'Name is required';
    if (!email.trim()) newErrors.email = 'Email is required';
    else if (!validateEmail(email)) newErrors.email = 'Enter a valid email';
    else if (!isAdminEmail(email)) {
      newErrors.email =
        allowedEmails.length === 0
          ? 'No admin emails configured. Add your email to VITE_ADMIN_EMAILS in .env'
          : 'This email is not authorized for admin access. Contact your coordinator.';
    }
    if (codeRequired && !validateAdminSignupCode(adminCode)) {
      newErrors.adminCode = 'Invalid admin registration code';
    }
    if (!password) newErrors.password = 'Password is required';
    else if (password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match';

    setErrors(newErrors);
    if (Object.keys(newErrors).length) return;

    setLoading(true);
    try {
      await signUp(email, password, name.trim());
      toast.success('Admin account created! Welcome to the dashboard.');
      navigate(ROUTES.ADMIN, { replace: true });
    } catch (err) {
      toast.error(getAuthErrorMessage(err.code));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto flex min-h-[calc(100vh-8rem)] max-w-md items-center px-4 py-12">
      <Card className="w-full animate-fade-in border-2 border-navy/10 dark:border-slate-600">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy text-accent">
            <Shield className="h-6 w-6" aria-hidden />
          </div>
          <div>
            <h1 className="font-display text-2xl font-bold text-navy dark:text-slate-100">
              Admin sign up
            </h1>
            <p className="text-sm text-muted">Create a coordinator / admin account</p>
          </div>
        </div>

        <p className="mt-4 rounded-xl bg-accent/15 px-4 py-3 text-sm text-navy dark:text-accent">
          Only emails listed in <code className="text-xs">VITE_ADMIN_EMAILS</code> can register
          as admin. You will not need to complete the volunteer form.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-5" noValidate>
          <Input
            label="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={errors.name}
            autoComplete="name"
            required
          />
          <Input
            label="Admin Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={errors.email}
            hint="Must match an email in VITE_ADMIN_EMAILS"
            autoComplete="email"
            required
          />
          {codeRequired && (
            <Input
              label="Admin registration code"
              type="password"
              value={adminCode}
              onChange={(e) => setAdminCode(e.target.value)}
              error={errors.adminCode}
              hint="Provided by your organization"
              required
            />
          )}
          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={errors.password}
            hint="At least 6 characters"
            autoComplete="new-password"
            required
          />
          <Input
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            error={errors.confirmPassword}
            autoComplete="new-password"
            required
          />
          <Button type="submit" className="w-full" loading={loading}>
            Create admin account
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-muted">
          Already have an admin account?{' '}
          <Link
            to={ROUTES.ADMIN_LOGIN}
            className="font-semibold text-secondary hover:underline"
          >
            Admin sign in
          </Link>
        </p>
        <p className="mt-3 text-center text-sm text-muted">
          Volunteering instead?{' '}
          <Link to={ROUTES.SIGNUP} className="font-semibold text-secondary hover:underline">
            Volunteer sign up
          </Link>
        </p>
      </Card>
    </div>
  );
}
