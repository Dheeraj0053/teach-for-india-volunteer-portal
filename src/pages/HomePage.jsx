import { Link } from 'react-router-dom';
import { GraduationCap, HandHeart, Target } from 'lucide-react';
import Hero from '../components/home/Hero';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { ROUTES } from '../utils/constants';
import { useAuth } from '../context/AuthContext';

const stats = [
  { value: '~1,000', label: 'Fellows in classrooms' },
  { value: '33,500+', label: 'Students directly impacted' },
  { value: '8', label: 'Cities across India' },
];

const steps = [
  {
    icon: GraduationCap,
    title: 'Create your account',
    desc: 'Sign up with your email to join the volunteer community.',
  },
  {
    icon: HandHeart,
    title: 'Complete registration',
    desc: 'Share your skills, languages, and availability in a simple two-step form.',
  },
  {
    icon: Target,
    title: 'Support classrooms',
    desc: 'Get matched with opportunities to make a lasting impact on students.',
  },
];

export default function HomePage() {
  const { isAuthenticated } = useAuth();

  return (
    <>
      <Hero />

      <section id="impact" className="bg-white py-16 dark:bg-slate-900 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold text-navy dark:text-slate-100">
              Why volunteer with us?
            </h2>
            <p className="mt-4 text-muted leading-relaxed">
              Every child deserves an excellent education. Your time and talent can help
              bridge the gap in under-resourced classrooms.
            </p>
          </div>

          <div className="mt-12 grid gap-6 border-t border-slate-200 pt-12 sm:grid-cols-3 dark:border-slate-700">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-display text-3xl font-bold text-navy dark:text-accent">
                  {stat.value}
                </p>
                <p className="mt-2 text-sm text-muted">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-offwhite py-16 dark:border-slate-700 dark:bg-slate-950 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold text-navy dark:text-slate-100">
              How it works
            </h2>
            <p className="mt-3 text-muted">Three simple steps to start volunteering.</p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {steps.map((step, i) => (
              <Card key={step.title} className="bg-white dark:bg-slate-800">
                <p className="text-sm font-semibold text-secondary">Step {i + 1}</p>
                <div className="mt-4 flex h-10 w-10 items-center justify-center rounded-lg bg-navy/5 text-navy dark:bg-slate-700 dark:text-accent">
                  <step.icon className="h-5 w-5" aria-hidden />
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold text-navy dark:text-slate-100">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{step.desc}</p>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link to={isAuthenticated ? ROUTES.REGISTER : ROUTES.SIGNUP}>
              <Button size="lg">Register as a volunteer</Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-white py-16 dark:border-slate-700 dark:bg-slate-900 sm:py-20">
        <div className="mx-auto max-w-2xl px-4 text-center sm:px-6">
          <h2 className="font-display text-2xl font-bold text-navy dark:text-slate-100 sm:text-3xl">
            Ready to make a difference?
          </h2>
          <p className="mt-4 text-muted leading-relaxed">
            Your journey starts with a single step. Join volunteers supporting classrooms
            across India today.
          </p>
          <Link
            to={isAuthenticated ? ROUTES.REGISTER : ROUTES.SIGNUP}
            className="mt-8 inline-block"
          >
            <Button size="lg">Get started now</Button>
          </Link>
        </div>
      </section>
    </>
  );
}
