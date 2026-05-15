import { Link } from 'react-router-dom';
import { BookOpen, Users, Sparkles, ArrowRight } from 'lucide-react';
import Button from '../ui/Button';
import { ROUTES } from '../../utils/constants';
import { useAuth } from '../../context/AuthContext';

export default function Hero() {
  const { isAuthenticated } = useAuth();

  return (
    <section className="relative overflow-hidden hero-gradient text-white">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-accent blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-secondary blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-32">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="animate-fade-in">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-accent backdrop-blur">
              <Sparkles className="h-4 w-4" aria-hidden />
              Join the movement
            </span>
            <h1 className="mt-6 font-display text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
              Empowering classrooms through volunteer support.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-slate-200 leading-relaxed">
              Be part of Teach For India&apos;s mission to provide every child with an excellent
              education. Register as a volunteer and bring your skills, time, and heart to
              classrooms across India.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link to={isAuthenticated ? ROUTES.REGISTER : ROUTES.SIGNUP}>
                <Button size="lg" className="group">
                  Start volunteering
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <a href="#impact">
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-navy">
                  Learn more
                </Button>
              </a>
            </div>
          </div>

          <div className="relative hidden lg:block animate-fade-in">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="rounded-2xl bg-white/10 p-6 backdrop-blur transition-transform hover:-translate-y-1">
                  <BookOpen className="h-10 w-10 text-accent mb-4" aria-hidden />
                  <p className="font-display font-semibold text-lg">Support Learning</p>
                  <p className="mt-2 text-sm text-slate-300">
                    Help students build confidence and curiosity in the classroom.
                  </p>
                </div>
                <div className="rounded-2xl bg-accent/20 p-6 backdrop-blur transition-transform hover:-translate-y-1">
                  <Users className="h-10 w-10 text-accent mb-4" aria-hidden />
                  <p className="font-display font-semibold text-lg">33,500+</p>
                  <p className="mt-2 text-sm text-slate-300">
                    Students directly impacted in TFI classrooms.
                  </p>
                </div>
              </div>
              <div className="mt-8 space-y-4">
                <div className="rounded-2xl bg-secondary/30 p-6 backdrop-blur transition-transform hover:-translate-y-1">
                  <Sparkles className="h-10 w-10 text-accent mb-4" aria-hidden />
                  <p className="font-display font-semibold text-lg">Make an Impact</p>
                  <p className="mt-2 text-sm text-slate-300">
                    Join a community of leaders working for educational equity.
                  </p>
                </div>
                <div className="rounded-2xl bg-white/10 p-8 backdrop-blur flex items-center justify-center min-h-[140px]">
                  <p className="text-center font-display text-2xl font-bold text-accent">
                    One day, all children will attain an excellent education.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
