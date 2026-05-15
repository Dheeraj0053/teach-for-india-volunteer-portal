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

    <section id="impact" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="font-display text-3xl font-bold text-navy dark:text-slate-100 sm:text-4xl">
          Why volunteer with us?
        </h2>
        <p className="mt-4 text-muted text-lg">
          Every child deserves an excellent education. Your time and talent can help
          bridge the gap in under-resourced classrooms.
        </p>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.label} className="text-center" hover>
            <p className="font-display text-3xl font-bold text-secondary">{stat.value}</p>
            <p className="mt-2 text-muted">{stat.label}</p>
          </Card>
        ))}
      </div>
    </section>

    <section className="bg-navy/5 dark:bg-slate-800/50 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-display text-3xl font-bold text-center text-navy dark:text-slate-100 mb-12">
          How it works
        </h2>
        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((step, i) => (
            <Card key={step.title} hover>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/10 text-secondary mb-4">
                <step.icon className="h-6 w-6" aria-hidden />
              </div>
              <span className="text-xs font-bold text-accent uppercase tracking-wider">
                Step {i + 1}
              </span>
              <h3 className="mt-2 font-display text-xl font-semibold text-text dark:text-slate-100">
                {step.title}
              </h3>
              <p className="mt-2 text-muted">{step.desc}</p>
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
  </>
  );
}
