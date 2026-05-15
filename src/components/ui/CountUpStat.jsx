import { useEffect, useRef, useState } from 'react';
import { useCountUp, parseStatValue, formatCount } from '../../hooks/useCountUp';

export default function CountUpStat({ value, label, className = '' }) {
  const { prefix, end, suffix } = parseStatValue(value);
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const count = useCountUp(end, { start: 1, duration: 2200, active: inView });

  return (
    <div ref={ref} className={`text-center ${className}`}>
      <p className="font-display text-3xl font-bold tabular-nums text-navy dark:text-accent">
        {prefix}
        {formatCount(count)}
        {suffix}
      </p>
      <p className="mt-2 text-sm text-muted">{label}</p>
    </div>
  );
}
