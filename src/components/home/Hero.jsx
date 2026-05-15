import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { ROUTES } from '../../utils/constants';
import { useAuth } from '../../context/AuthContext';
import { HERO_IMAGE, FALLBACK_HERO } from '../../utils/images';
import Button from '../ui/Button';

export default function Hero() {
  const { isAuthenticated } = useAuth();
  const [imgSrc, setImgSrc] = useState(HERO_IMAGE);

  return (
    <section className="bg-offwhite dark:bg-slate-900">
      <div className="mx-auto max-w-7xl px-4 pt-6 pb-12 sm:px-6 sm:pt-8 lg:px-8 lg:py-16">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Mobile: image right after header. Desktop: right column */}
          <div className="order-1 flex justify-center lg:order-2 lg:justify-end">
            <img
              src={imgSrc}
              alt="We love our Volunteers — Thank you for being the heart of change"
              className="w-full max-w-lg rounded-2xl object-contain card-shadow ring-1 ring-slate-200/60 dark:ring-slate-700 lg:max-w-none"
              onError={() => {
                if (imgSrc !== FALLBACK_HERO) setImgSrc(FALLBACK_HERO);
              }}
            />
          </div>

          {/* Mobile: badge + text below image. Desktop: left column */}
          <div className="order-2 text-center lg:order-1 lg:text-left">
            <span className="inline-flex items-center gap-2 rounded-full bg-accent/25 px-4 py-1.5 text-sm font-medium text-navy dark:bg-accent/15 dark:text-accent">
              <Sparkles className="h-4 w-4 shrink-0" aria-hidden />
              Join the movement for educational equity
            </span>

            <h1 className="mt-6 font-display text-3xl font-bold leading-tight text-navy dark:text-slate-50 sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]">
              Empowering classrooms through{' '}
              <span className="text-secondary">volunteer support</span>
            </h1>

            <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">
              Be part of Teach For India&apos;s mission. Register your skills, time, and
              heart to support children in classrooms across India.
            </p>

            <p className="mt-4 font-display text-sm italic text-navy/75 dark:text-slate-400">
              One day all children will attain an excellent education.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
              <Link to={isAuthenticated ? ROUTES.REGISTER : ROUTES.SIGNUP}>
                <Button size="lg" className="group">
                  Start volunteering
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
                </Button>
              </Link>
              <a href="#impact">
                <Button variant="outline" size="lg">
                  See our impact
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
