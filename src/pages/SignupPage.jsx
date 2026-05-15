import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signUp, getAuthErrorMessage } from '../firebase/auth';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { ROUTES } from '../utils/constants';
import { validateEmail } from '../utils/validation';
import toast from 'react-hot-toast';

export default function SignupPage() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!name.trim()) newErrors.name = 'Name is required';
    if (!email.trim()) newErrors.email = 'Email is required';
    else if (!validateEmail(email)) newErrors.email = 'Enter a valid email';
    if (!password) newErrors.password = 'Password is required';
    else if (password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    setErrors(newErrors);
    if (Object.keys(newErrors).length) return;

    setLoading(true);
    try {
      await signUp(email, password, name.trim());
      toast.success('Account created! Complete your volunteer registration.');
      navigate(ROUTES.REGISTER);
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
          Join as a volunteer
        </h1>
        <p className="mt-2 text-muted">Create your account to get started.</p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5" noValidate>
          <Input
            label="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={errors.name}
            autoComplete="name"
            required
          />
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
            Create account
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-muted">
          Already have an account?{' '}
          <Link to={ROUTES.LOGIN} className="font-semibold text-secondary hover:underline">
            Sign in
          </Link>
        </p>
        <p className="mt-3 text-center text-sm text-muted">
          Admin / coordinator?{' '}
          <Link to={ROUTES.ADMIN_SIGNUP} className="font-semibold text-secondary hover:underline">
            Admin sign up
          </Link>
        </p>
      </Card>
    </div>
  );
}
