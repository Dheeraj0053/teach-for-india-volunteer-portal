import { Link } from 'react-router-dom';
import { CheckCircle, Home } from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { ROUTES } from '../utils/constants';

export default function SuccessPage() {
  return (
    <div className="mx-auto flex min-h-[calc(100vh-12rem)] max-w-lg items-center px-4 py-16">
      <Card className="w-full text-center animate-fade-in">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-accent/20">
          <CheckCircle className="h-12 w-12 text-secondary" aria-hidden />
        </div>
        <h1 className="mt-6 font-display text-2xl font-bold text-navy dark:text-slate-100">
          Thank you for registering!
        </h1>
        <p className="mt-4 text-muted leading-relaxed">
          Your volunteer profile has been submitted successfully. Our team will review
          your information and reach out with matching opportunities soon.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link to={ROUTES.HOME}>
            <Button variant="outline" className="w-full sm:w-auto">
              <Home className="h-4 w-4" />
              Back to home
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}
