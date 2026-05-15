import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Shield } from 'lucide-react';
import { signIn, logOut, getAuthErrorMessage } from '../firebase/auth';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { ROUTES } from '../utils/constants';
import { validateEmail } from '../utils/validation';
import { isAdminEmail } from '../utils/admin';
import toast from 'react-hot-toast';

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || ROUTES.ADMIN;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!email.trim()) newErrors.email = 'Email is required';
    else if (!validateEmail(email)) newErrors.email = 'Enter a valid email';
    if (!password) newErrors.password = 'Password is required';
    setErrors(newErrors);
    if (Object.keys(newErrors).length) return;

    setLoading(true);
    try {
      const user = await signIn(email, password);
      if (!isAdminEmail(user.email)) {
        await logOut();
        toast.error(
          'This account is not an admin. Use volunteer sign in or register as admin with an authorized email.',
        );
        navigate(ROUTES.LOGIN, { replace: true });
        return;
      }
      toast.success('Welcome back, admin!');
      navigate(from, { replace: true });
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
              Admin sign in
            </h1>
            <p className="text-sm text-muted">Access the volunteer management dashboard</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5" noValidate>
          <Input
            label="Admin Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={errors.email}
            autoComplete="email"
            required
          />
          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={errors.password}
            autoComplete="current-password"
            required
          />
          <Button type="submit" className="w-full" loading={loading}>
            Sign in to dashboard
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-muted">
          New admin?{' '}
          <Link
            to={ROUTES.ADMIN_SIGNUP}
            className="font-semibold text-secondary hover:underline"
          >
            Create admin account
          </Link>
        </p>
        <p className="mt-3 text-center text-sm text-muted">
          Volunteer?{' '}
          <Link to={ROUTES.LOGIN} className="font-semibold text-secondary hover:underline">
            Volunteer sign in
          </Link>
        </p>
      </Card>
    </div>
  );
}
