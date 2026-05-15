import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { signIn, getAuthErrorMessage } from '../firebase/auth';
import { isAdminEmail } from '../utils/admin';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { ROUTES } from '../utils/constants';
import { validateEmail } from '../utils/validation';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || ROUTES.REGISTER;

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
      if (isAdminEmail(user.email)) {
        toast.success('Welcome back, admin!');
        navigate(ROUTES.ADMIN, { replace: true });
        return;
      }
      toast.success('Welcome back!');
      navigate(from, { replace: true });
    } catch (err) {
      toast.error(getAuthErrorMessage(err.code));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto flex min-h-[calc(100vh-8rem)] max-w-md items-center px-4 py-12">
      <Card className="w-full animate-fade-in">
        <h1 className="font-display text-2xl font-bold text-navy dark:text-slate-100">
          Welcome back
        </h1>
        <p className="mt-2 text-muted">Sign in to continue your volunteer journey.</p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5" noValidate>
          <Input
            label="Email"
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
            Sign in
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-muted">
          Don&apos;t have an account?{' '}
          <Link to={ROUTES.SIGNUP} className="font-semibold text-secondary hover:underline">
            Create one
          </Link>
        </p>
        <p className="mt-3 text-center text-sm text-muted">
          Coordinator / admin?{' '}
          <Link to={ROUTES.ADMIN_LOGIN} className="font-semibold text-secondary hover:underline">
            Admin sign in
          </Link>
        </p>
      </Card>
    </div>
  );
}
